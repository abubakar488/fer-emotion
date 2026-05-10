import React from 'react';
import './Header.css';

const NAV = [
  { id: 'upload', label: 'ANALYZE', icon: '⬆' },
  { id: 'results', label: 'RESULTS', icon: '📊' },
  { id: 'model', label: 'MODEL STATS', icon: '🧠' },
];

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <div className="logo-icon">
            <span>🎭</span>
          </div>
          <div className="logo-text">
            <span className="logo-name">AudienceAI</span>
            <span className="logo-sub mono">FER2013 · MobileNetV2</span>
          </div>
        </div>

        <nav className="nav">
          {NAV.map(({ id, label, icon }) => (
            <button
              key={id}
              className={`nav-btn mono ${activeTab === id ? 'active' : ''}`}
              onClick={() => setActiveTab(id)}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="header-badge">
          <span className="pulse-dot" />
          <span className="mono" style={{ fontSize: 11, color: 'var(--accent)' }}>LIVE</span>
        </div>
      </div>
    </header>
  );
}
