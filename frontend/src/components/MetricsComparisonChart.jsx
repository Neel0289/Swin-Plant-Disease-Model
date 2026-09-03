import React from 'react';
import { HEADLINE_METRICS } from '../data/modelMetricsData';

export default function MetricsComparisonChart() {
  const metrics = [
    {
      name: 'Precision',
      macro: HEADLINE_METRICS.macroPrecision * 100,
      weighted: HEADLINE_METRICS.weightedPrecision * 100,
      desc: 'Ability not to label a healthy or different disease sample as positive.'
    },
    {
      name: 'Recall / Sensitivity',
      macro: HEADLINE_METRICS.macroRecall * 100,
      weighted: HEADLINE_METRICS.weightedRecall * 100,
      desc: 'Ability to accurately detect all actual positive disease occurrences.'
    },
    {
      name: 'F1-Score',
      macro: HEADLINE_METRICS.macroF1 * 100,
      weighted: HEADLINE_METRICS.weightedF1 * 100,
      desc: 'Harmonic mean balancing precision and recall across all classes.'
    },
  ];

  return (
    <div className="glass-card" style={{ padding: '28px', marginBottom: '40px' }}>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--emerald)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.08em' }}>
          Aggregate Benchmark Comparison
        </div>
        <h3 className="rk-benchmark-title" style={{ fontSize: '1.4rem', marginBottom: '4px' }}>
          Macro vs. Weighted Evaluation Metrics
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Comparing unweighted class averages (Macro) against sample-weighted averages (Weighted)
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {metrics.map((item, idx) => (
          <div
            key={idx}
            style={{
              padding: '20px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
              {item.name}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.4 }}>
              {item.desc}
            </p>

            {/* Macro Bar */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Macro Average (Unweighted):</span>
                <strong style={{ color: 'var(--emerald)' }}>{item.macro.toFixed(2)}%</strong>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${item.macro}%`,
                    background: 'linear-gradient(90deg, var(--emerald), var(--clay-lift, #34d399))',
                    borderRadius: '999px',
                    transition: 'width 1s ease'
                  }}
                />
              </div>
            </div>

            {/* Weighted Bar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Weighted Average (Sample Weighted):</span>
                <strong style={{ color: '#60a5fa' }}>{item.weighted.toFixed(2)}%</strong>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${item.weighted}%`,
                    background: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
                    borderRadius: '999px',
                    transition: 'width 1s ease'
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
