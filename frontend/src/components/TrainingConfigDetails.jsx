import React, { useState } from 'react';

/* ─── Shared row component ───────────────────────────────────────────────── */
const Row = ({ label, value, mono = false }) => (
  <div className="rk-config-row">
    <span className="rk-config-row-label">{label}</span>
    <span className={`rk-config-row-value ${mono ? 'is-mono' : ''}`}>
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
      <div className="rk-config-section-card">
        <button
          onClick={() => toggle(id)}
          className="rk-config-section-toggle"
        >
          <div className="rk-config-section-header">
            <div className="rk-config-section-icon">{emoji}</div>
            <div>
              <div className="rk-config-section-title">{title}</div>
              {sub && <p className="rk-config-section-sub">{sub}</p>}
            </div>
          </div>
          <span className={`rk-config-chevron ${isCollapsed ? 'is-collapsed' : ''}`}>▾</span>
        </button>
        {!isCollapsed && <div className="rk-config-section-body">{children}</div>}
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
          <h3 className="rk-benchmark-title" style={{ fontSize: '1.4rem', marginBottom: '4px' }}>
            Training Configuration &amp; Experiment Setup
          </h3>
          <p className="rk-benchmark-subtitle">
            Every verified hyperparameter, dataset statistic, and hardware detail used to train PhytoScan's Swin-S backbone.
          </p>
        </div>
        <div className="rk-transparency-tag" style={{ margin: 0 }}>
          <span>✅ Values verified from training logs</span>
        </div>
      </div>

      {/* Outcome hero cards */}
      <div className="rk-benchmark-grid" style={{ marginBottom: '32px' }}>
        {outcomeCards.map((card, idx) => (
          <div key={idx} className="rk-benchmark-stat-card">
            {/* ambient glow */}
            <div
              className="rk-benchmark-glow"
              style={{ background: card.accent }}
            />
            <div>
              <div className="rk-benchmark-card-top">
                <span className="rk-benchmark-icon">{card.icon}</span>
                <span className="rk-benchmark-badge">Test Set</span>
              </div>
              <div className="rk-benchmark-val">{card.value}</div>
              <div className="rk-benchmark-name">{card.label}</div>
            </div>
            <div className="rk-benchmark-subtext">{card.sub}</div>
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
        <div className="rk-config-split-grid">
          {[
            { label: 'Train', value: '84,018', pct: '80.00%', color: '#10b981' },
            { label: 'Validation', value: '10,502', pct: '10.00%', color: '#3b82f6' },
            { label: 'Test', value: '10,503', pct: '10.00%', color: '#8b5cf6' },
          ].map(s => (
            <div key={s.label} className="rk-config-split-card" style={{ borderColor: `${s.color}50` }}>
              <div className="rk-config-split-val" style={{ color: s.color }}>
                {s.value}
              </div>
              <div className="rk-config-split-label">
                {s.label}
              </div>
              <div className="rk-config-split-pct">
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
          marginTop: '24px',
          marginBottom: '14px',
          fontSize: '0.78rem',
          fontWeight: 800,
          color: 'var(--emerald)',
          fontFamily: 'var(--font-mono)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}>
          Final test-set results — held-out 10,503-image split, never seen during training
        </div>

        <div className="rk-config-outcome-grid">
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
            <div key={i} className="rk-config-outcome-pill">
              <div className="rk-config-outcome-val">
                {m.value}
              </div>
              <div className="rk-config-outcome-label">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </Section>

    </div>
  );
}
