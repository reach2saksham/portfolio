"use client";
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Image from 'next/image';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import BlurImage from '@/app/components/BlurImage';

const caseStudy = {
  industry: 'Marketing and Advertising',
  techStack: {
    'Suite of Design Tools': ['figma', 'ai', 'photoshop'],
    'Mockup Tools': ['clipchamp', 'kling'],
  },
  // Tech stack names for tooltips
  techStackNames: {
    'figma': 'Figma',
    'ai': 'Adobe Illustrator',
    'photoshop': 'Adobe Photoshop',
    'clipchamp': 'Clipchamp',
    'kling': 'Kling',
    'framer': 'Framer',
  },
  companyName: 'IMG BRAND',
  period: 'April 2023 - Present',
  domain: 'GRAPHIC DESIGNING',
  description: `IMG, a tech-driven club at IIT Roorkee, builds impactful digital solutions for the campus. For 2 years, I've led its visual storytelling—designing bold, tech-inspired graphics and brand assets filled with easter eggs. From workshop promos to web app launches and merch, every design was crafted to make IMG stand out with pride and purpose.`,
  sections: ['Overview', 'Highlights', 'Logo Design', 'T-Shirt 2024', 'T-Shirt 2025', 'Posters'],
  role: ['Cheif of Product Design', 'Project Leader', 'Webmaster'],
  collaborators: ['-'],
  deliverables: ['Posters', 'Logo Designs', 'T-Shirt Designs'],
  timelineStatus: ['Ongoing'],
  // links: {
  //   liveProduct: 'https://google.com',
  //   figmaFile: 'https://figma.com',
  // },
  // thewhat: ``,
  // thewhy: ``,
  // thehow: ``,
};

