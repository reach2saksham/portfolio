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
    'User Research': 'research',
    'The Process': 'process',
    'Web-App Design': 'webapp',
    'Case Study Design': 'casestudy',
};

const caseStudy = {
    industry: 'Tech-Consulting',
    techStack: {
        'Design Tool': ['figma'],
    },
    // Tech stack names for tooltips
    techStackNames: {
        'figma': 'Figma',
    },
    companyName: 'UIX LABS',
    period: 'August 2024 - September 2024',
    domain: 'INTERNSHIP',
    description: `At UIX Labs ( A firm that builds Tech Products for other companies ), I worked on improving the experience for their high-profile clients by building two things from scratch, a web app for tracking employees and projects to streamline internal processes, and a case study template for showcasing completed projects on their website, designed to be reused across all future work. `,
    sections: Object.keys(SECTIONS_CONFIG), // Use the centralized config
    role: ['UI/UX Designer', 'Product Manager'],
    collaborators: ['Designer: Rahul', 'Co-Founder: Ayush Agrawal'],
    deliverables: ['Dashboard - Member Section', 'Case study page tempelate', 'Employee life cycle UX research'],
    timelineStatus: ['Completed'],
    links: {
        liveProduct: 'https://uixlabs.co/blusmart',
        // figmaFile: 'https://figma.com',
    },
    thewhat: `An internal web-app's dashboard, designed for clients to track the project and employees working on it. A case study landing page template, designed to be reused across all future and past works.`,
    thewhy: `This dashboard was necessary because clients previously lacked real-time, in-depth visibility into project progress. It was also designed with future expansion in mind, as these clients often absorb employees from the firm for varying durations. The team members working on the project typically have the deepest understanding of it, making them the most suitable to support ongoing needs.`,
    thehow: `My role was to design the dashboard from scratch, focusing only on the employee tracking section, as other features were to be added later based on requirements. I conducted thorough user research to understand the client's pain points and what they wanted to see in the dashboard. On the second hand, the case study page template was designed for reuse across both past and future projects, so I ensured it was user-friendly and followed a consistent design language with the rest of the website. Extensive moodboarding and multiple iterations were done to arrive at the final designs.`,
};

