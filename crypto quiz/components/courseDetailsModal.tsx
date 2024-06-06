'use client';

import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Spinner } from "@nextui-org/react";
import { Course } from '@/types';
import { useAuth } from '@/app/AuthContext';
import { ENROLL_IN_COURSE, GET_ENROLLED_COURSES } from '@/queries/graphql';
import { useMutation, useQuery } from '@apollo/client';

interface CourseDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
}

const CourseDetailsModal: React.FC<CourseDetailsModalProps> = ({ isOpen, onClose, course }) => {
  const { user } = useAuth();

  const { data: enrolledCoursesData, loading: enrolledCoursesLoading, refetch } = useQuery(GET_ENROLLED_COURSES, {
    variables: { userId: user?.userId },
    skip: !user,
    fetchPolicy: 'cache-and-network',
  });

  const [enrollInCourse, { loading: enrolling }] = useMutation(ENROLL_IN_COURSE);
  const isEnrolled = enrolledCoursesData?.enrolledCourses?.some((enrolledCourse: { _id: string }) => enrolledCourse._id === course._id);
  
  const handleEnroll = async () => {
    if (!user) {
      return;
    }

    try {
      const { data } = await enrollInCourse({
        variables: { userId: user.userId, courseId: course._id },
      });

      if (data.enrollInCourse.success) {
        onClose(); 
      } else {
        // Handle enrollment error
      }
    } catch (error) {
      // Handle mutation error
    }
  };
  
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="xl">
      <ModalContent className='shadow-[5px_5px_0px_2px_rgba(109,40,217)]'>
        <ModalHeader className="flex flex-col gap-1 text-center">
          <h3>
            {course.title}
          </h3>
          <p color="success">
            {course.language} - {course.difficulty}
          </p>

        </ModalHeader>
        <ModalBody className="space-y-4">
            <p>{course.description}</p>
          </ModalBody>
          <ModalFooter className="flex justify-end space-x-2">
          {enrolledCoursesLoading ? (
            <Spinner /> // Loading indicator while fetching enrolled courses
          ) : isEnrolled ? (
            <Button className="bg-blue-500 text-white hover:bg-blue-600" onPress={onClose}>
              Resume
            </Button>
          ) : (
            <Button
              isLoading={enrolling} // Show loading state while enrolling
              className="bg-green-500 text-white hover:bg-green-600"
              onPress={handleEnroll}
            >
              Enroll
            </Button>
          )}

          <Button className="bg-red-500 text-white hover:bg-red-600" variant="light" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CourseDetailsModal;