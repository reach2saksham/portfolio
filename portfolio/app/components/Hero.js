"use client";

import React, { useEffect, useState, useRef } from 'react'
import { motion } from "framer-motion";
import { slideInFromLeft } from '@/utils/motion';
import { SparkleIcon } from 'lucide-react';
import HeroText from './HeroText';
import Image from 'next/image';
import InfiniteSlider from './InfiniteSlider';
import ProgressiveBlur from './ProgressiveBlur';
import Spline from '@splinetool/react-spline';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const router = useRouter();
  const [isDiscClicked, setIsDiscClicked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const audioRef = useRef(null);

  

  // Array of your music files - Update these paths based on your choice
  const musicTracks = [
    // Option 1: Public folder approach
    '/music/kids.mp3',
    '/music/interstellar.mp3',
    '/music/rude.mp3',
    '/music/kira.mp3',
    '/music/forest.mp3'


    // Option 2: Online URLs (example with Cloudinary)
    // 'https://res.cloudinary.com/your-cloud/video/upload/v1234567890/track1.mp3',
    // 'https://res.cloudinary.com/your-cloud/video/upload/v1234567890/track2.mp3',

    // Option 3: Direct URLs
    // 'https://example.com/path/to/music1.mp3',
    // 'https://example.com/path/to/music2.mp3',
  ];

  // Function to get random track
  const getRandomTrack = () => {
    const randomIndex = Math.floor(Math.random() * musicTracks.length);
    return musicTracks[randomIndex];
  };

  // Handle disc click with music
  const handleDiscClick = () => {
    // Add scaling animation
    setIsDiscClicked(true);

    // Reset animation after delay
    setTimeout(() => {
      setIsDiscClicked(false);
    }, 200);

    // Music logic
    if (isPlaying) {
      // If music is playing, pause it
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      // If no music or music is paused, play random track
      const randomTrack = getRandomTrack();
      setCurrentTrack(randomTrack);

      // Create new audio or update source
      if (audioRef.current) {
        audioRef.current.src = randomTrack;
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
        });
      }
      setIsPlaying(true);
    }

    console.log('Disc clicked! Playing:', currentTrack);
  };

  // Handle audio events
  const handleAudioEnd = () => {
    setIsPlaying(false);
    // Optionally play another random track
    // handleDiscClick();
  };

  const handleAudioError = (error) => {
    console.error('Audio playback error:', error);
    setIsPlaying(false);
  };

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.addEventListener('ended', handleAudioEnd);
    audioRef.current.addEventListener('error', handleAudioError);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleAudioEnd);
        audioRef.current.removeEventListener('error', handleAudioError);
        audioRef.current.pause();
      }
    };
  }, []);

  // Handle AlphaQ project button click
  const handlelatestproject = () => {
    router.push('/design/case1/');
  };

  return (
    // Fixed: Properly structured container with consistent spacing
    <div className="w-full px-6 md:px-8 lg:px-16 xl:px-[150px]">
      <motion.div
        className="relative flex max-w-full mx-auto md:pb-16 md:pt-6 pt-4 z-40"
      >
        {/* Left side content - 60% width */}
        <div className="pt-4 w-full lg:w-[60%] h-full flex flex-col relative z-20">

          {/* Disc section - positioned relatively */}
          <motion.div
            className="relative pt-16 md:p-0 mb-10 md:mb-6">
            <motion.div
              // initial="visible"
              // animate={{
              //   x: -210
              // }}
              // transition={{
              //   delay: 2
              // }}
            >

              <button
                onClick={handleDiscClick}
                className={`flex relative w-32 md:w-40 h-32 md:h-40 cursor-pointer transition-all duration-200 rounded-full ${isDiscClicked ? 'scale-110' : 'scale-100'
                  } ${isPlaying ? 'animate-pulse' : ''
                  }`}
                aria-label={isPlaying ? "Pause music" : "Play random music"}
              >
                {/* Your disc SVG - switches based on playing state */}
                <Image
                  src={isPlaying ? "/discplaying.svg" : "/disc.svg"}
                  alt="Disc"
                  width={160}
                  height={160}
                  className="w-30 md:w-36 h-30 md:h-36"
                />

                {/* Circular text overlay - modified for music state */}
                <svg
                  className={`absolute inset-0 w-30 md:w-36 h-30 md:h-36 pointer-events-none ${isPlaying ? 'animate-spin' : 'animate-spin'
                    }`}
                  viewBox="0 0 160 160"
                  style={{
                    animationDuration: isPlaying ? '7s' : '20s',
                    animationPlayState: isPlaying ? 'running' : 'running'
                  }}
                >
                  <defs>
                    <path
                      id="circle"
                      d="M 80, 80 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
                    />
                  </defs>
                  <text
                    fill="#FFFFFF"
                    fillOpacity="0.55"
                    fontSize="13"
                    fontFamily="Arial, sans-serif"
                    letterSpacing="2"
                  >
                    <textPath
                      href="#circle"
                      startOffset="0%"
                    >
                      {isPlaying
                        ? "♪ NOW PLAYING • CLICK TO PAUSE • ♪ NOW PLAYING • CLICK TO PAUSE • "
                        : "CLICK THE DISC • CLICK THE DISC • CLICK THE DISC •"
                      }
                    </textPath>
                  </text>
                </svg>


              </button>
            </motion.div>

            {/* New project badge - overlapping the disc */}
            <div className="absolute -bottom-1 md:-bottom-0">
              <button
                onClick={handlelatestproject}
                className="flex gap-2 p-1 bg-white/10 backdrop-blur-sm items-center border border-white/30 rounded-full w-fit shadow-lg cursor-pointer transition-all hover:bg-white/20 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <span className="bg-blue-600 px-3 py-1 rounded-full text-[10px] md:text-xs font-medium text-white">New</span>
                <p className="text-white/60 text-xs md:text-sm md:pr-2">Project AlphaQ is completed recently!</p>
                <ChevronRightIcon className="h-4 w-4 text-white/70 mr-1" />
              </button>
            </div>
          </motion.div>

          {/* Hero text section with optimized Tailwind classes */}
          <div className="md:mb-6 herotext drop-shadow-[0_4px_8px_#4C4C4C]">
            <h1 className="text-[26px] 
            min-[368px]:text-[29px] 
            min-[410px]:text-[32px] leading-3
            min-[454px]:text-[40px] 
            min-[474px]:text-[42px] 
            min-[518px]:text-[46px] 
            min-[538px]:text-[44px]
            md:text-[56px]
            lg:text-[46px]
            xl:text-6xl 
            font-bold flex items-center flex-wrap">
              <span className="text-white drop-shadow-[0_2px_4px_#4C4C4C] md:drop-shadow-[0_4px_8px_#4C4C4C]">
                Not Just Des
              </span>

              <Image
                src="/istyled.svg"
                alt="i"
                width={2}
                height={4}
                className="w-4 h-[52px] min-[454px]:w-6 min-[454px]:h-24 -mx-0.5 pb-[12px] sm:pb-6 md:pb-5"
              />

              <span className="text-white drop-shadow-[0_2px_4px_#4C4C4C] md:drop-shadow-[0_4px_8px_#4C4C4C]">gned.</span>
              <div className="flex items-center flex-wrap -my-[6px] md:-mt-[32px]">
                <span className="bg-gradient-to-b from-[#BA3C97] to-[#E000C2] bg-clip-text text-transparent py-4 md:py-7 lg:py-7">
                  &lt;
                </span>
                <span className="bg-gradient-to-b from-[#DE5971] to-[#FF00C1] bg-clip-text text-transparent py-4 md:py-7 lg:py-7">
                  Engineered
                </span>
                <span className="bg-gradient-to-b from-[#BA3C97] to-[#E000C2] bg-clip-text text-transparent py-4 md:py-7 lg:py-7">
                  /&gt;
                </span>
                <span className="text-white ml-2 drop-shadow-[0_2px_4px_#4C4C4C] md:drop-shadow-[0_4px_8px_#4C4C4C]">
                  to Delight.
                </span>
              </div>
            </h1>
          </div>

          <HeroText />

          {/* Companies section - moved further down with gradient overlay */}
          <div className="relative w-full mt-auto">
            {/* Gradient overlay positioned above companies section */}
            <div className="absolute -top-20 left-0 right-0 h-20 bg-gradient-to-b from-transparent via-black/20 to-black/40 pointer-events-none z-10"></div>

            <div className="group relative mr-6 pt-[86px]">
              <div className="flex w-[70%] sm:w-[80%] md:w-[90%] items-center md:flex-row">
                <div className="flex flex-col items-start justify-center text-center border-r-2 text-white/50 border-white/20 min-w-32">
                  <p>Previously</p>
                  <p>worked with</p>
                </div>
                <div className="relative py-6 w-full">
                  <InfiniteSlider
                    durationOnHover={40}
                    duration={40}
                    gap={112}
                    className="w-full group"
                  >
                    {[
                      ['https://html.tailus.io/blocks/customers/nvidia.svg', 'Nvidia Logo', 20],
                      ['https://html.tailus.io/blocks/customers/column.svg', 'Column Logo', 16],
                      ['https://html.tailus.io/blocks/customers/github.svg', 'GitHub Logo', 16],
                      ['https://html.tailus.io/blocks/customers/nike.svg', 'Nike Logo', 20],
                      ['https://html.tailus.io/blocks/customers/lemonsqueezy.svg', 'Lemon Squeezy Logo', 20],
                      ['https://html.tailus.io/blocks/customers/laravel.svg', 'Laravel Logo', 16],
                      ['https://html.tailus.io/blocks/customers/lilly.svg', 'Lilly Logo', 28],
                      ['https://html.tailus.io/blocks/customers/openai.svg', 'OpenAI Logo', 24],
                    ].map(([src, alt, height], index) => (
                      <div key={index} className="flex">
                        <Image
                          className="mx-auto w-fit dark:invert-0 opacity-100 brightness-110 contrast-110 group-hover:opacity-100 group-hover:brightness-100 group-hover:contrast-100 group-hover:dark:invert transition-all duration-300"
                          src={src}
                          alt={alt}
                          height={height}
                          width={100}
                        />
                      </div>
                    ))}
                  </InfiniteSlider>

                  <ProgressiveBlur
                    className="pointer-events-none absolute left-0 top-0 h-full w-20"
                    direction="left"
                    blurIntensity={1}
                  />
                  <ProgressiveBlur
                    className="pointer-events-none absolute right-0 top-0 h-full w-20"
                    direction="right"
                    blurIntensity={1}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side Spline 3D scene - Fixed positioning */}
        <div className="w-[40%] hidden lg:block relative">
          <div className="absolute inset-0 pointer-events-auto">
            <Spline
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>

      </motion.div>
    </div>
  )
}

export default Hero