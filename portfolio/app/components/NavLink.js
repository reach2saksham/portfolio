"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const NavLink = ({ href, title }) => {
    const [isActive, setIsActive] = useState(false);
    const router = useRouter();

    // This effect correctly handles the active state on the home page
    useEffect(() => {
        const checkActiveSection = () => {
            if (href.startsWith('#')) {
                const sectionId = href.substring(1);
                
                if (sectionId === 'hero' || title === 'Home') {
                    setIsActive(window.location.pathname === '/' && window.scrollY < 100);
                    return;
                }
                
                const section = document.getElementById(sectionId);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    const isInView = rect.top <= 100 && rect.bottom >= 100;
                    setIsActive(isInView);
                } else {
                    setIsActive(false); // Section not on this page
                }
            } else {
                // For external links like the resume
                setIsActive(false);
            }
        };

        checkActiveSection();
        window.addEventListener('scroll', checkActiveSection, { passive: true });
        return () => window.removeEventListener('scroll', checkActiveSection);
    }, [href, title]);

    const handleClick = (e) => {
        // For external links (like resume), let the browser handle it
        if (!href.startsWith('#')) {
            return;
        }

        e.preventDefault();
        const sectionId = href.substring(1);
        const isOnHomePage = window.location.pathname === '/';

        if (isOnHomePage) {
            // If on the home page, just scroll smoothly
            const section = document.getElementById(sectionId);
            if (section) {
                let offset = 80; // Default navbar offset
                if (sectionId === 'projects') offset = 40;
                if (sectionId === 'about') offset = 10;
                if (sectionId === 'footer') offset = 30;

                const targetScrollY = window.scrollY + section.getBoundingClientRect().top - offset;
                
                window.scrollTo({
                    top: targetScrollY,
                    behavior: 'smooth'
                });
            }
        } else {
            // If on a case study page, navigate to the home page with the hash
            router.push(`/${href}`);
        }
    };

    // Use a standard <a> tag for hash links to allow onClick to manage navigation
    // and for external links. Use Next.js <Link> for internal page routes if you add them later.
    const isExternal = href.startsWith('http') || href.startsWith('https');

    return (
        <a
            href={href}
            onClick={handleClick}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className={`
                block py-2 pr-4 pl-3 rounded md:p-0 transition-all duration-300 ease-in-out cursor-pointer
                ${isActive 
                    ? 'text-purple-400 opacity-100' 
                    : 'text-white opacity-50 hover:text-purple-300 hover:opacity-80'
                }
            `}
        >
            {title}
        </a>
    );
};

export default NavLink;