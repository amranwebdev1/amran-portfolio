import React from 'react';
import Link from "next/link"

import Container from "@/components/common/Container"
import {Plus} from "lucide-react"
import Cart from "./Cart"
import {createClient} from "@/lib/supabase/server"
export const dynamic = "force-dynamic"; 
const Project = async () => {
  const supabase = await createClient()
  const {data} = await supabase.from("projects").select("*")
  const projects = data || {};
  return (
    <div className="py-18">
      <Container>
        <h1 className="text-3xl">Projects</h1>
        <div className="flex items-center justify-between mt-7 py-3 border-b">
          <h2 className="text-xl md:text-2xl">Project Management</h2> 
          <Link href="/dashboard/project/new_project" className="flex items-center justify-center rounded-lg bg-[#0037e6] py-1 px-4 gap-2">
             <Plus />
             New project
          </Link>
        </div>
        
        {/*card*/}
        <Cart projects={projects} />
      </Container>
    </div>
  );
};

export default Project;