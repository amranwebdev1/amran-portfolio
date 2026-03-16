"use client"
import React from 'react';
import {navbarItem} from "@/constents/data";
import Link from "next/link";
import {usePathname} from "next/navigation"
const NavLink = () => {
  const pathname = usePathname();
  return (
    <nav className="hidden md:flex items-center gap-4" >
      {
        navbarItem?.map((item,index)=>(
        <Link 
        key={index} 
        href={item?.href} 
        className={`relative uppercase font-semibold text-base ${pathname === item?.href && "text-[#1f87de]"}`}>
          {item?.title}
          <div className={`absolute w-0 hover:w-1/2 h-1 bg-[#1f87de] bottom-0 left-1/2 cursor-pointer ${pathname === item?.href && "w-1/2"}`} />
          <div className={`absolute w-0 hover:w-1/2 h-1 bg-[#1f87de] bottom-0 right-1/2 cursor-pointer ${pathname === item?.href && "w-1/2"}`} />
        </Link>
        ))
      }
    </nav>
  );
};

export default NavLink;