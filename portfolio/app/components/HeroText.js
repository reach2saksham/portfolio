import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

const HeroText = () => {
  const [isHovered, setIsHovered] = useState(false);


  return (
    <div className="w-full flex flex-wrap items-center pt-6 md:pt-2 text-white text-lg font-medium gap-2 herointro">
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
            className={`w-full h-full object-cover transition-all duration-300 ease-in-out ${isHovered ? 'scale-125 -rotate-12' : 'scale-100 rotate-0'
              }`}
          />
        </div>

        {/* Waving emoji with framer motion */}
        <motion.div
          className="absolute -top-2 -right-2 text-2xl origin-bottom-left pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            rotate: isHovered ? [0, 20, -10, 15, -5, 0, 0] : 0,
          }}
          transition={{
            opacity: { duration: 0.3, ease: "easeInOut" },
            rotate: {
              duration: 1.5,
              ease: "easeInOut",
              repeat: isHovered ? Infinity : 0,
              repeatType: "loop",
              times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1]
            }
          }}
        >
          👋
        </motion.div>
      </div>

      <div className='flex items-center gap-4 flex-wrap herointro text-lg'>
        <p className='hidden lg:block'>Press &lsquo;</p>
        <p className='herointrobold hidden -mx-2 lg:block md:text-xl bg-gradient-to-b from-[#DE5971] to-[#FF00C1] bg-clip-text text-transparent '>M</p>
        <p className='hidden lg:block'>&rsquo; key to schedule a&nbsp;</p>
        <p className='herointrobold hidden -mx-2 lg:block md:text-xl bg-gradient-to-b from-[#DE5971] to-[#FF00C1] bg-clip-text text-transparent '>Meeting</p>
        <p className='hidden lg:block'>&nbsp;with me!</p>

        {/* Mobile text with Resume button */}
        <div className='block lg:hidden flex flex-col gap-3'>
          <p>Currently a undergrad student at IIT Roorkee</p>

        </div>
         <a
        href="https://drive.google.com/your-resume-link" // Replace with your actual Drive link
        target="_blank"
        rel="noopener noreferrer"
        className="block md:hidden tags px-4 py-2 text-sm  rounded-full bg-gradient-to-r from-[#f020df] to-[#FF00C1] text-purple-950 shadow-lg transform transition duration-300 ease-in-out hover:scale-105"
      >
        View Resume
      </a>  
      </div>
    </div>
  );
};

export default HeroText;