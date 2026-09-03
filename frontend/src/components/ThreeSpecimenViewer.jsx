import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, Zap, Layers, Activity, RefreshCw } from 'lucide-react';

/**
 * ThreeSpecimenViewer — 3D Holographic Specimen Studio
 * Features:
 * - Interactive 3D plant specimen with procedural leaf blade, rachis stem, and lateral venation
 * - Orbit drag rotation with inertia
 * - 4 switchable multi-spectral analysis modes (Natural, Thermal IR, Swin Grad-CAM Heatmap, Necrosis)
 * - 3D Laser Diagnostic scan sweep with holographic HUD overlay
 */
export default function ThreeSpecimenViewer() {
  const mountRef = useRef(null);
  const [activeMode, setActiveMode] = useState('natural'); // 'natural' | 'thermal' | 'attention' | 'necrosis'
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [telemetry, setTelemetry] = useState({
    cellularDensity: '94.8%',
    chlorophyllIndex: 'SPAD 48.2',
    thermalVariance: '0.4°C',
    anomalyScore: '0.02 [NOMINAL]',
  });

  // Keep references across renders for live updates
  const sceneElementsRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight || 480;

    // ── Three.js Scene Setup ──────────────────────────────────────────────
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    mount.appendChild(renderer.domElement);

    // ── Lighting ──────────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0x2d4a34, 2.2);
    scene.add(ambientLight);

    const frontLight = new THREE.DirectionalLight(0xe8f5e9, 2.0);
    frontLight.position.set(4, 5, 8);
    scene.add(frontLight);

    const rimLight = new THREE.DirectionalLight(0x10b981, 3.5);
    rimLight.position.set(-6, -4, -4);
    scene.add(rimLight);

    const laserLight = new THREE.PointLight(0x34d399, 0, 8);
    scene.add(laserLight);

    // ── Procedural Leaf Geometry ─────────────────────────────────────────
    const leafGroup = new THREE.Group();
    scene.add(leafGroup);

    // Leaf blade shape using 2D curve extruded with curvature
    const shape = new THREE.Shape();
    // Starting at petiole base
    shape.moveTo(0, -2.4);
    shape.bezierCurveTo(0.9, -1.8, 1.8, -0.4, 1.7, 0.8);
    shape.bezierCurveTo(1.6, 1.7, 0.8, 2.5, 0, 3.2); // apex
    shape.bezierCurveTo(-0.8, 2.5, -1.6, 1.7, -1.7, 0.8);
    shape.bezierCurveTo(-1.8, -0.4, -0.9, -1.8, 0, -2.4);

    const leafGeo = new THREE.ShapeGeometry(shape, 48);

    // Give the flat shape 3D natural convex curvature & cup depth
    const pos = leafGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const distFromMidrib = Math.abs(x);
      // V-shaped midrib dip + gentle tip bend
      const zCurvature = -Math.pow(distFromMidrib, 1.4) * 0.28 + (y * 0.08);
      pos.setZ(i, zCurvature);
    }
    leafGeo.computeVertexNormals();

    // ── Procedural Textures for Modes ────────────────────────────────────
    const createLeafTexture = (mode) => {
      const texCanvas = document.createElement('canvas');
      texCanvas.width = 512;
      texCanvas.height = 512;
      const ctx = texCanvas.getContext('2d');

      if (mode === 'natural') {
        // Lush botanical chlorophyll green with micro-veins
        const bg = ctx.createLinearGradient(0, 512, 0, 0);
        bg.addColorStop(0, '#1d3e24');
        bg.addColorStop(0.5, '#2e6b3b');
        bg.addColorStop(1, '#3e8a4e');
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, 512, 512);

        // Primary midrib vein
        ctx.strokeStyle = '#6ee7b7';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(256, 512);
        ctx.bezierCurveTo(256, 384, 256, 128, 256, 0);
        ctx.stroke();

        // Secondary lateral veins
        ctx.strokeStyle = 'rgba(167, 243, 208, 0.45)';
        ctx.lineWidth = 2.5;
        for (let i = 80; i < 480; i += 34) {
          ctx.beginPath();
          ctx.moveTo(256, i);
          ctx.quadraticCurveTo(340, i - 30, 430, i - 60);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(256, i);
          ctx.quadraticCurveTo(172, i - 30, 82, i - 60);
          ctx.stroke();
        }
      } else if (mode === 'thermal') {
        // FLIR-style thermal infrared spectrum (blue/purple cold -> yellow/red heat stress)
        const bg = ctx.createLinearGradient(0, 512, 0, 0);
        bg.addColorStop(0, '#1e1b4b');
        bg.addColorStop(0.35, '#4338ca');
        bg.addColorStop(0.7, '#d97706');
        bg.addColorStop(1, '#ef4444');
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, 512, 512);

        // Heat stress anomaly spots
        const radial = ctx.createRadialGradient(310, 220, 10, 310, 220, 90);
        radial.addColorStop(0, '#ffffff');
        radial.addColorStop(0.3, '#fef08a');
        radial.addColorStop(0.7, '#dc2626');
        radial.addColorStop(1, 'rgba(220, 38, 38, 0)');
        ctx.fillStyle = radial;
        ctx.beginPath();
        ctx.arc(310, 220, 90, 0, Math.PI * 2);
        ctx.fill();
      } else if (mode === 'attention') {
        // Grad-CAM Attention Heatmap: Swin-S Shifted Window Attention activations
        ctx.fillStyle = '#0a100c';
        ctx.fillRect(0, 0, 512, 512);

        // Swin window grid overlay (8x8 window patches)
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.2)';
        ctx.lineWidth = 1;
        for (let x = 0; x < 512; x += 64) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 512); ctx.stroke();
        }
        for (let y = 0; y < 512; y += 64) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(512, y); ctx.stroke();
        }

        // Attention focal hotspots
        const centers = [
          { x: 270, y: 190, r: 85, color: '#f43f5e' },
          { x: 210, y: 290, r: 65, color: '#fb923c' },
          { x: 330, y: 310, r: 50, color: '#38bdf8' },
        ];
        centers.forEach(({ x, y, r, color }) => {
          const radial = ctx.createRadialGradient(x, y, 4, x, y, r);
          radial.addColorStop(0, color);
          radial.addColorStop(0.6, 'rgba(245, 158, 11, 0.4)');
          radial.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = radial;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (mode === 'necrosis') {
        // Necrotic Lesion Profiler: pathogen cell breakdown
        ctx.fillStyle = '#1e2920';
        ctx.fillRect(0, 0, 512, 512);

        // Lesion spots with corky borders
        const spots = [
          { x: 290, y: 180, r: 35 },
          { x: 190, y: 260, r: 26 },
          { x: 340, y: 290, r: 18 },
        ];
        spots.forEach(({ x, y, r }) => {
          ctx.fillStyle = '#451a03';
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = '#e06c53';
          ctx.lineWidth = 3;
          ctx.stroke();

          // Concentric target ring
          ctx.strokeStyle = 'rgba(234, 179, 8, 0.8)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(x, y, r * 1.5, 0, Math.PI * 2);
          ctx.stroke();
        });
      }

      return new THREE.CanvasTexture(texCanvas);
    };

    const initialTexture = createLeafTexture('natural');
    const leafMaterial = new THREE.MeshStandardMaterial({
      map: initialTexture,
      side: THREE.DoubleSide,
      roughness: 0.45,
      metalness: 0.12,
    });

    const leafMesh = new THREE.Mesh(leafGeo, leafMaterial);
    leafGroup.add(leafMesh);

    // Stem (petiole)
    const stemCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -2.4, 0),
      new THREE.Vector3(0, -3.2, -0.2),
      new THREE.Vector3(-0.15, -3.8, -0.4),
    ]);
    const stemGeo = new THREE.TubeGeometry(stemCurve, 20, 0.08, 12, false);
    const stemMat = new THREE.MeshStandardMaterial({
      color: 0x22452a,
      roughness: 0.6,
    });
    const stemMesh = new THREE.Mesh(stemGeo, stemMat);
    leafGroup.add(stemMesh);

    // 3D Laser Scan Bar Plane
    const laserBarGeo = new THREE.CylinderGeometry(0.04, 0.04, 4.4, 16);
    laserBarGeo.rotateZ(Math.PI / 2);
    const laserBarMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0,
    });
    const laserBar = new THREE.Mesh(laserBarGeo, laserBarMat);
    laserBar.position.set(0, -2.5, 0.2);
    leafGroup.add(laserBar);

    // Save references
    sceneElementsRef.current = {
      scene,
      camera,
      renderer,
      leafGroup,
      leafMaterial,
      laserBar,
      laserLight,
      createLeafTexture,
    };

    // ── Mouse Drag Rotation Controls ────────────────────────────────────
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let rotSpeed = { x: 0, y: 0 };

    const onPointerDown = (e) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouse.x;
      const dy = e.clientY - prevMouse.y;

      rotSpeed.y = dx * 0.007;
      rotSpeed.x = dy * 0.007;

      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // ── Animation Loop ───────────────────────────────────────────────────
    let animId;
    let scanY = -2.5;
    let scanDirection = 1;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Inertial spin or gentle auto-idle oscillation
      if (!isDragging) {
        leafGroup.rotation.y += (0.004 + rotSpeed.y);
        rotSpeed.x *= 0.94;
        rotSpeed.y *= 0.94;
      } else {
        leafGroup.rotation.y += rotSpeed.y;
        leafGroup.rotation.x += rotSpeed.x;
        rotSpeed.x = 0;
        rotSpeed.y = 0;
      }

      // Restrict pitch
      leafGroup.rotation.x = Math.max(-0.6, Math.min(0.6, leafGroup.rotation.x));

      // Handle 3D Laser Scan sweep
      if (sceneElementsRef.current?.scanning) {
        scanY += 0.07 * scanDirection;
        if (scanY > 3.0) scanDirection = -1;
        if (scanY < -2.4) {
          scanDirection = 1;
        }
        laserBar.position.y = scanY;
        laserLight.position.set(0, scanY, 1.2);

        const normalizedProgress = Math.round(((scanY + 2.4) / 5.4) * 100);
        setScanProgress(Math.max(0, Math.min(100, normalizedProgress)));
      }

      renderer.render(scene, camera);
    };

    animate();

    // ── Cleanup ──────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      if (mount.contains(dom)) {
        mount.removeChild(dom);
      }
      renderer.dispose();
      leafGeo.dispose();
      leafMaterial.dispose();
      stemGeo.dispose();
      stemMat.dispose();
      laserBarGeo.dispose();
      laserBarMat.dispose();
    };
  }, []);

  // ── Switch Spectral Modes ──────────────────────────────────────────────
  const handleModeChange = (mode) => {
    setActiveMode(mode);
    if (!sceneElementsRef.current) return;
    const { leafMaterial, createLeafTexture } = sceneElementsRef.current;
    if (leafMaterial) {
      if (leafMaterial.map) leafMaterial.map.dispose();
      leafMaterial.map = createLeafTexture(mode);
      leafMaterial.needsUpdate = true;
    }

    // Update telemetry readouts based on mode
    if (mode === 'natural') {
      setTelemetry({
        cellularDensity: '94.8%',
        chlorophyllIndex: 'SPAD 48.2',
        thermalVariance: '0.4°C',
        anomalyScore: '0.02 [NOMINAL]',
      });
    } else if (mode === 'thermal') {
      setTelemetry({
        cellularDensity: '88.3%',
        chlorophyllIndex: 'SPAD 39.1',
        thermalVariance: '+2.8°C [HOTSPOT]',
        anomalyScore: '0.64 [STRESS]',
      });
    } else if (mode === 'attention') {
      setTelemetry({
        cellularDensity: 'Swin-S Stage 3',
        chlorophyllIndex: 'W-MSA Heads: 12',
        thermalVariance: 'Cross-Attention: 0.94',
        anomalyScore: 'Focal Mask: [8×8 Patch]',
      });
    } else if (mode === 'necrosis') {
      setTelemetry({
        cellularDensity: '72.4% [LYSIS]',
        chlorophyllIndex: 'SPAD 22.0',
        thermalVariance: '+3.6°C',
        anomalyScore: '0.91 [PATHOGEN DETECTED]',
      });
    }
  };

  // ── Trigger 3D Laser Diagnostic Scan ──────────────────────────────────
  const handleTriggerScan = () => {
    if (!sceneElementsRef.current) return;
    setIsScanning(true);
    sceneElementsRef.current.scanning = true;
    sceneElementsRef.current.laserBar.material.opacity = 0.9;
    sceneElementsRef.current.laserLight.intensity = 4.0;

    setTimeout(() => {
      if (sceneElementsRef.current) {
        sceneElementsRef.current.scanning = false;
        sceneElementsRef.current.laserBar.material.opacity = 0;
        sceneElementsRef.current.laserLight.intensity = 0;
      }
      setIsScanning(false);
    }, 4200);
  };

  const handleResetPose = () => {
    if (sceneElementsRef.current?.leafGroup) {
      sceneElementsRef.current.leafGroup.rotation.set(0, 0, 0);
    }
  };

  return (
    <div className="specimen-viewer-card">
      {/* Top Header */}
      <div className="specimen-header">
        <div className="specimen-header-left">
          <span className="mono-badge">
            <span className="pulsing-dot" /> 3D SPECIMEN LAB // INTERACTIVE
          </span>
          <h3 className="specimen-title">3D Holographic Leaf Inspector</h3>
        </div>
        <div className="specimen-header-actions">
          <button
            onClick={handleResetPose}
            className="btn-rk-sm"
            title="Reset 3D Orientation"
          >
            <RefreshCw size={13} /> Reset 3D
          </button>
          <button
            onClick={handleTriggerScan}
            disabled={isScanning}
            className={`btn-rk-accent-sm ${isScanning ? 'is-active' : ''}`}
          >
            <Zap size={14} /> {isScanning ? `Scanning ${scanProgress}%` : 'Run 3D Laser Scan'}
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Viewport */}
      <div className="specimen-viewport-wrap">
        <div ref={mountRef} className="specimen-canvas" />

        {/* 3D Telemetry Overlay HUD */}
        <div className="specimen-hud-overlay">
          <div className="hud-corner top-left">
            <span className="hud-label">CELL DENSITY</span>
            <span className="hud-val">{telemetry.cellularDensity}</span>
          </div>
          <div className="hud-corner top-right">
            <span className="hud-label">CHLOROPHYLL</span>
            <span className="hud-val">{telemetry.chlorophyllIndex}</span>
          </div>
          <div className="hud-corner bottom-left">
            <span className="hud-label">THERMAL VAR</span>
            <span className="hud-val">{telemetry.thermalVariance}</span>
          </div>
          <div className="hud-corner bottom-right">
            <span className="hud-label">AI INDEX</span>
            <span className="hud-val accent-pulse">{telemetry.anomalyScore}</span>
          </div>

          <div className="hud-hint">
            <span>DRAG TO ORBIT 360° // SCROLL TO ZOOM</span>
          </div>
        </div>
      </div>

      {/* Spectral Layer Selector Tabs */}
      <div className="spectral-modes-bar">
        <span className="modes-label">SPECTRAL CHANNELS:</span>
        <div className="modes-group">
          {[
            { id: 'natural', label: '01 Natural Foliage', icon: Eye },
            { id: 'thermal', label: '02 Thermal IR', icon: Activity },
            { id: 'attention', label: '03 Swin Attention Heatmap', icon: Layers },
            { id: 'necrosis', label: '04 Necrotic Lesions', icon: Zap },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleModeChange(id)}
              className={`mode-pill ${activeMode === id ? 'is-active' : ''}`}
            >
              <Icon size={13} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
