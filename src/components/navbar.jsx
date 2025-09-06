import React from 'react'
import { FaTasks } from "react-icons/fa";

const navbar = () => {
  return (
    <div>
      <nav className='flex neon-navbar  justify-around bg-violet-900 text-white py-1 items-center rounded-full'>
        <div className="logo">
            <span className='font-bold text-xl mx-8 '><FaTasks /></span>
        </div>
        <ul className="flex gap-5 mx-8 ">
            <li className='cursor-pointer hover:font-bold transition-all '>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all '>Yours Tasks</li>
            
        </ul>
      </nav>
    </div>
  )
}

export default navbar

