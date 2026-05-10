import React, { useState, useRef, useCallback } from 'react';
import './UploadSection.css';

export default function UploadSection({ onImageUpload }) {
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileRef = useRef();

  const processFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  }, [processFile]);

  const handleChange = (e) => {
    processFile(e.target.files[0]);
  };

  const handleAnalyze = () => {
    if (preview) onImageUpload(preview);
  };

  return (
    <section className="upload-section">
      <div className="upload-inner">
        <div className="upload-header">
          <h2 className="section-title">Upload Face Image</h2>
          <p className="section-subtitle">// DRAG & DROP OR CLICK TO SELECT</p>
        </div>

        {!preview ? (
          <div
            className={`dropzone ${dragging ? 'dragging' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current.click()}
          >
            <div className="dropzone-content">
              <div className="upload-icon">
                <span>📸</span>
                <div className="upload-ring ring1" />
                <div className="upload-ring ring2" />
              </div>
              <p className="dropzone-title">Drop your face image here</p>
              <p className="dropzone-sub mono">PNG, JPG, JPEG, WEBP · Max 10MB</p>
              <button className="btn btn-outline" style={{ marginTop: 8 }}>Browse Files</button>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleChange}
            />
          </div>
        ) : (
          <div className="preview-area">
            <div className="preview-image-wrap">
              <img src={preview} alt="Preview" className="preview-img" />
              <div className="scan-overlay">
                <div className="scan-line" />
              </div>
              <div className="corner tl" />
              <div className="corner tr" />
              <div className="corner bl" />
              <div className="corner br" />
            </div>
            <div className="preview-actions">
              <p className="preview-ready mono">✓ IMAGE READY FOR ANALYSIS</p>
              <div style={{ display: 'flex', gap: 12 }}>
                <button className="btn btn-ghost" onClick={() => setPreview(null)}>
                  ↩ Change Image
                </button>
                <button className="btn btn-primary" onClick={handleAnalyze}>
                  🔍 Analyze Emotion
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="upload-note">
          <div className="note-icon mono">ℹ</div>
          <p className="mono" style={{ fontSize: 11, color: 'var(--text-muted)' }}>
            Note: This is a demo UI. In production, the uploaded image would be passed to the MobileNetV2 model for real-time inference.
            The model was trained on FER2013 and achieves <strong style={{ color: 'var(--accent)' }}>63.45% validation accuracy</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}
