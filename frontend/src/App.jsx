import React, { useState, useRef, useCallback, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import ParticleBackground from './components/ParticleBackground.jsx';

// ── Constants ──────────────────────────────────────────────────────────────────
const API_BASE = '/api';

const FEATURES = [
  {
    icon: '🧠',
    title: 'Deep Learning AI',
    desc: 'Powered by a fine-tuned Swin Transformer trained across 23 plant disease classes.',
  },
  {
    icon: '⚡',
    title: 'Instant Results',
    desc: 'Get diagnosis in under a second. Real-time inference with GPU-accelerated PyTorch backend.',
  },
  {
    icon: '🌿',
    title: '23 Disease Classes',
    desc: 'Covers 10 crop species and common diseases from Apple Rust to Tomato Mosaic Virus.',
  },
  {
    icon: '💊',
    title: 'Treatment Guidance',
    desc: 'Actionable remedies and severity ratings for every detected disease, right at your fingertips.',
  },
  {
    icon: '📊',
    title: 'Top-3 Predictions',
    desc: 'See confidence scores for all top predictions — not just one guess but a full probability breakdown.',
  },
  {
    icon: '🔒',
    title: 'Privacy First',
    desc: 'Images are never stored. Analysis runs on-device and results are returned immediately.',
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Upload a Leaf Photo',
    desc: 'Take a clear photo of the affected leaf and drag & drop or click to upload. JPEG, PNG, WebP supported.',
  },
  {
    step: '02',
    title: 'AI Analyses the Image',
    desc: 'Our deep learning model pre-processes and passes the image through a multi-layer convolutional network.',
  },
  {
    step: '03',
    title: 'Get Your Diagnosis',
    desc: 'Within seconds, receive a detailed report with disease name, severity, description, and treatment steps.',
  },
];

// ── Severity color helper ──────────────────────────────────────────────────────
function getSeverityClass(severity) {
  switch (severity?.toLowerCase()) {
    case 'healthy': return 'badge-healthy';
    case 'moderate': return 'badge-moderate';
    case 'high': return 'badge-high';
    case 'critical': return 'badge-critical';
    default: return 'badge-unknown';
  }
}

// ── Confidence Bar ──────────────────────────────────────────────────────────────
function ConfidenceBar({ value }) {
  return (
    <div className="confidence-bar-track">
      <div
        className="confidence-bar-fill"
        style={{ '--target-width': `${value}%` }}
      />
    </div>
  );
}

// ── Upload Zone ────────────────────────────────────────────────────────────────
function UploadZone({ onFileSelect, preview, isLoading }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) onFileSelect(file);
  }, [onFileSelect]);

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);

  return (
    <div
      id="scan"
      onClick={() => !isLoading && inputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      style={{
        border: `2px dashed ${isDragging ? 'var(--accent)' : 'var(--glass-border-strong)'}`,
        borderRadius: 'var(--radius-xl)',
        padding: '48px 32px',
        textAlign: 'center',
        cursor: isLoading ? 'default' : 'pointer',
        background: isDragging
          ? 'rgba(16,185,129,0.08)'
          : 'linear-gradient(135deg, rgba(16,185,129,0.04) 0%, rgba(5,150,105,0.02) 100%)',
        backdropFilter: 'blur(20px)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: isDragging ? 'var(--shadow-glow)' : 'var(--shadow-card)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) onFileSelect(file);
        }}
      />

      {preview ? (
        <div>
          <img
            src={preview}
            alt="Leaf preview"
            style={{
              maxHeight: '260px',
              maxWidth: '100%',
              borderRadius: 'var(--radius-lg)',
              objectFit: 'contain',
              boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
              marginBottom: '20px',
            }}
          />
          {!isLoading && (
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Click or drop to replace image
            </p>
          )}
        </div>
      ) : (
        <div>
          <div style={{
            width: 80, height: 80,
            margin: '0 auto 20px',
            background: 'rgba(16,185,129,0.1)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2rem',
            border: '1px solid var(--glass-border)',
          }}>
            🍃
          </div>
          <p style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '1.1rem', marginBottom: 8 }}>
            Drop a leaf image here
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 16 }}>
            or click to browse — JPEG, PNG, WebP · max 10 MB
          </p>
          <span className="btn-ghost" style={{ fontSize: '0.85rem', padding: '8px 20px', pointerEvents: 'none' }}>
            Browse Files
          </span>
        </div>
      )}

      {/* Scanning animation overlay */}
      {isLoading && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(4,13,7,0.7)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          borderRadius: 'var(--radius-xl)',
          zIndex: 10,
        }}>
          <div style={{
            width: 56, height: 56,
            border: '3px solid rgba(16,185,129,0.2)',
            borderTopColor: 'var(--accent)',
            borderRadius: '50%',
            animation: 'spin-slow 0.8s linear infinite',
            marginBottom: 16,
          }} />
          <p style={{ color: 'var(--accent)', fontWeight: 600 }}>Analysing leaf...</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 4 }}>
            Running deep learning inference
          </p>
        </div>
      )}
    </div>
  );
}

