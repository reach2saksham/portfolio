import React from 'react'
import NavLink from './NavLink'

const MenuOverlay = ({links}) => {
  return (
    <div>
      <ul className='flex flex-col items-end gap-2 pr-6'>{links.map((Link, index) =>
    (<li key={index}>
    <NavLink href={Link.path} title={Link.title}/>
    </li>
))}</ul>
    </div>
  )
}

export default MenuOverlay
