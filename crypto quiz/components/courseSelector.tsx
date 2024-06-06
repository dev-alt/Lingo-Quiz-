'use client';
import React, { useState, useEffect } from 'react';
import CourseCard from './courseCard';
import { gql, useQuery } from '@apollo/client';
import { Icon } from '@iconify/react';
import { Divider, Spinner } from '@nextui-org/react';
import { GET_COURSES_DATA } from '@/queries/graphql';


interface Course {
  _id: string;
  title: string;
  language: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}
interface UserProgress {
  courseId: string;
  progress: number;
}


const CourseSelector: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  const { loading, error, data, refetch } = useQuery(GET_COURSES_DATA, {
    variables: { language: selectedLanguage, difficulty: selectedDifficulty },
    fetchPolicy: 'cache-and-network',
  });

  const filteredCourses = data?.courses || [];
  const availableLanguages = data?.languages || [];
  const availableDifficulties = ['Beginner', 'Intermediate', 'Advanced'];
  const userProgress = data?.userProgress || [];

  const userHasProgress = (courseId: string) => {
    return userProgress.some((progress: { courseId: string; progress: number; }) => progress.courseId === courseId && progress.progress > 0);
  };

  const handleLanguageClick = (language: string) => {
    setSelectedLanguage(language === selectedLanguage ? '' : language);
  };

  const handleDifficultyClick = (difficulty: string) => {
    setSelectedDifficulty(difficulty === selectedDifficulty ? '' : difficulty);
  };

  const handleShowAllCourses = () => {
    setSelectedLanguage("");
    setSelectedDifficulty("");
  };

  return (
    <div className="bg-gray-900 p-6 rounded-md shadow-lg shadow-teal-500 border-2 border-teal-500">
      <div className="bg-gray-800 p-4 rounded-md shadow-md flex flex-col items-center">
        <div className="flex gap-2 mb-4 w-full justify-center">
          {['', ...availableLanguages].map((language) => (
            <button
              key={language}
              className={`px-4 py-2 rounded-md text-white transition duration-300 ${selectedLanguage === language ? 'bg-yellow-600' : 'bg-gray-700 hover:bg-gray-600'}`}
              onClick={() => handleLanguageClick(language)}
            >
              {language || "All"}
            </button>
          ))}
        </div>

        {/* Difficulties */}
        <div className="flex gap-2 w-full justify-center">
          {['', ...availableDifficulties].map((difficulty: string) => (
            <button
              key={difficulty}
              className={`px-4 py-2 rounded-md text-white transition duration-300 ${selectedDifficulty === difficulty ? 'bg-yellow-600' : 'bg-gray-700 hover:bg-gray-600'}`}
              onClick={() => handleDifficultyClick(difficulty)}
            >
              {difficulty || "All"}
            </button>
          ))}
        </div>
      </div>
      <Divider className="my-4" />
      <div>
        {/* Course Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course: Course) => (
              <div
                key={course._id}
                className="p-2 rounded-md text-white shadow hover:shadow-lg transition duration-300"
              >
                <CourseCard course={course} />
              </div>
            ))
          ) : (
            <p>No courses found for this selection.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseSelector;