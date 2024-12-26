"use client";
import React, {useState} from 'react'
import Link from 'next/link'
import NavLink from './NavLink'
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/solid";
import MenuOverlay from './MenuOverlay';

const navLinks = [
    {
        title: "Work",
        path: "#work",
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
        path: "#contact",
    }
]

const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <nav className=' fixed top-0 left-0 right-0 z-10 bg-black '>
      <div className='flex flex-wrap items-center justify-between mx-auto p-5 xl:px-36'>
        <Link href={"/"} className='block sm:text-xl rounded md:p-0 hover:text-purple-300 '>Saksham Jain</Link>
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
            <ul className='flex gap-6 md:p-0 md:flex-row md:space-x-8 mt-0'>
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
