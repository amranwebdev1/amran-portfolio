import React from 'react';
import {AnimateText,AnimateDiv} from "@/components/common/Motion";
import Link from "next/link"
const Terminal = ({herroData})=> {
  const skills = [
  "NextJS",
  "React",
  "ExpressJS",
  "PostgreSQL",
  "SQL",
  "MongoDB",
  "NodeJS",
  "TypeScript",
  "JavaScript",
  "Python",
  "Supabase"
]
  return (
    <>
      <div className="rounded-xl border border-black/10 dark:border-white/10 w-full md:max-w-[550px] h-86 md:h-100 mt-4 overflow-hidden">

  {/* Terminal Header (Fixed) */}
  <div className="sticky top-0 z-10 flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-neutral-900 border-b border-black/10 dark:border-white/10">
    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
    <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
    <span className="w-3 h-3 bg-green-500 rounded-full"></span>

    <span className="ml-3 text-xs text-gray-500 dark:text-gray-400 font-mono">
      amran@portfolio:~
    </span>
  </div>

  {/* Terminal Content */}
  <div className="p-4 font-mono text-sm bg-white dark:bg-black text-black dark:text-green-400 h-full overflow-y-auto space-y-2">

    <AnimateText
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{delay:0.1}}
      className="text-blue-400"
    >
      ✔ Fetching profile data...
    </AnimateText>

    <AnimateText initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2}}>
      Name: {herroData?.name}
    </AnimateText>

    <AnimateText initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.3}}>
      Title: {herroData?.title}
    </AnimateText>
    <AnimateText initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4}}>
      Email: <Link className="underline" href={`mailto:${herroData?.email}`}>{herroData?.email}</Link>
    </AnimateText>
    <AnimateText initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4}}>
      Phone: <Link className="underline" href={`tel:${herroData?.phone}`}>{herroData?.phone}</Link>
    </AnimateText>

    <AnimateText
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{delay:0.4}}
      className="text-blue-400"
    >
      ✔ Loading skills...
    </AnimateText>

    {/* Skills List */}
    {skills.map((skill, index) => (
      <AnimateText
        key={skill}
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{delay:0.5 + index * 0.15}}
      >
        - {skill}
      </AnimateText>
    ))}

    <AnimateText
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{delay:2.4}}
      className="text-blue-400"
    >
      ✔ Verifying traits...
    </AnimateText>

    <AnimateDiv
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{delay:2.6}}
    >
      <p>Hard Worker: Yes</p>
      <p>Quick Learner: Yes</p>
      <p>Years of Experience: 1++</p>
    </AnimateDiv>

  </div>

</div>
    </>
  );
};

export default Terminal;