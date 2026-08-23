import React, { useState, useMemo } from 'react';
import { PER_CLASS_METRICS } from '../data/modelMetricsData';

export default function PerClassMetricsTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlant, setSelectedPlant] = useState('All');
  const [sortField, setSortField] = useState('f1');
  const [sortAsc, setSortAsc] = useState(false);

  const plants = ['All', 'Apple', 'Cherry', 'Corn', 'Grape', 'Peach', 'Pepper', 'Potato', 'Soybean', 'Tomato'];

  const filteredAndSorted = useMemo(() => {
    return PER_CLASS_METRICS
      .filter((cls) => {
        const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              cls.plant.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPlant = selectedPlant === 'All' || cls.plant.toLowerCase() === selectedPlant.toLowerCase();
        return matchesSearch && matchesPlant;
      })
      .sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];
        if (valA < valB) return sortAsc ? -1 : 1;
        if (valA > valB) return sortAsc ? 1 : -1;
        return 0;
      });
  }, [searchTerm, selectedPlant, sortField, sortAsc]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="glass-card" style={{ padding: '28px', marginBottom: '40px' }}>
      {/* Title & Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.08em' }}>
            Class-Level Diagnostics
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            23-Class Detailed Classification Report
          </h3>
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="🔍 Search disease or crop..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px 18px',
            borderRadius: '999px',
            background: 'rgba(4,13,7,0.8)',
            color: 'var(--text-primary)',
            border: '1px solid var(--glass-border-strong)',
            fontSize: '0.88rem',
            width: '240px',
            outline: 'none',
          }}
        />
      </div>

      {/* Plant Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '20px' }}>
        {plants.map((plant) => (
          <button
            key={plant}
            onClick={() => setSelectedPlant(plant)}
            style={{
              padding: '6px 14px',
              borderRadius: '999px',
              border: 'none',
              background: selectedPlant === plant ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
              color: selectedPlant === plant ? '#ffffff' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
            }}
          >
            {plant}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border-strong)', color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '12px 16px' }}>#</th>
              <th style={{ padding: '12px 16px', cursor: 'pointer' }} onClick={() => handleSort('name')}>
                Disease Class {sortField === 'name' ? (sortAsc ? '▲' : '▼') : ''}
              </th>
              <th style={{ padding: '12px 16px', cursor: 'pointer' }} onClick={() => handleSort('precision')}>
                Precision {sortField === 'precision' ? (sortAsc ? '▲' : '▼') : ''}
              </th>
              <th style={{ padding: '12px 16px', cursor: 'pointer' }} onClick={() => handleSort('recall')}>
                Recall {sortField === 'recall' ? (sortAsc ? '▲' : '▼') : ''}
              </th>
              <th style={{ padding: '12px 16px', cursor: 'pointer' }} onClick={() => handleSort('f1')}>
                F1-Score {sortField === 'f1' ? (sortAsc ? '▲' : '▼') : ''}
              </th>
              <th style={{ padding: '12px 16px', cursor: 'pointer' }} onClick={() => handleSort('specificity')}>
                Specificity {sortField === 'specificity' ? (sortAsc ? '▲' : '▼') : ''}
              </th>
              <th style={{ padding: '12px 16px', cursor: 'pointer' }} onClick={() => handleSort('support')}>
                Test Support {sortField === 'support' ? (sortAsc ? '▲' : '▼') : ''}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSorted.map((cls) => {
              const precPct = (cls.precision * 100).toFixed(2);
              const recPct = (cls.recall * 100).toFixed(2);
              const f1Pct = (cls.f1 * 100).toFixed(2);
              const specPct = (cls.specificity * 100).toFixed(2);

              return (
                <tr
                  key={cls.id}
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(16,185,129,0.06)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '14px 16px', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {cls.id < 10 ? `0${cls.id}` : cls.id}
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {cls.name}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#34d399', marginBottom: '4px' }}>{precPct}%</div>
                    <div style={{ width: '80px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                      <div style={{ width: `${precPct}%`, height: '100%', background: '#34d399', borderRadius: '2px' }} />
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#60a5fa', marginBottom: '4px' }}>{recPct}%</div>
                    <div style={{ width: '80px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                      <div style={{ width: `${recPct}%`, height: '100%', background: '#60a5fa', borderRadius: '2px' }} />
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#a7f3d0', marginBottom: '4px' }}>{f1Pct}%</div>
                    <div style={{ width: '80px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                      <div style={{ width: `${f1Pct}%`, height: '100%', background: '#10b981', borderRadius: '2px' }} />
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {specPct}%
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '999px',
                      background: 'rgba(255,255,255,0.06)',
                      color: 'var(--text-secondary)'
                    }}>
                      {cls.support.toLocaleString()} imgs
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
