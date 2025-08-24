"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Image from 'next/image';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import BlurImage from '@/app/components/BlurImage';
import ExpandImage from '@/app/components/ExpandImage';

// Centralized section configuration - no more duplication!
const SECTIONS_CONFIG = {
    'Overview': 'overview',
    'Highlights': 'highlights',
    'Font/Colour/Brand': 'logos',
    'Loading Animation': 'loading',
    'User Interfaces': 'screens',
};

const caseStudy = {
    industry: 'Education',
    techStack: {
        'Design and Animation Tools for UI': ['figma', 'lotte'],
        'Development Stack': ['reactjs', 'js'],
    },
    // Tech stack names for tooltips
    techStackNames: {
        'figma': 'Figma',
        'lotte': 'Lotte Files Creator',
        'reactjs': 'React',
        'js': 'JavaScript',
    },
    companyName: 'RANK MATRIX',
    period: 'April 2025',
    domain: 'ADAPTIVE UI DESIGN',
    description: `Rank Matrix is a web app designed to simplify the college selection process for JEE aspirants. Instead of sifting through multiple rounds of counseling data, students can instantly view their best admission chances based on the final seat matrix. The platform features a clean, intuitive UI/UX, smooth loading animations, and full accessibility with both light and dark mode support.`,
    sections: Object.keys(SECTIONS_CONFIG),
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
    const [selectedSection, setSelectedSection] = useState(0);
    const [activeMode, setActiveMode] = useState('dark');
    const [isManualClick, setIsManualClick] = useState(false);

    // Scroll-based section highlighting
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-10% 0px -60% 0px', // More lenient trigger zones
            threshold: [0, 0.1, 0.25] // Multiple thresholds for better detection
        };

        const observerCallback = (entries) => {
            // Don't update if user just clicked manually
            if (isManualClick) return;

            // Find the entry with the highest intersection ratio that's actually intersecting
            let bestEntry = null;
            let highestRatio = 0;

            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
                    bestEntry = entry;
                    highestRatio = entry.intersectionRatio;
                }
            });

            if (bestEntry) {
                const sectionId = bestEntry.target.id;
                console.log('Section in view:', sectionId, 'Ratio:', bestEntry.intersectionRatio); // Debug log

                // Find the section index based on the ID
                const sectionName = Object.keys(SECTIONS_CONFIG).find(key => SECTIONS_CONFIG[key] === sectionId);
                if (sectionName && caseStudy.sections) {
                    const sectionIndex = caseStudy.sections.indexOf(sectionName);
                    if (sectionIndex !== -1) {
                        setSelectedSection(sectionIndex);
                    }
                }
            }
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe all sections and log which ones are found
        caseStudy.sections.forEach((section) => {
            const element = document.getElementById(SECTIONS_CONFIG[section]);
            if (element) {
                console.log('Observing section:', section, 'with ID:', SECTIONS_CONFIG[section]); // Debug log
                observer.observe(element);
            } else {
                console.warn('Section not found:', section, 'with ID:', SECTIONS_CONFIG[section]); // Debug log
            }
        });

        // Cleanup observer on unmount
        return () => {
            observer.disconnect();
        };
    }, [isManualClick]);

    const handleSectionClick = (index, section) => {
        setIsManualClick(true);
        setSelectedSection(index);

        const element = document.getElementById(SECTIONS_CONFIG[section]);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }

        // Re-enable observer after scroll animation completes
        setTimeout(() => {
            setIsManualClick(false);
        }, 1000); // Adjust timing as needed
    };

    // Helper function to check if links exist
    const hasLinks = caseStudy.links && (caseStudy.links.liveProduct || caseStudy.links.figmaFile);

    return (
        <main
            className="flex min-h-screen flex-col mx-auto max-w-screen-2xl]">
            <div id='overview' ></div>
            <Navbar />
            <div
                className="projects container max-w-full pt-4 sm:mt-0 mx-auto px-4 xl:px-28 lg:px-14 sm:px-4">
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
                    {/* Sidebar with scroll-based highlighting */}
                    <aside className="w-full lg:w-1/4 lg:sticky lg:top-[70px] lg:self-start lg:max-h-[calc(100vh-70px)] lg:overflow-y-auto">
                        <div className="flex flex-col w-full hidden lg:block">
                            {caseStudy.companyName && (
                                <div className="company text-[40px]">{caseStudy.companyName}</div>
                            )}
                            {caseStudy.period && (
                                <div className="casetags text-sm">{caseStudy.period}</div>
                            )}
                            {caseStudy.domain && (
                                <div className="sfpro text-sm pt-4 text-[#646464] tracking-wider">{caseStudy.domain}</div>
                            )}
                            {caseStudy.sections && caseStudy.sections.length > 0 && (
                                <div className="casetags text-base py-4">
                                    {caseStudy.sections.map((section, index) => (
                                        <button
                                            key={index}
                                            className={`py-1 flex flex-col rounded transition-colors duration-300 text-left ${selectedSection === index ? 'text-white' : 'text-[#646464]'
                                                }`}
                                            onClick={() => handleSectionClick(index, section)}
                                        >
                                            {section}
                                        </button>
                                    ))}
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
                            <div className="pt-6 flex gap-4">
                                {caseStudy.links.liveProduct && (
                                    <a
                                        href={caseStudy.links.liveProduct}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-1/2 bg-[#131313] flex items-start justify-between p-4 rounded-md border-[#363636] border-opacity-20 text-[#BBBBBB] text-xs"
                                    >
                                        <div>LIVE PRODUCT</div>
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
                                        <div>CHECK IT IN FIGMA</div>
                                        <ChevronRightIcon className="h-4 w-4 text-[#BBBBBB]" />
                                    </a>
                                )}
                            </div>
                        )}

                        {/* What, Why, How Section */}
                        <div className="mt-16 flex flex-col gap-12 mb-12">
                            {caseStudy.thewhat && (
                                <div className="lg:flex-row lg:gap-36 flex flex-col">
                                    <div className="lg:w-32 lg:flex-shrink-0 font-semibold tags">THE WHAT</div>
                                    <div className="pt-4 lg:pt-0">{caseStudy.thewhat}</div>
                                </div>
                            )}
                            {caseStudy.thewhy && (
                                <div className="lg:flex-row lg:gap-36 flex flex-col">
                                    <div className="lg:w-32 lg:flex-shrink-0 font-semibold tags">THE WHY</div>
                                    <div className="pt-4 lg:pt-0">{caseStudy.thewhy}</div>
                                </div>
                            )}
                            {caseStudy.thehow && (
                                <div className="lg:flex-row lg:gap-36 flex flex-col">
                                    <div className="lg:w-32 lg:flex-shrink-0 font-semibold tags">THE HOW</div>
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
              <div className='text-3xl company'>TYPOGRAPHY, COLOUR PALETE AND BRANDING</div>
            </div>

              <ExpandImage className='w-full h-full object-cover pt-4'
                src='/design/rank-matrix/font-color.avif'
                width={1660}
                height={800}
                alt='Small Banner'
                priority
              />
              <ExpandImage className='w-full h-full object-cover pt-2'
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

              <div
                id='loading'
                className='pt-12 text-3xl company'>LOADING ANIMATIONS</div>
              <video
                src="/design/rank-matrix/loaderfigma.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto pt-4"
              />
              <div className='py-4'>{`This was my very first iteration, fully created on Figma. Clean, minimalistic, and impressionable, it captured the essence of the loading experience. However, the Figma prototype turned out to be comparatively hefty work. I was then informed that for optimized performance, a JSON-based loader was needed. So, I turned to LottieFiles Creator, as the Figma plugin didn’t support the animation style I had built, heck! it didn’t even support gradient colors. The final LottieFiles-based loader is presented below and being used in live website right now:`}</div>

              <video
                src="/design/rank-matrix/loader3.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              />

              <div className='py-4'>{`This loading screen was designed with reusability in mind—it also serves perfectly as a component-level loader within the webpage.`}</div>

              <div
                id='screens'
                className='pt-12 text-3xl company'>USER INTERFACES</div>

              <ExpandImage className='w-full h-full object-cover pt-4'
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
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Page;