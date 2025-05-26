"use client";

import createGlobe from "cobe";
import { useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const MOVEMENT_DAMPING = 1400;

// Updated GLOBE_CONFIG with marker-centered positioning
const GLOBE_CONFIG = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0.6, // Changed from 0 - this rotates the globe horizontally to center on your location
  theta: 0.15, // Changed from 0.3 - this adjusts the vertical tilt to better show your marker
  dark: 1,
  diffuse: 0.4,
  mapSamples: 25000,
  mapBrightness: 1.5,
  baseColor: [0.5, 0.25, 0.8],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [0.25, 0.25, 0.25], // Default glow color
  markers: [
    { location: [29.8650595, 77.8898153], size: 0.05 }, // Your marker (IIT Roorkee area)
  ],
};

export function Globe({ className, config = GLOBE_CONFIG }) {
  let phi = 3.14; // Changed from 0 - starts the globe rotation at your marker location
  let width = 0;
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const globeRef = useRef(null);
  
  // State for hover effect
  const [isHovered, setIsHovered] = useState(false);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current, {
      ...config,
      width: width * 2,
      height: width * 2,
      glowColor: isHovered ? [0.5, 0.5, 0.5] : [0.25, 0.25, 0.25], // Dynamic glow color
      onRender: (state) => {
        if (!pointerInteracting.current) phi += 0;
        state.phi = phi + rs.get();
        state.width = width * 2;
        state.height = width * 2;
        // Update glow color on each render based on hover state
        state.glowColor = isHovered ? [0.5, 0.5, 0.5] : [0.3, 0.3, 0.3];
      },
    });

    globeRef.current = globe;

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    }, 0);

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rs, config, isHovered]); // Added isHovered to dependencies

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px] hover:scale-105 transition-transform",
        className
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => {
          if (e.touches[0]) updateMovement(e.touches[0].clientX);
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </div>
  );
}