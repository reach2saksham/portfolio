"use client";

import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

// Error Boundary specifically for the 3D canvas
class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Star background failed to render:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Return null to render nothing, making it gracefully disappear
      return null;
    }
    return this.props.children;
  }
}

const Stars = (props) => {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(1000), { radius: 1.2 }));

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
    <CanvasErrorBoundary>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ powerPreference: 'high-performance', failIfMajorPerformanceCaveat: true }}
      >
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </CanvasErrorBoundary>
  </div>
);

export default StarsCanvas;