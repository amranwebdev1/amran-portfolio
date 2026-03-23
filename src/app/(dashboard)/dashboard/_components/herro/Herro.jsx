"use client";
import React, { useState, useEffect } from "react";
import { User, BadgeCheck, FileText, Facebook, Youtube, Linkedin, Github, Twitter, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"
const Herro = () => {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    short_bio: "",
    facebook: "",
    youtube: "",
    linkedin: "",
    github: "",
    x: "",
  });

  // ১. প্রথমে ডাটাবেজ থেকে বর্তমান ডাটা ফেচ করে আনা (যাতে ইনপুট ফিল্ড খালি না থাকে)
  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("info") // আপনার টেবিলের নাম দিন
        .select("*")
        .single(); // যেহেতু একটাই প্রোফাইল থাকবে

      if (data) setFormData(data);
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ২. আপডেট ফাংশন
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("info")
        .update({
          name: formData.name,
          title: formData.title,
          short_bio: formData.short_bio,
          facebook: formData.facebook,
          youtube: formData.youtube,
          linkedin: formData.linkedin,
          github: formData.github,
          x: formData.x,
        })
        .eq("id", formData.id); // নির্দিষ্ট ID ধরে আপডেট হবে (নতুন রো তৈরি হবে না)

      if (error) throw error;
      
        // --- On-Demand Revalidation ট্রিগার করা ---
      // এটি আপনার তৈরি করা route.js কে কল করবে এবং হোম পেজ আপডেট করবে
      await fetch('/api/revalidate?path=/'); 

      // বর্তমান ড্যাশবোর্ডের ডেটা আপডেট করা
      router.refresh()
      toast.success("Profile updated successfully!");
      router.push("/dashboard")
    } catch (error) {
      console.error("Error Detail:", error.message || error);
      toast.error("Update failed!");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { label: "Name", name: "name", icon: User },
    { label: "Title", name: "title", icon: BadgeCheck },
    { label: "Short short_bio", name: "short_bio", icon: FileText, full: true },
    { label: "Facebook", name: "facebook", icon: Facebook },
    { label: "YouTube", name: "youtube", icon: Youtube },
    { label: "LinkedIn", name: "linkedin", icon: Linkedin },
    { label: "GitHub", name: "github", icon: Github },
    { label: "X (Twitter)", name: "x", icon: Twitter },
  ];

  return (
    <div className="min-h-screen bg-[#020617] flex items-start sm:items-center justify-center px-3 sm:px-6 py-10 mt-12">
      <form onSubmit={handleUpdate} className="w-full max-w-md sm:max-w-lg md:max-w-2xl bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-4 sm:p-6 space-y-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-white text-center">Update Profile</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field, index) => {
            const Icon = field.icon;
            return (
              <div key={index} className={`space-y-1 ${field.full ? "md:col-span-2" : ""}`}>
                <label className="text-xs sm:text-sm text-gray-300">{field.label}</label>
                <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg px-3 focus-within:ring-2 focus-within:ring-indigo-500 transition">
                  <Icon className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  {field.name === "short_bio" ? (
                    <textarea name={field.name} value={formData[field.name] || ""} onChange={handleChange} rows="3" placeholder={`Enter your ${field.label}`} className="w-full bg-transparent text-sm sm:text-base text-white placeholder-gray-400 outline-none py-2 resize-none" />
                  ) : (
                    <input type="text" name={field.name} value={formData[field.name] || ""} onChange={handleChange} placeholder={`Enter your ${field.label}`} className="w-full bg-transparent text-sm sm:text-base text-white placeholder-gray-400 outline-none py-2" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button disabled={loading} type="submit" className="w-full py-2 sm:py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 text-white text-sm sm:text-base font-medium transition flex justify-center items-center gap-2">
          {loading ? <><Loader2 className="animate-spin" size={18} /> Updating...</> : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default Herro;