const Page = () => {
    const [selectedSection, setSelectedSection] = useState(0);
    const [activeMode, setActiveMode] = useState('iteration1');
    const [isManualClick, setIsManualClick] = useState(false);
    const [hoveredImage, setHoveredImage] = useState(null);
    

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
                        <video
                            src="/design/uix-labs/cover.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className=""
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
                                        <div>LIVE CASE STUDY WEBPAGE</div>
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
                        <ExpandImage className='w-full h-fobject-cover pt-4 pb-4'
                            src='/design/uix-labs/highlight.avif'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />
                        <div
                            id='research'
                            className='pt-12 flex flex-col'>
                            <div className='text-3xl company'>USER RESEARCH</div>
                        </div>

                        <ExpandImage className='w-full h-full object-cover pt-4'
                            src='/design/uix-labs/client.avif'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />
                        <div className='py-4'>{`The firm follows a time-logging system, allowing members to work flexibly outside of scheduled meetings, provided their hours are logged. During my internship, this process was still being managed via Google Sheets. However, discrepancies often arose, especially with new members and interns, whose logs needed closer monitoring to prevent misuse. This created a need for role-based access, typically granted to a senior team member familiar with the project. In some cases, the client company also requested access for cross-verification. A proper system was required to document, store, and manage time logs, with clear approval controls in place.`}</div>

                        <ExpandImage className='w-full h-full object-cover pt-4'
                            src='/design/uix-labs/persona.avif'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />

                        <div
                            id='process'
                            className='pt-12 text-3xl company'>THE PROCESS</div>

                        <div className='py-4'>{`Due to a Non-Disclosure Agreement, most internal processes and details cannot be shared. However, select wireframes that represent the web app's journey are showcased below.`}</div>

                        <ExpandImage className='w-full h-full object-cover pt-6'
                            src='/design/uix-labs/process.avif'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />

                        <div className='py-8'>{`During the expansion phase, our core focus was to create a seamless experience. It was decided that both a mobile app and a web app would be developed simultaneously by separate teams, with some shared members to ensure interconnectivity. As my team was still being formed, the wireframes below represent my initial concepts for the mobile app.`}</div>

                        <div className='flex justify-center'>
                            <ExpandImage className='w-3/4 h-3/4 object-cover'
                                src='/design/uix-labs/wf1.avif'
                                width={1660}
                                height={800}
                                alt='Small Banner'
                                priority
                            />
                        </div>

                        <div className='py-6'>{`Now, looking at the above wireframes, I was eventually asked to shif the focus on the web app (just kidding, a designer was already assigned to the mobile app). These wireframes were created at a very early stage, before any user research had been conducted, and served purely as foundational concepts.`}</div>

                        <div className='pb-6'>{`In terms of design thinking, the process will begin every time with a senior member from UIX Labs, already present on the club platform, creating the project and filling in all essential initial details to kickstart it. Additional members could only join the project through invitation. The UIX lead would send an invite to the affiliated company's email ID, add them to the project, and assign them a role. Depending on their role, they could then invite other members as well.`}</div>

                        <div className='flex flex-col gap-1 md:flex-row'>
                            <ExpandImage
                                className='object-cover'
                                src='/design/uix-labs/wf2.avif'
                                width={464}
                                height={240}
                                alt='TCB Brand Image'
                                priority
                            />
                            <ExpandImage
                                className='object-cover'
                                src='/design/uix-labs/wf3.avif'
                                width={464}
                                height={240}
                                alt='TCW Brand Image'
                                priority
                            />
                        </div>

                        <div className='pt-6 pb-4'>{`At this stage, it was decided that the landing or hero section of the web app for clients would be a Discover section. This section would function as a dynamic, prompt-based interface, capable of delivering data analytics or insights related to the project. Powered by natural language processing, it would translate user prompts into database queries and generate accurate, real-time dashboard results.`}</div>
                        <div className='py-1'>{`Example 1: Show me the members in the project working on web development with a monthly pay under ₹1 Lakh.`}</div>
                        <div className='py-1'>{`Example 2: Show me the weekly synopsis of the project, including team efficiency and total hours contributed by all members.`}</div>
                        <div className='pt-4 pb-2'>{`The inspiration moodboard is shown below`}</div>

                        <ExpandImage className='w-full h-full object-cover pt-6'
                            src='/design/uix-labs/mood.avif'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />

                        <div className='pt-6'>{`There were several other high-fidelity wireframes involved, but considering the complexity of the application above, I was advised to focus on the Members section for now. The other sections can be added later once the foundation is properly laid. But defining those sections beforehand was necessary.`}</div>

                        <div
                            id='webapp'
                            className='pt-12 text-3xl company'>WEB-APP DESIGN</div>

                        {/* Desktop: Hover effect for signup images */}
                        <div
                            className="relative hidden md:block"
                            onMouseEnter={() => setHoveredImage('signup')}
                            onMouseLeave={() => setHoveredImage(null)}
                        >
                            <ExpandImage
                                className={`w-full h-full object-cover pt-4 transition-transform duration-400 ${hoveredImage === 'signup' ? 'opacity-0' : 'opacity-100'}`}
                                src='/design/uix-labs/signup.avif'
                                width={1660}
                                height={800}
                                alt='Small Banner'
                                priority
                            />
                            <ExpandImage
                                className={`w-full h-full object-cover pt-4 absolute top-0 left-0 transition-transform duration-400 ${hoveredImage === 'signup' ? 'opacity-100' : 'opacity-0'}`}
                                src='/design/uix-labs/signupdetails.avif'
                                width={1660}
                                height={800}
                                alt='Small Banner Details'
                                priority
                            />
                        </div>

                        {/* Mobile: Show both images */}
                        <div className="block md:hidden">
                            <ExpandImage
                                className='w-full h-full object-cover pt-4'
                                src='/design/uix-labs/signup.avif'
                                width={1660}
                                height={800}
                                alt='Small Banner'
                                priority
                            />
                            <ExpandImage
                                className='w-full h-full object-cover pt-4'
                                src='/design/uix-labs/signupdetails.avif'
                                width={1660}
                                height={800}
                                alt='Small Banner Details'
                                priority
                            />
                        </div>

                        <ExpandImage className='w-full h-full object-cover pt-4'
                            src='/design/uix-labs/login.avif'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />

                        <div className='pt-6'>{`Here, only a limited number of screens can be shared here since it's an internal app of the firm, but they should give you a clear idea of the web app's design and overall structure.`}</div>

                        {/* Desktop: Hover effect for sidebar images */}
                        <div
                            className="relative hidden md:block"
                            onMouseEnter={() => setHoveredImage('sidebar')}
                            onMouseLeave={() => setHoveredImage(null)}
                        >
                            <ExpandImage
                                className={`w-full h-full object-cover pt-4 transition-transform duration-400 ${hoveredImage === 'sidebar' ? 'opacity-0' : 'opacity-100'}`}
                                src='/design/uix-labs/sidebar.avif'
                                width={1660}
                                height={800}
                                alt='Small Banner'
                                priority
                            />
                            <ExpandImage
                                className={`w-full h-full object-cover pt-4 absolute top-0 left-0 transition-transform duration-400 ${hoveredImage === 'sidebar' ? 'opacity-100' : 'opacity-0'}`}
                                src='/design/uix-labs/sidebardetails.avif'
                                width={1660}
                                height={800}
                                alt='Small Banner Details'
                                priority
                            />
                        </div>

                        {/* Mobile: Show both images */}
                        <div className="block md:hidden">
                            <ExpandImage
                                className='w-full h-full object-cover pt-4'
                                src='/design/uix-labs/sidebar.avif'
                                width={1660}
                                height={800}
                                alt='Small Banner'
                                priority
                            />
                            <ExpandImage
                                className='w-full h-full object-cover pt-4'
                                src='/design/uix-labs/sidebardetails.avif'
                                width={1660}
                                height={800}
                                alt='Small Banner Details'
                                priority
                            />
                        </div>

                        {/* Desktop: Hover effect for screen1 images */}
                        <div
                            className="relative hidden md:block"
                            onMouseEnter={() => setHoveredImage('screen1')}
                            onMouseLeave={() => setHoveredImage(null)}
                        >
                            <ExpandImage
                                className={`w-full h-full object-cover pt-8 pb-4 transition-transform duration-400 ${hoveredImage === 'screen1' ? 'opacity-0' : 'opacity-100'}`}
                                src='/design/uix-labs/screen1.avif'
                                width={1660}
                                height={800}
                                alt='Small Banner'
                                priority
                            />
                            <ExpandImage
                                className={`w-full h-full object-cover pt-8 pb-4 absolute top-0 left-0 transition-transform duration-400 ${hoveredImage === 'screen1' ? 'opacity-100' : 'opacity-0'}`}
                                src='/design/uix-labs/screen1details.avif'
                                width={1660}
                                height={800}
                                alt='Small Banner Details'
                                priority
                            />
                        </div>

                        {/* Mobile: Show both images */}
                        <div className="block md:hidden">
                            <ExpandImage
                                className='w-full h-full object-cover pt-8 pb-4'
                                src='/design/uix-labs/screen1.avif'
                                width={1660}
                                height={800}
                                alt='Small Banner'
                                priority
                            />
                            <ExpandImage
                                className='w-full h-full object-cover pb-4'
                                src='/design/uix-labs/screen1details.avif'
                                width={1660}
                                height={800}
                                alt='Small Banner Details'
                                priority
                            />
                        </div>

                        <ExpandImage className='w-full h-full object-cover'
                            src='/design/uix-labs/screen2.avif'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />

                        <div className='flex flex-col gap-2 md:flex-row pt-4'>
                            <div className='md:w-[40%] pt-6 md:pt-12'>{`Now, you might be wondering where is a essential feature like messaging with members. While they can be easily integrated, as shown in the image, with a UI similar to Gmail or Facebook messaging, they were intentionally excluded from this early version based on a decision made by the higher-ups. Similarly, aliases are used instead of names because of security purposes.`}</div>
                            <ExpandImage
                                className='object-cover pt-4 md:w-[60%]'
                                src='/design/uix-labs/messages.avif'
                                width={560}
                                height={240}
                                alt='TCW Brand Image'
                                priority
                            />
                        </div>

                        <div
                            id='casestudy'
                            className='pt-12 text-3xl company'>CASE STUDY TEMPELATE DESIGN</div>

                        <div className='pt-4'>{`To keep the process simple, I began with a basic moodboard that guided me while designing the case study template.`}</div>

                        <ExpandImage className='w-full h-full object-cover pt-4'
                            src='/design/uix-labs/mood2.avif'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />

                        <div className='pt-4'>{`It took four iterations to get it finalized, as the goal was to create an extremely reusable template, the one that wouldn't require any significant manual effort. Click below to view all four iterations.`}</div>

                        <div className='pt-10 flex flex-col gap-8'>
                            <div className='flex gap-6'>
                                <button
                                    className={`tags ${activeMode === 'iteration1' ? 'bg-[#606060]' : ''} p-2 rounded-lg`}
                                    onClick={() => setActiveMode('iteration1')}>
                                    Iteration 1
                                </button>
                                <button
                                    className={`tags ${activeMode === 'iteration2' ? 'bg-[#606060]' : ''} p-2 rounded-lg`}
                                    onClick={() => setActiveMode('iteration2')}>
                                    Iteration 2
                                </button>
                                <button
                                    className={`tags ${activeMode === 'iteration3' ? 'bg-[#606060]' : ''} p-2 rounded-lg`}
                                    onClick={() => setActiveMode('iteration3')}>
                                    Iteration 3
                                </button>
                                <button
                                    className={`tags ${activeMode === 'iteration4' ? 'bg-[#606060]' : ''} p-2 rounded-lg`}
                                    onClick={() => setActiveMode('iteration4')}>
                                    Iteration 4
                                </button>
                            </div>
                            <div>
                                {activeMode === 'iteration1' && (
                                    <div className='flex flex-col gap-4'>
                                        <ExpandImage className='w-full h-full object-cover'
                                            src='/design/uix-labs/iteration1.avif'
                                            width={1660}
                                            height={800}
                                            alt='Small Banner'
                                            priority
                                        />
                                    </div>
                                )}

                                {activeMode === 'iteration2' && (
                                    <div className='flex flex-col gap-4'>
                                        <ExpandImage className='w-full h-full object-cover'
                                            src='/design/uix-labs/iteration2.avif'
                                            width={1660}
                                            height={800}
                                            alt='Small Banner'
                                            priority
                                        />
                                    </div>
                                )}
                            
                                {activeMode === 'iteration3' && (
                                    <div className='flex flex-col gap-4'>
                                        <ExpandImage className='w-full h-full object-cover'
                                            src='/design/uix-labs/iteration3.avif'
                                            width={1660}
                                            height={800}
                                            alt='Small Banner'
                                            priority
                                        />
                                    </div>
                                )}

                                {activeMode === 'iteration4' && (
                                    <div className='flex flex-col gap-4'>
                                        <ExpandImage className='w-full h-full object-cover'
                                            src='/design/uix-labs/iteration4.avif'
                                            width={1660}
                                            height={800}
                                            alt='Small Banner'
                                            priority
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='py-6'>{`While going through these iterations, do keep in mind that I didn't get to fully complete any single version. I was consistently asked to transition into newer designs as new goals were introduced, hence the multiple iterations. The evolution reflects a journey: from an early Notion-inspired aesthetic, to progressively enhancing the quality of mockups and detailing, and finally, to striking the right balance between various stakeholder needs. `}</div>

                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default Page;