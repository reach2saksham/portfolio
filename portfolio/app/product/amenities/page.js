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
    'Design System': 'design',
    'Loading Animations': 'loading',
    'Landing Page': 'landing',
    'Search Page': 'search',
    'Faculty Page': 'faculty',
    'Chakra: CMS': 'chakra',
};

const caseStudy = {
    industry: 'Insitutional Facilty Management',
    techStack: {
        'Design': ['figma', 'excalidraw'],
        'Finance': ['excel',],
    },
    // Tech stack names for tooltips
    techStackNames: {
        'figma': 'Figma',
        'excalidraw': 'Excalidraw',
        'excel': 'MS Excel',
    },
    companyName: 'AMENITIES',
    period: 'January 2025 - Present',
    domain: 'SAAS',
    description: `We are exploring how a unified platform for amenity management is conceptualized to solve real-world access, visibility, and booking challenges faced by institutions. The goal was to build a scalable, role-based SaaS solution that empowers organizations such as campuses, residential societies, and public sports facilities to centralize their services. By integrating real-time availability, QR-based check-ins, and modular workflows, the app aims to create a seamless experience for both administrators and users.`,
    sections: Object.keys(SECTIONS_CONFIG),
    role: ['Product Leader', 'UI/UX Designer'],
    collaborators: ['-'],
    deliverables: ['Real-time Booking', 'Amenity Dashboard', 'Collaboration & Security'],
    timelineStatus: ['Ongoing'],
    // links: {
    //     liveProduct: 'https://rankmatrix.in/',
    //     // figmaFile: 'https://figma.com',
    // },
    thewhat: `A centralized, role-based SaaS platform designed to streamline amenity bookings, access control, and usage monitoring within institutions. The system offers features like real-time availability, QR-based check-ins, and admin-configurable time slots, tailored for use in college campuses, hostels, residential societies, and sports complexes. Built to be modular and scalable, it simplifies amenity management for both users and facility managers.`,
    thewhy: `Most institutions struggle with decentralized and manual amenity management, resulting in double bookings, unregulated access, and underuse. This platform solves those pain points by digitizing the entire workflow, ensuring fair usage, better transparency, and operational efficiency for all stakeholders.`,
    thehow: `The idea was shaped through primary research and feedback from real users across campus and instituions. After a extensive user research and competetive analysis the wireframing and finalization of flow is being goin on. Features like booking analytics, live dashboards, and QR authentication are being integrated and tested. The platform is currently in its research and testing phase, with plans for pilot deployment.`,
};

