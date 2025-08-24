"use client"
import React, { useState } from 'react';
import Card, { MouseTooltip } from './Card';
import { ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/solid";

// Your data objects remain the same
let designitems = {
  card1: {
    title: `A project and employee tracking dashboard for High-profile companies `,
    image: '/design/uix-labs/thumbnail.avif',
    width: 350,
    height: 380,
    alt: 'Mockup',
    tags: ['Internship', 'July 2024 - September 2024'],
    role: ['UI/UX Designer', 'Product Manager'],
    domain: ['Tech-Consulting', 'Web-app'],
    impact: ['Used monthly by 80+ top companies to boost projects.'],
    description: `When a client company gives project to a tech-consulting firm, they need a way to track the project and the employees working on it. This web app provides a comprehensive solution for tracking projects and employees, ensuring that everything is organized and efficient.`,
    docsLink: '/design/uix-labs',
    // liveLink: 'https://rankmatrix.in/'
  },
  card2: {
    title: `How to manage 13K+ IIT Roorkee webapges with a consistent design`,
    image: '/design/chakra/thumbnail.avif',
    width: 350,
    height: 380,
    alt: 'Mockup',
    tags: ['College Project', 'January 2024 - Present'],
    role: ['Project Leader',],
    domain: ['Design System', 'CMS'],
    impact: ['A landing page with 1M+ MAU'],
    description: `With the responsibility of IIT Roorkee's Landing Page while also adhering to the self-made CMS is the task executed. Chakra is a component-based content management system, creating pages by using components is modular, sustainable interface for faculties to manage & publish their pages`,
    docsLink: '/design/chakra',
    // liveLink: 'https://rankmatrix.in/'
  },
  card3: {
    title: `Making college prediction easier for JEE students`,
    image: '/design/rank-matrix/mockup.avif',
    width: 350,
    height: 380,
    alt: 'Mockup',
    tags: ['Internship', 'April 2025'],
    role: ['UI Designer', 'Motion Designer'],
    domain: ['UI/UX', 'Anmation', 'Graphics'],
    impact: ['Counselling tool for 12M+ JEE Students every year'],
    description: `While countless web apps offer seat information for students, this platform goes a step further, intelligently sorting and presenting the best counseling options based on your details, with zero manual calibration. Just input your info, and let the system do the rest.`,
    docsLink: '/design/rank-matrix',
    liveLink: 'https://rankmatrix.in/'
  },
  card4: {
    title: `Elevating IMG's Brand Identity Game`,
    image: '/design/img-brand/mockup.avif',
    width: 350,
    height: 380,
    alt: 'Mockup',
    tags: ['Student Society', 'April 2023 - Present'],
    role: ['Chief of Product Design'],
    domain: ['Graphic','Marketing'],
    impact: ['Brand Identity for 15K+ students'],
    description: `Exploring how strategic graphic design, marketing, and branding efforts were leveraged to uphold and amplify Information Management Group's legacy and influence.`,
    docsLink: '/design/img-brand',
  },
};

let businessitems = {
  card1: {
    title: `Deriving a New Production Optimization Strategy for a B2B Company`,
    image: '/business/operatopolis/thumbnail.avif',
    width: 350,
    height: 380,
    alt: 'Mockup',
    tags: ['Case Competition', 'February 2025'],
    role: [' Strategy Consultant', 'Operations Analyst'],
    domain: ['Supply Chain', 'Manufacturing', 'Operations'],
    impact: ['Cost/piece↓ by 34% keeping a 5-day workweek'],
    description: `Capacity and Labour Planning and Cost Optimization for a Fabrication company with strategic Order Fulfillment demand. Secured 2nd Runner-up position among 330+ teams in Operatopolis 3.0 at BIMTECH.`,
    docsLink: '/business/operatopolis',
  },
  card2: {
    title: `Making BoldCare the next D2C Indian Leader in Wellness : Strategy & Growth Plan`,
    image: '/business/bold-care/thumbnail.avif',
    width: 350,
    height: 380,
    alt: 'Mockup',
    tags: ['Case Competition', `Jan 2025 - Feb 2025`],
    role: ['Marketing Executive', 'Business Strategist'],
    domain: ['Wellness', 'E-Commerce'],
    impact: ['Projected 3x revenue in 12 months'],
    description: `Covered GTM, branding & investor strategy for BoldCares next phase. Conducted profit/loss, market, user analysis to craft 20+ strategies. National Finalist in top 20 of 1600+ teams.`,
    docsLink: '/business/bold-care',
  },

  card3: {
    title: `Rebranding & Crisis Recovery Post Emission Scandal of Gryphon Motors`,
    image: '/business/c-suite/thumbnail.avif',
    width: 350,
    height: 380,
    alt: 'Mockup',
    tags: ['Case Competition', `November 2024`],
    role: ['Cheif Executive Officer',],
    domain: ['Corporate Ethics', 'Sustainibility'],
    impact: ['Investor confidence ↑, -ve customer sentiment ↓'],
    description: `Led a 5-phase recovery in rebranding, employees, sustainibility, PR Pan, etc. Secured 1st position among 200+ teams in C-Suite 8.0 at IBS Hyderabad.`,
    docsLink: '/business/c-suite',
  },

  card4: {
    title: `Policybazaar: Extensive Analysis and deciphering Business Model`,
    image: '/business/policybazaar/thumbnail.avif',
    width: 350,
    height: 380,
    alt: 'Mockup',
    tags: ['Startup Analysis', `August 2024`],
    role: ['Venture Analyst',],
    domain: ['Fintech', 'InsureTech'],
    impact: ['Thorougly understood their Business Model'],
    description: `Breakdown of an early stage startup's vision, market, risks, and growth path by combining founder analysis, UI/UX audits, TAM/SAM/SOM sizing, and investor trends.`,
    docsLink: '/business/policybazaar',
    liveLink: 'https://prezi.com/p/r8_qiiuwhtrt/?present=1'
  }
};

let productitems = {
  card1: {
    title: `VéVana: Vegan Leather from Stubble Waste`,
    image: '/product/vevana/thumbnail.avif',
    width: 350,
    height: 380,
    alt: 'Mockup',
    tags: ['Hult Prize', 'March 2025'],
    role: ['Founder', 'Product & Business Developer'],
    domain: ['Sustainable', 'Apparel', 'Biotech'],
    impact: ['Reduced stubble burning & 50K+ L water/ton leather'],
    description: `Designed and Developed waterless, animal-free leather product using mycelium. We were selected in top NC25 start-ups for B2B model across India & top 750 globally out of 10,000+ teams from 120+ countries`,
    docsLink: '/product/vevana',
  },  
  card2: {
    title: `Amenities: Redefining infra-operations in institutions`,
    image: '/product/amenities/thumbnail.avif',
    width: 350,
    height: 380,
    alt: 'Mockup',
    tags: ['Hyundai Grant', 'December 2025 - Present'],
    role: ['Product Lead'],
    domain: ['Facility Management', 'SaaS'],
    impact: ['Estimated $18M SOM; building IITR pilot'],
    description: `Amenities app for real-time bookings, QR check-ins, role-based access, and live facility status; streamlined amenity management for campuses, societies, public sports sites, institutions, etc. Selected as Hyundai Hope Scholar being in top 25 students across 23 IITs for B2B SaaS innovation.`,
    docsLink: '/product/amenities',
  },  
  card3: {
    title: `Zero to One: AI based apps 1Health & 1Intel for Healthcare`,
    image: '/product/1health-1intel/thumbnail.avif',
    width: 350,
    height: 380,
    alt: 'Mockup',
    tags: ['White Paper', 'December 2024 - February 2025'],
    role: ['Product Researcher'],
    domain: ['Healthcare', 'AI'],
    impact: ['1Intel Boosted Trial Readiness by 20%'],
    description: `1Health app with smart consultations, reminders & device sync; improved access for rural users & reduced missed care. 1Intel web app using AI/NER for de-ID, error correction & harmonization and cutting EHR noise. National Finalist across 500+ individuals in TASIC'25, SPJIMR Mumbai`,
    docsLink: '/product/1health-1intel',
  },  
  card4: {
    title: `Driving EatSure's Adoption and Affinity Among College Students and Youth`,
    image: '/product/eat-sure/thumbnail.avif',
    width: 350,
    height: 380,
    alt: 'Mockup',
    tags: ['Product Deck', 'October 2024'],
    role: ['Product Designer', 'Marketing & Business Strategist'],
    domain: ['Food-Tech', 'E-Commerce'],
    impact: ['+54% user capture & conversions in 6 months'],
    description: `Developed 8+ student-focused, price-sensitive growth strategies in Rebel Foods EatSure Cloud 2024 through behavioral analysis, including tailored pricing models, platform-specific enhancements, localized packaging, etc.`,
    docsLink: '/product/eat-sure',
  },
  
};

const Projects = () => {
  const [currentColumn, setCurrentColumn] = useState(0);

  const columns = [
    { title: 'DESIGN', content: Object.entries(designitems) },
    { title: 'BUSINESS', content: Object.entries(businessitems) },
    { title: 'PRODUCT', content: Object.entries(productitems) },
  ];

  // Dynamic width calculation based on number of columns
  const getColumnWidth = () => {
    const totalColumns = columns.length;
    if (totalColumns === 1) return 'md:w-full';
    if (totalColumns === 2) return 'md:w-1/2';
    if (totalColumns === 3) return 'md:w-1/3';
    if (totalColumns === 4) return 'md:w-1/4';
    // For more than 4, you might want to use grid or different approach
    return `md:w-1/${totalColumns}`;
  };

  const handlePrev = () => {
    setCurrentColumn((prev) => (prev === 0 ? columns.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentColumn((prev) => (prev === columns.length - 1 ? 0 : prev + 1));
  };

  return (
    <div id='projects' className="projects container max-w-full px-4 pt-4 mx-auto xl:px-28 lg:px-14 sm:px-4 z-50">
      <MouseTooltip />
      
      <div className="md:hidden flex items-center justify-around mb-4 z-30">
        {/* Mobile navigation header if needed */}
      </div>

      {/* Flexbox approach with dynamic width calculation */}
      <div className="flex gap-2 justify-between max-w-full z-30">
        {columns.map((col, index) => (
          <div
            key={index}
            className={`w-full ${getColumnWidth()} z-30 ${
              index === currentColumn ? 'block' : 'hidden'
            } md:block`}
          >
            <div className="bg-[#131313] relative rounded-[20px] px-2 md:px-0 z-30">
              <div className='flex justify-between md:justify-center px-4 items-center z-30'>
                <ChevronLeftIcon
                  className="md:hidden h-8 w-8 text-gray-300 hover:text-white cursor-pointer"
                  onClick={handlePrev}
                />
                <div className="projecthead text-center pt-6 text-7xl mb-4 select-none">{col.title}</div>
                <ChevronRightIcon
                  className="md:hidden h-8 w-8 text-gray-300 hover:text-white cursor-pointer"
                  onClick={handleNext}
                />
              </div>
              {col.content.map(([key, card]) => (
                <div data-card-tooltip="true" key={key}>
                  <Card
                    title={card.title}
                    image={card.image}
                    width={card.width}
                    height={card.height}
                    alt={card.alt}
                    tags={card.tags}
                    role={card.role}
                    domain={card.domain}
                    impact={card.impact}
                    description={card.description}
                    docsLink={card.docsLink}
                    liveLink={card.liveLink}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;