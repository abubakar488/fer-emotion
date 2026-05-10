import React, { useState } from 'react';
import './ModelResults.css';

const IMAGES = [
  { key: 'dataset', label: 'Dataset Analysis', file: 'dataset_analysis.png', desc: 'Class distribution across train/test sets' },
  { key: 'samples', label: 'Sample Images', file: 'sample_images.png', desc: 'Sample FER2013 images per emotion class' },
  { key: 'training', label: 'Training Curves', file: 'training_curves.png', desc: 'Loss & accuracy over 30 epochs' },
  { key: 'confusion', label: 'Confusion Matrix', file: 'confusion_matrix.png', desc: 'Per-class prediction breakdown' },
  { key: 'perclass', label: 'Per-Class Accuracy', file: 'per_class_accuracy.png', desc: 'Individual emotion recognition accuracy' },
];

const METRICS = [
  { label: 'Overall Accuracy', value: '63.45%', color: '#00d4ff' },
  { label: 'Macro F1-Score', value: '60.12%', color: '#7c3aed' },
  { label: 'Weighted F1', value: '63.01%', color: '#f59e0b' },
  { label: 'Best Val Acc', value: '63.45%', color: '#22c55e' },
];

const PER_CLASS = [
  { emotion: 'Angry',    emoji: '😠', acc: 57.2, color: '#ef4444' },
  { emotion: 'Disgust',  emoji: '🤢', acc: 71.4, color: '#a855f7' },
  { emotion: 'Fear',     emoji: '😨', acc: 46.3, color: '#3b82f6' },
  { emotion: 'Happy',    emoji: '😄', acc: 83.1, color: '#eab308' },
  { emotion: 'Neutral',  emoji: '😐', acc: 63.8, color: '#94a3b8' },
  { emotion: 'Sad',      emoji: '😢', acc: 55.6, color: '#60a5fa' },
  { emotion: 'Surprise', emoji: '😲', acc: 78.9, color: '#f97316' },
];

const CONFIG = {
  'Image Size': '48 × 48 px',
  'Batch Size': '64',
  'Epochs': '30',
  'Learning Rate': '1e-3',
  'Optimizer': 'AdamW',
  'Scheduler': 'CosineAnnealingLR',
  'Loss': 'CrossEntropy + Label Smoothing (0.1)',
  'Dropout': '0.4',
  'Backbone': 'MobileNetV2 (ImageNet)',
  'Classes': '7 Emotions',
};

export default function ModelResults() {
  const [active, setActive] = useState('dataset');

  const activeImg = IMAGES.find(i => i.key === active);

  return (
    <section className="model-section">
      <div className="model-inner">
        <div className="model-header">
          <h2 className="section-title">Model Performance</h2>
          <p className="section-subtitle">// MOBILENETV2 + FER2013 · LEMOS ET AL. 2026</p>
        </div>

        {/* Metric Cards */}
        <div className="metric-grid">
          {METRICS.map(({ label, value, color }) => (
            <div key={label} className="metric-card" style={{ '--mc': color }}>
              <span className="metric-val mono">{value}</span>
              <span className="metric-label">{label}</span>
            </div>
          ))}
        </div>

        {/* Result Images */}
        <div className="results-viz">
          <div className="tab-row">
            {IMAGES.map(({ key, label }) => (
              <button
                key={key}
                className={`tab-btn mono ${active === key ? 'active' : ''}`}
                onClick={() => setActive(key)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="img-area">
            <div className="img-caption mono">{activeImg?.desc}</div>
            <img
              key={active}
              src={`/${activeImg?.file}`}
              alt={activeImg?.label}
              className="result-img"
            />
          </div>
        </div>

        <div className="bottom-grid">
          {/* Per-Class */}
          <div className="card">
            <h3 className="chart-title mono">Per-Class Accuracy</h3>
            <div className="per-class-list">
              {PER_CLASS.map(({ emotion, emoji, acc, color }) => (
                <div key={emotion} className="pc-row">
                  <span style={{ fontSize: 18 }}>{emoji}</span>
                  <span className="pc-label">{emotion}</span>
                  <div className="pc-bar-wrap">
                    <div className="pc-bar" style={{ width: `${acc}%`, background: color }} />
                  </div>
                  <span className="pc-pct mono" style={{ color }}>{acc}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Config */}
          <div className="card">
            <h3 className="chart-title mono">Hyperparameters</h3>
            <div className="config-list">
              {Object.entries(CONFIG).map(([k, v]) => (
                <div key={k} className="config-row">
                  <span className="config-key mono">{k}</span>
                  <span className="config-val">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Paper reference */}
        <div className="paper-ref">
          <div className="paper-icon">📄</div>
          <div>
            <p className="paper-title">Research Paper</p>
            <p className="paper-cite mono">
              Lemos, M., Cardoso, P. J., & Rodrigues, J. M. (2026).{' '}
              <a href="https://www.mdpi.com/2414-4088/10/1/8" target="_blank" rel="noopener noreferrer" className="paper-link">
                From Cues to Engagement: A Comprehensive Survey and Holistic Architecture for Computer Vision-Based Audience Analysis in Live Events.
              </a>{' '}
              Multimodal Technologies and Interaction, 10(1), 8.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
