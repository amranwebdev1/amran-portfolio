"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github, Layout, Cpu, Smartphone, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from "framer-motion";
import Title from "@/components/common/Title"
const ProjectsSection = ({projects}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
 

  return (
    <section className="py-20 px-6 selection:bg-[#1f87de]/30">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1f87de]/10 border border-[#1f87de]/30 text-[#1f87de] text-sm font-medium mb-4">
            <Sparkles size={16} />
            <span>My some work</span>
          </div>
          <Title>Project </Title>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-lg leading-relaxed">
            I enjoy using modern technologies to build simple solutions for complex problems. Here are some of the projects I’ve worked on recently.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects?.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.15, type: "spring", stiffness: 120 }}
              className="group relative rounded-2xl overflow-hidden 
                bg-gradient-to-tr from-[#1f87de]/10 via-[#31d1e7]/10 to-[#24b6f9]/10 
                dark:from-[#1f87de]/10 dark:via-[#31d1e7]/10 dark:to-[#24b6f9]/10
                backdrop-blur-xl border border-black/10 dark:border-white/10 flex flex-col transition-all duration-300 hover:shadow-xl"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image */}
          {project?.image && (
              <div className="relative h-56 overflow-hidden rounded-t-2xl">
                <motion.div
                  className="w-full h-full relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={project?.image}
                    alt={project?.name}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute top-4 left-4 z-20 bg-white/20 dark:bg-black/40 backdrop-blur-md p-2 rounded-xl border border-white/10">
                  {project?.icon}
                </div>
                <div className={`absolute inset-0 bg-gradient-to-br from-[#1f87de]/20 via-[#31d1e7]/10 to-transparent transition-opacity duration-500 pointer-events-none ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`} />
              </div>)}

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow relative z-20">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project?.tech.map((tag, i) => (
                    <span key={i} className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-md bg-[#1f87de]/10 text-[#1f87de] dark:bg-black/20 dark:text-gray-300 border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-[#1f87de] transition-colors">
                  {project?.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                  {project?.description}
                </p>

                {/* Buttons */}
                <div className="flex items-center gap-3">
            {project?.link && (
                  <Link 
                    href={project?.link}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#1f87de] to-[#31d1e7] rounded-lg text-sm font-semibold text-white shadow-md transition-transform duration-200 active:scale-95"
                  >
                    লাইভ ডেমো <ExternalLink size={16} />
                  </Link>
                  )}
                  
            {project?.github_link && (
                  <Link 
                    href={project?.github_link}
                    title="Source Code"
                    className="p-2.5 rounded-lg bg-black/30 border border-white/20 hover:bg-white/20 text-gray-300 hover:text-white transition-transform duration-200"
                  >
                    <Github size={20} />
                  </Link>)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;