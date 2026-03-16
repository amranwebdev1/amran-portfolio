import React from 'react';
import {WhileInViewText} from "@/components/common/Motion";


const Title = ({ children }) => {
  return (
    <div className="flex items-center justify-center mb-6">
      <div className="relative">
        {/* Motion Background */}
        <div
          className="absolute -inset-18 bg-gradient-to-r from-[#1f87de] to-[#31d1e7] rounded-full blur-[130px] opacity-60 -z-10"
          
        ></div>

        {/* Main Text */}
        <div className="relative px-3 leading-none flex items-center">
                  {/* Title */}
        <WhileInViewText
          initial={{opacity:0,y:30}}
          whileInView={{opacity:1,y:0}}
          transition={{duration:0.6}}
          className="text-center text-4xl md:text-5xl font-bold mb-16 text-gray-900 dark:text-gray-100"
        >
          {children}
        </WhileInViewText>
        </div>
      </div>
    </div>
  );
};

export default Title;