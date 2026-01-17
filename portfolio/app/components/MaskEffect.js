"use client";

import { useState, useEffect } from "react";
import { motion } from 'framer-motion';

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
        window.addEventListener("mousemove", updateMousePosition);
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
    // CORRECTED LOGIC: Default to small size, expand on hover.
    const [size, setSize] = useState(40);

    useEffect(() => {
        const updateSize = () => {
            if (isActive) { // When hovered
                const isSmallOrLarger = window.innerWidth >= 640;
                setSize(isSmallOrLarger ? 360 : 280);
            } else { // When not hovered
                setSize(40);
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
                -m-4 lg:pl-8 xl:pl-[74px] min-[383px]:pb-12 min-[412px]:pb-24 min-[438px]:pb-12 min-[477px]:pb-24 min-[489px]:pb-36 min-[517px]:pb-48 min-[526px]:pb-36 min-[553px]:pb-24 min-[557px]:pb-12 min-[663px]:pb-[216px] min-[674px]:pb-40 min-[711px]:pb-[104px] min-[717px]:pb-12 md:pb-0
                leading-[48px] sm:leading-[56px] md:leading-[66px] 
                text-[42px] sm:text-[56px] md:text-6xl 
                 bg-gradient-to-b from-[#BA3C97] to-[#E000C2] z-30 select-none cursor-default" // MOVED CURSOR HERE
                style={{
                    WebkitMaskImage: `radial-gradient(circle, white 50%, transparent 50%)`,
                    maskImage: `radial-gradient(circle, white 50%, transparent 50%)`,
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    transform: "translateZ(0)",
                    WebkitTransform: "translateZ(0)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden"
                }}
                initial={{
                    WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
                    maskPosition: `${x - size / 2}px ${y - size / 2}px`,
                    WebkitMaskSize: `${size}px ${size}px`,
                    maskSize: `${size}px ${size}px`,
                }}
                animate={{
                    WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
                    maskPosition: `${x - size / 2}px ${y - size / 2}px`,
                    WebkitMaskSize: `${size}px ${size}px`,
                    maskSize: `${size}px ${size}px`,
                }}
                transition={{ type: "smooth", ease: "backOut", duration: 0.3 }}
                // MOVED EVENT HANDLERS to this top-level, interactive element
                onMouseEnter={handlePointerEnter}
                onMouseLeave={handlePointerLeave}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchEnd}
            >
                <span
                    className="w-[1000px] text-black px-10 pt-20 md:px-10 md:pt-8 flex flex-col gap-6"
                >
                    I know how to center a div.
                    <span>
                        I Google faster than I code.
                        <p>
                            {`cin >>"I bring structure to ideas and momentum to stalled projects";`}
                        </p>
                    </span>
                </span>
            </motion.div>

            <div className="w-full h-full flex items-center justify-start -m-4 lg:pl-8 xl:pl-[74px] leading-[48px] sm:leading-[56px] md:leading-[66px] text-[42px] sm:text-[56px] md:text-6xl relative z-20 select-none">
                <span
                    className="w-[1000px] text-[#c1b3a5] px-10 md:px-10 flex flex-col gap-6"
                    // REMOVED event handlers from this underlying, non-interactive element
                >
                    {`while(I'm == technical){`}
                    <span>
                        {`Learning += Everyday;`}
                        <p>
                            {`cout << " From `}
                            <span className="text-[#FF00C1]">
                                concept to product,
                            </span>

                            {` I love building things that work."; }`}
                        </p>
                    </span>
                </span>
            </div>
        </main>
    );
}