import React from 'react';
import { HEADLINE_METRICS } from '../data/modelMetricsData';

export default function MetricStatCards() {
  const cards = [
    {
      label: 'Test Accuracy',
      value: '98.02%',
      sub: '10,295 / 10,503 correct test predictions',
      accent: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      badge: 'Held-out 10%',
      icon: '🎯'
    },
    {
      label: 'Top-5 Accuracy',
      value: '99.70%',
      sub: 'True disease present in top 5 confidence candidates',
      accent: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      badge: 'Multi-class',
      icon: '🏆'
    },
    {
      label: 'Balanced Accuracy',
      value: '97.78%',
      sub: 'Macro-averaged recall across all 23 classes',
      accent: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
      badge: 'Unbiased',
      icon: '⚖️'
    },
    {
      label: 'Weighted F1-Score',
      value: '98.02%',
      sub: 'Harmonic mean of precision and recall (weighted)',
      accent: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
      badge: 'Optimal',
      icon: '✨'
    },
    {
      label: 'Macro Specificity',
      value: '99.91%',
      sub: 'True negative rate averaged across all classes',
      accent: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      badge: 'Low FPR',
      icon: '🛡️'
    },
    {
      label: 'MCC / Cohen Kappa',
      value: '0.9790',
      sub: 'Matthews Correlation Coefficient (range -1 to +1)',
      accent: 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)',
      badge: 'Reliability',
      icon: '📈'
    },
  ];

  return (
    <div style={{ marginBottom: '40px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Benchmark Highlights (Held-Out Test Set)
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Evaluated on 10,503 unobserved test images across 23 plant disease categories
          </p>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
      }}>
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="glass-card"
            style={{
              padding: '20px',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* Ambient top right glow */}
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: card.accent,
              opacity: 0.15,
              filter: 'blur(20px)',
              pointerEvents: 'none'
            }} />

            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '1.4rem' }}>{card.icon}</span>
                <span style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: '999px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {card.badge}
                </span>
              </div>

              <div style={{
                fontSize: '2.2rem',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: '4px',
                color: '#ffffff',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
              }}>
                {card.value}
              </div>

              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                {card.label}
              </div>
            </div>

            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4, marginTop: '8px' }}>
              {card.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
