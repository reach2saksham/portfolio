"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import Image from 'next/image';

// Memoized Gallery component to prevent unnecessary re-renders
const Gallery = React.memo(({ mousePosition, handle }) => {
  const { x, y } = mousePosition;
  
  return (
    <div 
      className="h-[50vh] xl:h-[90vh]" 
      style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%, 100% 0)' }}
    >
      <div className="w-full h-[50vh] xl:h-full relative">
        <Image 
          src={`/images/${handle}/background.avif`}
          alt="background image"
          fill
          sizes="100vw"
          quality={90}
          className="w-full object-cover"
          priority={handle === "1" || handle === "2"} // Prioritize first two images
        />
      </div>
      <motion.div
        className="h-[30vh] md:h-[40vh] w-[35vw] md:w-[26vh] fixed top-0 rounded-[5vw] md:rounded-[1.5vw] overflow-hidden pointer-events-none "
        style={{ x, y }}
      >
        <Image 
          src={`/images/${handle}/1.avif`}
          alt="vignette image"
          fill
          sizes="(max-width: 768px) 35vw, 26vh"
          quality={90}
          priority={handle === "1" || handle === "2"} // Prioritize first two images
          className="w-full object-cover"
        />
      </motion.div>
    </div>
  );
});
Gallery.displayName = 'Gallery';

// Memoized ProjectItem component for Description section
const ProjectItem = React.memo(({ name, handle, setIndex, index }) => (
  <div 
    onMouseOver={() => setIndex(index)}
    className="cursor-default hover:opacity-80 transition-opacity"
  >
    <div className="text-[6vw] md:text-[2.5vw] font-bold text-[#c1b3a5] py-1 md:pt-4 md:pb-20 select-none">
      {name}
    </div>
  </div>
));
ProjectItem.displayName = 'ProjectItem';

// Optimized Description component
const Description = React.memo(({ mousePosition, projects }) => {
  const [index, setIndex] = useState(0);
  const { x, y } = mousePosition;
  
  return (
    <div 
      className="h-[100vh] relative overflow-hidden"
      style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%, 100% 0)' }}
    >
      <div className="absolute w-full h-full flex items-center justify-center z-10 p-4 md:p-8">
        <div className="w-full max-w-6xl">
          <div className="flex flex-col md:flex-row gap-24 md:gap-32 h-full justify-center">
            {[0, 1, 2].map((colIndex) => (
              <div key={colIndex} className="flex flex-col gap-24 md:gap-28 lg:gap-32 flex-1 justify-center">
                {projects.slice(colIndex * 2, colIndex * 2 + 2).map((project, i) => (
                  <ProjectItem
                    key={project.handle}
                    name={project.name}
                    handle={project.handle}
                    setIndex={setIndex}
                    index={colIndex * 2 + i}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <motion.div
        className="h-[30vh] md:h-[40vh] w-[35vw] md:w-[26vh] fixed top-0 rounded-[5vw] md:rounded-[1.5vw] overflow-hidden pointer-events-none z-10"
        style={{ x, y }}
      >
        <Image 
          src={`/images/${projects[index].handle}/about.avif`}
          alt="about image"
          fill
          sizes="(max-width: 768px) 35vw, 26vh"
          quality={90}
          priority={index < 2} // Prioritize first two 'about' images
          className="w-full object-cover"
        />
      </motion.div>
    </div>
  );
});
Description.displayName = 'Description';

// Main Portfolio Gallery Component
const PortfolioGallery = () => {
  // Moved static data outside component to prevent recreation on every render
  const mainProjects = [
    { name: "IIT ROORKEE", handle: "1" },
    { name: "RAVINDRA BHAWAN", handle: "2" },
    { name: "DAP", handle: "3" },
    { name: "RKB TAPRI", handle: "4" }
  ];

  const aboutProjects = [
    { name: "@cooking", handle: "1" },
    { name: "@अवतरण", handle: "2" },
    { name: "@Respect+", handle: "3" },
    { name: "@gaming", handle: "4" },
    { name: "@cosplay", handle: "5" },
    { name: "@anime", handle: "6" }
  ];

  const spring = {
    stiffness: 150,
    damping: 15,
    mass: 0.1
  };

  const mousePosition = {
    x: useSpring(0, spring),
    y: useSpring(0, spring)
  };

  // Memoized mouse move handler
  const mouseMove = useCallback((e) => {
    const { clientX, clientY } = e;
    const targetX = clientX - (window.innerWidth / 2 * 0.25);
    const targetY = clientY - (window.innerWidth / 2 * 0.30);
    mousePosition.x.set(targetX);
    mousePosition.y.set(targetY);
  }, [mousePosition.x, mousePosition.y]);

  // Touch event handlers for mobile
  const handleTouchMove = useCallback((e) => {
    const touch = e.touches[0];
    if (touch) {
      const { clientX, clientY } = touch;
      const targetX = clientX - (window.innerWidth / 2 * 0.25);
      const targetY = clientY - (window.innerWidth / 2 * 0.30);
      mousePosition.x.set(targetX);
      mousePosition.y.set(targetY);
    }
  }, [mousePosition.x, mousePosition.y]);

  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    if (touch) {
      const { clientX, clientY } = touch;
      const targetX = clientX - (window.innerWidth / 2 * 0.25);
      const targetY = clientY - (window.innerWidth / 2 * 0.30);
      mousePosition.x.set(targetX);
      mousePosition.y.set(targetY);
    }
  }, [mousePosition.x, mousePosition.y]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

   return (
    <main 
      onMouseMove={mouseMove}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      className="text-white overflow-x-hidden relative container max-w-full mx-auto xl:px-24 lg:px-14 sm:px-4 px-4 z-10 tags"
      style={{ 
        backgroundColor: 'transparent'
      }}
    >
      <div className='bg-transparent rounded-3xl overflow-visible z-11'>
        {mainProjects.map(({ handle }) => (
          <Gallery 
            mousePosition={mousePosition} 
            handle={handle} 
            key={handle}
          />
        ))}
      </div>
      <Description 
        mousePosition={mousePosition} 
        projects={aboutProjects}
      />
    </main>
  );
};

export default React.memo(PortfolioGallery);