import React from "react";
import { motion } from "framer-motion";
import { Button, Card, CardBody, Image, } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { Course } from "@/types";
import { useDisclosure } from "@nextui-org/react";
import CourseDetailsModal from "./courseDetailsModal"; //Import the new modal component

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className="cursor-pointer"
      onClick={onOpen}
    >
      <Card className=' border-4 border-teal-500 bg-teal-100'>
        <CardBody className="flex flex-col items-center relative p-0"> 
          {/* You can add an Image component here if you have course images */}
          <Icon icon="mdi:book-open-variant" className="text-4xl text-gray-800 mb-2" />
          <h4 className="text-center">{course.title}</h4>
          <p className="text-gray-600 text-center mt-2">Language: {course.language}</p>
          <p className="text-gray-600 text-center">Difficulty: {course.difficulty}</p>
          <p className="text-gray-600 text-center">Duration: {course.duration}</p>
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