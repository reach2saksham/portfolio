"use client";

import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const DiscButton = ({ onPositionToggle, isPositionFixed = false }) => {
  const router = useRouter();
  const [isDiscClicked, setIsDiscClicked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isAtHeroSection, setIsAtHeroSection] = useState(true);
  const audioRef = useRef(null);
  const clickTimeoutRef = useRef(null);

  // Memoize music tracks to prevent recreation on every render
  const musicTracks = useMemo(() => [
    '/music/kidstheme.mp3',
    '/music/yourname.mp3',
    '/music/interstellar.mp3',
    '/music/rude.mp3',
    '/music/kira.mp3',
    '/music/forest.mp3'
  ], []);

  // Memoized random track function
  const getRandomTrack = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * musicTracks.length);
    return musicTracks[randomIndex];
  }, [musicTracks]);

  // Enhanced disc click handler with single-click logic
  const handleDiscClick = useCallback((e) => {
    e.stopPropagation(); // Prevent event bubbling
    
    // Debounce rapid clicks
    if (clickTimeoutRef.current) return;
    
    clickTimeoutRef.current = setTimeout(() => {
      clickTimeoutRef.current = null;
    }, 200);

    // Add scaling animation
    setIsDiscClicked(true);
    setTimeout(() => setIsDiscClicked(false), 200);

    // If disc is in fixed position, only handle music
    if (isPositionFixed) {
      // Music logic only when in fixed position
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
        // Only return to original position if we're at hero section
        if (isAtHeroSection && onPositionToggle) {
          onPositionToggle();
        }
      } else {
        const randomTrack = getRandomTrack();
        setCurrentTrack(randomTrack);

        if (audioRef.current) {
          audioRef.current.src = randomTrack;
          audioRef.current.play().catch(error => {
            console.error('Error playing audio:', error);
            setIsPlaying(false);
          });
        }
        setIsPlaying(true);
      }
    } else {
      // If not in fixed position, toggle position and play music
      if (onPositionToggle) {
        onPositionToggle();
      }

      // Also start music when moving to fixed position
      if (!isPlaying) {
        const randomTrack = getRandomTrack();
        setCurrentTrack(randomTrack);

        if (audioRef.current) {
          audioRef.current.src = randomTrack;
          audioRef.current.play().catch(error => {
            console.error('Error playing audio:', error);
            setIsPlaying(false);
          });
        }
        setIsPlaying(true);
      }
    }
  }, [isPlaying, getRandomTrack, onPositionToggle, isPositionFixed, isAtHeroSection]);

  // Optimized audio event handlers
  const handleAudioEnd = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleAudioError = useCallback((error) => {
    console.error('Audio playback error:', error);
    setIsPlaying(false);
  }, []);

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const isAtHero = scrollY < window.innerHeight;
    setIsAtHeroSection(isAtHero);
  }, []);

  // Initialize audio with cleanup
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    
    audio.addEventListener('ended', handleAudioEnd);
    audio.addEventListener('error', handleAudioError);

    // Throttled scroll listener
    let ticking = false;
    const throttledScrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    
    // Initial check
    handleScroll();

    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
      audio.removeEventListener('ended', handleAudioEnd);
      audio.removeEventListener('error', handleAudioError);
      window.removeEventListener('scroll', throttledScrollHandler);
      audio.pause();
      audio.src = '';
    };
  }, [handleAudioEnd, handleAudioError, handleScroll]);

  // Memoized circular text content
  const circularText = useMemo(() => {
    const baseText = isPlaying
      ? "♪ NOW PLAYING • CLICK TO PAUSE • II & PLAY TO CHANGE • "
      : isPositionFixed 
        ? "CLICK THE DISC • CLICK THE DISC • CLICK THE DISC • CLICK •" 
        : "CLICK TO PLAY MUSIC • CLICK THE DISC • CLICK THE DISC •";
    return baseText.repeat(2); // duplicate to ensure full loop
  }, [isPlaying, isPositionFixed]);

  // Memoized animation duration
  const animationDuration = useMemo(() => {
    return isPlaying ? '7s' : '20s';
  }, [isPlaying]);

  return (
    <div className="relative z-40 group">
      <div className="z-40 group-hover:scale-105 transition-transform duration-200 ease-in-out">
        <button
          onClick={handleDiscClick}
          className={`flex relative w-32 h-32 cursor-pointer transition-transform duration-200 rounded-full z-40 ${
            isDiscClicked ? 'scale-110' : 'scale-100'
          } ${isPlaying ? 'animate-pulse' : ''}`}
          aria-label={isPlaying ? "Pause music" : "Play random music"}
        >
          {/* Optimized image with priority and sizes */}
          <Image
            src={isPlaying ? "/discplaying.svg" : "/disc.svg"}
            alt="Music Disc"
            width={160}
            height={160}
            className="w-30 h-30 z-40"
            priority
            draggable="false"
            sizes="(max-width: 768px) 120px, 144px"
          />

          {/* Optimized circular text overlay with CSS animation */}
          <svg
            className="absolute inset-0 w-30 h-30 pointer-events-none z-40"
            viewBox="0 0 160 160"
            style={{
              animation: `spin ${animationDuration} linear infinite`
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
              fontSize="10"
              fontFamily="Arial, sans-serif"
              letterSpacing="2"
            >
              <textPath href="#circle" startOffset="50%" textAnchor="middle">
                {circularText}
              </textPath>
            </text>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default React.memo(DiscButton);