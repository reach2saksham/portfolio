"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll } from 'framer-motion';

// Custom hook for mouse and touch position
const usePointerPosition = () => {
    const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });

    const updateMousePosition = e => {
        setPointerPosition({ x: e.clientX, y: e.clientY });
    };

    const updateTouchPosition = e => {
        if (e.touches && e.touches.length > 0) {
            const touch = e.touches[0];
            setPointerPosition({ x: touch.clientX, y: touch.clientY });
        }
    };

    useEffect(() => {
        // Mouse events
        window.addEventListener("mousemove", updateMousePosition);
        
        // Touch events
        window.addEventListener("touchmove", updateTouchPosition, { passive: false });
        window.addEventListener("touchstart", updateTouchPosition, { passive: false });

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("touchmove", updateTouchPosition);
            window.removeEventListener("touchstart", updateTouchPosition);
        };
    }, []);

    return pointerPosition;
};

// Custom hook for responsive size
const useResponsiveSize = (isActive) => {
    const [size, setSize] = useState(250);

    useEffect(() => {
        const updateSize = () => {
            if (isActive) {
                setSize(40);
            } else {
                // Check if screen is sm (640px) or larger
                const isSmallOrLarger = window.innerWidth >= 640;
                setSize(isSmallOrLarger ? 400 : 280);
            }
        };

        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, [isActive]);

    return size;
};

export default function MaskEffect() {
    const [isActive, setIsActive] = useState(false);
    const { x, y } = usePointerPosition();
    const size = useResponsiveSize(isActive);

    const element = useRef(null);
    const { scrollYProgress } = useScroll({
        target: element,
        offset: ["start end", "start start"]
    });

    useEffect(() => {
        scrollYProgress.on("change", e => console.log(e))
    }, []);

    const handlePointerEnter = () => {
        setIsActive(true);
    };

    const handlePointerLeave = () => {
        setIsActive(false);
    };

    const handleTouchStart = (e) => {
        e.preventDefault(); // Prevent scrolling when touching the text
        setIsActive(true);
    };

    const handleTouchEnd = () => {
        setIsActive(false);
    };

    return (
        <main className="h-screen herotext relative">
            <motion.div
                className="
                w-full h-full absolute
                flex items-center justify-start 
                -m-4 lg:pl-8 xl:pl-[122px] min-[383px]:pb-12 sm:pb-40 md:pb-0
                leading-[48px] sm:leading-[56px] md:leading-[66px] 
                text-[42px] sm:text-[56px] md:text-6xl 
                 bg-gradient-to-b from-[#BA3C97] to-[#E000C2] z-30"
                style={{
                    WebkitMaskImage: `radial-gradient(circle, white 50%, transparent 50%)`,
                    maskImage: `radial-gradient(circle, white 50%, transparent 50%)`,
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat"
                }}
                animate={{
                    WebkitMaskPosition: `${x - (size / 2)}px ${y - (size / 2)}px`,
                    maskPosition: `${x - (size / 2)}px ${y - (size / 2)}px`,
                    WebkitMaskSize: `${size}px ${size}px`,
                    maskSize: `${size}px ${size}px`,
                }}
                transition={{ type: "smooth", ease: "backOut", duration: 0.3 }}
            >
                <p
                    className="w-[1000px] text-black px-10 pt-20 md:px-10 md:pt-8 flex flex-col gap-6"
                >
                    I know how to center a div.
                    <p>
                        I Google faster than I code.
                        <p>
                            {`cin >>"I bring structure to ideas and momentum to stalled projects";`}
                        </p>
                    </p>
                </p>
            </motion.div>

            <div className="w-full h-full flex items-center justify-start -m-4 lg:pl-8 xl:pl-[122px] leading-[48px] sm:leading-[56px] md:leading-[66px] text-[42px] sm:text-[56px] md:text-6xl cursor-default relative z-20">
                <p 
                    className="w-[1000px] text-[#c1b3a5] px-10 md:px-10 flex flex-col gap-6"
                    onMouseEnter={handlePointerEnter}
                    onMouseLeave={handlePointerLeave}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onTouchCancel={handleTouchEnd}
                >
                    {`while(I'm == technical){`}
                    <p>
                        {`Learning += Everyday;`}
                        <p>
                            {`cout << " From `}
                            <span className="text-[#FF00C1]">
                                concept to product,
                            </span>

                            {` I love building things that work."; }`}
                        </p>
                    </p>
                </p>
            </div>
        </main>
    );
}