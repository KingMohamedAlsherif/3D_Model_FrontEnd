import React, { useState, useEffect } from 'react';
import HeartScene from './HeartScene';
import './HeartViewer.css';

// This component provides the UI wrapper around our 3D scene
const HeartViewer: React.FC = () => {
  // State to track if the model is rotating automatically
  const [autoRotate, setAutoRotate] = useState(true);
  
  // State to track if the model is in fullscreen mode
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className={`heart-viewer ${isFullscreen ? 'fullscreen' : ''}`}>
      {/* Header section with title */}
      <header className="viewer-header">
        <h1>Interactive 3D Heart Model</h1>
        <p>Explore the human heart in 3D space</p>
      </header>
      
      {/* Main content area with the 3D scene */}
      <div className="viewer-content">
        <div className="scene-container">
          <HeartScene autoRotate={autoRotate} />
          
          {/* Overlay with instructions */}
          <div className="scene-overlay">
            <div className="instructions">
              <p>Click and drag to rotate</p>
              <p>Scroll to zoom in/out</p>
            </div>
          </div>
        </div>
        
        {/* Control panel */}
        <div className="control-panel">
          <h2>Controls</h2>
          <div className="control-buttons">
            <button 
              onClick={() => setAutoRotate(!autoRotate)}
              className={autoRotate ? 'active' : ''}
            >
              {autoRotate ? 'Stop Rotation' : 'Start Rotation'}
            </button>
            
            <button onClick={toggleFullscreen}>
              {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            </button>
          </div>
          
          <div className="model-info">
            <h3>About This Model</h3>
            <p>
              This is a 3D model of a human heart rendered using React Three Fiber and Three.js.
              The model demonstrates the basic structure of the heart.
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer with attribution */}
      <footer className="viewer-footer">
        <p>Created with React and Three.js</p>
      </footer>
    </div>
  );
};

export default HeartViewer;
