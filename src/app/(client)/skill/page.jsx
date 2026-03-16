import React from 'react';
import Skill from "@/components/skill/Skill"

export const metadata = {
  title: 'Skills', // এটি দেখাবে "Skills | Amran Hossen"
  description: 'Technical expertise in Next.js, Tailwind CSS, Supabase, and more.',
};



const SkillPage = () => {
  return (
    <div className="py-15">
      <Skill />
    </div>
  );
};

export default SkillPage;