const Page = () => {
    const [selectedSection, setSelectedSection] = useState(0);
    const [activeMode, setActiveMode] = useState('purple');
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
                            src="/product/amenities/cover.avif"
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
                                        <div className="flex gap-4 flex-wrap justify-start py-3 pr-8 border-gray-500">
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
                                <div className="sfpro text-sm pt-8 text-[#646464] tracking-wider">{caseStudy.domain}</div>
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
                    <div className="flex flex-col w-full lg:w-3/4 lg:pt-0">
                        {caseStudy.description && (
                            <div className="casetags lg:pt-0">{caseStudy.description}</div>
                        )}

                        <div className="pt-4 grid grid-cols-2 gap-x-4 gap-y-6 md:flex md:flex-wrap md:justify-between">
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
                        {/* 
                        <div
                            id='highlights'
                            className='company text-3xl pt-12 mb-2'>
                            THE HIGHLIGHTS
                        </div>

                        <ExpandImage className='w-full h-full object-cover pt-4'
                            src='/product/amenities/highlight.avif'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        /> */}

                        <div
                            id='design'
                            className='pt-4 flex flex-col gap-4'>
                            <div className='text-3xl company'>DEFINING THE PROBLEM</div>
                        </div>

                        <div className='flex flex-col gap-4 mt-6'>
                            <div className='border-l-2 px-3'>Lack of centralized platform for booking and managing institutional amenities like sports courts, common rooms, etc.
                            </div>
                            <div className='border-l-2 px-3'>Manual or unregulated processes often lead to double bookings, disputes, or misuse of facilities.
                            </div>
                            <div className='border-l-2 px-3'>No visibility into real-time usage status or booking history for users or administrators.
                            </div>
                            <div className='border-l-2 px-3'>Absence of access control, making it hard to track or limit facility usage by different user groups.
                            </div>
                            <div className='border-l-2 px-3'>Administrative burden in managing schedules, resolving conflicts, and ensuring fair usage.
                            </div>
                            <div className='border-l-2 px-3'>Inefficient feedback and grievance systems, making it hard to act on usage-related issues.
                            </div>
                            <div className='border-l-2 px-3'>Underutilization of resources due to lack of proper analytics or usage data insights.
                            </div>
                        </div>
                        <div
                            id='loading'
                            className='pt-12 text-3xl company'>MARKET VALIDATION</div>

                        <div className='pt-8 font-semibold text-xl'>{`Market Size and Growth `}</div>
                        <div className='pt-2'>{`The property management software market size was valued at USD 5197.626 million in 2023 and is expected to grow at a CAGR of 8.1% from 2024 to 2030. This suggests a substantial market opportunity for our project further developing into a entrepreneurial venture.`}</div>
                        <div className='pt-8 font-semibold text-xl'>{`City Stadiums`}</div>
                        <div className='pt-2'>{`As we know the smart city scheme of government is setting up high quality sports centers in almost all cities of India meeting the International standards. To fund this venture, our goal will be to enter into a private tender with the government, securing the necessary support and allowances for the project. The number of licensing in each city will depend on the tier and population of the city, ensuring scalability and wide accessibility.`}</div>
                        <ExpandImage className='w-full h-full object-cover pt-4'
                            src='/product/amenities/market1.webp'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />
                        <ExpandImage className='w-full h-full object-cover pt-4'
                            src='/product/amenities/market2.webp'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />

                        <div className='pt-4'>{`3. SOM : After taking competitions and other captured market into consideration our SOM would be 3.92 million`}</div>
                        <div className='pt-8 font-semibold text-xl'>{`Societies or Multi-storied Residential Buildings`}</div>
                        <div className='pt-4'>{`1. TAM : Over 70,000 multi-story residential buildings. After the mathematical evaluation the TAM comes out to be 89 Million.`}</div>
                        <div className='pt-2'>{`2. SAM : Assuming that the people interested in using the app for amenities would be 10 %  hence the SAM comes out to be 9 million apx.`}</div>
                        <div className='pt-2'>{`3. SOM : After taking competitions and other captured market into consideration our SOM would be 6.3 million.`}</div>
                        <div className='pt-8 font-semibold text-xl'>{`Colleges and Schools`}</div>
                        <div className='pt-4'>{`1. TAM : Over 51,000 colleges and more than 1,000 universities and around 14,89,115 schools. Having around 3000 avg students in colleges and universities and around 400 avg students in schools out TAM comes out to be 751 million.`}</div>
                        <div className='pt-2'>{`2. SAM : Assuming  the age group and considering the high income user group hence the SAM comes out to be 6.7 million apx.`}</div>
                        <div className='pt-2'>{`3. SOM : After taking competitions and other captured market into consideration our SOM would be 4.69 million.`}</div>
                        <div className='pt-8 font-semibold text-xl'>{`Club Houses and Private Sports Facilities`}</div>
                        <div className='pt-4'>{`1. TAM : Around 600,000 housing societies and considering the monthly user of these clubs the TAM comes out to be 90 million.`}</div>
                        <div className='pt-2'>{`2. SAM : Assuming the number of club houses that would be willing to invest in the infrastructure program the SAM comes out to be 4.221 million apx.`}</div>
                        <div className='pt-2'>{`3. SOM : After taking competitions and other captured market into consideration our SOM would be 2.9337 million.`}</div>
                        <div className='pt-8 font-semibold'>{`Hence the final Serviceable Obtainable Market is 18.11 million at the initial stage.`}</div>

                        <div
                            id='landing'
                            className='pt-12 text-3xl company'>USER RESEARCH</div>
                        
                        <div className='pt-6 font-semibold text-xl'>{`5 W's:`}</div>

                        <div className='pt-4'><b>Who -</b>{` People who want to try out new amenities, but they rarely are able to due to prior occupancy and time mismanagement.`}</div>
                        <div className='pt-2'><b>What -</b>{` A solution to the problem of amenities booking and management.`}</div>
                        <div className='pt-2'><b>When -</b>{` It can be put to use when users require to play a sport or use an amenity and want to schedule it.`}</div>
                        <div className='pt-2'><b>Where -</b>{` It can be implemented in multi-storied residential buildings, city stadiums under smart city government project, private schools and colleges, government school and colleges, club houses and private sports buildings. But for now, the focus is on IITR.`}</div>
                        <div className='pt-2'><b>Why -</b>{` To assist those users who are making plans and commitments so that they can include their favorite/new sport or amenity by introducing a management and boking app to make their life easier.`}</div>
                        <div className='pt-6 font-semibold text-xl'>{`5 Why's:`}</div>

                        <div className='pt-4'><b>Why</b>{` aren't users able to efficiently use amenities? - Because there is always too many users trying to use the same amenity in an un-organized manner.`}</div>
                        <div className='pt-2'><b>Why</b>{` don't users have time to use amenities? - Because they cannot find unoccupied time slots for sports venue.`}</div>
                        <div className='pt-2'><b>Why</b>{` hasn't user found an empty time slot? - Because there is no sophisticated slot booking and management system.`}</div>
                        <div className='pt-2'><b>Why</b>{` does user hate to manually visit there? - Because most of the time he/she doesn't get chance to play.`}</div>
                        <div className='pt-2'><b>Why</b>{` would the user will use the app? - Because the app would assure him book his favorite sport and also allow him to try out new sport activities / amenities without having to visit the site area again and again.`}</div>
                        <div className='pt-8 font-semibold text-xl'>{`Primary User Research: User Interviews`}</div>
                        <div className='pt-4'>{`To gain insight into user behavior and preferences, 12 qualitative generative research interviews 8 of them were from IITR, each lasting 15 to 20 minutes, were conducted to develop user personas for a sports, health, and fitness perspective. These interviews covered various aspects such as sports preferences, fitness goals, preferred amenities, and the overall user experience. In this product analysis, here the data gathered from these interviews was used to create 2 user personas that can serve as a useful tool for this start-up to create a product or service that cater to the need of their target audience. The other people were my cousins who have been living in multi-storied buildings like The Lodha, Neelyog.`}</div>
                        <div className='pt-8 font-semibold text-xl'>{`User Personas`}</div>
                        <ExpandImage className='w-full h-full object-cover pt-4'
                            src='/product/amenities/persona1.webp'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />
                        <ExpandImage className='w-full h-full object-cover pt-4'
                            src='/product/amenities/persona2.webp'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />

                        <div
                            id='search'
                            className='pt-8 text-3xl company'>COMPETITOR ANALYSIS</div>

                        <div className='pt-4'>{`After analyzing all the competitors I have made this following chart indicating the experience & features they provide to users. Here x-axis = Level of features & y-axis = Level of user experience.`}</div>

                        <ExpandImage className='w-full h-full object-cover pt-4'
                            src='/product/amenities/competitors.webp'
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