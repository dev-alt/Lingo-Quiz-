import React from 'react';
import { motion } from 'framer-motion';
import { Progress } from "@nextui-org/progress";
import Link from 'next/link'
import { Icon } from '@iconify/react';

interface CourseCardProps {
    title: string;
    courseId: string;
    progress: number;
    maxProgress: number;
    onResume: () => void;
}

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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="course-card relative overflow-hidden rounded-lg shadow-lg border-4 border-teal-500 bg-yellow-400 p-4 md:p-6"
              style={{ backgroundColor: "#FFD600", width: 'calc(80% * 2.5)' }}
            >
              <motion.div
                className="bg-opacity-60 flex flex-col items-start justify-between h-full" // Changed to flex-col
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {/* Title */}
                <div className="flex items-center justify-between w-full">
                <Link href={`/quiz/${courseId}`} className="flex items-center justify-between w-full"> 
                    <h3 className="course-title text-lg md:text-xl font-semibold text-gray-800 mb-2" style={{ fontFamily: "fontRoboto" }}>
                      <Icon icon="mdi:trophy-outline" className="mr-2 text-black-400" />
                      {title}
                    </h3>
                {/* Button */}
                  <motion.button
                    className="course-button bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm md:text-base border-4 border-black shadow-md"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onResume}
                  >
                    Resume
                  </motion.button>
                  </Link>
                </div>

                {/* Progress bar */}
                <div className="border-4 bg-teal-500 border-solid border-black rounded-l-full overflow-hidden w-full">
                  <Progress
                    color="danger"
                    aria-label="Loading..."
                    value={progressPercentage}
                    className="h-3 w-full"
                  />
                </div>
                
                {/* Progress text */}
                <p className="text-xs md:text-sm text-black font-bold mt-2">
                  {progressPercentage.toFixed(0)}% Completed
                </p>
        
              </motion.div>
            </motion.div>
          );
        };
        
        export default CourseCard;