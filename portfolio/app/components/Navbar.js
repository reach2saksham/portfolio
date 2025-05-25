"use client";
import React, {useState} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
    const router = useRouter();

    const handleLogoClick = (e) => {
        e.preventDefault();
        
        // Check if we're on the home page
        if (window.location.pathname === '/') {
            // If on home page, just scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // If on another page, navigate to home with slide transition to the right
            document.body.classList.add('transitioning');
            document.body.style.transform = 'translateX(100%)';
            
            setTimeout(() => {
                router.push('/');
            }, 300);
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

        <Link 
            href={"/"} 
            onClick={handleLogoClick}
            className='block sm:text-base rounded md:p-0 hover:text-purple-300 cursor-pointer'
        >
        Saksham Jain
        </Link>
        
        <div className='mobile-menu block md:hidden'>
            {
                navbarOpen ? (
                    <button onClick={() => setNavbarOpen(false)} className=' flex items-center hover:text-white text-slate-200'><XMarkIcon className='h-5 w-5' /></button>
                    
                ) : (
                    <button onClick={() => setNavbarOpen(true)} className=' flex items-center hover:text-white hover:border-white text-slate-200'><Bars3Icon className='h-5 w-5' /></button>
                )
            }
        </div>
        <div className='menu hidden md:block md:w-auto' id='navbar'>
            <ul className='flex gap-2 md:p-0 md:flex-row md:space-x-8 mt-0'>
                {
                    navLinks.map((Link, index) => (
                        <li key = {index}>
                            <NavLink href={Link.path} title={Link.title} />
                        </li>
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