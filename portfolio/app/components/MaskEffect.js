"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll } from 'framer-motion';

// Custom hook for mouse position
const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 110 });

    const updateMousePosition = e => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    };

    useEffect(() => {
        window.addEventListener("mousemove", updateMousePosition);
        return () => window.removeEventListener("mousemove", updateMousePosition);
    }, []);

    return mousePosition;
};

// Custom hook for responsive size
const useResponsiveSize = (isHovered) => {
    const [size, setSize] = useState(250);

    useEffect(() => {
        const updateSize = () => {
            if (isHovered) {
                setSize(40);
            } else {
                // Check if screen is sm (640px) or larger
                const isSmallOrLarger = window.innerWidth >= 640;
                setSize(isSmallOrLarger ? 400 : 200);
            }
        };

        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, [isHovered]);

    return size;
};



export default function MaskEffect() {
    const [isHovered, setIsHovered] = useState(false);
    const { x, y } = useMousePosition();
    const size = useResponsiveSize(isHovered);

    const element = useRef(null);
    const { scrollYProgress } = useScroll({
        target: element,
        offset: ["start end", "start start"]
    })

    useEffect(() => {
        scrollYProgress.on("change", e => console.log(e))
    }, )


    return (
        <main className="h-screen herotext ">
            <motion.div
                className="w-full h-full flex items-center justify-start -m-4 lg:pl-8 xl:pl-[122px] leading-[48px] sm:leading-[56px] md:leading-[66px] text-[42px] sm:text-[56px] md:text-6xl cursor-default absolute bg-gradient-to-b from-[#BA3C97] to-[#E000C2]"
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

            <div className="w-full h-full flex items-center justify-start -m-4 lg:pl-8 xl:pl-[122px] leading-[48px] sm:leading-[56px] md:leading-[66px] text-[42px] sm:text-[56px] md:text-6xl cursor-default">
                <p 
                className="w-[1000px] text-[#c1b3a5] px-10 md:px-10 flex flex-col gap-6"
                onMouseEnter={() => { setIsHovered(true) }}
                onMouseLeave={() => { setIsHovered(false) }}>
                    {/* I&rsquo;m  selectively skilled</span> product designer with strong focus on producing high quality & impactful digital experience. */}
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