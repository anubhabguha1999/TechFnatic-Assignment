import React from 'react'
import logo from '../../images/logo.png'
import { useNavigate } from 'react-router-dom'
const HeaderAdmin = () => {
  
  const nav = useNavigate()
  
  return (
    <div>
        <header className="flex item-center justify-between md:px-28 py-2">
        <div className="flex items-center">
            <img src={logo} className="w-24 md:w-56 m-3 mr-0 md:ml-0"/>
            <sub className="text-red-800 font-bold">Admin</sub>
        </div>
        <div className="flex items-center text-[12px] md:text-[14px] text-red-900 font-extrabold">
            <h1 className="m-3 cursor-pointer hover:scale-110 duration-200 hover:underline">Products</h1>
            <h1 className="m-3 cursor-pointer hover:scale-110 duration-200 hover:underline"><a href="#products">Contents</a></h1>
            <h1 className="m-3 text-green-400 text-lg cursor-pointer hover:scale-110 duration-200 hover:underline" onClick={()=>nav('/admins')}>Admins</h1>
        </div>
    </header>
    <div className="text-red-900 border-t-2 border-red-900"></div>

    </div>
  )
}

export default HeaderAdmin