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
        const isHash = href.startsWith('#');
        const isExternal = href.startsWith('http');

        if (!isHash && !isExternal) return; // internal routes not used here

        e.preventDefault();

        // External (resume)
        if (isExternal) {
            window.open(href, '_blank', 'noopener,noreferrer');
            return;
        }

        const sectionId = href.substring(1);
        const section = document.getElementById(sectionId);

        // Robust scroll-to-bottom for footer (handles lazy content expanding)
        const scrollToBottomRobust = () => {
            const scrollBottom = () => {
                window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: 'smooth',
                });
            };

            // initial scroll
            scrollBottom();

            // keep re-scrolling while the page height changes
            let lastHeight = document.documentElement.scrollHeight;
            const target = document.documentElement; // observe doc height
            const ro = new ResizeObserver(() => {
                const newHeight = document.documentElement.scrollHeight;
                if (newHeight !== lastHeight) {
                    lastHeight = newHeight;
                    scrollBottom();
                }
            });
            ro.observe(target);

            // stop after 1500ms or when we're essentially at bottom
            const stopAt = Date.now() + 1500;
            const tick = () => {
                const atBottom =
                    Math.abs(
                        window.innerHeight + window.scrollY - document.documentElement.scrollHeight
                    ) < 4;
                if (atBottom || Date.now() > stopAt) {
                    ro.disconnect();
                    return;
                }
                requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        };

        if (sectionId === 'footer') {
            // Optional: ask the page to preload lazy sections (if you wire this up in Home)
            window.dispatchEvent(new Event('preload-sections'));
            // wait a frame for any state flips, then start robust scroll
            requestAnimationFrame(() => {
                requestAnimationFrame(scrollToBottomRobust);
            });
            return;
        }

        // Normal in-page sections
        if (section) {
            // wait 1 frame to ensure layout is stable
            requestAnimationFrame(() => {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        } else {
            // fallback: navigate (keeps hash)
            router.push(`/${href}`);
        }
    };


    // Use a standard <a> tag for hash links to allow onClick to manage navigation
    // and for external links. Use Next.js <Link> for internal page routes if you add them later.
    const isExternal = href.startsWith('http') || href.startsWith('https');

    // instead of using <a>, use <button> styled like a link
    return (
        <button
            onClick={handleClick}
            className={`
            block py-2 pr-4 pl-3 rounded md:p-0 transition-all duration-300 ease-in-out cursor-pointer
            ${isActive
                    ? 'text-purple-400 opacity-100'
                    : 'text-white opacity-50 hover:text-purple-300 hover:opacity-80'
                }
        `}
        >
            {title}
        </button>
    );

};

export default NavLink;