"""
model.py — Swin Transformer-S inference engine for PhytoScan
Loads a torchvision swin_s checkpoint saved via torch.save() in folder format.
"""

import torch
import torch.nn as nn
import torchvision.transforms as transforms
import torchvision.models as models
from PIL import Image
import io
import os
from typing import List

from class_names import CLASS_NAMES, get_disease_info

# ── Configuration ──────────────────────────────────────────────────────────────
# Points to the 23-class checkpoint used by the current model.
MODEL_PATH = os.environ.get(
    "MODEL_PATH",
    os.path.join(os.path.dirname(__file__), "..", "..", "best_swin_s_vast.pth")
)
NUM_CLASSES = len(CLASS_NAMES)
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Swin Transformer uses the same ImageNet normalisation
TRANSFORM = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225],
    ),
])

# ── Model Building ─────────────────────────────────────────────────────────────

def _build_model() -> nn.Module:
    """
    Loads a torchvision swin_s model.
    The checkpoint was saved as a folder (torch.save folder format).
    It contains: { 'epoch': int, 'model_state_dict': OrderedDict, 'optimizer_state_dict': ... }
    The checkpoint contains a compiled Swin-S state dict with a 23-class head.
    """
    model_path = os.path.abspath(MODEL_PATH)
    if not os.path.exists(model_path):
        raise FileNotFoundError(
            f"Model not found at '{model_path}'. "
            "Ensure the 'swin_model' folder is present at Interface/swin_model/."
        )

    print(f"Loading checkpoint from: {model_path}")
    checkpoint = torch.load(model_path, map_location=DEVICE, weights_only=False)

    # Extract state dict — checkpoint has key 'model_state_dict'.
    if isinstance(checkpoint, dict):
        state_dict = (
            checkpoint.get("model_state_dict")
            or checkpoint.get("state_dict")
            or checkpoint.get("model")
            or checkpoint
        )
    else:
        state_dict = checkpoint

    # ── Pre-load head shape check ──────────────────────────────────────────────
    # Find the head weight tensor in the raw (pre-conversion) state dict.
    raw_head_keys = [k for k in state_dict.keys() if "head" in k.lower() and "weight" in k.lower()]
    if raw_head_keys:
        ckpt_num_classes = state_dict[raw_head_keys[0]].shape[0]
        if ckpt_num_classes != NUM_CLASSES:
            raise RuntimeError(
                f"\n\n"
                f"  ╔══════════════════════════════════════════════════════════════╗\n"
                f"  ║  CLASS-COUNT MISMATCH — MODEL WILL NOT LOAD                 ║\n"
                f"  ╠══════════════════════════════════════════════════════════════╣\n"
                f"  ║  Checkpoint head:  {ckpt_num_classes} classes  (key: {raw_head_keys[0]!r})  \n"
                f"  ║  NUM_CLASSES:      {NUM_CLASSES} classes  (len(CLASS_NAMES))           \n"
                f"  ║  Checkpoint path:  {model_path!r}\n"
                f"  ╚══════════════════════════════════════════════════════════════╝\n"
                f"  Fix: update MODEL_PATH to a checkpoint with {NUM_CLASSES} output classes,\n"
                f"       or update CLASS_NAMES to match the checkpoint's {ckpt_num_classes} classes."
            )
        print(f"[OK] Checkpoint head shape: ({ckpt_num_classes}, {state_dict[raw_head_keys[0]].shape[1]}) — matches NUM_CLASSES={NUM_CLASSES}")
    else:
        print("[WARN] No head weight key found in raw checkpoint — skipping pre-load shape check.")

    state_dict = _convert_checkpoint_keys(state_dict)

    # Build torchvision Swin-S skeleton with the current output head.
    model = models.swin_s(weights=None)
    in_features = model.head.in_features  # 768
    model.head = nn.Linear(in_features, NUM_CLASSES)

    missing, unexpected = model.load_state_dict(state_dict, strict=False)

    # Separate head-related key problems (always fatal signal) from expected
    # positional-encoding misses (relative_position_index etc. — normal for
    # torchvision Swin vs. training implementation differences).
    _expected_miss_patterns = ("relative_position_index", "relative_position_bias_table")
    head_missing   = [k for k in missing    if "head" in k.lower()]
    head_unexpected= [k for k in unexpected if "head" in k.lower()]
    other_missing  = [k for k in missing    if "head" not in k.lower()]
    other_unexpected=[k for k in unexpected if "head" not in k.lower()]

    if head_missing or head_unexpected:
        raise RuntimeError(
            f"\n\n"
            f"  ╔══════════════════════════════════════════════════════════════╗\n"
            f"  ║  HEAD WEIGHT LOAD FAILURE — classifier not loaded!           ║\n"
            f"  ╠══════════════════════════════════════════════════════════════╣\n"
            f"  ║  Missing head keys:    {head_missing}\n"
            f"  ║  Unexpected head keys: {head_unexpected}\n"
            f"  ╚══════════════════════════════════════════════════════════════╝"
        )

    if other_missing:
        truly_unexpected = [k for k in other_missing if not any(p in k for p in _expected_miss_patterns)]
        if truly_unexpected:
            print(f"[WARN] Missing non-head keys ({len(truly_unexpected)}): {truly_unexpected[:5]}")
        expected_count = len(other_missing) - len(truly_unexpected)
        if expected_count:
            print(f"[INFO] {expected_count} expected missing keys (relative_position_index etc.) — normal.")
    if other_unexpected:
        print(f"[WARN] Unexpected non-head keys ({len(other_unexpected)}): {other_unexpected[:5]}")

    # ── Post-load head shape sanity check ─────────────────────────────────────
    loaded_classes = model.head.weight.shape[0]
    if loaded_classes != NUM_CLASSES:
        raise RuntimeError(
            f"Post-load head shape mismatch: model.head.weight[0]={loaded_classes} "
            f"but NUM_CLASSES={NUM_CLASSES}. This should not happen — file a bug."
        )

    model.to(DEVICE)
    model.eval()
    print(f"[OK] Swin-S model loaded on {DEVICE} | Classes: {NUM_CLASSES}")
    return model


