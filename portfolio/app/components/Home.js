"use client";

import { useState, useEffect, useRef } from 'react';
import Bento from "./Bento";
import Navbar from "./Navbar";
import Projects from "./Projects";
import Footer from "./Footer";
import Hero from "./Hero";
import MaskEffect from "./MaskEffect";
import PortfolioGallery from './PortfolioGallery';
import About from "./About";
import DiscButton from "./DiscButton";
import { motion } from 'framer-motion';

const LazyComponent = ({ children, shouldRender, placeholder = null, minHeight = '100vh' }) => {
  if (!shouldRender) {
    return placeholder || (
      <div style={{ minHeight: minHeight }} className="flex items-center justify-center">
        <div className="animate-pulse text-white/50">Loading...</div>
      </div>
    );
  }
  return children;
};

export default function Home() {
  const [loadedSections, setLoadedSections] = useState({
    hero: true,
    maskEffect: false,
    projects: false,
    about: false,
    bento: false,
    gallery: false,
    // Footer is no longer lazy-loaded, so it doesn't need to be in this state.
  });

  const [visibleSections, setVisibleSections] = useState({
    hero: true,
    maskEffect: false,
    projects: false,
    about: false,
    bento: false,
    gallery: false,
    footer: false
  });

  const [isDiscClicked, setIsDiscClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const heroRef = useRef(null);
  const maskEffectRef = useRef(null);
  const projectsRef = useRef(null);
  const aboutRef = useRef(null);
  const bentoRef = useRef(null);
  const galleryRef = useRef(null);
  const footerRef = useRef(null); // The ref is still useful for visibility checks

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1280);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observers = [];
    const observerOptions = {
      root: null,
      rootMargin: '200px',
      threshold: 0.01
    };

    const createObserver = (ref, sectionName) => {
      if (ref.current) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            setVisibleSections(prev => ({
              ...prev,
              [sectionName]: entry.isIntersecting
            }));
            if (entry.isIntersecting) {
              setLoadedSections(prev => ({
                ...prev,
                [sectionName]: true
              }));
            }
          });
        }, observerOptions);

        observer.observe(ref.current);
        observers.push(observer);
      }
    };

    createObserver(heroRef, 'hero');
    createObserver(maskEffectRef, 'maskEffect');
    createObserver(projectsRef, 'projects');
    createObserver(aboutRef, 'about');
    createObserver(bentoRef, 'bento');
    createObserver(galleryRef, 'gallery');
    createObserver(footerRef, 'footer'); // Observer for the footer remains

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const handlePositionToggle = () => {
    setIsDiscClicked(!isDiscClicked);
  };

  const getTranslateValues = () => {
    if (isMobile) {
      return { x: 0, y: 0 };
    }
    return {
      x: isDiscClicked ? -180 : 0,
      y: 0
    };
  };

  return (
    <main className="flex min-h-screen flex-col mx-auto max-w-screen-2xl">
      <Navbar />
      <div className="relative z-40">
        <motion.div
          className={`w-fit flex bg-red items-center justify-start max-w-full container
             mx-auto 
             sm:mt-[8vh]
             lg:mt-[10vh]
             xl:mt-[8vh]
             min-[390px]:mt-[104px]
             mt-[76px]
             xl:px-28 
             lg:px-14 
             sm:px-4 
             px-4 z-40 ${!isMobile && isDiscClicked ? 'fixed' : 'absolute'}`}
          style={{
            left: '0',
            transform: 'translateX(0)'
          }}
          animate={getTranslateValues()}
          transition={{
            duration: isMobile ? 0.2 : 0.25,
            type: "smooth"
          }}
        >
          <DiscButton
            onPositionToggle={handlePositionToggle}
            isPositionFixed={isDiscClicked}
          />
        </motion.div>

        <div ref={heroRef}>
          <LazyComponent shouldRender={loadedSections.hero}>
            <Hero isSplineVisible={visibleSections.hero} />
          </LazyComponent>
        </div>
      </div>

      <div ref={maskEffectRef}>
        <LazyComponent shouldRender={loadedSections.maskEffect}>
          <MaskEffect />
        </LazyComponent>
      </div>

      <div id="projects" ref={projectsRef}>
        <LazyComponent shouldRender={loadedSections.projects}>
          <Projects />
        </LazyComponent>
      </div>

      <div id="about" ref={aboutRef}>
        <LazyComponent shouldRender={loadedSections.about} minHeight="700px">
          <About />
        </LazyComponent>
      </div>

      <div ref={bentoRef}>
        <LazyComponent shouldRender={loadedSections.bento} minHeight="600px">
          <Bento isGlobeVisible={visibleSections.bento} />
        </LazyComponent>
      </div>

      <div ref={galleryRef}>
        <LazyComponent shouldRender={loadedSections.gallery}>
          <PortfolioGallery isInView={visibleSections.gallery} />
        </LazyComponent>
      </div>

      {/* MODIFICATION: Removed LazyComponent wrapper from Footer */}
      <div ref={footerRef}>
        <Footer isInView={visibleSections.footer} />
      </div>
    </main>
  );
}