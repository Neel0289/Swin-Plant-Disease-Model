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
    <div className="rk-benchmark-section">
      <div className="rk-benchmark-header">
        <h3 className="rk-benchmark-title">
          Benchmark Highlights (Held-Out Test Set)
        </h3>
        <p className="rk-benchmark-subtitle">
          Evaluated on 10,503 unobserved test images across 23 plant disease categories
        </p>
      </div>

      <div className="rk-benchmark-grid">
        {cards.map((card, idx) => (
          <div key={idx} className="rk-benchmark-stat-card">
            {/* Ambient top right soft glow */}
            <div
              className="rk-benchmark-glow"
              style={{ background: card.accent }}
            />

            <div>
              <div className="rk-benchmark-card-top">
                <span className="rk-benchmark-icon">{card.icon}</span>
                <span className="rk-benchmark-badge">{card.badge}</span>
              </div>

              <div className="rk-benchmark-val">{card.value}</div>
              <div className="rk-benchmark-name">{card.label}</div>
            </div>

            <div className="rk-benchmark-subtext">{card.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
