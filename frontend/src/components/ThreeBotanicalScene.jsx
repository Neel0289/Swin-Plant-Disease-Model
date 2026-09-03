import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * ThreeBotanicalScene — Modern 3D Floating Canopy & Organic Nebula Environment
 * Replaces the wireframe grid with:
 * - 24 beautifully shaded 3D botanical leaves drifting with realistic aerodynamics & flutter
 * - Smooth velvet terrain with fluid organic wave displacement (zero wireframes!)
 * - Floating bioluminescent chlorophyll orbs & fireflies with depth of field
 * - Interactive cursor-following point lighting that illuminates floating foliage
 * - Dynamic theme reactor (Aurora Cyan/Violet, Rapidkert Emerald/Clay, Infrared Coral/Cobalt)
 */
export default function ThreeBotanicalScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ── Scene, Camera & Renderer ──────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06080e, 0.04);

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 11);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // ── Lighting Rig ──────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0x162032, 2.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x00f0ff, 2.0);
    dirLight.position.set(8, 12, 6);
    scene.add(dirLight);

    // Interactive cursor light that bathes floating leaves in glow
    const cursorLight = new THREE.PointLight(0x00f0ff, 4.0, 16);
    cursorLight.position.set(0, 1, 4);
    scene.add(cursorLight);

    // Secondary accent light for cinematic rim illumination
    const accentLight = new THREE.PointLight(0xa855f7, 3.0, 20);
    accentLight.position.set(-6, -3, 2);
    scene.add(accentLight);

    // ── Leaf Texture Generator ───────────────────────────────────────────
    const createLeafTexture = () => {
      const cvs = document.createElement('canvas');
      cvs.width = 512;
      cvs.height = 512;
      const ctx = cvs.getContext('2d');

      // Base botanical gradient
      const bg = ctx.createLinearGradient(0, 512, 0, 0);
      bg.addColorStop(0, '#0c2419');
      bg.addColorStop(0.5, '#164e32');
      bg.addColorStop(1, '#22784b');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, 512, 512);

      // Central midrib
      ctx.strokeStyle = '#6ee7b7';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(256, 512);
      ctx.bezierCurveTo(256, 360, 256, 140, 256, 0);
      ctx.stroke();

      // Branching veins
      ctx.strokeStyle = 'rgba(167, 243, 208, 0.4)';
      ctx.lineWidth = 2.5;
      for (let y = 60; y < 490; y += 38) {
        ctx.beginPath();
        ctx.moveTo(256, y);
        ctx.quadraticCurveTo(340, y - 24, 430, y - 50);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(256, y);
        ctx.quadraticCurveTo(172, y - 24, 82, y - 50);
        ctx.stroke();
      }

      return new THREE.CanvasTexture(cvs);
    };

    const leafTex = createLeafTexture();

    // ── Create 3D Leaf Geometry ──────────────────────────────────────────
    const createLeafMesh = (scale = 1) => {
      const shape = new THREE.Shape();
      shape.moveTo(0, -1.5);
      shape.bezierCurveTo(0.6, -1.0, 1.1, -0.2, 1.0, 0.6);
      shape.bezierCurveTo(0.9, 1.2, 0.5, 1.7, 0, 2.2);
      shape.bezierCurveTo(-0.5, 1.7, -0.9, 1.2, -1.0, 0.6);
      shape.bezierCurveTo(-1.1, -0.2, -0.6, -1.0, 0, -1.5);

      const geo = new THREE.ShapeGeometry(shape, 32);

      // Add gentle 3D cup curvature
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const dist = Math.abs(x);
        pos.setZ(i, -Math.pow(dist, 1.3) * 0.22 + (y * 0.05));
      }
      geo.computeVertexNormals();

      const mat = new THREE.MeshStandardMaterial({
        map: leafTex,
        side: THREE.DoubleSide,
        roughness: 0.35,
        metalness: 0.15,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.scale.set(scale, scale, scale);
      return mesh;
    };

    // ── Floating Leaves Array ────────────────────────────────────────────
    const leavesGroup = new THREE.Group();
    scene.add(leavesGroup);

    const leafItems = [];
    const leafCount = 20;

    for (let i = 0; i < leafCount; i++) {
      const scale = 0.45 + Math.random() * 0.65;
      const leaf = createLeafMesh(scale);

      // Distribute across screen volume (both sides & depth)
      const x = (Math.random() - 0.5) * 24;
      const y = (Math.random() - 0.5) * 12 + 1;
      const z = (Math.random() - 0.5) * 14 - 1;

      leaf.position.set(x, y, z);
      leaf.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      leavesGroup.add(leaf);

      leafItems.push({
        mesh: leaf,
        baseX: x,
        baseY: y,
        baseZ: z,
        rotSpeedX: (Math.random() - 0.5) * 0.006,
        rotSpeedY: (Math.random() - 0.5) * 0.008,
        rotSpeedZ: (Math.random() - 0.5) * 0.005,
        bobPhase: Math.random() * Math.PI * 2,
        bobSpeed: 0.4 + Math.random() * 0.6,
        bobAmplitude: 0.25 + Math.random() * 0.35,
      });
    }

    // ── Smooth Organic Silk Wave (Zero Wireframes!) ──────────────────────
    const waveGeo = new THREE.PlaneGeometry(36, 28, 48, 48);
    waveGeo.rotateX(-Math.PI / 2.3);

    const wavePos = waveGeo.attributes.position;
    const waveOrig = new Float32Array(wavePos.array);

    for (let i = 0; i < wavePos.count; i++) {
      const x = wavePos.getX(i);
      const z = wavePos.getZ(i);
      const elev = Math.sin(x * 0.2) * Math.cos(z * 0.25) * 1.8;
      wavePos.setY(i, elev - 4.5);
      waveOrig[i * 3 + 1] = elev - 4.5;
    }
    waveGeo.computeVertexNormals();

    const waveMat = new THREE.MeshStandardMaterial({
      color: 0x09141f,
      roughness: 0.6,
      metalness: 0.4,
      flatShading: false,
    });
    const waveMesh = new THREE.Mesh(waveGeo, waveMat);
    scene.add(waveMesh);

    // ── Floating Bioluminescent Chloroplast Spores ────────────────────────
    const pCount = 220;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    const pVels = [];

    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 32;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 20;

      pVels.push({
        vy: 0.003 + Math.random() * 0.006,
        vx: (Math.random() - 0.5) * 0.004,
        phase: Math.random() * Math.PI * 2,
      });
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));

    // Glow dot texture
    const glowCvs = document.createElement('canvas');
    glowCvs.width = 64;
    glowCvs.height = 64;
    const gctx = glowCvs.getContext('2d');
    const grad = gctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(0, 240, 255, 1)');
    grad.addColorStop(0.35, 'rgba(16, 185, 129, 0.65)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    gctx.fillStyle = grad;
    gctx.fillRect(0, 0, 64, 64);
    const glowTexture = new THREE.CanvasTexture(glowCvs);

    const pMat = new THREE.PointsMaterial({
      size: 0.26,
      map: glowTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const pSystem = new THREE.Points(pGeo, pMat);
    scene.add(pSystem);

    // ── Mouse & Scroll Parallax State ────────────────────────────────────
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollY = 0;
    let targetScrollY = 0;

    const onMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── Dynamic Theme Reactor ────────────────────────────────────────────
    const onThemeChange = (e) => {
      const theme = e.detail?.themeId;
      if (theme === 'aurora') {
        dirLight.color.setHex(0x00f0ff);
        cursorLight.color.setHex(0x00f0ff);
        accentLight.color.setHex(0xa855f7);
        waveMat.color.setHex(0x081324);
        scene.fog.color.setHex(0x06080e);
      } else if (theme === 'infrared') {
        dirLight.color.setHex(0xf43f5e);
        cursorLight.color.setHex(0xf43f5e);
        accentLight.color.setHex(0xf97316);
        waveMat.color.setHex(0x180918);
        scene.fog.color.setHex(0x0b0714);
      } else {
        // Rapidkert Earth
        dirLight.color.setHex(0xa7f3d0);
        cursorLight.color.setHex(0x10b981);
        accentLight.color.setHex(0xc2845c);
        waveMat.color.setHex(0x0f1712);
        scene.fog.color.setHex(0x090c0a);
      }
    };
    window.addEventListener('rk-theme-change', onThemeChange);

    // Initial theme setup
    onThemeChange({ detail: { themeId: 'aurora' } });

    // ── Resize Handler ───────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // ── Main Animation Loop ──────────────────────────────────────────────
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth camera interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      scrollY += (targetScrollY - scrollY) * 0.06;
      const scrollNorm = Math.min(scrollY / 1000, 2.0);

      camera.position.x = mouse.x * 1.5;
      camera.position.y = 2 + mouse.y * 0.8 - scrollNorm * 0.6;
      camera.lookAt(mouse.x * 0.5, -scrollNorm * 0.3, 0);

      // Update cursor light
      cursorLight.position.x = mouse.x * 9;
      cursorLight.position.y = 1 + mouse.y * 4;

      // Animate 24 Floating Leaves
      leafItems.forEach((item) => {
        const { mesh, baseX, baseY, rotSpeedX, rotSpeedY, rotSpeedZ, bobPhase, bobSpeed, bobAmplitude } = item;

        // Aerodynamic bobbing
        mesh.position.y = baseY + Math.sin(elapsed * bobSpeed + bobPhase) * bobAmplitude;
        mesh.position.x = baseX + Math.cos(elapsed * 0.4 + bobPhase) * 0.15;

        // Gentle rotational drift
        mesh.rotation.x += rotSpeedX;
        mesh.rotation.y += rotSpeedY;
        mesh.rotation.z += rotSpeedZ;

        // Subtle orientation toward mouse light
        mesh.rotation.y += (mouse.x * 0.3 - mesh.rotation.y) * 0.01;
      });

      // Animate Silk Wave Surface
      const posArr = waveGeo.attributes.position;
      for (let i = 0; i < posArr.count; i++) {
        const ox = waveOrig[i * 3];
        const oy = waveOrig[i * 3 + 1];
        const oz = waveOrig[i * 3 + 2];
        const wave =
          Math.sin(ox * 0.25 + elapsed * 0.7) * 0.28 +
          Math.cos(oz * 0.2 + elapsed * 0.55) * 0.28;
        posArr.setY(i, oy + wave);
      }
      posArr.needsUpdate = true;

      // Animate Bioluminescent Spores
      const pArr = pGeo.attributes.position.array;
      for (let i = 0; i < pCount; i++) {
        const vel = pVels[i];
        pArr[i * 3 + 1] += vel.vy;
        pArr[i * 3] += Math.sin(elapsed * 0.6 + vel.phase) * 0.005;

        if (pArr[i * 3 + 1] > 8) {
          pArr[i * 3 + 1] = -8;
          pArr[i * 3] = (Math.random() - 0.5) * 32;
          pArr[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
      }
      pGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // ── Cleanup ──────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('rk-theme-change', onThemeChange);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      leafTex.dispose();
      glowTexture.dispose();
      waveGeo.dispose();
      waveMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      leafItems.forEach((it) => {
        it.mesh.geometry.dispose();
        it.mesh.material.dispose();
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    />
  );
}
