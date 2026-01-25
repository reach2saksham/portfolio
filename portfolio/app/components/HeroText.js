import Image from 'next/image';
import { useState } from 'react';

const HeroText = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full flex flex-wrap items-center pt-4 text-white text-lg font-sans font-thin tracking-tight gap-2 select-none">
      <span>Hi, I&apos;m Saksham Jain</span>

      <div
        className="relative cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-14 h-8 rounded-full overflow-hidden">
          <Image
            src="/introphoto.avif"
            alt="Saksham Jain"
            width={64}
            height={64}
            className={`w-full h-full object-cover transition-all duration-300 ease-in-out ${
              isHovered ? 'scale-125 -rotate-12' : 'scale-100 rotate-0'
            }`}
          />
        </div>

        {/* Waving emoji with CSS animation */}
        <div
          className={`absolute -top-2 -right-2 text-2xl origin-bottom-left pointer-events-none transition-opacity duration-200 ${
            isHovered ? 'opacity-100 animate-wave' : 'opacity-0'
          }`}
        >
          👋
        </div>
      </div>

      <a className='block lg:hidden' target="_blank" href="https://www.linkedin.com/in/sakshamjainiitr/">
        <Image
          className="sm:grayscale sm:hover:grayscale-0 ml-2 hover:scale-[115%] transition duration-300"
          src='/linkedin.svg'
          width={30}
          height={30}
          draggable={false}
          alt='LinkedIn Icon'
        />
      </a>

      <div className='flex items-center gap-4 flex-wrap herointro text-lg'>
        <p className='hidden lg:block'>Press </p>
        <a href='https://calendly.com/sakshamjainiitr' target='_blank' className='herointrobold hidden -mx-2 lg:block md:text-xl bg-gradient-to-b from-[#DE5971] to-[#FF00C1] bg-clip-text text-transparent hover:scale-110 '>&lsquo; M &rsquo;</a>
        <p className='hidden lg:block'> key to schedule a</p>
        <a href='https://calendly.com/sakshamjainiitr' target='_blank' className='herointrobold hidden -mx-2 lg:block md:text-xl bg-gradient-to-b from-[#DE5971] to-[#FF00C1] bg-clip-text text-transparent hover:scale-105'>Meeting</a>
        <p className='hidden lg:block'>with me!</p>
        <a className='hidden lg:block' target="_blank" href="https://www.linkedin.com/in/sakshamjainiitr/">
          <Image
            className="sm:grayscale sm:hover:grayscale-0 hover:scale-[135%] transition duration-300"
            src='/linkedin.svg'
            width={28}
            height={28}
            alt='LinkedIn Icon'
          />
        </a>

        {/* Mobile text with Resume button */}
        <div className='block lg:hidden flex flex-col gap-3'>
          <p>Currently a undergrad student at IIT Roorkee</p>
        </div>

        <a
          href="https://drive.google.com/file/d/1FlUNdu_kKrjWGUyURgATFx2ihJzsD4Q6/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="block md:hidden tags px-4 py-2 text-sm rounded-full bg-gradient-to-r from-[#f020df] to-[#FF00C1] text-violet-950 font-semibold shadow-lg transform transition duration-300 ease-in-out hover:scale-105"
        >
          View Resume
        </a>
      </div>
    </div>
  );
};

export default HeroText;