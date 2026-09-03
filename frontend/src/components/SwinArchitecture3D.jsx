import React, { useState } from 'react';
import { Layers, Network, Cpu, ShieldCheck, CheckCircle2, ArrowRight, Activity, Terminal, Sparkles } from 'lucide-react';

export default function SwinArchitecture3D() {
  const [activeStage, setActiveStage] = useState(1);

  const stages = [
    {
      step: '01',
      id: 1,
      icon: Layers,
      title: 'Patch Partition & Linear Projection',
      badge: 'INPUT STAGE // 224×224×3',
      description:
        'The input leaf image is partitioned into non-overlapping 4×4 spatial patches. Each patch is treated as a token with 48 raw RGB values (4×4×3) and linearly projected to an embedding dimension C = 96.',
      specs: [
        { label: 'Patch Size', val: '4 × 4 px', detail: 'Spatial granularity' },
        { label: 'Token Count', val: '56 × 56 = 3,136', detail: 'Sequence length' },
        { label: 'Dimension (C)', val: '96 Channels', detail: 'Feature embedding' },
      ],
      techNote: 'Computes localized tokenization with zero pixel-level information loss before deep feature extraction.',
    },
    {
      step: '02',
      id: 2,
      icon: Network,
      title: 'Shifted Window Self-Attention',
      badge: 'CORE INNOVATION // W-MSA & SW-MSA',
      description:
        'Standard Vision Transformers suffer quadratic O(N²) computational complexity. Swin-S divides the token grid into localized 8×8 windows, achieving linear complexity O(M²·N), and alternates with Shifted Windows to model cross-window relations.',
      specs: [
        { label: 'Window Size (M)', val: '8 × 8 Tokens', detail: 'Local attention grid' },
        { label: 'Attention Complexity', val: 'Linear O(4MN)', detail: 'Efficient scaling' },
        { label: 'Shift Offset', val: '[4, 4] Tokens', detail: 'Cross-window bridge' },
      ],
      techNote: 'Allows microscopic pathogen lesion analysis while capturing global leaf venation patterns.',
    },
    {
      step: '03',
      id: 3,
      icon: Cpu,
      title: 'Hierarchical Patch Merging Pyramids',
      badge: 'STAGE 1 → 4 PYRAMID',
      description:
        'Four progressive hierarchical stages concatenate 2×2 neighboring patches and apply a linear projection to double the channel depth while halving the spatial resolution (56² → 28² → 14² → 7²).',
      specs: [
        { label: 'Stage Depths', val: '[2, 2, 18, 2] Blocks', detail: 'Transformer layers' },
        { label: 'Channels', val: '96 → 192 → 384 → 768', detail: 'Deep feature hierarchy' },
        { label: 'Attention Heads', val: '3, 6, 12, 24 Heads', detail: 'Multi-head subspaces' },
      ],
      techNote: 'Constructs multi-resolution representations analogous to traditional CNN feature pyramids.',
    },
    {
      step: '04',
      id: 4,
      icon: ShieldCheck,
      title: '23-Class Foliar Classifier Head',
      badge: 'SOFTMAX PREDICTION // 23 CLASSES',
      description:
        'A LayerNorm and adaptive global average pooling layer compresses the final 7×7 feature map into a 768-dimensional latent vector. A customized linear head computes calibrated logits across 23 foliar disease classes.',
      specs: [
        { label: 'Head In-Features', val: '768 Dimensions', detail: 'Bottleneck latent' },
        { label: 'Target Output', val: '23 Classes', detail: 'Crop pathology' },
        { label: 'Validation Top-1', val: '98.02%', detail: 'Test accuracy verified' },
      ],
      techNote: 'Trained on 54,305 curated PlantVillage foliar samples with AdamW optimizer and cosine annealing.',
    },
  ];

  return (
    <section id="architecture" className="rk-arch-stage">
      <div className="rk-section-shell">
        {/* Stage Header */}
        <div className="rk-stage-header">
          <div className="rk-stage-index">
            <span className="rk-index-num">04</span>
            <span className="rk-index-bar" />
            <span className="rk-index-tag">NEURAL ARCHITECTURE</span>
          </div>
          <h2 className="rk-stage-title">Swin Transformer-S Pipeline</h2>
          <p className="rk-stage-subtitle">
            An in-depth breakdown of how the hierarchical shifted-window vision transformer processes
            foliar imagery from raw pixels to verified clinical diagnosis.
          </p>
        </div>

        {/* Quick Stage Filter / Navigation Tabs */}
        <div className="rk-arch-tabs-bar">
          <div className="rk-arch-tabs-inner">
            {stages.map((stage) => {
              const Icon = stage.icon;
              const isActive = activeStage === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(stage.id)}
                  className={`rk-arch-tab-btn ${isActive ? 'is-active' : ''}`}
                >
                  <Icon size={14} className="rk-tab-icon" />
                  <span className="rk-tab-num">Stage {stage.step}</span>
                  <span className="rk-tab-title">{stage.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 Interactive Architectural Chapter Cards */}
        <div className="rk-arch-grid">
          {stages.map((stage) => {
            const isActive = activeStage === stage.id;
            const Icon = stage.icon;
            return (
              <div
                key={stage.step}
                onClick={() => setActiveStage(stage.id)}
                className={`rk-arch-card ${isActive ? 'is-active' : ''}`}
              >
                {/* Header Row: Stage badge + Category pill */}
                <div className="rk-arch-top">
                  <div className="rk-arch-step-pill">
                    <div className="rk-step-icon-wrap">
                      <Icon size={15} />
                    </div>
                    <span className="rk-step-label">STAGE {stage.step}</span>
                  </div>
                  <span className="rk-arch-badge">{stage.badge}</span>
                </div>

                <h3 className="rk-arch-title">{stage.title}</h3>
                <p className="rk-arch-desc">{stage.description}</p>

                {/* Technical Specs: Themed Mini-Cards Grid */}
                <div className="rk-arch-specs-wrap">
                  <div className="rk-specs-heading-row">
                    <span className="rk-specs-tag">TECHNICAL SPECIFICATIONS</span>
                    <span className="rk-specs-count">{stage.specs.length} PARAMETERS</span>
                  </div>

                  <div className="rk-specs-grid">
                    {stage.specs.map((spec) => (
                      <div key={spec.label} className="rk-spec-mini-card">
                        <div className="rk-spec-card-top">
                          <span className="rk-spec-indicator" />
                          <span className="rk-spec-label">{spec.label}</span>
                        </div>
                        <div className="rk-spec-val-wrap">
                          <span className="rk-spec-val">{spec.val}</span>
                        </div>
                        {spec.detail && (
                          <span className="rk-spec-detail">{spec.detail}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Engineering Note Themed Sub-Card */}
                <div className="rk-arch-note-card">
                  <div className="rk-arch-note-header">
                    <Terminal size={13} className="rk-note-icon" />
                    <span className="rk-note-title">ARCHITECTURAL TAKEAWAY</span>
                  </div>
                  <p className="rk-arch-note-text">
                    {stage.techNote}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

