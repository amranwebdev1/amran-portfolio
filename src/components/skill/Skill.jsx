"use client"
import React, { useEffect } from "react";
import Container from "@/components/common/Container";
import { skills } from "@/constents/data";
import { useSelector, useDispatch } from "react-redux";
import { filterSkill, setAll } from "@/redux/features/filter/filterSlice";
import { Card } from "@/components/ui/card";
import {WhileInViewDiv} from "@/components/common/Motion"
import { Layout, Zap, Terminal, Database, Code2, Layers } from "lucide-react";
import Title from "@/components/common/Title";

const iconMap = { Layout, Zap, Terminal, Database, Code2, Layers };

// Icon colors
const iconColors = {
  Layout: "#f97316",
  Zap: "#22c55e",
  Terminal: "#3b82f6",
  Database: "#a855f7",
  Code2: "#ef4444",
  Layers: "#facc15",
};

const Skill = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAll(skills));
  }, [dispatch]);

  const skill = useSelector((state) => state?.skill?.skill);

  return (
    <section className="py-20">
      <Container>
        {/* Heading */}
        <Title>My Skills</Title>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          <button
            onClick={() => dispatch(setAll(skills))}
            className="px-4 py-1 rounded-md text-sm bg-black/10 dark:bg-white/10 backdrop-blur border border-black/10 dark:border-white/10 hover:scale-105 transition"
          >
            All
          </button>
          <button
            onClick={() =>
              dispatch(filterSkill({ skills, category: "Frontend" }))
            }
            className="px-4 py-1 rounded-md text-sm bg-black/10 dark:bg-white/10 backdrop-blur border border-black/10 dark:border-white/10 hover:scale-105 transition"
          >
            Frontend
          </button>
          <button
            onClick={() =>
              dispatch(filterSkill({ skills, category: "Backend" }))
            }
            className="px-4 py-1 rounded-md text-sm bg-black/10 dark:bg-white/10 backdrop-blur border border-black/10 dark:border-white/10 hover:scale-105 transition"
          >
            Backend
          </button>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {skill?.map((item, i) => {
            const Icon = iconMap[item.icon];
            const iconColor = iconColors[item.icon] || "#ffffff";

            return (
              <WhileInViewDiv
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 130 }}
              >
                <Card className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-gradient-to-tr from-[#1f87de]/10 to-[#31d1e7]/5 dark:from-[#1f87de]/10 dark:to-[#31d1e7]/10 backdrop-blur-xl hover:scale-105 hover:shadow-lg transition duration-300">
                  
                  {/* Icon */}
                  <div
                    className="w-14 h-14 flex items-center justify-center rounded-lg relative"
                    style={{ backgroundColor: `${iconColor}20` }}
                  >
                    {Icon && <Icon className="w-7 h-7" style={{ color: iconColor }} />}
                    <span className="absolute w-full h-full rounded-lg bg-gradient-to-r from-[#1f87de] to-[#31d1e7] opacity-20 blur-lg -z-10" />
                  </div>

                  {/* Skill Name */}
                  <h2 className="text-sm md:text-base font-medium text-center text-gray-900 dark:text-gray-100">
                    {item?.name}
                  </h2>
                </Card>
              </WhileInViewDiv>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default Skill;