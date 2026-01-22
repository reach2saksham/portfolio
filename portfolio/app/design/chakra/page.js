"use client";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import BlurImage from "@/app/components/BlurImage";
import ExpandImage from "@/app/components/ExpandImage";

// Centralized section configuration - no more duplication!
const SECTIONS_CONFIG = {
  Overview: "overview",
  Highlights: "highlights",
  "Design System": "design",
  "Loading Animations": "loading",
  "Landing Page": "landing",
  "Search Page": "search",
  "Faculty Page": "faculty",
  "Chakra: CMS": "chakra",
};

const caseStudy = {
  industry: "Education",
  techStack: {
    "Design and Animation Tools for UI": ["figma"],
    "Development Stack": ["html", "css3", "js", "django", "scala"],
  },
  // Tech stack names for tooltips
  techStackNames: {
    figma: "Figma",
    html: "HTML5",
    css3: "CSS3",
    js: "JavaScript",
    django: "Django",
    scala: "Scala",
  },
  companyName: "IITR WEBSITE",
  period: "January 2024 - Present",
  domain: "CONTENT MANAGEMENT SYSTEM",
  description: `In this case study we would discuss that how standardization of design system was implemented in a scalable manner through a component-based content management system. The goal was to create a consistent and reusable tool that could be easily managed and updated by staff and  faculty members, while also ensuring that the website remained accessible and user-friendly.`,
  sections: Object.keys(SECTIONS_CONFIG),
  role: ["Project Leader", "UI/UX Designer", "Frontend Developer"],
  collaborators: ["Abishek Arun", "Dhruv Goel"],
  deliverables: [
    "Landing, Search & Faculty Pages Revamp",
    "Design System",
    "Content Management System",
  ],
  timelineStatus: ["Ongoing"],
  // links: {
  //     liveProduct: 'https://rankmatrix.in/',
  //     // figmaFile: 'https://figma.com',
  // },
  thewhat: `A Home-grown Content Management System | A Design System / UI Kit for College's Websites | Revamped Loading Screens, Animations, Landing Page with added features`,
  thewhy: `More accessbility and ease of use for the college's website, which is the gateway to represent our college to the world. The task of managing 13,000+ webpages with a consistent design was daunting. `,
  thehow: `The conceptulization and architecture design was done in Figma, where the design system was created. With the advise and feedback from administration and faculty members, the design system was finalized. The design system was then implemented in a component-based content management system, which allows for easy management and updates of the website. The CMS was then built on NextJs, Django, DjangoREST, It has an inbuilt transpiler based on Scala, File Manager to access XML & HTML files. Finally polishing is being done on the landing page with loaders, animations and intuative components that adhere to CMS.`,

  // NEW: Cover video configuration

  coverVideo: {
    src: "/design/chakra/cover.mp4",
    posterFrame: "/design/chakra/coverimage.avif", // Add a poster frame image
  },
};

