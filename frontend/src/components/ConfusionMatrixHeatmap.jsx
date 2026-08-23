import React, { useState, useMemo } from 'react';
import { PER_CLASS_METRICS, getConfusionMatrixData } from '../data/modelMetricsData';

export default function ConfusionMatrixHeatmap() {
  const [normalized, setNormalized] = useState(false);
  const [selectedClass, setSelectedClass] = useState('all');
  const [hoveredCell, setHoveredCell] = useState(null);

  const rawMatrix = useMemo(() => getConfusionMatrixData(), []);

  const classList = PER_CLASS_METRICS;

  const getCellIntensity = (r, c) => {
    const rawVal = rawMatrix[r][c];
    const totalRowSupport = classList[r].support;
    const pct = totalRowSupport > 0 ? (rawVal / totalRowSupport) : 0;

    if (r === c) {
      // Diagonal (correct predictions)
      return {
        bg: `rgba(16, 185, 129, ${Math.max(0.2, pct)})`,
        color: '#ffffff',
        border: '1px solid rgba(16, 185, 129, 0.4)'
      };
    } else if (rawVal > 0) {
      // Off-diagonal errors
      return {
        bg: `rgba(239, 68, 68, ${Math.min(0.8, 0.2 + pct * 2)})`,
        color: '#fecaca',
        border: '1px solid rgba(239, 68, 68, 0.3)'
      };
    }
    return {
      bg: 'rgba(255,255,255,0.02)',
      color: 'rgba(240,253,244,0.15)',
      border: '1px solid rgba(255,255,255,0.03)'
    };
  };

  return (
    <div className="glass-card" style={{ padding: '28px', marginBottom: '40px' }}>
      {/* Header & Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.08em' }}>
            Confusion Matrix Analysis
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            23×23 Classification Heatmap
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Rows indicate Ground Truth classes; Columns indicate Predicted classes
          </p>
        </div>

        {/* Toggle and Filter Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Class Filter */}
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            style={{
              padding: '8px 14px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(4,13,7,0.8)',
              color: 'var(--text-primary)',
              border: '1px solid var(--glass-border-strong)',
              fontSize: '0.82rem',
              fontWeight: 500,
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="all">Show All 23 Classes</option>
            {classList.map((c) => (
              <option key={c.id} value={c.id}>
                Class {c.id < 10 ? `0${c.id}` : c.id}: {c.name}
              </option>
            ))}
          </select>

          {/* Raw vs Normalized Button */}
          <button
            onClick={() => setNormalized(!normalized)}
            className="btn-ghost"
            style={{ padding: '8px 16px', fontSize: '0.82rem' }}
          >
            {normalized ? '📊 Mode: Normalized %' : '🔢 Mode: Raw Counts'}
          </button>
        </div>
      </div>

      {/* Hover Info Tooltip Header */}
      {hoveredCell ? (
        <div style={{
          padding: '10px 16px',
          borderRadius: 'var(--radius-sm)',
          background: 'rgba(16,185,129,0.12)',
          border: '1px solid rgba(16,185,129,0.3)',
          marginBottom: '16px',
          fontSize: '0.85rem',
          color: '#f0fdf4',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <div><strong>True Ground Truth:</strong> {classList[hoveredCell.r].name}</div>
          <div>➔</div>
          <div><strong>Predicted:</strong> {classList[hoveredCell.c].name}</div>
          <div style={{ marginLeft: 'auto', color: 'var(--accent)', fontWeight: 800 }}>
            Count: {rawMatrix[hoveredCell.r][hoveredCell.c]} / {classList[hoveredCell.r].support} (
            {((rawMatrix[hoveredCell.r][hoveredCell.c] / classList[hoveredCell.r].support) * 100).toFixed(1)}%)
          </div>
        </div>
      ) : (
        <div style={{
          padding: '10px 16px',
          borderRadius: 'var(--radius-sm)',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          marginBottom: '16px',
          fontSize: '0.82rem',
          color: 'var(--text-muted)'
        }}>
          💡 Hover over matrix cells below to inspect exact misclassification breakdown
        </div>
      )}

      {/* Matrix Grid */}
      <div style={{ overflowX: 'auto', paddingBottom: '12px' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: '700px' }}>
          <thead>
            <tr>
              <th style={{ padding: '6px', fontSize: '0.68rem', color: 'var(--text-muted)' }}>True \ Pred</th>
              {classList.map((c) => (
                <th
                  key={c.id}
                  title={c.name}
                  style={{
                    padding: '4px',
                    fontSize: '0.62rem',
                    color: selectedClass !== 'all' && parseInt(selectedClass) === c.id ? '#10b981' : 'var(--text-muted)',
                    fontWeight: 700,
                    width: '3.8%',
                    textAlign: 'center'
                  }}
                >
                  {c.id < 10 ? `0${c.id}` : c.id}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {classList.map((rowClass, r) => {
              if (selectedClass !== 'all' && parseInt(selectedClass) !== r) return null;
              return (
                <tr key={r}>
                  <td
                    title={rowClass.name}
                    style={{
                      padding: '4px 8px',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      color: selectedClass !== 'all' && parseInt(selectedClass) === r ? '#10b981' : 'var(--text-secondary)',
                      whiteSpace: 'nowrap',
                      textAlign: 'right'
                    }}
                  >
                    {r < 10 ? `0${r}` : r} | {rowClass.name.split(' ')[0]}...
                  </td>
                  {classList.map((colClass, c) => {
                    const styleObj = getCellIntensity(r, c);
                    const count = rawMatrix[r][c];
                    const pct = ((count / rowClass.support) * 100).toFixed(0);

                    return (
                      <td
                        key={c}
                        onMouseEnter={() => setHoveredCell({ r, c })}
                        onMouseLeave={() => setHoveredCell(null)}
                        style={{
                          padding: '6px 2px',
                          textAlign: 'center',
                          fontSize: '0.65rem',
                          fontWeight: r === c ? 800 : 500,
                          background: styleObj.bg,
                          color: styleObj.color,
                          border: styleObj.border,
                          borderRadius: '2px',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {normalized ? `${pct}%` : count > 0 ? count : ''}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
