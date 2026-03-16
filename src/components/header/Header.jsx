import React from 'react';
import Link from "next/link"

import Logo from "@/components/common/Logo"
import Container from "@/components/common/Container"
import {ModeToggle} from "@/components/ui/mode-toggle"
import NavLink from "./NavLink"
import MobaileMenu from "./MobaileMenu"

const Header = () => {
  return (
    <div className="py-2 bg-white/40 dark:bg-black/40 backdrop-blur-md border-b dark:border-b-white/20 border-b-black/20 fixed top-0 left-0 right-0 z-50 font-roboto" >
      <Container className="flex items-center justify-between" >
        {/*logo*/}
        <Link href="/">
          <Logo />
        </Link>
        {/*navlink*/}
        <div>
          <NavLink />
        </div>
        {/*dark mode and lang*/}
        <div className="flex items-center gap-2" >
          <ModeToggle />
          <MobaileMenu />
        </div>
      </Container>
    </div>
  );
};

export default Header;