import React from 'react'
import Image from 'next/image'

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
  

const Testing = () => {
  return (
    <div>
      <div className="col-span-3 order-10 lg:order-10 sm:col-span-2 md:col-span-2 lg:col-span-6 row-span-2 lg:row-span-3 bg-[#0F0F0F] border border-[#363636]/20 rounded-3xl flex flex-col sm:flex-row justify-center items-center group">
  <div className="w-full sm:w-1/4 px-2 pb-2 sm:pb-0 h-auto sm:h-full flex flex-col justify-end text-xl sm:text-3xl pt-2 sm:pt-3 text-[#B8B8B8] font-bold text-center sm:text-left">
    STACK
  </div>
  <div className="w-full sm:w-3/4 h-auto sm:h-full flex flex-col justify-around gap-3">
    <div className="bg-[#313034]/[0.7] rounded-xl sm:rounded-r-none h-auto sm:h-2/6 flex gap-2 px-2 sm:px-3 py-2 flex-wrap">
      {stack1Order.map((icon, index) => (
        <Image
          key={index}
          className="w-10 h-10 sm:w-12 sm:h-12 grayscale group-hover:grayscale-0 transition duration-300"
          src={`/STACK1/${icon}`}
          width={50}
          height={50}
          alt={icon.split('.')[0]}
        />
      ))}
    </div>
    <div className="bg-[#313034]/[0.7] rounded-xl sm:rounded-r-none h-auto sm:h-2/6 flex gap-2 px-2 sm:px-3 py-2 flex-wrap">
      <Image
        className="w-8 h-8 sm:w-10 sm:h-10 grayscale group-hover:grayscale-0 transition duration-300"
        src={`/STACK2/framer.svg`}
        width={34}
        height={50}
        alt="framer"
      />
      {stack2Order.map((icon, index) => (
        <Image
          key={index}
          className="w-10 h-10 sm:w-12 sm:h-12 grayscale group-hover:grayscale-0 transition duration-300"
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
  )
}

export default Testing
