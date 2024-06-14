import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Button, Card, CardBody, Image, Progress, } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useDisclosure } from "@nextui-org/react";
import CourseDetailsModal from "@/components/modals/courseDetailsModal";
import { Course } from "@/types/";
interface CourseCardProps {
  course: Course;
}
const getDifficultyTagStyle = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "bg-green-200 text-green-800";
    case "Intermediate":
      return "bg-yellow-200 text-yellow-800";
    case "Advanced":
      return "bg-red-200 text-red-800";
    default:
      return "";
  }
};
const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const progressControls = useAnimation();
  const totalQuizzes = course.quizzes?.length || 0;
  const completedQuizzesCount = course.quizzes?.filter((quiz) => quiz.isCompleted).length || 0;
  const progress = Math.round((completedQuizzesCount / totalQuizzes) * 100);

  useEffect(() => {
    if (completedQuizzesCount > 0 && totalQuizzes > 0) {
      progressControls.start({
        width: `${progress}%`,
        transition: { duration: 0.8, ease: "easeOut" },
      });
    }
  }, [progress, progressControls, completedQuizzesCount, totalQuizzes]);


  const languageClasses: Record<string, string> = {
    English: "bg-blue-100 border-blue-500 hover:bg-blue-200",
    Japanese: "bg-red-100 border-red-500 hover:bg-red-200",
    German: "bg-yellow-100 border-yellow-500 hover:bg-yellow-200",
    Spanish: "bg-green-100 border-green-500 hover:bg-green-200",
    French: "bg-purple-100 border-purple-500 hover:bg-purple-200",
  };

  const languageIcons: Record<string, string> = {
    English: "twemoji:flag-for-flag-united-kingdom",
    Japanese: "twemoji:flag-for-flag-japan",
    German: "twemoji:flag-for-flag-germany",
    Spanish: "twemoji:flag-for-flag-spain",
    French: "twemoji:flag-for-flag-france",
  };
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className="cursor-pointer"
      onClick={onOpen}

    >
      <Card
        className={`cursor-pointer relative ${languageClasses[course.language] || 'bg-gray-100 border-gray-500'} shadow-md hover:shadow-lg transition duration-300 ease-in-out `}

      >
        <CardBody className="flex flex-col relative p-4">
          <div className="flex items-center mb-2">
            <Icon icon={languageIcons[course.language] || 'mdi:translate'} className="text-5xl mr-3" />
            <h4 className="text-xl font-semibold text-start">
              {course.title}
              {course.difficulty && (
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getDifficultyTagStyle(course.difficulty)}`}>
                  {course.difficulty}
                </span>
              )}
            </h4>
          </div>

          {/* Display Progress */}
          {totalQuizzes > 0 && (
            <div className="w-full mt-4">
              <div className="relative">
                <Progress
                  aria-label="Course Progress"
                  value={progress}
                  color="success"
                  size="lg"
                  className="rounded-full"
                  classNames={{
                    indicator: "bg-gradient-to-r from-teal-400 to-teal-600",
                    track: "bg-white dark:bg-gray-800 dark:border-gray-800 border-gray-200 dark:border-gray-800",
                  }}
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm text-black font-bold">
                  {completedQuizzesCount} / {totalQuizzes}
                </div>
              </div>
            </div>
          )}
        </CardBody>
      </Card>


      {/* Course Details Modal */}
      <CourseDetailsModal
        isOpen={isOpen}
        onClose={onClose}
        course={course}
      />
    </motion.div>
  );
};

export default CourseCard;