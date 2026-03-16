import React from 'react';
import About from "@/components/about/About";
import { createClient } from "@/lib/supabase/server";

// ১. ডায়নামিক মেটাডেটা ফাংশন
export async function generateMetadata() {
  const supabase = await createClient();
  const { data } = await supabase.from("info").select("about").single();

  // ডাটাবেজের 'about' টেক্সট থেকে প্রথম ১৬০ ক্যারেক্টার ডেসক্রিপশন হিসেবে ব্যবহার করা ভালো
  const description = data?.about?.substring(0, 160) || "Learn more about Amran Hossen.";

  return {
    title: 'About',
    description: description,
    openGraph: {
      description: description,
    },
  };
}

// ২. মেইন পেজ কম্পোনেন্ট
const AboutPage = async () => {
  const supabase = await createClient();
  const { data } = await supabase.from("info").select("about").single();
  
  return (
    <div className="py-12">
      <About about={data?.about} />
    </div>
  );
};

export default AboutPage;
