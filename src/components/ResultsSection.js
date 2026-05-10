import React, { useState, useEffect } from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import './ResultsSection.css';

const EMOTIONS = [
  { key: 'angry',    label: 'Angry',    emoji: '😠', color: '#ef4444' },
  { key: 'disgust',  label: 'Disgust',  emoji: '🤢', color: '#a855f7' },
  { key: 'fear',     label: 'Fear',     emoji: '😨', color: '#3b82f6' },
  { key: 'happy',    label: 'Happy',    emoji: '😄', color: '#eab308' },
  { key: 'neutral',  label: 'Neutral',  emoji: '😐', color: '#94a3b8' },
  { key: 'sad',      label: 'Sad',      emoji: '😢', color: '#60a5fa' },
  { key: 'surprise', label: 'Surprise', emoji: '😲', color: '#f97316' },
];

const API_URL = process.env.REACT_APP_API_URL || '';

export default function ResultsSection({ image, onReset }) {
  const [analyzing, setAnalyzing] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setAnalyzing(true);
    setError(null);
    setResult(null);
    callAPI(image);
  }, [image]);

  const callAPI = async (imageDataUrl) => {
    try {
      // Convert base64 dataURL to Blob
      const res = await fetch(imageDataUrl);
      const blob = await res.blob();

      const formData = new FormData();
      formData.append('image', blob, 'face.jpg');

      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(`API error ${response.status}: ${err}`);
      }

      const data = await response.json();
      // data = { probs: [0.1, 0.05, ...], predicted_emotion: "happy", confidence: 0.83 }
      const probs = data.probs;
      const maxIdx = probs.indexOf(Math.max(...probs));
      setResult({ probs, maxIdx, emotion: EMOTIONS[maxIdx] });
    } catch (err) {
      setError(err.message);
    } finally {
      setAnalyzing(false);
    }
  };

  const chartData = result
    ? EMOTIONS.map((e, i) => ({
        subject: e.label,
        value: Math.round(result.probs[i] * 100 * 10) / 10,
      }))
    : [];

  const barData = result
    ? EMOTIONS.map((e, i) => ({
        name: `${e.emoji} ${e.label}`,
        value: Math.round(result.probs[i] * 100 * 10) / 10,
        color: e.color,
      }))
    : [];

  return (
    <section className="results-section">
      <div className="results-inner">
        {analyzing && (
          <div className="analyzing-state">
            <div className="spinner" />
            <p className="analyzing-text mono">ANALYZING WITH MOBILENETV2...</p>
            <div className="analyzing-steps">
              {['Preprocessing image', 'Running MobileNetV2', 'Extracting features', 'Computing softmax probabilities'].map((s, i) => (
                <div key={s} className="step" style={{ animationDelay: `${i * 0.4}s` }}>
                  <span className="step-dot" />
                  <span className="mono" style={{ fontSize: 12 }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <div>
              <p className="error-title">API Connection Failed</p>
              <p className="error-msg mono">{error}</p>
              <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
                <button className="btn btn-primary" onClick={() => callAPI(image)}>
                  ↺ Retry
                </button>
                <button className="btn btn-ghost" onClick={onReset}>
                  ← Change Image
                </button>
              </div>
              <div className="error-hint">
                <p className="mono" style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 12 }}>
                  Make sure Colab is running and <code>REACT_APP_API_URL</code> is set in <code>.env</code>
                </p>
              </div>
            </div>
          </div>
        )}

        {!analyzing && !error && result && (
          <>
            <div className="result-banner" style={{ '--rc': result.emotion.color }}>
              <div className="banner-left">
                <span className="result-emoji">{result.emotion.emoji}</span>
                <div>
                  <p className="result-label mono">DETECTED EMOTION</p>
                  <p className="result-emotion">{result.emotion.label.toUpperCase()}</p>
                  <p className="result-conf mono">
                    {(result.probs[result.maxIdx] * 100).toFixed(1)}% confidence
                  </p>
                </div>
              </div>
              <div className="banner-right">
                <img src={image} alt="Analyzed" className="analyzed-img" />
                <div className="scan-line-anim" />
              </div>
            </div>

            <div className="charts-grid">
              <div className="card">
                <h3 className="chart-title">Emotion Probabilities</h3>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={barData} layout="vertical" margin={{ left: 20, right: 30, top: 4, bottom: 4 }}>
                    <XAxis type="number" domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 11 }} unit="%" />
                    <YAxis type="category" dataKey="name" tick={{ fill: '#e2e8f0', fontSize: 12 }} width={110} />
                    <Tooltip
                      formatter={(v) => [`${v}%`, 'Probability']}
                      contentStyle={{ background: '#0d1525', border: '1px solid rgba(0,212,255,0.2)', borderRadius: 8, color: '#e2e8f0' }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {barData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} opacity={i === result.maxIdx ? 1 : 0.45} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="card">
                <h3 className="chart-title">Emotion Radar</h3>
                <ResponsiveContainer width="100%" height={260}>
                  <RadarChart data={chartData}>
                    <PolarGrid stroke="rgba(0,212,255,0.1)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <Radar dataKey="value" stroke={result.emotion.color} fill={result.emotion.color} fillOpacity={0.2} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="emotion-grid">
              {EMOTIONS.map((e, i) => {
                const pct = (result.probs[i] * 100).toFixed(1);
                const isTop = i === result.maxIdx;
                return (
                  <div key={e.key} className={`emotion-card ${isTop ? 'emotion-card-top' : ''}`} style={{ '--ec': e.color }}>
                    <div className="emotion-card-top-row">
                      <span style={{ fontSize: 22 }}>{e.emoji}</span>
                      <span className="ec-label">{e.label}</span>
                      {isTop && <span className="ec-badge mono">TOP</span>}
                    </div>
                    <div className="ec-bar-wrap">
                      <div className="ec-bar" style={{ width: `${pct}%`, background: e.color }} />
                    </div>
                    <span className="ec-pct mono">{pct}%</span>
                  </div>
                );
              })}
            </div>

            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <button className="btn btn-outline" onClick={onReset}>
                ↩ Analyze Another Image
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
