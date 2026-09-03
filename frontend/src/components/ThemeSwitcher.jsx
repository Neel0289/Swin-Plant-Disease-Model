import React, { useState, useEffect } from 'react';
import { Palette, Sparkles, Sun, Moon, Flame } from 'lucide-react';

export const THEMES = [
  {
    id: 'aurora',
    name: 'Aurora Cyber-Flora',
    icon: Sparkles,
    colors: ['#00f0ff', '#10b981', '#a855f7', '#facc15'],
    desc: 'Electric Cyan, Emerald, Neon Violet & Solar Gold',
    variables: {
      '--soil': '#080b15',
      '--soil-deep': '#04070e',
      '--soil-2': '#0e1424',
      '--soil-3': '#162038',
      '--soil-border': 'rgba(0, 240, 255, 0.12)',
      '--limestone': '#f8fafc',
      '--limestone-2': '#e2e8f0',
      '--limestone-mute': 'rgba(248, 250, 252, 0.65)',
      '--moss': '#0284c7',
      '--moss-lift': '#38bdf8',
      '--emerald': '#00f0ff',
      '--emerald-glow': 'rgba(0, 240, 255, 0.4)',
      '--emerald-subtle': 'rgba(0, 240, 255, 0.08)',
      '--heading-gradient': 'linear-gradient(135deg, #ffffff 0%, #a5f3fc 40%, #00f0ff 100%)',
      '--tag-bg': 'rgba(0, 240, 255, 0.12)',
      '--tag-border': 'rgba(0, 240, 255, 0.35)',
      '--clay': '#a855f7',
      '--clay-lift': '#c084fc',
      '--amber': '#facc15',
      '--accent-secondary': '#10b981',
    },
  },
  {
    id: 'rapidkert',
    name: 'Rapidkert Soil & Limestone',
    icon: Moon,
    colors: ['#477a4b', '#e8e5da', '#c2845c', '#10b981'],
    desc: 'Deep Fertile Soil, Limestone, Ancient Moss & Clay',
    variables: {
      '--soil': '#090c0a',
      '--soil-deep': '#060806',
      '--soil-2': '#121613',
      '--soil-3': '#1b221d',
      '--soil-border': 'rgba(232, 229, 218, 0.08)',
      '--limestone': '#e8e5da',
      '--limestone-2': '#dedacd',
      '--limestone-mute': 'rgba(232, 229, 218, 0.62)',
      '--moss': '#3f6645',
      '--moss-lift': '#5fa368',
      '--emerald': '#10b981',
      '--emerald-glow': 'rgba(16, 185, 129, 0.35)',
      '--emerald-subtle': 'rgba(16, 185, 129, 0.08)',
      '--heading-gradient': 'linear-gradient(135deg, #ffffff 0%, #bbf7d0 40%, #10b981 100%)',
      '--tag-bg': 'rgba(16, 185, 129, 0.12)',
      '--tag-border': 'rgba(52, 211, 153, 0.35)',
      '--clay': '#a56f52',
      '--clay-lift': '#d98264',
      '--amber': '#f59e0b',
      '--accent-secondary': '#d98264',
    },
  },
  {
    id: 'infrared',
    name: 'Multispectral Thermal IR',
    icon: Flame,
    colors: ['#f43f5e', '#f97316', '#38bdf8', '#fbbf24'],
    desc: 'Infrared Coral, Heatwave Amber, Cobalt & Pearl',
    variables: {
      '--soil': '#0b0714',
      '--soil-deep': '#06040c',
      '--soil-2': '#170e28',
      '--soil-3': '#23163e',
      '--soil-border': 'rgba(244, 63, 94, 0.14)',
      '--limestone': '#fff1f2',
      '--limestone-2': '#fce7f3',
      '--limestone-mute': 'rgba(255, 241, 242, 0.68)',
      '--moss': '#9333ea',
      '--moss-lift': '#c084fc',
      '--emerald': '#f43f5e',
      '--emerald-glow': 'rgba(244, 63, 94, 0.45)',
      '--emerald-subtle': 'rgba(244, 63, 94, 0.08)',
      '--heading-gradient': 'linear-gradient(135deg, #ffffff 0%, #fecdd3 40%, #f43f5e 100%)',
      '--tag-bg': 'rgba(244, 63, 94, 0.14)',
      '--tag-border': 'rgba(244, 63, 94, 0.38)',
      '--clay': '#f97316',
      '--clay-lift': '#fb923c',
      '--amber': '#fbbf24',
      '--accent-secondary': '#38bdf8',
    },
  },
];

export default function ThemeSwitcher() {
  const [activeThemeId, setActiveThemeId] = useState('aurora');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    applyTheme('aurora');
  }, []);

  const applyTheme = (themeId) => {
    const theme = THEMES.find((t) => t.id === themeId);
    if (!theme) return;
    setActiveThemeId(themeId);

    const root = document.documentElement;
    root.setAttribute('data-theme', themeId);
    Object.entries(theme.variables).forEach(([key, val]) => {
      root.style.setProperty(key, val);
    });

    // Notify custom event for Three.js canvases to react
    window.dispatchEvent(new CustomEvent('rk-theme-change', { detail: { themeId } }));
  };

  const activeTheme = THEMES.find((t) => t.id === activeThemeId) || THEMES[0];

  return (
    <div className="rk-theme-switcher-wrap">
      {/* Trigger Pill Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rk-theme-trigger-btn"
        title="Switch Visual Color Spectrum"
      >
        <Palette size={14} className="theme-trigger-icon" />
        <span className="theme-trigger-label">{activeTheme.name.split(' ')[0]}</span>
        <div className="theme-dots-preview">
          {activeTheme.colors.map((c, i) => (
            <span key={i} className="theme-dot" style={{ background: c }} />
          ))}
        </div>
      </button>

      {/* Floating Theme Menu */}
      {isOpen && (
        <div className="rk-theme-dropdown" onClick={() => setIsOpen(false)}>
          <div className="rk-theme-dropdown-header">
            <span className="dropdown-label">COLOR SPECTRUM PALETTES</span>
            <span className="dropdown-hint">SELECT TO TRANSFORM</span>
          </div>

          <div className="rk-theme-options">
            {THEMES.map((theme) => {
              const Icon = theme.icon;
              const isSelected = theme.id === activeThemeId;
              return (
                <button
                  key={theme.id}
                  onClick={() => applyTheme(theme.id)}
                  className={`rk-theme-option-card ${isSelected ? 'is-selected' : ''}`}
                >
                  <div className="theme-card-left">
                    <div className="theme-card-icon-wrap">
                      <Icon size={16} />
                    </div>
                    <div>
                      <div className="theme-card-title">{theme.name}</div>
                      <div className="theme-card-desc">{theme.desc}</div>
                    </div>
                  </div>
                  <div className="theme-card-palette-bars">
                    {theme.colors.map((color, idx) => (
                      <span
                        key={idx}
                        className="palette-swatch"
                        style={{ background: color }}
                      />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
