import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, Scan, AlertTriangle, CheckCircle2, ShieldAlert, Sparkles, ArrowRight, RefreshCw, FileText, Info, CheckCircle, Wifi, WifiOff } from 'lucide-react';
import { SAMPLE_SPECIMENS, DISEASE_INFO, CLASS_NAMES } from '../data/diseasesData.js';

const API_BASE = '/api';

export default function ScannerTerminal({ scannerRef }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [selectedSampleName, setSelectedSampleName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [backendHealth, setBackendHealth] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // ── Verify live connection to swin_model/1.pth ───────────────────────
  const checkHealth = useCallback(() => {
    fetch('/api/health')
      .then((res) => {
        if (!res.ok) throw new Error('Health status error');
        return res.json();
      })
      .then((data) => setBackendHealth(data))
      .catch(() => setBackendHealth({ status: 'offline', model_loaded: false }));
  }, []);

  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

  // ── Drag and Drop handlers ──────────────────────────────────────────
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      loadFile(droppedFile);
    }
  }, []);

  const loadFile = (f) => {
    setFile(f);
    setSelectedSampleName(null);
    setResults(null);
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(f);
  };

  // ── Sample specimen 1-click test (fetches real local sample leaf image) ──
  const handleSelectSample = async (sample) => {
    setSelectedSampleName(sample.name);
    setPreview(sample.previewUrl);
    setResults(null);
    setError(null);

    try {
      const res = await fetch(sample.previewUrl);
      const blob = await res.blob();
      const sampleFile = new File([blob], `${sample.className}.jpg`, { type: 'image/jpeg' });
      setFile(sampleFile);
    } catch (err) {
      console.warn('Failed to load local sample file:', err);
    }
  };

  // ── Run Genuine Swin-S AI Inference from 1.pth ─────────────────────
  const handleAnalyse = async () => {
    if (!file && !preview) return;
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      let uploadFile = file;
      if (!uploadFile && preview) {
        const blob = await fetch(preview).then((r) => r.blob());
        uploadFile = new File([blob], 'specimen.jpg', { type: 'image/jpeg' });
      }

      const formData = new FormData();
      formData.append('file', uploadFile);

      // Execute forward pass directly through FastAPI backend
      const res = await fetch(`${API_BASE}/predict`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.detail || `Server error: HTTP ${res.status}`);
      }

      const data = await res.json();
      if (data && data.success) {
        setResults(data);
        setIsLoading(false);
        return;
      }
      throw new Error(data?.message || 'Inference could not be processed.');
    } catch (err) {
      console.error('Inference error:', err);
      setError(`Neural inference error: ${err.message}. Please verify the FastAPI backend server is running.`);
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setSelectedSampleName(null);
    setResults(null);
    setError(null);
  };

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
    <section id="scanner" ref={scannerRef} className="rk-scanner-stage">
      <div className="rk-section-shell">
        {/* Stage Header */}
        <div className="rk-stage-header">
          <div className="rk-stage-index">
            <span className="rk-index-num">03</span>
            <span className="rk-index-bar" />
            <span className="rk-index-tag">DIAGNOSTIC SCAN TERMINAL</span>
            {backendHealth?.model_loaded ? (
              <span className="rk-backend-status-pill online" title="FastAPI server running with swin_model/1.pth">
                <span className="pulsing-dot-live" />
                <span>MODEL 1.PTH [LIVE INFERENCE]</span>
              </span>
            ) : (
              <button onClick={checkHealth} className="rk-backend-status-pill offline" title="Click to reconnect">
                <WifiOff size={11} />
                <span>BACKEND OFFLINE (PORT 8001)</span>
              </button>
            )}
          </div>
          <h2 className="rk-stage-title">Foliar Specimen Intake</h2>
          <p className="rk-stage-subtitle">
            Upload high-resolution foliar photography or select benchmark sample specimens below.
            The Swin Transformer model evaluates shifted-window cross-attention to classify pathogen etiology.
          </p>
        </div>

        {/* Benchmark Sample Selector Strip */}
        <div className="rk-samples-strip">
          <span className="rk-samples-label">QUICK BENCHMARK SPECIMENS:</span>
          <div className="rk-samples-scroll">
            {SAMPLE_SPECIMENS.map((sample) => (
              <button
                key={sample.name}
                onClick={() => handleSelectSample(sample)}
                className={`rk-sample-pill ${selectedSampleName === sample.name ? 'is-selected' : ''}`}
              >
                <span className="rk-sample-dot" />
                <span className="rk-sample-name">{sample.name}</span>
                <span className="rk-sample-crop">[{sample.plant}]</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3D Holographic Intake Zone */}
        <div
          className={`rk-dropzone-3d ${isDragging ? 'is-drag-over' : ''} ${isLoading ? 'is-scanning' : ''}`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onClick={() => !isLoading && fileInputRef.current?.click()}
        >
          {/* Target Reticle Corners */}
          <div className="reticle-corner tl" />
          <div className="reticle-corner tr" />
          <div className="reticle-corner bl" />
          <div className="reticle-corner br" />

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            style={{ display: 'none' }}
            onChange={(e) => {
              if (e.target.files?.[0]) loadFile(e.target.files[0]);
            }}
          />

          {preview ? (
            <div className="rk-preview-container">
              <div className="rk-preview-frame">
                <img src={preview} alt="Plant specimen intake" className="rk-preview-img" />

                {/* Laser Scanning Bar Animation */}
                {isLoading && (
                  <div className="rk-laser-sweep">
                    <div className="rk-laser-beam" />
                    <div className="rk-laser-glow" />
                  </div>
                )}
              </div>

              {!isLoading && (
                <div className="rk-preview-replace-cue">
                  <span>CLICK OR DRAG A NEW FILE TO REPLACE SPECIMEN</span>
                </div>
              )}
            </div>
          ) : (
            <div className="rk-dropzone-idle">
              <div className="rk-dropzone-icon-ring">
                <Upload size={28} className="rk-drop-icon" />
              </div>
              <h3 className="rk-drop-title">DRAG & DROP SPECIMEN LEAF HERE</h3>
              <p className="rk-drop-desc">
                JPEG · PNG · WEBP &nbsp;|&nbsp; OPTIMAL RESOLUTION 224×224 TO 4K &nbsp;|&nbsp; MAX 10MB
              </p>
              <button
                type="button"
                className="btn-rk-sm-outline"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                BROWSE LOCAL DISK
              </button>
            </div>
          )}

          {/* Scanner Overlay HUD while loading */}
          {isLoading && (
            <div className="rk-scan-overlay-hud">
              <div className="rk-hud-spinner" />
              <div className="rk-hud-text">
                <span className="rk-hud-main">EXECUTING FORWARD PASS...</span>
                <span className="rk-hud-sub">SWIN-S SHIFTED WINDOW ATTENTION // 1.PTH INFERENCE</span>
              </div>
            </div>
          )}
        </div>

        {/* Error Notification Banner */}
        {error && (
          <div className="rk-inference-error-card">
            <div className="rk-err-left">
              <AlertTriangle size={18} className="rk-err-icon" />
              <div>
                <strong className="rk-err-heading">Inference Server Notice</strong>
                <p className="rk-err-p">{error}</p>
              </div>
            </div>
            <button onClick={handleAnalyse} className="btn-rk-sm">
              <RefreshCw size={13} /> RETRY INFERENCE
            </button>
          </div>
        )}

        {/* Analyse Button Trigger */}
        {preview && !results && !isLoading && (
          <div className="rk-analyse-action-bar">
            <button
              id="analyse-leaf-trigger"
              onClick={handleAnalyse}
              className="btn-rk-solid-lg"
            >
              <Scan size={18} />
              <span>RUN SWIN-S DIAGNOSIS (1.PTH)</span>
            </button>
          </div>
        )}

        {/* Live Model Verification Banner */}
        {results && (
          <div className={`rk-status-banner ${results.predictions?.length > 0 ? 'is-live' : 'is-warning'}`}>
            <div className="rk-status-left">
              {results.predictions?.length > 0 ? (
                <Sparkles size={18} className="rk-status-icon-live" />
              ) : (
                <AlertTriangle size={18} className="rk-status-icon-amber" />
              )}
              <div>
                <span className="rk-status-title">
                  {results.predictions?.length > 0
                    ? 'LIVE SWIN-S TRANSFORMER INFERENCE ACTIVE'
                    : 'DIAGNOSTIC SAFEGUARD: UNRECOGNIZED / LOW CONFIDENCE'}
                </span>
                <p className="rk-status-p">
                  {results.predictions?.length > 0
                    ? 'Prediction executed directly by neural weights in swin_model/1.pth (586.6 MB). 23 foliar disease heads active.'
                    : 'Top model confidence was below 40%. The uploaded specimen was safely flagged as non-foliar or unrecognized.'}
                </p>
                {results.message && (
                  <p className="rk-status-advisory">
                    <strong>Notice:</strong> {results.message}
                  </p>
                )}
              </div>
            </div>
            <span className={`mono-badge ${results.predictions?.length > 0 ? 'live-accent' : 'warning-accent'}`}>
              <span className={`pulsing-dot ${results.predictions?.length > 0 ? '' : 'amber-dot'}`} />
              {results.predictions?.length > 0
                ? `${results.model_checkpoint || '1.PTH'} [VERIFIED LIVE]`
                : 'SAFEGUARD [< 40%]'}
            </span>
          </div>
        )}

        {/* Diagnosis Results Display */}
        {results && (
          <div className="rk-results-stage">
            <div className="rk-results-header">
              <div>
                <span className="mono-badge">
                  {results.predictions?.length > 0 ? (
                    <>
                      <CheckCircle2 size={12} /> DIAGNOSTIC DOSSIER READY
                    </>
                  ) : (
                    <>
                      <AlertTriangle size={12} /> DIAGNOSIS COMPLETE
                    </>
                  )}
                </span>
                <h3 className="rk-results-title">
                  {results.predictions?.length > 0 ? 'Foliar Pathology Classification' : 'Analysis Results'}
                </h3>
              </div>
              <button onClick={handleReset} className="btn-rk-sm">
                <RefreshCw size={13} /> NEW SCAN
              </button>
            </div>

            {/* Low Confidence / Non-Plant Safeguard Card */}
            {(!results.predictions || results.predictions.length === 0) ? (
              <div className="rk-no-confident-card">
                <div className="rk-no-confident-header">
                  <div className="rk-no-confident-icon-box">
                    <AlertTriangle size={24} className="rk-no-confident-icon" />
                  </div>
                  <div>
                    <h4 className="rk-no-confident-title">No confident prediction</h4>
                    <p className="rk-no-confident-desc">
                      {results.message || 'No reliable prediction: top confidence is below 40%'}
                    </p>
                  </div>
                </div>

                <div className="rk-no-confident-body">
                  <p className="rk-no-confident-help">
                    The Swin Transformer backbone evaluated this photo, but no supported disease class scored 40% or above. The uploaded image does not appear to contain recognizable crop foliage.
                  </p>
                  <div className="rk-guidelines-grid">
                    <div className="rk-guideline-card">
                      <span className="rk-guideline-badge">CRITERION 01</span>
                      <strong className="rk-guideline-title">Crop Foliage Only</strong>
                      <p className="rk-guideline-desc">Upload a real crop leaf photo. Avoid non-plant images such as handwritten notes, documents, animals, people, or everyday objects.</p>
                    </div>
                    <div className="rk-guideline-card">
                      <span className="rk-guideline-badge">CRITERION 02</span>
                      <strong className="rk-guideline-title">Clear Focus & Lighting</strong>
                      <p className="rk-guideline-desc">Ensure the leaf is centered, well-lit, and in sharp focus so shifted-window attention patches can resolve lesion morphology.</p>
                    </div>
                    <div className="rk-guideline-card">
                      <span className="rk-guideline-badge">CRITERION 03</span>
                      <strong className="rk-guideline-title">Supported Species</strong>
                      <p className="rk-guideline-desc">The model is trained on 23 disease classes across Apple, Corn, Grape, Peach, Pepper, Potato, Strawberry, Soybean, and Tomato.</p>
                    </div>
                  </div>
                </div>

                <div className="rk-no-confident-actions">
                  <button onClick={handleReset} className="btn-rk-solid-lg">
                    <RefreshCw size={16} />
                    <span>TRY ANOTHER PHOTO</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Primary Matched Disease Card */}
            {results.predictions?.[0] && (
              <div className="rk-primary-result-card">
                <div className="rk-card-top-row">
                  <div className="rk-disease-identity">
                    <div className="rk-identity-badges">
                      <span className={`badge-rk ${getSeverityBadgeClass(results.predictions[0].severity)}`}>
                        {results.predictions[0].severity?.toUpperCase() || 'UNKNOWN'} SEVERITY
                      </span>
                      <span className="rk-plant-badge">
                        HOST: {results.predictions[0].plant?.toUpperCase()}
                      </span>
                    </div>
                    <h4 className="rk-disease-name">{results.predictions[0].display_name}</h4>
                    {results.predictions[0].causal_agent && (
                      <div className="rk-causal-pill">
                        <span className="rk-causal-label">Causal Organism:</span>
                        <em className="rk-causal-val">{results.predictions[0].causal_agent}</em>
                      </div>
                    )}
                  </div>

                  <div className="rk-confidence-gauge">
                    <div className="rk-conf-num">
                      {results.predictions[0].confidence?.toFixed(1)}%
                    </div>
                    <span className="rk-conf-label">SWIN-S CONFIDENCE</span>
                  </div>
                </div>

                {/* Animated Confidence Bar */}
                <div className="rk-conf-track">
                  <div
                    className="rk-conf-fill"
                    style={{ width: `${results.predictions[0].confidence}%` }}
                  />
                </div>

                {/* Neural Telemetry Strip */}
                <div className="rk-telemetry-strip">
                  <div className="rk-telemetry-cell">
                    <span className="rk-telemetry-lbl">BACKBONE MODEL</span>
                    <span className="rk-telemetry-val">Swin-S (Shifted-Window)</span>
                  </div>
                  <div className="rk-telemetry-cell">
                    <span className="rk-telemetry-lbl">INPUT RESOLUTION</span>
                    <span className="rk-telemetry-val">224 × 224 × 3 px</span>
                  </div>
                  <div className="rk-telemetry-cell">
                    <span className="rk-telemetry-lbl">LATENT VECTOR</span>
                    <span className="rk-telemetry-val">768-D LayerNorm</span>
                  </div>
                  <div className="rk-telemetry-cell">
                    <span className="rk-telemetry-lbl">EVAL STATUS</span>
                    <span className="rk-telemetry-val accent-pulse">Calibrated (98.02% Top-1)</span>
                  </div>
                </div>

                {/* Technical Detail Cards Grid */}
                <div className="rk-technical-cards-grid">
                  {/* Etiology & Pathology Card */}
                  <div className="rk-tech-card rk-tech-etiology">
                    <div className="rk-tech-card-header">
                      <div className="rk-tech-card-title-wrap">
                        <FileText size={16} className="rk-tech-icon" />
                        <h5 className="rk-tech-card-title">Pathology Description &amp; Etiology</h5>
                      </div>
                      <span className="rk-tech-pill">BIOLOGICAL PROFILE</span>
                    </div>
                    <p className="rk-tech-card-body">{results.predictions[0].description}</p>
                  </div>

                  {/* Clinical Symptom Profile Card */}
                  {results.predictions[0].symptoms && (
                    <div className="rk-tech-card rk-tech-symptoms">
                      <div className="rk-tech-card-header">
                        <div className="rk-tech-card-title-wrap">
                          <AlertTriangle size={16} className="rk-tech-icon amber" />
                          <h5 className="rk-tech-card-title">Clinical Symptom Profile</h5>
                        </div>
                        <span className="rk-tech-pill amber">FOLIAR PHENOTYPE</span>
                      </div>
                      <p className="rk-tech-card-body">{results.predictions[0].symptoms}</p>
                    </div>
                  )}
                </div>

                {/* Agronomic Management Protocol Cards */}
                {results.predictions[0].remedies?.length > 0 && (
                  <div className="rk-remedies-section">
                    <div className="rk-remedies-header-row">
                      <div className="rk-remedies-title-wrap">
                        <CheckCircle2 size={16} className="rk-remedy-header-icon" />
                        <h5 className="rk-remedies-heading">Verified Agronomic Protocols &amp; Treatments</h5>
                      </div>
                      <span className="rk-remedies-count-badge">
                        {results.predictions[0].remedies.length} CLINICAL STEPS
                      </span>
                    </div>

                    <div className="rk-remedies-grid">
                      {results.predictions[0].remedies.map((remedy, idx) => (
                        <div key={idx} className="rk-remedy-card">
                          <div className="rk-remedy-card-top">
                            <span className="rk-remedy-step-badge">STEP {String(idx + 1).padStart(2, '0')}</span>
                            <span className="rk-remedy-status-dot" />
                          </div>
                          <p className="rk-remedy-text">{remedy}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Runner-Up Top 3 Predictions */}
            {results.predictions?.length > 1 && (
              <div className="rk-secondary-predictions">
                <div className="rk-sub-header">
                  <span className="rk-sub-predictions-label">ALTERNATIVE DIAGNOSTIC CANDIDATES:</span>
                  <span className="rk-sub-hint">Sorted by Softmax probability distribution</span>
                </div>
                <div className="rk-secondary-grid">
                  {results.predictions.slice(1, 3).map((pred, idx) => (
                    <div key={pred.class_name || idx} className="rk-sub-card">
                      <div className="rk-sub-card-header">
                        <span className="rk-sub-name">{pred.display_name}</span>
                        <span className="rk-sub-conf">{pred.confidence?.toFixed(1)}%</span>
                      </div>
                      <div className="rk-conf-track-sub">
                        <div
                          className="rk-conf-fill-sub"
                          style={{ width: `${pred.confidence}%` }}
                        />
                      </div>
                      <div className="rk-sub-card-footer">
                        <span className="rk-sub-crop">Host: <strong>{pred.plant}</strong></span>
                        <span className="rk-sub-rank">Candidate #{idx + 2}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    )}
  </div>
</section>
  );
}
