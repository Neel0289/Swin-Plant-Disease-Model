import React, { useState } from 'react';
import ModelHero from './ModelHero.jsx';
import MetricStatCards from './MetricStatCards.jsx';
import ArchitectureDiagram from './ArchitectureDiagram.jsx';
import TrainingCurvesChart from './TrainingCurvesChart.jsx';
import MetricsComparisonChart from './MetricsComparisonChart.jsx';
import ConfusionMatrixHeatmap from './ConfusionMatrixHeatmap.jsx';
import PerClassMetricsTable from './PerClassMetricsTable.jsx';
import TrainingConfigDetails from './TrainingConfigDetails.jsx';

export default function ModelTransparency() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: '📊 Overview & Benchmarks' },
    { id: 'architecture', label: '🧠 Swin-S Architecture' },
    { id: 'training-config', label: '⚙️ Training Configuration' },
    { id: 'curves', label: '📈 Training Curves' },
    { id: 'classes', label: '🎯 23-Class Diagnostics' },
    { id: 'matrix', label: '🧩 Confusion Matrix' },
  ];

  return (
    <section id="behind-the-ai" className="section container">
      {/* Top Banner Tag */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <span className="text-label" style={{
          padding: '6px 18px',
          borderRadius: '999px',
          background: 'rgba(16,185,129,0.12)',
          border: '1px solid rgba(16,185,129,0.25)',
        }}>
          Model Transparency & Scientific Proof
        </span>
      </div>

      {/* Main Hero Header */}
      <ModelHero />

      {/* Section Sub-Navigation Tabs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '40px',
        flexWrap: 'wrap',
        background: 'rgba(4,13,7,0.8)',
        padding: '8px',
        borderRadius: '999px',
        border: '1px solid var(--glass-border-strong)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
      }}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 22px',
                borderRadius: '999px',
                border: 'none',
                background: isActive ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'transparent',
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: isActive ? '0 4px 20px rgba(16,185,129,0.4)' : 'none',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Dynamic Tab Content View */}
      {activeTab === 'overview' && (
        <div className="animate-fade-in">
          <MetricStatCards />
          <MetricsComparisonChart />
          <ArchitectureDiagram />
        </div>
      )}

      {activeTab === 'architecture' && (
        <div className="animate-fade-in">
          <ArchitectureDiagram />
          <MetricsComparisonChart />
        </div>
      )}

      {activeTab === 'training-config' && (
        <div className="animate-fade-in">
          <TrainingConfigDetails />
        </div>
      )}

      {activeTab === 'curves' && (
        <div className="animate-fade-in">
          <TrainingCurvesChart />
        </div>
      )}

      {activeTab === 'classes' && (
        <div className="animate-fade-in">
          <PerClassMetricsTable />
        </div>
      )}

      {activeTab === 'matrix' && (
        <div className="animate-fade-in">
          <ConfusionMatrixHeatmap />
        </div>
      )}
    </section>
  );
}
