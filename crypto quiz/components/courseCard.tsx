import React from 'react';
import { motion } from 'framer-motion';

interface CourseCardProps {
  title: string;
  imageUrl: string;
  progress: number;
  maxProgress: number;
  onResume: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  imageUrl,
  progress,
  maxProgress,
  onResume,
}) => {
  const progressPercentage = (progress / maxProgress) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="course-card relative overflow-hidden rounded-lg shadow-lg border-2 border-teal-500"
      style={{ backgroundColor: "#FFD600", width: 'calc(80% * 2)' }} // Double the width
    >
      <motion.div
        className="container p-4 md:p-6 bg-black bg-opacity-60 flex items-center justify-between"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <div className="title-progress">
          <h3 className="course-title text-lg md:text-xl font-semibold text-white mb-2">
            {title}
          </h3>
          <div className="progress flex items-center">
            <motion.div
              className="relative w-full h-3 bg-gray-600 rounded-full mr-2"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            ></motion.div>
            <p className="text-xs md:text-sm text-white">{progressPercentage.toFixed(0)}% Completed</p>
          </div>
        </div>
        <motion.button
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-md text-sm md:text-base"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onResume}
        >
          Resume
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default CourseCard;
