import React from "react";
import { motion } from "framer-motion";
import { Button, Card, CardBody, Image, } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { Course } from "@/types";
import { useDisclosure } from "@nextui-org/react";
import CourseDetailsModal from "./courseDetailsModal";

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
        <CardBody className="flex flex-col relative p-0"> 
        <div className="pl-8 flex items-center mb-2">  
            <Icon icon="mdi:book-open-variant" className="text-4xl text-yellow-600 mr-2" /> 
            <h4 className="text-center font-semibold">{course.title}</h4> 
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