"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Image from 'next/image';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { ChevronRight, ChevronDown, Building2 } from 'lucide-react';
import ExpandImage from '@/app/components/ExpandImage';

// Centralized section configuration - no more duplication!
const SECTIONS_CONFIG = {
    'Overview': 'overview',
    'Defining Problem': 'problem',
    'Market Validation': 'market',
    'User Research': 'research',
    'Competitor Analysis': 'competitor',
    'Ideation': 'ideation',
    'Early Propositions': 'propositions',
    'Early User Flow': 'flow',
    'Ideation Working': 'working',
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
    const [openDropdowns, setOpenDropdowns] = useState({});

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
            className="flex min-h-screen flex-col mx-auto max-w-screen-2xl font-sans">
            <div id='overview' ></div>
            <Navbar />
            <div
                className="projects container max-w-full pt-4 sm:mt-0 mx-auto px-4 xl:px-24 lg:px-14 sm:px-4">
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
                                    className="font-mono text-xs text-white/40 tracking-wider">INDUSTRY</div>
                                <div className="casetags text-sm pt-2 pb-2 text-white tracking-wider border-b border-gray-500 border-opacity-40">
                                    {caseStudy.industry}
                                </div>
                            </>
                        )}
                        {caseStudy.techStack && Object.keys(caseStudy.techStack).length > 0 && (
                            <>
                                <div className="font-mono text-xs text-white/40 pt-4 pb-2 tracking-wider">TECH STACK</div>
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
                                <div className="font-offbit text-[40px]">{caseStudy.companyName}</div>
                            )}
                            {caseStudy.period && (
                                <div className="casetags text-sm">{caseStudy.period}</div>
                            )}
                            {caseStudy.domain && (
                                <div className="font-mono text-xs pt-8 text-white/40 tracking-wider">{caseStudy.domain}</div>
                            )}
                            {caseStudy.sections && caseStudy.sections.length > 0 && (
                                <div className="text-sm py-4">
                                    {caseStudy.sections.map((section, index) => (
                                        <button
                                            key={index}
                                            className={`py-1 flex flex-col rounded transition-colors duration-300 text-left ${selectedSection === index ? 'text-white' : 'text-white/40'
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
                                        <div className="font-mono text-xs text-white/40 tracking-wider">{title}</div>
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
                                        className="w-1/2 bg-[#131313] flex items-start justify-between p-4 rounded-md border-[#363636] border-opacity-20 text-[#BBBBBB] text-xs font-mono hover:bg-[#202020] hover:text-white/80 transition-transform ease-in-out duration-300"
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
                            className='text-3xl font-offbit pt-12 mb-2'>
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
                            className='pt-4 flex flex-col gap-4'>
                            <div id='problem' className='text-3xl font-offbit'>DEFINING THE PROBLEM</div>
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
                            id='market'
                            className='pt-12 text-3xl font-offbit'>MARKET VALIDATION</div>

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
                            id='research'
                            className='pt-12 text-3xl font-offbit'>USER RESEARCH</div>

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
                            id='competitor'
                            className='pt-12 text-3xl font-offbit'>COMPETITOR ANALYSIS</div>


                        <div className="bg-[#030311] pt-4 rounded-lg border border-gray-900 shadow-lg">
                            <button
                                onClick={() => setOpenDropdowns(prev => ({
                                    ...prev,
                                    mygate: !prev.mygate
                                }))}
                                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-800 transition-colors duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950focus:ring-offset-2 focus:ring-offset-gray-900"
                            >
                                <div className="flex items-center justify-center alis space-x-3">
                                    {openDropdowns.mygate ? (
                                        <ChevronDown className="w-4 h-4 text-gray-300 transition-transform duration-200" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4 text-gray-300 transition-transform duration-200" />
                                    )}

                                    <div className=" flex items-center justify-center">
                                        <Image className='w-full h-full object-cover'
                                            src='/product/amenities/mygate.avif'
                                            width={40}
                                            height={60}
                                            alt='Small Banner'
                                            priority
                                        />
                                    </div>

                                    <span className="text-gray-100 font-semibold text-xl text-left">
                                        My Gate
                                    </span>
                                </div>
                            </button>

                            {openDropdowns.mygate && (
                                <div className="px-4 pb-4 border-t border-gray-700 mt-2 pt-4  slide-in-from-top-2 duration-200">
                                    <p className="text-gray-300 text-base leading-relaxed">
                                        MyGate is a security and community management app designed to streamline daily operations in residential societies. It focuses on enhancing communication between residents and gate security, while also offering a suite of community services.
                                    </p>
                                    <div className='flex flex-col lg:flex-row gap-1 justify-center items-center pt-4'>
                                        <div>
                                            <ExpandImage className='object-cover'
                                                src='/product/amenities/mygate1.webp'
                                                width={440}
                                                height={800}
                                                alt='Small Banner'
                                                priority
                                            />
                                        </div>
                                        <div>
                                            <ExpandImage className='object-cover'
                                                src='/product/amenities/mygate2.webp'
                                                width={478}
                                                height={800}
                                                alt='Small Banner'
                                                priority
                                            />
                                        </div>
                                    </div>
                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">💡 USPs (Unique Selling Propositions)</h2>
                                        <ul className="list-disc list-inside">
                                            <li>Trusted security management connecting residents and gate personnel</li>
                                            <li>Real-time tracking of domestic help and visitor entries</li>
                                            <li>Digital gate passes and guest pre-authorization system</li>
                                        </ul>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">🧰 Core Services</h2>
                                        <ul className="list-disc list-inside">
                                            <li>Visitor Management System</li>
                                            <li>Community ERP</li>
                                            <li>Expert Home Services</li>
                                            <li>Smart Payments</li>
                                            <li>Neighborhood Discovery</li>
                                            <li>Maintenance Management</li>
                                            <li>Emergency Contact Directory</li>
                                            <li>Staff & Maid Listings</li>
                                        </ul>
                                    </section>

                                    <ExpandImage className='flex object-cover pt-4 items-center justify-center'
                                        src='/product/amenities/mygate3.webp'
                                        width={200}
                                        height={400}
                                        alt='Small Banner'
                                        priority
                                    />

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">📈 Financial Highlights</h2>
                                        <ul className="list-disc list-inside">
                                            <li>Revenue grew from ₹8 Cr in FY21 to ₹71 Cr in FY23</li>
                                            <li>Raised ₹135 Cr in funding from Acko, Urban Company & existing investors</li>
                                            <li>Reduced losses by 35.3%, down to ₹76.43 Cr in FY23</li>
                                        </ul>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">🌍 Market Presence</h2>
                                        <ul className="list-disc list-inside">
                                            <li>Operating in 27+ major Indian cities</li>
                                            <li>Serving 25,000+ residential societies</li>
                                        </ul>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">🏁 Identified Gap</h2>
                                        <p>
                                            Despite its extensive features, MyGate lacks an amenities booking system, which is essential
                                            for managing shared resources like clubhouses and sports facilities. This creates a prime
                                            opportunity for feature integration with real-time booking, availability checks, and access control.
                                        </p>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">⚔️ Competitors</h2>
                                        <ul className="list-disc list-inside">
                                            <li>ApnaComplex</li>
                                            <li>ADDA ERP</li>
                                            <li>Paperbit Apartment Management Software</li>
                                        </ul>
                                    </section>
                                </div>
                            )}
                        </div>
                        <div className="bg-[#030311] rounded-lg border border-gray-900 shadow-lg">
                            <button
                                onClick={() => setOpenDropdowns(prev => ({
                                    ...prev,
                                    lodha: !prev.lodha
                                }))}
                                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-800 transition-colors duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950focus:ring-offset-2 focus:ring-offset-gray-900"
                            >
                                <div className="flex items-center justify-center alis space-x-3">
                                    {openDropdowns.lodha ? (
                                        <ChevronDown className="w-4 h-4 text-gray-300 transition-transform duration-200" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4 text-gray-300 transition-transform duration-200" />
                                    )}

                                    <div className=" flex items-center justify-center">
                                        <Image className='w-full h-full object-cover'
                                            src='/product/amenities/lodha.avif'
                                            width={40}
                                            height={60}
                                            alt='Small Banner'
                                            priority
                                        />
                                    </div>

                                    <span className="text-gray-100 font-semibold text-xl text-left">
                                        The Lodha
                                    </span>
                                </div>
                            </button>

                            {openDropdowns.lodha && (
                                <div className="px-4 pb-4 border-t border-gray-700 mt-2 pt-4  slide-in-from-top-2 duration-200">
                                    <p className="text-gray-300 text-base leading-relaxed">
                                        Lodha Group is one of India's largest and most prominent real estate developers, known for its luxury residential and commercial projects. The group also offers integrated property management solutions.
                                    </p>
                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">💡 USPs</h2>
                                        <ul className="list-disc list-inside">
                                            <li>Premium and luxury real estate developments</li>
                                            <li>Comprehensive in-house property management services</li>
                                        </ul>
                                    </section>

                                    <div className='flex flex-col lg:flex-row gap-1 justify-center items-center pt-4 px-64'>
                                        <div className=''>
                                            <ExpandImage className='object-cover'
                                                src='/product/amenities/lodha1.webp'
                                                width={504}
                                                height={800}
                                                alt='Small Banner'
                                                priority
                                            />
                                        </div>
                                        <div>
                                            <ExpandImage className='object-cover'
                                                src='/product/amenities/lodha2.webp'
                                                width={414}
                                                height={800}
                                                alt='Small Banner'
                                                priority
                                            />
                                        </div>
                                    </div>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">🧰 Services Provided</h2>
                                        <ul className="list-disc list-inside">
                                            <li>Real estate development (residential + commercial)</li>
                                            <li>Property management services</li>
                                        </ul>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">📈 Financial Highlights</h2>
                                        <p>Detailed financial data for Lodha Group was not publicly available.</p>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">💰 Profit & Loss</h2>
                                        <p>No official figures for profit and loss were found in the current records.</p>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">🌍 Market Presence</h2>
                                        <ul className="list-disc list-inside">
                                            <li>Among the largest real estate developers in India</li>
                                            <li>Wide presence in both residential and commercial real estate sectors</li>
                                        </ul>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">⚔️ Competitors</h2>
                                        <ul className="list-disc list-inside">
                                            <li>Emaar</li>
                                            <li>Brigade Group</li>
                                            <li>City Developments</li>
                                        </ul>
                                    </section>
                                </div>
                            )}
                        </div>
                        <div className="bg-[#030311] rounded-lg border border-gray-900 shadow-lg">
                            <button
                                onClick={() => setOpenDropdowns(prev => ({
                                    ...prev,
                                    pitchbooking: !prev.pitchbooking
                                }))}
                                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-800 transition-colors duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950focus:ring-offset-2 focus:ring-offset-gray-900"
                            >
                                <div className="flex items-center justify-center alis space-x-3">
                                    {openDropdowns.pitchbooking ? (
                                        <ChevronDown className="w-4 h-4 text-gray-300 transition-transform duration-200" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4 text-gray-300 transition-transform duration-200" />
                                    )}

                                    <div className=" flex items-center justify-center">
                                        <Image className='w-full h-full object-cover'
                                            src='/product/amenities/pitchbooking.avif'
                                            width={40}
                                            height={60}
                                            alt='Small Banner'
                                            priority
                                        />
                                    </div>

                                    <span className="text-gray-100 font-semibold text-xl text-left">
                                        Pitchbooking
                                    </span>
                                </div>
                            </button>

                            {openDropdowns.pitchbooking && (
                                <div className="px-4 pb-4 border-t border-gray-700 mt-2 pt-4  slide-in-from-top-2 duration-200">
                                    <p className="text-gray-300 text-base leading-relaxed">
                                        Pitchbooking is a streamlined facility booking platform designed to simplify the management of sports venues and community spaces. With the tagline <strong>“More Booking. Less Admin.”</strong>, it reduces manual work for admins while providing users with a seamless reservation experience.
                                    </p>

                                    <ExpandImage className='w-full object-cover pt-4'
                                        src='/product/amenities/pitchbooking.webp'
                                        width={918}
                                        height={800}
                                        alt='Small Banner'
                                        priority
                                    />

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">💡 USPs</h2>
                                        <ul className="list-disc list-inside">
                                            <li>Simplified facility and sports venue booking</li>
                                            <li>Intuitive admin panel reducing manual effort</li>
                                            <li>Partnered with clubs and organizations to expand reach</li>
                                        </ul>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">🧰 Services Provided</h2>
                                        <ul className="list-disc list-inside">
                                            <li>Facility management system for sports and events</li>
                                            <li>Automated scheduling and availability handling</li>
                                            <li>Real-time updates and booking notifications</li>
                                            <li>Secure payment and invoicing tools</li>
                                        </ul>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">🌟 Key Features</h2>
                                        <ul className="list-disc list-inside">
                                            <li>Instant feedback and review system</li>
                                            <li>Nationwide support and scalability</li>
                                            <li>Custom branding and white-label solutions</li>
                                            <li>Mobile-friendly user experience</li>
                                        </ul>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">📈 Financial Highlights</h2>
                                        <p>Financial details are not publicly disclosed, but Pitchbooking has reported growing adoption across UK and EU venues.</p>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">💰 Profit & Loss</h2>
                                        <p>No official profit or loss data has been made publicly available.</p>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">🌍 Market Presence</h2>
                                        <ul className="list-disc list-inside">
                                            <li>Strong presence in the UK and Ireland</li>
                                            <li>Used by local authorities, schools, and private clubs</li>
                                            <li>Expanding into broader facility management use cases</li>
                                        </ul>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">⚔️ Competitors</h2>
                                        <ul className="list-disc list-inside">
                                            <li>Skedda</li>
                                            <li>Playtomic</li>
                                            <li>OpenPlay</li>
                                            <li>Bookteq</li>
                                        </ul>
                                    </section>
                                </div>
                            )}
                        </div>
                        <div className="bg-[#030311] rounded-lg border border-gray-900 shadow-lg">
                            <button
                                onClick={() => setOpenDropdowns(prev => ({
                                    ...prev,
                                    playsports: !prev.playsports
                                }))}
                                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-800 transition-colors duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950focus:ring-offset-2 focus:ring-offset-gray-900"
                            >
                                <div className="flex items-center justify-center alis space-x-3">
                                    {openDropdowns.playsports ? (
                                        <ChevronDown className="w-4 h-4 text-gray-300 transition-transform duration-200" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4 text-gray-300 transition-transform duration-200" />
                                    )}

                                    <div className=" flex items-center justify-center">
                                        <Image className='w-full h-full object-cover'
                                            src='/product/amenities/playsports.avif'
                                            width={40}
                                            height={60}
                                            alt='Small Banner'
                                            priority
                                        />
                                    </div>

                                    <span className="text-gray-100 font-semibold text-xl text-left">
                                        Play Sports
                                    </span>
                                </div>
                            </button>

                            {openDropdowns.playsports && (
                                <div className="px-4 pb-4 border-t border-gray-700 mt-2 pt-4  slide-in-from-top-2 duration-200">
                                    <p className="text-gray-300 text-base leading-relaxed">
                                        Play Sports is a recreational sports facility booking platform offering users an easy way to find and reserve courts and playing arenas. Focused on user retention and incentives, it integrates a digital wallet and reward point system.
                                    </p>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">💡 USPs</h2>
                                        <ul className="list-disc list-inside">
                                            <li>Integrated digital wallet for seamless payments</li>
                                            <li>Reward points system to encourage repeat bookings</li>
                                        </ul>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">🧰 Services Provided</h2>
                                        <ul className="list-disc list-inside">
                                            <li>Sports facility and court booking system</li>
                                            <li>In-app payment and booking management</li>
                                        </ul>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">🌟 Key Features</h2>
                                        <ul className="list-disc list-inside">
                                            <li>Digital wallet with redeemable reward points</li>
                                            <li>User-friendly mobile interface</li>
                                        </ul>
                                    </section>

                                    <div className="flex gap-1 pt-4 sm:gap-4 justify-center items-center flex-col sm:flex-row">
                                        <ExpandImage src="/product/amenities/playsports1.webp" width={306} height={460} title="Occupancy calendar" alt="Small Banner" />
                                        <ExpandImage src="/product/amenities/playsports2.webp" width={306} height={460} title="Members communication" alt="Another Banner" />
                                        <ExpandImage src="/product/amenities/playsports3.webp" width={306} height={460} title="Association Marketing" alt="Another Banner" />
                                    </div>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">📈 Financial Highlights</h2>
                                        <p>No publicly available financial data.</p>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">💰 Profit & Loss</h2>
                                        <p>Profit and loss figures have not been disclosed publicly.</p>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">🌍 Market Presence</h2>
                                        <ul className="list-disc list-inside">
                                            <li>Focused on local sports venues and user engagement</li>
                                            <li>Small to medium-scale presence in recreational facilities</li>
                                        </ul>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">⚔️ Competitors</h2>
                                        <ul className="list-disc list-inside">
                                            <li>Playo</li>
                                            <li>BookMyCourt</li>
                                            <li>SportzVillage</li>
                                        </ul>
                                    </section>
                                </div>
                            )}
                        </div>
                        <div className="bg-[#030311] rounded-lg border border-gray-900 shadow-lg">
                            <button
                                onClick={() => setOpenDropdowns(prev => ({
                                    ...prev,
                                    cricheros: !prev.cricheros
                                }))}
                                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-800 transition-colors duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950focus:ring-offset-2 focus:ring-offset-gray-900"
                            >
                                <div className="flex items-center justify-center alis space-x-3">
                                    {openDropdowns.cricheros ? (
                                        <ChevronDown className="w-4 h-4 text-gray-300 transition-transform duration-200" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4 text-gray-300 transition-transform duration-200" />
                                    )}

                                    <div className=" flex items-center justify-center">
                                        <Image className='w-full h-full object-cover'
                                            src='/product/amenities/cricheros.avif'
                                            width={40}
                                            height={60}
                                            alt='Small Banner'
                                            priority
                                        />
                                    </div>

                                    <span className="text-gray-100 font-semibold text-xl text-left">
                                        CricHeros
                                    </span>
                                </div>
                            </button>

                            {openDropdowns.cricheros && (
                                <div>
                                    <ExpandImage className='w-full object-cover pt-4 px-4'
                                        src='/product/amenities/cricheros1.webp'
                                        width={918}
                                        height={800}
                                        alt='Small Banner'
                                        priority
                                    />
                                    <ExpandImage className='w-full object-cover pt-2 px-4'
                                        src='/product/amenities/cricheros2.webp'
                                        width={918}
                                        height={800}
                                        alt='Small Banner'
                                        priority
                                    />
                                    <ExpandImage className='w-full object-cover pt-2 px-4'
                                        src='/product/amenities/cricheros3.webp'
                                        width={918}
                                        height={800}
                                        alt='Small Banner'
                                        priority
                                    />
                                    <ExpandImage className='w-full object-cover pt-2 px-4'
                                        src='/product/amenities/cricheros4.webp'
                                        width={918}
                                        height={800}
                                        alt='Small Banner'
                                        priority
                                    />
                                    <ExpandImage className='w-full object-cover pt-2 px-4'
                                        src='/product/amenities/cricheros5.webp'
                                        width={918}
                                        height={800}
                                        alt='Small Banner'
                                        priority
                                    />
                                    <ExpandImage className='w-full object-cover pt-2 px-4'
                                        src='/product/amenities/cricheros6.webp'
                                        width={918}
                                        height={800}
                                        alt='Small Banner'
                                        priority
                                    />
                                    <ExpandImage className='w-full object-cover pt-2 px-4'
                                        src='/product/amenities/cricheros7.webp'
                                        width={918}
                                        height={800}
                                        alt='Small Banner'
                                        priority
                                    />
                                </div>
                            )}
                        </div>

                        <div className="bg-[#030311] rounded-lg border border-gray-900 shadow-lg">
                            <button
                                onClick={() => setOpenDropdowns(prev => ({
                                    ...prev,
                                    saistadia: !prev.saistadia
                                }))}
                                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-800 transition-colors duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950focus:ring-offset-2 focus:ring-offset-gray-900"
                            >
                                <div className="flex items-center justify-center alis space-x-3">
                                    {openDropdowns.saistadia ? (
                                        <ChevronDown className="w-4 h-4 text-gray-300 transition-transform duration-200" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4 text-gray-300 transition-transform duration-200" />
                                    )}

                                    <div className=" flex items-center justify-center">
                                        <Image className='w-full h-full object-cover'
                                            src='/product/amenities/saistadia.avif'
                                            width={40}
                                            height={60}
                                            alt='Small Banner'
                                            priority
                                        />
                                    </div>

                                    <span className="text-gray-100 font-semibold text-xl text-left">
                                        SAI Stadia
                                    </span>
                                </div>
                            </button>

                            {openDropdowns.saistadia && (
                                <div className="px-4 pb-4 border-t border-gray-700 mt-2 pt-4  slide-in-from-top-2 duration-200">
                                    <p className="text-gray-300 text-base leading-relaxed">
                                        SAI Stadia is a digital interface developed by the Sports Authority of India to streamline access and bookings across its nationwide sports complexes. The platform focuses on secure, verified access and user management.
                                    </p>

                                    <ExpandImage className='w-full object-cover pt-4 px-4'
                                        src='/product/amenities/saistadia1.webp'
                                        width={918}
                                        height={800}
                                        alt='Small Banner'
                                        priority
                                    />

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">💡 USPs</h2>
                                        <ul className="list-disc list-inside">
                                            <li>Government-backed platform by Sports Authority of India</li>
                                            <li>Strong emphasis on secure login and privacy protocols</li>
                                        </ul>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">🧰 Services Provided</h2>
                                        <ul className="list-disc list-inside">
                                            <li>Facility and event booking across SAI-managed stadiums</li>
                                            <li>Identity-verified access to sports infrastructure</li>
                                        </ul>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">🌟 Key Features</h2>
                                        <ul className="list-disc list-inside">
                                            <li>Robust user login with KYC and identity validation</li>
                                            <li>Centralized portal for access to multiple government stadiums</li>
                                        </ul>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">📈 Financial Highlights</h2>
                                        <p>Publicly funded initiative under the Ministry of Youth Affairs and Sports; financials not individually disclosed.</p>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">💰 Profit & Loss</h2>
                                        <p>Operates as a non-profit government platform; not profit-oriented.</p>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">🌍 Market Presence</h2>
                                        <ul className="list-disc list-inside">
                                            <li>Pan-India access across SAI facilities</li>
                                            <li>Primarily targets athletes, trainees, and sports academies</li>
                                        </ul>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">⚔️ Competitors</h2>
                                        <ul className="list-disc list-inside">
                                            <li>State-level sports portals</li>
                                            <li>Private booking apps (Playo, BookMyCourt)</li>
                                        </ul>
                                    </section>
                                </div>
                            )}
                        </div>
                        <div className="bg-[#030311] rounded-lg border border-gray-900 shadow-lg">
                            <button
                                onClick={() => setOpenDropdowns(prev => ({
                                    ...prev,
                                    upperhand: !prev.upperhand
                                }))}
                                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-800 transition-colors duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950focus:ring-offset-2 focus:ring-offset-gray-900"
                            >
                                <div className="flex items-center justify-center alis space-x-3">
                                    {openDropdowns.upperhand ? (
                                        <ChevronDown className="w-4 h-4 text-gray-300 transition-transform duration-200" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4 text-gray-300 transition-transform duration-200" />
                                    )}

                                    <div className=" flex items-center justify-center">
                                        <Image className='w-full h-full object-cover'
                                            src='/product/amenities/upperhand.avif'
                                            width={40}
                                            height={60}
                                            alt='Small Banner'
                                            priority
                                        />
                                    </div>

                                    <span className="text-gray-100 font-semibold text-xl text-left">
                                        Upperhand
                                    </span>
                                </div>
                            </button>

                            {openDropdowns.upperhand && (
                                <div className="px-4 pb-4 border-t border-gray-700 mt-2 pt-4  slide-in-from-top-2 duration-200">
                                    <p className="text-gray-300 text-base leading-relaxed">
                                        Upper Hand is a sports and fitness facility management platform designed to serve both facility owners/administrators and end users. It enables seamless scheduling, payments, and business operations across various sports and wellness services.
                                    </p>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">💡 USPs</h2>
                                        <ul className="list-disc list-inside">
                                            <li>Dual platform: supports both administrators and users</li>
                                            <li>Comprehensive scheduling and staff management tools</li>
                                        </ul>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">🧰 Services Provided</h2>
                                        <ul className="list-disc list-inside">
                                            <li>Facility and class bookings</li>
                                            <li>Client and membership management</li>
                                            <li>Payment processing and revenue tracking</li>
                                        </ul>
                                    </section>

                                    <ExpandImage className='w-full object-cover pt-8 px-4'
                                        src='/product/amenities/upperhand1.webp'
                                        width={918}
                                        height={800}
                                        alt='Small Banner'
                                        priority
                                    />
                                    <ExpandImage className='w-full object-cover pt-2 px-4'
                                        src='/product/amenities/upperhand2.webp'
                                        width={918}
                                        height={800}
                                        alt='Small Banner'
                                        priority
                                    />
                                    <ExpandImage className='w-full object-cover pt-2 px-4'
                                        src='/product/amenities/upperhand3.webp'
                                        width={918}
                                        height={800}
                                        alt='Small Banner'
                                        priority
                                    />
                                    <ExpandImage className='w-full object-cover pt-2 px-4'
                                        src='/product/amenities/upperhand4.webp'
                                        width={918}
                                        height={800}
                                        alt='Small Banner'
                                        priority
                                    />

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">🌟 Key Features</h2>
                                        <ul className="list-disc list-inside">
                                            <li>Branded customer booking portals</li>
                                            <li>Mobile app for staff and clients</li>
                                            <li>Data analytics for business optimization</li>
                                        </ul>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">📈 Financial Highlights</h2>
                                        <p>Privately funded; specific revenue figures not publicly available.</p>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">💰 Profit & Loss</h2>
                                        <p>Financial details are not disclosed, but the company is actively scaling its SaaS offering across North America.</p>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">🌍 Market Presence</h2>
                                        <ul className="list-disc list-inside">
                                            <li>Widely used by gyms, fitness studios, and sports facilities in the US</li>
                                            <li>Trusted by both large franchises and individual instructors</li>
                                        </ul>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">⚔️ Competitors</h2>
                                        <ul className="list-disc list-inside">
                                            <li>Mindbody</li>
                                            <li>WellnessLiving</li>
                                            <li>EZFacility</li>
                                        </ul>
                                    </section>
                                </div>
                            )}
                        </div>
                        <div className="bg-[#030311] rounded-lg border border-gray-900 shadow-lg">
                            <button
                                onClick={() => setOpenDropdowns(prev => ({
                                    ...prev,
                                    okrabook: !prev.okrabook
                                }))}
                                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-800 transition-colors duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950focus:ring-offset-2 focus:ring-offset-gray-900"
                            >
                                <div className="flex items-center justify-center alis space-x-3">
                                    {openDropdowns.okrabook ? (
                                        <ChevronDown className="w-4 h-4 text-gray-300 transition-transform duration-200" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4 text-gray-300 transition-transform duration-200" />
                                    )}

                                    <div className=" flex items-center justify-center">
                                        <Image className='w-full h-full object-cover'
                                            src='/product/amenities/okrabook.avif'
                                            width={40}
                                            height={60}
                                            alt='Small Banner'
                                            priority
                                        />
                                    </div>

                                    <span className="text-gray-100 font-semibold text-xl text-left">
                                        Okrabook
                                    </span>
                                </div>
                            </button>

                            {openDropdowns.okrabook && (
                                <div className="px-4 pb-4 border-t border-gray-700 mt-2 pt-4  slide-in-from-top-2 duration-200">
                                    <p className="text-gray-300 text-base leading-relaxed">
                                        Okrabook is a comprehensive sports and fitness management platform offering structured solutions for training, facility bookings, and fitness operations. It caters to businesses with a focus on streamlining sports and wellness services through technology.
                                    </p>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">💡 USPs</h2>
                                        <ul className="list-disc list-inside">
                                            <li>Dedicated modules for sports training, facility booking, and fitness management</li>
                                            <li>All-in-one platform for clubs, academies, and fitness centers</li>
                                        </ul>
                                    </section>

                                    <ExpandImage className='w-full object-cover pt-4 px-72'
                                        src='/product/amenities/okrabook1.webp'
                                        width={918}
                                        height={800}
                                        alt='Small Banner'
                                        priority
                                    />

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">🧰 Services Provided</h2>
                                        <ul className="list-disc list-inside">
                                            <li>Sports training program management</li>
                                            <li>Facility booking system</li>
                                            <li>Fitness class scheduling and attendance tracking</li>
                                        </ul>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">💳 Payment Model</h2>
                                        <p>Okrabook operates on a subscription-based payment system for its services.</p>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">📈 Financial Highlights</h2>
                                        <p>Financial data is not publicly available; operates as a growing SaaS product.</p>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">💰 Profit & Loss</h2>
                                        <p>No public disclosure on profit and loss figures.</p>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">🌍 Market Presence</h2>
                                        <ul className="list-disc list-inside">
                                            <li>Used by sports clubs, academies, and fitness centers across various regions</li>
                                            <li>Focused on digital transformation of sports and wellness facilities</li>
                                        </ul>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">⚔️ Competitors</h2>
                                        <ul className="list-disc list-inside">
                                            <li>Upper Hand</li>
                                            <li>Playbycourt</li>
                                            <li>EZFacility</li>
                                        </ul>
                                    </section>
                                </div>
                            )}
                        </div>
                        <div className="bg-[#030311] rounded-lg border border-gray-900 shadow-lg">
                            <button
                                onClick={() => setOpenDropdowns(prev => ({
                                    ...prev,
                                    playspots: !prev.playspots
                                }))}
                                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-800 transition-colors duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950focus:ring-offset-2 focus:ring-offset-gray-900"
                            >
                                <div className="flex items-center justify-center alis space-x-3">
                                    {openDropdowns.playspots ? (
                                        <ChevronDown className="w-4 h-4 text-gray-300 transition-transform duration-200" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4 text-gray-300 transition-transform duration-200" />
                                    )}

                                    <div className=" flex items-center justify-center">
                                        <Image className='w-full h-full object-cover'
                                            src='/product/amenities/playspots.avif'
                                            width={40}
                                            height={60}
                                            alt='Small Banner'
                                            priority
                                        />
                                    </div>

                                    <span className="text-gray-100 font-semibold text-xl text-left">
                                        Play Spots
                                    </span>
                                </div>
                            </button>

                            {openDropdowns.playspots && (
                                <div className="px-4 pb-4 border-t border-gray-700 mt-2 pt-4  slide-in-from-top-2 duration-200">
                                    <p className="text-gray-300 text-base leading-relaxed">
                                        Play Spots is a user-friendly app focused on helping players discover, book, and manage sports facilities nearby. It aims to make sports participation more accessible and rewarding for everyday users.
                                    </p>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">💡 USPs</h2>
                                        <ul className="list-disc list-inside">
                                            <li>Digital wallet system for payments</li>
                                            <li>Redeemable reward points for user engagement</li>
                                        </ul>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">🧰 Services Provided</h2>
                                        <ul className="list-disc list-inside">
                                            <li>Facility search and instant booking</li>
                                            <li>Wallet-based payments and discounts</li>
                                            <li>Loyalty reward point system</li>
                                        </ul>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">💳 Payment Model</h2>
                                        <p>Wallet-based transactions integrated with loyalty rewards and offers.</p>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">📈 Financial Highlights</h2>
                                        <p>Financial data is not publicly disclosed.</p>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">💰 Profit & Loss</h2>
                                        <p>No public data available regarding profitability or financial losses.</p>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">🌍 Market Presence</h2>
                                        <ul className="list-disc list-inside">
                                            <li>Popular among casual and regular sports players</li>
                                            <li>Focuses on urban centers with high sports facility demand</li>
                                        </ul>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold mt-6 mb-2">⚔️ Competitors</h2>
                                        <ul className="list-disc list-inside">
                                            <li>Playo</li>
                                            <li>BookMySports</li>
                                            <li>Sportido</li>
                                        </ul>
                                    </section>
                                </div>
                            )}
                        </div>

                        <div className='pt-8'>{`After analyzing all the competitors I have made this following chart indicating the experience & features they provide to users. Here x-axis = Level of features & y-axis = Level of user experience.`}</div>

                        <ExpandImage className='w-full h-full object-cover pt-4'
                            src='/product/amenities/competitors.webp'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />

                        <div
                            id='ideation'
                            className='pt-12 text-3xl font-offbit'>IDEATION</div>

                        <section className="py-4  slide-in-from-top-2 duration-200">
                            <p className="text-base leading-relaxed">
                                The ideation phase focuses on generating diverse solutions by expanding on insights gathered during research. Rooted in the Double Diamond framework, this stage emphasizes breadth—through brainstorming, quick prototyping, and testing—to explore varied approaches. The goal is to identify high-impact, feasible ideas that align with user needs and product vision.
                            </p>
                            <p className="text-base leading-relaxed pt-8">
                                These were the new Brainstorming ideas generated through user research,  and free association of thoughts.
                            </p>
                        </section>

                        <div className='flex gap-12 pt-2'>
                            <div className='flex-1'>
                                <ul className="list-disc list-outside pl-5 flex flex-col gap-4">
                                    <li>Block out times in which training sessions would be held.</li>
                                    <li>Capacity of accommodation should be assigned to each sport at a given time slot.</li>
                                    <li>Live updates of the list of bookings.</li>
                                    <li>Options for scheduling bookings of every event.</li>
                                    <li>A check-in status via QR code at the ground.</li>
                                    <li>A section for complaints and FAQs.</li>
                                    <li>Section of "My Bookings" to view past bookings.</li>
                                    <li>Priority booking in which regular users would get a preference.</li>
                                    <li>Calendar view gives a whole overview on all bookings, holidays, availability.</li>
                                    <li>24/7 online booking servers.</li>
                                    <li>Secure payment.</li>
                                    <li>Fitness management system.</li>
                                </ul>
                            </div>
                            <div className='flex-1'>
                                <ul className="list-disc list-outside pl-5 flex flex-col gap-4">
                                    <li>Digital wallet system and reward points on regular gameplay.</li>
                                    <li>Subscription based plans.</li>
                                    <li>1 student - 1 ID - 1 login security feature.</li>
                                    <li>Dividing time slots for every sport and activity.</li>
                                    <li>Option to cancel bookings.</li>
                                    <li>Section for default player settings with friends/teammates.</li>
                                    <li>Gives staff a special access and an unlocked interface.</li>
                                    <li>College wide support.</li>
                                    <li>Associations and partnered existing clubs.</li>
                                    <li>Instant feedback system.</li>
                                    <li>Set up memberships.</li>
                                    <li>Members communication.</li>
                                    <li>Marketing and advertising your facility.</li>
                                </ul>
                            </div>
                        </div>
                        <div
                            id='propositions'
                            className='pt-12 text-3xl font-offbit'>EARLY PROPOSITIONS</div>

                        <div className='pt-4 font-semibold text-xl'>{`Hopes and Fears Approach`}</div>
                        <p className="text-base leading-relaxed pt-3">
                            Hopes and fears is an approach to ideation that involves considering users' positive aspirations and negative concerns to generate ideas that address their needs and desires.
                        </p>
                        <ExpandImage className='w-full h-full object-cover pt-4'
                            src='/product/amenities/hopesnfears.webp'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />
                        <div className='pt-12 font-semibold text-xl'>{`HMW Approach`}</div>
                        <p className="text-base leading-relaxed pt-3">
                            "How might we" is an approach to ideation that involves reframing problems as open-ended questions to stimulate creative thinking and generate a range of possible solutions.
                        </p>
                        <ExpandImage className='w-full h-full object-cover pt-4'
                            src='/product/amenities/hmw.webp'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />

                        <div
                            id='flow'
                            className='pt-12 pb-4 text-3xl font-offbit'>EARLY USER FLOW</div>

                        <ExpandImage className='w-full h-full object-cover'
                            src='/product/amenities/userflow.webp'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />

                        <div
                            id='working'
                            className='pt-12 pb-4 text-3xl font-offbit'>IDEATION LEVEL WORKING</div>

                        <section className="pb-4   slide-in-from-top-2 duration-200">
                            <p className=" text-base leading-relaxed mb-4">
                                Firstly, we are making an application to create digital booking system (which would be free of cost) with collaboration from the administration.
                            </p>

                            <h3 className="text-lg font-semibold mb-2">Secondly, the structure of the app would be as follows:</h3>
                            <ul className="list-disc space-y-1 pl-5 list-outside">
                                <li>Capacity of accommodation should be assigned to each sport at a given time slot.</li>
                                <li>Students will get a list of live updates on how many seats are booked at a point of time, seats available in preferred time slots. The students would also be given an option to opt out of receiving these notifications.</li>
                                <li>Students can schedule a booking 1 week prior (Meaning Bookings will open for up to one-week advanced booking).</li>
                                <li>A check-in status via QR code at the student’s club.</li>
                                <li>A section where people can post their complaints and/or FAQs which can be taken up depending on priority.</li>
                                <li>An option to share and create a group can also be given where the amenities/sports facilities can be booked by an entire group for a particular time instead of having every individual member of the group separately book the same amenity for the same time. When playing as a team. This can also be used in case a very experienced player gets a slot with a beginner then this could be hindering for the skilled player.</li>
                                <li>There are some sports which can be played in doubles as well as in quadruples so Let’s say the app will suggest to either switch to 4-person game or to remain in 2 person and book next slot.</li>
                                <li>Students will have a separate view called “My Bookings” where they will be able to view all their past as well as future bookings for up to 1 week.</li>
                                <li>The students will have the option to cancel their bookings as well at any point of time before 3 hours of actual game.</li>
                            </ul>

                            <h3 className="text-lg font-semibold mt-6 mb-2">Thirdly, there will many real-time problems that would be faced when the app goes live — solution to most of those problems is explained in the following points:</h3>
                            <ul className="list-disc list-outside pl-5 space-y-1">
                                <li>Some students will cause some obvious problems like spamming, fake booking, and mass bookings. Solution of this would be a preference-based status interface of student.</li>
                                <li>In Beginning all students will have a neutral status but if a student repeatedly books activities but doesn’t check in then he/she will get a unpreferred tag/flag meaning that if 55 students try to book a 50-seat activity then 50 neutral status students will get seat instead of unpreferred status.</li>
                                <li>Students will have to sign in through their IITR mail ID so we can have a proper management of (Unique student will get unique slot).</li>
                                <li>There would be a Dupli-checker which prevents multiple booking by same person at same time for different activities.</li>
                                <li>To avoid students making an automated script to book a sport venue every time, a “I am not a robot” validation can be kept in the application before the students submit the request if the student is flagged.</li>
                                <li>If a student after completing their slot timing don’t leave, then a flag or a tag can be raised by other students via informing the coach.</li>
                                <li>If a sport at a particular time slot don’t get the minimum no of players, then a link sharing system can be created which can be used to send in IITR social media groups so that sufficient number of players can join and this will also promote interaction and students engagement.</li>
                                <li>A slot can also be fixed in each sport in which beginners can join to learn the new sport.</li>
                                <li>Inter-IIT Players will get a fixed daily slot which cannot be booked.</li>
                            </ul>
                        </section>

                        <div
                            id='search'
                            className='pt-8 text-3xl font-offbit'>TO BE CONTINUED....</div>




                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default Page;