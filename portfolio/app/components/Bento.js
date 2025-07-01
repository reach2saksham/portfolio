"use client";
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { TypeAnimation } from 'react-type-animation';
import { Globe } from "./Globe";

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

const Bento = ({ isGlobeVisible }) => {

  const [time, setTime] = useState("");
  const [isNightTime, setIsNightTime] = useState(false);

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

      // Get 24-hour format to check if it's night time
      const hour24 = now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        hour12: false,
      });
      
      const currentHour = parseInt(hour24.split(':')[0]);
      // Night time is from 19:00 (7 PM) to 06:59 (6:59 AM)
      setIsNightTime(currentHour >= 19 || currentHour < 7);
    };

    updateTime();
    const interval = setInterval(updateTime, 10000); // Update every 10 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <div className='bento
       flex items-center justify-center 
       md:h-[600px] h-[1400px] max-w-full container 
       pt-4 mx-auto mt-2 mb-5 
       xl:px-36 lg:px-14 sm:px-4 px-2 z-30'>

      <div className='grid grid-cols-3 grid-rows-10 gap-3
         lg:grid-cols-11 md:grid-cols-12  sm:grid-rows-10
         h-full w-full px-2 pt-10
         sm:px-0 sm:pt-0'>

        <div className='col-span-3 row-span-3 z-30
          order-1 sm:order-1  
          md:col-span-5 md:row-span-10
          bg-[#0F0F0F] hover:bg-[#171717]
          border border-[#363636]/20 rounded-2xl 
          flex justify-center items-center '>

          <Image className='w-full h-full object-cover  rounded-2xl lg: lg:hover:-0 transition duration-300'
            src='/myphoto.avif'
            width={717}
            height={674}
            alt='Saksham Jain'
            priority
            unoptimized={true}
          />
        </div>


        <div className='col-span-3 row-span-2 z-30
          order-2 
          lg:col-span-6
          md:col-span-7 md:row-span-3 
          bg-[#0F0F0F] hover:bg-[#171717]
          border border-[#363636]/20 rounded-2xl 
          group
          flex flex-col justify-between'>

          <div className='text-2xl lg:text-3xl pt-3 px-5 text-[#D9D9D9] font-bold'>
            I'M <span className='group-hover:hidden'> SAKSHAM JAIN</span>

            <span className='hidden group-hover:inline-block'>
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  'SAKSHAM JAIN',
                  1500, // wait 1s before replacing "Mice" with "Hamsters"
                  '',
                  1500,
                  'Born & Raised in Sagar M.P.',
                  1500,
                  'सक्षम जैन',
                  1500,
                  'TOBI',
                  1500
                ]}
                wrapper="span"
                speed={50}
                style={{ fontSize: '1em', display: 'inline-block' }}
                repeat={Infinity}
              />
            </span>
          </div>

          <div className='text-sm leading-5 text-[#B8B8B8]
                lg:pt-0 px-5 pb-3 bentotext '>
            A strategist at heart, I have a knack for generating impactful ideas from scratch. I strive for excellence in whatever endeavour I take, be it product design, development, sports, games or even music. Whatever I take up, I ensure that it stands out as the best in its class.
          </div>

        </div>
        <div className='col-span-2 row-span-2 z-30
          order-3 md:order-4 
          md:col-span-3 lg:col-span-2 md:row-span-4 
          bg-[#543AA8] lg:bg-[#0F0F0F] lg:text-[#B8B8B8]
          lg:border border-[5px] border-[#6D4ED7]  lg:border-[#363636] lg:border-opacity-20  rounded-2xl 
          flex gap-3 
          lg:hover:bg-[#543AA8] lg:hover:border-[#6D4ED7] hover:border-[5px] lg:hover:border-[5px] lg:hover:text-[#EDE5F0] text-[#EDE5F0]'>
          <div className='flex flex-col justify-between'>
            <div className='text-2xl lg:text-3xl pt-3 px-5 font-bold text-[#D9D9D9]'>
              SKILLS
            </div>
            <div className='text-sm px-5 pb-3 flex flex-col gap-2 bentotext'>
              <p>UI/UX Design</p>
              <p>Consulting</p>
              <p>Product Management</p>
              <p>Visual & Motion Design</p>
              <p>Fullstack Development</p>
            </div>
          </div>
        </div>

        <div className='row-span-1 z-30
          lg:col-span-1 lg:row-span-2 md:col-span-2 md:row-span-2
          order-5 sm:order-5 
          bg-[#F4F0E5] lg:bg-[#0F0F0F] 
          border-[#363636] lg:border border-[3px] border-opactiy-40 lg:border-[#363636]/20  rounded-2xl 
          flex justify-center items-center 
          group
          lg:hover:bg-[#F4F0E5] lg:hover:border-[#363636] lg:hover:border-[3px] lg:hover:border-opactiy-40  '>

          <div className='flex flex-col gap-1 items-center'>
            <p className='text-3xl lg:text-4xl font-bold text-[#18181A] lg:text-[#D9D9D9] group-hover:text-[#18181A]'>20+</p>
            <p className='text-[12px] px-2 text-[#18181A] lg:text-[#B8B8B8] group-hover:text-[#18181A] leading-4 text-center bentobold'>Projects Completed</p>
          </div>
        </div>

        <div className='row-span-1 z-30
          lg:col-span-1 lg:row-span-2 md:col-span-2 md:row-span-2
          order-6 sm:order-6
          bg-[#F4F0E5] lg:bg-[#0F0F0F] 
          border-[#363636] lg:border border-[3px] border-opactiy-40 lg:border-[#363636]/20  rounded-2xl 
          flex justify-center items-center 
          group
          lg:hover:bg-[#F4F0E5] lg:hover:border-[#363636] lg:hover:border-[3px] lg:hover:border-opactiy-40  '>

          <div className='flex flex-col gap-1 items-center'>
            <p className='text-3xl lg:text-4xl font-bold text-[#18181A] lg:text-[#D9D9D9] group-hover:text-[#18181A]'>5+</p>
            <p className='text-[12px] px-2 text-[#18181A] lg:text-[#B8B8B8] group-hover:text-[#18181A] leading-4 text-center bentobold'>Work Experiences</p>
          </div>
        </div>

        <div className='col-span-2 row-span-2 z-30
          order-7 sm:order-7 
          lg:col-span-2 lg:row-span-4 md:col-span-2 md:row-span-4
          block md:hidden lg:block
          bg-[#0F0F0F] text-[#B8B8B8]
          border border-[#363636]/20  rounded-2xl
          flex flex-col justify-around items-center 
          relative overflow-hidden hover:bg-[#171717] group'>

            
          {/* Conditionally render the Globe only when its section is visible */}
          {/* {isGlobeVisible && <Globe />} */}
          <div className='flex justify-center items-center mb-4 '>
            <Image
              className='transition-all duration-500 ease-in-out lg:mt-6 xl:mt-7 group-hover:scale-125'
              src={isNightTime ? '/moon.svg' : '/sun.svg'}
              width={96}
              height={96}
              alt={isNightTime ? 'moon' : 'sun'}
            />
          </div>

          <div className='absolute bottom-3 left-1/2 transform -translate-x-1/2 text-center z-10'>
            <div className='text-xs lg:text-sm font-bold uppercase text-[#D9D9D9] mb-1'>{time}</div>
            <p className='text-xs text-[#B8B8B8] bentotext'>Currently based in </p>
            <p className='text-xs text-[#B8B8B8] bentotext'>IIT Roorkee, India</p>
          </div>
        </div>

        <div className='row-span-1 z-30
          lg:col-span-1 lg:row-span-2 md:col-span-2 md:row-span-2
          order-8 sm:order-8
          bg-[#F4F0E5] lg:bg-[#0F0F0F] 
          border-[#363636] lg:border border-[3px] border-opactiy-40 lg:border-[#363636]/20  rounded-2xl 
          flex justify-center items-center 
          group
          lg:hover:bg-[#F4F0E5] lg:hover:border-[#363636] lg:hover:border-[3px] lg:hover:border-opactiy-40  '>

          <div className='flex flex-col gap-1 items-center'>
            <p className='text-3xl lg:text-4xl font-bold text-[#18181A] lg:text-[#D9D9D9] group-hover:text-[#18181A]'>3+</p>
            <p className='text-[12px] px-2 text-[#18181A] lg:text-[#B8B8B8] group-hover:text-[#18181A] leading-4 text-center'>Years Experience</p>
          </div>
        </div>

        <div className='row-span-1 z-30
          lg:col-span-1 lg:row-span-2 md:col-span-2 md:row-span-2
          order-9 sm:order-9
          bg-[#F4F0E5] lg:bg-[#0F0F0F] 
          border-[#363636] lg:border border-[3px] border-opactiy-40 lg:border-[#363636]/20  rounded-2xl 
          flex justify-center items-center 
          group
          lg:hover:bg-[#F4F0E5] lg:hover:border-[#363636] lg:hover:border-[3px] lg:hover:border-opactiy-40  '>

          <div className='flex flex-col gap-1 items-center'>
            <p className='text-3xl lg:text-4xl font-bold text-[#18181A] lg:text-[#D9D9D9] group-hover:text-[#18181A]'>14+</p>
            <p className='text-[12px] px-2 text-[#18181A] lg:text-[#B8B8B8] group-hover:text-[#18181A] leading-4 text-center'>Awards Recieved</p>
          </div>
        </div>

        <div
          className='col-span-3 row-span-2 z-30
          order-10 sm:order-10 
          lg:col-span-6 lg:row-span-3 md:col-span-7 md:row-span-3
          bg-[#0F0F0F] hover:bg-[#171717]
          border border-[#363636]/20  rounded-2xl 
          flex gap-8 sm:gap-0 justify-center items-center group'>

          <div
            className='w-1/4 h-full 
          flex flex-col justify-end 
          text-3xl text-[#D9D9D9] font-bold
          px-5 pb-2 pt-3'>
            STACK
          </div>

          <div className='w-3/4 h-full flex flex-col justify-around pl-6 md:pl-8'>

            <div
              className='bg-[#313034]/[0.7] 
            rounded-2xl rounded-r-none 
            h-2/6 
            flex gap-2 
            px-3 py-2 
            overflow-hidden overflow-x-auto 
            scroll-smooth snap-x snap-mandatory'>
              {stack1Order.map((icon, index) => (
                <Image className='lg: lg:group-hover:-0 transition duration-300'
                  key={index}
                  src={`/STACK1/${icon}`}
                  width={50}
                  height={50}
                  alt={icon.split('.')[0]}
                />
              ))}
            </div>

            <div
              className='bg-[#313034]/[0.7] 
            rounded-2xl rounded-r-none 
            h-2/6 
            flex gap-2 
            px-3 py-2 
            overflow-hidden overflow-x-auto 
            scroll-smooth snap-x snap-mandatory'>
              <Image
                className='lg: lg:group-hover:-0 transition duration-300'
                src={`/STACK2/framer.svg`}
                width={34}
                height={50}
                alt='framer'
              />

              {stack2Order.map((icon, index) => (
                <Image
                  className='lg: lg:group-hover:-0 transition duration-300'
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