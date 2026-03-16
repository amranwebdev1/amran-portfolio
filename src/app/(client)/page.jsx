import {Button} from "@/components/ui/button"
import Herro from "@/components/home/Herro"
import About from "@/components/about/About"
import Project from "@/components/Project/Projects"
import Skill from "@/components/skill/Skill"
import Contact from "@/components/contact/Contact"
import ShowAllBtn from "@/components/common/ShowAllBtn"

import {createClient} from "@/lib/supabase/server"
const HomePage = async ()=> {
  const supabase = await createClient();
 //get project data
   const {data:projects} = await supabase.from("projects").select("*");
   
  //get info data
  const {data} = await supabase.from("info").select("name,title,description,about,phone,email,location").single();
  const {name,title,description,about,phone,email,location} = data;
  return (
   <div className="font-roboto">
     {/*herro section*/}
     <Herro herroData={{name,title,description,phone,email}} />
     <About about={about} />
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