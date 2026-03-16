import React from 'react';
import Image from "next/image"

const Logo = () => {
  return (
    <div>
      {/*logo for light mode*/}
      <Image 
      width={200} 
      height={100} 
      src="/logo_for_light_mode.png"
      alt="Logo"
      className="block dark:hidden w-auto h-10 -translate-x-2"
      priority
      />
      {/*logo for dark mode*/}
      <Image 
      width={200} 
      height={100} 
      src="/logo_for_dark_mode.png"
      alt="Logo"
      className="hidden dark:block w-auto h-10 -translate-x-2"
      priority
      />
    </div>
  );
};

export default Logo;