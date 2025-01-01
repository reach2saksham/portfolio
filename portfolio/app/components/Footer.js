"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const social = [
  { icon: "1.svg", link: "https://www.linkedin.com/in/sakshamjainiitr/" },
  { icon: "2.svg", link: "https://www.instagram.com/saksham.tombraider/" },
  { icon: "3.svg", link: "https://medium.com/@reach2saksham" },
  { icon: "4.svg", link: "https://dribbble.com/reach2saksham" },
  { icon: "5.svg", link: "https://www.behance.net/sakshamjainiitr" },
  { icon: "6.svg", link: "https://github.com/reach2saksham" },
  { icon: "7.svg", link: "https://www.facebook.com/SamTR4x4/" },
  { icon: "8.svg", link: "https://x.com/sakshamjainiitr" },
  { icon: "9.svg", link: "https://www.youtube.com/@sakshamjainiitr" },
  { icon: "10.svg", link: "saksham_j@ar.iitr.ac.in" },
  { icon: "11.svg", link: "+91 7067195363" },
];

const Footer = () => {
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
    <div className="container max-w-full py-6 px-6 mx-auto xl:px-36 lg:px-14 sm:px-4">
      <div className="flex flex-col gap-4 justify-center items-center">
        <div className="foothead text-6xl pt-8 text-center text-transform: uppercase w-full md:w-[55%]">
          Contact me to create fun things together
        </div>
        <div className="grid w-full md:w-[45%] grid-cols-2 grid-rows-6 gap-4 pt-4">
          <input
            type="text"
            placeholder="Name"
            className=" col-span-2 md:col-span-1 row-span-1 p-3 rounded-md text-white placeholder-[#646464] bg-[#131313] border border-[#363636]/20 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            className=" col-span-2 md:col-span-1 row-span-1 p-3 rounded-md text-white placeholder-[#646464] bg-[#131313] border border-[#363636]/20 focus:outline-none"
          />
          <textarea
            placeholder="Message"
            className=" col-span-2 row-span-3 p-3 rounded-md text-white placeholder-[#646464] bg-[#131313] border border-[#363636]/20 focus:outline-none"
          ></textarea>
          <button className=" col-span-2 row-span-1 p-3 rounded-md text-black bg-white text-center font-semibold">
            Send your message
          </button>
        </div>
      </div>
      <div className="footer flex flex-col md:flex-row gap-4 md:justify-between pt-6 md:pt-4">
        <div className="flex gap-6">
          <div className="flex flex-col gap-3">
            <div className="text-[#646464] text-sm">VERSION</div>
            <div className="text-base">2025©Edition</div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-[#646464] text-sm">LOCAL TIME</div>
            <div className="text-transform: uppercase text-base">{time} IST</div>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-4">
            <div className="text-[#646464] text-sm">SOCIAL MEDIA</div>
            <div className="flex flex-wrap w-4/5 md:w-full gap-5 md:gap-6">
              {social.map((item, index) => (
                <a key={index} href={item.link} target="_blank" rel="noopener noreferrer">
                  <Image
                    className="lg:grayscale lg:group-hover:grayscale-0 transition duration-300"
                    src={`/social/${item.icon}`}
                    width={18}
                    height={18}
                    alt={item.icon.split(".")[0]}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
