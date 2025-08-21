'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Starsbackground from './Starbackground';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const excludedPaths = ['/design', '/product', '/business'];
  const showStars = !excludedPaths.some((path) => pathname?.includes(path));

  // Calendly shortcut listener
  useEffect(() => {
    const handleKeyPress = (event) => {
      const isFormInput =
        event.target.tagName === 'INPUT' ||
        event.target.tagName === 'TEXTAREA' ||
        event.target.isContentEditable;

      if (!isFormInput && (event.key === 'M' || event.key === 'm')) {
        window.open('https://calendly.com/sakshamjainiitr', '_blank');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <>
      {showStars && <Starsbackground />}
      {children}
    </>
  );
}
