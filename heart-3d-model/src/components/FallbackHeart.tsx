import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import * as THREE from 'three';

// This component creates a stylized heart shape as a fallback
// when the GLTF model fails to load
const FallbackHeart: React.FC = () => {
  // Reference to the heart mesh for animations
  const heartRef = useRef<Mesh>(null);
  
  // Create a heart shape using THREE.js Shape
  const createHeartShape = () => {
    const x = 0, y = 0;
    const heartShape = new THREE.Shape();
    
    heartShape.moveTo(x + 0.5, y + 0.5);
    heartShape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
    heartShape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
    heartShape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9);
    heartShape.bezierCurveTo(x + 1.2, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7);
    heartShape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1.0, y);
    heartShape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);
    
    return heartShape;
  };

  // Animate the heart with a gentle pulsing effect
  useFrame((state) => {
    if (heartRef.current) {
      // Create a subtle beating effect
      const t = state.clock.getElapsedTime();
      const scale = 1 + Math.sin(t * 2) * 0.05;
      heartRef.current.scale.set(scale, scale, scale);
      
      // Slowly rotate the heart
      heartRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={heartRef}>
      {/* Create an extruded geometry from the heart shape */}
      <extrudeGeometry 
        args={[
          createHeartShape(),
          {
            steps: 2,
            depth: 0.5,
            bevelEnabled: true,
            bevelThickness: 0.2,
            bevelSize: 0.1,
            bevelOffset: 0,
            bevelSegments: 5
          }
        ]} 
      />
      <meshStandardMaterial 
        color="#ff3366" 
        roughness={0.3}
        metalness={0.2}
      />
    </mesh>
  );
};

export default FallbackHeart;
