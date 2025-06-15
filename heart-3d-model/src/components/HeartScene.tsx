import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import HeartModel from './HeartModel';

interface HeartSceneProps {
  autoRotate?: boolean;
}

// This component sets up the 3D scene with lighting, controls, and environment
const HeartScene: React.FC<HeartSceneProps> = ({ autoRotate = true }) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      {/* Canvas is the main container for a Three.js scene */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'linear-gradient(to bottom, #1e1e2f, #2d2d44)' }}
      >
        {/* Suspense provides a loading fallback while the 3D model is loading */}
        <Suspense fallback={null}>
          {/* Environment provides realistic lighting */}
          <Environment preset="city" />
          
          {/* The 3D heart model component */}
          <HeartModel modelPath="/models/stylizedhumanheart_gltf/scene.gltf" />
          
          {/* Contact shadows add realism */}
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
          />
        </Suspense>
        
        {/* OrbitControls allow the user to rotate and zoom the scene */}
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minDistance={3} 
          maxDistance={10}
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
        />
        
        {/* Add ambient and directional lighting for better visibility */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      </Canvas>
    </div>
  );
};

export default HeartScene;
