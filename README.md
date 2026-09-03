# 🌿 PhytoScan — Autonomous Plant Disease Classification System
### Deep Learning Vision Transformer for Real-Time Foliar Pathology Diagnosis
**Built for Smart India Hackathon (SIH 2026) • Agronomic AI & Food Security**

---

[![PyTorch](https://img.shields.io/badge/PyTorch-2.10%2Bcu128-EE4C2C?logo=pytorch&logoColor=white)](https://pytorch.org/)
[![Model](https://img.shields.io/badge/Backbone-Swin--Transformer--S-38bdf8)](https://github.com/microsoft/Swin-Transformer)
[![Accuracy](https://img.shields.io/badge/Test%20Accuracy-98.02%25-10b981)](https://github.com/Neel0289/Swin-Plant-Disease-Model)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18%20%2B%20Vite-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/WebGL-Three.js%203D-black?logo=threedotjs&logoColor=white)](https://threejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 📌 Executive Overview

**PhytoScan** is an end-to-end, real-time botanical diagnostic system engineered to detect foliar crop pathologies from leaf photography. Driven by a fine-tuned **Swin Transformer-S (Swin-S)** backbone, PhytoScan achieves human-expert diagnostic accuracy (**98.02% held-out test accuracy** across 105,023 images) and provides immediate, actionable agronomic management protocols.

Traditional Convolutional Neural Networks (CNNs) struggle with subtle foliar infections because fixed receptive fields cannot effectively correlate localized necrotic lesions with broad leaf morphology. PhytoScan addresses this limitation using **Shifted-Window Vision Transformers (SW-MSA)**, capturing both microscopic cellular damage and macro-level leaf discoloration while maintaining linear computational complexity.

```
       [ Leaf Photograph ]
                │
                ▼
  [ 4×4 Patch Partition & Linear Embedding ]
                │
                ▼
  [ Swin-S 4-Stage Hierarchical Vision Transformer ]
      ├─ Stage 1 (W-MSA): Local lesion features
      ├─ Stage 2 (Patch Merging): Meso-scale leaf structure
      ├─ Stage 3 (18 SW-MSA Blocks): Shifted-window cross-attention
      └─ Stage 4 (Classifier Head): 768-dim → 23 Pathology Logits
                │
                ▼
  [ Live FastAPI Real-Time Inference ]
      ├─ Confidence Probability Calibration (Softmax)
      ├─ Out-of-Distribution & Non-Plant Safeguards (≥40% Threshold)
      └─ Instant Agronomic IPM Treatment Protocols
```

---

## 🏆 Verified Empirical Benchmark Results

All metrics were evaluated on a held-out test split of **10,503 images** that were never exposed during model training:

| Diagnostic Metric | Empirical Score | Benchmark Significance |
| :--- | :---: | :--- |
| **Top-1 Accuracy** | **98.02%** | Correct exact diagnosis on first candidate |
| **Top-5 Accuracy** | **99.70%** | True pathology contained in top-5 predictions |
| **Balanced Accuracy** | **97.78%** | Macro-averaged recall across all 23 classes |
| **Precision (Weighted)** | **98.03%** | Sample-weighted positive predictive value |
| **Recall (Weighted)** | **98.02%** | Sample-weighted sensitivity |
| **F1-Score (Weighted)** | **98.02%** | Harmonic mean of precision & recall |
| **Macro Specificity** | **99.91%** | True-negative rate macro-averaged across classes |
| **Matthews Correlation (MCC)** | **0.9790** | Highly balanced correlation coefficient |
| **Cohen's Kappa ($\kappa$)** | **0.9790** | Near-perfect inter-rater agreement |

---

## 🔬 System Architecture

PhytoScan is split into two independently deployable, high-performance tiers:

### 1. High-Throughput Inference Backend (`/backend`)
* **Framework**: FastAPI + Uvicorn (ASGI)
* **Model Engine**: PyTorch (`torch.no_grad()` accelerated)
* **Weights Checkpoint**: `swin_model/1.pth`
* **Startup Strategy**: Singleton pre-loading into GPU/CPU memory on boot to eliminate per-request cold starts.
* **OOD Safeguard**: Out-of-distribution non-plant detector that gracefully rejects arbitrary images (drawings, humans, random photos) with diagnostic advisories if confidence is below 40%.

### 2. Immersive 3D Web Application (`/frontend`)
* **Framework**: React 18, Vite, Three.js, Lucide Icons
* **Styling**: Vanilla CSS Design System with rich glassmorphism, responsive grids, and typography (Outfit & Plus Jakarta Sans).
* **Multi-Spectral Theme Engine**:
  * 🌌 **Aurora Boreal**: Electric Cyan (`#00f0ff`) & Deep Space
  * 🌿 **Rapidkert Emerald**: Botanical Foliage Green (`#10b981`)
  * 🔥 **Multispectral Thermal IR**: Coral Rose Flame (`#f43f5e`)
* **Scroll-Locked Dossier Portals**: React Portals mounting full pathology dossiers directly to root DOM to ensure zero navigation clipping and isolated scrolling.

---

## 📋 Supported 23 Crop Pathologies & Botanical Classes

PhytoScan detects diseases across **9 critical staple food crops**:

| Index | Class Identifier | Host Crop | Diagnosis / Condition | Pathogen Type | Typical Severity |
| :---: | :--- | :---: | :--- | :--- | :---: |
| `00` | `Apple_cedar_apple_rust` | Apple | Cedar Apple Rust | *Gymnosporangium juniperi-virginianae* (Fungus) | High |
| `01` | `Apple_healthy` | Apple | Healthy Foliage | None (Pristine vigor) | None |
| `02` | `Apple_scab` | Apple | Apple Scab | *Venturia inaequalis* (Fungus) | Moderate |
| `03` | `Cherry_healthy` | Cherry | Healthy Foliage | None (Pristine vigor) | None |
| `04` | `Corn_common_rust` | Corn / Maize | Common Rust | *Puccinia sorghi* (Fungus) | Moderate |
| `05` | `Corn_gray_leaf_spot` | Corn / Maize | Gray Leaf Spot | *Cercospora zeae-maydis* (Fungus) | High |
| `06` | `Corn_northern_leaf_blight` | Corn / Maize | Northern Leaf Blight | *Exserohilum turcicum* (Fungus) | Critical |
| `07` | `Grape_black_rot` | Grape | Black Rot | *Guignardia bidwellii* (Fungus) | Critical |
| `08` | `Grape_healthy` | Grape | Healthy Foliage | None (Pristine vigor) | None |
| `09` | `Peach_healthy` | Peach | Healthy Foliage | None (Pristine vigor) | None |
| `10` | `Pepper_bell_bacterial_spot`| Bell Pepper | Bacterial Spot | *Xanthomonas campestris* (Bacteria) | High |
| `11` | `Pepper_bell_healthy` | Bell Pepper | Healthy Foliage | None (Pristine vigor) | None |
| `12` | `Potato_early_blight` | Potato | Early Blight | *Alternaria solani* (Fungus) | Moderate |
| `13` | `Potato_late_blight` | Potato | Late Blight | *Phytophthora infestans* (Oomycete) | Critical |
| `14` | `Soybean_healthy` | Soybean | Healthy Foliage | None (Pristine vigor) | None |
| `15` | `Tomato_bacterial_spot` | Tomato | Bacterial Spot | *Xanthomonas perforans* (Bacteria) | High |
| `16` | `Tomato_early_blight` | Tomato | Early Blight | *Alternaria solani* (Fungus) | Moderate |
| `17` | `Tomato_healthy` | Tomato | Healthy Foliage | None (Pristine vigor) | None |
| `18` | `Tomato_late_blight` | Tomato | Late Blight | *Phytophthora infestans* (Oomycete) | Critical |
| `19` | `Tomato_leaf_mold` | Tomato | Leaf Mold | *Passalora fulva* (Fungus) | Moderate |
| `20` | `Tomato_mosaic_virus` | Tomato | Tomato Mosaic Virus | *Tobamovirus* (ToMV) (Virus) | High |
| `21` | `Tomato_septoria_leaf_spot`| Tomato | Septoria Leaf Spot | *Septoria lycopersici* (Fungus) | Moderate |
| `22` | `Tomato_yellow_leaf_curl` | Tomato | Yellow Leaf Curl Virus | *Begomovirus* complex (TYLCV) (Virus) | Critical |

---

## ⚙️ Training Configuration & Hardware Setup

Extracted directly from experimental runs in `finalmodel.ipynb`:

```yaml
Hardware & Environment:
  GPU Accelerator: Tesla T4 (14.56 GB VRAM)
  Host CPU: 4 Cores (3 DataLoader workers)
  Software Stack: PyTorch 2.10.0+cu128, Torchvision 0.25.0+cu128, CUDA 12.8
  Precision Flags: TF32 matmul (high), cuDNN benchmark mode, AMP fp16 + GradScaler
  Reproducibility Seed: 42 (torch, numpy, cuda)

Dataset Specifications:
  Total Validated Images: 105,023 images
  Imbalance Ratio: Max 14,058 (Grape_black_rot) vs Min 2,792 (Peach_healthy)
  Imbalance Mitigation: WeightedRandomSampler using √(inverse-frequency)
  Train Split: 84,018 images (80.00%)
  Validation Split: 10,502 images (10.00%)
  Test Split: 10,503 images (10.00%)

Preprocessing & Augmentation:
  Input Resolution: 224 × 224 pixels
  Train Transforms: RandomResizedCrop(224, scale=0.8-1.0)
                    RandomHorizontalFlip(p=0.5)
                    ColorJitter(brightness=0.2, contrast=0.2, saturation=0.15, hue=0.03) @ p=0.5
  Val/Test Transforms: Resize(256) → CenterCrop(224)
  Normalization: Mean [0.485, 0.456, 0.406], Std [0.229, 0.224, 0.225]

Hyperparameters:
  Batch Size: 128
  Optimizer: AdamW (Initial LR: 5e-5, Weight Decay: 1e-4)
  LR Schedule: CosineAnnealingLR (T_max = 20 epochs)
  Loss Function: CrossEntropyLoss (label_smoothing = 0.1)
  Gradient Clipping: max_norm = 1.0
  Stopping Rule: Early stopping patience = 7 on validation loss
  Optimal Checkpoint: Saved at Epoch 10 (Val Loss: 0.6645, Val Acc: 98.17%)
```

---

## 💻 Installation & Quickstart

### Prerequisites
* **Python**: 3.10 or higher
* **Node.js**: 18.0 or higher
* **CUDA** (Optional): NVIDIA GPU with CUDA 11.8 / 12.x for accelerated inference. CPU inference is supported out-of-the-box.

### 1. Clone the Repository
```bash
git clone https://github.com/Neel0289/Swin-Plant-Disease-Model.git
cd Swin-Plant-Disease-Model
```

### 2. Backend Setup
```bash
# Navigate to backend
cd backend

# Create and activate a Python virtual environment
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server on port 8001
python -m uvicorn main:app --host 127.0.0.1 --port 8001 --reload
```
> The backend server will start at `http://127.0.0.1:8001`. You can test the health endpoint at `http://127.0.0.1:8001/api/health`.

### 3. Frontend Setup
Open a second terminal window:
```bash
# Navigate to frontend
cd frontend

# Install Node dependencies
npm install

# Start Vite development server
npm run dev
```
> The frontend application will be live at `http://localhost:5173`.

---

## 📡 API Reference

### 1. Health Check
* **Endpoint**: `GET /api/health`
* **Response**:
```json
{
  "status": "healthy",
  "model_loaded": true,
  "model_path": "D:\\swin_transformer\\Swin-Plant-Disease-Model\\swin_model\\1.pth",
  "device": "cpu"
}
```

### 2. Leaf Diagnosis Inference
* **Endpoint**: `POST /api/predict`
* **Content-Type**: `multipart/form-data`
* **Body**: `file` (binary image: `.jpg`, `.png`, `.webp`, max 10MB)
* **Response**:
```json
{
  "success": true,
  "top_prediction": {
    "class_name": "Tomato_early_blight",
    "display_name": "Tomato Early Blight",
    "confidence": 99.42,
    "plant": "Tomato",
    "severity": "Moderate",
    "description": "Fungal infection caused by Alternaria solani causing concentric bullseye rings on older lower leaves.",
    "remedies": [
      "Prune affected lower leaves to improve air circulation.",
      "Avoid overhead sprinkler watering; irrigate at soil base.",
      "Apply copper octanoate or chlorothalonil fungicide preventively."
    ]
  },
  "predictions": [
    { "class_name": "Tomato_early_blight", "confidence": 99.42, ... },
    { "class_name": "Tomato_septoria_leaf_spot", "confidence": 0.45, ... },
    { "class_name": "Tomato_healthy", "confidence": 0.08, ... }
  ],
  "model_loaded": true,
  "model_checkpoint": "swin_model/1.pth",
  "model_arch": "Swin Transformer-S (23 classes)"
}
```

---

## 📁 Repository Structure

```
Swin-Plant-Disease-Model/
├── backend/
│   ├── class_names.py             # 23-class ordering, botanical display names, symptoms & remedies
│   ├── main.py                    # FastAPI server, endpoints, CORS & confidence validation
│   ├── model.py                   # Swin-S architecture, checkpoint key remapping & inference pipeline
│   └── requirements.txt           # Python dependencies (fastapi, torch, torchvision, pillow, uvicorn)
├── frontend/
│   ├── public/                    # Static assets & quick test leaf samples
│   ├── src/
│   │   ├── components/
│   │   │   ├── ArchitectureDiagram.jsx     # Interactive 4-stage Swin pipeline visualizer
│   │   │   ├── ConfusionMatrixHeatmap.jsx  # Interactive confusion matrix heatmap
│   │   │   ├── DiseaseIndex3D.jsx          # Chapter 06: Searchable Botanical Herbarium & Dossiers
│   │   │   ├── MetricsComparisonChart.jsx  # Macro vs Weighted benchmark bar charts
│   │   │   ├── ModelHero.jsx               # Chapter 05: Benchmark headline summary
│   │   │   ├── ModelTransparency.jsx       # Chapter 05: Multi-tab AI transparency module
│   │   │   ├── Navbar3D.jsx                # Responsive navbar with Chapter anchor links
│   │   │   ├── PerClassMetricsTable.jsx    # Complete 23-class precision/recall/F1 table
│   │   │   ├── RapidkertHero.jsx           # Chapter 01: Hero canopy with real-time stats
│   │   │   ├── ScannerTerminal.jsx         # Chapter 03: Foliar intake scanner & live prediction
│   │   │   ├── SwinArchitecture3D.jsx      # Chapter 04: Neural architecture chapter cards
│   │   │   ├── ThemeSwitcher.jsx           # Dynamic 3-theme switcher (Aurora, Rapidkert, Multispectral)
│   │   │   ├── ThreeBotanicalScene.jsx     # Three.js WebGL procedural floating canopy
│   │   │   ├── ThreeSpecimenViewer.jsx     # Chapter 02: 3D foliar specimen studio
│   │   │   └── TrainingConfigDetails.jsx   # Chapter 05: Comprehensive training parameters & setup
│   │   ├── App.jsx                         # Main application orchestrator
│   │   ├── index.css                       # Complete design system tokens & glassmorphic styling
│   │   └── main.jsx                        # React root mounting
│   ├── index.html                          # HTML5 shell
│   ├── package.json                        # Node dependencies & Vite build scripts
│   └── vite.config.js                      # Vite configuration with proxy rules
├── swin_model/
│   └── 1.pth                               # Fine-tuned Swin Transformer-S PyTorch checkpoint
├── finalmodel.ipynb                        # Complete training, evaluation & metrics notebook
├── generate_project_report.py              # Word document technical report generator
└── README.md                               # Project documentation
```

---

## 🌟 Interactive UI Highlights

1. **Chapter 01 — The Living Canopy**: Procedural 3D botanical foliage rendered in Three.js with dynamic lighting and camera drift.
2. **Chapter 02 — 3D Specimen Studio**: Interactive foliar inspection studio with 3D specimen controls.
3. **Chapter 03 — Foliar Intake Scanner**: Drag-and-drop leaf scanner with live sample presets, real-time confidence meters, and alternative probability candidates.
4. **Chapter 04 — Swin-S Pipeline**: Interactive stage-by-stage visualizer explaining patch partitioning, local attention windows, shifted windows (SW-MSA), and the 768-dim classification head.
5. **Chapter 05 — AI Benchmarks & Model Transparency**: Full audit suite with 6 headline metrics, interactive training curves, 23-class evaluation table, confusion matrix, and complete hardware parameters.
6. **Chapter 06 — Botanical Herbarium**: Filterable directory across all 23 plant diseases with clickable Dossier modals delivering agronomic management protocols.

---

## 🤝 Acknowledgments & References

* **Smart India Hackathon (SIH 2026)** for motivating technology-driven solutions for agricultural sustainability.
* **Microsoft Research** for the foundational paper: *[Swin Transformer: Hierarchical Vision Transformer using Shifted Windows](https://arxiv.org/abs/2103.14030)*.
* **PyTorch & Torchvision Teams** for state-of-the-art vision transformer implementations.
* **International Integrated Pest Management (IPM)** standards for agronomic foliar disease remedies.

---
*Developed with ❤️ for Farmers, Agronomists, and AI Researchers.*
