// Hero.jsx - Fixed hover effects for Previously worked with section and HeroText
"use client";

import React, { useCallback } from 'react'
import { motion } from "framer-motion";
import HeroText from './HeroText';
import Image from 'next/image';
import InfiniteSlider from './InfiniteSlider';
import ProgressiveBlur from './ProgressiveBlur';
import Spline from '@splinetool/react-spline';
import { ChevronRightIcon} from "@heroicons/react/24/solid";
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';


const SplineScene = dynamic(() => import('./SplineScene'), {
  ssr: false,
  loading: () => <div className="w-full bg-black/20 rounded-xl" />,
});

const Hero = ({ isSplineVisible }) => {
  const router = useRouter();

  const handleLatestProject = useCallback(() => {
    router.push('/design/uix-labs');
  }, [router]);

  return (
    <div className="min-h-scren sm:h-[720px] w-full px-6 md:px-8 lg:px-16 xl:px-[150px] items-center relative overflow-hidden">
      <motion.div
        className="flex max-w-full w-full md:h-[420px] "
        
      >
        {/* Left side content - Remove pointer-events-none from parent */}
        <div className="w-full h-full
        xl:mt-[172px]
        sm:mt-[162px]
        min-[390px]:mt-[216px]
        mt-[188px]
        
        flex flex-col gap-2 justify-start relative z-40">

          {/* Project AlphaQ Button - Moved above title */}
          <div className="backdrop-blur lg:w-[60%]">
            <button
              onClick={handleLatestProject}
              className="flex gap-2 p-1 bg-white/10 backdrop-blur-sm items-center border border-white/30 rounded-full w-fit shadow-lg cursor-pointer transition-transform duration-200 ease-in-out hover:bg-white/20 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <span className=" px-3 bg-blue-600 py-1 rounded-full text-[10px] md:text-xs font-medium text-white herointro">
                Check Out
              </span>
              <p className="text-white/60 text-xs md:text-sm md:pr-2 herointro">
                My project at UIX Labs!
              </p>
              <ChevronRightIcon className="h-4 w-4 text-white/70 mr-1" />
            </button>
          </div>

          {/* Hero title section - fully interactive */}
          <div className="herotext drop-shadow-[0_4px_8px_#4C4C4C] lg:w-[60%]  mb-1">
            <h1 className="text-[26px] 
            min-[368px]:text-[29px] 
            min-[410px]:text-[32px] leading-3
            min-[454px]:text-[36px] 
            min-[474px]:text-[38px] 
            min-[518px]:text-[42px] 
            min-[538px]:text-[44px]
            md:text-[56px]
            lg:text-[46px] 
            xl:text-[54px] xl:leading-10
            min-[1385px]:text-6xl 
            font-bold flex items-center flex-wrap
            pt-2 sm:pt-0">
              <span className="text-white drop-shadow-[0_2px_4px_#4C4C4C] md:drop-shadow-[0_4px_8px_#4C4C4C]">
                Not Just Des
              </span>

              <Image
                src="/istyled.svg"
                alt="i"
                width={2}
                height={4}
                className="w-4 h-[52px] sm:w-5 sm:h-[70px]  md:w-6 md:h-24 -mx-0.5 pb-[12px] sm:pb-4 md:pb-5 hover:-translate-y-4 transition-transform duration-200 ease-in-out"
              />

              <span className="text-white drop-shadow-[0_2px_4px_#4C4C4C] md:drop-shadow-[0_4px_8px_#4C4C4C]">gned.</span>
              
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
          <div className='flex flex-col h-[47vh] sm:h-[40vh] md:h-[28vh] justify-between xl:w-[60%]'>
          {/* HeroText component - fully interactive */}
          <div className="relative z-30">
            <HeroText />
          </div>

          {/* Companies section - Fixed hover effects */}
          <div className="relative w-full z-30">
            {/* Gradient overlay - pointer-events-none to not block interactions */}
            <div className="absolute -top-20 left-0 right-0 h-20 bg-gradient-to-b xl:w-[60%]from-transparent via-black/20 to-black/40 pointer-events-none z-10"></div>

            {/* Main companies content */}
            <div className="group relative mr-6">
              <div className="flex w-[70%] sm:w-[80%] md:w-[90%] items-center md:flex-row">
                <div className="flex flex-col items-start justify-between text-center border-r-2 text-white/50 border-white/20 min-w-32">
                  <p className='text-lg herointro'>Previously</p>
                  <p className='text-lg herointro'>worked with</p>
                </div>
                
                {/* Slider container with proper z-index */}
                <div className="relative w-full z-30">
                  <InfiniteSlider
                    durationOnHover={40}
                    duration={40}
                    gap={112}
                    className="w-full group"
                  >
                    {[
                      ['/companies/hyundai.svg', 'Hyundai Logo', 20],
                      ['/companies/uix.svg', 'UIX Labs Logo', 20],
                      ['/companies/rmx.svg', 'RankMatrix Logo', 20],
                      ['/companies/tedx.svg', 'TEDx Logo', 20],
                      ['/companies/ecell.svg', 'E-Cell Logo', 20],
                      ['/companies/img.svg', 'IMG Logo', 20],
                      
                    ].map(([src, alt, height], index) => (
                      <div key={index} className="flex">
                        <Image
                          className="mx-auto w-fit grayscale opacity-40 dark:invert-0 brightness-110 contrast-110 
                          group-hover:opacity-100 group-hover:brightness-100 group-hover:contrast-100 group-hover:grayscale-0
                          transition-all duration-300 hover:scale-[120%] hover:opacity-90"
                          src={src}
                          alt={alt}
                          height={height}
                          width={100}
                        />
                      </div>
                    ))}
                  </InfiniteSlider>

                  {/* Blur overlays - positioned behind slider content */}
                  <ProgressiveBlur
                    className="pointer-events-none absolute left-0 top-0 h-full w-20 z-0"
                    direction="left"
                    blurIntensity={1}
                  />
                  <ProgressiveBlur
                    className="pointer-events-none absolute right-0 top-0 h-full w-20 z-0"
                    direction="right"
                    blurIntensity={1}
                  />
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>

        {/* Right side Spline 3D scene - Maintain high z-index for robot interactions */}
        {isSplineVisible && <div className="w-[40%] hidden xl:block absolute right-14 z-50">
          <SplineScene />
        </div>}

      </motion.div>
    </div>
  )
}

export default Hero