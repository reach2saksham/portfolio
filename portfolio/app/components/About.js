"use client";

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <div 
    id='about'
    className='container flex flex-col justify-center items-center max-w-full px-4 pt-4 mx-auto xl:px-36 lg:px-14 sm:px-4 z-40'>
      
      <div className='relative z-40'>
        <motion.div
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 1.2,
            type: "smooth",
            opacity: { duration: 0.8 }
          }}
        >
          <Image 
            className='object-cover opacity-60 rounded-[20px] lg: lg:hover:-0 transition duration-300 z-40'
            src='/moon.avif'
            width={717}
            height={674}
            alt='Saksham Jain'
            priority
            unoptimized={true}
          />
        </motion.div>

        <motion.h1 
          className='absolute inset-0 
          flex items-center justify-center 
          text-7xl
          sm:text-8xl
          md:text-9xl 
          select-none
          good text-center text-white z-10'
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 1,
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          This is about me
        </motion.h1>
      </div>

      {/* <div className='flex justify-between w-full'>
        <Image 
            className='object-cover rounded-[20px] lg: lg:hover:-0 transition duration-300'
            src='/awardphoto.jpg'
            width={200}
            height={400}
            alt='Saksham Jain'
            priority
            unoptimized={true}
          />

          <div>
            Hi my name is Saksham Jain and I am very smart and talented please visit my linkedin to know more.
          </div>
      </div> */}

    </div>
  )
}

export default About