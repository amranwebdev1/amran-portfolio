import React from 'react';
import {ArrowRight} from "lucide-react"
import Link from "next/link"
const ShowAllBtn = ({children,href}) => {
  return (
    <>
      <div className="flex flex-col items-center">
          <Link 
            href={href}
            className="group flex items-center gap-3 text-gray-500 dark:text-gray-400 hover:text-[#1f87de] transition-all duration-300"
          >
            <span className="text-lg font-sans">{children}</span>
            <div className="p-2 rounded-full border border-gray-400 group-hover:border-[#1f87de] transition-all">
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
    </>
  );
};

export default ShowAllBtn;