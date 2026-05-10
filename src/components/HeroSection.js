import React from 'react';
import './HeroSection.css';

const EMOTIONS = [
  { emoji: '😠', label: 'Angry', color: '#ef4444' },
  { emoji: '🤢', label: 'Disgust', color: '#a855f7' },
  { emoji: '😨', label: 'Fear', color: '#3b82f6' },
  { emoji: '😄', label: 'Happy', color: '#eab308' },
  { emoji: '😐', label: 'Neutral', color: '#94a3b8' },
  { emoji: '😢', label: 'Sad', color: '#60a5fa' },
  { emoji: '😲', label: 'Surprise', color: '#f97316' },
];

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-tags">
          <span className="tag tag-cyan">Lemos et al. 2026</span>
          <span className="tag tag-purple">FER2013 Dataset</span>
          <span className="tag tag-amber">MobileNetV2</span>
        </div>

        <h1 className="hero-title">
          Audience Emotion
          <br />
          <span className="hero-title-accent">Recognition System</span>
        </h1>

        <p className="hero-desc">
          Deep learning-based facial emotion analysis for live events.<br />
          Based on{' '}
          <a
            href="https://www.mdpi.com/2414-4088/10/1/8"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-link"
          >
            "From Cues to Engagement"
          </a>{' '}
          — Multimodal Technologies and Interaction, 10(1), 8.
        </p>

        <div className="emotion-pills">
          {EMOTIONS.map(({ emoji, label, color }) => (
            <div key={label} className="emotion-pill" style={{ '--ec': color }}>
              <span>{emoji}</span>
              <span className="mono" style={{ fontSize: 11 }}>{label}</span>
            </div>
          ))}
        </div>

        <div className="hero-stats">
          <div className="stat">
            <span className="stat-num">63.45%</span>
            <span className="stat-label mono">Val Accuracy</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">28,709</span>
            <span className="stat-label mono">Train Images</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">7</span>
            <span className="stat-label mono">Emotions</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">30</span>
            <span className="stat-label mono">Epochs</span>
          </div>
        </div>
      </div>
    </section>
  );
}
