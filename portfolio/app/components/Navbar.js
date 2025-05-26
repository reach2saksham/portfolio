"use client";
import React, {useState} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import NavLink from './NavLink'
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/solid";
import MenuOverlay from './MenuOverlay';

const navLinks = [
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
        path: "#resume",
    },
    {
        title: "Contact",
        path: "#footer", // This should match your footer ID
    }
]

const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const router = useRouter();

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
    <nav className=' navbar
     fixed sm:sticky 
     top-0 left-0 right-0 
     z-10 
     bg-black '>

      <div className='flex flex-wrap items-center justify-between 
      mx-auto p-3 sm:px-4 lg:px-14 xl:px-36'>

        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.75 }}
            transition={{ duration: 0.2 }}
        >
            <Link 
                href={"/"} 
                onClick={handleLogoClick}
                className={`block sm:text-base rounded md:p-0 hover:text-purple-300 cursor-pointer transition-colors duration-200 ${
                    isAnimating ? 'pointer-events-none opacity-70' : ''
                }`}
            >
            Saksham Jain
            </Link>
        </motion.div>
        
        <div className='mobile-menu block md:hidden'>
            {
                navbarOpen ? (
                    <motion.button 
                        onClick={() => setNavbarOpen(false)} 
                        className=' flex items-center hover:text-white text-slate-200'
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <XMarkIcon className='h-5 w-5' />
                    </motion.button>
                    
                ) : (
                    <motion.button 
                        onClick={() => setNavbarOpen(true)} 
                        className=' flex items-center hover:text-white hover:border-white text-slate-200'
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Bars3Icon className='h-5 w-5' />
                    </motion.button>
                )
            }
        </div>
        <div className='menu hidden md:block md:w-auto' id='navbar'>
            <ul className='flex gap-2 md:p-0 md:flex-row md:space-x-8 mt-0'>
                {
                    navLinks.map((Link, index) => (
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
      {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
    </nav>
  )
}

export default Navbar