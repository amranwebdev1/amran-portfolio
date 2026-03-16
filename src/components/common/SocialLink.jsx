import { Github, Linkedin, Facebook, Mail, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const SocialLinks = async () => {
  const supabase = await createClient();

  const { data,error } = await supabase
    .from("info")
    .select("github,x,youtube,facebook,linkedin")
    .single();
    if(error) console.log("error",error);
   const github = data?.github;
   const x = data?.x;
   const youtube = data?.youtube;
   const facebook = data?.facebook;
   const linkedin = data?.linkedin;


  return (
    <div className="flex items-center gap-4">
      {github && (
        <Link href={github} target="_blank" className="group social-btn">
          <Github size={22} />
        </Link>
      )}

      {linkedin && (
        <Link href={linkedin} target="_blank" className="group social-btn">
          <Linkedin size={22} />
        </Link>
      )}

      {x && (
        <Link href={x} target="_blank" className="group social-btn">
          <Twitter size={22} />
        </Link>
      )}

      {youtube && (
        <Link href={youtube} target="_blank" className="group social-btn">
          <Youtube size={22} />
        </Link>
      )}

      {facebook && (
        <Link href={facebook} target="_blank" className="group social-btn">
          <Facebook size={22} />
        </Link>
      )}
    </div>
  );
};

export default SocialLinks;