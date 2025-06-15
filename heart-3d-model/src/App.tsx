import React from 'react';
import './App.css';
import HeartViewer from './components/HeartViewer';

/**
 * Main App component that renders the 3D Heart Viewer
 * This single-page application displays a 3D model of a human heart
 * using React Three.js (React Three Fiber)
 */
function App() {
  return (
    <div className="App">
      <HeartViewer />
    </div>
  );
}

export default App;
