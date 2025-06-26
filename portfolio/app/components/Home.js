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

// Wrapper component for lazy loading
const LazyComponent = ({ children, shouldRender, placeholder = null }) => {
  if (!shouldRender) {
    return placeholder || (
      <div style={{ height: '100vh' }} className="flex items-center justify-center">
        <div className="animate-pulse text-white/50">Loading...</div>
      </div>
    );
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

  const heroRef = useRef(null);
  const maskEffectRef = useRef(null);
  const projectsRef = useRef(null);
  const aboutRef = useRef(null);
  const bentoRef = useRef(null);
  const galleryRef = useRef(null);
  const footerRef = useRef(null);

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
      rootMargin: '1400px',
      threshold: 0.05
    };

    const footerObserverOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

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

    createObserver(heroRef, 'hero');
    createObserver(maskEffectRef, 'maskEffect');
    createObserver(projectsRef, 'projects');
    createObserver(aboutRef, 'about');
    createObserver(bentoRef, 'bento');
    createObserver(galleryRef, 'gallery');
    createObserver(footerRef, 'footer', footerObserverOptions);

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const shouldRenderComponent = (sectionName) => {
    if (isFooterInFocus) {
      return sectionName === 'footer' || sectionName === 'gallery';
    }
    return visibleSections[sectionName];
  };

  const handlePositionToggle = () => {
    setIsDiscClicked(!isDiscClicked);
  };

  const getTranslateValues = () => {
    if (isMobile) {
      return { x: 0, y: 0 };
    }
    return {
      x: isDiscClicked ? -205 : 0,
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
             sm:mt-[48px]
             min-[390px]:mt-[104px]
             mt-[76px]
             xl:px-36 
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

      <div id="projects" ref={projectsRef}>
        <LazyComponent shouldRender={shouldRenderComponent('projects')}>
          <Projects />
        </LazyComponent>
      </div>

      <div id="about" ref={aboutRef}>
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
        <LazyComponent shouldRender={true}>
          <Footer />
        </LazyComponent>
      </div>
    </main>
  );
}
