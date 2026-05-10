# 🎭 AudienceAI — Emotion Recognition Dashboard

> A production-grade React UI for Facial Emotion Recognition (FER2013)  
> Based on: **Lemos, Cardoso & Rodrigues (2026)** — *"From Cues to Engagement"*, MTI 10(1), 8

---

## 📸 Features

- **Image Upload** — Drag & drop or click to upload any face image
- **Emotion Analysis** — Real-time prediction display with MobileNetV2 results
- **Interactive Charts** — Bar chart + Radar chart (Recharts)
- **Model Stats Tab** — Training curves, confusion matrix, per-class accuracy
- **Dark Sci-Fi UI** — Custom design with animations and glowing effects

---

## 🚀 Quick Setup (3 commands only)

### Prerequisites: Node.js ≥ 16, npm ≥ 8

```bash
# Step 1 — Install dependencies
npm install

# Step 2 — Start dev server
npm start
# Opens http://localhost:3000

# Step 3 (optional) — Production build
npm run build
```

---

## 📁 Project Structure

```
fer-emotion-ui/
├── public/
│   ├── dataset_analysis.png
│   ├── sample_images.png
│   ├── training_curves.png
│   ├── confusion_matrix.png
│   └── per_class_accuracy.png
├── src/
│   ├── components/
│   │   ├── Header.js/.css
│   │   ├── HeroSection.js/.css
│   │   ├── UploadSection.js/.css
│   │   ├── ResultsSection.js/.css
│   │   ├── ModelResults.js/.css
│   │   └── Footer.js/.css
│   ├── App.js
│   ├── App.css
│   └── index.css
└── README.md
```

---

## 🧠 Model — MobileNetV2 + FER2013

| Metric | Score |
|--------|-------|
| Overall Accuracy | **63.45%** |
| Macro F1-Score | **60.12%** |
| Weighted F1-Score | **63.01%** |

| Emotion | Accuracy |
|---------|----------|
| 😠 Angry | 57.2% |
| 🤢 Disgust | 71.4% |
| 😨 Fear | 46.3% |
| 😄 Happy | 83.1% |
| 😐 Neutral | 63.8% |
| 😢 Sad | 55.6% |
| 😲 Surprise | 78.9% |

---

## 📄 Reference

```
Lemos, M., Cardoso, P. J., & Rodrigues, J. M. (2026).
From Cues to Engagement: A Comprehensive Survey and Holistic Architecture
for Computer Vision-Based Audience Analysis in Live Events.
Multimodal Technologies and Interaction, 10(1), 8.
https://www.mdpi.com/2414-4088/10/1/8
```

Dataset: https://www.kaggle.com/datasets/ananthu017/emotion-detection-fer  
Colab: https://drive.google.com/file/d/1wKjL-B1tE5ztkMoRjYV_KVhLVQm0yU_N/view?usp=sharing

---

## 📌 Note on Predictions

The emotion predictions in the UI are **simulated** for demo purposes.  
To connect the real model, replace `simulatePrediction()` in `ResultsSection.js` with an API call to your deployed PyTorch backend.

```js
const formData = new FormData();
formData.append('image', imageBlob);
const res = await fetch('http://your-api/predict', { method: 'POST', body: formData });
const { probs, maxIdx } = await res.json();
```
