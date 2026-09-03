import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Search, Filter, ShieldAlert, Sparkles, X, ChevronRight, CheckCircle, FileText, Activity, CheckCircle2 } from 'lucide-react';
import { CLASS_NAMES, DISEASE_INFO } from '../data/diseasesData.js';

export default function DiseaseIndex3D({ onSelectForScan }) {
  const [selectedCrop, setSelectedCrop] = useState('ALL');
  const [selectedSeverity, setSelectedSeverity] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalDisease, setActiveModalDisease] = useState(null);

  const crops = ['ALL', 'Apple', 'Corn', 'Grape', 'Tomato', 'Potato', 'Bell Pepper', 'Peach', 'Cherry', 'Soybean'];
  const severities = ['ALL', 'None', 'Moderate', 'High', 'Critical'];

  const filteredDiseases = useMemo(() => {
    return CLASS_NAMES.map((key) => ({ key, ...DISEASE_INFO[key] })).filter((item) => {
      const matchCrop = selectedCrop === 'ALL' || item.plant?.toLowerCase() === selectedCrop.toLowerCase();
      const matchSeverity = selectedSeverity === 'ALL' || item.severity?.toLowerCase() === selectedSeverity.toLowerCase();
      const matchQuery =
        !searchQuery ||
        item.display_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.plant?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.causal_agent?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCrop && matchSeverity && matchQuery;
    });
  }, [selectedCrop, selectedSeverity, searchQuery]);

  // Lock background body scroll when Dossier modal is open
  useEffect(() => {
    if (activeModalDisease) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [activeModalDisease]);

  const getSeverityBadgeClass = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'none':
      case 'healthy':
        return 'badge-rk-healthy';
      case 'moderate':
        return 'badge-rk-moderate';
      case 'high':
        return 'badge-rk-high';
      case 'critical':
        return 'badge-rk-critical';
      default:
        return 'badge-rk-unknown';
    }
  };

  return (
    <section id="diseases" className="rk-diseases-stage">
      <div className="rk-section-shell">
        {/* Stage Header */}
        <div className="rk-stage-header">
          <div className="rk-stage-index">
            <span className="rk-index-num">06</span>
            <span className="rk-index-bar" />
            <span className="rk-index-tag">BOTANICAL HERBARIUM</span>
          </div>
          <h2 className="rk-stage-title">Index of 23 Pathology Classes</h2>
          <p className="rk-stage-subtitle">
            Curated diagnostic profiles covering 10 major global food crop species. Includes causal
            taxonomies, foliar symptom signatures, and verified organic and chemical remedies.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="rk-filter-controls">
          {/* Search Input */}
          <div className="rk-search-box">
            <Search size={15} className="rk-search-icon" />
            <input
              type="text"
              placeholder="Search diseases, causal agents, or symptoms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rk-search-input"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="rk-search-clear">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Crop Selector Pills */}
          <div className="rk-crop-filter-row">
            <span className="rk-filter-label">CROP:</span>
            <div className="rk-filter-pills">
              {crops.map((crop) => (
                <button
                  key={crop}
                  onClick={() => setSelectedCrop(crop)}
                  className={`rk-filter-btn ${selectedCrop === crop ? 'is-active' : ''}`}
                >
                  {crop}
                </button>
              ))}
            </div>
          </div>

          {/* Severity Selector Pills */}
          <div className="rk-crop-filter-row">
            <span className="rk-filter-label">SEVERITY:</span>
            <div className="rk-filter-pills">
              {severities.map((sev) => (
                <button
                  key={sev}
                  onClick={() => setSelectedSeverity(sev)}
                  className={`rk-filter-btn ${selectedSeverity === sev ? 'is-active' : ''}`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Diseases Grid */}
        <div className="rk-diseases-grid">
          {filteredDiseases.map((disease) => (
            <div
              key={disease.key}
              className="rk-disease-card"
              onClick={() => setActiveModalDisease(disease)}
            >
              <div className="rk-card-meta-row">
                <span className="rk-crop-tag">{disease.plant}</span>
                <span className={`badge-rk ${getSeverityBadgeClass(disease.severity)}`}>
                  {disease.severity}
                </span>
              </div>

              <h4 className="rk-disease-card-title">{disease.display_name}</h4>

              {disease.causal_agent ? (
                <div className="rk-card-agent-wrap">
                  <span className="rk-agent-dot" />
                  <span className="rk-card-agent">
                    Agent: <em>{disease.causal_agent}</em>
                  </span>
                </div>
              ) : (
                <div className="rk-card-agent-wrap healthy">
                  <span className="rk-agent-dot healthy" />
                  <span className="rk-card-agent healthy-tag">Pristine Foliage State</span>
                </div>
              )}

              <p className="rk-card-desc">
                {disease.description?.length > 130
                  ? `${disease.description.slice(0, 130)}...`
                  : disease.description}
              </p>

              <div className="rk-card-cta-row">
                <span className="rk-remedy-count">
                  {disease.remedies?.length || 0} Treatment Protocols
                </span>
                <button className="rk-card-view-btn">
                  <span>Dossier</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredDiseases.length === 0 && (
          <div className="rk-empty-state">
            <p>No pathology matches found for the selected filters.</p>
            <button
              onClick={() => {
                setSelectedCrop('ALL');
                setSelectedSeverity('ALL');
                setSearchQuery('');
              }}
              className="btn-rk-sm"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Modal: Full Disease Dossier Portal */}
        {activeModalDisease && createPortal(
          <div className="rk-modal-backdrop" onClick={() => setActiveModalDisease(null)}>
            <div className="rk-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="rk-modal-header">
                <div>
                  <div className="rk-modal-meta">
                    <span className="rk-crop-tag">{activeModalDisease.plant}</span>
                    <span className={`badge-rk ${getSeverityBadgeClass(activeModalDisease.severity)}`}>
                      {activeModalDisease.severity} SEVERITY
                    </span>
                  </div>
                  <h3 className="rk-modal-title">{activeModalDisease.display_name}</h3>
                  {activeModalDisease.causal_agent && (
                    <div className="rk-causal-pill modal-ver">
                      <span className="rk-causal-label">Causal Organism:</span>
                      <em className="rk-causal-val">{activeModalDisease.causal_agent}</em>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setActiveModalDisease(null)}
                  className="rk-modal-close"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="rk-modal-body">
                {/* Themed Etiology Card */}
                <div className="rk-modal-tech-card">
                  <div className="rk-modal-card-top">
                    <FileText size={15} className="rk-tech-icon" />
                    <h5 className="rk-modal-section-title">ETIOLOGY &amp; BIOLOGICAL PROFILE</h5>
                  </div>
                  <p className="rk-modal-text">{activeModalDisease.description}</p>
                </div>

                {/* Themed Symptom Card */}
                {activeModalDisease.symptoms && (
                  <div className="rk-modal-tech-card amber-border">
                    <div className="rk-modal-card-top">
                      <Activity size={15} className="rk-tech-icon amber" />
                      <h5 className="rk-modal-section-title">CLINICAL SYMPTOM PROFILE</h5>
                    </div>
                    <p className="rk-modal-text">{activeModalDisease.symptoms}</p>
                  </div>
                )}

                {/* Themed Agronomic Remedies Card */}
                {activeModalDisease.remedies?.length > 0 && (
                  <div className="rk-modal-tech-card remedies-card">
                    <div className="rk-modal-card-top">
                      <CheckCircle2 size={15} className="rk-tech-icon mint" />
                      <h5 className="rk-modal-section-title">AGRONOMIC MANAGEMENT &amp; REMEDIES</h5>
                      <span className="rk-remedy-count-pill">{activeModalDisease.remedies.length} PROTOCOLS</span>
                    </div>
                    <div className="rk-modal-remedies-grid">
                      {activeModalDisease.remedies.map((rem, i) => (
                        <div key={i} className="rk-modal-remedy-pill">
                          <span className="rk-remedy-num">{String(i + 1).padStart(2, '0')}</span>
                          <p className="rk-modal-remedy-text">{rem}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="rk-modal-footer">
                <button
                  onClick={() => setActiveModalDisease(null)}
                  className="btn-rk-solid"
                >
                  CLOSE DOSSIER
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </section>
  );
}
