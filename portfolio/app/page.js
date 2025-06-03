"use client";

import { useState, useEffect, useRef } from 'react';
import Bento from "./components/Bento";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import MaskEffect from "./components/MaskEffect";
import PortfolioGallery from './components/PortfolioGallery';
import About from "./components/About";
import DiscButton from "./components/DiscButton";
import { motion } from 'framer-motion';

// Wrapper component for lazy loading
const LazyComponent = ({ children, shouldRender, placeholder = null }) => {
  if (!shouldRender) {
    return placeholder || <div style={{ height: '100vh' }} />; // Maintain layout
  }
  return children;
};

export default function Home() {
  const [visibleSections, setVisibleSections] = useState({
    hero: true,
    maskEffect: false,
    projects: false,
    about: false,
    bento: false,
    gallery: false,
    footer: false
  });

  const [isFooterInFocus, setIsFooterInFocus] = useState(false);
  const [isDiscClicked, setIsDiscClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Refs for each section
  const heroRef = useRef(null);
  const maskEffectRef = useRef(null);
  const projectsRef = useRef(null);
  const aboutRef = useRef(null);
  const bentoRef = useRef(null);
  const galleryRef = useRef(null);
  const footerRef = useRef(null);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1280); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observers = [];

    // Configuration for intersection observer
    const observerOptions = {
      root: null,
      rootMargin: '400px', // Start loading before element is visible
      threshold: 0.1
    };

    // Special observer for footer with different settings
    const footerObserverOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3 // Footer needs to be more visible to trigger
    };

    // Create observers for each section
    const createObserver = (ref, sectionName, options = observerOptions) => {
      if (ref.current) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (sectionName === 'footer') {
              setIsFooterInFocus(entry.isIntersecting);
            }

            setVisibleSections(prev => ({
              ...prev,
              [sectionName]: entry.isIntersecting
            }));
          });
        }, options);

        observer.observe(ref.current);
        observers.push(observer);
      }
    };

    // Create all observers
    createObserver(heroRef, 'hero');
    createObserver(maskEffectRef, 'maskEffect');
    createObserver(projectsRef, 'projects');
    createObserver(aboutRef, 'about');
    createObserver(bentoRef, 'bento');
    createObserver(galleryRef, 'gallery');
    createObserver(footerRef, 'footer', footerObserverOptions);

    // Cleanup observers
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  // Determine which components should render based on footer focus
  const shouldRenderComponent = (sectionName) => {
    if (isFooterInFocus) {
      // When footer is in focus, only render footer and gallery
      return sectionName === 'footer' || sectionName ==='gallery';
    }
    // Otherwise, render visible sections
    return visibleSections[sectionName];
  };

  // Handle position toggle from DiscButton
  const handlePositionToggle = () => {
    setIsDiscClicked(!isDiscClicked);
  };

  // Get translate values based on screen size and state
  const getTranslateValues = () => {
    if (isMobile) {
      // No translation on mobile
      return { x: 0, y: 0 };
    }
    
    // Desktop translate values only
    return { 
      x: isDiscClicked ? -205 : 0,
      y: 0 
    };
  };

  return (
    <main className="flex min-h-screen flex-col mx-auto max-w-screen-2xl">
      <Navbar />
      <div className="relative z-40">
        {/* DiscButton with dynamic positioning - changes from absolute to fixed when clicked */}
        <motion.div
          className={`w-fit flex bg-red items-center justify-start max-w-full container mx-auto mt-[14vh] sm:mt-[10vh] md:mt-[10vh] lg:mt-[6vh] xl:mt-[10vh] xl:px-36 lg:px-14 sm:px-4 px-4 z-40 ${
            !isMobile && isDiscClicked ? 'fixed' : 'absolute'
          }`}
          style={{
            // Position it to the left but not overlapping the Project AlphaQ button
            left: '0',
            transform: 'translateX(0)'
          }}
          animate={getTranslateValues()}
          transition={{
            duration: isMobile ? 0.2 : 0.3, // Faster animation on mobile
            type: "smooth"
          }}
        >
          <DiscButton 
            onPositionToggle={handlePositionToggle}
            isPositionFixed={isDiscClicked}
          />
        </motion.div>

        <div ref={heroRef}>
          <LazyComponent shouldRender={shouldRenderComponent('hero')}>
            <Hero />
          </LazyComponent>
        </div>
      </div>

      <div ref={maskEffectRef}>
        <LazyComponent shouldRender={shouldRenderComponent('maskEffect')}>
          <MaskEffect />
        </LazyComponent>
      </div>

      <div
        id="projects"
        ref={projectsRef}>
        <LazyComponent shouldRender={shouldRenderComponent('projects')}>
          <Projects />
        </LazyComponent>
      </div>

      <div
        id="about"
        ref={aboutRef}>
        <LazyComponent shouldRender={shouldRenderComponent('about')}>
          <About />
        </LazyComponent>
      </div>

      <div ref={bentoRef}>
        <LazyComponent shouldRender={shouldRenderComponent('bento')}>
          <Bento />
        </LazyComponent>
      </div>

      <div ref={galleryRef}>
        <LazyComponent shouldRender={true}>
          <PortfolioGallery />
        </LazyComponent>
      </div>

      <div ref={footerRef}>
        <LazyComponent shouldRender={true}> {/* Footer always renders */}
          <Footer />
        </LazyComponent>
      </div>
    </main>
  );
}