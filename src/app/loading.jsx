"use client"
import React from 'react';
import {motion} from "motion/react"
import Image from "next/image"
const loading = () => {
  return (
    <div className="min-h-[100vh] w-full flex items-center justify-center" >
    <div>
      <motion.div
      initial={{ scale: 0.9, opacity: 0.6 }}
        animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.6, 1, 0.6] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      className="rounded-4xl overflow-hidden"
      >
        <Image width={150} height={150} src="/icon1.png" alt="icon" priority className="w-[120px] md:w-[150px] h-auto" />
      </motion.div>
      
      <motion.p
        className="mt-2 text-gray-400 text-sm md:text-base text-center"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      >
        Loading...
      </motion.p>
      </div>
    </div>
  );
};

export default loading;