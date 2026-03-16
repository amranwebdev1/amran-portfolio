import React from 'react';
import Project from "@/components/Project/Projects"
import {createClient} from "@/lib/supabase/server"

export const metadata = {
  title: 'Projects', // এটি দেখাবে "Projects | Amran Hossen"
  description: 'A showcase of my premium web development projects.',
};



const ProjectPage = async () => {
  const supabase = await createClient();
 
   const {data:projects} = await supabase.from("projects").select("*");
  return (
    <div>
      <Project projects={projects} />
    </div>
  );
};

export default ProjectPage;