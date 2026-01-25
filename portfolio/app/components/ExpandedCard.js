import React, { useRef, useEffect, useState } from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";

const ExpandedCard = ({
  topInfo = "01 | PRODUCT DESIGNER",
  status = "Coming Soon",
  coverImage = "./design/uix-labs/cardcover.png",
  mainHeading = "CraftStack",
  companyName = "@UIX Labs",
  description = "A project and employee tracking dashboard for High-profile company clients",
  bulletPoints = [
    "Centralized platform to track all client projects",
    "Real-time visibility into employee assignments and progress",
    "Clear mapping between projects and team members",
  ],
  bulletColor = "#2FF9EB",
  readTime = "16 MIN",
  duration = "JULY 2024 - SEPTEMBER 2024",
  docsLink = "/design/uix-labs",
  onCardClick,
}) => {
  const cardRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const cardTop = rect.top;

      const startPoint = windowHeight * 1.3;
      const endPoint = windowHeight * 0.3;

      const distanceTraveled = startPoint - cardTop;
      const totalDistance = startPoint - endPoint;

      let progress = distanceTraveled / totalDistance;
      progress = Math.max(0, Math.min(1, progress));

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const rotation = 30 - 30 * scrollProgress;
  const scale = (0.75 + 0.25 * scrollProgress) * 0.8;
  const opacity = 0.6 + 0.4 * scrollProgress;

  const handleClick = () => {
    if (onCardClick) {
      onCardClick(docsLink);
    }
  };

  return (
    <div
      ref={cardRef}
      className="relative z-30 sm:px-6 md:px-8 lg:px-14 xl:px-24 flex flex-col gap-6 font-sans"
      style={{
        perspective: "1000px",
      }}
    >
      <div
        className="flex flex-col justify-between hover:bg-[#1E1D1C] transition-colors duration-300 group bg-[#131313] border-2 border-[#272727] rounded-lg overflow-hidden cursor-pointer"
        onClick={onCardClick}
        style={{
          transform: `rotateX(${rotation}deg) scale(${scale})`,
          opacity: opacity,
          transformOrigin: "center center",
          transition: "background-color 0.3s",
        }}
      >
        {/* Header Section */}
        <div className="flex justify-between items-center px-4 py-8 sm:p-6 md:p-8">
          <div className="flex gap-6">
          <span className="text-[#f8f8f8] font-medium text-xs sm:text-sm md:text-base select-none">
            {topInfo}
          </span>
           <div className="flex gap-2 items-center">
                <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
                <span className="text-[#727272] font-medium text-xs sm:text-sm md:text-base select-none">
                  {status}
                </span>
              </div>
              </div>
          <span className="tags bg-[#E6E6E6] text-[#1A1A1A] text-sm font-semibold rounded-full w-6 h-6 sm:w-7 sm:h-7 flex justify-center items-center flex-shrink-0">
            <ArrowUpRightIcon className="h-2 w-2 sm:h-3.5 sm:w-3.5" />
          </span>
        </div>

        {/* Content Section - Responsive Layout */}
        <div className="flex flex-col lg:flex-row lg:gap-8 xl:gap-16 pt-2 lg:pt-12 xl:pt-20">
          {/* Image Container */}
          <div className="max-h-none sm:w-3/4 lg:w-[40%] xl:w-5/12 flex-shrink-0">
            <img
              src={coverImage}
              alt={mainHeading}
              draggable="false"
              className="w-full h-full pr-12 pb-6 sm:pt-12 lg:pr-0 lg:pb-0 lg:pt-0 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out select-none overflow-visible"
            />
          </div>

          {/* Text Content Container */}
          <div className="flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:pr-8 lg:pb-8 lg:pt-0 flex-grow">
            {/* Heading and Description */}
            <div className="flex flex-col gap-3 sm:gap-4">
              {/* Title Section */}
              <div className="flex items-baseline gap-2 sm:gap-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl select-none">
                  {mainHeading}
                </h2>
                <span className="text-lg sm:text-xl md:text-2xl text-[#727272] select-none">
                  {companyName}
                </span>
              </div>
             

              {/* Description */}
              <p className="text-base sm:text-lg md:text-xl text-[#666666] group-hover:text-[#727272] transition-transform duration-300 leading-relaxed pt-2 sm:pt-4 select-none">
                {description}
              </p>

              {/* Technology Tags (commented out in original) */}
              {/* <div className="flex gap-2 sm:gap-4 flex-wrap">
                <div className="bg-[#171717] opacity-40 group-hover:opacity-100 border border-[#272727] px-3 py-1 rounded-lg text-sm sm:text-base">
                  NextJS
                </div>
              </div> */}
            </div>

            {/* Bullet Points Section (commented out in original) */}
            {/* <div>
              {bulletPoints && bulletPoints.length > 0 && (
                <div className="hidden group-hover:flex flex-col gap-2 pt-8 sm:pt-12 md:pt-16 transition-transform ease-in-out duration-1000">
                  {bulletPoints.map((point, index) => (
                    <div
                      key={index}
                      className="text-sm sm:text-base md:text-lg text-gray-400 font-medium flex gap-2 sm:gap-4 items-start"
                    >
                      <svg
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-1"
                        style={{ color: bulletColor }}
                        fill="currentColor"
                      >
                        <path d="M50 0 C55 30 70 45 100 50 C70 55 55 70 50 100 C45 70 30 55 0 50 C30 45 45 30 50 0 Z" />
                      </svg>
                      <span className="flex-1">{point}</span>
                    </div>
                  ))}
                </div>
              )}
            </div> */}

            {/* Footer Meta Information */}
            <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 mt-6 sm:mt-8 pt-4 border-t border-[#272727] sm:border-0">
              <div className="flex gap-3 items-center">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-[#727272] font-medium text-xs sm:text-sm md:text-base select-none">
                  {readTime} READ
                </span>
              </div>
              <span className="text-[#727272] font-medium text-xs sm:text-sm md:text-base select-none">
                {duration}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedCard;