const Page = () => {
  const [selectedSection, setSelectedSection] = React.useState(0);

  // Helper function to check if links exist
  const hasLinks = caseStudy.links && (caseStudy.links.liveProduct || caseStudy.links.figmaFile);

  return (
    <main className="flex min-h-screen flex-col mx-auto max-w-screen-2xl]">
      <Navbar />
      <div className="projects container max-w-full pt-4 mt-12 sm:mt-0 mx-auto px-4 xl:px-36 lg:px-14 sm:px-4">
        {/* Header Section */}
        <div className="flex flex-wrap lg:flex-nowrap flex-col lg:flex-row-reverse">
          <div className="w-full lg:w-3/4 pb-4 lg:pb-0">
            <Image
              src="/design/img-brand/cover.png"
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
                <div className="sfpro text-sm text-[#646464] tracking-wider">INDUSTRY</div>
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
                  {caseStudy.sections.map((section, index) => (
                    <button
                      key={index}
                      className={`py-1 flex flex-col rounded transition-colors ${selectedSection === index ? 'text-white' : 'text-[#646464]'
                        }`}
                      onClick={() => setSelectedSection(index)}
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
            {/* <div className="mt-16 flex flex-col gap-12 mb-12">
              {caseStudy.thewhat && (
                <div className="lg:flex-row flex flex-col">
                  <div className="w-full">THE WHAT</div>
                  <div className="pt-4 lg:pt-0">{caseStudy.thewhat}</div>
                </div>
              )}
              {caseStudy.thewhy && (
                <div className="lg:flex-row flex flex-col">
                  <div className="w-full">THE WHY</div>
                  <div className="pt-4 lg:pt-0">{caseStudy.thewhy}</div>
                </div>
              )}
              {caseStudy.thehow && (
                <div className="lg:flex-row flex flex-col">
                  <div className="w-full">THE HOW</div>
                  <div className="pt-4 lg:pt-0">{caseStudy.thehow}</div>
                </div>
              )}
            </div> */}

            <div className='company text-3xl mt-12 mb-2'>
              THE HIGHLIGHTS
            </div>

            <div className='justify-center items-center'>
              <div className="flex gap-1 sm:gap-4 justify-center items-center flex-col sm:flex-row">
                <BlurImage src="/design/img-brand/ig1.png" width={460} height={460} title="Open Source Workshop" subtitle="A poster for inviting students" alt="Small Banner" />
                <BlurImage src="/design/img-brand/tshirt.png" width={460} height={460} title="T-Shirt 2024" subtitle="I have screenshots of members wearing it to Singapore" alt="Another Banner" />
              </div>
              <div className="flex gap-1 sm:gap-4 justify-center items-center flex-col sm:flex-row">
                <BlurImage src="/design/img-brand/tshirt2.png" width={460} height={460} title="T-Shirt 2024 Interation" subtitle="This was supposed to be printed 🥺" alt="Small Banner" />
                <BlurImage src="/design/img-brand/ig2.png" width={460} height={460} title="Blog 2024" subtitle={<>It is actually a nice read, <a href="https://medium.com/img-iit-roorkee/127-0-0-1-img-53cf90e3acab" className="text-blue-500 hover:underline">Check it out!</a></>}  alt="Another Banner" />
              </div>
            </div>

            <div className='mt-12 flex flex-col gap-4'>
              <p className='text-3xl company'>THE LOGOS</p>
              <video
                src="/design/img-brand/imgOGlogo.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              />
              <p className='casetags' >{`Like every great brand, IMG needed versatile, stylized logo variations—usable only if they served real purpose. So I went on a rampage, designing a range of tech-inspired logos that stayed true to IMG’s identity while enabling flexible, custom use across platforms and contexts. `}  </p>

              <Image className='w-full h-full object-cover'
                src='/design/img-brand/1.png'
                width={1660}
                height={800}
                alt='Small Banner'
                priority
              />
              <p className='casetags' >{`Let's pour some portrait graphics as well.`}  </p>
              <Image className='w-full h-full object-cover'
                src='/design/img-brand/3.png'
                width={1660}
                height={800}
                alt='Small Banner'
                priority
              />
              <p>{`Pre-planning my game, I knew a standout T-shirt design was on the horizon.You say: The arc reactor? C'mon man that's too 2012. A Maze? Too chaotic.  A QR code? Cool, but something's still missing. So I dove deeper—piecing together a coherent, tech-forward logo from scattered elements to craft a design that will truly fit the bigger picture.`}</p>
              <Image className='w-full h-full object-cover'
                src='/design/img-brand/2.png'
                width={1660}
                height={800}
                alt='Small Banner'
                priority
              />
              <p>{`Wait, no logo design is complete without making it look like that it has been made out mathematical magic.`}</p>
              <Image className='w-full h-full object-cover'
                src='/design/img-brand/logonew.png'
                width={1660}
                height={800}
                alt='Small Banner'
                priority
              />
              <p>{`Everything will make sense soon enough, just wait till you see how I bring the second one to life.`}</p>

              <p className='text-3xl company pt-12'>THE T-SHIRT 2024</p>
              <p>{`Tasked with designing a T-shirt, I had plenty of ideas—but I knew the real magic would come from combining different elements and hiding easter eggs for the keen-eyed. Early on, I explored two design directions. This was one of them—the one that didn’t made the cut :`}</p>
              <Image className='w-full h-full object-cover'
                src='/design/img-brand/shirtidea.png'
                width={1660}
                height={800}
                alt='Small Banner'
                priority
              />
              <p>{`Now, coming to the direction I finally chose—it was a quirky idea that brought together all my nerdy instincts. So I started wireframing, sort of. And honestly, this was my very first iteration. This also answers your question about where that 5×5 new logo came in—it really shines in the isometric view.`}</p>
              <Image className='w-full h-full object-cover'
                src='/design/img-brand/4.png'
                width={1660}
                height={800}
                alt='Small Banner'
                priority
              />
              <p>{`Later, I learned that for custom prints to be cost-effective, the design needed to stick to black and white and stay within a limited rectangular print area at the center. So in my high-fidelity iteration, I removed the QR code layers forming the circular base in the original pencil-paper version to make the T-shirt budget-friendly. The following illustration deciphers the design for you in detail.`}</p>
              <Image className='w-full h-full object-cover'
                src='/design/img-brand/5.png'
                width={1660}
                height={800}
                alt='Small Banner'
                priority
              />
              <p>{`Solid design, right? Surprisingly, even though it was well received by almost everyone, this one was also rejected 🥹 turns out a senior preferred a more minimal look. But stick around till the end of the case study—there’s a twist waiting for you. `}</p>
              <p>Oh also, here are some techish stickers I created in between.</p>
              <Image className='w-full h-full object-cover'
                src='/design/img-brand/6.png'
                width={1660}
                height={800}
                alt='Small Banner'
                priority
              />
              <p>{`But after seeing the previous design, the team was confident in my ability to deliver something great again—if that was just the first iteration, what could come next? So, poor me was back to the figma canvas again. But this time, I came back with a blast.`}</p>
              <video
                src="/design/img-brand/cube.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              />
              <p>{`Now, I know you might argue—how is this even minimalistic? But come on, it’s a huge leap from where we started (in terms of minimalism). Just look at the designs below. And yet, the same senior had an issue with having a cube on the T-shirt. So, even this minimal design was rejected—despite the entire club loving it and rooting for it to be printed after being awestruck by the concept.`}</p>
              <div className='flex flex-col gap-1 md:flex-row'>
                <Image
                  className='object-cover'
                  src='/design/img-brand/tcb.png'
                  width={464}
                  height={240}
                  alt='TCB Brand Image'
                  priority
                />
                <Image
                  className='object-cover'
                  src='/design/img-brand/tcw.png'
                  width={464}
                  height={240}
                  alt='TCW Brand Image'
                  priority
                />
              </div>
              <p>{`At this point, it felt like the classic design iteration loop trap. Honestly, I was feeling a bit low—so I started throwing random elements together, just hoping something might click by chance. But hey, that’s not how it works in real life... right? Right?`}</p>
              <div className='flex flex-col lg:flex-row gap-1 justify-center items-center'>
                <div>
                  <Image className='object-cover'
                    src='/design/img-brand/a.png'
                    width={306}
                    height={800}
                    alt='Small Banner'
                    priority
                  />
                </div>
                <div>
                  <Image className='object-cover'
                    src='/design/img-brand/b.png'
                    width={306}
                    height={800}
                    alt='Small Banner'
                    priority
                  />
                </div>
                <div>
                  <Image className='object-cover'
                    src='/design/img-brand/c.png'
                    width={306}
                    height={800}
                    alt='Small Banner'
                    priority
                  />
                </div>
              </div>
            <p>{`Behold! my random lab experiment that somehow worked and got instantly approved. (Though many of us, including me, were still rooting for the earlier designs.) This one symbolizes connecting dots/people to form IMG, reflecting collaboration and problem-solving at its core.`}</p>
              <video
                src="/design/img-brand/tshirtanime.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              />
              <Image className='w-full h-full object-cover'
                src='/design/img-brand/8.png'
                width={1660}
                height={800}
                alt='Small Banner'
                priority
              />
              <p>{`Never mind—had to strip it down even more. Here it is: Wohoo! Officially printed T-Shirts, 2024.`}</p>
              <div className='flex flex-col md:flex-row gap-1'>
              <Image className='object-cover'
                src='/design/img-brand/twf.png'
                width={464}
                height={240}
                alt='Small Banner'
                priority
              />
              <Image className='object-cover'
                src='/design/img-brand/tbf.png'
                width={464}
                height={240}
                alt='Small Banner'
                priority
              />
              </div>
              <p className='text-3xl company mt-12'>THE T-SHIRTS 2025</p>
              <p>{`This is the twist I was talking about—these designs really stuck with the members. The hype to wear them was so strong that, instead of going with a new design this year, my previous ones were brought back for print. But then came a strange dilemma: the club was completely split, half the members wanted the all black-and-white version, while the other half rooted for the colored cube.`}</p>
              <div className='flex flex-col md:flex-row gap-1'>
              <Image className='object-cover'
                src='/design/img-brand/1NA.png'
                width={464}
                height={240}
                alt='Small Banner'
                priority
              />
              <Image className='object-cover'
                src='/design/img-brand/1NB.png'
                width={464}
                height={240}
                alt='Small Banner'
                priority
              />
              </div>
              <p>{`In the end, we landed on a pretty unexpected solution—two T-shirts for 2025, and each member got to choose their favorite. With custom quotes (yes, I got two!), everyone had the freedom to personalize their design and bring in their own creative twist. Yayy! And that’s the story of T-Shirt(s) 2025.`}</p>
              <div className='mt-12 flex flex-col'>
                <p className='text-3xl company mb-4'>POSTERS</p>
                <div className=''>
                  <div className="flex gap-4 flex-col lg:flex-row">
                    <BlurImage src="/design/img-brand/rankmatrix.png" width={460} height={460} title="Rank Matrix 2024" subtitle="Advertising post to redirect JEE students to the portal." alt="Small Banner" />
                    <BlurImage src="/design/img-brand/webautomation.png" width={460} height={460} title="Web Automation Workshop 2024" subtitle="Minimalstic poster required by the team." alt="Another Banner" />
                    
                  </div>
                </div>
                <div className="flex gap-4 flex-col lg:flex-row">
                  <BlurImage src="/design/img-brand/ig2.png" width={460} height={460} title="Blog 2024" subtitle={<>It is actually a nice read, <a href="https://medium.com/img-iit-roorkee/127-0-0-1-img-53cf90e3acab" className="text-blue-500 hover:underline">Check it out!</a></>} alt="Small Banner" />
                  <BlurImage src="/design/img-brand/gympravesh.png" width={460} height={460} title="Gym Pravesh 2024" subtitle="Launch of Gym Pravesh app in the campus." alt="Another Banner" />
                </div>
                <div className="flex gap-4 flex-col lg:flex-row">
                  <BlurImage src="/design/img-brand/ig1.png" width={460} height={460} title="Open Source Workshop 2024" subtitle="A poster for inviting students" alt="Small Banner" />
                  <BlurImage src="/design/img-brand/rankmatrix2.png" width={460} height={460} title="Rank Matrix Launch 2024" subtitle={<>Read Rank Matrix, <a href="" className="text-blue-500 hover:underline">Case Study Here!</a></>}  alt="Another Banner" />
                </div>
                
                  <p className='text-3xl justify-center items-center flex company mt-10'>THANK YOU!</p>
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