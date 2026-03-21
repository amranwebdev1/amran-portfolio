import React from 'react';
import Link from "next/link"
import Container from "@/components/common/Container"
import Logo from "@/components/common/Logo"
import MobaileMenu from "./MobaileMenu"
import {Mail,ExternalLink} from "lucide-react"
import Avatar from "./Avatar"
const Header = ({user}) => {
  return (
    <div className="py-2 bg-[#020617] border-b fixed top-0 right-0 left-0 md:left-64">
      <Container className="flex items-center justify-between md:px-6 lg:px-10">
      <div className="flex items-center gap-8">
        {/*mobail menu*/}
        <div className="md:hidden">
          <MobaileMenu />
        </div>
        {/*logo*/}
        <Link href="/dashboard" className="hidden sm:block md:hidden">
          <Logo />
        </Link>
      </div>
        {/*profile*/}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1 bg-indigo-500/5 p-1 rounded-full border border-indigo-500/10 backdrop-blur text-indigo-400">
            preview
            <ExternalLink size={16} />
          </div>
           <div className="w-10 h-10 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer transition-colors relative">
               <Mail size={18} />
               <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center rounded-full ring-2 ring-[#020617]">5</span>
            </div>
          <Avatar user={user} />
        </div>
      </Container>
    </div>
  );
};

export default Header;