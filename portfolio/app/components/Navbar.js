"use client";
import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import NavLink from './NavLink'

// Mobile navigation links (includes Home)
const mobileNavLinks = [
    {
        title: "Home",
        path: "#hero", // This should match your Hero/Home section ID
    },
    {
        title: "Work",
        path: "#projects", // This should match your Projects section ID
    },
    {
        title: "About",
        path: "#about",
    },
    {
        title: "Contact",
        path: "#footer", // This should match your footer ID
    }
]

// Desktop navigation links (excludes Home since logo serves as Home)
const desktopNavLinks = [
    {
        title: "Work",
        path: "#projects", // This should match your Projects section ID
    },
    {
        title: "About",
        path: "#about",
    },
    {
        title: "Resume",
        path: "https://drive.google.com/file/d/1RA-EpjXsBmR8aATrfvKQAvfZRSxPynmr/view?usp=sharing",
    },
    {
        title: "Contact",
        path: "#footer", // This should match your footer ID
    }
]

const Navbar = () => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [isHomeActive, setIsHomeActive] = useState(false);
    const router = useRouter();

    // Check if we're at the top of the home page
    useEffect(() => {
        const checkHomeActive = () => {
            const isOnHomePage = window.location.pathname === '/';
            const isAtTop = window.scrollY < 100; // Consider "home" when near top
            setIsHomeActive(isOnHomePage && isAtTop);
        };

        checkHomeActive();
        
        // Add scroll listener
        window.addEventListener('scroll', checkHomeActive);
        window.addEventListener('load', checkHomeActive);
        
        return () => {
            window.removeEventListener('scroll', checkHomeActive);
            window.removeEventListener('load', checkHomeActive);
        };
    }, []);

    const handleLogoClick = (e) => {
        e.preventDefault();
        
        const isOnHomePage = window.location.pathname === '/';
        
        // Check if we're on the home page
        if (isOnHomePage) {
            // If on home page, just scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // If on case study page, trigger swipe animation
            setIsAnimating(true);
            
            // Create overlay element for animation
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: linear-gradient(45deg, #1a1a1a, #2d2d2d);
                z-index: 9999;
                transform: translateX(-100%);
                transition: transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
            `;
            document.body.appendChild(overlay);
            
            // Start animation
            setTimeout(() => {
                overlay.style.transform = 'translateX(0%)';
            }, 10);
            
            // Navigate after animation completes
            setTimeout(() => {
                router.push('/');
                
                // Scroll to top after navigation
                setTimeout(() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    
                    // Remove overlay after navigation
                    overlay.style.transform = 'translateX(100%)';
                    setTimeout(() => {
                        document.body.removeChild(overlay);
                        setIsAnimating(false);
                    }, 600);
                }, 100);
            }, 600);
        }
    };

  return (
    <nav className='navbar fixed sm:sticky top-0 left-0 right-0 bg-black z-50'>
      <div className='flex flex-wrap items-center justify-between mx-auto p-3 sm:px-4 lg:px-14 xl:px-20'>

        {/* Mobile View - Only Navigation Links */}
        <div className='menu w-full md:hidden' id='navbar-mobile'>
            <ul className='flex justify-between gap-1 min-[380px]:gap-4 mt-0'>
                {
                    mobileNavLinks.map((Link, index) => (
                        <motion.li 
                            key={index}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <NavLink href={Link.path} title={Link.title} />
                        </motion.li>
                    ))
                }
            </ul>
        </div>
        
        {/* Desktop View - Logo + Navigation Menu */}
        <div className='hidden md:flex items-center justify-between w-full'>
            {/* Logo */}
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.75 }}
                transition={{ duration: 0.2 }}
            >
                <Link 
                    href={"/"} 
                    onClick={handleLogoClick}
                    className={`block text-base rounded cursor-pointer transition-all duration-300 ease-in-out ${
                        isHomeActive 
                            ? 'text-purple-400 opacity-100' 
                            : 'text-white opacity-50 hover:text-purple-300 hover:opacity-80'
                    } ${isAnimating ? 'pointer-events-none opacity-70' : ''}`}
                >
                Saksham Jain
                </Link>
            </motion.div>
            
            {/* Navigation Menu */}
            <div className='menu' id='navbar-desktop'>
                <ul className='flex gap-2 space-x-8'>
                    {
                        desktopNavLinks.map((Link, index) => (
                            <motion.li 
                                key={index}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <NavLink href={Link.path} title={Link.title} />
                            </motion.li>
                        ))
                    }
                </ul>
            </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar