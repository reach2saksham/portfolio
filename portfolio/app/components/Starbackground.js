// portfolio/app/components/Starbackground.js
"use client";

import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const Stars = (props) => {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(1500), { radius: 1.2 }));

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 80;
      ref.current.rotation.y -= delta / 80;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => (
  <div className="w-full h-full fixed inset-0 z-10 bg-black">
    <Canvas
      onCreated={({ gl }) => {
        // Add context loss/restoration handling
        gl.domElement.addEventListener('webglcontextlost', (e) => {
          e.preventDefault();
          console.warn('WebGL context lost. Attempting to restore...');
        });
         gl.domElement.addEventListener('webglcontextrestored', () => {
          console.log('WebGL context restored.');
        });
      }}
      camera={{ position: [0, 0, 1], fov: 75 }}
      gl={{
        alpha: false,
        antialias: true, // Antialiasing can be demanding; set to true but monitor performance
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: true // Prevent running on very low-end devices
      }}
      style={{ background: 'transparent' }}
    >
      <color attach="background" args={['#000000']} />
      <Suspense fallback={null}>
        <Stars />
      </Suspense>
      <Preload all />
    </Canvas>
  </div>
);

export default StarsCanvas;