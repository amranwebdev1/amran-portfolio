"use client"
import React from 'react';
import { X, TextAlignEnd, LogOut, LayoutDashboard } from "lucide-react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import Logo from "@/components/common/Logo"
import { navItem } from "../../_constents/data"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation" // useRouter ইম্পোর্ট করুন
import { motion } from "motion/react"
import { createClient } from '@/lib/supabase/client' // আপনার supabase client ইম্পোর্ট করুন

const MobaileMenu = () => {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient(); // ক্লায়েন্ট ইনিশিয়ালাইজ করুন

  // লগআউট ফাংশন
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      // লগআউট হওয়ার পর হোমপেজে বা সাইন-ইন পেজে পাঠিয়ে দিন
      router.push("/auth/sign-in");
      router.refresh(); // পেজ রিফ্রেশ করলে মিডলওয়্যার আবার রান করবে
    } else {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <div>
      <Drawer direction="left" >
        <DrawerTrigger asChild>
          <TextAlignEnd
            size={28}
            className="hover:text-[#1f87de] cursor-pointer md:hidden" />
        </DrawerTrigger>

        <DrawerContent className=" overflow-hidden">
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
            <small className="text-sm">Main dashboard</small>
            <DrawerClose asChild>
              <Link
                href={"/dashboard"}
                className={`uppercase text-md flex items-center gap-2 border-b border-b-black/20 dark:border-b-white/20 py-2 px-2 rounded-md font-semibold hover:bg-black/10 dark:hover:bg-white/10 ${pathname === "/dashboard" && "text-[#1f87de] bg-[#1f87de]/10 !border-b-[#1f87de]"}`}
              >
                <LayoutDashboard size={20} />
                Dashboard
              </Link>
            </DrawerClose>

            <small className="text-sm">Sections</small>
            {
              navItem?.map((item, index) => {
                const Icon = item?.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
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
            <DrawerClose asChild>
              {/* Link এর বদলে Button ব্যবহার করা ভালো লগআউটের জন্য */}
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 rounded-lg py-2 px-2 backdrop-blur-2xl text-md font-semibold bg-red-500/10 mt-2 text-red-500 w-full hover:bg-red-500/20 transition-colors"
              >
                <LogOut size={20} />
                Logout
              </button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobaileMenu;
