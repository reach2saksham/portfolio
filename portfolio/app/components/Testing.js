import React from 'react';
import Image from 'next/image';
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";

const Projects = () => {
    return (
        <div className='projects flex gap-2 items-center justify-between max-w-full container pt-4 mx-auto xl:px-36 lg:px-14 sm:px-4'>

                <div className='p-4'>
                    <div className='projecthead text-7xl text-center mb-4'>DESIGN</div>

                    <div className='bg-[#131313] w-1/3 rounded-3xl relative group'>
                {/* Image Section */}
                <div className='relative'>
                    <Image
                        className='w-full h-full object-cover rounded-3xl'
                        src='/bottles.png'
                        width={350}
                        height={380}
                        alt='Saksham Jain'
                        priority
                        unoptimized={true}
                    />
                    {/* Black Overlay on Hover */}
                    <div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition-opacity rounded-3xl'></div>

                    {/* Top Overlay - Flex with justify-between */}
                    <div className='absolute top-3 left-3 right-3 flex justify-between items-center p-2'>
                        <div className='flex gap-2'>
                            <span className='tags bg-[#E6E6E6] text-[#1A1A1A] px-2 py-[2px] text-[10px] rounded-2xl group-hover:bg-[#1A1A1A] group-hover:text-white group-hover:shadow-lg'>
                                Internship
                            </span>
                            <span className='tags bg-[#E6E6E6] text-[#1A1A1A] px-2 py-[2px] text-[10px] rounded-2xl group-hover:bg-[#1A1A1A] group-hover:text-white group-hover:shadow-lg'>
                                July 2024 - Sept 2024
                            </span>
                        </div>
                        <span className='tags bg-[#E6E6E6] text-[#1A1A1A] text-sm font-semibold rounded-full w-5 h-5 flex justify-center items-center'>
                            <ArrowUpRightIcon className="h-3 w-3" />
                        </span>
                    </div>

                    {/* Bottom Overlay - Flex column with gap-2 */}
                    <div className='hidden group-hover:flex absolute bottom-3 left-3 right-3 flex-col gap-2 p-2'>
                        <div className='flex gap-2'>
                            <span className='tags px-2 py-[2px] text-[10px] rounded-2xl bg-[#1A1A1A] text-white group-hover:shadow-lg'>
                                Role
                            </span>
                            <span className='tags bg-[#E6E6E6] text-[#1A1A1A] px-2 py-[2px] text-[10px] rounded-2xl group-hover:shadow-lg'>
                                UI/UX Designer
                            </span>
                            <span className='tags bg-[#E6E6E6] text-[#1A1A1A] px-2 py-[2px] text-[10px] rounded-2xl group-hover:shadow-lg'>
                                Product Manager
                            </span>
                        </div>
                        <div className='flex gap-2'>
                            <span className='tags px-2 py-[2px] text-[10px] rounded-2xl bg-[#1A1A1A] text-white group-hover:shadow-lg'>
                                Domain
                            </span>
                            <span className='tags bg-[#E6E6E6] text-[#1A1A1A] px-2 py-[2px] text-[10px] rounded-2xl group-hover:shadow-lg'>
                                UI/UX Designer
                            </span>
                            <span className='tags bg-[#E6E6E6] text-[#1A1A1A] px-2 py-[2px] text-[10px] rounded-2xl group-hover:shadow-lg'>
                                Product Manager
                            </span>
                        </div>
                        <div className='flex gap-2'>
                            <span className='tags px-2 py-[2px] text-[10px] rounded-2xl bg-[#1A1A1A] text-white group-hover:shadow-lg'>
                                Impact
                            </span>
                            <span className='tags bg-[#E6E6E6] text-[#1A1A1A] px-2 py-[2px] text-[10px] rounded-2xl group-hover:shadow-lg'>
                                Increased User Retention
                            </span>
                            <span className='tags bg-[#E6E6E6] text-[#1A1A1A] px-2 py-[2px] text-[10px] rounded-2xl group-hover:shadow-lg'>
                                Streamlined Workflows
                            </span>
                        </div>
                    </div>
                </div>

            </div>
                    
                    <div className='font-semibold text-lg'>CLIENT SIDE DASHBOARD</div>
                    <div className='text-xs'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est voluptatem similique dolore necessitatibus iste commodi corrupti magnam a tenetur, laboriosam inventore nam, ea cum molestiae eaque.
                    </div>
                </div>
            {/* Design Project */}
            
            <div className='bg-[#131313] w-1/3 text-center rounded-3xl'>
                <div className='projecthead text-7xl'>DEVELOPMENT</div>
                <div></div>
            </div>

            <div className='bg-[#131313] w-1/3 text-center rounded-3xl'>
                <div className='projecthead text-7xl'>PRODUCT</div>
                <div></div>
            </div>

        </div>
    );
};

export default Projects;
