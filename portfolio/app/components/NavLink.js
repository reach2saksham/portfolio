import Link from "next/link"
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useState } from 'react'

const NavLink = ({href, title}) => {
    const router = useRouter();
    const [isAnimating, setIsAnimating] = useState(false);
    
    const handleClick = (e) => {
        e.preventDefault();
        
        if (href.startsWith('#')) {
            const targetId = href.substring(1);
            const isOnHomePage = window.location.pathname === '/';
            
            // Special handling for Contact - always try to scroll to footer on current page first
            if (title === 'Contact') {
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Footer exists on current page, scroll to it
                    const navbarHeight = 40;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    return; // Exit early, don't navigate away
                }
            }
            
            // For Saksham Jain (logo) and Work button - trigger page swipe if not on homepage
            if (title === 'Work' && !isOnHomePage) {
    // Just scroll to top of current case study page
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    return;
}
            
            // For other links or if already on home page
            const targetElement = document.getElementById(targetId);
            
            // If element exists on current page, scroll to it
            if (targetElement && isOnHomePage) {
                const navbarHeight = 40;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            } 
        }
    };

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
        >
            <Link 
                href={href} 
                onClick={handleClick}
                className={`block sm:text-base rounded md:p-0 hover:text-purple-300 transition-colors duration-200 ${
                    isAnimating ? 'pointer-events-none opacity-70' : ''
                }`}>
                {title}
            </Link>
        </motion.div>
    )
}

export default NavLink;