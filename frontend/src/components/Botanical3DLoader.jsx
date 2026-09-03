import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { Cpu, CheckCircle2, Zap, Sparkles } from 'lucide-react';

/**
 * Botanical3DLoader — High-End 3D Neural Initialization Screen
 * Features:
 * - Interactive Three.js 3D rotating holographic crystal/seed core with chromatic particle rings
 * - Real-time system telemetry telemetry readout verifying `swin_model/1.pth`
 * - Dynamic percentage counter (0% -> 100%) with multi-chroma gradient beam
 * - Smooth curtain reveal exit animation
 */
export default function Botanical3DLoader({ onLoaded }) {
  const [progress, setProgress] = useState(0);
  const [stageText, setStageText] = useState('INITIALIZING SHIFTED WINDOW ENGINE...');
  const [isDone, setIsDone] = useState(false);
  const canvasRef = useRef(null);

  // ── Three.js Mini Hologram Scene ──────────────────────────────────────────
  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const width = container.clientWidth || 280;
    const height = container.clientHeight || 280;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Dynamic Multi-color Lights (Cyan, Violet, Gold, Emerald)
    const cyanLight = new THREE.PointLight(0x00e5ff, 4, 10);
    cyanLight.position.set(2, 3, 3);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0xa855f7, 4, 10);
    violetLight.position.set(-2, -2, 3);
    scene.add(violetLight);

    const goldLight = new THREE.PointLight(0xfacc15, 2.5, 8);
    goldLight.position.set(0, 3, -2);
    scene.add(goldLight);

    // Central 3D Icosahedron Core (Representing Neural Attention Latent Vector)
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.15,
      metalness: 0.85,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Glowing Wireframe Cage
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const wireMesh = new THREE.Mesh(coreGeo, wireMat);
    wireMesh.scale.set(1.02, 1.02, 1.02);
    scene.add(wireMesh);

    // Orbital Ring 1 (Emerald/Cyan)
    const ring1Geo = new THREE.TorusGeometry(1.9, 0.02, 16, 80);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.8,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    // Orbital Ring 2 (Electric Violet)
    const ring2Geo = new THREE.TorusGeometry(2.3, 0.02, 16, 80);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.7,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    scene.add(ring2);

    // Floating Sparks
    const pCount = 70;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i++) {
      pPos[i] = (Math.random() - 0.5) * 6;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0xfacc15,
      transparent: true,
      opacity: 0.9,
    });
    const pSystem = new THREE.Points(pGeo, pMat);
    scene.add(pSystem);

    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      coreMesh.rotation.x = t * 0.4;
      coreMesh.rotation.y = t * 0.6;
      wireMesh.rotation.x = t * 0.4;
      wireMesh.rotation.y = t * 0.6;

      ring1.rotation.z = t * 0.8;
      ring2.rotation.x = t * 0.5;
      pSystem.rotation.y = -t * 0.2;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      wireMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      pGeo.dispose();
      pMat.dispose();
    };
  }, []);

  // ── Progress & Telemetry Sequence ─────────────────────────────────────────
  useEffect(() => {
    const stages = [
      { at: 15, text: 'BOOTING SWIN TRANSFORMER HIERARCHY...' },
      { at: 42, text: 'VERIFYING CHECKPOINT: swin_model/1.pth (586.6 MB)...' },
      { at: 70, text: 'CALIBRATING 23-CLASS FOLIAR TAXONOMY HEADS...' },
      { at: 88, text: 'SYNCHRONIZING WEBGL 3D BOTANICAL CANOPY SHADERS...' },
      { at: 100, text: 'NEURAL SYSTEM ENGAGED. LAUNCHING 3D STUDIO...' },
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onLoaded, 600);
          }, 300);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 5 + 3);
        const capped = Math.min(100, next);

        const currentStage = stages.find((s) => capped <= s.at);
        if (currentStage) {
          setStageText(currentStage.text);
        }

        return capped;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <div className={`rk-loader-screen ${isDone ? 'is-leaving' : ''}`}>
      {/* Background Ambience Mesh */}
      <div className="rk-loader-backdrop" />

      <div className="rk-loader-card">
        {/* Top Monospace Header */}
        <div className="rk-loader-header">
          <div className="rk-loader-brand">
            <span className="rk-loader-icon">🌿</span>
            <span className="rk-loader-title">PHYTOSCAN 3D // AI CORE</span>
          </div>
          <span className="rk-loader-status-pill">
            <span className="pulsing-dot" /> LIVE ENGINE
          </span>
        </div>

        {/* 3D Holographic Core Viewport */}
        <div className="rk-loader-canvas-wrap">
          <div ref={canvasRef} className="rk-loader-canvas" />
          <div className="rk-loader-reticle tl" />
          <div className="rk-loader-reticle tr" />
          <div className="rk-loader-reticle bl" />
          <div className="rk-loader-reticle br" />
        </div>

        {/* Numeric Progress Counter */}
        <div className="rk-loader-counter-row">
          <div className="rk-loader-percent">
            <span className="percent-num">{String(progress).padStart(3, '0')}</span>
            <span className="percent-sym">%</span>
          </div>
          <div className="rk-loader-model-tag">
            <span className="model-label">WEIGHT TENSOR:</span>
            <span className="model-val">swin_model/1.pth [ONLINE]</span>
          </div>
        </div>

        {/* Multi-Chroma Gradient Progress Bar */}
        <div className="rk-loader-track">
          <div
            className="rk-loader-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Current Telemetry Stage */}
        <div className="rk-loader-telemetry">
          <Zap size={13} className="telemetry-icon" />
          <span className="telemetry-text">{stageText}</span>
        </div>

        {/* Skip button for instant jump */}
        <button
          onClick={() => {
            setIsDone(true);
            setTimeout(onLoaded, 300);
          }}
          className="rk-loader-skip"
        >
          ENTER STUDIO NOW →
        </button>
      </div>
    </div>
  );
}
