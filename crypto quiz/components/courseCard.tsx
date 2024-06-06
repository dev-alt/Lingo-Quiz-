import React from "react";
import { motion } from "framer-motion";
import { Button, Card, CardBody, Image, } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useDisclosure } from "@nextui-org/react";
import CourseDetailsModal from "./courseDetailsModal";
import { Course } from "@/types/";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const languageClasses: Record<string, string> = {
    English: "bg-blue-100 border-blue-500 hover:bg-blue-200",
    Japanese: "bg-red-100 border-red-500 hover:bg-red-200",
    German: "bg-yellow-100 border-yellow-500 hover:bg-yellow-200",
    Spanish: "bg-green-100 border-green-500 hover:bg-green-200",
    French: "bg-purple-100 border-purple-500 hover:bg-purple-200",
  };

  // Define the languageIcons map with its corresponding type
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
      <Card className={`cursor-pointer ${languageClasses[course.language] || 'bg-gray-100 border-gray-500'}`}
      >
        <CardBody className="flex flex-col relative p-2"> 
        <div className="pl-8 flex items-center mb-2">  
        <Icon icon={languageIcons[course.language] || 'mdi:translate'} className="text-4xl text-yellow-600 mr-2" /> 
            <h4 className="pl-2 font-semibold text-start">{course.title}</h4> 
          </div>
          <p className="pl-8 text-gray-600 text-start mt-2"><span className="font-bold" >Language:</span> {course.language}</p>
          <p className="pl-8 text-gray-600 text-start"><span className="font-bold" >Difficulty:</span>  {course.difficulty}</p>
          <p className="pl-8 mb-4 text-gray-600 text-start"><span className="font-bold" >Duration:</span>  {course.duration}hr</p>
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