import Container from "@/components/common/Container"
import SocialLink from "@/components/common/SocialLink"
import Link from "next/link"
import {ArrowRight,ArrowDownToLine} from "lucide-react"
import Terminal from "./Terminal"
const Herro = ({herroData}) => {
  
  return (
    <div className="py-8" >
      <Container className=" min-h-[100vh] py-10 grid grid-cols-1 md:grid-cols-2 items-center font-roboto">
        {/*herro left*/} 
        <div className="text-center">
          <h1 
          className="text-3xl font-bold font-lobster">Hi,I'm <br/> <span className="text-4xl bg-gradient-to-r from-[#1f87de] to-[#31d1e7] text-transparent bg-clip-text">{herroData?.name}</span></h1>
          
          <p className="text-xl">{herroData?.title}</p>
          {/*social link*/} 
          <div className="mt-6 flex items-center justify-center mb-2">
            <SocialLink />
          </div>
          {/*action btn*/}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
            <Link href="/project"
            className="flex items-center justify-center rounded-full py-2 px-4 bg-gradient-to-r from-[#1f87de] to-[#31d1e7] text-sm md:text-xl gap-2 text-white font-semibold"
            >
              View projects
              <ArrowRight className="animate-ping" />
            </Link>
    
            <Link href="/"
            className="flex items-center justify-center rounded-full py-2 px-4 text-sm md:text-xl gap-2  font-semibold bg-gradient-to-tr from-[#1f87de]/10 to-[#31d1e7]/20 border border-[#31d1e7]/10 backdrop-blur-2xl"
            >
              <ArrowDownToLine />
              Resume
            </Link>
          </div>
        </div>
        {/*herro right*/} 
        <Terminal herroData={herroData} />
      </Container>
    </div>
  );
};

export default Herro;