import React from 'react';
import { motion } from 'framer-motion';
import { Progress } from "@nextui-org/progress";
import Link from 'next/link'
import { Icon } from '@iconify/react';
import { CourseCardProps } from '../types/quizCard.types';


const CourseCard: React.FC<CourseCardProps> = ({
  title,
  courseId,
  progress,
  maxProgress,
  onResume,
}) => {
  // Calculate progress percentage
  const progressPercentage = Math.min((progress / maxProgress) * 100, 100);

  return (

    <motion.div
      className="relative overflow-hidden rounded-lg bg-yellow-400 p-4 md:p-6 shadow-[5px_5px_0px_0px_rgba(109,40,217)]"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {/* Title */}
      <div className="flex items-center justify-between w-full">
        <Link href={`/quiz/${courseId}`} className="flex items-center justify-between w-full">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2" style={{ fontFamily: "fontRoboto" }}>
            <Icon icon="mdi:trophy-outline" className="mr-2 text-black-400" />
            {title}
          </h3>
        </Link>
      </div>

      {/* Progress bar and Button */}
      <div className="flex items-center w-full">
        {/* Progress bar */}
        <div className=" border-4 bg-teal-500 border-solid border-black rounded-l-full overflow-hidden flex-grow mr-2 ">
          <Progress
            color="danger"
            aria-label="Loading..."
            value={progressPercentage}
            className=""
          />
        </div>

        {/* Button */}
        <Link href={`/quiz/${courseId}`} >
          <motion.button
            className="mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm md:text-base border-4 border-black shadow-md"
            whileHover={{ scale: 0.95 }}
            whileTap={{ scale: 0.95 }}
            onClick={onResume}
          >
            Resume
          </motion.button>
        </Link>
      </div>

      {/* Progress text */}
      <p className="text-xs md:text-sm text-black text-start font-bold ">
        {progressPercentage.toFixed(0)}% Completed
      </p>
    </motion.div>

  );
};

export default CourseCard;
