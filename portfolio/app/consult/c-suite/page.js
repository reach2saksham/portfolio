"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Image from 'next/image';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import ExpandImage from '@/app/components/ExpandImage';

// Centralized section configuration - no more duplication!
const SECTIONS_CONFIG = {
    'Overview': 'overview',
    'Highlights': 'highlights',
    'The Problem': 'problem',
    'TL;DR Problem Statement': 'tldr',
    'SWOT Analysis': 'swot',
    'Strategies and Impact': 'strategies'
};

const caseStudy = {
    industry: 'Automotive Industry',
    techStack: {
        'Design Tool': ['canva'],
        'Analyst Tool': ['excel'],
    },
    // Tech stack names for tooltips
    techStackNames: {
        'canva': 'Canva',
        'excel': 'MS Excel',
    },
    companyName: 'C-SUITE 8.0',
    period: 'November 2024',
    domain: 'CRISIS MANAGEMENT CASE',
    description: `This case study examines the emissions smirch that engulfed Gryphon Motors in 2001, where the company was found guilty of installing defeat devices in diesel vehicles to manipulate emissions tests. The scandal triggered a global backlash, legal penalties, and reputational damage. In this study, I analyze the ethical, and operational fallout of the crisis and propose strategic solutions for rebuilding stakeholder trust, realigning corporate culture, and driving long-term sustainability through innovative reforms.`,
    sections: Object.keys(SECTIONS_CONFIG), // Use the centralized config
    role: ['Cheif Executive Officer'],
    collaborators: ['Aashi Jain'],
    deliverables: ['Strategic Recommendations', 'Campaign Concepts', 'Implementation Plan'],
    timelineStatus: ['Gold Medalist', 'Completed'],
    //   links: {
    //     liveProduct: 'https://rankmatrix.in/',
    //     // figmaFile: 'https://figma.com',
    //   },
    thewhat: `The central problem revolves around Gryphon Motors' deliberate use of software to falsify diesel emissions data, betraying consumer trust, violating environmental laws, and misleading global regulators. The manipulation led to widespread fallout, massive lawsuits, plummeting stock prices, CEO resignation, and irreversible damage to the brand's credibility. The case underscores a systemic failure in corporate ethics, governance, and risk management, requiring a complete overhaul of the company's culture and long-term strategy.`,
    thewhy: `This case is significant because it highlights the devastating impact of unethical leadership and short-term gain over long-term integrity. It emphasizes the importance of corporate responsibility in a hyper-regulated and environmentally sensitive world. For business leaders, it serves as a compelling lesson on how quickly a brand built over decades can unravel due to poor ethical judgment. It also offers insights into stakeholder management, regulatory compliance, and crisis communication—core skills for future decision-makers across industries.`,
    thehow: `The case is approached by analyzing Gryphon Motors timeline of actions, decisions, and responses from the moment the smirch was uncovered. It involves a critical evaluation of stakeholder impact, legal consequences, leadership accountability, and communication strategy. The study then examines the company's recovery playbook—its shift to electric vehicles, rebranding efforts, internal ethical reforms, and Strategy 2025.`,
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
                className="projects container max-w-full pt-4 sm:mt-0 mx-auto px-4 xl:px-36 lg:px-14 sm:px-4">
                {/* Header Section */}
                <div
                    className="flex flex-wrap lg:flex-nowrap flex-col lg:flex-row-reverse">
                    <div className="w-full lg:w-3/4 pb-4 lg:pb-0 mt-14 sm:mt-0">
                        <Image
                            src="/consult/c-suite/1.avif"
                            width={1080}
                            height={400}
                            alt="Cover"
                            priority
                            unoptimized={true}
                            className="w-full h-auto lg:object-cover lg:h-full 2xl:object-contain"
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
                                <div className="sfpro text-sm pt-10 text-[#646464] tracking-wider">{caseStudy.domain}</div>
                            )}
                            {caseStudy.sections && caseStudy.sections.length > 0 && (
                                <div className="casetags text-base py-4">
                                    {caseStudy.sections.map((section, index) => (
                                        <button
                                            key={index}
                                            className={`py-1 flex flex-col rounded transition-colors duration-300 text-left ${
                                                selectedSection === index ? 'text-white' : 'text-[#646464]'
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
                        <div className='flex flex-col lg:flex-row gap-1 justify-center items-center pt-4'>
                            <div>
                                <ExpandImage className='w-full h-full object-cover'
                                    src='/consult/c-suite/certificate.avif'
                                    width={520}
                                    height={800}
                                    alt='Small Banner'
                                    priority
                                />
                            </div>
                            <div>
                                <ExpandImage className='w-full h-full object-cover'
                                    src='/consult/c-suite/igpost.avif'
                                    width={398}
                                    height={800}
                                    alt='Small Banner'
                                    priority
                                />
                            </div>
                        </div>
                        <div
                            id='problem'
                            className='pt-12 flex flex-col'>
                            <div className='text-3xl company'>THE PROBLEM</div>
                        </div>

                            <ExpandImage className='w-full h-full object-cover pt-4'
                                src='/consult/c-suite/ps1.avif'
                                width={1660}
                                height={800}
                                alt='Small Banner'
                                priority
                            />
                            <ExpandImage className='w-full h-full object-cover pt-4'
                                src='/consult/c-suite/ps2.avif'
                                width={1660}
                                height={800}
                                alt='Small Banner'
                                priority
                            />
                            <ExpandImage className='w-full h-full object-cover pt-4'
                                src='/consult/c-suite/ps3.avif'
                                width={1660}
                                height={800}
                                alt='Small Banner'
                                priority
                            />
                            <ExpandImage className='w-full h-full object-cover pt-4'
                                src='/consult/c-suite/ps4.avif'
                                width={1660}
                                height={800}
                                alt='Small Banner'
                                priority
                            />
                            <ExpandImage className='w-full h-full object-cover pt-4'
                                src='/consult/c-suite/ps5.avif'
                                width={1660}
                                height={800}
                                alt='Small Banner'
                                priority
                            />
                            <ExpandImage className='w-full h-full object-cover pt-4'
                                src='/consult/c-suite/ps6.avif'
                                width={1660}
                                height={800}
                                alt='Small Banner'
                                priority
                            />
                            <ExpandImage className='w-full h-full object-cover pt-4'
                                src='/consult/c-suite/ps7.avif'
                                width={1660}
                                height={800}
                                alt='Small Banner'
                                priority
                            />
                            <ExpandImage className='w-full h-full object-cover pt-4'
                                src='/consult/c-suite/ps8.avif'
                                width={1660}
                                height={800}
                                alt='Small Banner'
                                priority
                            />
                            <ExpandImage className='w-full h-full object-cover pt-4'
                                src='/consult/c-suite/ps9.avif'
                                width={1660}
                                height={800}
                                alt='Small Banner'
                                priority
                            />
                            <div
                            id='tldr'
                            className='pt-12 flex flex-col'>
                            <div className='text-3xl company'>TL;DR Problem Statement</div>
                            <div className='pt-4'>{`In 2001, Gryphon Motors was exposed for installing defeat devices in over 11 million diesel vehicles, causing them to emit up to 40 times the legal pollution limit while appearing compliant during tests. The fallout included over $30 billion in global penalties and settlements, a 40% drop in stock value, and the resignation of top leadership. This case explores how Gryphon Motors can rebuild investor confidence, employee morale, and public trust while shifting strategically toward electric mobility, ethical governance, and sustainable growth.`}</div>
                        </div>
                            <div
                                id='swot'
                                className='pt-12 text-3xl company'>SWOT ANALYSIS</div>

                            <ExpandImage className='w-full h-full object-cover pt-2'
                                src='/consult/c-suite/2.avif'
                                width={1660}
                                height={800}
                                alt='Small Banner'
                                priority
                            />
                            <div
                                id='strategies'
                                className='pt-12 text-3xl company'>STRATEGIES AND IMPACT</div>
                            <ExpandImage className='w-full h-full object-cover pt-2'
                                src='/consult/c-suite/3.avif'
                                width={1660}
                                height={800}
                                alt='Small Banner'
                                priority
                            />
                            <ExpandImage className='w-full h-full object-cover pt-2'
                                src='/consult/c-suite/4.avif'
                                width={1660}
                                height={800}
                                alt='Small Banner'
                                priority
                            />
                            <ExpandImage className='w-full h-full object-cover pt-2'
                                src='/consult/c-suite/5.avif'
                                width={1660}
                                height={800}
                                alt='Small Banner'
                                priority
                            />
                            <ExpandImage className='w-full h-full object-cover pt-2'
                                src='/consult/c-suite/6.avif'
                                width={1660}
                                height={800}
                                alt='Small Banner'
                                priority
                            />
                            <ExpandImage className='w-full h-full object-cover pt-2'
                                src='/consult/c-suite/7.avif'
                                width={1660}
                                height={800}
                                alt='Small Banner'
                                priority
                            />
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default Page;