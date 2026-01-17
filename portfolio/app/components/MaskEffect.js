"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from 'framer-motion';

// UPDATED HOOK: Accepts a ref to calculate relative coordinates
const usePointerPosition = (ref) => {
    const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updatePosition = (clientX, clientY) => {
            if (ref && ref.current) {
                // Get the position of the element relative to the viewport
                const rect = ref.current.getBoundingClientRect();
                
                // Calculate mouse position relative to the element
                setPointerPosition({ 
                    x: clientX - rect.left, 
                    y: clientY - rect.top 
                });
            }
        };

        const updateMousePosition = e => {
            updatePosition(e.clientX, e.clientY);
        };

        const updateTouchPosition = e => {
            if (e.touches && e.touches.length > 0) {
                const touch = e.touches[0];
                updatePosition(touch.clientX, touch.clientY);
            }
        };

        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("touchmove", updateTouchPosition, { passive: false });
        window.addEventListener("touchstart", updateTouchPosition, { passive: false });

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("touchmove", updateTouchPosition);
            window.removeEventListener("touchstart", updateTouchPosition);
        };
    }, [ref]); // Re-run if ref changes

    return pointerPosition;
};

const useResponsiveSize = (isActive) => {
    const [size, setSize] = useState(40);

    useEffect(() => {
        const updateSize = () => {
            if (isActive) {
                const isSmallOrLarger = window.innerWidth >= 640;
                setSize(isSmallOrLarger ? 360 : 280);
            } else {
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
    
    // 1. Create a ref for the element
    const containerRef = useRef(null);
    
    // 2. Pass the ref to the hook
    const { x, y } = usePointerPosition(containerRef);
    
    const size = useResponsiveSize(isActive);

    const handlePointerEnter = () => setIsActive(true);
    const handlePointerLeave = () => setIsActive(false);
    const handleTouchStart = (e) => {
        e.preventDefault();
        setIsActive(true);
    };
    const handleTouchEnd = () => setIsActive(false);

    return (
        <main className="h-screen herotext relative">
            <motion.div
                // 3. Attach the ref to the element
                ref={containerRef} 
                className="
                w-full h-full absolute
                flex items-center justify-start 
                -m-4 lg:pl-8 xl:pl-[58px] min-[383px]:pb-12 min-[412px]:pb-24 min-[438px]:pb-12 min-[477px]:pb-24 min-[489px]:pb-36 min-[517px]:pb-48 min-[526px]:pb-36 min-[553px]:pb-24 min-[557px]:pb-12 min-[663px]:pb-[216px] min-[674px]:pb-40 min-[711px]:pb-[104px] min-[717px]:pb-12 md:pb-0
                leading-[48px] sm:leading-[56px] md:leading-[66px] 
                text-[42px] sm:text-[56px] md:text-6xl 
                 bg-gradient-to-b from-[#BA3C97] to-[#E000C2] z-30 select-none cursor-default"
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
                // Since x and y are now relative to this element, the math works perfectly
                animate={{
                    WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
                    maskPosition: `${x - size / 2}px ${y - size / 2}px`,
                    WebkitMaskSize: `${size}px ${size}px`,
                    maskSize: `${size}px ${size}px`,
                }}
                transition={{ type: "smooth", ease: "backOut", duration: 0.3 }}
                onMouseEnter={handlePointerEnter}
                onMouseLeave={handlePointerLeave}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchEnd}
            >
                <span className="w-[1000px] text-black px-10 pt-20 md:px-10 md:pt-8 flex flex-col gap-6">
                    I know how to center a div.
                    <span>
                        I Google faster than I code.
                        <p>
                            {`cin >>"I bring structure to ideas and momentum to stalled projects";`}
                        </p>
                    </span>
                </span>
            </motion.div>

            <div className="w-full h-full flex items-center justify-start -m-4 lg:pl-8 xl:pl-[58px] leading-[48px] sm:leading-[56px] md:leading-[66px] text-[42px] sm:text-[56px] md:text-6xl relative z-20 select-none">
                <span className="w-[1000px] text-[#c1b3a5] px-10 md:px-10 flex flex-col gap-6">
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