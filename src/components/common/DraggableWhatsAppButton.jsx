"use client";
import React, { useRef } from "react";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const DraggableWhatsAppButton = () => {
  // ১. ড্র্যাগিং এরিয়া লিমিট করার জন্য একটি রেফারেন্স (পুরো বডি বা কন্টেইনার)
  const constraintsRef = useRef(null);

  return (
    <>
      {/* এই ডিভটি পুরো স্ক্রিন কভার করবে যাতে বাটন এর বাইরে না যায় */}
      <div ref={constraintsRef} className="fixed inset-2 pointer-events-none z-50" />
      
      <motion.div
        drag
        dragConstraints={constraintsRef} // এখানে সরাসরি রেফারেন্স ব্যবহার করা হয়েছে
        dragElastic={0.3}
        className="fixed z-50 cursor-grab active:cursor-grabbing"
        // প্রাথমিক পজিশন সেট করার জন্য top/left ব্যবহার করা ভালো 
        style={{ bottom: 30, right: 30 }} 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link
          href="https://wa.me/8801771846063"
          target="_blank"
          className="flex items-center group"
          // ড্র্যাগ করার সময় ক্লিক প্রিভেন্ট করতে চাইলে onClick চেক করতে পারেন
        >
          {/* Hover Text */}
          <span className="mr-3 px-3 py-1 text-sm rounded-lg bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-200 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Chat with me
          </span>

          {/* Button UI */}
          <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[#1f87de] to-[#31d1e7] text-white shadow-2xl">
            <MessageCircle size={24} />
            
            {/* Glow Effect */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#1f87de] to-[#31d1e7] blur-md opacity-50 -z-10 group-hover:opacity-80 transition-opacity"></div>
            
            {/* Pulse Ring */}
            <span className="absolute w-full h-full rounded-full bg-[#31d1e7] opacity-20 animate-ping"></span>
          </div>
        </Link>
      </motion.div>
    </>
  );
};

export default DraggableWhatsAppButton;
