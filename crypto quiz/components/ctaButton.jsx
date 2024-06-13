"use client";

import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

const CTAButton = () => {
  return (
    <motion.button
      className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out flex items-center space-x-2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span>Explore Courses</span>
      <Icon icon="bi:arrow-right" className="w-6 h-6" /> 
    </motion.button>
  );
};

export default CTAButton;