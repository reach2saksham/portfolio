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
    'Basis of Analysis': 'basis',
    'Foundation': 'foundation',
    "Company's Timeline": 'timeline',
    'Strategy': 'strategy',
    'Financials & Investors': 'finance',
    'Vision & USP': 'vision',
    'Competitor Analysis': 'competitor',
    'Subsidaries': 'subsidaries',
    'Market': 'market',
    'Present Product': 'product',
    'Current Affaris': 'affairs',
    'Current Drawbacks': 'drawbacks',
};

const caseStudy = {
    industry: 'Insurance Industry',
    techStack: {
        'Design Tool': ['prezi', 'excalidraw',],
        'Analyst Tool': ['excel'],
    },
    // Tech stack names for tooltips
    techStackNames: {
        'prezi': 'Prezi',
        'excalidraw': 'Excalidraw',
        'excel': 'MS Excel',
    },
    companyName: 'Policybazaar',
    period: 'August 2023',
    domain: 'VENTURE ANALYSIS',
    description: `This case study unpacks the foundational strategy of a high-potential startup by tracing its origin story, vision pivots, and launch trajectory. It dives deep into market segmentation, TAM/SAM/SOM analysis, and USP positioning, while also mapping brand-wise distribution and investor sentiment. Key risk zones—regulatory, technological, and financial—are identified, alongside design and UX inefficiencies, stock analysis, blance sheet checks concluding with actionable insights to de-risk and optimize the growth path.`,
    sections: Object.keys(SECTIONS_CONFIG), // Use the centralized config
    role: ['Venture Analyst'],
    collaborators: ['Poornima Joshi'],
    deliverables: ['Complete Ovierview', 'Financial & Competitor Analysis', 'Current Affairs & Future Scopes'],
    timelineStatus: ['Completed'],
    links: {
        liveProduct: 'https://prezi.com/p/r8_qiiuwhtrt/?present=1',
        // figmaFile: 'https://figma.com',
    },
    thewhat: `My responsiblity was to thorougly decipher and understand the company's business model and functioning. This inovlved analyzing the foundational origin jounrey, their strategies, vision, USP, investor's sentiments, competition, unfare advantages, daughter companies, market demographics, current affairs, UI/UX analysis of present product, stock analysis, balance sheet checks, and drawbacks.`,
    thewhy: `For understanding the strategic underpinnings of a high-potential startup in the insurance sector. It provides a comprehensive analysis of the company's business model, market positioning, and operational challenges, about how it almost monoplized the market.`,
    thehow: `A lot of documentation, literatutre, podcasts, and news studies, etc was involved to reach the outcomes of this case study. Qualitative research was done to understand the drawbacks and gaps in the current functioning of the company. Web-scraping was done to gather data on the company's retention metrics. Finallly the UI/UX analsyis was done by thoroughly using the product and understanding the user journey, pain points, and areas of improvement.`,
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
                            src="/consult/policybazaar/cover.avif"
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
                                        <div>LIVE PRESENTATION</div>
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
                            id='basis'
                            className='pt-12 flex flex-col'>
                            <div className='text-3xl company'>BASIS OF ANALYSIS</div>
                        </div>

                        <ExpandImage className='w-full h-full object-cover pt-4'
                            src='/consult/policybazaar/1.avif'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />

                        <div className='pt-4'>{`This iceberg isn't just a visual, it's a layered metaphor for PB Fintech's industry presence. At first glance, it may seem like a FinTech company, but beneath the surface lies the emerging InsureTech sector. The submerged base represents PB Fintech's foundation, strategies and distribution networks that are largely invisible to the public eye. As we ascend,we start to see the iceberg under the sky in the form of company's visibility and the role of Paisabazaar and Docprime, two flanking seperate pillars that supports and protects the main iceberg that is PB Fintech, mostly comprising of Policybazaar. The tip of the iceberg is what the common man sees: their visible, accessible products. `}</div>

                        <div
                            id='foundation'
                            className='pt-8 flex flex-col'>
                            <div className='text-3xl company'>FOUNDATION</div>
                        </div>
                        <ExpandImage className='w-full h-full object-cover pt-4'
                            src='/consult/policybazaar/2.avif'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />
                        <ExpandImage className='w-full h-full object-cover pt-4'
                            src='/consult/policybazaar/3.avif'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />
                        <div className="relative py-48 my-4 w-full h-full aspect-video bg-gray-100 overflow-hidden shadow-l">
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src="https://www.youtube.com/embed/BaVzi2IHa9k?si=GXBOwBVQS7OXBJwC"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                        </div>
                        <ExpandImage className='w-full h-full object-cover '
                            src='/consult/policybazaar/4.avif'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />
                        <ExpandImage className='w-full h-full object-cover pt-4'
                            src='/consult/policybazaar/5.avif'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />
                        <div
                            id='timeline'
                            className='pt-12 flex flex-col'>
                            <div className='text-3xl company'>COMPANY'S TIMELINE</div>
                        </div>
                        <a
                            href="https://excalidraw.com/#room=7eee25393f404024b0f4,jGPODY_NSRSg0hJG9807sA"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-1/2 my-4 bg-[#131313] flex items-start justify-between p-4 rounded-md border-[#363636] border-opacity-20 text-[#BBBBBB] text-xs"
                        >
                            <div>CLICK TO SEE ON EXCALIDRAW</div>
                            <ChevronRightIcon className="h-4 w-4 text-[#BBBBBB]" />
                        </a>
                        <ExpandImage className='w-full h-full object-cover pt-4'
                            src='/consult/policybazaar/7a.png'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />
                        <div className='pt-4'>I highly recommend viewing this timeline live on Excalidraw.</div>
                        <div className='pt-2'>{`It presents a comprehensive and meticulously detailed account of Policybazaar's journey, capturing all major milestones, structural changes, and pivotal moments in the company's evolution. The timeline also illustrates when and how key investors entered the picture, highlighting their contributions in terms of timing, strategic influence, and capital investment.`}</div>
                        <div
                            id='strategy'
                            className='pt-8 flex flex-col'>
                            <div className='text-3xl company'>STRATEGY</div>
                        </div>
                        <ExpandImage className='w-full h-full object-cover pt-4'
                            src='/consult/policybazaar/8.avif'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />
                        <div className='pt-4'>{`To understand what was happening with Policybazaar during this period, think of it like Steam—the popular video game distribution platform. Steam didn't create or own the games it sold; it simply built a robust marketplace for game developers to list and distribute their titles. Similarly, Policybazaar wasn't creating insurance policies, but was building a powerful digital platform where various insurers could list and sell their offerings. This phase of the timeline marks the addition of major policy providers, solidifying Policybazaar's role as the go-to distribution hub for insurance in India. `}</div>

                        <div className='pt-4'>You might be wondering why I've highlighted mutual funds in the strategy slide?</div>

                        <div className='pt-2'>{`The reason is quite fascinating and underscores Policybazaar's clever market positioning and controlled brand visibility. Mutual funds in India are often associated with risk, amplified by regulatory disclaimers in advertisements that emphasize volatility. Naturally, this could conflict with the trust-driven, transparent image Policybazaar has cultivated as a neutral policy marketplace.`}</div>
                        <div className='pt-2'>{`So, did Policybazaar completely sidestep this space to protect its brand perception? Not quite. Instead, they adopted a low-visibility strategy. Mutual funds are not even mentioned on the homepage, and there's little to no aggressive marketing around them. However, with a simple search, users can land on Policybazaar's mutual funds page (https://www.policybazaar.com/funds/) a product offering quietly tucked into their ecosystem.`}</div>
                        <div className='pt-2'>{`This intentional concealment aligns with how the mutual fund audience behaves: those interested are typically informed and research-driven. Policybazaar leverages this by maintaining trust with the general public while still tapping into the mutual funds segment in a subtle, brand-safe way.`}</div>
                        <div
                            id='finance'
                            className='pt-12 text-3xl company'>FINANCIALS & INVESTORS</div>

                        <ExpandImage className='w-full h-full object-cover pt-4'
                            src='/consult/policybazaar/9.avif'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />
                        <div className='py-4'>{`At first glance, this financial chart may suggest that Policybazaar is incurring losses, as its expenses appear to exceed revenue. However, it's important to note that this data represents Policybazaar alone, not the entire parent company, PB Fintech Ltd. A deeper look into the stock analysis of PB Fintech reveals the full picture, uncovering the actual business model and strategic play behind Policybazaar's operations.`}</div>
                        <ExpandImage className='w-full h-full object-cover pt-2'
                            src='/consult/policybazaar/9a.jpg'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />
                        <div id="financial" className="pt-4 flex flex-col gap-4 sm:gap-6">
                            <div className="pt-2 text-sm sm:text-base">
                                I make it a habit to carefully analyze the balance sheet of a company to assess its actual financial health and more importantly, to ensure that its total equity and liabilities match total assets, as this reflects proper accounting and financial structure.
                            </div>

                            <div className="grid gap-4 sm:gap-6 text-sm text-[#BBBBBB]">
                                {[
                                    {
                                        title: 'Total Assets Growth',
                                        content: (
                                            <>
                                                <div className="text-xs sm:text-sm">
                                                    FY 2021: ₹34,312.04 lakhs → FY 2022: ₹55,055.39 lakhs
                                                </div>
                                                <span className="text-green-500 font-medium text-sm sm:text-base"> (+60.45%)</span>
                                            </>
                                        ),
                                    },
                                    {
                                        title: 'Equity Expansion',
                                        content: (
                                            <>
                                                <div className="text-xs sm:text-sm mb-2">
                                                    Total Equity grew from ₹7,941.29L to ₹18,227.73L
                                                </div>
                                                <span className="text-green-500 font-medium text-sm sm:text-base"> (+129.5%)</span>
                                                <ul className="list-disc list-inside ml-2 sm:ml-4 mt-2 text-xs sm:text-sm space-y-1">
                                                    <li>Share Capital: ₹6,610.74L → ₹7,484.82L</li>
                                                    <li>Reserves & Surplus: ₹1,330.55L → ₹10,742.91L</li>
                                                </ul>
                                            </>
                                        ),
                                    },
                                    {
                                        title: 'Non-Current Assets',
                                        content: (
                                            <>
                                                <div className="text-xs sm:text-sm">
                                                    ₹12,113.82L → ₹17,526.59L
                                                </div>
                                                <span className="text-green-500 font-medium text-sm sm:text-base"> (+44.7%)</span>
                                                <ul className="list-disc list-inside ml-2 sm:ml-4 mt-2 text-xs sm:text-sm space-y-1">
                                                    <li>Right-of-use assets grew significantly (₹7,785.63L → ₹10,340.07L)</li>
                                                    <li>Deferred Tax Assets nearly doubled: ₹1,726.56L → ₹3,355.72L</li>
                                                </ul>
                                            </>
                                        ),
                                    },
                                    {
                                        title: 'Current Assets Surge',
                                        content: (
                                            <>
                                                <div className="text-xs sm:text-sm">
                                                    ₹22,198.22L → ₹37,528.80L
                                                </div>
                                                <span className="text-green-500 font-medium text-sm sm:text-base"> (+69%)</span>
                                                <ul className="list-disc list-inside ml-2 sm:ml-4 mt-2 text-xs sm:text-sm space-y-1">
                                                    <li>Investments: ₹6,955.02L → ₹10,139.44L</li>
                                                    <li>Receivables: ₹10,759.89L → ₹15,294.32L</li>
                                                    <li>Cash: ₹3,223.27L → ₹5,316.48L</li>
                                                </ul>
                                            </>
                                        ),
                                    },
                                    {
                                        title: 'Liabilities Breakdown',
                                        content: (
                                            <>
                                                <div className="text-xs sm:text-sm space-y-1">
                                                    <div>Non-Current: ₹9,542.54L → ₹12,137.42L (+27%)</div>
                                                    <div>Current: ₹16,828.21L → ₹24,690.24L (+46.7%)</div>
                                                </div>
                                                <ul className="list-disc list-inside ml-2 sm:ml-4 mt-2 text-xs sm:text-sm space-y-1">
                                                    <li>Trade Payables rose by ₹3,444.68L</li>
                                                    <li>Other Financial Liabilities jumped by ₹2,268.84L</li>
                                                </ul>
                                            </>
                                        ),
                                    },
                                ].map(({ title, content }, index) => (
                                    <div key={index} className="bg-[#0a0a0a] p-3 sm:p-4 rounded-lg border border-gray-800">
                                        <div className="unican text-white pb-2 text-lg sm:text-xl lg:text-2xl">{title}</div>
                                        <div className="leading-relaxed">{content}</div>
                                    </div>
                                ))}

                                <div className="bg-[#0a0a0a] p-3 sm:p-4 rounded-lg border border-gray-800">
                                    <div className="unican text-white pb-2 text-lg sm:text-xl lg:text-2xl">Summary Table</div>
                                    <div className="overflow-x-auto mt-2 rounded border border-gray-700 -mx-3 sm:mx-0">
                                        <table className="min-w-[320px] w-full border-collapse text-xs sm:text-sm">
                                            <thead className="bg-[#1a1a1a] text-white">
                                                <tr>
                                                    <th className="border border-gray-700 p-2 sm:p-3 text-left text-xs sm:text-sm">Indicator</th>
                                                    <th className="border border-gray-700 p-2 sm:p-3 text-xs sm:text-sm">FY 2021</th>
                                                    <th className="border border-gray-700 p-2 sm:p-3 text-xs sm:text-sm">FY 2022</th>
                                                    <th className="border border-gray-700 p-2 sm:p-3 text-xs sm:text-sm">Change</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {[
                                                    ['Total Assets', '₹34,312.04L', '₹55,055.39L', '+60.45%'],
                                                    ['Total Equity', '₹7,941.29L', '₹18,227.73L', '+129.5%'],
                                                    ['Reserves & Surplus', '₹1,330.55L', '₹10,742.91L', '+707.2%'],
                                                    ['Trade Receivables', '₹10,759.89L', '₹15,294.32L', '+42.1%'],
                                                    ['Cash & Equivalents', '₹3,223.27L', '₹5,316.48L', '+64.9%'],
                                                ].map(([metric, fy21, fy22, change], idx) => (
                                                    <tr key={idx} className="text-[#dddddd]">
                                                        <td className="border border-gray-700 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium">{metric}</td>
                                                        <td className="border border-gray-700 px-2 sm:px-3 py-2 text-xs sm:text-sm">{fy21}</td>
                                                        <td className="border border-gray-700 px-2 sm:px-3 py-2 text-xs sm:text-sm">{fy22}</td>
                                                        <td className="border border-gray-700 px-2 sm:px-3 py-2 text-xs sm:text-sm text-green-500 font-medium">{change}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="bg-[#0a0a0a] p-3 sm:p-4 rounded-lg border border-gray-800">
                                    <div className="unican text-white pb-2 text-lg sm:text-xl lg:text-2xl">Final Insight</div>
                                    <ul className="list-disc list-inside ml-2 sm:ml-4 text-xs sm:text-sm space-y-2 leading-relaxed">
                                        <li>Strong equity and reserves growth reflect healthy investor confidence.</li>
                                        <li>Asset growth outpaces liabilities, indicating sound financial management.</li>
                                        <li>Substantial liquidity and operational scale-up visible via receivables and cash jumps.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>


                        <ExpandImage className='w-full h-full object-cover pt-4'
                            src='/consult/policybazaar/10.avif'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />
                        <div className='py-4'>{`You'll be able to find the strategic entry of key investors like Info Edge, Tiger Global, Tencent, and others within the company's timeline section, each bringing not just capital, but market influence and domain expertise at critical phases of Policybazaar's growth. `}</div>
                        <ExpandImage className='w-full h-full object-cover pt-2'
                            src='/consult/policybazaar/11.avif'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />
                        <div
                            id='vision'
                            className='pt-12 flex flex-col'>
                            <div className='text-3xl company'>VISION & USP</div>
                        </div>
                        <ExpandImage className='w-full h-full object-cover pt-2'
                            src='/consult/policybazaar/12.avif'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />
                        <div id="vision-usp" className="pt-4 flex flex-col gap-4 sm:gap-6">
                            <div className="pt-2 text-sm sm:text-base">
                                Policybazaar's core vision is to democratize insurance by creating a transparent, digital-first platform that empowers consumers to make informed decisions without relying on agents. Their strategy revolves around leveraging technology to simplify and scale the insurance buying experience.
                            </div>

                            <div className="grid gap-4 sm:gap-6 text-sm text-[#BBBBBB]">
                                {[
                                    {
                                        title: 'Vision: Customer-first Transparency',
                                        content: (
                                            <p className="leading-relaxed">
                                                Policybazaar launched with the intent to eliminate the information asymmetry in India's insurance space. By offering side-by-side policy comparisons and transparent terms, it shifted power from agents to consumers.
                                            </p>
                                        ),
                                    },
                                    {
                                        title: 'USP: Aggregator + Assistant + Automation',
                                        content: (
                                            <ul className="list-disc list-inside ml-2 sm:ml-4 text-xs sm:text-sm space-y-1 leading-relaxed">
                                                <li>Licensed by IRDAI as a legitimate insurance aggregator.</li>
                                                <li>Zero service fee model builds trust and eliminates agent commissions.</li>
                                                <li>Supports complete lifecycle: comparison, purchase, renewals, and claims.</li>
                                                <li>Integrated call center and bot-assisted services for smoother user experience.</li>
                                            </ul>
                                        ),
                                    },
                                    {
                                        title: 'AI & Voice Analytics',
                                        content: (
                                            <p className="leading-relaxed">
                                                Leveraging NLP on 35M+ minutes of call recordings monthly to extract deep user insights (e.g., income, family size, preferences). This fuels personalization and product tailoring at scale.
                                            </p>
                                        ),
                                    },
                                    {
                                        title: 'PBee Connect Bot',
                                        content: (
                                            <ul className="list-disc list-inside ml-2 sm:ml-4 text-xs sm:text-sm space-y-1 leading-relaxed">
                                                <li>AI chatbot for car insurance sales and lead routing.</li>
                                                <li>Handles 80% of queries autonomously, boosting agent productivity from 1.5 to 7–8 policies/day.</li>
                                                <li>Enabled a 4x scale in motor insurance operations.</li>
                                            </ul>
                                        ),
                                    },
                                    {
                                        title: 'AWS + Polly + SageMaker Stack',
                                        content: (
                                            <ul className="list-disc list-inside ml-2 sm:ml-4 text-xs sm:text-sm space-y-1 leading-relaxed">
                                                <li>Amazon Polly enables multilingual TTS responses, enhancing user engagement in Tier 2/3 regions.</li>
                                                <li>SageMaker powers real-time ML for leads, preferences, and voice-to-text conversion.</li>
                                                <li>AWS cloud infra cut costs by 25%, while scaling up call center infra efficiently.</li>
                                            </ul>
                                        ),
                                    },
                                    {
                                        title: 'Business Model Shift',
                                        content: (
                                            <ul className="list-disc list-inside ml-2 sm:ml-4 text-xs sm:text-sm space-y-1 leading-relaxed">
                                                <li>Started with insurance comparison; moved to full-stack policy sales and claim support.</li>
                                                <li>Call center monetization by servicing insurers directly.</li>
                                                <li>Revenue streams: lead gen, ad placements, commissions, loans & credit card partnerships.</li>
                                            </ul>
                                        ),
                                    },
                                    {
                                        title: 'Impact Metrics',
                                        content: (
                                            <ul className="list-disc list-inside ml-2 sm:ml-4 text-xs sm:text-sm space-y-1 leading-relaxed">
                                                <li>10M+ policies sold by 2019, a year ahead of target.</li>
                                                <li>300K monthly voice interactions via Polly + PBee Connect.</li>
                                                <li>63% positive response rate and 41% policy closures via bot without human intervention.</li>
                                            </ul>
                                        ),
                                    },
                                ].map(({ title, content }, index) => (
                                    <div key={index} className="bg-[#0a0a0a] p-3 sm:p-4 rounded-lg border border-gray-800">
                                        <div className="unican text-white pb-2 text-lg sm:text-xl lg:text-2xl">{title}</div>
                                        <div className="leading-relaxed">{content}</div>
                                    </div>
                                ))}

                                <div className="bg-[#0a0a0a] p-3 sm:p-4 rounded-lg border border-gray-800">
                                    <div className="unican text-white pb-2 text-lg sm:text-xl lg:text-2xl">Strategic Summary</div>
                                    <ul className="list-disc list-inside ml-2 sm:ml-4 text-xs sm:text-sm space-y-2 leading-relaxed">
                                        <li>Technology-driven transformation from comparison platform to full-service insurance ecosystem.</li>
                                        <li>AI and automation enabled 4x operational scaling while maintaining service quality.</li>
                                        <li>Multi-revenue model diversification beyond traditional commission structures.</li>
                                        <li>Strong focus on regional expansion through multilingual capabilities and voice technology.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='pt-4'>{`Policybazaar's tech-led vision positioned it as India's most trusted InsurTech brand. Automation, AI, and voice tech removed dependency on agents and offline ops. Model replicable in other sectors like online food delivery, e-retail, and financial advisory.`}</div>

                        <div
                            id='competitor'
                            className='pt-12 flex flex-col'>
                            <div className='text-3xl company'>COMPETITOR ANALYSIS</div>
                        </div>
                        <ExpandImage className='w-full h-full object-cover pt-2'
                            src='/consult/policybazaar/13.avif'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />
                        <div className='pt-4'>{`Policybazaar here captures 65% digital sales share with 250K+ agents (25% life, 7% health; 1.2% total GWP share, ₹11,590 cr GWP; ₹400 cr revenue).`}</div>
                        <div
                            id='subsidaries'
                            className='pt-12 flex flex-col'>
                            <div className='text-3xl company'>SUBSIDARIES</div>
                        </div>
                        <ExpandImage className='w-full h-full object-cover pt-2'
                            src='/consult/policybazaar/14.avif'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />
                        <div className='py-4'>{`Paisabazaar is expanding from personal loans to home and property loans, now making up over 30% of its disbursals, supported by an offline agent network. It partners with banks to launch exclusive offerings like StepUP and Duet cards, generating long-term revenue through customer usage. Over 50 million users have accessed free credit scores via Paisabazaar, making it a leading platform for financial literacy and access.`}</div>
                        <ExpandImage className='w-full h-full object-cover pt-2'
                            src='/consult/policybazaar/15.avif'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />
                        <ExpandImage className='w-full h-full object-cover pt-2'
                            src='/consult/policybazaar/16.avif'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />
                        <ExpandImage className='w-full h-full object-cover pt-2'
                            src='/consult/policybazaar/17.avif'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />
                        <div
                            id='market'
                            className='pt-12 flex flex-col'>
                            <div className='text-3xl company'>MARKET</div>
                        </div>
                        <ExpandImage className='w-full h-full object-cover pt-2'
                            src='/consult/policybazaar/18.avif'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />
                        <ExpandImage className='w-full h-full object-cover pt-2'
                            src='/consult/policybazaar/19.avif'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />
                        <ExpandImage className='w-full h-full object-cover pt-2'
                            src='/consult/policybazaar/20.avif'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />
                        <div
                            id='product'
                            className='pt-12 flex flex-col'>
                            <div className='text-3xl company'>PRESENT PRODUCT</div>
                        </div>
                        <ExpandImage className='w-full h-full object-cover pt-2'
                            src='/consult/policybazaar/21.avif'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />
                        <ExpandImage className='w-full h-full object-cover pt-2'
                            src='/consult/policybazaar/22.avif'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />
                        <ExpandImage className='w-full h-full object-cover'
                            src='/consult/policybazaar/22a.png'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />
                        <div
                            id='affairs'
                            className='pt-12 flex flex-col'>
                            <div className='text-3xl company'>CURRENT AFFIARS</div>
                        </div>
                        <ExpandImage className='w-full h-full object-cover pt-2'
                            src='/consult/policybazaar/23.avif'
                            width={1660}
                            height={800}
                            alt='Small Banner'
                            priority
                        />
                        <div
                            id='drawbacks'
                            className='pt-12 flex flex-col'>
                            <div className='text-3xl company'>CURRENT DRAWBACKS</div>
                        </div>
                        <ExpandImage className='w-full h-full object-cover pt-2'
                            src='/consult/policybazaar/24.avif'
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