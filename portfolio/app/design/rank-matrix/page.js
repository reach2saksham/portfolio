"use client";
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Image from 'next/image';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import BlurImage from '@/app/components/BlurImage';
import ExpandImage from '@/app/components/ExpandImage';

const caseStudy = {
  industry: 'Education',
  techStack: {
    'Design Tool for UI': ['figma'],
    'Anmation Tools': ['figma', 'lotte'],
  },
  // Tech stack names for tooltips
  techStackNames: {
    'figma': 'Figma',
    'lotte': 'Lotte Files Creator',
  },
  companyName: 'RANK MATRIX',
  period: 'April 2024',
  domain: 'ADAPTIVE UI DESIGN',
  description: `Rank Matrix is a web app designed to simplify the college selection process for JEE aspirants. Instead of sifting through multiple rounds of counseling data, students can instantly view their best admission chances based on the final seat matrix. The platform features a clean, intuitive UI/UX, smooth loading animations, and full accessibility with both light and dark mode support.`,
  sections: ['Overview', 'Highlights', 'Font/Colour/Brand', 'Loading Animation', 'User Interfaces'],
  role: ['UI Designer', 'Motion Designer', 'Graphic Designer'],
  collaborators: ['Nikhil Nagar'],
  deliverables: ['User Interfaces', 'Light & Dark Mode', 'Loading Animations'],
  timelineStatus: ['Completed'],
  links: {
    liveProduct: 'https://rankmatrix.in/',
    // figmaFile: 'https://figma.com',
  },
  thewhat: `I was initially tasked with creating a loading animation, which later had to be delivered in JSON format. Next deliverables were light & dark mode UIs, structured as objects of JavaScript. Finally, SVG files were needed for graphics used across the website.`,
  thewhy: `For a platform built with accessibility in mind, the goal was to ensure a seamless transition from design files to development-ready assets.`,
  thehow: `All prototyping and ideation began on Figma, including the initial loading animation. To create optimized animations in JSON format, I turned to LottieFiles Creator, despite some limitations that required revising the original animation. Ultimately, the UI screens and graphics were also built on Figma, all with a single goal in mind: ensuring the web app embodied simplicity.`,
};

