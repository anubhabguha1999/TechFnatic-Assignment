import React from 'react'
import logo from '../../images/logo.png'
const Header = () => {
  return (
    <div><header className="flex item-center justify-between md:px-28 py-2">
    <img src={logo} className="w-24 md:w-56 m-3 md:ml-0"/>
    <div className="flex items-center text-[12px] md:text-[14px] text-red-900 font-extrabold">
        <h1 className="m-3 cursor-pointer hover:scale-110 duration-200 hover:underline">Home</h1>
        <h1 className="m-3 cursor-pointer hover:scale-110 duration-200 hover:underline"><a href="#products">Products</a></h1>
        <h1 className="m-3 cursor-pointer hover:scale-110 duration-200 hover:underline">ContactUs</h1>
    </div>
</header></div>
  )
}

export default Header