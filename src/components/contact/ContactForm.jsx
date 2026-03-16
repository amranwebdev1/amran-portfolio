"use client"
import React from "react";
import { Send } from "lucide-react";
import {motion} from "motion/react"
const ContactForm = () => {
  return (
    <>
      <motion.form
            initial={{opacity:0,x:40}}
            whileInView={{opacity:1,x:0}}
            transition={{duration:0.6}}
            className="space-y-6 p-8 rounded-2xl border border-black/10 dark:border-white/10 backdrop-blur-xl 
              bg-gradient-to-br from-[#1f87de]/0 via-[#31d1e7]/10 to-[#24b6f9]/10 dark:from-[#1f87de]/10 dark:via-[#31d1e7]/10 dark:to-[#24b6f9]/10
              shadow-lg"
          >
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg border border-black/10 dark:border-white/10 bg-white/10 dark:bg-black/20 text-gray-900 dark:text-gray-100 outline-none focus:border-[#1f87de]"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg border border-black/10 dark:border-white/10 bg-white/10 dark:bg-black/20 text-gray-900 dark:text-gray-100 outline-none focus:border-[#1f87de]"
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full px-4 py-3 rounded-lg border border-black/10 dark:border-white/10 bg-white/10 dark:bg-black/20 text-gray-900 dark:text-gray-100 outline-none focus:border-[#1f87de]"
            ></textarea>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg text-white bg-gradient-to-r from-[#1f87de] to-[#31d1e7] hover:opacity-90 transition shadow-lg"
            >
              Send Message
              <Send size={18}/>
            </button>
          </motion.form>
    </>
  );
};

export default ContactForm;