"use client"
import React, { useState } from 'react';
import Card, { MouseTooltip } from './Card';
import { ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/solid";


let designitems = {
  card1: {
    title: `Making college prediction easier for JEE students`,
    image: '/design/rank-matrix/mockup.png',
    width: 350,
    height: 380,
    alt: 'Mockup',
    tags: ['College Project', 'April 2024'],
    role: ['UI Designer', 'Motion Designer'],
    domain: ['UI/UX', 'Anmation', 'Graphics'],
    impact: ['Counselling tool for 12M+ JEE Students every year'],
    description: `While countless web apps offer seat information for students, this platform goes a step further—intelligently sorting and presenting the best counseling options based on your details, with zero manual calibration. Just input your info, and let the system do the rest.`,
    docsLink: '/design/rank-matrix', // Add your documentation link here
    liveLink: 'https://rankmatrix.in/' // Add your live link here
  },
  card2: {
    title: `Elevating IMG's Brand Identity Game`,
    image: '/design/img-brand/mockup.png',
    width: 350,
    height: 380,
    alt: 'Mockup',
    tags: ['Student Society', 'April 2023 - Present'],
    role: ['Chief of Product Design'],
    domain: ['Graphic','Marketing'],
    impact: ['Brand Identity for 15K+ students'],
    description: `Exploring how strategic graphic design, marketing, and branding efforts were leveraged to uphold and amplify Information Management Group's legacy and influence.`,
    docsLink: '/design/img-brand', // Add your documentation link here
    // liveLink: 'https://your-live-site.com/dashboard' // Add your live link here
  },
};

let devitems = {
  card1: {
    title: 'CLIENT SIDE DASHBOARD',
    image: '/bottles.png',
    width: 350,
    height: 380,
    alt: 'Mockup',
    tags: ['Internship', 'July 2024 - Sept 2024'],
    role: ['UI/UX Designer', 'Product Manager'],
    domain: 'UI/UX Designer',
    impact: '100+ Users Daily',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est voluptatem similique dolore necessitatibus iste commodi corrupti magnam a tenetur, laboriosam inventore nam, ea cum molestiae eaque.',
    docsLink: '/dev/dashboard-docs', // Add your documentation link here
    liveLink: 'https://your-live-site.com/dashboard' // Add your live link here
  },
};

let productitems = {
  card1: {
    title: `VéVana: Vegan Leather from Stubble Waste`,
    image: '/product/vevana/thumbnail.png',
    width: 350,
    height: 380,
    alt: 'Mockup',
    tags: ['Hult Prize', 'March 2025'],
    role: ['Founder', 'Product & Business Developer'],
    domain: ['Sustainable', 'Apparel', 'Biotech'],
    impact: ['Cut stubble burning & saved 50K+ L water/ton leather'],
    description: `Designed and Developed waterless, animal-free leather product using mycelium. We were selected in top NC25 start-ups for B2B model across India & top 750 globally out of 10,000+ teams from 120+ countries`,
    docsLink: '/product/vevana', // Add your documentation link here
    // liveLink: 'https://rankmatrix.in/' // Add your live link here
  },
  card2: {
    title: `Production Optimization Strategy for B2B Company`,
    image: '/product/eat-sure/thumbnail.png',
    width: 350,
    height: 380,
    alt: 'Mockup',
    tags: ['Case Competition', 'February 2025'],
    role: [' Strategy Consultant', 'Operations Analyst'],
    domain: ['Supply Chain', 'Manufacturing', 'Operations'],
    impact: ['Reduced cost/piece by 34% keeping a 5-day workweek'],
    description: `Capacity and Labour Planning and Cost Optimization for a Fabrication company with strategic Order Fulfillment demand. Secured 2nd Runner-up position among 330+ teams in Operatopolis 3.0 at BIMTECH.`,
    docsLink: '/product/operatopolis', // Add your documentation link here
    // liveLink: 'https://rankmatrix.in/' // Add your live link here
  },
  card3: {
    title: `Driving EatSure’s Adoption and Affinity Among College Students and Youth`,
    image: '/product/eat-sure/thumbnail.png',
    width: 350,
    height: 380,
    alt: 'Mockup',
    tags: ['Case Competition', 'October 2024'],
    role: ['Product Designer', 'Marketing & Business Strategist'],
    domain: ['Food-Tech', 'E-Commerce'],
    impact: ['3X user penetration in 6 months & +54% in conversions'],
    description: `Developed 8+ student-focused, price-sensitive growth strategies in Rebel Foods EatSure Cloud 2024 through behavioral analysis, including tailored pricing models, platform-specific enhancements, localized packaging, etc.`,
    docsLink: '/product/eat-sure', // Add your documentation link here
    // liveLink: 'https://rankmatrix.in/' // Add your live link here
  }
};

const Projects = () => {
  const [currentColumn, setCurrentColumn] = useState(0); // 0 = Design, 1 = Development, 2 = Product

  const columns = [
    { title: 'DESIGN', content: Object.entries(designitems) },
    { title: 'DEVELOPMENT', content: Object.entries(devitems) },
    { title: 'PRODUCT', content: Object.entries(productitems) },
  ];

  const handlePrev = () => {
    setCurrentColumn((prev) => (prev === 0 ? columns.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentColumn((prev) => (prev === columns.length - 1 ? 0 : prev + 1));
  };

  return (
    <div id='projects' className="projects container max-w-full px-4 pt-4 mx-auto xl:px-36 lg:px-14 sm:px-4 z-50">
      {/* Global tooltip that follows the mouse */}
      <MouseTooltip />
      
      {/* Navigation for small screens */}
      <div className="md:hidden flex items-center justify-around mb-4 z-30">
        {/* <div className="text-center text-2xl font-semibold">{columns[currentColumn].title}</div> */}
      </div>

      {/* Responsive columns */}
      <div className="flex  gap-2 justify-between max-w-full z-30">
        {columns.map((col, index) => (
          <div
            key={index}
            className={`w-full md:w-1/3 z-30 ${
              index === currentColumn ? 'block' : 'hidden'
            } md:block`}
          >
            <div className="bg-[#131313] relative rounded-[20px] px-2 md:px-0 z-30">
              <div className='flex justify-between md:justify-center px-4 items-center z-30'>
                <ChevronLeftIcon
                  className="md:hidden h-8 w-8 text-gray-300 hover:text-white cursor-pointer"
                  onClick={handlePrev}
                />
                <div className="projecthead text-center pt-6 text-7xl mb-4 ">{col.title}</div>
                <ChevronRightIcon
                  className="md:hidden h-8 w-8 text-gray-300 hover:text-white cursor-pointer"
                  onClick={handleNext}
                />
              </div>
              {col.content.map(([key, card]) => (
                <div data-card-tooltip="true"  key={key}>
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