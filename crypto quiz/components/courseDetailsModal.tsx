'use client';

import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Course } from '@/types';

interface CourseDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
}

const CourseDetailsModal: React.FC<CourseDetailsModalProps> = ({ isOpen, onClose, course }) => {
  console.log(course);

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
        <Button className="bg-blue-500 text-white hover:bg-blue-600" onPress={onClose}>
            Start / Resume
          </Button>
          <Button className="bg-red-500 text-white hover:bg-red-600" variant="light" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default CourseDetailsModal;
