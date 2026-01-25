"use client";
import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import NavLink from './NavLink'

// Mobile navigation links (includes Home)
const mobileNavLinks = [
    {
        title: "Home",
        path: "#hero",
    },
    {
        title: "Work",
        path: "#projects",
    },
    {
        title: "About",
        path: "#about",
    },
    {
        title: "Contact",
        path: "#footer",
    }
]

// Desktop navigation links (excludes Home since logo serves as Home)
const desktopNavLinks = [
    {
        title: "Work",
        path: "#projects",
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
        path: "#footer",
    }
]

const Navbar = () => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [isHomeActive, setIsHomeActive] = useState(false);
    const router = useRouter();

    // Debounced scroll handler for better performance
    useEffect(() => {
        let scrollTimeout;
        
        const checkHomeActive = () => {
            const isOnHomePage = window.location.pathname === '/';
            const isAtTop = window.scrollY < 100;
            setIsHomeActive(isOnHomePage && isAtTop);
        };

        const handleScroll = () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(checkHomeActive, 50);
        };

        checkHomeActive();
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('load', checkHomeActive);
        
        return () => {
            clearTimeout(scrollTimeout);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('load', checkHomeActive);
        };
    }, []);

    const handleLogoClick = (e) => {
        e.preventDefault();
        
        const isOnHomePage = window.location.pathname === '/';
        
        if (isOnHomePage) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            setIsAnimating(true);
            
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
            
            setTimeout(() => {
                overlay.style.transform = 'translateX(0%)';
            }, 10);
            
            setTimeout(() => {
                router.push('/');
                
                setTimeout(() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    
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
    <nav className='fixed sm:sticky top-0 left-0 right-0 bg-black z-50 font-sans font-medium'>
      <div className='flex flex-wrap items-center justify-between mx-auto p-3 sm:px-4 lg:px-14 xl:px-24'>

        {/* Mobile View - Only Navigation Links */}
        <div className='menu w-full md:hidden' id='navbar-mobile'>
            <ul className='flex justify-between gap-1 min-[380px]:gap-4 mt-0'>
                {
                    mobileNavLinks.map((Link, index) => (
                        <li 
                            key={index}
                            className="animate-fade-in-nav"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <NavLink href={Link.path} title={Link.title} />
                        </li>
                    ))
                }
            </ul>
        </div>
        
        {/* Desktop View - Logo + Navigation Menu */}
        <div className='hidden md:flex items-center justify-between w-full'>
            {/* Logo with CSS hover effect */}
            <div className="logo-container">
                <Link 
                    href={"/"} 
                    onClick={handleLogoClick}
                    className={`block text-base rounded cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 ${
                        isHomeActive 
                            ? 'text-purple-400 opacity-100' 
                            : 'text-white opacity-50 hover:text-purple-300 hover:opacity-80'
                    } ${isAnimating ? 'pointer-events-none opacity-70' : ''}`}
                >
                Saksham Jain
                </Link>
            </div>
            
            {/* Navigation Menu */}
            <div className='menu' id='navbar-desktop'>
                <ul className='flex gap-2 space-x-8'>
                    {
                        desktopNavLinks.map((Link, index) => (
                            <li 
                                key={index}
                                className="animate-fade-in-nav"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <NavLink href={Link.path} title={Link.title} />
                            </li>
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