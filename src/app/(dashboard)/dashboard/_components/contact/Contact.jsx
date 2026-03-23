"use client";
import React,{useEffect,useState} from "react";
import {createClient} from "@/lib/supabase/client"
import {
  Phone,
  Mail,
  MapPin,
  Loader2
} from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"
const ContactForm = () => {
  const router = useRouter();
  const [loading,setLoading] = useState(false)
  const [formData,setFormData] = useState({
    phone:"",
    email:"",
    location:""
  })
  
  const supabase = createClient();
  
  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  useEffect(()=>{
    try{
      const getData = async ()=>{
        const {data,error} = await supabase.from("info").select("*").single();
        if(error) throw error;
        setFormData(data)
      }
      getData()
    }catch(error){
      console.log(error.message)
    }
  },[])
  const handleSubmit = async(e)=>{
    e.preventDefault();
    setLoading(true)
    try{
      const {error} = await supabase.from("info").update({
        phone:formData?.phone,
        email:formData?.email,
        location:formData?.location
      }).eq("id",formData.id)
      
      if(error) throw error;
      await fetch('/api/revalidate?path=/');
      router.refresh()
      toast.success("Contact update successfully!")
      router.push("/dashboard")
    }catch(error){
      console.log(error.message)
      toast.error("Update failed!")
    }finally{
      setLoading(false)
    }
  }
  const fields = [
    { label: "Phone", name: "phone", icon: Phone },
    { label: "Email", name: "email", icon: Mail },
    { label: "Location", name: "location", icon: MapPin, full: true },
  ];

  return (
    <div className="min-h-screen bg-[#020617] flex justify-center px-3 sm:px-6 py-10 mt-12">
      
      <form onSubmit={handleSubmit} className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-4 sm:p-6 space-y-6">
        
        <h2 className="text-xl sm:text-2xl text-white text-center font-semibold">
          Contact Info
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field, index) => {
            const Icon = field.icon;
            return (
              <div
                key={index}
                className={`space-y-1 ${field.full ? "md:col-span-2" : ""}`}
              >
                <label className="text-xs sm:text-sm text-gray-300">
                  {field.label}
                </label>

                <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg px-3 focus-within:ring-2 focus-within:ring-indigo-500 transition">
                  
                  <Icon className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />

                  <input
                    type="text"
                  onChange={handleChange}
                    name={field.name}
                    value={formData[field.name] || ""}
                    placeholder={`Enter your ${field.label}`}
                    className="w-full bg-transparent text-white placeholder-gray-400 outline-none py-2 text-sm sm:text-base"
                  />
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

export default ContactForm;