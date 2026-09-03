import React from 'react';
import { ArrowUpRight, Scan, ShieldAlert, Cpu, Sparkles } from 'lucide-react';

export default function RapidkertHero({ onScanClick, onSpecimenClick }) {
  return (
    <section id="canopy" className="rk-hero-stage">
      <div className="rk-hero-shell">
        {/* Editorial Subtitle Tag */}
        <div className="rk-hero-tag-row">
          <div className="rk-datum-pill">
            <span className="rk-datum-dot" />
            <span className="rk-datum-txt">VOL. 26 // SIH AGRICULTURAL AI // SWIN TRANSFORMER</span>
          </div>
          <span className="rk-datum-code">[ 23 CROPS // 4 STAGE HIERARCHY ]</span>
        </div>

        {/* Stepped Rapidkert Signature Typography */}
        <h1 className="rk-display-hero">
          <span className="rk-ln">
            <b>PRECISION</b>
          </span>
          <span className="rk-ln rk-ln--in">
            <b><em className="rk-moss-text">BOTANICAL</em></b>
          </span>
          <span className="rk-ln rk-ln--in2">
            <b>DIAGNOSTICS</b>
          </span>
        </h1>

        {/* Editorial Lede Paragraph */}
        <div className="rk-hero-grid">
          <p className="rk-hero-lede">
            Harnessing hierarchical Swin Transformer vision networks to decode foliar pathology.
            Detect necrotic lesions, fungal spore colonies, and viral mosaics in under 20 milliseconds
            with verified agronomic treatment protocols.
          </p>

          {/* Action CTAs */}
          <div className="rk-hero-actions">
            <button onClick={onScanClick} className="btn-rk-solid">
              <span>SCAN SPECIMEN NOW</span>
              <Scan size={15} />
            </button>
            <button onClick={onSpecimenClick} className="btn-rk-outline">
              <span>3D HOLOGRAPHIC LAB</span>
              <ArrowUpRight size={14} />
            </button>
            <a href="#diseases" className="btn-rk-ghost">
              <span>INDEX OF 23 DISEASES</span>
            </a>
          </div>
        </div>

        {/* Signature Bottom Metrics Strip */}
        <div className="rk-hero-foot">
          <div className="rk-foot-stat">
            <span className="rk-stat-num">98.02%</span>
            <span className="rk-stat-label">TOP-1 ACCURACY</span>
          </div>
          <div className="rk-foot-sep" />
          <div className="rk-foot-stat">
            <span className="rk-stat-num">23</span>
            <span className="rk-stat-label">PATHOLOGY CLASSES</span>
          </div>
          <div className="rk-foot-sep" />
          <div className="rk-foot-stat">
            <span className="rk-stat-num">&lt;18ms</span>
            <span className="rk-stat-label">GPU INFERENCE SPEED</span>
          </div>
          <div className="rk-foot-sep" />
          <div className="rk-foot-stat">
            <span className="rk-stat-num">50.0M</span>
            <span className="rk-stat-label">SWIN-S PARAMETERS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
