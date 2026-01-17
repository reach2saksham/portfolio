// Hero.jsx - Optimized for performance
"use client";

import React, { useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import HeroText from "./HeroText";
import Image from "next/image";
import InfiniteSlider from "./InfiniteSlider";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Lazy load Spline with proper loading state
const SplineScene = dynamic(() => import('./SplineScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-gray-900/20 to-gray-800/20 rounded-xl animate-pulse" />
  ),
});

// Memoized company logos data to prevent recreation on each render
const COMPANY_LOGOS = [
  ["/companies/rmx.svg", "RankMatrix Logo", 20],
  ["/companies/hyundai.svg", "Hyundai Logo", 20],
  ["/companies/sleek.svg", "Sleek Logo", 20],
  ["/companies/uix.svg", "UIX Labs Logo", 20],
  ["/companies/aiims.svg", "AIIMS Rishikesh Logo", 20],
  ["/companies/aicte.svg", "AICTE India Logo", 20],
  ["/companies/img.svg", "IMG Logo", 20],
];

const Hero = ({ isSplineVisible }) => {
  const router = useRouter();

  const handleLatestProject = useCallback(() => {
    router.push("/design/uix-labs");
  }, [router]);

  // Memoize the company logos section to prevent unnecessary re-renders
  const CompanyLogos = useMemo(() => (
    <div className="relative w-full">
      {/* Gradient overlay */}
      <div className="absolute -top-20 left-0 right-0 h-20 bg-gradient-to-b xl:w-[60%] from-transparent via-black/20 to-black/40 pointer-events-none"></div>

      {/* Main companies content - Added group for hover functionality */}
      <div className="relative mr-6 group">
        <div className="flex w-[70%] sm:w-[80%] md:w-[90%] items-center md:flex-row">
          <div className="flex flex-col items-start justify-between text-center border-r-2 text-white/50 border-white/20 min-w-32">
            <p className="text-lg herointro">Previously</p>
            <p className="text-lg herointro">worked with</p>
          </div>

          {/* Slider container - optimized */}
          <div className="relative w-full overflow-hidden">
            <InfiniteSlider
              durationOnHover={40}
              duration={40}
              gap={108}
              className="w-full"
            >
              {COMPANY_LOGOS.map(([src, alt, height], index) => (
                <div key={`${src}-${index}`} className="flex">
                  <Image
                    className="mx-auto w-fit grayscale opacity-50 dark:invert-0 brightness-110 contrast-110 
                      transition-all duration-300 will-change-auto
                      group-hover:opacity-100 group-hover:brightness-100 group-hover:contrast-100 group-hover:grayscale-0
                      hover:scale-110"
                    src={src}
                    alt={alt}
                    height={height}
                    width={100}
                    priority={true}
                    quality={75}
                  />
                </div>
              ))}
            </InfiniteSlider>

            {/* CSS gradient overlays - much more performant than blur components */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
            <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-black via-black/80 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  ), []);

  return (
    <div className="min-h-screen w-full px-6 md:px-8 lg:px-16 xl:px-20 items-center relative overflow-hidden flex justify-center">
      <motion.div 
        className="flex w-full pb-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Left side content */}
        <div
          className="w-full h-full
          xl:mt-[172px]
          sm:mt-[162px]
          min-[390px]:mt-[216px]
          mt-[188px]
          flex flex-col gap-2 justify-start relative z-40"
        >
          {/* Project AlphaQ Button - Simplified hover effect */}
          <div className="backdrop-blur lg:w-[60%]">
            <button
              onClick={handleLatestProject}
              className="relative flex gap-2 p-1 bg-blue-400/10 backdrop-blur-sm items-center border border-blue-400/40 rounded-full w-fit shadow-lg transition-all duration-200 ease-in-out focus:outline-none group hover:scale-105 hover:bg-blue-400/20 hover:border-blue-400/60"
            >
              {/* Simplified hover effect - single radial gradient */}
              <div className="absolute inset-0 bg-gradient-radial from-blue-500/30 via-blue-500/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

              {/* Check Out Badge */}
              <span className="px-3 bg-blue-600 py-1 rounded-full text-[10px] md:text-xs font-medium text-white herointro relative z-10">
                Check Out
              </span>

              {/* Main Text */}
              <p className="text-white/68 text-xs md:text-sm md:pr-2 herointro relative z-10 group-hover:text-white/90 transition-colors">
                My project at UIX Labs!
              </p>

              {/* Arrow Icon */}
              <ChevronRightIcon className="h-4 w-4 text-white/70 mr-1 relative z-10 group-hover:text-white/90 group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>

          {/* Hero title section */}
          <div className="herotext drop-shadow-[0_4px_8px_#4C4C4C] lg:w-[60%] mb-1">
            <h1
              className="text-[28px]
              min-[344px]:text-[25px] 
              min-[346px]:text-[26px] 
              min-[372px]:text-[29px] 
              min-[382px]:text-[30px] 
              min-[404px]:text-[32px] leading-3
              min-[414px]:text-[33px]
              min-[426px]:text-[34px]
              min-[436px]:text-[35px]
              min-[446px]:text-[36px] 
              min-[458px]:text-[37px] 
              min-[470px]:text-[38px] 
              min-[478px]:text-[39px] 
              min-[490px]:text-[40px] 
              min-[500px]:text-[41px] 
              min-[510px]:text-[42px] 
              min-[522px]:text-[43px] 
              min-[532px]:text-[44px]
              md:text-[56px]
              lg:text-[46px] 
              min-[921px]:text-[49px] 
              xl:text-[54px] xl:leading-10
              min-[1385px]:text-6xl 
              font-bold flex items-center flex-wrap
              pt-4 sm:pt-0"
            >
              <span className="text-white drop-shadow-[0_2px_4px_#4C4C4C] md:drop-shadow-[0_4px_8px_#4C4C4C]">
                Not Just Des
              </span>

              <Image
                src="/istyled.svg"
                alt="i"
                width={2}
                height={4}
                className="w-4 h-[52px] sm:w-5 sm:h-[70px] md:w-6 md:h-24 -mx-0.5 pb-[12px] sm:pb-4 md:pb-5 hover:-translate-y-4 transition-transform duration-200 ease-in-out will-change-transform"
                priority={true}
              />

              <span className="text-white drop-shadow-[0_2px_4px_#4C4C4C] md:drop-shadow-[0_4px_8px_#4C4C4C]">
                gned.
              </span>

              <div className="flex items-center flex-wrap -my-[6px] md:-mt-[32px]">
                <span className="bg-gradient-to-b from-[#BA3C97] to-[#E000C2] bg-clip-text text-transparent py-6 sm:py-5 md:py-11 lg:py-7">
                  &lt;
                </span>
                <span className="bg-gradient-to-b from-[#DE5971] to-[#FF00C1] bg-clip-text text-transparent py-6 sm:py-5 md:py-11 lg:py-7">
                  Engineered
                </span>
                <span className="bg-gradient-to-b from-[#BA3C97] to-[#E000C2] bg-clip-text text-transparent py-6 sm:py-5 md:py-11 lg:py-7">
                  /&gt;
                </span>
                <span className="text-white ml-2 drop-shadow-[0_2px_4px_#4C4C4C] md:drop-shadow-[0_4px_8px_#4C4C4C]">
                  to Delight.
                </span>
              </div>
            </h1>
          </div>

          <div className="flex flex-col h-[47vh] sm:h-[40vh] md:h-[28vh] xl:h-[212px] justify-between xl:w-[60%]">
            {/* HeroText component */}
            <div className="relative">
              <HeroText />
            </div>

            {/* Companies section - Memoized */}
            {CompanyLogos}
          </div>
        </div>

        {/* Right side Spline 3D scene - Lazy loaded */}
        {isSplineVisible && (
          <div className="w-[36%] hidden xl:block absolute right-14 z-50">
            <SplineScene />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default React.memo(Hero);