import React, { useState } from 'react';
import { EPOCH_HISTORY } from '../data/modelMetricsData';

export default function TrainingCurvesChart() {
  const [hoveredEpoch, setHoveredEpoch] = useState(null);
  const [viewMode, setViewMode] = useState('both'); // 'both', 'loss', 'accuracy'

  const activeData = hoveredEpoch !== null
    ? EPOCH_HISTORY.find(e => e.epoch === hoveredEpoch)
    : EPOCH_HISTORY[EPOCH_HISTORY.length - 1];

  // Dimensions for SVG rendering
  const width = 640;
  const height = 240;
  const padding = 40;

  // Loss mapping (0.5 to 0.9 range)
  const getLossY = (val) => height - padding - ((val - 0.55) / 0.35) * (height - 2 * padding);
  // Accuracy mapping (90% to 100% range)
  const getAccY = (val) => height - padding - ((val - 90) / 10) * (height - 2 * padding);
  const getX = (epoch) => padding + ((epoch - 1) / (EPOCH_HISTORY.length - 1)) * (width - 2 * padding);

  // SVG Path Generators
  const trainLossPath = EPOCH_HISTORY.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.epoch)} ${getLossY(d.trainLoss)}`).join(' ');
  const valLossPath = EPOCH_HISTORY.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.epoch)} ${getLossY(d.valLoss)}`).join(' ');
  
  const trainAccPath = EPOCH_HISTORY.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.epoch)} ${getAccY(d.trainAcc)}`).join(' ');
  const valAccPath = EPOCH_HISTORY.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.epoch)} ${getAccY(d.valAcc)}`).join(' ');

  return (
    <div className="glass-card" style={{ padding: '28px', marginBottom: '40px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.08em' }}>
            Training Progression
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Loss & Accuracy Curves (17 Epochs)
          </h3>
        </div>

        {/* View Mode Toggle */}
        <div style={{
          display: 'flex',
          gap: '4px',
          background: 'rgba(255,255,255,0.05)',
          padding: '4px',
          borderRadius: '999px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          {['both', 'loss', 'accuracy'].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              style={{
                padding: '6px 14px',
                borderRadius: '999px',
                border: 'none',
                background: viewMode === mode ? 'var(--accent)' : 'transparent',
                color: viewMode === mode ? '#ffffff' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textTransform: 'capitalize'
              }}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Epoch Hover Details Pill */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 18px',
        borderRadius: 'var(--radius-md)',
        background: 'rgba(4,13,7,0.8)',
        border: '1px solid var(--glass-border-strong)',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Epoch:</span>
          <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10b981' }}>
            {activeData.epoch} / 17
          </span>
          {activeData.isBest && (
            <span style={{
              fontSize: '0.7rem', fontWeight: 700, background: 'rgba(16,185,129,0.25)',
              color: '#10b981', padding: '2px 8px', borderRadius: '999px', border: '1px solid rgba(16,185,129,0.4)'
            }}>
              ★ Best Model Checkpoint
            </span>
          )}
          {activeData.isStopped && (
            <span style={{
              fontSize: '0.7rem', fontWeight: 700, background: 'rgba(239,68,68,0.2)',
              color: '#ef4444', padding: '2px 8px', borderRadius: '999px', border: '1px solid rgba(239,68,68,0.3)'
            }}>
              🛑 Early Stopped
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: '20px', fontSize: '0.88rem', flexWrap: 'wrap' }}>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Train Loss: </span>
            <strong style={{ color: '#34d399' }}>{activeData.trainLoss.toFixed(4)}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Val Loss: </span>
            <strong style={{ color: '#f59e0b' }}>{activeData.valLoss.toFixed(4)}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Train Acc: </span>
            <strong style={{ color: '#60a5fa' }}>{activeData.trainAcc}%</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Val Acc: </span>
            <strong style={{ color: '#a7f3d0' }}>{activeData.valAcc}%</strong>
          </div>
        </div>
      </div>

      {/* SVG Chart */}
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
          {/* Background Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
            const y = padding + pct * (height - 2 * padding);
            return (
              <line
                key={i}
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="4 4"
              />
            );
          })}

          {/* Epoch Vertical Guide Lines & Hover Targets */}
          {EPOCH_HISTORY.map((d) => {
            const x = getX(d.epoch);
            return (
              <g key={d.epoch} onMouseEnter={() => setHoveredEpoch(d.epoch)}>
                <line
                  x1={x} y1={padding}
                  x2={x} y2={height - padding}
                  stroke={hoveredEpoch === d.epoch ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.03)'}
                  strokeWidth={hoveredEpoch === d.epoch ? 2 : 1}
                />
                {/* Epoch Number Label on X-axis */}
                <text
                  x={x}
                  y={height - 12}
                  fill={hoveredEpoch === d.epoch ? '#10b981' : 'rgba(240,253,244,0.4)'}
                  fontSize="10"
                  fontWeight={hoveredEpoch === d.epoch ? '700' : '500'}
                  textAnchor="middle"
                >
                  E{d.epoch}
                </text>
              </g>
            );
          })}

          {/* Loss Curves */}
          {(viewMode === 'both' || viewMode === 'loss') && (
            <>
              {/* Train Loss */}
              <path d={trainLossPath} fill="none" stroke="#34d399" strokeWidth="2.5" opacity="0.8" />
              {/* Val Loss */}
              <path d={valLossPath} fill="none" stroke="#f59e0b" strokeWidth="2.5" />
            </>
          )}

          {/* Accuracy Curves */}
          {(viewMode === 'both' || viewMode === 'accuracy') && (
            <>
              {/* Train Acc */}
              <path d={trainAccPath} fill="none" stroke="#60a5fa" strokeWidth="2.5" opacity="0.8" strokeDasharray="3 3" />
              {/* Val Acc */}
              <path d={valAccPath} fill="none" stroke="#a7f3d0" strokeWidth="2.5" />
            </>
          )}

          {/* Best Model Marker (Epoch 10) */}
          {(() => {
            const bestX = getX(10);
            const bestY = getLossY(0.6645);
            return (
              <g>
                <circle cx={bestX} cy={bestY} r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                <text x={bestX} y={bestY - 10} fill="#10b981" fontSize="10" fontWeight="800" textAnchor="middle">
                  Best (E10)
                </text>
              </g>
            );
          })()}
        </svg>
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        marginTop: '16px',
        fontSize: '0.8rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: 14, height: 3, background: '#34d399', borderRadius: 2 }} />
          <span style={{ color: 'var(--text-secondary)' }}>Train Loss</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: 14, height: 3, background: '#f59e0b', borderRadius: 2 }} />
          <span style={{ color: 'var(--text-secondary)' }}>Validation Loss</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: 14, height: 3, background: '#60a5fa', borderRadius: 2, borderStyle: 'dashed' }} />
          <span style={{ color: 'var(--text-secondary)' }}>Train Accuracy</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: 14, height: 3, background: '#a7f3d0', borderRadius: 2 }} />
          <span style={{ color: 'var(--text-secondary)' }}>Validation Accuracy</span>
        </div>
      </div>
    </div>
  );
}
