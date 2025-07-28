// portfolio/app/components/SplineScene.js
'use client';

import React, { Suspense } from 'react';
import Spline from '@splinetool/react-spline';

// A simple Error Boundary to catch errors from the Spline component
class SplineErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Spline component failed to load:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div className="w-full h-full bg-black/30 rounded-xl flex items-center justify-center text-white/50"><p>3D model failed to load.</p></div>;
    }

    return this.props.children;
  }
}

// A fallback component to show while Spline is loading
const SplineLoadingFallback = () => {
  return <div className="w-full h-[85vh] bg-black/20 rounded-xl flex items-center justify-center text-white/50 animate-pulse">Loading 3D Scene...</div>;
};

const SplineScene = () => {
  return (
    <div className="absolute w-full h-[85vh] z-30">
        <SplineErrorBoundary>
            <Suspense fallback={<SplineLoadingFallback />}>
                <Spline
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full origin-center"
                />
            </Suspense>
        </SplineErrorBoundary>
    </div>
  );
};

export default SplineScene;