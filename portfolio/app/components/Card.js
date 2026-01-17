"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";

const Card = (props) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Handle mouse move within the card
  const handleMouseMove = (e) => {
    // Get the mouse position relative to the viewport
    setTooltipPosition({
      x: e.clientX,
      y: e.clientY
    });
  };

  // Handle mouse enter/leave
  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div
      className='cursor-pointer z-30 relative'
      onClick={() => window.open(props.docsLink || '#', '_blank')}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-card-tooltip="true"
    >
      {/* Image Section */}
      <div className='relative m-3 overflow-hidden rounded-2xl group'>
        <Image
          className='w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 rounded-sm'
          src={props.image}
          width={props.width}
          height={props.height}
          alt={props.alt}
          priority
          unoptimized={true}
        />
        {/* Black Overlay on Hover */}
        <div className='absolute inset-0 bg-[#1E1E1E] opacity-0 group-hover:opacity-70 transition-opacity rounded-2xl' ></div>

        {/* Centered "View Live" Button - Only render if liveLink exists */}
        {props.liveLink && (
          <div className='hidden group-hover:flex absolute inset-0 justify-center items-center'>
            <a
              href={props.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()} // Prevent triggering parent onClick
              className='px-3 py-2 bg-[#E6E6E6] text-[#1A1A1A] text-xs rounded-2xl shadow-lg flex items-center gap-2 hover:bg-[#1A1A1A] hover:text-white'
              data-view-live-button="true"
            >
              View Live <ArrowUpRightIcon className="h-3 w-3" />
            </a>
          </div>
        )}

        {/* Top Overlay - Flex with justify-between */}
        <div className='absolute top-3 left-3 right-3 flex justify-between items-center p-2'>
          <div className='flex gap-2'>
            {props.tags.map((tag, index) => (
              <span key={index} className='tags block md:hidden lg:block bg-[#E6E6E6] text-[#1A1A1A] px-2 py-[2px] text-[10px] rounded-2xl group-hover:bg-[#1A1A1A] group-hover:text-white group-hover:px-2 group-hover:py-[3px] group-hover:shadow-lg'>
                {tag}
              </span>
            ))}
          </div>
          <span className='tags bg-[#E6E6E6] text-[#1A1A1A] text-sm font-semibold rounded-full w-5 h-5 flex justify-center items-center'>
            <ArrowUpRightIcon className="h-3 w-3" />
          </span>
        </div>

        {/* Bottom Overlay - Flex column with gap-2 */}
        <div className='hidden group-hover:flex absolute bottom-3 left-3 right-3 flex-col gap-2 p-2'>
          <div className='flex gap-2'>
            <span className='tags px-2 py-[2px] text-[10px] rounded-2xl bg-[#1A1A1A] text-white group-hover:shadow-lg'>
              Role
            </span>
            {props.role.map((item, index) => (
              <span key={index} className='tags bg-[#E6E6E6] text-[#1A1A1A] px-2 py-[2px] text-[10px] rounded-2xl group-hover:shadow-lg'>
                {item}
              </span>
            ))}
          </div>
          <div className='flex gap-2'>
            <span className='tags px-2 py-[2px] text-[10px] rounded-2xl bg-[#1A1A1A] text-white group-hover:shadow-lg'>
              Domain
            </span>
            {(Array.isArray(props.domain) ? props.domain : [props.domain]).map((item, index) => (
              <span key={index} className='tags bg-[#E6E6E6] text-[#1A1A1A] px-2 py-[2px] text-[10px] rounded-2xl group-hover:shadow-lg'>
                {item}
              </span>
            ))}
          </div>
          <div className='flex gap-2'>
            <span className='tags px-2 py-[2px] text-[10px] rounded-2xl bg-[#1A1A1A] text-white group-hover:shadow-lg'>
              Impact
            </span>
            {(Array.isArray(props.impact) ? props.impact : [props.impact]).map((item, index) => (
              <span key={index} className='tags bg-[#E6E6E6] text-[#1A1A1A] px-2 py-[2px] text-[10px] rounded-2xl group-hover:shadow-lg'>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className='m-2 pt-2 pb-4 pr-2 pl-2 flex flex-col gap-2'>
        <div className='casetags font-semibold text-lg'>{props.title}</div>
        <div className='casetags text-sm opacity-75'>
          {props.description}
        </div>
      </div>
    </div>
  )
}

// This creates a tooltip component at the app level to avoid tooltip issues between multiple cards
export const MouseTooltip = () => {
  const [tooltipData, setTooltipData] = useState({ show: false, x: 0, y: 0 });

  // Set up global event listeners for mouse movement, card hover, and scrolling
  React.useEffect(() => {
    const handleMouseMove = (e) => {
      // Check if mouse is over a "View Live" button, and hide tooltip if it is
      if (e.target.closest('[data-view-live-button]')) {
        setTooltipData(prev => ({ ...prev, show: false }));
      }
      // Otherwise show tooltip if over a card
      else if (e.target.closest('[data-card-tooltip]')) {
        setTooltipData({
          show: true,
          x: e.clientX + 10, // Offset by 10px to the right
          y: e.clientY - 10  // Offset by 10px upward
        });
      } else {
        setTooltipData(prev => ({ ...prev, show: false }));
      }
    };

    // **NEW**: Function to hide the tooltip whenever the user scrolls
    const handleScroll = () => {
      setTooltipData(prev => ({ ...prev, show: false }));
    };

    document.addEventListener('mousemove', handleMouseMove);
    // **NEW**: Add the scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup function to remove both listeners
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!tooltipData.show) return null;

  return (
    <div
      className="fixed herointro mt-6 px-3 py-1 bg-[#FF4BAC] text-[#121212] font-semibold  rounded-e-xl rounded-b-xl text-xs opacity-90 whitespace-nowrap pointer-events-none z-50"
      style={{
        left: `${tooltipData.x}px`,
        top: `${tooltipData.y}px`,
      }}
    >
      Click to see documentation
    </div>
  );
};

export default Card;