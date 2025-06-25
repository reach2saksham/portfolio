"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ProgressiveBlur from "./ProgressiveBlur";
import { motion } from "motion/react";

const BlurImage = ({ src, width, height, alt, title, subtitle }) => {
  const [isHover, setIsHover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Close modal on ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Image Container */}
      <div
        className="relative my-2 aspect-square overflow-hidden rounded-[4px] cursor-pointer"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={() => setIsOpen(true)}
      >
        {/* Main Image */}
        <Image
          className="object-cover"
          src={src}
          width={width}
          height={height}
          alt={alt}
          priority
          unoptimized={true}
        />

        {/* Enhanced Progressive Blur Effect with Dark Overlay */}
        <motion.div
          className="pointer-events-none absolute bottom-0 left-0 w-full h-[25%]"
          animate={isHover ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {/* Dark gradient overlay for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Progressive blur effect */}
          <ProgressiveBlur
            className="absolute inset-0"
            blurIntensity={0.1}
          />
        </motion.div>

        {/* Title & Subtitle with Text Shadow */}
        <motion.div
          className="absolute bottom-0 left-0"
          animate={isHover ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div className="flex flex-col items-start gap-0 px-5 py-4">
            <p className="text-base font-medium text-white drop-shadow-lg" 
               style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
              {title}
            </p>
            <span className="text-base text-zinc-200 drop-shadow-md"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
              {subtitle}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Expanded Image Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <Image
              src={src}
              layout="intrinsic"
              width={width}
              height={height}
              alt={alt}
              className="object-contain w-full h-full rounded-lg shadow-lg scale-125"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BlurImage;