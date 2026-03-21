"use client"
import React from 'react';
import Image from "next/image"
import {Plus,Edit3,Trash2} from "lucide-react"
import {createClient} from "@/lib/supabase/client"
import {useRouter} from "next/navigation"
const Cart = ({projects}) => {
  const supabase =  createClient()
  const router = useRouter()
  const handleDelete = async (id)=>{
    const isConfirmed = confirm("আপনি কি নিশ্চিত যে এটি ডিলিট করতে চান?");
    if (!isConfirmed) return;

    const {error} = await supabase.from("projects").delete().eq("id",id);
    if(error) return alert("Not be delete")
    await fetch('/api/revalidate?path=/')
    router.refresh()
    alert("delete successfully")
  }
  return (
    <div className="flex flex-col items-center justify-center gap-3 mt-4">
  {projects?.map((item)=>(
      <div key={item?.id} className="rounded-2xl border p-6 sm:flex sm:items-center sm:justify-between gap-3  w-full">
          <div className="flex items-center gap-3 ">
            
            <Image src={item?.image || `/icon1.png`} alt="image name" width={100} height={100} className="rounded-md w-12 h-12 object-contain" />
            <div>
              <h2 className="text-xl font-bold font-roboto">{item?.name}</h2> 
              <p className="text-sm md:text-md">{item?.description.substring(0,80)}....</p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 p-3">
            <span className=" block sm:hidden"/>
            <div className="flex items-center justify-center gap-3">
              <button 
              onClick={() => router.push(`/dashboard/edit/${item?.id}`)} 
              className="p-2.5 bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-slate-700 transition-colors"><Edit3 size={18} /></button>
                  
                    <button
                    onClick={()=> handleDelete(item?.id)}
                    className="p-2.5 bg-slate-800 text-slate-400 hover:text-rose-500 rounded-xl border border-slate-700 transition-colors"><Trash2 size={18} /></button>
            </div>
          </div>
        </div>
        ))}
    </div>
  );
};

export default Cart;