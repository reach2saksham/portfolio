"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import emailjs from '@emailjs/browser';
import { motion } from "framer-motion";

const social = [
  { icon: "1.svg", link: "https://www.linkedin.com/in/sakshamjainiitr/" },
  { icon: "2.svg", link: "https://www.instagram.com/saksham.tombraider/" },
  { icon: "3.svg", link: "https://medium.com/@reach2saksham" },
  { icon: "4.svg", link: "https://dribbble.com/reach2saksham" },
  { icon: "5.svg", link: "https://www.behance.net/sakshamjainiitr" },
  { icon: "6.svg", link: "https://github.com/reach2saksham" },
  { icon: "7.svg", link: "https://www.facebook.com/SamTR4x4/" },
  { icon: "8.svg", link: "https://x.com/sakshamjainiitr" },
  { icon: "9.svg", link: "https://www.youtube.com/@sakshamjainiitr" },
  { icon: "10.svg", link: "saksham_j@ar.iitr.ac.in" },
  { icon: "11.svg", link: "+91 7067195363" },
];

// Game configuration
const GRID_SIZE = 32; // Grid size for movement
const PACMAN_SPEED = 2; // Pixels per frame
const MAX_DOTS = 8; // Max number of dots
const DOT_SIZE = 8; // Dot size
const DOT_SPAWN_INTERVAL = 1000; // Fixed interval in ms
const MOVEMENT_THRESHOLD = 10; // Distance threshold to prevent jittering

// Utility functions
const calculateDistance = (pos1, pos2) => {
  return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
};

const Pacman = ({ position, direction }) => {
  const [angle, setAngle] = useState(45);
  const directionRef = useRef(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prev) => {
        if (prev >= 45) directionRef.current = -1;
        if (prev <= 10) directionRef.current = 1;
        return prev + directionRef.current * 5;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const pacmanPath = `M 40 40 
    L ${40 + 40 * Math.cos((angle * Math.PI) / 180)} ${40 - 40 * Math.sin((angle * Math.PI) / 180)}
    A 40 40 0 1 1 ${40 + 40 * Math.cos((-angle * Math.PI) / 180)} ${40 - 40 * Math.sin((-angle * Math.PI) / 180)}
    Z`;

  const getRotation = () => {
    switch (direction) {
      case "up": return "rotate(-90deg)";
      case "down": return "rotate(90deg)";
      case "left": return "rotate(180deg)";
      case "right":
      default: return "rotate(0deg)";
    }
  };

  return (
    <svg
      className="absolute z-10"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        transform: getRotation(),
        transition: "transform 0.1s ease",
      }}
      width="48"
      height="48"
      viewBox="0 0 80 80"
    >
      <circle cx="40" cy="40" r="40" fill="white" />
      <path d={pacmanPath} fill="black" />
    </svg>
  );
};

const Dot = ({ position }) => {
  return (
    <div
      className="absolute bg-white"
      style={{
        top: position.y,
        left: position.x,
        width: DOT_SIZE,
        height: DOT_SIZE,
      }}
    />
  );
};

