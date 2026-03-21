import {Button} from "@/components/ui/button"
import Herro from "@/components/home/Herro"
import About from "@/components/about/About"
import Project from "@/components/Project/Projects"
import Skill from "@/components/skill/Skill"
import Contact from "@/components/contact/Contact"
import ShowAllBtn from "@/components/common/ShowAllBtn"

import {createClient} from "@/lib/supabase/server"

export const dynamic = "force-static";
const HomePage = async ()=> {
  const supabase = await createClient();
 //get project data
   const {data:projects} = await supabase.from("projects").select("*");
   
  //get info data
  const {data} = await supabase.from("info").select("name,title,short_bio,phone,email,location").single();
  const {data:aboutMe} = await supabase.from("about_me").select("*").single();
  const {name,title,short_bio,phone,email,location} = data || {};
  
  return (
   <div className="font-roboto">
     {/*herro section*/}
     <Herro herroData={{name,title,short_bio,phone,email}} />
     <About aboutData={aboutMe} />
     <Skill />
     <Project projects={projects} />
    <ShowAllBtn href="/project">
      Show all project
    </ShowAllBtn>
     <Contact contact={{phone,email,location}} />
   </div>
  );
}

export default HomePage;