// ── Result Card ────────────────────────────────────────────────────────────────
function ResultCard({ prediction, rank }) {
  const isTop = rank === 0;
  return (
    <div
      className={isTop ? 'glass-strong' : 'glass'}
      style={{
        padding: '24px 28px',
        borderRadius: 'var(--radius-lg)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        animation: `slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${rank * 0.1}s both`,
      }}
    >
      {isTop && (
        <div style={{
          position: 'absolute', top: 12, right: 12,
          background: 'linear-gradient(135deg, var(--green-500), var(--green-400))',
          borderRadius: 'var(--radius-full)',
          padding: '3px 12px',
          fontSize: '0.7rem', fontWeight: 700,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          color: 'white',
        }}>
          Top Match
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
        <div style={{ flex: 1 }}>
          <h3 style={{
            fontSize: isTop ? '1.25rem' : '1.05rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: 6,
          }}>
            {prediction.display_name}
          </h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              background: 'rgba(255,255,255,0.05)',
              padding: '2px 10px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              {prediction.plant}
            </span>
            <span className={`badge ${getSeverityClass(prediction.severity)}`}>
              {prediction.severity}
            </span>
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{
            fontSize: isTop ? '2rem' : '1.5rem',
            fontWeight: 800,
            color: prediction.confidence > 70
              ? 'var(--green-400)'
              : prediction.confidence > 40
                ? 'var(--sev-moderate)'
                : 'var(--text-secondary)',
            lineHeight: 1,
          }}>
            {prediction.confidence}%
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>
            confidence
          </div>
        </div>
      </div>

      <ConfidenceBar value={prediction.confidence} />

      {isTop && prediction.description && (
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '0.9rem',
          lineHeight: 1.6,
          marginTop: 16,
        }}>
          {prediction.description}
        </p>
      )}

      {isTop && prediction.remedies?.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <p style={{
            color: 'var(--accent)', fontWeight: 600, fontSize: '0.85rem',
            marginBottom: 10, letterSpacing: '0.05em', textTransform: 'uppercase',
          }}>
            Treatment Steps
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {prediction.remedies.map((remedy, i) => (
              <li key={i} style={{
                display: 'flex', gap: 10, alignItems: 'flex-start',
                color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5,
              }}>
                <span style={{
                  flexShrink: 0,
                  width: 22, height: 22,
                  borderRadius: '50%',
                  background: 'rgba(16,185,129,0.15)',
                  border: '1px solid rgba(16,185,129,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.7rem', fontWeight: 700,
                  color: 'var(--accent)', marginTop: 1,
                }}>
                  {i + 1}
                </span>
                {remedy}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ── Results Panel ──────────────────────────────────────────────────────────────
function ResultsPanel({ results, onReset }) {
  const hasPredictions = Array.isArray(results?.predictions) && results.predictions.length > 0;

  return (
    <div style={{ marginTop: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <div className="text-label" style={{ marginBottom: 4 }}>Diagnosis Complete</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Analysis Results
          </h2>
        </div>
        <button
          className="btn-ghost"
          onClick={onReset}
          style={{ padding: '10px 20px', fontSize: '0.85rem' }}
        >
          New Scan
        </button>
      </div>
      {hasPredictions ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {results.predictions.map((pred, i) => (
            <ResultCard key={pred.class_name} prediction={pred} rank={i} />
          ))}
        </div>
      ) : (
        <div className="glass" style={{ padding: '24px 28px', borderRadius: 'var(--radius-lg)' }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 8 }}>No confident prediction</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            {results.message || 'The model confidence is below 40%, so no disease class was returned.'}
          </p>
        </div>
      )}
    </div>
  );
}

// ── Error Banner ───────────────────────────────────────────────────────────────
function ErrorBanner({ message, onDismiss }) {
  return (
    <div style={{
      marginTop: 20,
      padding: '16px 20px',
      background: 'rgba(239,68,68,0.1)',
      border: '1px solid rgba(239,68,68,0.3)',
      borderRadius: 'var(--radius-md)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 16,
      animation: 'slide-up 0.3s ease both',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: '1.2rem' }}>Warning</span>
        <p style={{ color: '#fca5a5', fontSize: '0.9rem' }}>{message}</p>
      </div>
      <button
        onClick={onDismiss}
        style={{ background: 'none', border: 'none', color: '#fca5a5', cursor: 'pointer', fontSize: '1.2rem', lineHeight: 1 }}
      >
        x
      </button>
    </div>
  );
}

// ── Hero Section ───────────────────────────────────────────────────────────────
function HeroSection({ onScanClick }) {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '80px 24px 60px',
      position: 'relative',
    }}>
      <div style={{ maxWidth: 780, zIndex: 1 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '8px 20px',
          background: 'rgba(16,185,129,0.1)',
          border: '1px solid rgba(16,185,129,0.25)',
          borderRadius: 'var(--radius-full)',
          marginBottom: 32,
          animation: 'fade-in 0.6s ease both',
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: 'var(--accent)',
            animation: 'pulse-glow 2s ease infinite',
            display: 'inline-block',
          }} />
          <span className="text-label" style={{ letterSpacing: '0.12em' }}>AI-Powered Plant Diagnostics</span>
        </div>

        <h1 className="text-hero animate-slide-up delay-100" style={{ marginBottom: 24 }}>
          Diagnose Any<br />Plant Disease<br />Instantly
        </h1>

        <p className="text-subheadline animate-slide-up delay-200" style={{ maxWidth: 560, margin: '0 auto 40px' }}>
          Upload a photo of a leaf and our deep learning model identifies diseases
          across 23 classes — with treatment recommendations in under a second.
        </p>

        <div
          className="animate-slide-up delay-300"
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <button className="btn-primary" onClick={onScanClick} id="hero-scan-btn">
            Scan a Leaf Now
          </button>
          <a href="#how-it-works" className="btn-ghost">
            How It Works
          </a>
        </div>

        <div
          className="animate-fade-in delay-500"
          style={{ display: 'flex', gap: 40, justifyContent: 'center', marginTop: 60, flexWrap: 'wrap' }}
        >
          {[
            { num: '23', label: 'Disease Classes' },
            { num: '10', label: 'Crop Species' },
            { num: '<1s', label: 'Inference Time' },
          ].map(({ num, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--green-400)', lineHeight: 1 }}>
                {num}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Scan Section ───────────────────────────────────────────────────────────────
function ScanSection({ scanRef }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = useCallback((f) => {
    setFile(f);
    setResults(null);
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(f);
  }, []);

  const handleAnalyse = async () => {
    if (!file) return;
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch(`${API_BASE}/predict`, { method: 'POST', body: formData });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || `Server error ${res.status}`);
      }
      const data = await res.json();
      setResults(data);
    } catch (e) {
      setError(e.message || 'Failed to connect to the server. Is the backend running?');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setResults(null);
    setError(null);
  };

  return (
    <section ref={scanRef} id="features" style={{ padding: '80px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="text-label" style={{ marginBottom: 12 }}>Plant Scanner</div>
          <h2 className="text-headline">Upload and Diagnose</h2>
          <div className="divider" style={{ margin: '16px auto' }} />
          <p className="text-subheadline" style={{ maxWidth: 480, margin: '0 auto' }}>
            Drop a clear photo of the affected leaf. The AI will identify diseases and suggest remedies.
          </p>
        </div>

        <UploadZone onFileSelect={handleFileSelect} preview={preview} isLoading={isLoading} />

        {error && <ErrorBanner message={error} onDismiss={() => setError(null)} />}

        {file && !results && !isLoading && (
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <button
              id="analyse-btn"
              className="btn-primary"
              onClick={handleAnalyse}
              style={{ padding: '14px 40px', fontSize: '1rem' }}
            >
              Analyse Leaf
            </button>
          </div>
        )}

        {results && <ResultsPanel results={results} onReset={handleReset} />}
      </div>
    </section>
  );
}

// ── Features Section ───────────────────────────────────────────────────────────
function FeaturesSection() {
  return (
    <section style={{ padding: '80px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div className="text-label" style={{ marginBottom: 12 }}>Why PhytoScan</div>
          <h2 className="text-headline">Built for Accuracy</h2>
          <div className="divider" style={{ margin: '16px auto' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {FEATURES.map((feat) => (
            <div key={feat.title} className="glass-card" style={{ padding: '32px 28px' }}>
              <div style={{
                width: 56, height: 56,
                borderRadius: 'var(--radius-md)',
                background: 'rgba(16,185,129,0.1)',
                border: '1px solid var(--glass-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.8rem', marginBottom: 20,
              }}>
                {feat.icon}
              </div>
              <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: 10 }}>
                {feat.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.65 }}>
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── How It Works ───────────────────────────────────────────────────────────────
function HowItWorksSection() {
  return (
    <section id="how-it-works" style={{ padding: '80px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div className="text-label" style={{ marginBottom: 12 }}>Simple Process</div>
          <h2 className="text-headline">How It Works</h2>
          <div className="divider" style={{ margin: '16px auto' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}>
          <div style={{
            position: 'absolute', left: 35, top: 56, bottom: 56,
            width: 2,
            background: 'linear-gradient(to bottom, var(--accent), transparent)',
            zIndex: 0,
          }} />
          {HOW_IT_WORKS.map((step) => (
            <div key={step.step} style={{
              display: 'flex', gap: 28, alignItems: 'flex-start',
              padding: '28px 0', position: 'relative', zIndex: 1,
            }}>
              <div style={{
                flexShrink: 0, width: 70, height: 70,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(5,150,105,0.1))',
                border: '2px solid var(--glass-border-strong)',
                backdropFilter: 'blur(10px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column',
                boxShadow: '0 0 30px rgba(16,185,129,0.15)',
              }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--accent)', fontWeight: 700, letterSpacing: '0.1em' }}>
                  STEP
                </span>
                <span style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--green-300)', lineHeight: 1 }}>
                  {step.step}
                </span>
              </div>
              <div style={{ paddingTop: 12 }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
                  {step.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.65, maxWidth: 580 }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Diseases CTA Section ───────────────────────────────────────────────────────
function DiseasesCTA({ onScanClick }) {
  const diseases = [
    'Apple Scab', 'Black Rot', 'Powdery Mildew', 'Leaf Blight',
    'Bacterial Spot', 'Late Blight', 'Mosaic Virus', 'Leaf Scorch',
    'Cercospora Spot', 'Cedar Rust', 'Citrus Greening', 'Spider Mites',
  ];
  return (
    <section id="diseases" style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <div className="text-label" style={{ marginBottom: 12 }}>Supported Diseases</div>
        <h2 className="text-headline" style={{ marginBottom: 16 }}>23 Disease Classes</h2>
        <div className="divider" style={{ margin: '0 auto 32px' }} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 48 }}>
          {diseases.map((d) => (
            <span key={d} style={{
              padding: '8px 18px',
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              backdropFilter: 'blur(10px)',
            }}>
              {d}
            </span>
          ))}
          <span style={{
            padding: '8px 18px',
            background: 'rgba(16,185,129,0.1)',
            border: '1px solid rgba(16,185,129,0.25)',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.85rem',
            color: 'var(--accent)',
          }}>
            +11 more
          </span>
        </div>
        <div className="glass-card" style={{ padding: '48px 40px' }}>
          <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, marginBottom: 12, color: 'var(--text-primary)' }}>
            Ready to Diagnose Your Plant?
          </h3>
          <p className="text-subheadline" style={{ marginBottom: 32 }}>
            It is free, instant, and requires no account. Just upload a leaf photo.
          </p>
          <button className="btn-primary" onClick={onScanClick} style={{ padding: '16px 44px', fontSize: '1.05rem' }}>
            Start Free Scan
          </button>
        </div>
      </div>
    </section>
  );
}

import ModelTransparency from './components/ModelTransparency.jsx';

// ── Footer ─────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      padding: '40px 24px',
      borderTop: '1px solid var(--glass-border)',
      textAlign: 'center',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: '1.3rem' }}>🍃</span>
        <span style={{
          fontWeight: 800, fontSize: '1.1rem',
          background: 'linear-gradient(135deg, #f0fdf4, #10b981)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>
          PhytoScan
        </span>
        <span style={{
          fontSize: '0.6rem', fontWeight: 700, padding: '2px 8px',
          borderRadius: 999,
          background: 'rgba(16,185,129,0.15)',
          border: '1px solid rgba(16,185,129,0.25)',
          color: '#10b981', letterSpacing: '0.1em',
        }}>
          AI
        </span>
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        Built for SIH 2026 - Deep Learning Plant Disease Classifier
      </p>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: 8 }}>
        Model trained on PlantVillage dataset - 23 classes - Swin Transformer architecture
      </p>
    </footer>
  );
}

// ── App ────────────────────────────────────────────────────────────────────────
export default function App() {
  const scanRef = useRef(null);
  const scrollToScan = () => {
    scanRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <>
      <ParticleBackground />
      <Navbar onScanClick={scrollToScan} />
      <main>
        <HeroSection onScanClick={scrollToScan} />
        <ScanSection scanRef={scanRef} />
        <FeaturesSection />
        <HowItWorksSection />
        <ModelTransparency />
        <DiseasesCTA onScanClick={scrollToScan} />
      </main>
      <Footer />
    </>
  );
}
