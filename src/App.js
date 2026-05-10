import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import UploadSection from './components/UploadSection';
import ResultsSection from './components/ResultsSection';
import ModelResults from './components/ModelResults';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [activeTab, setActiveTab] = useState('upload');

  const handleImageUpload = useCallback((imageData) => {
    setUploadedImage(imageData);
    setActiveTab('results');
  }, []);

  const handleReset = useCallback(() => {
    setUploadedImage(null);
    setActiveTab('upload');
  }, []);

  return (
    <div className="app">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main">
        {activeTab === 'upload' && (
          <>
            <HeroSection />
            <UploadSection onImageUpload={handleImageUpload} />
          </>
        )}
        {activeTab === 'results' && uploadedImage && (
          <ResultsSection image={uploadedImage} onReset={handleReset} />
        )}
        {activeTab === 'model' && <ModelResults />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