const Footer = () => {
  const [time, setTime] = useState("");
  const [pacmanPos, setPacmanPos] = useState({ x: 100, y: 100 });
  const [direction, setDirection] = useState("right");
  const [cursorPos, setCursorPos] = useState({ x: 100, y: 100 });
  const [dots, setDots] = useState([]);
  const [score, setScore] = useState(0);
  const [gameAreaBounds, setGameAreaBounds] = useState({ top: 0, left: 0, right: 800, bottom: 400 });
  const [targetPos, setTargetPos] = useState(null); // Store the target position when stopping
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);


  // Refs for DOM elements and animation
  const footerRef = useRef(null);
  const gameAreaRef = useRef(null);
  const dividerRef = useRef(null);
  const animFrameRef = useRef(null);
  const moveAxisRef = useRef("x"); // Track which axis we're moving on: "x" or "y"
  const dotSpawnIntervalRef = useRef(null);
  const isMovingRef = useRef(false);
  const form = useRef();

  // EmailJS configuration
 const sendEmail = async (e) => {
  e.preventDefault();

  const currentForm = form.current;

  // Native validation for required fields and patterns
  if (!currentForm.checkValidity()) {
    currentForm.reportValidity();
    return;
  }

  setIsLoading(true);

  const publicKey = "K2zm_VwrmppRUatQf";
  const serviceID = "service_x2qubbg";
  const templateID = "template_63j2uvb";

  try {
    await emailjs.sendForm(serviceID, templateID, currentForm, {
      publicKey: publicKey,
    });

    setIsLoading(false);
    setSubmitted(true);
    currentForm.reset();

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  } catch (error) {
    console.error("FAILED...", error.text);
    setIsLoading(false);
  }
};


  // Function to show Calendly widget
  const showCalendlyWidget = () => {

    if (!showCalendly) {
      setShowCalendly(true);

      // Create and append Calendly script if not already present
      if (!document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')) {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.head.appendChild(script);
      }
    }
  };

  // Handle 11th social icon click (calendar icon)
  const handleCalendarClick = (e) => {
    e.preventDefault();
    window.open('https://calendly.com/sakshamjainiitr', '_blank');
  };

  // Handle keyboard events
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Don't trigger if user is typing in a form input
      const isFormInput = event.target.tagName === 'INPUT' ||
        event.target.tagName === 'TEXTAREA' ||
        event.target.isContentEditable;

      if ((event.key === 'M' || event.key === 'm') && !isFormInput) {
        window.open('https://calendly.com/sakshamjainiitr', '_blank');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Time tracking
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istTime = now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setTime(istTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  // Initialize game area
  useEffect(() => {
    // Initialize with default values first to ensure game starts
    const initialWidth = window.innerWidth - 40; // Account for some padding
    const initialHeight = 300; // Sensible default

    // Set initial boundaries
    setGameAreaBounds({
      top: 0,
      left: 0,
      right: initialWidth,
      bottom: initialHeight
    });

    // Set initial Pacman position
    setPacmanPos({
      x: Math.min(100, initialWidth - 48),
      y: Math.min(100, initialHeight - 48)
    });

    // Then try to get more precise measurements
    const measureGameArea = () => {
      if (!gameAreaRef.current || !footerRef.current) return;

      try {
        const gameRect = gameAreaRef.current.getBoundingClientRect();
        const footerRect = footerRef.current.getBoundingClientRect();

        if (gameRect && footerRect) {
          const gameWidth = gameRect.width;
          const gameHeight = Math.max(
            350, // Minimum height
            footerRect.bottom - gameRect.top - 48 // Dynamic calculation
          );

          setGameAreaBounds({
            top: 0,
            left: 0,
            right: gameWidth,
            bottom: gameHeight
          });

          // Update Pacman position if needed
          setPacmanPos(prev => {
            const newX = Math.min(prev.x, gameWidth - 48);
            const newY = Math.min(prev.y, gameHeight - 48);
            return { x: newX, y: newY };
          });
        }
      } catch (error) {
        console.error("Error measuring game area:", error);
      }
    };

    // Try measuring after a short delay to ensure DOM is ready
    const timer = setTimeout(measureGameArea, 500);

    // Also measure on resize
    window.addEventListener('resize', measureGameArea);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', measureGameArea);
    };
  }, []);

  // Track cursor position
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!gameAreaRef.current) return;

      try {
        const rect = gameAreaRef.current.getBoundingClientRect();

        if (rect) {
          // Get cursor position relative to game area
          const relX = e.clientX - rect.left;
          const relY = e.clientY - rect.top;

          // Only update if in bounds
          if (
            relX >= 0 && relX <= gameAreaBounds.right &&
            relY >= 0 && relY <= gameAreaBounds.bottom
          ) {
            // When cursor moves a significant distance, clear the target position to allow movement
            if (targetPos) {
              const distanceFromTarget = calculateDistance(
                { x: relX, y: relY },
                targetPos
              );

              if (distanceFromTarget > MOVEMENT_THRESHOLD) {
                setTargetPos(null);
              }
            }

            setCursorPos({
              x: relX,
              y: relY
            });
          }
        }
      } catch (error) {
        console.error("Error tracking cursor:", error);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [gameAreaBounds, targetPos]);

  // Dot spawning - one at a time with a regular interval
  useEffect(() => {
    // Make sure we have valid game area
    const isGameAreaReady = gameAreaRef.current &&
      gameAreaBounds.right > 0 &&
      gameAreaBounds.bottom > 0;

    if (!isGameAreaReady) return;

    // Function to spawn a single dot
    const spawnDot = () => {
      setDots(prevDots => {
        // Only spawn if we're below MAX_DOTS
        if (prevDots.length >= MAX_DOTS) {
          return prevDots;
        }

        // Random position within game area bounds (with safety margins)
        const x = Math.floor(Math.random() * (gameAreaBounds.right - DOT_SIZE - 40)) + 20;
        const y = Math.floor(Math.random() * (gameAreaBounds.bottom - DOT_SIZE - 40)) + 20;

        // Don't spawn too close to Pacman
        const tooCloseToPackman = calculateDistance(
          { x, y },
          pacmanPos
        ) < 30;

        if (tooCloseToPackman) {
          return prevDots; // Don't add a dot, but try again on next interval
        }

        // Add exactly one new dot
        return [
          ...prevDots,
          {
            id: Date.now() + Math.random(),
            x,
            y
          }
        ];
      });
    };

    // Ensure only one interval is running at a time
    if (dotSpawnIntervalRef.current) {
      clearInterval(dotSpawnIntervalRef.current);
    }

    // Spawn first dot immediately
    if (dots.length === 0) {
      spawnDot();
    }

    // Set up regular interval for subsequent dots
    dotSpawnIntervalRef.current = setInterval(spawnDot, DOT_SPAWN_INTERVAL);

    // Cleanup on unmount
    return () => {
      if (dotSpawnIntervalRef.current) {
        clearInterval(dotSpawnIntervalRef.current);
      }
    };
  }, [gameAreaBounds, pacmanPos]);

  // Game loop for Pacman movement and collision detection
  useEffect(() => {
    if (!gameAreaRef.current || gameAreaBounds.right <= 0 || gameAreaBounds.bottom <= 0) return;

    const gameLoop = () => {
      // If we have a target position, we've already stopped at the cursor
      if (targetPos) {
        // Ensure pacman stays exactly at the target position (no jitter)
        if (pacmanPos.x !== targetPos.x || pacmanPos.y !== targetPos.y) {
          setPacmanPos(targetPos);
        }

        // Check for dot collisions even when stopped
        checkDotCollisions();

        // Request next frame and return early
        animFrameRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      // Calculate distance to cursor
      const pacmanCenter = {
        x: pacmanPos.x + 24, // Half of Pacman's width
        y: pacmanPos.y + 24  // Half of Pacman's height
      };

      const distanceToCursor = calculateDistance(pacmanCenter, {
        x: cursorPos.x + 24,
        y: cursorPos.y + 24
      });

      // Decide if Pacman should move or stop
      if (distanceToCursor <= MOVEMENT_THRESHOLD) {
        // We're close enough to the cursor, should stop
        isMovingRef.current = false;

        // Set the exact target position to prevent jitter
        const finalPos = {
          x: cursorPos.x,
          y: cursorPos.y
        };

        // Store the final position as our target to lock in place until cursor moves significantly
        setTargetPos(finalPos);

        // Snap directly to the final position
        setPacmanPos(finalPos);
      } else {
        // We need to move toward the cursor
        isMovingRef.current = true;

        // Move Pacman toward cursor position but only on one axis at a time
        setPacmanPos(prev => {
          // Calculate distance to target on each axis
          const dx = cursorPos.x - prev.x;
          const dy = cursorPos.y - prev.y;
          const dx_abs = Math.abs(dx);
          const dy_abs = Math.abs(dy);

          let newX = prev.x;
          let newY = prev.y;
          let newDirection = direction;

          // Determine if we should switch movement axis
          if (moveAxisRef.current === "x" && dx_abs < 5) {
            moveAxisRef.current = "y";
          } else if (moveAxisRef.current === "y" && dy_abs < 5) {
            moveAxisRef.current = "x";
          }

          // On cursor movement, decide which axis has more distance to travel
          if ((dx_abs > 10 || dy_abs > 10) &&
            ((moveAxisRef.current === "x" && dx_abs < 5) ||
              (moveAxisRef.current === "y" && dy_abs < 5))) {
            moveAxisRef.current = dx_abs > dy_abs ? "x" : "y";
          }

          // Move only on the current axis
          if (moveAxisRef.current === "x") {
            // Move horizontally
            if (dx > 0) {
              newX = Math.min(prev.x + PACMAN_SPEED, gameAreaBounds.right - 48);
              newDirection = "right";
            } else if (dx < 0) {
              newX = Math.max(prev.x - PACMAN_SPEED, 0);
              newDirection = "left";
            }
          } else {
            // Move vertically
            if (dy > 0) {
              newY = Math.min(prev.y + PACMAN_SPEED, gameAreaBounds.bottom - 48);
              newDirection = "down";
            } else if (dy < 0) {
              newY = Math.max(prev.y - PACMAN_SPEED, 0);
              newDirection = "up";
            }
          }

          // Update the direction
          setDirection(newDirection);

          return { x: newX, y: newY };
        });
      }

      // Check for dot collisions
      checkDotCollisions();

      animFrameRef.current = requestAnimationFrame(gameLoop);
    };

    // Separate function for dot collisions to avoid code duplication
    const checkDotCollisions = () => {
      setDots(prev => {
        const pacmanRadius = 24; // Half of Pacman's size
        const pacmanCenter = {
          x: pacmanPos.x + pacmanRadius,
          y: pacmanPos.y + pacmanRadius
        };

        const eatenDots = [];

        // Find eaten dots
        prev.forEach(dot => {
          const dotCenter = {
            x: dot.x + DOT_SIZE / 2,
            y: dot.y + DOT_SIZE / 2
          };

          const distance = calculateDistance(pacmanCenter, dotCenter);

          if (distance < pacmanRadius) {
            eatenDots.push(dot.id);
            setScore(s => s + 10);
          }
        });

        // Remove eaten dots
        if (eatenDots.length > 0) {
          return prev.filter(dot => !eatenDots.includes(dot.id));
        }

        return prev;
      });
    };

    animFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [cursorPos, gameAreaBounds, pacmanPos, direction, targetPos]);


  return (
    <div ref={footerRef} id="footer" className="container max-w-full py-6 px-6 mx-auto xl:px-36 lg:px-14 sm:px-4 relative z-30">
      {/* Game Area */}
      <div
        ref={gameAreaRef}
        className="relative w-full overflow-hidden"
        style={{ minHeight: '350px' }}
      >
        {/* Pacman - Always render */}
        <Pacman position={pacmanPos} direction={direction} />

        {/* Dots - Always render */}
        {dots.map(dot => (
          <Dot key={dot.id} position={dot} />
        ))}

        {/* Content */}
        <div className="foothead text-[40px] sm:text-5xl md:text-6xl pt-8 pb-8 sm:pb-2 text-center uppercase w-full lg:w-[72%] xl:w-[65%] md:w-[90%] mx-auto select-none">
          Contact me to create fun things together
        </div>

        {/* FIXED: Wrap inputs in a form element */}
        <form
          ref={form}
          className="grid w-full md:w-[60%] lg:w-[45%] mx-auto grid-cols-2 grid-rows-6 gap-4 pt-4 mb-4" >
          <input
            type="from_name"
            name="from_name"
            id="name"
            placeholder="Name"
            required
            className="col-span-1 p-3 rounded-md text-white bg-[#131313] border border-[#363636]/20 focus:outline-none"
          />
          <input
            type="email"
            name="from_email"
            id="email"
            placeholder="Email"
            required
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            title="Please enter a valid Gmail address"
            className="col-span-1 p-3 rounded-md text-white bg-[#131313] border border-[#363636]/20 focus:outline-none"
          />
          <textarea
            type="message"
            placeholder="Message"
            name="message"
            id="message"
            required
            className="col-span-2 row-span-3 p-3 rounded-md text-white bg-[#131313] border border-[#363636]/20 focus:outline-none resize-none"
          ></textarea>

          <motion.button
            type="submit"
            onClick={sendEmail}
            disabled={isLoading || submitted}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="col-span-2 p-3 rounded-md text-center font-semibold relative overflow-hidden group"
            initial={{ scale: 1 }}
            animate={{
              backgroundColor: submitted ? "#22c55e" : isLoading ? "#6b7280" : "#ffffff",
              color: submitted ? "#ffffff" : isLoading ? "#ffffff" : "#000000",
              scale: submitted ? 1.02 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              backgroundColor: { duration: 0.3 },
              scale: { duration: 0.2 }
            }}
            whileHover={{
              scale: isLoading || submitted ? 1.02 : 1.05,
              y: -2,
              boxShadow: "0 10px 25px rgba(255,255,255,0.1)"
            }}
            whileTap={{
              scale: 0.98,
              y: 0
            }}
          >
            {/* Background gradient animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              initial={{ x: "-100%" }}
              animate={{
                x: isHovered && !isLoading && !submitted ? "0%" : "-100%"
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />

            {/* Ripple effect on click */}
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: isLoading ? [0, 2, 2] : 0,
                opacity: isLoading ? [0.3, 0.1, 0] : 0
              }}
              transition={{
                duration: 1.5,
                repeat: isLoading ? Infinity : 0,
                ease: "easeOut"
              }}
            />

            {/* Button content */}
            <span className="relative z-10 flex items-center justify-center gap-2">
              {/* Loading spinner */}
              {isLoading && (
                <motion.div
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              )}

              {/* Success checkmark */}
              {submitted && (
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 25,
                    delay: 0
                  }}
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                </motion.svg>
              )}

              {/* Button text with stagger animation */}
              <motion.span
                animate={{
                  y: isLoading ? [-2, 2, -2] : 0
                }}
                transition={{
                  duration: 0.8,
                  repeat: isLoading ? Infinity : 0,
                  ease: "easeInOut"
                }}
              >
                {submitted ? "Message is Recieved!" : isLoading ? "Sending..." : "Send Message"}
              </motion.span>
            </span>

            {/* Particle effect on success */}
            {submitted && (
              <>
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      left: "50%",
                      top: "50%",
                    }}
                    initial={{
                      scale: 0,
                      x: 0,
                      y: 0,
                      opacity: 1
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      x: Math.cos((i * 45) * Math.PI / 180) * 40,
                      y: Math.sin((i * 45) * Math.PI / 180) * 40,
                      opacity: [1, 1, 0]
                    }}
                    transition={{
                      duration: 1,
                      delay: i * 0.1,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </>
            )}
          </motion.button>
        </form>
        {/* Clear divider to enforce boundary */}
        {/* <div ref={dividerRef} className="w-full border-t border-gray-800 mt-4 mb-4"></div> */}
      </div>

      {/* Footer Info (No game elements below this line) */}
      <div className="footer flex flex-col gap-6 md:flex-row md:justify-between">
        <div className="flex gap-6 lg:w-none md:w-[45%]">
          <div className="flex flex-col gap-3">
            <div className="text-white opacity-35 text-sm">VERSION</div>
            <div className="text-base">2025©Edition</div>
          </div>
          <div className="flex flex-col gap-3 md:flex-1 lg:flex-none">
            <div className="text-white opacity-35 text-sm">LOCAL TIME</div>
            <div className="text-transform: uppercase text-base">{time} IST</div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-white opacity-35 text-sm">SCORE</div>
            <div className="text-base">{score}</div>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-4 w-4/5 md:w-6/10 lg:w-full md:ml-auto">
            <div className="text-white opacity-35 text-sm">SOCIAL MEDIA</div>
            <div className="flex flex-wrap items-center gap-6 md:gap-6">
              {social.map((item, index) => (
                <a
                  key={index}
                  href={index === 10 ? "#" : item.link}
                  target={index === 10 ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  onClick={index === 10 ? handleCalendarClick : undefined}
                >
                  <Image
                    className="lg:grayscale lg:hover:grayscale-0 hover:scale-[135%] transition duration-300"
                    src={`/social/${item.icon}`}
                    width={18}
                    height={18}
                    alt={item.icon.split(".")[0]}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;