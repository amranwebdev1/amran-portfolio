"use client"
import React,{useEffect} from 'react';
import {createClient} from "@/lib/supabase/client";
const Layout = ({children}) => {
  const supabase = createClient()
  useEffect(() => {
  const trackVisit = async () => {
    try {
      // ১. ইউজারের IP Address সংগ্রহ করা (ফ্রি API ব্যবহার করে)
      const res = await fetch('https://api.ipify.org?format=json');
      const data = await res.json();
      const userIp = data.ip;

      // ২. চেক করা: এই IP থেকে আজ অলরেডি ভিজিট হয়েছে কি না (অপশনাল কিন্তু ভালো)
      // যদি চান প্রতিবার রিফ্রেশেই কাউন্ট হবে, তবে এই চেক বাদ দিতে পারেন।

      // ৩. ডাটাবেসে IP সহ ইনসার্ট করা
      await supabase.from("analytics").insert([
        { ip: userIp }
      ]);

      // ৪. ইনসার্ট করার পর মোট ভিজিটর আপডেট করা
      
    } catch (error) {
      console.error("Error tracking visit:", error);
    }
  };



  trackVisit();
}, []);

  return (
    <div>
      {children}
    </div>
  );
};

export default Layout;