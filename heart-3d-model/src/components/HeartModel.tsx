import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Html } from '@react-three/drei';
import { Mesh } from 'three';
import FallbackHeart from './FallbackHeart';

// This component renders the 3D heart model
const HeartModel: React.FC<{ modelPath: string }> = ({ modelPath }) => {
  // Create a reference to the heart mesh to animate it
  const heartRef = useRef<Mesh>(null);
  
  // Load the 3D model using useGLTF hook from drei
  // This will handle the loading and parsing of the GLTF file
  const { scene, nodes, materials } = useGLTF(modelPath);
  
  // If the model fails to load, show a fallback heart shape
  const modelFailed = !scene || Object.keys(nodes).length === 0;
  
  // Animate the heart with a gentle pulsing effect
  useFrame((state) => {
    if (heartRef.current) {
      // Create a subtle beating effect
      const t = state.clock.getElapsedTime();
      heartRef.current.scale.x = 20 + Math.sin(t * 2) * 0.05;
      heartRef.current.scale.y = 20 + Math.sin(t * 2) * 0.05;
      heartRef.current.scale.z = 20 + Math.sin(t * 2) * 0.05;
      
      // Slowly rotate the heart
      heartRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group>
      {modelFailed ? (
        // Fallback: If the model fails to load, render our custom heart shape
        <>
          <FallbackHeart />
          <Html position={[0, 2, 0]}>
            <div style={{ color: 'white', background: 'rgba(0,0,0,0.7)', padding: '10px', borderRadius: '5px' }}>
              Using fallback heart model
            </div>
          </Html>
        </>
      ) : (
        // Render the loaded GLTF model
        <primitive ref={heartRef} object={scene} scale={40} />
      )}
    </group>
  );
};

// Pre-load the model to improve performance
useGLTF.preload('/models/stylizedhumanheart_gltf/scene.gltf');

export default HeartModel;
