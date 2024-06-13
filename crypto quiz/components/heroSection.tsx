"use client";

import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
      <div className="container mx-auto px-4 text-center md:text-left ml-2">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-4 mt-4 "
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Master Any Language with LingoQuiz
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Interactive courses, engaging lessons, and real-world practice to achieve your language goals.
        </motion.p>
      </div>

  );
};

export default HeroSection;