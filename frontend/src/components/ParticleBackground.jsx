import React, { useEffect, useRef } from 'react';

// Floating particle system — pure CSS-controlled
const PARTICLE_COUNT = 30;

export default function ParticleBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const el = document.createElement('div');
      const size = Math.random() * 4 + 2; // 2–6px
      const delay = Math.random() * 15;    // 0–15s delay
      const duration = Math.random() * 15 + 10; // 10–25s duration
      const driftX = (Math.random() - 0.5) * 200; // -100 to +100px horizontal

      el.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        bottom: -10px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(16,185,129,0.9), rgba(52,211,153,0.3));
        box-shadow: 0 0 ${size * 3}px rgba(16,185,129,0.6);
        animation: particle-drift ${duration}s linear ${delay}s infinite;
        --drift-x: ${driftX}px;
        pointer-events: none;
      `;
      return el;
    });

    particles.forEach(p => container.appendChild(p));
    return () => particles.forEach(p => container.removeChild(p));
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
