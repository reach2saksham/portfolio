"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';

const NavLink = ({ href, title }) => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const checkActiveSection = () => {
            // Handle hash links for sections on the same page
            if (href.startsWith('#')) {
                const sectionId = href.substring(1);
                
                // Special handling for Home button
                if (sectionId === 'hero' || title === 'Home') {
                    const isOnHomePage = window.location.pathname === '/';
                    const isAtTop = window.scrollY < 100; // Consider "home" when near top
                    setIsActive(isOnHomePage && isAtTop);
                    return;
                }
                
                // Handle other sections
                const section = document.getElementById(sectionId);
                
                if (section) {
                    const rect = section.getBoundingClientRect();
                    const isInView = rect.top <= 100 && rect.bottom >= 100;
                    setIsActive(isInView);
                }
            } else {
                // Handle regular page links
                setIsActive(window.location.pathname === href);
            }
        };

        // Check immediately
        checkActiveSection();

        // Add scroll listener for hash links
        if (href.startsWith('#')) {
            window.addEventListener('scroll', checkActiveSection);
            return () => window.removeEventListener('scroll', checkActiveSection);
        }
    }, [href, title]);

    const handleClick = (e) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            
            const sectionId = href.substring(1);
            
            // Special handling for Home button
            if (sectionId === 'hero' || title === 'Home') {
                const isOnHomePage = window.location.pathname === '/';
                
                if (isOnHomePage) {
                    // If on home page, scroll to top
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                } else {
                    // If on another page, navigate to home page
                    window.location.href = '/';
                }
                return;
            }
            
            // Handle other sections
            const section = document.getElementById(sectionId);
            
            if (section) {
                // Get the section's position
                const rect = section.getBoundingClientRect();
                const currentScrollY = window.scrollY;
                
                // Define different offsets for different sections
                let offset = 80; // Default offset for navbar height
                
                // Custom offsets for specific sections
                if (sectionId === 'projects') {
                    offset = 120; // Extra offset for projects section
                } else if (sectionId === 'about') {
                    offset = 100; // Custom offset for about section
                } else if (sectionId === 'footer') {
                    offset = 50; // Less offset for footer
                }
                
                // Calculate target scroll position
                const targetScrollY = currentScrollY + rect.top - offset;
                
                // Smooth scroll to target position
                window.scrollTo({
                    top: targetScrollY,
                    behavior: 'smooth'
                });
            }
        }
    };

    return (
        <Link
            href={href}
            onClick={handleClick}
            className={`
                block py-2 pr-4 pl-3 rounded md:p-0 transition-all duration-300 ease-in-out
                ${isActive 
                    ? 'text-purple-400 opacity-100' 
                    : 'text-white opacity-50 hover:text-purple-300 hover:opacity-80'
                }
            `}
        >
            {title}
        </Link>
    );
};

export default NavLink;