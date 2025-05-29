"use client";

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
  const showStars = !pathname?.includes('/design');

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