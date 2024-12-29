"use client";
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { TypeAnimation } from 'react-type-animation';

const stack1Order = [
  'figma.svg',
  'css3.svg',
  'js.svg',
  'c++.svg',
  'reactjs.svg',
  'Frame15.svg',
  'bootstrap4.svg',
  'mongodb.svg',
  'mysql.svg',
  'nodejs.svg'
];

const stack2Order = [
  'figma.svg',
  'adobe.svg',
  'ai.svg',
  'canva.svg',
  'linux.svg',
  'git.svg',
  'github.svg',
  'miro.svg'
];

const Bento = () => {

  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istTime = now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setTime(istTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 10000); // Update every minute

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <div className='bento
       flex items-center justify-center 
       md:h-[600px] h-[1400px] max-w-full container 
       pt-4 mx-auto 
       xl:px-36 lg:px-14 sm:px-4'>

      <div className='grid grid-cols-3 grid-rows-10 gap-2
         md:grid-cols-11  sm:grid-rows-10
         h-full w-full px-2 pt-10
         sm:px-0 sm:pt-0'>

        <div className='col-span-3 row-span-3
          order-1 sm:order-1  
          md:col-span-5 md:row-span-10
          bg-[#171717] 
          border border-[#363636]/20 rounded-3xl 
          flex justify-center items-center '>

          <Image className='w-full h-full object-cover  rounded-3xl lg:grayscale lg:hover:grayscale-0 transition duration-300'
            src='/myphoto.png'
            width={717}
            height={674}
            alt='Saksham Jain'
            priority
            unoptimized={true}
          />
        </div>

        <div className='col-span-1 row-span-2
          order-4 md:order-2 
          md:col-span-1 md:row-span-7 
          bg-[#0F0F0F] 
          rounded-3xl 
          flex justify-center items-center'>

          <Image className='w-full h-full object-cover rounded-3xl'
            src='/Banner.png'
            width={1660}
            height={800}
            alt='Small Banner'
            priority
            unoptimized={true}
          />
        </div>
        <div className='col-span-3 row-span-2
          order-2 
          md:col-span-5 md:row-span-3 
          bg-[#0F0F0F] 
          border border-[#363636]/20 rounded-3xl 
          group
          flex flex-col justify-between'>

          <div className='text-3xl pt-3 px-5 text-[#D9D9D9] font-bold'>
            I&apos;M <span className='group-hover:hidden'> SAKSHAM JAIN</span>
              
            <span className='hidden group-hover:inline-block'>
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  'SAKSHAM JAIN',
                  2000, // wait 1s before replacing "Mice" with "Hamsters"
                  '',
                  2000,
                  'सक्षम जैन',
                  2000,
                  'TOBI',
                  2000
                ]}
                wrapper="span"
                speed={50}
                style={{ fontSize: '1em', display: 'inline-block' }}
                repeat={Infinity}
              />
            </span>
          </div>

          <div className='text-xs leading-5 text-[#B8B8B8]
                lg:pt-0 px-5 pb-3  '>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro et excepturi rem quos, est nostrum deleniti sit repudiandae voluptate optio minima nobis voluptas in ex omnis enim ducimus saepe possimus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab iste blanditiis, itaque eveniet delectus beatae reprehenderit unde temporibus sunt soluta!
          </div>

        </div>
        <div className='col-span-2 row-span-2
          order-3 md:order-4 
          md:col-span-2 md:row-span-4 
          bg-[#543AA8] lg:bg-[#0F0F0F] lg:text-[#B8B8B8]
          lg:border border-[5px] border-[#6D4ED7]  lg:border-[#363636] lg:border-opacity-20  rounded-3xl 
          flex gap-3 
          lg:hover:bg-[#543AA8] lg:hover:border-[#6D4ED7] hover:border-[5px] lg:hover:border-[5px] lg:hover:text-[#EDE5F0] text-[#EDE5F0]'>
          <div className='flex flex-col justify-between'>
            <div className='text-3xl pt-3 px-5 font-bold text-[#D9D9D9]'>
              SKILLS
            </div>
            <div className='text-sm px-5 pb-3 flex flex-col gap-2'>
              <p>UI/UX Design</p>
              <p>Full Stack Development</p>
              <p>Logo Design</p>
              <p>Finance</p>
              <p>Case Studies</p>
            </div>
          </div>
        </div>

        <div className='row-span-1
          lg:col-span-1 lg:row-span-2 md:col-span-1 md:row-span-2
          order-5 sm:order-5 
          bg-[#F4F0E5] lg:bg-[#0F0F0F] 
          border-[#363636] lg:border border-[3px] border-opactiy-40 lg:border-[#363636]/20  rounded-3xl 
          flex justify-center items-center 
          group
          lg:hover:bg-[#F4F0E5] lg:hover:border-[#363636] lg:hover:border-[3px] lg:hover:border-opactiy-40  '>

          <div className='flex flex-col gap-1 items-center'>
            <p className='text-4xl font-bold text-[#18181A] lg:text-[#D9D9D9] group-hover:text-[#18181A]'>10+</p>
            <p className='text-[12px] px-2 text-[#18181A] lg:text-[#B8B8B8] group-hover:text-[#18181A] leading-4 text-center'>Projects Completed</p>
          </div>
        </div>

        <div className='row-span-1
          lg:col-span-1 lg:row-span-2 md:col-span-1 md:row-span-2
          order-6 sm:order-6
          bg-[#F4F0E5] lg:bg-[#0F0F0F] 
          border-[#363636] lg:border border-[3px] border-opactiy-40 lg:border-[#363636]/20  rounded-3xl 
          flex justify-center items-center 
          group
          lg:hover:bg-[#F4F0E5] lg:hover:border-[#363636] lg:hover:border-[3px] lg:hover:border-opactiy-40  '>

          <div className='flex flex-col gap-1 items-center'>
            <p className='text-4xl font-bold text-[#18181A] lg:text-[#D9D9D9] group-hover:text-[#18181A]'>5+</p>
            <p className='text-[12px] px-2 text-[#18181A] lg:text-[#B8B8B8] group-hover:text-[#18181A] leading-4 text-center'>Work Experiences</p>
          </div>
        </div>

        <div className='col-span-1 row-span-2
          order-7 sm:order-7 
          lg:col-span-1 lg:row-span-4 md:col-span-1 md:row-span-4 
          bg-[#0F0F0F] text-[#B8B8B8]
          border border-[#363636]/20  rounded-3xl 
          flex flex-col justify-between items-center'>
          <div className='text-3xl pt-3 px-5 text-[#D9D9D9] font-bold text-transform: uppercase'>{time}</div>

          <Image
            src='/sun.svg'
            width={72}
            height={72}
            alt='sun' />

          <p className='text-[12px] px-5 pb-3 leading-4 '>Currently based in IIT Roorkee</p>
        </div>

        <div className='row-span-1
          lg:col-span-1 lg:row-span-2 md:col-span-1 md:row-span-2
          order-8 sm:order-8
          bg-[#F4F0E5] lg:bg-[#0F0F0F] 
          border-[#363636] lg:border border-[3px] border-opactiy-40 lg:border-[#363636]/20  rounded-3xl 
          flex justify-center items-center 
          group
          lg:hover:bg-[#F4F0E5] lg:hover:border-[#363636] lg:hover:border-[3px] lg:hover:border-opactiy-40  '>

          <div className='flex flex-col gap-1 items-center'>
            <p className='text-4xl font-bold text-[#18181A] lg:text-[#D9D9D9] group-hover:text-[#18181A]'>3+</p>
            <p className='text-[12px] px-2 text-[#18181A] lg:text-[#B8B8B8] group-hover:text-[#18181A] leading-4 text-center'>Years Experience</p>
          </div>
        </div>

        <div className='row-span-1
          lg:col-span-1 lg:row-span-2 md:col-span-1 md:row-span-2
          order-9 sm:order-9
          bg-[#F4F0E5] lg:bg-[#0F0F0F] 
          border-[#363636] lg:border border-[3px] border-opactiy-40 lg:border-[#363636]/20  rounded-3xl 
          flex justify-center items-center 
          group
          lg:hover:bg-[#F4F0E5] lg:hover:border-[#363636] lg:hover:border-[3px] lg:hover:border-opactiy-40  '>

          <div className='flex flex-col gap-1 items-center'>
            <p className='text-4xl font-bold text-[#18181A] lg:text-[#D9D9D9] group-hover:text-[#18181A]'>10+</p>
            <p className='text-[12px] px-2 text-[#18181A] lg:text-[#B8B8B8] group-hover:text-[#18181A] leading-4 text-center'>Projects Completed</p>
          </div>
        </div>

        <div className='col-span-3 row-span-2
          order-10 sm:order-10 
          lg:col-span-6 lg:row-span-3 md:col-span-6 md:row-span-3
          bg-[#0F0F0F] 
          border border-[#363636]/20  rounded-3xl 
          flex gap-8 sm:gap-0 justify-center items-center group'>

          <div className='w-1/4 px-5 pb-2 h-full flex flex-col justify-end text-3xl pt-3 text-[#D9D9D9] font-bold '>
            STACK
          </div>

          <div className='w-3/4 h-full flex flex-col justify-around'>

            <div className='bg-[#313034]/[0.7] rounded-xl rounded-r-none h-2/6 flex gap-2 px-3 py-2 overflow-hidden overflow-x-auto scroll-smooth snap-x snap-mandatory'>
              {stack1Order.map((icon, index) => (
                <Image className='lg:grayscale lg:group-hover:grayscale-0 transition duration-300'
                  key={index}
                  src={`/STACK1/${icon}`}
                  width={50}
                  height={50}
                  alt={icon.split('.')[0]}
                />
              ))}
            </div>

            <div className='bg-[#313034]/[0.7] rounded-xl rounded-r-none h-2/6 flex gap-2 px-3 py-2 overflow-hidden overflow-x-auto scroll-smooth snap-x snap-mandatory'>
              <Image
                className='lg:grayscale lg:group-hover:grayscale-0 transition duration-300'
                src={`/STACK2/framer.svg`}
                width={34}
                height={50}
                alt='framer'
              />

              {stack2Order.map((icon, index) => (
                <Image
                  className='lg:grayscale lg:group-hover:grayscale-0 transition duration-300'
                  key={index}
                  src={`/STACK2/${icon}`}
                  width={50}
                  height={50}
                  alt={icon.split('.')[0]}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Bento
