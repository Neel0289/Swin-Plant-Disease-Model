import React, { useState } from 'react';

/* ─── Shared row component ───────────────────────────────────────────────── */
const Row = ({ label, value, mono = false }) => (
  <div style={{
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '10px 0',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  }}>
    <span style={{
      flex: '0 0 auto',
      width: '230px',
      fontSize: '0.8rem',
      fontWeight: 600,
      color: 'var(--text-secondary)',
      lineHeight: 1.5,
    }}>
      {label}
    </span>
    <span style={{
      flex: 1,
      fontSize: mono ? '0.8rem' : '0.85rem',
      fontWeight: 500,
      color: '#f0fdf4',
      fontFamily: mono ? "'Fira Mono', 'Consolas', monospace" : 'inherit',
      lineHeight: 1.5,
      wordBreak: 'break-word',
    }}>
      {value}
    </span>
  </div>
);

/* ─── Outcome hero cards data ────────────────────────────────────────────── */
const outcomeCards = [
  {
    icon: '🎯', label: 'Test Accuracy', value: '98.02%',
    sub: '10,503-image held-out split — never seen during training',
    accent: 'linear-gradient(135deg,#10b981 0%,#059669 100%)',
  },
  {
    icon: '🏆', label: 'Top-5 Accuracy', value: '99.70%',
    sub: 'True class present in top-5 confidence candidates',
    accent: 'linear-gradient(135deg,#3b82f6 0%,#1d4ed8 100%)',
  },
  {
    icon: '⚖️', label: 'Balanced Accuracy', value: '97.78%',
    sub: 'Macro-averaged recall — unbiased across 23 classes',
    accent: 'linear-gradient(135deg,#8b5cf6 0%,#6d28d9 100%)',
  },
  {
    icon: '✨', label: 'Weighted F1-Score', value: '98.02%',
    sub: 'Harmonic mean of precision & recall (weighted)',
    accent: 'linear-gradient(135deg,#ec4899 0%,#be185d 100%)',
  },
  {
    icon: '🛡️', label: 'Macro Specificity', value: '99.91%',
    sub: 'True-negative rate macro-averaged across all classes',
    accent: 'linear-gradient(135deg,#f59e0b 0%,#d97706 100%)',
  },
  {
    icon: '📐', label: "MCC / Cohen's κ", value: '0.9790',
    sub: "Matthews CC and Cohen's Kappa — both 0.9790",
    accent: 'linear-gradient(135deg,#14b8a6 0%,#0f766e 100%)',
  },
];

