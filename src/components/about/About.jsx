import React from "react";
import Container from "@/components/common/Container";
import Image from "next/image";
import { motion } from "framer-motion";
import Title from "@/components/common/Title";
import {WhileInViewDiv} from "@/components/common/Motion";
import {WhileInViewText} from "@/components/common/Motion";
const About = ({aboutData}) => {
  const {about,image} = aboutData;
  return (
    <section className="py-20">
      <Container>
        {/* Heading */}
        <Title>About Me</Title>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* About Text */}
          <WhileInViewDiv
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1 rounded-2xl p-8 bg-gradient-to-tr from-[#1f87de]/10 to-[#31d1e7]/5 backdrop-blur-xl border border-black/10 dark:border-white/20 shadow-lg"
          >
        {about?.split("\n").map((line,i)=>(
            <WhileInViewText
            key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.1, 
              duration: 0.6 }}
              className="text-md md:text-lg leading-relaxed tracking-wide mb-4 text-gray-700 dark:text-gray-300"
            >
              {line}
            </WhileInViewText>
            ))}
          </WhileInViewDiv>

          {/* About Photo */}
          <WhileInViewDiv
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.6 }}
            className="order-1 md:order-2 flex justify-center"
          >
            <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-[#1f87de]/30 dark:border-[#31d1e7]/50 shadow-2xl hover:scale-105 transition-transform duration-500">
              <Image
                src={image}
                alt="About Me"
                fill
                className="object-cover"
              />
            </div>
          </WhileInViewDiv>
        </div>
      </Container>
    </section>
  );
};

export default About;