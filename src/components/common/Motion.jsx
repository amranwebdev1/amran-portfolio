"use client";
import React from 'react';
import {motion} from "motion/react";

//WhileInViewDiv
export const WhileInViewDiv = ({children,initial,transition,whileInView,className}) => {
  return (
    <motion.div
    initial={initial}
    whileInView={whileInView}
    transition={transition}
    className={className}
    >
      {children}
    </motion.div>
  );
};
//AnimateDiv
export const AnimateDiv = ({children,initial,transition,animate,className}) => {
  return (
    <motion.div
    initial={initial}
    animate={animate}
    transition={transition}
    className={className}
    >
      {children}
    </motion.div>
  );
};
//WhileInViewText
export const WhileInViewText = ({children,initial,transition,whileInView,className}) => {
  return (
    <motion.p
    initial={initial}
    whileInView={whileInView}
    transition={transition}
    className={className}
    >
      {children}
    </motion.p>
  );
};
//AnimateText
export const AnimateText = ({children,initial,transition,animate,className}) => {
  return (
    <motion.p
    initial={initial}
    animate={animate}
    transition={transition}
    className={className}
    >
      {children}
    </motion.p>
  );
};
