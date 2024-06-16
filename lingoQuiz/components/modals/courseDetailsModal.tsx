'use client';

import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Spinner } from "@nextui-org/react";
import { Course } from '@/types';
import { useAuth } from "@/context/AuthContext";
import { ENROLL_IN_COURSE, GET_ENROLLED_COURSES, UNENROLL_FROM_COURSE } from '@/queries/graphql';
import { useMutation, useQuery } from '@apollo/client';
import { toast } from "react-toastify";
import { useToast } from "@/context/toastContext";
import { useRouter } from 'next/navigation';

interface CourseDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
}

const CourseDetailsModal: React.FC<CourseDetailsModalProps> = ({ isOpen, onClose, course }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [isEnrolled, setIsEnrolled] = useState<boolean>(false);
  const [enrollmentError, setEnrollmentError] = useState<string | null>(null);

  const { loading: enrolledCoursesLoading, error } = useQuery(GET_ENROLLED_COURSES, {
    variables: { userId: user?.userId },
    skip: !user,
    onCompleted: (data) => {
      setIsEnrolled(data.enrolledCourses.some((enrolledCourse: { _id: string; }) => enrolledCourse._id === course._id));
    },
    onError: (error) => {
      console.error("Error fetching enrolled courses:", error);
    }
  });
  const { showToast } = useToast();
  const [enrollInCourse, { loading: enrolling }] = useMutation(ENROLL_IN_COURSE);

  const handleEnroll = async () => {
    setEnrollmentError(null);
    if (!user) {
      return;
    }
    try {
      const { data } = await enrollInCourse({
        variables: { userId: user.userId, courseId: course._id },
      });

      if (data.enrollInCourse.success) {
        setIsEnrolled(true);
        showToast("Successfully enrolled in the course!", "success");
        onClose();
      } else {
        toast.error(data.enrollInCourse.message, {
          position: "top-center"
        });
      }
    } catch (error) {
      toast.error("An error occurred during enrollment.", {
        position: "top-center"
      });
      console.error("Error enrolling in course:", error);
    }
  };
  const [unenrollFromCourse, { loading: unenrolling }] = useMutation(UNENROLL_FROM_COURSE);
  const handleUnenroll = async () => {
    if (!user) {
      return;
    }

    try {
      const { data } = await unenrollFromCourse({
        variables: { userId: user.userId, courseId: course._id },
      });

      if (data.unenrollFromCourse.success) {
        setIsEnrolled(false);
        toast.success(data.unenrollFromCourse.message, { position: "top-center" });
        onClose();
      } else {
        toast.error(data.unenrollFromCourse.message, { position: "top-center" });
      }
    } catch (error) {
      toast.error("An error occurred while unenrolling.", { position: "top-center" });
      console.error("Error unenrolling from course:", error);
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
          {(enrolledCoursesLoading || enrolling || unenrolling) && (
            <Spinner />
          )}
          {!enrolledCoursesLoading && !enrolling && !unenrolling && (
            <>
              {isEnrolled ? (
                <Button className="bg-blue-500 text-white hover:bg-blue-600"
                  onPress={() => {
                    onClose(); 
                    router.push(`/courses/${course._id}`); 
                  }}
                >
                  Resume
                </Button>
              ) : (
                <Button
                  className="bg-green-500 text-white hover:bg-green-600"
                  onPress={handleEnroll}
                >
                  Enroll
                </Button>
              )}

              {/* Unenroll button (conditionally rendered) */}
              {isEnrolled && (
                <Button
                  className="bg-red-500 text-white hover:bg-red-600"
                  onPress={handleUnenroll}
                >
                  Unenroll
                </Button>
              )}

              <Button
                className="bg-red-500 text-white hover:bg-red-600"
                variant="light"
                onPress={onClose}
              >
                Close
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CourseDetailsModal;