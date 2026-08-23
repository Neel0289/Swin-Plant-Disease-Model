import React from 'react';
import { MODEL_SPECS } from '../data/modelMetricsData';

export default function ModelHero() {
  return (
    <div style={{ marginBottom: '40px' }}>
      {/* Top Tagline */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 16px',
        borderRadius: '999px',
        background: 'rgba(16,185,129,0.12)',
        border: '1px solid rgba(16,185,129,0.3)',
        color: '#10b981',
        fontSize: '0.85rem',
        fontWeight: 600,
        marginBottom: '16px',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
      }}>
        <span>⚡ Swin Transformer-S (Swin-S)</span>
        <span>•</span>
        <span>23 Crop Disease Classes</span>
      </div>

      <h2 style={{
        fontSize: 'clamp(2rem, 4vw, 3.2rem)',
        fontWeight: 900,
        lineHeight: 1.1,
        letterSpacing: '-0.03em',
        marginBottom: '16px',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #a7f3d0 50%, #10b981 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        Behind the AI: Neural Architecture & Benchmark Validation
      </h2>

      <p style={{
        fontSize: '1.05rem',
        color: 'var(--text-secondary)',
        maxWidth: '840px',
        lineHeight: 1.6,
        marginBottom: '32px',
      }}>
        PhytoScan is driven by a fine-tuned <strong>Swin Transformer Small (Swin-S)</strong> vision architecture. 
        Trained with mixed-precision FP16 on a GPU instance, the model achieves <strong>98.02% test accuracy</strong> across 
        10,503 held-out test samples from a unified 23-class agricultural dataset.
      </p>

      {/* Grid of 4 Key Configuration Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '16px',
      }}>
        {/* Card 1: Architecture */}
        <div className="glass-card" style={{ padding: '20px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{
              width: 38, height: 38, borderRadius: '10px',
              background: 'rgba(16,185,129,0.15)', color: '#10b981',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.2rem', fontWeight: 700
            }}>
              🧠
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 700 }}>
                Architecture
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Swin-S Backbone
              </div>
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            768-dim classifier head, shifted window self-attention (W-MSA/SW-MSA), 50M parameters fine-tuned via <code>timm</code>.
          </p>
        </div>

        {/* Card 2: Dataset Provenance */}
        <div className="glass-card" style={{ padding: '20px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{
              width: 38, height: 38, borderRadius: '10px',
              background: 'rgba(16,185,129,0.15)', color: '#10b981',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.2rem', fontWeight: 700
            }}>
              📦
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 700 }}>
                Dataset Provenance
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                105,030 Images (23 Classes)
              </div>
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Unified dataset merged from NPD, PlantDoc, and PlantWild sources. 80/10/10 stratified train/val/test split.
          </p>
        </div>

        {/* Card 3: Training Rig */}
        <div className="glass-card" style={{ padding: '20px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{
              width: 38, height: 38, borderRadius: '10px',
              background: 'rgba(16,185,129,0.15)', color: '#10b981',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.2rem', fontWeight: 700
            }}>
              ⚙️
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 700 }}>
                Hardware & Compute
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Kaggle Dual NVIDIA T4 (2x 16GB)
              </div>
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Mixed precision FP16 (AMP GradScaler), multi-GPU DataParallel, batch size 128, <code>torch.compile</code> accelerated.
          </p>
        </div>

        {/* Card 4: Optimization */}
        <div className="glass-card" style={{ padding: '20px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{
              width: 38, height: 38, borderRadius: '10px',
              background: 'rgba(16,185,129,0.15)', color: '#10b981',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.2rem', fontWeight: 700
            }}>
              🎯
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 700 }}>
                Hyperparameters
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                AdamW + Cosine Scheduler
              </div>
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Label smoothing (0.1), Sqrt inverse-freq class sampler, early stopping (patience 7, best epoch 10).
          </p>
        </div>
      </div>
    </div>
  );
}
