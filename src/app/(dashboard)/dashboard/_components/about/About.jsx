"use client";
import React, { useState, useEffect } from "react";
import Container from "@/components/common/Container";
import { User, ImagePlus, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"
const About = () => {
  const router = useRouter();
  const [bio, setBio] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false); // ইমেজের জন্য আলাদা স্টেট
  const supabase = createClient();

  // ১. ডেটা ফেচ করা
  useEffect(() => {
    const getData = async () => {
      try {
        const { data, error } = await supabase.from("about_me").select("*").single();
        if (data) {
          setBio(data.about || "");
          setPreview(data.image || null);
        }
      } catch (error) {
        console.log("Fetch Error:", error);
      }
    };
    getData();
  }, [supabase]);

  // ২. ইমেজ আপলোড হ্যান্ডলার
  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ক্লায়েন্ট সাইড প্রিভিউ (তাৎক্ষণিক দেখানোর জন্য)
    setPreview(URL.createObjectURL(file));
    setUploading(true);
//old path find 
  let oldPath = null;
  if(preview && preview.includes("project-images")){
    oldPath = preview.split("project-images/")[1];
  }
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `about-amran-full-stack-developer-${Date.now()}.${fileExt}`; // random এর বদলে সময় ব্যবহার করা নিরাপদ
      const filePath = `about/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError; // এখানে ভুল ছিল আপনার কোডে

      const { data } = supabase.storage.from("project-images").getPublicUrl(filePath);
    const newUrl = data.publicUrl;
    
    if(oldPath){
      await supabase.storage.from("project-images").remove([oldPath])
    }
      // ডাটাবেসে সেভ করার জন্য পাবলিক ইউআরএল সেট করা
      setPreview(newUrl);
    } catch (error) {
      console.log(error.message);
      toast.error("Error uploading image!");
    } finally {
      setUploading(false);
    }
  };

  // ৩. ফাইনাল সাবমিট (Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (uploading) return toast.success("Please wait for image to upload!");
    
    setLoading(true);
    try {
      const { error } = await supabase.from("about_me").upsert({
        id: 1, // নিশ্চিত করুন এই আইডি আপনার টেবিলে আছে বা PK হিসেবে সেট করা
        about: bio,
        image: preview,
      });

      if (error) throw error;
      await fetch('/api/revalidate?path=/'); 
      router.refresh()
      toast.success("Updated successfully!");
      router.push("/dashboard")
    } catch (error) {
      console.log(error.message);
      toast.error("Update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20 bg-[#020617] min-h-screen text-white">
      <Container>
        <h2 className="text-3xl lg:text-4xl text-center font-bold mb-10 flex items-center justify-center gap-2">
          <User /> About Me
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 px-4 py-6 md:p-8 rounded-2xl border border-gray-700 bg-[#020617]/40 backdrop-blur-md"
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300 flex items-center gap-2">
              <User size={16} /> Your Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows="5"
              maxLength="200"
              placeholder="Write something about yourself..."
              className="w-full bg-transparent border border-gray-700 rounded-lg p-3 text-white placeholder-gray-400 outline-none focus:border-blue-500 transition"
            />
            <span className="text-xs text-gray-400 text-right">{bio.length}/200</span>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm text-gray-300 flex items-center gap-2">
              <ImagePlus size={16} /> Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="text-sm file:bg-blue-600 file:border-none file:px-3 file:py-1 file:rounded-md file:text-white hover:file:bg-blue-700"
            />
            {preview && (
              <div className="relative w-24 h-24">
                <img
                  src={preview}
                  alt="preview"
                  className={`w-24 h-24 rounded-full object-cover border ${uploading ? 'opacity-50' : ''}`}
                />
                {uploading && <Loader2 className="absolute inset-0 m-auto animate-spin" />}
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading || uploading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {loading ? <><Loader2 className="animate-spin" size={18} /> Saving...</> : "Save"}
            </button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default About;
