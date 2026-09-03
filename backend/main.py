"""
main.py — FastAPI Backend for Plant Disease Classifier

A clean, easy-to-understand FastAPI backend that:
1. Accepts uploaded plant leaf images.
2. Runs inference using a trained Swin Transformer model.
3. Returns top disease predictions with confidence scores, descriptions, and remedies.
"""

import os
import uvicorn
from typing import List, Optional
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Import model inference engine and metadata
from model import predict, get_model, DEVICE, MODEL_PATH

# Minimum confidence threshold (percentage) to consider a prediction reliable
MIN_CONFIDENCE_PERCENT = 40.0

# ------------------------------------------------------------------------------
# 1. FastAPI App Initialization
# ------------------------------------------------------------------------------
app = FastAPI(
    title="Plant Disease Classifier API",
    description="Upload a plant leaf image to detect diseases and view actionable remedies.",
    version="1.0.0",
)

# ------------------------------------------------------------------------------
# 2. CORS (Cross-Origin Resource Sharing)
#    Allows the frontend (React / Vite on localhost:5173 or localhost:3000)
#    to communicate directly with this backend API.
# ------------------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        # Allow all origins in local development
    allow_credentials=True,
    allow_methods=["*"],        # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],        # Allow all headers
)

# ------------------------------------------------------------------------------
# 3. Pydantic Models (Schemas for API Responses)
# ------------------------------------------------------------------------------
class Prediction(BaseModel):
    class_name: str
    display_name: str
    confidence: float
    plant: str
    severity: str
    description: str
    remedies: List[str]


class PredictResponse(BaseModel):
    success: bool
    predictions: List[Prediction]
    top_prediction: Optional[Prediction] = None
    model_loaded: bool
    message: Optional[str] = None
    model_checkpoint: Optional[str] = "swin_model/1.pth"
    model_arch: Optional[str] = "Swin Transformer-S (23 classes)"


class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    model_path: str
    device: str


# ------------------------------------------------------------------------------
# 4. Startup Event: Model Pre-loading
# ------------------------------------------------------------------------------
@app.on_event("startup")
def startup_load_model():
    """Load the neural network into memory when FastAPI starts."""
    import traceback
    try:
        get_model()
        print("[OK] Plant disease model loaded successfully into memory.")
    except Exception as err:
        # Print a large, unmissable banner so this failure can NEVER go
        # unnoticed while the server keeps running.
        banner = "\n" + "=" * 70 + "\n"
        banner += "  !! FATAL: MODEL FAILED TO LOAD ON STARTUP — SERVER IS BROKEN !!\n"
        banner += "=" * 70 + "\n"
        banner += f"  Error type : {type(err).__name__}\n"
        banner += f"  Error msg  : {err}\n"
        banner += "-" * 70 + "\n"
        banner += traceback.format_exc()
        banner += "=" * 70
        print(banner)
        raise RuntimeError(
            f"Model startup failure ({type(err).__name__}): {err}"
        ) from err


# ------------------------------------------------------------------------------
# 5. API Endpoints
# ------------------------------------------------------------------------------
@app.get("/health", response_model=HealthResponse, tags=["Health"])
def health_check():
    """Check API server and Swin Transformer model health."""
    try:
        model = get_model()
        is_loaded = model is not None
    except Exception:
        is_loaded = False

    return HealthResponse(
        status="ok" if is_loaded else "model_not_ready",
        model_loaded=is_loaded,
        model_path=MODEL_PATH,
        device=str(DEVICE),
    )


@app.post("/predict", response_model=PredictResponse, tags=["Prediction"])
async def predict_disease(file: UploadFile = File(...)):
    """
    Accepts an uploaded image of a plant leaf, validates it, and runs Swin-S inference.
    Returns the top-3 predictions with confidence scores and disease management remedies.
    """
    # Step 1: Read image bytes
    image_bytes = await file.read()
    if not image_bytes:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    # Step 2: Enforce file size limit (10MB)
    max_file_size = 10 * 1024 * 1024
    if len(image_bytes) > max_file_size:
        raise HTTPException(status_code=413, detail="File size exceeds the 10MB limit.")

    # Step 3: Run inference through the real Swin-S model from 1.pth
    try:
        predictions = predict(image_bytes, top_k=3)
    except ValueError as err:
        raise HTTPException(status_code=400, detail=str(err)) from err
    except FileNotFoundError as err:
        raise HTTPException(status_code=503, detail=str(err)) from err
    except Exception as err:
        raise HTTPException(status_code=500, detail=f"Inference error: {err}") from err

    MIN_CONFIDENCE_PERCENT = 40.0
    top_prediction = predictions[0] if predictions else None

    # Step 4: Non-foliar / Out-of-Distribution specimen safeguard
    # If highest probability is below 40%, the photo is likely not a supported crop leaf
    # (e.g. notebook page, document, handwriting, or non-plant object).
    if not top_prediction or top_prediction["confidence"] < MIN_CONFIDENCE_PERCENT:
        return PredictResponse(
            success=True,
            predictions=[],
            top_prediction=None,
            model_loaded=True,
            message=f"No reliable prediction: top confidence is below {MIN_CONFIDENCE_PERCENT:.0f}%",
            model_checkpoint=os.path.basename(MODEL_PATH),
            model_arch="Swin Transformer-S (23 Classes)",
        )

    # Step 5: Return confident Swin-S prediction results
    return PredictResponse(
        success=True,
        predictions=predictions,
        top_prediction=top_prediction,
        model_loaded=True,
        message=None,
        model_checkpoint=os.path.basename(MODEL_PATH),
        model_arch="Swin Transformer-S (23 Classes)",
    )


# ------------------------------------------------------------------------------
# 6. Run Server
# ------------------------------------------------------------------------------
if __name__ == "__main__":
    # Run server locally on port 8001
    uvicorn.run("main:app", host="127.0.0.1", port=8001, reload=True)
