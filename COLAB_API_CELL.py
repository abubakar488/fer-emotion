## 🌐 STEP 11: Flask API + ngrok  (Copy this entire cell into your Colab notebook)
## Yeh cell existing notebook ke bilkul end mein add karo

# ============================================================
# 1. Install required packages
# ============================================================
!pip install flask flask-cors pyngrok --quiet
print("✅ Flask + ngrok installed")

# ============================================================
# 2. ngrok auth token set karo
#    Free account: https://dashboard.ngrok.com/get-started/your-authtoken
# ============================================================
from pyngrok import ngrok

NGROK_TOKEN = "YOUR_NGROK_TOKEN_HERE"   # <-- sirf yahan apna token paste karo
ngrok.set_auth_token(NGROK_TOKEN)

# ============================================================
# 3. Flask API server
# ============================================================
from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import torch.nn.functional as F
from torchvision import transforms
from PIL import Image
import io
import numpy as np
import threading

# -- make sure model variable is available (Step 4 mein define tha) --
# agar model reload karna hai:
# checkpoint = torch.load('/content/best_model.pth')
# model.load_state_dict(checkpoint['model_state_dict'])
# model.eval()

EMOTIONS = ['angry', 'disgust', 'fear', 'happy', 'neutral', 'sad', 'surprise']

val_transform = transforms.Compose([
    transforms.Grayscale(num_output_channels=3),
    transforms.Resize((48, 48)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225]),
])

app = Flask(__name__)
CORS(app)  # React ko allow karo

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'model': 'MobileNetV2-FER2013'})

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    img_file = request.files['image']
    img_bytes = img_file.read()

    try:
        img = Image.open(io.BytesIO(img_bytes)).convert('RGB')
        img_tensor = val_transform(img).unsqueeze(0).to(device)

        model.eval()
        with torch.no_grad():
            outputs = model(img_tensor)
            probs = F.softmax(outputs, dim=1).squeeze().cpu().numpy().tolist()

        pred_idx = int(np.argmax(probs))
        return jsonify({
            'probs': probs,
            'predicted_emotion': EMOTIONS[pred_idx],
            'confidence': round(probs[pred_idx], 4),
            'all_emotions': EMOTIONS
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ============================================================
# 4. Run Flask in background thread + start ngrok tunnel
# ============================================================
def run_flask():
    app.run(host='0.0.0.0', port=5000, debug=False, use_reloader=False)

t = threading.Thread(target=run_flask, daemon=True)
t.start()

import time
time.sleep(2)

# Start ngrok tunnel
public_url = ngrok.connect(5000).public_url
print("\n" + "="*55)
print("🚀 API SERVER IS LIVE!")
print("="*55)
print(f"📡 Public URL: {public_url}")
print(f"🔗 Predict endpoint: {public_url}/predict")
print(f"❤️  Health check: {public_url}/health")
print("="*55)
print("\n✅ React mein yeh URL .env file mein paste karo:")
print(f"   REACT_APP_API_URL={public_url}")
print("\n⚠️  Yeh tab tak kaam karega jab tak Colab session chal raha hai")
