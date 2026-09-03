import React, { useState, useEffect } from 'react';
import { Sparkles, Scan, Menu, X, Cpu, ShieldCheck } from 'lucide-react';

import ThemeSwitcher from './ThemeSwitcher.jsx';

export default function Navbar3D({ onScanClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '01 Canopy', href: '#canopy' },
    { label: '02 3D Lab', href: '#specimen-lab' },
    { label: '03 AI Scanner', href: '#scanner' },
    { label: '04 Swin-S Architecture', href: '#architecture' },
    { label: '05 AI Benchmarks', href: '#behind-the-ai' },
    { label: '06 23 Diseases', href: '#diseases' },
  ];

  return (
    <header className={`rk-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="rk-nav-shell">
        {/* Logo */}
        <a href="#" className="rk-logo">
          <div className="rk-logo-icon">
            <span className="rk-logo-leaf">🌿</span>
            <div className="rk-logo-glow" />
          </div>
          <div className="rk-logo-text">
            <span className="rk-brand-name">PHYTOSCAN</span>
            <span className="rk-brand-sub">3D BOTANICAL AI</span>
          </div>
        </a>

        {/* Desktop Navigation Links (Rapidkert style) */}
        <nav className="rk-nav-menu">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="rk-nav-link">
              <span className="rk-link-idx">{link.label.slice(0, 2)}</span>
              <span className="rk-link-name">{link.label.slice(3)}</span>
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="rk-nav-actions">
          {/* Multi-Chroma Theme Switcher */}
          <ThemeSwitcher />

          <div className="rk-sys-badge">
            <span className="rk-pulse-indicator" />
            <span className="rk-badge-txt">SWIN-S // 1.PTH ONLINE</span>
          </div>

          <button onClick={onScanClick} className="rk-cta-btn">
            <Scan size={14} />
            <span>DIAGNOSE LEAF</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rk-mobile-burger"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="rk-mobile-drawer">
          <div className="rk-drawer-inner">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rk-drawer-link"
                onClick={() => setMobileOpen(false)}
              >
                <span className="rk-link-idx">{link.label.slice(0, 2)}</span>
                <span className="rk-link-name">{link.label.slice(3)}</span>
              </a>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false);
                onScanClick();
              }}
              className="rk-cta-btn rk-drawer-cta"
            >
              <Scan size={15} />
              <span>LAUNCH 3D SCANNER</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
