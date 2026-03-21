"use client";
import React, { useState } from "react";
import { Folder, FileText, Link, Github, Code, Plus, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const ProjectForm = () => {
  const router = useRouter();
  const [techs, setTechs] = useState([]);
  const [input, setInput] = useState("");
  const [uploading, setUploading] = useState(false); // লোডিং স্টেট
  const [imageFile, setImageFile] = useState(null); // ফাইল রাখার জন্য
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    link: "",
    github_link: "",
    icon: "",
  });

  const supabase = createClient();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addTech = () => {
    if (input.trim() !== "") {
      setTechs([...techs, input.trim()]);
      setInput("");
    }
  };

  const removeTech = (index) => {
    setTechs(techs.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = "";

      // ১. ইমেজ আপলোড করার লজিক
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        // 'project-images' নামে আপনার Supabase Bucket থাকতে হবে
        const { error: uploadError } = await supabase.storage
          .from("project-images")
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        // ইমেজ এর পাবলিক URL নেওয়া
        const { data: publicUrlData } = supabase.storage
          .from("project-images")
          .getPublicUrl(filePath);
        
        imageUrl = publicUrlData.publicUrl;
      }

      // ২. ডাটাবেজে ডাটা ইনসার্ট করা
      const { error } = await supabase.from("projects").insert([
        { 
          ...formData, 
          tech: techs, 
          image: imageUrl // এখানে ইমেজের লিংকে বা নাম সেভ হবে
        },
      ]);

      if (error) throw error;
      await fetch('/api/revalidate?path=/');
      router.push("/dashboard/project"); 
      router.refresh()
      alert("Project added successfully!");
      
      // ফর্ম রিসেট
      setFormData({ name: "", description: "", link: "", github_link: "", icon: "" });
      setTechs([]);
      setImageFile(null);
    } catch (error) {
      console.error("Error:", error.message);
      alert("Something went wrong!");
    } finally {
      setUploading(false);
    }
  };

  const fields = [
    { label: "Project Name", name: "name", icon: Folder },
    { label: "Description", name: "description", icon: FileText, full: true },
    { label: "Live Link", name: "link", icon: Link },
    { label: "GitHub Link", name: "github_link", icon: Github },
    { label: "Icon (URL)", name: "icon", icon: Code },
  ];

  return (
    <div className="min-h-screen bg-[#020617] flex justify-center px-3 sm:px-6 py-10 mt-12">
      <form onSubmit={handleSubmit} className="w-full max-w-md sm:max-w-lg md:max-w-2xl bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-4 sm:p-6 space-y-6">
        <h2 className="text-xl sm:text-2xl text-white text-center font-semibold">Add Project</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field, index) => {
            const Icon = field.icon;
            return (
              <div key={index} className={`space-y-1 ${field.full ? "md:col-span-2" : ""}`}>
                <label className="text-xs sm:text-sm text-gray-300">{field.label}</label>
                <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg px-3 focus-within:ring-2 focus-within:ring-indigo-500">
                  <Icon className="text-gray-400 w-4 h-4" />
                  {field.name === "description" ? (
                    <textarea name={field.name} onChange={handleChange} value={formData[field.name]} rows="3" className="w-full bg-transparent text-white outline-none py-2 text-sm" placeholder={`Enter ${field.label}`} />
                  ) : (
                    <input type="text" name={field.name} onChange={handleChange} value={formData[field.name]} className="w-full bg-transparent text-white outline-none py-2 text-sm" placeholder={`Enter ${field.label}`} />
                  )}
                </div>
              </div>
            );
          })}

          {/* ইমেজ আপলোড ফিল্ড */}
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs sm:text-sm text-gray-300">Project Image</label>
            <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg px-3 py-2">
              <ImageIcon className="text-gray-400 w-4 h-4" />
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full text-sm text-gray-300 file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
              />
            </div>
          </div>
        </div>

        {/* TECH INPUT (আগের মতোই) */}
        <div className="space-y-2">
          <label className="text-xs sm:text-sm text-gray-300">Technologies</label>
          <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg px-3">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="e.g. React" className="w-full bg-transparent text-white outline-none py-2 text-sm" />
            <button onClick={addTech} type="button" className="text-indigo-400"><Plus size={18} /></button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {techs.map((tech, index) => (
              <div key={index} className="flex items-center gap-1 bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-md text-xs">
                {tech} <button type="button" onClick={() => removeTech(index)}><X size={14} /></button>
              </div>
            ))}
          </div>
        </div>

        <button 
          disabled={uploading}
          type="submit" 
          className="w-full py-2 sm:py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium flex justify-center items-center gap-2 disabled:opacity-50"
        >
          {uploading ? <><Loader2 className="animate-spin" /> Saving...</> : "Save Project"}
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
