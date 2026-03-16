import Logo from "@/components/common/Logo";
import Link from "next/link";
import DraggableWhatsAppButton from "@/components/common/DraggableWhatsAppButton"
import SocialLink from "@/components/common/SocialLink"
import {navbarItem} from "@/constents/data"
import {WhileInViewDiv} from "@/components/common/Motion"
const Footer = () => {

  return (
    <footer className="relative mt-32 font-roboto">

      {/* animated gradient line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#1f87de] via-[#31d1e7] to-[#1f87de] animate-pulse"></div>

      {/* blur background */}
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="w-[500px] h-[250px] bg-gradient-to-r from-[#1f87de] to-[#31d1e7] blur-[140px] opacity-20"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-14">

        <WhileInViewDiv
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="
          grid
          md:grid-cols-3
          gap-10
          backdrop-blur-xl
          bg-white/40
          dark:bg-black/40
          border
          border-black/10
          dark:border-white/10
          rounded-2xl
          p-10
          "
        >

          {/* logo + about */}
          <div className="space-y-4">

            <Logo />

            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              I build modern web applications using Next.js, React and modern
              web technologies. Passionate about creating beautiful and
              functional user experiences.
            </p>

            <p className="text-xs text-gray-500">
              Built with Next.js • Tailwind • Motion
            </p>

          </div>


          {/* navigation */}
          <div>

            <h3 className="font-semibold mb-4">
              Navigation
            </h3>

            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
    {navbarItem?.map((item,i)=>(
          <li key={i + new Date()}>
            <Link
              href={`${item?.href}`}
              className="hover:text-[#1f87de] transition"
                >
            {item?.title}
            </Link>
          </li>
          ))}
            </ul>
          </div>


          {/* social */}
          <div>
            <SocialLink />
          </div>

        </WhileInViewDiv>


        {/* bottom */}
        <div className="text-center mt-10 text-sm text-gray-600 dark:text-gray-400">

          © {new Date().getFullYear()} Amran. All rights reserved.
        </div>

      </div>

{/* DraggableWhatsAppButton button */}
     
 <DraggableWhatsAppButton />
    </footer>
  );
};

export default Footer;