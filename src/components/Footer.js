import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <span className="mono" style={{ fontSize: 11, color: 'var(--text-muted)' }}>
            🎭 AudienceAI · FER2013 Emotion Recognition
          </span>
          <span className="mono" style={{ fontSize: 10, color: 'var(--text-muted)', opacity: 0.6 }}>
            Based on Lemos, Cardoso & Rodrigues (2026) · MTI 10(1), 8
          </span>
        </div>
        <div className="footer-right">
          <a href="https://www.mdpi.com/2414-4088/10/1/8" target="_blank" rel="noopener noreferrer" className="footer-link mono">
            Paper ↗
          </a>
          <a href="https://www.kaggle.com/datasets/ananthu017/emotion-detection-fer" target="_blank" rel="noopener noreferrer" className="footer-link mono">
            Dataset ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
