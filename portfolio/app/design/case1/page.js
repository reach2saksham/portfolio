"use client";
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Image from 'next/image';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import BlurImage from '@/app/components/BlurImage';

const caseStudy = {
  industry: 'Transport Tech',
  techStack: {
    'Suite of SAAS, Web': ['framer', 'figma', 'framer'],
    'Mobile Applications': ['framer', 'framer', 'framer'],
    'Interaction & Designing': ['framer', 'framer', 'framer'],
  },
  companyName: 'IMG BRAND',
  period: 'April 2023 - Present',
  domain: 'WEB-RESPONSIVE UI INTERFACE',
  description: `For 2 years, I prototyped new ways to engage with computer interfaces, mostly working with voice and AI. Brain was one of the first companies to explore the idea of multimodal, generative interfaces. My time working with the team has shaped many of the principles I design with now. Most of my work stayed in R&D but pieces of it have shipped and are now in the app store.`,
  sections: ['Overview', 'Highlights', 'Context', 'Empathize', 'Ideate', 'Update Flow', 'Prototype', 'Reflection'],
  role: ['Cheif of Product Design', 'Project Leader', 'Webmaster'],
  collaborators: ['Product Manager', 'Engineers', 'Researchers'],
  deliverables: ['Prototypes', 'User Research Reports', 'Final UI Design'],
  timelineStatus: ['Ongoing', 'Phase 1 Complete'],
  links: {
    liveProduct: 'https://google.com',
    figmaFile: 'https://figma.com',
  },
  thewhat: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam facilis doloribus cumque, quae aut consequuntur sit fugit dolor quaerat odit. Soluta hic, debitis a laboriosam iusto, sunt nisi ipsam aspernatur facilis, illum nobis eligendi magnam!`,
  thewhy: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam facilis doloribus cumque, quae aut consequuntur sit fugit dolor quaerat odit. Soluta hic, debitis a laboriosam iusto, sunt nisi ipsam aspernatur facilis, illum nobis eligendi magnam!`,
  thehow: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam facilis doloribus cumque, quae aut consequuntur sit fugit dolor quaerat odit. Soluta hic, debitis a laboriosam iusto, sunt nisi ipsam aspernatur facilis, illum nobis eligendi magnam!`,
};

const Page = () => {
  const [selectedSection, setSelectedSection] = React.useState(0);

  return (
    <main className="flex min-h-screen flex-col mx-auto max-w-screen-2xl">
      <Navbar />
      <div className="projects container max-w-full pt-4 mt-12 sm:mt-0 mx-auto px-4 xl:px-36 lg:px-14 sm:px-4">
        {/* Header Section */}
        <div className="flex flex-wrap lg:flex-nowrap flex-col lg:flex-row-reverse">
          <div className="w-full lg:w-3/4 pb-4 lg:pb-0">
            <Image
              src="/cover.png"
              width={1080}
              height={400}
              alt="Cover"
              priority
              unoptimized={true}
              className="w-full h-auto lg:object-cover lg:h-full 2xl:object-contain"
            />
          </div>
          <div className="flex flex-col w-full lg:w-1/4 border-b border-[#808080] border-opacity-40">
            <div className="sfpro text-sm text-[#646464] tracking-wider">INDUSTRY</div>
            <div className="tags text-sm pt-2 pb-2 text-white tracking-wider border-b border-gray-500 border-opacity-40">
              {caseStudy.industry}
            </div>
            <div className="sfpro text-sm text-[#646464] pt-4 pb-2 tracking-wider">TECH STACK</div>
            {Object.entries(caseStudy.techStack).map(([category, icons], index) => (
              <div key={index} className="tags text-sm">
                <div className="pt-2">{category}</div>
                <div className="flex gap-4 flex-wrap justify-start py-2 border-gray-500">
                  {icons.map((icon, idx) => (
                    <div key={idx} className="relative flex items-center justify-center w-12 h-12 group">
                      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#565656]"></div>
                      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#565656]"></div>
                      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#565656]"></div>
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#565656]"></div>
                      <Image
                        className="transition duration-300 group-hover:scale-110"
                        src={`/STACK2/${icon}.svg`}
                        width={icon === 'framer' ? 25 : 50}
                        height={icon === 'framer' ? 25 : 50}
                        alt={icon}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content with Sticky Sidebar */}
        <div className="flex flex-col lg:flex-row pt-6 min-h-screen">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 lg:sticky lg:top-[70px] lg:self-start lg:max-h-[calc(100vh-70px)] lg:overflow-y-auto">
            <div className="flex flex-col w-full hidden lg:block">
              <div className="company text-5xl">{caseStudy.companyName}</div>
              <div className="tags text-sm">{caseStudy.period}</div>
              <div className="sfpro text-sm pt-7 text-[#646464] tracking-wider">{caseStudy.domain}</div>
              <div className="tags text-base py-4">
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
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex flex-col w-full lg:w-3/4 pt-2 lg:pt-0">
            <div className="pt-2 lg:pt-0">{caseStudy.description}</div>
            <div className="flex flex-wrap pt-6 gap-4 justify-between">
              {[
                ['ROLE', caseStudy.role],
                ['COLLABORATORS', caseStudy.collaborators],
                ['DELIVERABLES', caseStudy.deliverables],
                ['TIMELINE & STATUS', caseStudy.timelineStatus],
              ].map(([title, items], idx) => (
                <div key={idx} className="flex flex-col gap-1 pt-6 lg:pt-0 flex-grow basis-1/4 min-w-[150px]">
                  <div className="sfpro text-sm text-[#646464] tracking-wider">{title}</div>
                  <div className="pt-1">
                    {items.map((item, i) => (
                      <div key={i} className="tags text-sm">{item}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-6 flex gap-4">
              <a
                href={caseStudy.links.liveProduct}
                target="_blank"
                rel="noopener noreferrer"
                className="w-1/2 bg-[#131313] flex items-start justify-between p-4 rounded-md border-[#363636] border-opacity-20 text-[#BBBBBB] text-xs"
              >
                <p>LIVE PRODUCT</p>
                <ChevronRightIcon className="h-4 w-4 text-[#BBBBBB]" />
              </a>
              <a
                href={caseStudy.links.figmaFile}
                target="_blank"
                rel="noopener noreferrer"
                className="w-1/2 bg-[#131313] flex items-start justify-between p-4 rounded-md border-[#363636] border-opacity-20 text-[#BBBBBB] text-xs"
              >
                <p>CHECK IT IN FIGMA</p>
                <ChevronRightIcon className="h-4 w-4 text-[#BBBBBB]" />
              </a>
            </div>
            <div className="mt-16 flex flex-col gap-12">
              <div className="lg:flex-row flex flex-col">
                <div className="w-full">THE WHAT</div>
                <div className="pt-4 lg:pt-0">{caseStudy.thewhat}</div>
              </div>
              <div className="lg:flex-row flex flex-col">
                <div className="w-full">THE WHY</div>
                <div className="pt-4 lg:pt-0">{caseStudy.thewhy}</div>
              </div>
              <div className="lg:flex-row flex flex-col">
                <div className="w-full">THE HOW</div>
                <div className="pt-4 lg:pt-0">{caseStudy.thehow}</div>
              </div>
            </div>
            <div className=''>
              <div className="flex gap-4 mt-16 flex-col lg:flex-row">
                <BlurImage src="/ig1.png" width={460} height={460} title="Sex" subtitle="sexy" alt="Small Banner" />
                <BlurImage src="/tshirt.png" width={460} height={460} title="Sex" subtitle="sexy" alt="Another Banner" />
              </div>
              <div className="flex gap-4 flex-col lg:flex-row">
                <BlurImage src="/tshirt2.png" width={460} height={460} title="Sex" subtitle="sexy" alt="Small Banner" />
                <BlurImage src="/ig2.png" width={460} height={460} title="Sex" subtitle="sexy" alt="Another Banner" />
              </div>
            </div>

            <div className='mt-12 flex flex-col gap-4'>
              <p className='text-3xl'>LOGOS</p>
              <video
                src="/imgOGlogo.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              />
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste blanditiis labore iure ut animi quis molestias repellendus quibusdam, voluptatem error voluptates culpa commodi enim quam id consectetur quisquam debitis dignissimos tempore non ullam. Molestiae, repellat rem. Illum pariatur quia itaque, facere quaerat architecto aliquid quis ut vero nostrum accusamus nesciunt.</p>

              <Image className='w-full h-full object-cover'
                src='/1.png'
                width={1660}
                height={800}
                alt='Small Banner'
                priority
              />
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste blanditiis labore iure ut animi quis molestias repellendus quibusdam, voluptatem error voluptates culpa commodi enim quam id consectetur quisquam debitis dignissimos tempore non ullam. Molestiae, repellat rem. Illum pariatur quia itaque, facere quaerat architecto aliquid quis ut vero nostrum accusamus nesciunt.</p>
              <Image className='w-full h-full object-cover'
                src='/2.png'
                width={1660}
                height={800}
                alt='Small Banner'
                priority
              />
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste blanditiis labore iure ut animi quis molestias repellendus quibusdam, voluptatem error voluptates culpa commodi enim quam id consectetur quisquam debitis dignissimos tempore non ullam. Molestiae, repellat rem. Illum pariatur quia itaque, facere quaerat architecto aliquid quis ut vero nostrum accusamus nesciunt.</p>
              <Image className='w-full h-full object-cover'
                src='/3.png'
                width={1660}
                height={800}
                alt='Small Banner'
                priority
              />
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste blanditiis labore iure ut animi quis molestias repellendus quibusdam, voluptatem error voluptates culpa commodi enim quam id consectetur quisquam debitis dignissimos tempore non ullam. Molestiae, repellat rem. Illum pariatur quia itaque, facere quaerat architecto aliquid quis ut vero nostrum accusamus nesciunt.</p>
              <Image className='w-full h-full object-cover'
                src='/4.png'
                width={1660}
                height={800}
                alt='Small Banner'
                priority
              />
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste blanditiis labore iure ut animi quis molestias repellendus quibusdam, voluptatem error voluptates culpa commodi enim quam id consectetur quisquam debitis dignissimos tempore non ullam. Molestiae, repellat rem. Illum pariatur quia itaque, facere quaerat architecto aliquid quis ut vero nostrum accusamus nesciunt.</p>
              <Image className='w-full h-full object-cover'
                src='/5.png'
                width={1660}
                height={800}
                alt='Small Banner'
                priority
              />
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste blanditiis labore iure ut animi quis molestias repellendus quibusdam, voluptatem error voluptates culpa commodi enim quam id consectetur quisquam debitis dignissimos tempore non ullam. Molestiae, repellat rem. Illum pariatur quia itaque, facere quaerat architecto aliquid quis ut vero nostrum accusamus nesciunt.</p>
              <Image className='w-full h-full object-cover'
                src='/6.png'
                width={1660}
                height={800}
                alt='Small Banner'
                priority
              />
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate quae sunt veritatis ex saepe alias ad vitae. Eaque natus consequuntur eveniet eos autem neque asperiores nisi accusantium! Et asperiores exercitationem commodi aspernatur molestiae unde aliquam aperiam magnam ad in? Nam hic eaque quo eveniet facere libero non illum similique vero.</p>
              <video
                src="/cube.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              />
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate quae sunt veritatis ex saepe alias ad vitae. Eaque natus consequuntur eveniet eos autem neque asperiores nisi accusantium! Et asperiores exercitationem commodi aspernatur molestiae unde aliquam aperiam magnam ad in? Nam hic eaque quo eveniet facere libero non illum similique vero.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate quae sunt veritatis ex saepe alias ad vitae. Eaque natus consequuntur eveniet eos autem neque asperiores nisi accusantium! Et asperiores exercitationem commodi aspernatur molestiae unde aliquam aperiam magnam ad in? Nam hic eaque quo eveniet facere libero non illum similique vero.</p>
              <Image className='w-full h-full object-cover'
                src='/tcb.png'
                width={1660}
                height={800}
                alt='Small Banner'
                priority
              />
              <Image className='w-full h-full object-cover'
                src='/tcw.png'
                width={1660}
                height={800}
                alt='Small Banner'
                priority
              />
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate quae sunt veritatis ex saepe alias ad vitae. Eaque natus consequuntur eveniet eos autem neque asperiores nisi accusantium! Et asperiores exercitationem commodi aspernatur molestiae unde aliquam aperiam magnam ad in? Nam hic eaque quo eveniet facere libero non illum similique vero.</p>
              <div className='flex flex-col lg:flex-row gap-1 justify-center items-center'>
                <div>
                  <Image className='object-cover'
                    src='/a.png'
                    width={306}
                    height={800}
                    alt='Small Banner'
                    priority
                  />
                </div>
                <div>
                  <Image className='object-cover'
                    src='/b.png'
                    width={306}
                    height={800}
                    alt='Small Banner'
                    priority
                  />
                </div>
                <div>
                  <Image className='object-cover'
                    src='/c.png'
                    width={306}
                    height={800}
                    alt='Small Banner'
                    priority
                  />
                </div>
              </div>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae, recusandae omnis pariatur nobis obcaecati, error fuga voluptate exercitationem inventore fugit, sequi aliquid quisquam delectus dignissimos a dolorem? Sequi, ullam porro voluptate ducimus mollitia fugit maiores velit qui officiis sunt voluptatem, nesciunt perferendis ut quas quia neque distinctio, impedit provident error.</p>
              <video
                src="/tshirtanime.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              />
              <Image className='w-full h-full object-cover'
                src='/8.png'
                width={1660}
                height={800}
                alt='Small Banner'
                priority
              />
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae, recusandae omnis pariatur nobis obcaecati, error fuga voluptate exercitationem inventore fugit, sequi aliquid quisquam delectus dignissimos a dolorem? Sequi, ullam porro voluptate ducimus mollitia fugit maiores velit qui officiis sunt voluptatem, nesciunt perferendis ut quas quia neque distinctio, impedit provident error.</p>
              <Image className='w-full h-full object-cover'
                src='/twf.png'
                width={1660}
                height={800}
                alt='Small Banner'
                priority
              />
              <Image className='w-full h-full object-cover'
                src='/tbf.png'
                width={1660}
                height={800}
                alt='Small Banner'
                priority
              />

              <div className='mt-6 flex flex-col gap-4'>
                <p className='text-3xl'>POSTERS</p>
                <div className=''>
              <div className="flex gap-4 mt-16 flex-col lg:flex-row">
                <BlurImage src="/ig1.png" width={460} height={460} title="Sex" subtitle="sexy" alt="Small Banner" />
                <BlurImage src="/tshirt.png" width={460} height={460} title="Sex" subtitle="sexy" alt="Another Banner" />
              </div>
              </div>
              <div className="flex gap-4 flex-col lg:flex-row">
                <BlurImage src="/tshirt2.png" width={460} height={460} title="Sex" subtitle="sexy" alt="Small Banner" />
                <BlurImage src="/ig2.png" width={460} height={460} title="Sex" subtitle="sexy" alt="Another Banner" />
              </div>
              <div className="flex gap-4 flex-col lg:flex-row">
                <BlurImage src="/tshirt2.png" width={460} height={460} title="Sex" subtitle="sexy" alt="Small Banner" />
                <BlurImage src="/ig2.png" width={460} height={460} title="Sex" subtitle="sexy" alt="Another Banner" />
              </div>
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