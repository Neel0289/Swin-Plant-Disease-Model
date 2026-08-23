import React, { useState } from 'react';

export default function ArchitectureDiagram() {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      title: '1. Input & Patch Partition',
      subtitle: '224×224×3 RGB Tensor',
      details: 'Splits raw RGB leaf image into 4x4 non-overlapping patches. Projects patch pixels into a 96-dim embedding vector per patch.',
      badge: 'Input Prep',
      dim: '56×56 Patches (96-dim)'
    },
    {
      title: '2. Stages 1 & 2 (Hierarchical Maps)',
      subtitle: 'Windowed Self-Attention',
      details: 'Computes self-attention within local 7x7 windows (W-MSA). Stage 2 merges 2x2 neighboring patches to double embedding dimension from 96 to 192.',
      badge: 'Local Attention',
      dim: 'Stage 1: 96-dim | Stage 2: 192-dim'
    },
    {
      title: '3. Stage 3 (Deep Swin Blocks)',
      subtitle: 'Shifted Window Attention (SW-MSA)',
      details: 'Main feature extraction backbone with 18 consecutive Swin Transformer blocks. Shifted windowing enables cross-window connections while keeping O(N) complexity linear.',
      badge: '18 Transformer Blocks',
      dim: '14×14 Resolution (384-dim)'
    },
    {
      title: '4. Stage 4 & Classifier Head',
      subtitle: '768-dim Head ➔ 23 Logits',
      details: 'Final patch merger outputs a 768-dim representation vector. Global Average Pooling feeds into a Linear layer producing 23 raw logits for softmax probability distribution.',
      badge: 'Final Head',
      dim: '768-dim Vector ➔ 23 Classes'
    }
  ];

  return (
    <div className="glass-card" style={{ padding: '28px', marginBottom: '40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.08em' }}>
            Neural Network Pipeline
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Swin Transformer-S Hierarchical Flow
          </h3>
        </div>
        <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', background: 'rgba(16,185,129,0.1)', padding: '6px 14px', borderRadius: '999px', border: '1px solid rgba(16,185,129,0.2)' }}>
          Click a stage to inspect architecture details
        </div>
      </div>

      {/* Interactive Visual Pipeline Diagram */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px',
        marginBottom: '24px',
      }}>
        {stages.map((stage, idx) => {
          const isActive = activeStage === idx;
          return (
            <div
              key={idx}
              onClick={() => setActiveStage(idx)}
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                background: isActive ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.03)',
                border: `1.5px solid ${isActive ? 'var(--accent)' : 'rgba(255,255,255,0.08)'}`,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
              }}
            >
              <div style={{
                display: 'inline-block',
                fontSize: '0.68rem',
                fontWeight: 700,
                color: isActive ? '#10b981' : 'var(--text-muted)',
                background: isActive ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.05)',
                padding: '2px 8px',
                borderRadius: '4px',
                marginBottom: '8px',
                textTransform: 'uppercase'
              }}>
                {stage.badge}
              </div>

              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                {stage.title}
              </div>

              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                {stage.dim}
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Stage Detailed Breakdown Box */}
      <div style={{
        padding: '20px',
        borderRadius: 'var(--radius-md)',
        background: 'rgba(4,13,7,0.6)',
        border: '1px solid var(--glass-border-strong)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px',
      }}>
        <div style={{
          fontSize: '2rem',
          padding: '12px',
          borderRadius: '12px',
          background: 'rgba(16,185,129,0.15)',
          border: '1px solid rgba(16,185,129,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {activeStage === 0 ? '🖼️' : activeStage === 1 ? '🔲' : activeStage === 2 ? '⚡' : '🧠'}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f0fdf4' }}>
              {stages[activeStage].title}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600 }}>
              [{stages[activeStage].subtitle}]
            </span>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {stages[activeStage].details}
          </p>
        </div>
      </div>
    </div>
  );
}