const Page = () => {
  const [selectedSection, setSelectedSection] = useState(0);
  const [activeMode, setActiveMode] = useState("purple");
  const [isManualClick, setIsManualClick] = useState(false);

  // NEW: Video loading state

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const [isVideoLoading, setIsVideoLoading] = useState(true);

  const videoRef = useRef(null);

  // Check if video is already loaded (cached)

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      // If video is already loaded from cache, show it immediately

      if (video.readyState >= 3) {
        // HAVE_FUTURE_DATA or HAVE_ENOUGH_DATA

        setIsVideoLoaded(true);

        setIsVideoLoading(false);
      }
    }
  }, []);

  // Scroll-based section highlighting
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -60% 0px", // More lenient trigger zones
      threshold: [0, 0.1, 0.25], // Multiple thresholds for better detection
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
        console.log(
          "Section in view:",
          sectionId,
          "Ratio:",
          bestEntry.intersectionRatio,
        ); // Debug log

        // Find the section index based on the ID
        const sectionName = Object.keys(SECTIONS_CONFIG).find(
          (key) => SECTIONS_CONFIG[key] === sectionId,
        );
        if (sectionName && caseStudy.sections) {
          const sectionIndex = caseStudy.sections.indexOf(sectionName);
          if (sectionIndex !== -1) {
            setSelectedSection(sectionIndex);
          }
        }
      }
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    // Observe all sections and log which ones are found
    caseStudy.sections.forEach((section) => {
      const element = document.getElementById(SECTIONS_CONFIG[section]);
      if (element) {
        console.log(
          "Observing section:",
          section,
          "with ID:",
          SECTIONS_CONFIG[section],
        ); // Debug log
        observer.observe(element);
      } else {
        console.warn(
          "Section not found:",
          section,
          "with ID:",
          SECTIONS_CONFIG[section],
        ); // Debug log
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
        behavior: "smooth",
        block: "start",
      });
    }

    // Re-enable observer after scroll animation completes
    setTimeout(() => {
      setIsManualClick(false);
    }, 1000); // Adjust timing as needed
  };

  // NEW: Handle video load

  const handleVideoCanPlay = () => {
    setIsVideoLoaded(true);

    setIsVideoLoading(false);
  };

  // Helper function to check if links exist
  const hasLinks =
    caseStudy.links &&
    (caseStudy.links.liveProduct || caseStudy.links.figmaFile);

  return (
    <main className="flex min-h-screen flex-col mx-auto max-w-screen-2xl">
      <div id="overview"></div>
      <Navbar />
      <div className="projects container max-w-full pt-4 sm:mt-0 mx-auto px-4 xl:px-20 lg:px-14 sm:px-4">
        {/* Header Section with Video Loader*/}
        <div className="flex flex-wrap lg:flex-nowrap flex-col lg:flex-row-reverse">
          <div className="w-full lg:w-3/4 pb-4 lg:pb-0 mt-14 sm:mt-0 relative">
            {/* Poster Frame with Loader - only show until video is ready */}

            {!isVideoLoaded && (
              <div className="absolute inset-0 z-10">
                {/* Poster Frame Image */}

                <Image
                  src={caseStudy.coverVideo.posterFrame}
                  alt="Video thumbnail"
                  fill
                  className="object-cover sm:object-contain"
                  priority
                />

                {/* Loading Spinner Overlay */}

                {isVideoLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="flex flex-col items-center gap-3">
                      {/* Spinner */}

                      <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>

                      {/* Loading Text */}

                      <span className="text-white text-sm font-medium">
                        Loading video...
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Actual Video */}
            <video
              ref={videoRef}
              src={caseStudy.coverVideo.src}
              autoPlay
              loop
              muted
              playsInline
              onCanPlay={handleVideoCanPlay}
              onError={() => {
                setIsVideoLoaded(true);

                setIsVideoLoading(false);
              }}
              className={`transition-opacity duration-300 ${
                isVideoLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
          <div className="flex flex-col w-full lg:w-1/4 border-b border-[#808080] border-opacity-40">
            {caseStudy.industry && (
              <>
                <div className="sfpro text-sm text-[#646464] tracking-wider">
                  INDUSTRY
                </div>
                <div className="casetags text-sm pt-2 pb-2 text-white tracking-wider border-b border-gray-500 border-opacity-40">
                  {caseStudy.industry}
                </div>
              </>
            )}
            {caseStudy.techStack &&
              Object.keys(caseStudy.techStack).length > 0 && (
                <>
                  <div className="sfpro text-sm text-[#646464] pt-4 pb-2 tracking-wider">
                    TECH STACK
                  </div>
                  {Object.entries(caseStudy.techStack).map(
                    ([category, icons], index) => (
                      <div key={index} className="casetags text-sm">
                        <div className="pt-2">{category}</div>
                        <div className="flex gap-4 flex-wrap justify-start py-3 pr-8 border-gray-500">
                          {icons.map((icon, idx) => (
                            <div
                              key={idx}
                              className="relative flex items-center justify-center w-12 h-12 group"
                            >
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
                                width={icon === "framer" ? 25 : 40}
                                height={icon === "framer" ? 25 : 40}
                                alt={icon}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ),
                  )}
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
                <div className="company text-[40px]">
                  {caseStudy.companyName}
                </div>
              )}
              {caseStudy.period && (
                <div className="casetags text-sm">{caseStudy.period}</div>
              )}
              {caseStudy.domain && (
                <div className="sfpro text-sm pt-2 text-[#646464] tracking-wider">
                  {caseStudy.domain}
                </div>
              )}
              {caseStudy.sections && caseStudy.sections.length > 0 && (
                <div className="casetags text-base py-4">
                  {caseStudy.sections.map((section, index) => (
                    <button
                      key={index}
                      className={`py-1 flex flex-col rounded transition-colors duration-300 text-left ${
                        selectedSection === index
                          ? "text-white"
                          : "text-[#646464]"
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
                ["ROLES", caseStudy.role],
                ["COLLABORATORS", caseStudy.collaborators],
                ["DELIVERABLES", caseStudy.deliverables],
                ["TIMELINE & STATUS", caseStudy.timelineStatus],
              ]
                .filter(([_, items]) => items && items.length > 0)
                .map(([title, items], idx) => (
                  <div key={idx} className="flex flex-col gap-1 w-fit">
                    <div className="sfpro text-sm text-[#646464] tracking-wider">
                      {title}
                    </div>
                    <div className="pt-1">
                      {items.map((item, i) => (
                        <div key={i} className="casetags w-fit text-sm">
                          {item}
                        </div>
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
                    className={`${caseStudy.links.liveProduct ? "w-1/2" : "w-full"} bg-[#131313] flex items-start justify-between p-4 rounded-md border-[#363636] border-opacity-20 text-[#BBBBBB] text-xs`}
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
                  <div className="lg:w-32 lg:flex-shrink-0 font-semibold tags">
                    THE WHAT
                  </div>
                  <div className="pt-4 lg:pt-0">{caseStudy.thewhat}</div>
                </div>
              )}
              {caseStudy.thewhy && (
                <div className="lg:flex-row lg:gap-36 flex flex-col">
                  <div className="lg:w-32 lg:flex-shrink-0 font-semibold tags">
                    THE WHY
                  </div>
                  <div className="pt-4 lg:pt-0">{caseStudy.thewhy}</div>
                </div>
              )}
              {caseStudy.thehow && (
                <div className="lg:flex-row lg:gap-36 flex flex-col">
                  <div className="lg:w-32 lg:flex-shrink-0 font-semibold tags">
                    THE HOW
                  </div>
                  <div className="pt-4 lg:pt-0">{caseStudy.thehow}</div>
                </div>
              )}
            </div>

            <div id="highlights" className="company text-3xl pt-12 mb-2">
              THE HIGHLIGHTS
            </div>

            <ExpandImage
              className="w-full h-full object-cover pt-4"
              src="/design/chakra/highlight.avif"
              width={1660}
              height={800}
              alt="Small Banner"
              priority
            />

            <div id="design" className="pt-12 flex flex-col gap-4">
              <div className="text-3xl company">THE DESIGN SYSTEM</div>
            </div>

            <ExpandImage
              className="w-full h-full object-cover pt-4"
              src="/design/chakra/intro.avif"
              width={1660}
              height={800}
              alt="Small Banner"
              priority
            />
            <ExpandImage
              className="w-full h-full object-cover pt-4"
              src="/design/chakra/layout.avif"
              width={1660}
              height={800}
              alt="Small Banner"
              priority
            />
            <ExpandImage
              className="w-full h-full object-cover pt-4"
              src="/design/chakra/icon.avif"
              width={1660}
              height={800}
              alt="Small Banner"
              priority
            />
            <ExpandImage
              className="w-full h-full object-cover pt-4"
              src="/design/chakra/colour.avif"
              width={1660}
              height={800}
              alt="Small Banner"
              priority
            />
            <ExpandImage
              className="w-full h-full object-cover pt-4"
              src="/design/chakra/typography.avif"
              width={1660}
              height={800}
              alt="Small Banner"
              priority
            />
            <ExpandImage
              className="w-full h-full object-cover pt-4"
              src="/design/chakra/ui1.avif"
              width={1660}
              height={800}
              alt="Small Banner"
              priority
            />
            <ExpandImage
              className="w-full h-full object-cover"
              src="/design/chakra/ui2.avif"
              width={1660}
              height={800}
              alt="Small Banner"
              priority
            />
            <ExpandImage
              className="w-full h-full object-cover"
              src="/design/chakra/ui3.avif"
              width={1660}
              height={800}
              alt="Small Banner"
              priority
            />
            <ExpandImage
              className="w-full h-full object-cover"
              src="/design/chakra/ui4.avif"
              width={1660}
              height={800}
              alt="Small Banner"
              priority
            />
            <ExpandImage
              className="w-full h-full object-cover"
              src="/design/chakra/ui5.avif"
              width={1660}
              height={800}
              alt="Small Banner"
              priority
            />
            <ExpandImage
              className="w-full h-full object-cover"
              src="/design/chakra/ui6.avif"
              width={1660}
              height={800}
              alt="Small Banner"
              priority
            />
            <ExpandImage
              className="w-full h-full object-cover pt-4"
              src="/design/chakra/header.avif"
              width={1660}
              height={800}
              alt="Small Banner"
              priority
            />
            <ExpandImage
              className="w-full h-full object-cover pt-4"
              src="/design/chakra/footer.avif"
              width={1660}
              height={800}
              alt="Small Banner"
              priority
            />
            <ExpandImage
              className="w-full h-full object-cover pt-4"
              src="/design/chakra/error404.avif"
              width={1660}
              height={800}
              alt="Small Banner"
              priority
            />

            <div id="loading" className="pt-12 text-3xl company">
              LOADING ANIMATIONS
            </div>
            <video
              src="/design/chakra/loader1.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto pt-4"
            />
            <div className="py-4">{`Designing the loading screen for the IIT Roorkee landing page was a high-stakes, ambitious task, as it served as the first impression of the institute to the world. My initial iteration featured a dynamic logo build-up animation, intelligently synced with the user's device load time. However, feedback pointed out that the use of the IITR logo alone felt too simplistic and lacked the immersive appeal expected from such a prestigious institution. This led to a reimagining of the concept, aiming for a more elaborate yet intuitive user experience.`}</div>
            <video
              src="/design/chakra/loader2.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto"
            />

            <div className="py-4">{`The final animation was instantly approved by the admin and team for its playful nature and visually intuitive flow, captivating users right from the website's first frame, making the experience truly monumental.`}</div>

            <div id="landing" className="pt-12 text-3xl company">
              LANDING PAGE
            </div>

            <div className="py-4">{`The admin's vision for the landing page was to introduce an intuitive and distinct color palette that could later be overlaid onto the existing design system without disrupting its structure. Additionally, they requested components that would maintain visual consistency with the current default design system, while still offering a fresh, polished, and unique experience that reflects the evolving identity of IIT Roorkee. That is why several colour schemes were prepared for the page some of them are shown below:`}</div>

            <div className="pt-4 flex flex-col gap-8">
              <div className="flex flex-wrap gap-6">
                <button
                  className={`tags ${activeMode === "purple" ? "bg-[#606060]" : ""} p-2 rounded-lg`}
                  onClick={() => setActiveMode("purple")}
                >
                  Golden-Purple
                </button>
                <button
                  className={`tags ${activeMode === "yellow" ? "bg-[#606060]" : ""} p-2 rounded-lg`}
                  onClick={() => setActiveMode("yellow")}
                >
                  Yellow
                </button>

                <button
                  className={`tags ${activeMode === "blue" ? "bg-[#606060]" : ""} p-2 rounded-lg`}
                  onClick={() => setActiveMode("blue")}
                >
                  Light Blue
                </button>
                <button
                  className={`tags ${activeMode === "red" ? "bg-[#606060]" : ""} p-2 rounded-lg`}
                  onClick={() => setActiveMode("red")}
                >
                  Red
                </button>
                <button
                  className={`tags ${activeMode === "green" ? "bg-[#606060]" : ""} p-2 rounded-lg`}
                  onClick={() => setActiveMode("green")}
                >
                  Green
                </button>
                <button
                  className={`tags ${activeMode === "dark" ? "bg-[#606060]" : ""} p-2 rounded-lg`}
                  onClick={() => setActiveMode("dark")}
                >
                  Dark Mode
                </button>
                <button
                  className={`tags ${activeMode === "mobile" ? "bg-[#606060]" : ""} p-2 rounded-lg`}
                  onClick={() => setActiveMode("mobile")}
                >
                  Mobile View
                </button>
              </div>
              <div>
                {activeMode === "mobile" && (
                  <div>
                    <ExpandImage
                      className="w-full h-full object-cover sm:px-56 md:px-64 lg:px-72 xl:px-80"
                      src="/design/chakra/mobile.avif"
                      width={1660}
                      height={800}
                      alt="Small Banner"
                      priority
                    />
                  </div>
                )}
                {activeMode === "dark" && (
                  <div>
                    <ExpandImage
                      className="w-full h-full object-cover"
                      src="/design/chakra/dark.avif"
                      width={1660}
                      height={800}
                      alt="Small Banner"
                      priority
                    />
                  </div>
                )}
                {activeMode === "green" && (
                  <div>
                    <ExpandImage
                      className="w-full h-full object-cover"
                      src="/design/chakra/green.avif"
                      width={1660}
                      height={800}
                      alt="Small Banner"
                      priority
                    />
                  </div>
                )}
                {activeMode === "yellow" && (
                  <div>
                    <ExpandImage
                      className="w-full h-full object-cover"
                      src="/design/chakra/yellow.avif"
                      width={1660}
                      height={800}
                      alt="Small Banner"
                      priority
                    />
                  </div>
                )}
                {activeMode === "purple" && (
                  <div>
                    <ExpandImage
                      className="w-full h-full object-cover px-[0.6px]"
                      src="/design/chakra/purple.avif"
                      width={1660}
                      height={800}
                      alt="Small Banner"
                      priority
                    />
                    <video
                      src="/design/chakra/research.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-auto -mt-1"
                    />
                    <ExpandImage
                      className="w-full h-full object-cover px-[0.6px] -mt-1"
                      src="/design/chakra/purple1.avif"
                      width={1660}
                      height={800}
                      alt="Small Banner"
                      priority
                    />
                    <video
                      src="/design/chakra/ranking.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-auto -mt-1"
                    />
                    <ExpandImage
                      className="w-full h-full object-cover px-[0.6px] -mt-1"
                      src="/design/chakra/purple2.avif"
                      width={1660}
                      height={800}
                      alt="Small Banner"
                      priority
                    />
                  </div>
                )}
                {activeMode === "blue" && (
                  <div>
                    <ExpandImage
                      className="w-full h-full object-cover"
                      src="/design/chakra/blue.avif"
                      width={1660}
                      height={800}
                      alt="Small Banner"
                      priority
                    />
                  </div>
                )}
                {activeMode === "red" && (
                  <div>
                    <ExpandImage
                      className="w-full h-full object-cover"
                      src="/design/chakra/red.avif"
                      width={1660}
                      height={800}
                      alt="Small Banner"
                      priority
                    />
                  </div>
                )}
              </div>
              <div className="">{`The design incorporated multiple color schemes, accessibility features such as dark mode, and a fully responsive mobile view. Most design decisions were made in close collaboration with IITR's admins and faculty. Any additional components proposed for the landing page were crafted to be unique yet consistent with the existing design system, with the intention of contributing them to the Chakra UI library while maintaining stylistic harmony. `}</div>
            </div>

            <div id="search" className="pt-8 text-3xl company">
              SEARCH PAGE
            </div>

            <div className="pt-4">{`The previous search engine lacked purpose and user-friendliness; hence, it has been revamped with a simplified user flow, as illustrated below: `}</div>

            <video
              src="/design/chakra/search.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto pt-4"
            />
            <ExpandImage
              className="w-full h-full object-cover pt-4"
              src="/design/chakra/searchui.avif"
              width={1660}
              height={800}
              alt="Small Banner"
              priority
            />
            <div id="faculty" className="pt-12 text-3xl company">
              FACULTY PAGE
            </div>

            <div className="pt-4">{`The faculty page is among the most visited sections on iitr.ac.in, making a polished revamp essential to enhance its usability/appeal.`}</div>
            <ExpandImage
              className="w-full h-full object-cover pt-4"
              src="/design/chakra/faculty.avif"
              width={1660}
              height={800}
              alt="Small Banner"
              priority
            />

            <div id="chakra" className="pt-12 text-3xl company">
              CHAKRA
            </div>
            <div className="pt-4">{`Now imagine this: you're tasked with creating just one page of our website. Let's say it takes around 4 days. For the entire site, that translates to nearly 100 years of work. And if you want to make a minor change to a component later, it could take 5+ years across the site.`}</div>
            <div className="pt-2">{`Clearly, this is not scalable.`}</div>
            <div className="pt-4 font-bold text-xl">{`Key Issues with the Traditional Approach:`}</div>
            <div className="flex flex-col gap-2 pt-2">
              <li>
                Only individuals with development knowledge can create or edit
                webpages.
              </li>
              <li>Every minor change requires re-deployment.</li>
              <li>
                Design consistency is hard to maintain across different pages.
              </li>
              <li>
                It creates a dependency bottleneck between non-technical users
                and developers.
              </li>
            </div>
            <div className="pt-4">{`The solution is Chakra, our in-house Content Management System (CMS) built to solve this very problem. It empowers anyone, even with no development background, to create, manage, and publish webpages using pre-built, consistent design components.`}</div>
            <div className="pt-4 font-bold text-xl">{`How Chakra Works:`}</div>
            <ol type="1" className="flex flex-col gap-2 pt-2">
              <li>
                1. Component Selection: Users choose from a library of
                ready-to-use components.
              </li>
              <li>2. Content Input: They fill in the data.</li>
              <li>
                3. Transpilation Process: Chakra generates an XML, which is then
                transpiled into HTML using our custom-built transpiler in Scala.
              </li>
              <li>
                4. Automatic Deployment: The system manages file storage and
                deploys pages automatically.
              </li>
            </ol>
            <div className="pt-4 font-bold text-xl">{`Post-Chakra Impact:`}</div>
            <div className="pt-2">{`With the introduction of Chakra, faculty, staff, and students managing departmental or project websites can now effortlessly update and deploy pages within just a few clicks. This significantly reduces reliance on technical expertise and eliminates previous development bottlenecks. The use of pre-built components ensures design consistency across the entire website, promoting a unified visual identity.`}</div>
            <div className="pt-4 font-bold text-xl">{`Key Features:`}</div>
            <div className="pt-2">{`Chakra comes equipped with several advanced features such as Elastic Search for quick navigation, Hindi text conversion for regional accessibility, rich text editors for flexible content creation, and tools like short URL and subdomain managers for better organization. Additionally, it supports custom component deployment, allowing power users to integrate personalized elements when needed.`}</div>
            <div className="pt-4 font-bold text-xl">{`Chakra's Five Pillars:`}</div>
            <div className="pt-2">{`The platform is built on five main pillars. Chakra Frontend offers a user-friendly interface for intuitive webpage creation. Chakra Backend acts as the system's core, integrating all functionalities with the database. Chakra UI Library maintains a curated collection of reusable, pre-designed components that uphold consistency and quality. Chakra core is where the conversion of XML to HTML takes place. Finally, Chakra Canvas serves as a staging environment where all changes can be tested and fine-tuned before being made live to the public.`}</div>
            <ExpandImage
              className="w-full h-full object-cover pt-4"
              src="/design/chakra/chakra1.avif"
              width={1660}
              height={800}
              alt="Small Banner"
              priority
            />
            <ExpandImage
              className="w-full h-full object-cover"
              src="/design/chakra/chakra2.avif"
              width={1660}
              height={800}
              alt="Small Banner"
              priority
            />
            <ExpandImage
              className="w-full h-full object-cover"
              src="/design/chakra/chakra3.avif"
              width={1660}
              height={800}
              alt="Small Banner"
              priority
            />
            <ExpandImage
              className="w-full h-full object-cover"
              src="/design/chakra/chakra4.avif"
              width={1660}
              height={800}
              alt="Small Banner"
              priority
            />
            <ExpandImage
              className="w-full h-full object-cover"
              src="/design/chakra/chakra5.avif"
              width={1660}
              height={800}
              alt="Small Banner"
              priority
            />
            <ExpandImage
              className="w-full h-full object-cover"
              src="/design/chakra/chakra6.avif"
              width={1660}
              height={800}
              alt="Small Banner"
              priority
            />
            <ExpandImage
              className="w-full h-full object-cover"
              src="/design/chakra/chakra7.avif"
              width={1660}
              height={800}
              alt="Small Banner"
              priority
            />
            <ExpandImage
              className="w-full h-full object-cover"
              src="/design/chakra/chakra8.avif"
              width={1660}
              height={800}
              alt="Small Banner"
              priority
            />
            <ExpandImage
              className="w-full h-full object-cover"
              src="/design/chakra/chakra9.avif"
              width={1660}
              height={800}
              alt="Small Banner"
              priority
            />
            <ExpandImage
              className="w-full h-full object-cover"
              src="/design/chakra/chakra10.avif"
              width={1660}
              height={800}
              alt="Small Banner"
              priority
            />
            <ExpandImage
              className="w-full h-full object-cover"
              src="/design/chakra/chakra11.avif"
              width={1660}
              height={800}
              alt="Small Banner"
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
