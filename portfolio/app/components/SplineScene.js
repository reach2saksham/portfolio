'use client';
import Spline from '@splinetool/react-spline';

const SplineScene = () => {
  return (
    <div className="absolute w-full h-[85vh] z-30">
      <Spline
        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
        className="w-full h-full origin-center"
      />
    </div>
  );
};

export default SplineScene;
