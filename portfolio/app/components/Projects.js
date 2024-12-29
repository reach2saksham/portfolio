import React from 'react'

const Projects = () => {
  return (
    <div className='projects
       flex gap-2 items-center justify-between 
       max-w-full container 
       pt-4 mx-auto 
       xl:px-36 lg:px-14 sm:px-4'>
      <div className='bg-[#131313] w-1/3 text-center rounded-3xl '>
      <div className='projecthead text-7xl'>DESIGN</div>
      <div></div>
      </div>

      <div className='bg-[#131313] w-1/3 text-center rounded-3xl'>
      <div className='projecthead text-7xl'>DEVELOPMENT</div>
      <div></div>
      </div>

      <div className='bg-[#131313] w-1/3 text-center rounded-3xl'>
      <div className='projecthead text-7xl'>PRODUCT</div>
      <div></div>
      </div>

    </div>
  )
}

export default Projects