/* ─── Main component ─────────────────────────────────────────────────────── */
export default function TrainingConfigDetails() {
  // Track which sections are collapsed (none by default — all open)
  const [collapsed, setCollapsed] = useState({});
  const toggle = (id) => setCollapsed(prev => ({ ...prev, [id]: !prev[id] }));

  const Section = ({ id, emoji, title, sub, children }) => {
    const isCollapsed = collapsed[id];
    return (
      <div className="glass-card" style={{ padding: '24px', marginBottom: '20px' }}>
        <button
          onClick={() => toggle(id)}
          style={{
            all: 'unset',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: isCollapsed ? 0 : '16px',
          }}
        >
          <div>
            <div style={{
              fontSize: '0.72rem',
              color: 'var(--accent)',
              textTransform: 'uppercase',
              fontWeight: 700,
              letterSpacing: '0.09em',
              marginBottom: '2px',
            }}>
              {emoji} {title}
            </div>
            {sub && (
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>{sub}</p>
            )}
          </div>
          <span style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
            transition: 'transform 0.25s ease',
            marginLeft: '12px',
            flexShrink: 0,
          }}>▾</span>
        </button>
        {!isCollapsed && <div>{children}</div>}
      </div>
    );
  };

  return (
    <div style={{ marginBottom: '40px' }}>

      {/* Page heading */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '28px',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
            Training Configuration &amp; Experiment Setup
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0 }}>
            Every verified hyperparameter, dataset statistic, and hardware detail used to train PhytoScan's Swin-S backbone.
          </p>
        </div>
        <div style={{
          fontSize: '0.82rem',
          color: 'var(--text-secondary)',
          background: 'rgba(16,185,129,0.1)',
          padding: '6px 14px',
          borderRadius: '999px',
          border: '1px solid rgba(16,185,129,0.2)',
          whiteSpace: 'nowrap',
        }}>
          ✅ Values verified from training logs
        </div>
      </div>

      {/* Outcome hero cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        marginBottom: '32px',
      }}>
        {outcomeCards.map((card, idx) => (
          <div
            key={idx}
            className="glass-card"
            style={{ padding: '20px', position: 'relative', overflow: 'hidden' }}
          >
            {/* ambient glow */}
            <div style={{
              position: 'absolute', top: '-20px', right: '-20px',
              width: '80px', height: '80px', borderRadius: '50%',
              background: card.accent, opacity: 0.15, filter: 'blur(20px)',
              pointerEvents: 'none',
            }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '1.4rem' }}>{card.icon}</span>
              <span style={{
                fontSize: '0.68rem', fontWeight: 700, padding: '3px 8px', borderRadius: '999px',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>Test Set</span>
            </div>
            <div style={{
              fontSize: '2.2rem', fontWeight: 900, letterSpacing: '-0.03em',
              lineHeight: 1.1, marginBottom: '4px', color: '#ffffff',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}>
              {card.value}
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
              {card.label}
            </div>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              {card.sub}
            </div>
          </div>
        ))}
      </div>

      {/* ── Section 1: Hardware & Environment ── */}
      <Section id="hw" emoji="🖥️" title="Hardware & Environment" sub="GPU, CUDA stack, precision flags, and reproducibility seed">
        <Row label="GPU" value="Tesla T4 · 14.56 GB VRAM" />
        <Row label="CPU cores detected" value="4" />
        <Row label="PyTorch / Torchvision / CUDA" value="2.10.0+cu128 / 0.25.0+cu128 / CUDA 12.8" mono />
        <Row label="TF32 matmul + cuDNN" value={'Enabled · float32 matmul precision set to "high"'} />
        <Row label="cuDNN benchmark mode" value="Enabled" />
        <Row label="torch.compile()" value="Attempted — automatic eager-mode fallback if unsupported" />
        <Row label="Mixed precision" value="torch.autocast fp16 + GradScaler" mono />
        <Row label="Reproducibility seed" value="42 (torch, numpy, CUDA)" />
      </Section>

      {/* ── Section 2: Dataset ── */}
      <Section id="dataset" emoji="🗂️" title="Dataset" sub="Source, class count, and image-level quality verification">
        <Row label="Source" value="final_combined_plant_dataset (merged multi-source dataset)" mono />
        <Row label="Classes" value="23 (verified via hard assertion before training)" />
        <Row label="Total validated images" value="105,023" />
        <Row label="Corrupted / unreadable excluded" value="0" />
        <Row label="Class imbalance ratio (max / min)" value="Largest: Grape_black_rot (14,058 images) · Smallest: Peach_healthy (2,792 images)" />
      </Section>

      {/* ── Section 3: Data Split ── */}
      <Section id="split" emoji="✂️" title="Data Split" sub="Stratified split · random_state=42">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '14px',
          paddingTop: '4px',
        }}>
          {[
            { label: 'Train', value: '84,018', pct: '80.00%', color: '#10b981' },
            { label: 'Validation', value: '10,502', pct: '10.00%', color: '#3b82f6' },
            { label: 'Test', value: '10,503', pct: '10.00%', color: '#8b5cf6' },
          ].map(s => (
            <div key={s.label} style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255,255,255,0.04)',
              border: `1.5px solid ${s.color}40`,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: s.color, lineHeight: 1.1 }}>
                {s.value}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#f0fdf4', marginTop: '4px' }}>
                {s.label}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                {s.pct} of total
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Section 4: Preprocessing & Augmentation ── */}
      <Section id="aug" emoji="🔄" title="Preprocessing & Augmentation" sub="Transform pipelines for train vs. val/test, normalization, and sampler">
        <Row label="Train augmentation" value="RandomResizedCrop(224, scale=0.80–1.0) · RandomHorizontalFlip(p=0.5) · RandomApply ColorJitter (brightness=0.2, contrast=0.2, saturation=0.15, hue=0.03) @ p=0.5" />
        <Row label="Validation / Test" value="Deterministic Resize(256) → CenterCrop(224) · No random augmentation" />
        <Row label="Normalization mean" value="[0.485, 0.456, 0.406]  (ImageNet)" mono />
        <Row label="Normalization std" value="[0.229, 0.224, 0.225]  (ImageNet)" mono />
        <Row label="Class imbalance handling" value="WeightedRandomSampler using √(inverse-frequency) class weights — applied automatically because imbalance ratio exceeded 1.5" />
      </Section>

      {/* ── Section 5: Model Architecture ── */}
      <Section id="arch" emoji="🧠" title="Model Architecture" sub="Backbone, custom head, and input resolution">
        <Row label="Backbone" value="Swin Transformer Small — swin_small_patch4_window7_224 (timm, ImageNet-pretrained)" mono />
        <Row label="Custom classification head" value="Dropout(p=0.3) → Linear(768 → 23)" mono />
        <Row label="Input resolution" value="224 × 224 px" />
      </Section>

      {/* ── Section 6: Training Hyperparameters ── */}
      <Section id="hparams" emoji="⚙️" title="Training Hyperparameters" sub="Optimizer, scheduler, loss function, and stopping criteria">
        <Row label="Batch size" value="128" />
        <Row label="DataLoader workers" value="3 (derived from 4 detected CPU cores, capped conservatively)" />
        <Row label="Optimizer" value="AdamW — lr 5e-5, weight decay 1e-4" mono />
        <Row label="LR schedule" value="CosineAnnealingLR — T_max = 20 epochs" mono />
        <Row label="Loss function" value="CrossEntropyLoss with label smoothing 0.1" mono />
        <Row label="Gradient clipping" value="max norm 1.0" />
        <Row label="Max epochs / early-stop patience" value="20 epochs · patience 7 (monitored on validation loss)" />
        <Row label="Actual stopping epoch" value="Epoch 17 — patience exhausted" />
      </Section>

      {/* ── Section 7: Training Outcome ── */}
      <Section id="outcome" emoji="🏁" title="Training Outcome" sub="Best checkpoint and granular held-out test-set metrics">
        <Row label="Best checkpoint saved at" value="Epoch 10 · Val loss 0.6645 · Val accuracy 98.17%" />

        <div style={{
          marginTop: '20px',
          marginBottom: '10px',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'var(--accent)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}>
          Final test-set results — held-out 10,503-image split, never seen during training
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
          gap: '10px',
        }}>
          {[
            { label: 'Test Accuracy', value: '98.02%' },
            { label: 'Top-5 Accuracy', value: '99.70%' },
            { label: 'Balanced Accuracy', value: '97.78%' },
            { label: 'Precision (macro)', value: '97.74%' },
            { label: 'Precision (weighted)', value: '98.03%' },
            { label: 'Recall (macro)', value: '97.78%' },
            { label: 'Recall (weighted)', value: '98.02%' },
            { label: 'F1 Score (macro)', value: '97.76%' },
            { label: 'F1 Score (weighted)', value: '98.02%' },
            { label: 'Specificity (macro)', value: '99.91%' },
            { label: 'Matthews CC (MCC)', value: '0.9790' },
            { label: "Cohen's Kappa", value: '0.9790' },
          ].map((m, i) => (
            <div key={i} style={{
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(16,185,129,0.06)',
              border: '1px solid rgba(16,185,129,0.18)',
            }}>
              <div style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                color: '#f0fdf4',
                lineHeight: 1.1,
                fontVariantNumeric: 'tabular-nums',
              }}>
                {m.value}
              </div>
              <div style={{
                fontSize: '0.76rem',
                color: 'var(--text-secondary)',
                marginTop: '4px',
                fontWeight: 500,
              }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </Section>

    </div>
  );
}
