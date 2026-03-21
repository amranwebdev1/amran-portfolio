"use client";
import React, { useState, useEffect } from "react";
import { Folder, FileText, Link, Github, Code, Plus, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const UpdateForm = ({ projectId }) => {
  const router = useRouter();
  const supabase = createClient();
  
  const [techs, setTechs] = useState([]);
  const [input, setInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    link: "",
    github_link: "",
    icon: "",
    image: "", // ডাটাবেজের ইমেজ URL রাখার জন্য
  });

  // ১. পেজ লোড হওয়ার সময় আগের ডাটা নিয়ে আসা
  useEffect(() => {
    const fetchProjectData = async () => {
      if (!projectId) return;
      
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single();

      if (data) {
        setFormData({
          name: data.name || "",
          description: data.description || "",
          link: data.link || "",
          github_link: data.github_link || "",
          icon: data.icon || "",
          image: data.image || "", // আগের ইমেজ URL সেট করা হলো
        });
        setTechs(data.tech || []);
      }
    };

    fetchProjectData();
  }, [projectId, supabase]);

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
      // শুরুতে ডিফল্টভাবে স্টেট-এ থাকা ইমেজ URL টি রাখা হলো
      let finalImageUrl = formData.image; 

      // ২. যদি নতুন ইমেজ ফাইল সিলেক্ট করা হয় তবেই সেটি আপলোড হবে
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from("project-images")
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("project-images")
          .getPublicUrl(fileName);
        
        finalImageUrl = publicUrlData.publicUrl;
      }

      // ৩. ডাটাবেজে ডাটা আপডেট করা
      // formData থেকে 'image' প্রোপার্টি বাদ দিয়ে বাকিগুলো নেয়া (নিরাপত্তার জন্য)
      const { image, ...updateData } = formData;

      const { error } = await supabase
        .from("projects")
        .update({ 
          ...updateData, 
          tech: techs, 
          image: finalImageUrl // এখানে নতুন অথবা পুরনো ইমেজ URL টি যাচ্ছে
        })
        .eq("id", projectId);

      if (error) throw error;

      // রিভ্যালিডেশন এবং পেজ রিফ্রেশ
      await fetch('/api/revalidate?path=/');
      router.refresh();
      alert("Project updated successfully!");
      router.push("/dashboard/project"); 
      
    } catch (error) {
      console.error("Error:", error.message);
      alert("Error: " + error.message);
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
    <div className="min-h-screen bg-[#020617] flex justify-center px-3 sm:px-6 py-10">
      <form onSubmit={handleSubmit} className="w-full max-w-md sm:max-w-lg md:max-w-2xl bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-4 sm:p-6 space-y-6">
        <h2 className="text-xl sm:text-2xl text-white text-center font-semibold">Update Project</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field, index) => {
            const Icon = field.icon;
            return (
              <div key={index} className={`space-y-1 ${field.full ? "md:col-span-2" : ""}`}>
                <label className="text-xs sm:text-sm text-gray-300">{field.label}</label>
                <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg px-3 focus-within:ring-2 focus-within:ring-indigo-500">
                  <Icon className="text-gray-400 w-4 h-4" />
                  {field.name === "description" ? (
                    <textarea 
                      name={field.name} 
                      onChange={handleChange} 
                      value={formData[field.name]} 
                      rows="3" 
                      className="w-full bg-transparent text-white outline-none py-2 text-sm" 
                      placeholder={`Enter ${field.label}`} 
                    />
                  ) : (
                    <input 
                      type="text" 
                      name={field.name} 
                      onChange={handleChange} 
                      value={formData[field.name]} 
                      className="w-full bg-transparent text-white outline-none py-2 text-sm" 
                      placeholder={`Enter ${field.label}`} 
                    />
                  )}
                </div>
              </div>
            );
          })}

          <div className="md:col-span-2 space-y-1">
            <label className="text-xs sm:text-sm text-gray-300">Update Project Image (Optional)</label>
            <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg px-3 py-2">
              <ImageIcon className="text-gray-400 w-4 h-4" />
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full text-sm text-gray-300 file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
              />
            </div>
            {/* আগের ইমেজটি ছোট করে দেখানোর জন্য (ঐচ্ছিক) */}
            {formData.image && !imageFile && (
              <p className="text-[10px] text-gray-500 mt-1">Current image: {formData.image.split('/').pop()}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs sm:text-sm text-gray-300">Technologies</label>
          <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg px-3">
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="e.g. React" 
              className="w-full bg-transparent text-white outline-none py-2 text-sm" 
            />
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
          {uploading ? <><Loader2 className="animate-spin" /> Updating...</> : "Update Project"}
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;
