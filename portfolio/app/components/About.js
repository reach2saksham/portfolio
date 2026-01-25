"use client";

import React from 'react'
import Image from 'next/image'

const About = () => {
  return (
    <div 
      id='about'
      className='container flex flex-col justify-center items-center max-w-full px-4 pt-4 mx-auto xl:px-24 lg:px-14 sm:px-4 z-40 font-goodvibrations select-none'
    >
      <div className='relative z-40'>
        {/* Image with CSS animation */}
        <div className="animate-slide-up-fade">
          <Image 
            className='object-cover opacity-60 rounded-[20px] transition duration-300 z-40'
            src='/moon.avif'
            width={717}
            height={674}
            alt='Saksham Jain'
            priority
          />
        </div>

        {/* Heading with CSS animation */}
        <h1 
          className='absolute inset-0 
          flex items-center justify-center 
          text-7xl
          sm:text-8xl
          md:text-9xl 
          select-none
          text-center text-white z-10
          animate-slide-down-fade-delayed'
        >
          This is about me
        </h1>
      </div>

      {/* Commented out section preserved */}
      {/* <div className='flex justify-between w-full'>
        <Image 
            className='object-cover rounded-[20px] lg: lg:hover:-0 transition duration-300'
            src='/awardphoto.jpg'
            width={200}
            height={400}
            alt='Saksham Jain'
            priority
          />

          <div>
            Hi my name is Saksham Jain and I am very smart and talented please visit my linkedin to know more.
          </div>
      </div> */}
    </div>
  )
}

export default About