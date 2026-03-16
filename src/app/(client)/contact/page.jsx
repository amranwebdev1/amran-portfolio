import React from 'react';
import Contact from "@/components/contact/Contact"
import {createClient} from "@/lib/supabase/server";

// ১. মেটাডেটা ফাংশন
export async function generateMetadata() {
  const supabase = await createClient();
  const { data } = await supabase.from("info").select("email,phone,location").single();

  // নম্বর ও ইমেইল দিয়ে একটি সুন্দর ডেসক্রিপশন তৈরি
  const description = `Contact Amran Hossen for full-stack development. Available for hire in Bangladesh & remote. 📞 ${data?.phone || ''} | 📧 ${data?.email || ''}. Located in ${data?.address || 'Bangladesh'}.`;

  return {
    title: 'Contact',
    description: description,
    openGraph: {
      title: 'Contact Amran Hossen | Hire Me',
      description: description,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Contact Amran Hossen',
      description: description,
    }
  };
}



//main page
const ContactPage = async () => {
  const supabase = await createClient();
  const {data} = await supabase.from("info").select("phone,email,location").single();
  const {phone,email,location} = data;
  return (
    <div className="py-10">
      <Contact contact={{phone,email,location}} />
    </div>
  );
};

export default ContactPage;