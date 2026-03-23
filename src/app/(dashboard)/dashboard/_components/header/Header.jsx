import React from 'react';
import Link from "next/link"
import Container from "@/components/common/Container"
import Logo from "@/components/common/Logo"
import MobaileMenu from "./MobaileMenu"
import {Mail,ExternalLink} from "lucide-react"
import Avatar from "./Avatar"
import MessageNotification from "./MessageNotification";
import { createClient } from "@/lib/supabase/server";
const Header = async ({user}) => {
  const supabase = await createClient();
  const { count } = await supabase
    .from('messages')
    .select('*', { count: 'exact', head: true })
    .eq('is_read', false);
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
          <Link href="/" className="flex items-center gap-1 bg-indigo-500/5 p-1 rounded-full border border-indigo-500/10 backdrop-blur text-indigo-400">
            preview
            <ExternalLink size={16} />
          </Link>
          <MessageNotification  initialCount={count} />
          <Avatar user={user} />
        </div>
      </Container>
    </div>
  );
};

export default Header;