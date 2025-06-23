"use client";

import { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Star } from "lucide-react";
import Starsbackground from "./components/Starbackground";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const excludedPaths = ['/design', '/product', '/dev'];
  const showStars = !excludedPaths.some(path => pathname?.includes(path));

  // Add error boundary and loading state
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Ensure DOM is ready
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  // Add error handler
  useEffect(() => {
    const handleError = (error) => {
      console.error('Global error:', error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleError);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError);
    };
  }, []);

  if (isLoading) {
    return (
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}>
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white/50"></div>
          </div>
        </body>
      </html>
    );
  }

  if (hasError) {
    return (
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}>
          <div className="min-h-screen flex items-center justify-center flex-col gap-4">
            <h1 className="text-2xl">Something went wrong</h1>
            <button onClick={() => window.location.reload()} className="px-4 py-2 bg-blue-600 rounded">
              Reload Page
            </button>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {showStars && <Starsbackground />}
        {children}
      </body>
    </html>
  );
}