import React, { useState, useEffect } from 'react';

const LeafIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2C6.5 2 2 6.5 2 12c0 2.4.85 4.6 2.25 6.33C6.5 20.8 9.1 22 12 22s5.5-1.2 7.75-3.67C21.15 16.6 22 14.4 22 12c0-5.5-4.5-10-10-10z"
      fill="rgba(16,185,129,0.3)"
      stroke="#10b981"
      strokeWidth="1.5"
    />
    <path
      d="M12 2c0 0-4 6-4 10s1.8 7.2 4 10c2.2-2.8 4-6 4-10S12 2 12 2z"
      fill="rgba(16,185,129,0.5)"
      stroke="#10b981"
      strokeWidth="1"
    />
    <line x1="12" y1="2" x2="12" y2="22" stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" />
  </svg>
);

export default function Navbar({ onScanClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        background: scrolled
          ? 'rgba(4, 13, 7, 0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(16,185,129,0.12)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <LeafIcon />
        <span style={{
          fontSize: '1.25rem',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #f0fdf4, #10b981)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.02em',
        }}>
          PhytoScan
        </span>
        <span style={{
          fontSize: '0.6rem',
          fontWeight: 700,
          padding: '3px 8px',
          borderRadius: '999px',
          background: 'rgba(16,185,129,0.2)',
          border: '1px solid rgba(16,185,129,0.3)',
          color: '#10b981',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginTop: '2px',
        }}>
          AI
        </span>
      </div>

      {/* Nav links — desktop */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="nav-links">
        {['Features', 'How It Works', 'Behind the AI', 'Diseases'].map(item => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/ /g, '-')}`}
            style={{
              color: 'rgba(240,253,244,0.7)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = '#10b981'}
            onMouseLeave={e => e.target.style.color = 'rgba(240,253,244,0.7)'}
          >
            {item}
          </a>
        ))}
      </div>

      {/* CTA */}
      <button
        className="btn-primary"
        onClick={onScanClick}
        style={{ padding: '10px 22px', fontSize: '0.9rem' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        Scan a Leaf
      </button>
    </nav>
  );
}
