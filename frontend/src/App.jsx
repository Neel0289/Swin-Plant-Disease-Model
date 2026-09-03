import React, { useRef, useState } from 'react';
import Botanical3DLoader from './components/Botanical3DLoader.jsx';
import ThreeBotanicalScene from './components/ThreeBotanicalScene.jsx';
import Navbar3D from './components/Navbar3D.jsx';
import RapidkertHero from './components/RapidkertHero.jsx';
import ThreeSpecimenViewer from './components/ThreeSpecimenViewer.jsx';
import ScannerTerminal from './components/ScannerTerminal.jsx';
import SwinArchitecture3D from './components/SwinArchitecture3D.jsx';
import ModelTransparency from './components/ModelTransparency.jsx';
import DiseaseIndex3D from './components/DiseaseIndex3D.jsx';
import Footer3D from './components/Footer3D.jsx';

export default function App() {
  const [loading, setLoading] = useState(true);
  const scannerRef = useRef(null);
  const specimenRef = useRef(null);

  const scrollToScanner = () => {
    scannerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToSpecimen = () => {
    specimenRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="rk-master-app">
      {/* 3D Neural Architecture Preloader */}
      {loading && <Botanical3DLoader onLoaded={() => setLoading(false)} />}

      {/* Three.js Interactive 3D Botanical Ecosystem (Terrain, Canopy & Spores) */}
      <ThreeBotanicalScene />

      {/* Floating Glassmorphism 3D Navigation */}
      <Navbar3D onScanClick={scrollToScanner} />

      {/* Main Experience Chapters */}
      <main>
        {/* Chapter 01: The Living Canopy & Editorial Hero */}
        <RapidkertHero
          onScanClick={scrollToScanner}
          onSpecimenClick={scrollToSpecimen}
        />

        {/* Chapter 02: 3D Holographic Specimen Studio */}
        <section id="specimen-lab" ref={specimenRef} className="rk-section-shell" style={{ paddingBottom: '40px' }}>
          <div className="rk-stage-header">
            <div className="rk-stage-index">
              <span className="rk-index-num">02</span>
              <span className="rk-index-bar" />
              <span className="rk-index-tag">3D HOLOGRAPHIC SPECIMEN LAB</span>
            </div>
            <h2 className="rk-stage-title">Multi-Spectral Foliar Inspector</h2>
            <p className="rk-stage-subtitle">
              Interactive 3D morphological analysis of plant tissue. Rotate 360° to inspect epidermal
              venation, thermal transpiration stress, and Swin-Transformer attention heatmaps in real-time.
            </p>
          </div>

          <ThreeSpecimenViewer />
        </section>

        {/* Chapter 03: Live Diagnostic Scan Terminal */}
        <ScannerTerminal scannerRef={scannerRef} />

        {/* Chapter 04: Swin-S Shifted-Window Attention Architecture */}
        <SwinArchitecture3D />

        {/* Chapter 05: Neural Architecture & Benchmark Validation */}
        <ModelTransparency />

        {/* Chapter 06: 23-Disease Herbarium & Treatment Index */}
        <DiseaseIndex3D onSelectForScan={scrollToScanner} />
      </main>

      {/* Chapter 07: Rapidkert Botanical Footer */}
      <Footer3D />
    </div>
  );
}
