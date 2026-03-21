"use client"
import Link from "next/link"
import { LayoutDashboard, Folder, Mail, Settings } from "lucide-react"
import Logo from "@/components/common/Logo"
import {navItem} from "../../_constents/data"
import {usePathname} from "next/navigation"
const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex flex-col w-64 bg-[#020617] border-r border-slate-800">

      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <Logo />
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        <small className="text-sm">Main dashboard</small>
      
        <Link
          href="/dashboard"
          className={`flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition ${pathname === "/dashboard" ? "text-[#31d1e7] bg-[#31d1e7]/10 border-b !border-b-[#31d1e7]":""}`}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>
    <small className="text-sm">Sections</small>
    {navItem?.map((item,index)=>{
      const Icon = item?.icon;
       return <Link
          key={index}
          href={`${item?.href}`}
          className={`flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition ${pathname === item?.href ? "text-[#31d1e7] bg-[#31d1e7]/10 border-b !border-b-[#31d1e7]":""}`}
        >
          <Icon size={18} />
          {item?.title}
        </Link>
      })}
      {/*logout button*/} 
      <div className="py-10 border-t flex justify-center ">
        <button className="flex items-center justify-center text-bold text-roboto text-red-500 text-lg rounded-3xl border px-4 py-1 gap-2 bg-red-500/10">
          <Mail size={17} />
          <p>Logout</p>
        </button>
    </div>
      </nav>
    
    
    </aside>
  )
}

export default Sidebar