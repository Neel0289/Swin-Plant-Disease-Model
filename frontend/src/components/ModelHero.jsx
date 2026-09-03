import React from 'react';
import { MODEL_SPECS } from '../data/modelMetricsData';

export default function ModelHero() {
  return (
    <div style={{ marginBottom: '44px' }}>
      {/* Top Tagline Badge */}
      <div className="rk-transparency-tag">
        <span>⚡ Swin Transformer-S (Swin-S)</span>
        <span>•</span>
        <span>23 Crop Disease Classes</span>
      </div>

      {/* Main Section Headline */}
      <h2 className="rk-transparency-title">
        Behind the AI: Neural Architecture & Benchmark Validation
      </h2>

      {/* Editorial Descriptive Paragraph */}
      <p className="rk-transparency-desc">
        PhytoScan is driven by a fine-tuned <strong>Swin Transformer Small (Swin-S)</strong> vision architecture. 
        Trained with mixed-precision FP16 on a GPU instance, the model achieves <strong>98.02% test accuracy</strong> across 
        10,503 held-out test samples from a unified 23-class agricultural dataset.
      </p>

      {/* Grid of 4 Key Configuration Cards */}
      <div className="rk-transparency-grid">
        {/* Card 1: Architecture */}
        <div className="rk-transparency-card">
          <div className="rk-transparency-card-header">
            <div className="rk-transparency-card-icon-box">
              🧠
            </div>
            <div className="rk-transparency-card-meta">
              <span className="rk-transparency-card-label">Architecture</span>
              <h4 className="rk-transparency-card-name">Swin-S Backbone</h4>
            </div>
          </div>
          <p className="rk-transparency-card-desc">
            768-dim classifier head, shifted window self-attention (W-MSA/SW-MSA), 50M parameters fine-tuned via <code>timm</code>.
          </p>
        </div>

        {/* Card 2: Dataset Provenance */}
        <div className="rk-transparency-card">
          <div className="rk-transparency-card-header">
            <div className="rk-transparency-card-icon-box">
              📦
            </div>
            <div className="rk-transparency-card-meta">
              <span className="rk-transparency-card-label">Dataset Provenance</span>
              <h4 className="rk-transparency-card-name">105,030 Images (23 Classes)</h4>
            </div>
          </div>
          <p className="rk-transparency-card-desc">
            Unified dataset merged from NPD, PlantDoc, and PlantWild sources. 80/10/10 stratified train/val/test split.
          </p>
        </div>

        {/* Card 3: Training Rig */}
        <div className="rk-transparency-card">
          <div className="rk-transparency-card-header">
            <div className="rk-transparency-card-icon-box">
              ⚙️
            </div>
            <div className="rk-transparency-card-meta">
              <span className="rk-transparency-card-label">Hardware & Compute</span>
              <h4 className="rk-transparency-card-name">Kaggle Dual NVIDIA T4 (2× 16GB)</h4>
            </div>
          </div>
          <p className="rk-transparency-card-desc">
            Mixed precision FP16 (AMP GradScaler), multi-GPU DataParallel, batch size 128, <code>torch.compile</code> accelerated.
          </p>
        </div>

        {/* Card 4: Optimization */}
        <div className="rk-transparency-card">
          <div className="rk-transparency-card-header">
            <div className="rk-transparency-card-icon-box">
              🎯
            </div>
            <div className="rk-transparency-card-meta">
              <span className="rk-transparency-card-label">Hyperparameters</span>
              <h4 className="rk-transparency-card-name">AdamW + Cosine Scheduler</h4>
            </div>
          </div>
          <p className="rk-transparency-card-desc">
            Label smoothing (0.1), Sqrt inverse-freq class sampler, early stopping (patience 7, best epoch 10).
          </p>
        </div>
      </div>
    </div>
  );
}
