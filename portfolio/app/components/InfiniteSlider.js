'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';

const InfiniteSlider = ({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const currentDuration = isHovered && durationOnHover ? durationOnHover : duration;

  const hoverProps = durationOnHover
    ? {
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
      }
    : {};

  return (
    <div className={cn('overflow-hidden', className)}>
      <div
        className={`flex ${direction === 'vertical' ? 'flex-col' : 'flex-row'} w-max`}
        style={{
          animation: `${reverse ? 'scroll-reverse' : 'scroll'} ${currentDuration}s linear infinite`,
          gap: `${gap}px`,
        }}
        {...hoverProps}
      >
        {children}
        {children}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: ${direction === 'horizontal' ? 'translateX(0)' : 'translateY(0)'};
          }
          100% {
            transform: ${direction === 'horizontal' ? 'translateX(-50%)' : 'translateY(-50%)'};
          }
        }

        @keyframes scroll-reverse {
          0% {
            transform: ${direction === 'horizontal' ? 'translateX(-50%)' : 'translateY(-50%)'};
          }
          100% {
            transform: ${direction === 'horizontal' ? 'translateX(0)' : 'translateY(0)'};
          }
        }
      `}</style>
    </div>
  );
};

export default InfiniteSlider;