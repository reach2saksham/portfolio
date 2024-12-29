import React from 'react'
import Image from 'next/image'
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";

const Card = (props) => {
  return (
    <div>
        {/* Image Section */}
        <div className='relative m-2 overflow-hidden rounded-2xl group'>
            <Image
                className='w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 rounded-sm'
                src={props.image}
                width={props.width}
                height={props.height}
                alt={props.alt}
                priority
                unoptimized={true}
            />
            {/* Black Overlay on Hover */}
            <div className='absolute inset-0 bg-[#1E1E1E] opacity-0 group-hover:opacity-70 transition-opacity rounded-2xl'></div>

            {/* Centered "View Live" Button */}
            <div className='hidden group-hover:flex absolute inset-0 justify-center items-center'>
                <button className='px-3 py-2 bg-[#E6E6E6] text-[#1A1A1A] text-xs rounded-2xl shadow-lg flex items-center gap-2 hover:bg-[#1A1A1A] hover:text-white'>
                    View Live <ArrowUpRightIcon className="h-3 w-3" />
                </button>
            </div>

            {/* Top Overlay - Flex with justify-between */}
            <div className='absolute top-3 left-3 right-3 flex justify-between items-center p-2'>
                <div className='flex gap-2'>
                    {props.tags.map((tag, index) => (
                        <span key={index} className='tags bg-[#E6E6E6] text-[#1A1A1A] px-2 py-[2px] text-[10px] rounded-2xl group-hover:bg-[#1A1A1A] group-hover:text-white group-hover:shadow-lg'>
                            {tag}
                        </span>
                    ))}
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
                    {props.role.map((item, index) => (
                        <span key={index} className='tags bg-[#E6E6E6] text-[#1A1A1A] px-2 py-[2px] text-[10px] rounded-2xl group-hover:shadow-lg'>
                            {item}
                        </span>
                    ))}
                </div>
                <div className='flex gap-2'>
                    <span className='tags px-2 py-[2px] text-[10px] rounded-2xl bg-[#1A1A1A] text-white group-hover:shadow-lg'>
                        Domain
                    </span>
                    <span className='tags bg-[#E6E6E6] text-[#1A1A1A] px-2 py-[2px] text-[10px] rounded-2xl group-hover:shadow-lg'>
                        {props.domain}
                    </span>
                </div>
                <div className='flex gap-2'>
                    <span className='tags px-2 py-[2px] text-[10px] rounded-2xl bg-[#1A1A1A] text-white group-hover:shadow-lg'>
                        Impact
                    </span>
                    <span className='tags bg-[#E6E6E6] text-[#1A1A1A] px-2 py-[2px] text-[10px] rounded-2xl group-hover:shadow-lg'>
                        {props.impact}
                    </span>
                </div>
            </div>
        </div>

        <div className='m-2 pt-2 flex flex-col gap-2'>
            <div className='font-semibold text-lg'>{props.title}</div>
            <div className='text-xs'>
                {props.description}
            </div>
        </div>
    </div>
  )
}

export default Card;
