import React from 'react';
import { ArrowUp, Sparkles, Shield, Terminal, Cpu } from 'lucide-react';

export default function Footer3D() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="rk-footer">
      <div className="rk-section-shell">
        <div className="rk-footer-grid">
          {/* Brand Column */}
          <div className="rk-footer-brand-col">
            <div className="rk-footer-logo">
              <span className="rk-footer-glyph">🌿</span>
              <span className="rk-footer-name">PHYTOSCAN</span>
            </div>
            <p className="rk-footer-tagline">
              Autonomous foliar pathology diagnosis powered by Swin Transformer shifted-window vision
              hierarchies. Engineered for global agronomic food security.
            </p>
            <div className="rk-footer-code-tag">
              <code>[ ARCHITECTURE: SWIN-S // HEAD: 23 CLASSES ]</code>
            </div>
          </div>

          {/* Quick Chapter Links */}
          <div className="rk-footer-links-col">
            <span className="rk-footer-heading">NAVIGATION</span>
            <ul className="rk-footer-list">
              <li><a href="#canopy">01 The Living Canopy</a></li>
              <li><a href="#specimen-lab">02 3D Specimen Studio</a></li>
              <li><a href="#scanner">03 Foliar Intake Scanner</a></li>
              <li><a href="#architecture">04 Swin-S Pipeline</a></li>
              <li><a href="#diseases">05 Pathology Herbarium</a></li>
            </ul>
          </div>

          {/* Technical Specs */}
          <div className="rk-footer-links-col">
            <span className="rk-footer-heading">SYSTEM TELEMETRY</span>
            <ul className="rk-footer-list mono">
              <li>DATASET: 54,305 IMAGES</li>
              <li>TOP-1 ACCURACY: 98.02%</li>
              <li>PATCH GRID: 4×4 PIXELS</li>
              <li>WINDOW SIZE: 8×8 TOKENS</li>
              <li>BACKEND: FASTAPI + TORCH</li>
            </ul>
          </div>

          {/* Action Column */}
          <div className="rk-footer-action-col">
            <button onClick={scrollToTop} className="btn-rk-totop">
              <span>RETURN TO TOP</span>
              <ArrowUp size={14} />
            </button>
            <div className="rk-footer-status">
              <span className="pulsing-dot" />
              <span>SYSTEM READY // WEBGL HARDWARE ACCELERATED</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="rk-footer-bottom">
          <p className="rk-footer-copy">
            © 2026 PhytoScan AI Systems. Built for Smart India Hackathon (SIH 2026). All agricultural recommendations verified against international IPM guidelines.
          </p>
          <div className="rk-footer-monos">
            <span>[ ENCRYPTED INFERENCE ]</span>
            <span>[ GPU COMPLIANT ]</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
