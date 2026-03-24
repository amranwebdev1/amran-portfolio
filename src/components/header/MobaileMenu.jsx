"use client"
import React from 'react';
import {X,TextAlignEnd,ArrowDownToLine,Handshake} from "lucide-react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {Button} from "@/components/ui/button"
import Logo from "@/components/common/Logo"

import {navbarItem} from "@/constents/data"
import Link from "next/link"
import {usePathname} from "next/navigation"
import {motion} from "motion/react"
const MobaileMenu = () => {
  const pathname = usePathname();
  return (
    <div>
      <Drawer direction="right" >
      <DrawerTrigger asChild>
        <TextAlignEnd 
          size={28} 
          className="hover:text-[#1f87de] cursor-pointer md:hidden" />
      </DrawerTrigger>
      
  <DrawerContent className="ml-auto !w-[300px] overflow-hidden">
    <DrawerHeader>
      <DrawerTitle className="flex items-center justify-between" >
        <Logo />
        <DrawerClose asChild>
          <Button variant="outline">
            <X size={28} />
          </Button>
        </DrawerClose>
      </DrawerTitle>
    </DrawerHeader>
    <div className="px-4 flex flex-col justify-center gap-2 mt-4 font-roboto">
     {
  navbarItem?.map((item,index)=>{
    const Icon = item?.icon;

    return (
      <motion.div
        key={index}
        initial={{opacity:0,x:-10}}
        animate={{opacity:1,x:0}}
        transition={{duration:0.5,delay:0.1 + index * 0.1}}
      >
        <DrawerClose asChild>
          <Link 
            href={item?.href} 
            className={`uppercase text-md flex items-center gap-2 border-b border-b-black/20 dark:border-b-white/20 py-2 px-2 rounded-md font-semibold hover:bg-black/10 dark:hover:bg-white/10 ${pathname === item?.href && "text-[#1f87de] bg-[#1f87de]/10 !border-b-[#1f87de]"}`}
          >
            <Icon size={20} />
            {item?.title}
          </Link>
        </DrawerClose>
      </motion.div>
    )
  })
}
    </div>
    
    <DrawerFooter className=" mb-8 font-roboto" >
        <Link 
      href="/amran_resume.pdf"
      download
      className="flex items-center justify-center gap-2 rounded-lg py-2 px2 bg-black/10 border border-black/20 dark:bg-white/10 dark:border dark:border-white/20 backdrop-blur-2xl text-md font-semibold">
          <ArrowDownToLine size={20} />
      Download resume
      </Link>
    <DrawerClose asChild>
        <Link 
      href="/contact" 
      className="flex items-center justify-center gap-2 rounded-lg py-2 px2 backdrop-blur-2xl text-md font-semibold bg-gradient-to-r from-[#1f87de] to-[#31d1e7] mt-2 text-white">
        <Handshake size={20} />
        Hire me
      </Link>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
    </div>
  );
};

export default MobaileMenu;