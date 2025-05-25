"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function FeatureSteps({
  features,
  className,
  title = "How to get Started",
}) {
  const [currentFeature, setCurrentFeature] = useState(0);
  const componentRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const lastScrollTop = useRef(0);
  const featureRefs = useRef([]);

  // Initialize feature refs
  useEffect(() => {
    featureRefs.current = Array(features.length).fill().map(() => React.createRef());
  }, [features.length]);

  // Check if component is in view and update the active feature based on scroll direction
  useEffect(() => {
    const checkVisibility = () => {
      if (!componentRef.current) return;
      
      const rect = componentRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2;
      
      setIsInView(isVisible);
      
      if (isVisible) {
        // Determine scroll direction
        const st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop.current) {
          // Scrolling DOWN
          if (currentFeature < features.length - 1) {
            setCurrentFeature(prev => Math.min(prev + 1, features.length - 1));
          }
        } else if (st < lastScrollTop.current) {
          // Scrolling UP
          if (currentFeature > 0) {
            setCurrentFeature(prev => Math.max(prev - 1, 0));
          }
        }
        lastScrollTop.current = st <= 0 ? 0 : st;
      }
    };
    
    // Throttle the scroll event
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkVisibility();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    checkVisibility(); // Check on initial load
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentFeature, features.length]);

  // Handle manual navigation
  const handleFeatureChange = (index) => {
    setCurrentFeature(index);
  };

  return (
    <div 
      ref={componentRef}
      className={cn("py-16 relative", className)}
    >
      {title && (
        <h2 className="text-3xl font-bold text-center mb-10">{title}</h2>
      )}
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left side - Feature content */}
          <div className="space-y-8">
            <AnimatePresence mode="wait">
              {features.map((feature, index) => (
                index === currentFeature && (
                  <motion.div
                    key={`content-${index}`}
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-primary-foreground flex-shrink-0 mt-1">
                        <span className="font-semibold">{index + 1}</span>
                      </div>
                      
                      <div>
                        <h3 className="text-2xl font-semibold mb-2">
                          {feature.title || `Step ${index + 1}`}
                        </h3>
                        <p className="text-muted-foreground">
                          {feature.content}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
            
            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-6">
              <button
                onClick={() => handleFeatureChange(Math.max(currentFeature - 1, 0))}
                disabled={currentFeature === 0}
                className={cn(
                  "px-4 py-2 rounded-md border transition-colors",
                  currentFeature === 0 
                    ? "opacity-50 cursor-not-allowed" 
                    : "hover:bg-muted"
                )}
              >
                Previous
              </button>
              
              <div className="flex items-center gap-2">
                {features.map((_, index) => (
                  <button
                    key={`nav-${index}`}
                    onClick={() => handleFeatureChange(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      index === currentFeature ? "w-8 bg-primary" : "bg-muted hover:bg-primary/50"
                    )}
                    aria-label={`Go to feature ${index + 1}`}
                  />
                ))}
              </div>
              
              <button
                onClick={() => handleFeatureChange(Math.min(currentFeature + 1, features.length - 1))}
                disabled={currentFeature === features.length - 1}
                className={cn(
                  "px-4 py-2 rounded-md border transition-colors",
                  currentFeature === features.length - 1 
                    ? "opacity-50 cursor-not-allowed" 
                    : "hover:bg-muted"
                )}
              >
                Next
              </button>
            </div>
          </div>
          
          {/* Right side - Feature image */}
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <AnimatePresence mode="wait">
              {features.map((feature, index) => (
                index === currentFeature && (
                  <motion.div
                    key={`image-${index}`}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src={feature.image}
                      alt={feature.title || `Step ${index + 1}`}
                      className="w-full h-full object-cover"
                      width={800}
                      height={600}
                    />
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}