const Page = () => {
  const [selectedSection, setSelectedSection] = React.useState(0);
  const [activeMode, setActiveMode] = useState('dark');

  // Helper function to check if links exist
  const hasLinks = caseStudy.links && (caseStudy.links.liveProduct || caseStudy.links.figmaFile);

  return (
    <main
      id='overview'
      className="flex min-h-screen flex-col mx-auto max-w-screen-2xl]">
      <Navbar />
      <div
        className="projects container max-w-full pt-4 sm:mt-0 mx-auto px-4 xl:px-36 lg:px-14 sm:px-4">
        {/* Header Section */}
        <div
          className="flex flex-wrap lg:flex-nowrap flex-col lg:flex-row-reverse">
          <div className="w-full h-[32vh] sm:h-auto lg:w-3/4 pb-4 lg:pb-0">
            <video
              src="/design/rank-matrix/loader1.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover sm:object-none sm:h-auto"
            />
          </div>
          <div className="flex flex-col w-full lg:w-1/4 border-b border-[#808080] border-opacity-40">
            {caseStudy.industry && (
              <>
                <div
                  className="sfpro text-sm text-[#646464] tracking-wider">INDUSTRY</div>
                <div className="casetags text-sm pt-2 pb-2 text-white tracking-wider border-b border-gray-500 border-opacity-40">
                  {caseStudy.industry}
                </div>
              </>
            )}
            {caseStudy.techStack && Object.keys(caseStudy.techStack).length > 0 && (
              <>
                <div className="sfpro text-sm text-[#646464] pt-4 pb-2 tracking-wider">TECH STACK</div>
                {Object.entries(caseStudy.techStack).map(([category, icons], index) => (
                  <div key={index} className="casetags text-sm">
                    <div className="pt-2">{category}</div>
                    <div className="flex gap-4 flex-wrap justify-start py-3 border-gray-500">
                      {icons.map((icon, idx) => (
                        <div key={idx} className="relative flex items-center justify-center w-12 h-12 group">
                          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#565656]"></div>
                          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#565656]"></div>
                          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#565656]"></div>
                          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#565656]"></div>

                          {/* Tooltip */}
                          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                            {caseStudy.techStackNames[icon] || icon}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                          </div>

                          <Image
                            className="transition duration-300 group-hover:scale-110"
                            src={`/STACK2/${icon}.svg`}
                            width={icon === 'framer' ? 25 : 40}
                            height={icon === 'framer' ? 25 : 40}
                            alt={icon}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Main Content with Sticky Sidebar */}
        <div className="flex flex-col lg:flex-row pt-6 min-h-screen">
          {/* Sidebar */}
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 lg:sticky lg:top-[70px] lg:self-start lg:max-h-[calc(100vh-70px)] lg:overflow-y-auto">
            <div className="flex flex-col w-full hidden lg:block">
              {caseStudy.companyName && (
                <div className="company text-5xl">{caseStudy.companyName}</div>
              )}
              {caseStudy.period && (
                <div className="casetags text-sm">{caseStudy.period}</div>
              )}
              {caseStudy.domain && (
                <div className="sfpro text-sm pt-7 text-[#646464] tracking-wider">{caseStudy.domain}</div>
              )}
              {caseStudy.sections && caseStudy.sections.length > 0 && (
                <div className="casetags text-base py-4">
                  {caseStudy.sections.map((section, index) => {
                    const sectionIds = {
                      'Overview': 'overview',
                      'Highlights': 'highlights',
                      'Font/Colour/Brand': 'logos',
                      'Loading Animation': 'loading',
                      'User Interfaces': 'screens',
                    };

                    return (
                      <button
                        key={index}
                        className={`py-1 flex flex-col rounded transition-colors text-left ${selectedSection === index ? 'text-white' : 'text-[#646464]'
                          }`}
                        onClick={() => {
                          setSelectedSection(index);
                          const element = document.getElementById(sectionIds[section]);
                          if (element) {
                            element.scrollIntoView({
                              behavior: 'smooth',
                              block: 'start'
                            });
                          }
                        }}
                      >
                        {section}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex flex-col w-full lg:w-3/4 pt-2 lg:pt-0">
            {caseStudy.description && (
              <div className="casetags pt-2 lg:pt-0">{caseStudy.description}</div>
            )}

            <div className="pt-6 grid grid-cols-2 gap-x-4 gap-y-6 md:flex md:flex-wrap md:justify-between">
              {[
                ['ROLES', caseStudy.role],
                ['COLLABORATORS', caseStudy.collaborators],
                ['DELIVERABLES', caseStudy.deliverables],
                ['TIMELINE & STATUS', caseStudy.timelineStatus],
              ]
                .filter(([_, items]) => items && items.length > 0)
                .map(([title, items], idx) => (
                  <div key={idx} className="flex flex-col gap-1 w-fit">
                    <div className="sfpro text-sm text-[#646464] tracking-wider">{title}</div>
                    <div className="pt-1">
                      {items.map((item, i) => (
                        <div key={i} className="casetags w-fit text-sm">{item}</div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>


            {/* Links Section - Only show if links exist */}
            {hasLinks && (
              <div className="pt-8 sm:pt-6 flex gap-4">
                {caseStudy.links.liveProduct && (
                  <a
                    href={caseStudy.links.liveProduct}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sm:w-1/2 w-full bg-[#131313] flex items-start justify-between p-4 rounded-md border-[#363636] border-opacity-20 text-[#BBBBBB] text-xs"
                  >
                    <p>LIVE PRODUCT</p>
                    <ChevronRightIcon className="h-4 w-4 text-[#BBBBBB]" />
                  </a>
                )}
                {caseStudy.links.figmaFile && (
                  <a
                    href={caseStudy.links.figmaFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${caseStudy.links.liveProduct ? 'w-1/2' : 'w-full'} bg-[#131313] flex items-start justify-between p-4 rounded-md border-[#363636] border-opacity-20 text-[#BBBBBB] text-xs`}
                  >
                    <p>CHECK IT IN FIGMA</p>
                    <ChevronRightIcon className="h-4 w-4 text-[#BBBBBB]" />
                  </a>
                )}
              </div>
            )}

            {/* What, Why, How Section */}
            <div className="mt-16 flex flex-col gap-12 mb-12">
              {caseStudy.thewhat && (
                <div className="lg:flex-row lg:gap-36 flex flex-col">
                  <p className="lg:w-32 lg:flex-shrink-0 font-semibold tags">THE WHAT</p>
                  <div className="pt-4 lg:pt-0">{caseStudy.thewhat}</div>
                </div>
              )}
              {caseStudy.thewhy && (
                <div className="lg:flex-row lg:gap-36 flex flex-col">
                  <p className="lg:w-32 lg:flex-shrink-0 font-semibold tags">THE WHY</p>
                  <div className="pt-4 lg:pt-0">{caseStudy.thewhy}</div>
                </div>
              )}
              {caseStudy.thehow && (
                <div className="lg:flex-row lg:gap-36 flex flex-col">
                  <p className="lg:w-32 lg:flex-shrink-0 font-semibold tags">THE HOW</p>
                  <div className="pt-4 lg:pt-0">{caseStudy.thehow}</div>
                </div>
              )}
            </div>

            <div
              id='highlights'
              className='company text-3xl pt-12 mb-2'>
              THE HIGHLIGHTS
            </div>


            <div className="flex flex-col gap-2 items-center md:flex-row">
              <ExpandImage className='object-cover'
                src='/design/rank-matrix/mockup2.avif'
                width={279}
                height={100}
                alt='Small Banner'
                priority
              />
              <ExpandImage className='object-cover'
                src='/design/rank-matrix/mockup1.avif'
                width={654}
                height={200}
                alt='Small Banner'
                priority
              />
            </div>

            <div
              id='logos'
              className='pt-12 flex flex-col gap-4'>
              <p className='text-3xl company'>TYPOGRAPHY, COLOUR PALETE AND BRANDING</p>

              <ExpandImage className='w-full h-full object-cover'
                src='/design/rank-matrix/font-color.avif'
                width={1660}
                height={800}
                alt='Small Banner'
                priority
              />
              <ExpandImage className='w-full h-full object-cover'
                src='/design/rank-matrix/logo.avif'
                width={1660}
                height={800}
                alt='Small Banner'
                priority
              />
              <div className=''>
                <div className="flex gap-4 flex-col lg:flex-row">

                  <BlurImage src="/design/rank-matrix/iteration2.avif" width={460} height={460} title="Iteration 1" subtitle="Pretty" alt="Another Banner" />
                  <BlurImage src="/design/rank-matrix/iteration1.avif" width={460} height={460} title="Iteration 2" subtitle="A little chaotic" alt="Another Banner" />

                </div>
              </div>
              <div className="flex gap-4 flex-col lg:flex-row">
                <BlurImage src="/design/rank-matrix/iteration5.avif" width={460} height={460} title="Iteration 3" subtitle="Too Utilitarian" alt="Small Banner" />
                <BlurImage src="/design/rank-matrix/iteration4.avif" width={460} height={460} title="Iteration 4" subtitle="Too much wisdom in one frame" alt="Another Banner" />
              </div>
              <div className="flex gap-4 flex-col lg:flex-row">
                <BlurImage src="/design/rank-matrix/iteration3.avif" width={460} height={460} title="Iteration 5" subtitle="That James Thomson Builduibng svg took time" alt="Small Banner" />
                <BlurImage src="/design/img-brand/rankmatrix.avif" width={460} height={460} title="Finalised" subtitle="But it was policy to not advertise our college through this" alt="Small Banner" />
              </div>

              <p
                id='loading'
                className='pt-12 text-3xl company'>LOADING ANIMATIONS</p>
              <video
                src="/design/rank-matrix/loaderfigma.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              />
              <p>{`This was my very first iteration, fully created on Figma. Clean, minimalistic, and impressionable, it captured the essence of the loading experience. However, the Figma prototype turned out to be comparatively hefty work. I was then informed that for optimized performance, a JSON-based loader was needed. So, I turned to LottieFiles Creator, as the Figma plugin didn’t support the animation style I had built, heck! it didn’t even support gradient colors. The final LottieFiles-based loader is presented below and being used in live website right now:`}</p>

              <video
                src="/design/rank-matrix/loader3.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              />

              <p>{`This loading screen was designed with reusability in mind—it also serves perfectly as a component-level loader within the webpage.`}</p>

              <p
                id='screens'
                className='pt-12 text-3xl company'>USER INTERFACES</p>

              <ExpandImage className='w-full h-full object-cover'
                src='/design/rank-matrix/problems.avif'
                width={1660}
                height={800}
                alt='Small Banner'
                priority
              />

              <div className='pt-10 flex flex-col gap-8'>
                <div className='flex gap-6'>
                  <button
                    className={`tags ${activeMode === 'dark' ? 'bg-[#606060]' : ''} p-2 rounded-lg`}
                    onClick={() => setActiveMode('dark')}>
                    Dark Mode
                  </button>
                  <button
                    className={`tags ${activeMode === 'light' ? 'bg-[#606060]' : ''} p-2 rounded-lg`}
                    onClick={() => setActiveMode('light')}>
                    Light Mode
                  </button>
                </div>
                <div>
                  {activeMode === 'dark' && (
                    <div className='flex flex-col gap-4'>
                      <ExpandImage className='w-full h-full object-cover'
                        src='/design/rank-matrix/dark1.avif'
                        width={1660}
                        height={800}
                        alt='Small Banner'
                        priority
                      />
                      <ExpandImage className='w-full h-full object-cover'
                        src='/design/rank-matrix/dark2.avif'
                        width={1660}
                        height={800}
                        alt='Small Banner'
                        priority
                      />
                      <ExpandImage className='w-full h-full object-cover'
                        src='/design/rank-matrix/dark3.avif'
                        width={1660}
                        height={800}
                        alt='Small Banner'
                        priority
                      />
                    </div>
                  )}

                  {activeMode === 'light' && (
                    <div className='flex flex-col gap-4'>
                      <ExpandImage className='w-full h-full object-cover'
                        src='/design/rank-matrix/light1.avif'
                        width={1660}
                        height={800}
                        alt='Small Banner'
                        priority
                      />
                      <ExpandImage className='w-full h-full object-cover'
                        src='/design/rank-matrix/light2.avif'
                        width={1660}
                        height={800}
                        alt='Small Banner'
                        priority
                      />
                      <ExpandImage className='w-full h-full object-cover'
                        src='/design/rank-matrix/light3.avif'
                        width={1660}
                        height={800}
                        alt='Small Banner'
                        priority
                      />
                    </div>
                  )}
                </div>
              </div>

              <p className='text-3xl justify-center items-center flex company mt-10'>THANK YOU!</p>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Page;