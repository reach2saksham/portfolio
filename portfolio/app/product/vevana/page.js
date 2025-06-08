"use client";
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Image from 'next/image';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import BlurImage from '@/app/components/BlurImage';
import ExpandImage from '@/app/components/ExpandImage';

const caseStudy = {
    industry: 'Apparel and Accessories',
    techStack: {
        'Design Tools': ['figma', 'canva'],
    },
    // Tech stack names for tooltips
    techStackNames: {
        'figma': 'Figma',
        'canva': 'Canva',
    },
    companyName: 'VEVANA',
    period: 'March 2025 - Present',
    domain: 'SUSTAINABLE PRODUCT',
    description: `VéVana - Fashion without Footprints" envisions creating a sustainable ,zero-waste circular model that will significantly reduce water pollution & consumption, air pollution, animal slaughter, and toxic environment contamination by transforming RICE STUBBLE into VEGAN LEATHER, as a sustainable alternative to traditional leather.`,
    sections: ['Overview', 'Highlights', 'The Problem', 'Market Validation', 'Caomparitive Analysis', 'Methodology', 'Cost Structure', 'USPs, Distribution & SDGs', 'Impact' ],
    role: ['Founder', 'Business Developer', 'Product Researcher'],
    collaborators: ['Aashi Jain'],
    deliverables: ['SDG 6: Clean Water & Sanitation', 'SDG 12: Responsible Consumption & Production', 'SDG 15: Life on Land'],
    timelineStatus: ['Ongoing', 'MVP Stage'],
    //   links: {
    //     liveProduct: 'https://rankmatrix.in/',
    //     // figmaFile: 'https://figma.com',
    //   },
    thewhat: `VéVana is a sustainable fashion initiative that transforms rice stubble into biodegradable vegan leather. Our mission is to offer a high-quality, cruelty-free, and eco-friendly alternative to traditional leather—built on a zero-waste circular model.`,
    thewhy: `Every year, over 92 million tons of rice stubble are burned in India, severely affecting air quality and public health. At the same time, the leather industry consumes excessive water, pollutes with toxic chemicals, and relies on animal slaughter. VéVana was born to solve these interconnected problems with one sustainable solution.`,
    thehow: `I was deeply inspired by the growing use of Mycelium-based technologies in sustainable fashion and noticed its presence across our competitive landscape. After conducting thorough market research, we realized that developing a similar product using rice stubble would be feasible—especially with access to the Biotechnology lab at IIT Roorkee. Being selected at the international level further validated our approach and progress.`,
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
                    <div className="w-full lg:w-3/4 pb-4 lg:pb-0">
                        <Image
                            src="/product/vevana/poster.png"
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
                                            'The Problem': 'problem',
                                            'Market Validation': 'market',
                                            'Comparitive Analysis': 'compete',
                                            'Methodology': 'method',
                                            'Cost Structure': 'cost',
                                            'USPs, Distribution & SDGs': 'usp',
                                            'Impact': 'impact',
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

                        <div className="flex flex-wrap pt-6 gap-4 md:gap-0 justify-between">
                            {[
                                ['ROLES', caseStudy.role],
                                ['COLLABORATORS', caseStudy.collaborators],
                                ['DELIVERABLES', caseStudy.deliverables],
                                ['TIMELINE & STATUS', caseStudy.timelineStatus],
                            ]
                                .filter(([_, items]) => items && items.length > 0) // Only show sections with items
                                .map(([title, items], idx) => (
                                    <div key={idx} className="flex flex-col gap-1 pt-6 lg:pt-0 w-fit">
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
                        <ExpandImage className='w-full h-fobject-cover pb-4'
                            src='/product/vevana/hult.png'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />

                        <div className="relative w-full h-full aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-l">
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src="https://www.youtube.com/embed/EoGtd_4nVLA?si=JTSxAUg1L1Pbig5M"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                        </div>

                        <div
                            id='problem'
                            className='pt-12 flex flex-col'>
                            <p className='text-3xl company'>THE PROBLEM</p>

                            <ExpandImage className='w-full h-full object-cover'
                                src='/product/vevana/3.png'
                                width={1660}
                                height={800}
                                alt='Small Banner'
                                priority
                            />
                            <ExpandImage className='w-full h-full object-cover'
                                src='/product/vevana/4.png'
                                width={1660}
                                height={800}
                                alt='Small Banner'
                                priority
                            />
                            <p
                                id='market'
                                className='pt-12 text-3xl company'>MARKET VALIDATION</p>

                            <ExpandImage className='w-full h-full object-cover'
                                src='/product/vevana/5.png'
                                width={1660}
                                height={800}
                                alt='Small Banner'
                                priority
                            />

                            <p id='compete'
                                className='pt-12 text-3xl company'>COMPARITIVE ANALYSIS</p>

                            <ExpandImage className='w-full h-full object-cover'
                                src='/product/vevana/17.png'
                                width={1660}
                                height={800}
                                alt='Small Banner'
                                priority
                            />

                            <p className='unican text-2xl pt-4'>Some of our Competitors Include:</p>
                            <div>
                                <p className='pt-2'>1. Recore</p>
                                <p>2. Banofi Leather</p>
                                <p>3. Prara</p>
                                <p>4. Winner Nippon Leatherette Pvt Ltd</p>
                                <p className='pt-2'>VéVana stands out by using locally-sourced rice stubble, offering a lower-cost, zero-waste production process, and focusing on farmer empowerment while tackling air pollution</p>
                            </div>

                            <p id='method'
                                className='pt-12 text-3xl company'>METHODOLOGY</p>
                                <ExpandImage className='w-full h-full object-cover'
                                src='/product/vevana/7.png'
                                width={1660}
                                height={800}
                                alt='Small Banner'
                                priority
                            />
                                <ExpandImage className='w-full h-full object-cover'
                                src='/product/vevana/method.png'
                                width={1660}
                                height={800}
                                alt='Small Banner'
                                priority
                            />
                                <ExpandImage className='w-full h-full object-cover'
                                src='/product/vevana/10.png'
                                width={1660}
                                height={800}
                                alt='Small Banner'
                                priority
                            />

                            <p id='cost'
                                className='pt-12 text-3xl company'>COST STRUCTURE</p>

                            <ExpandImage className='w-full h-full object-cover'
                                src='/product/vevana/15.png'
                                width={1660}
                                height={800}
                                alt='Small Banner'
                                priority
                            />

                            <p className='pt-2'>We will initially operate in the B2C market, offering sustainable vegan leather products directly to consumers. This will allow us to build brand recognition & validate our product. As we scale, we will expand in a B2B model, supplying to different industries. </p>
                            <p className='unican text-2xl pt-4'>Our revenue streams include:</p>
                            <span className='pt-2'>1. Direct-to-Consumer: Vegan leather accessories (wallets, belts, handbags) through e-commerce & sustainable marketplaces.</span>
                            <p>2. B2B Supply: Partnering with various industries</p>
                            <p>3. Technology Licensing: Licensing our production process</p>
                            <p id='usp'
                                className='pt-12 text-3xl company'>USP, DISTRIBUTION & SGS</p>

                            <ExpandImage className='w-full h-full object-cover'
                                src='/product/vevana/9.png'
                                width={1660}
                                height={800}
                                alt='Small Banner'
                                priority
                            />
                            <ExpandImage className='w-full h-full object-cover'
                                src='/product/vevana/16.png'
                                width={1660}
                                height={800}
                                alt='Small Banner'
                                priority
                            />
                            <ExpandImage className='w-full h-full object-cover'
                                src='/product/vevana/18.png'
                                width={1660}
                                height={800}
                                alt='Small Banner'
                                priority
                            />

                            <p id='impact'
                                className='pt-12 text-3xl company'>IMPACT</p>

                            <ExpandImage className='w-full h-full object-cover'
                                src='/product/vevana/6.png'
                                width={1660}
                                height={800}
                                alt='Small Banner'
                                priority
                                />

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