def _convert_checkpoint_keys(state_dict: dict) -> dict:
    """Convert the training Swin implementation's keys to torchvision keys."""
    converted = {}
    stage_features = {0: 1, 1: 3, 2: 5, 3: 7}
    stage_merges = {1: 2, 2: 4, 3: 6}

    for key, value in state_dict.items():
        key = key.removeprefix("_orig_mod.")
        if key.startswith("patch_embed."):
            key = key.replace("patch_embed.proj.", "features.0.0.", 1)
            key = key.replace("patch_embed.norm.", "features.0.2.", 1)
        elif key.startswith("layers."):
            parts = key.split(".")
            stage = int(parts[1])
            if parts[2] == "blocks":
                key = ".".join(["features", str(stage_features[stage]), *parts[3:]])
                key = key.replace(".mlp.fc1.", ".mlp.0.")
                key = key.replace(".mlp.fc2.", ".mlp.3.")
            elif parts[2] == "downsample":
                if stage not in stage_merges:
                    continue
                key = ".".join(["features", str(stage_merges[stage]), *parts[3:]])
        elif key.startswith("head.fc."):
            key = key.replace("head.fc.", "head.", 1)
        elif key.startswith("head.1."):
            key = key.replace("head.1.", "head.", 1)
        converted[key] = value
    return converted


# ── Singleton Model ────────────────────────────────────────────────────────────

_model: nn.Module | None = None


def get_model() -> nn.Module:
    global _model
    if _model is None:
        _model = _build_model()
    return _model


# ── Inference ──────────────────────────────────────────────────────────────────

def predict(image_bytes: bytes, top_k: int = 3) -> List[dict]:
    """
    Run inference on raw image bytes.
    Returns top-k predictions sorted by confidence descending.
    Each entry: {class_name, display_name, confidence, plant, severity, description, remedies}
    """
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    tensor = TRANSFORM(image).unsqueeze(0).to(DEVICE)

    model = get_model()
    with torch.no_grad():
        logits = model(tensor)
        probs = torch.softmax(logits, dim=1)[0]

    top_probs, top_indices = torch.topk(probs, k=min(top_k, NUM_CLASSES))

    results = []
    for prob, idx in zip(top_probs.tolist(), top_indices.tolist()):
        class_name = CLASS_NAMES[idx]
        info = get_disease_info(class_name)
        results.append({
            "class_name": class_name,
            "confidence": round(prob * 100, 2),
            **info,
        })

    return results
