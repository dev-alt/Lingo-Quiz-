'use client';
import React, { useState, useEffect } from 'react';
import CourseCard from './courseCard';
import { gql, useQuery } from '@apollo/client';
import { Icon } from '@iconify/react';
import { Spinner } from '@nextui-org/react';
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
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Beginner');
  const [showSpinner, setShowSpinner] = useState(true);

  const { loading, error, data } = useQuery(GET_COURSES_DATA, {
    variables: { language: selectedLanguage, difficulty: selectedDifficulty },
  });

  const filteredCourses = data?.courses || [];
  const availableLanguages = data?.languages || [];
  const availableDifficulties = data?.difficulties || [];
  const userProgress = data?.userProgress || [];

  const userHasProgress = (courseId: string) => {
    return userProgress.some((progress: { courseId: string; progress: number; }) => progress.courseId === courseId && progress.progress > 0);
  };

  const handleLanguageClick = (language: string) => {
    setSelectedLanguage(language);
    setSelectedDifficulty("");
  };

  const handleDifficultyClick = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
  };
  const handleShowAllCourses = () => {
    setSelectedLanguage("");
    setSelectedDifficulty("");
  };


  // Timeout for loading spinner
  setTimeout(() => {
    setShowSpinner(false);
  }, 1000);

  console.log(data)
  return (
    <div className="bg-gray-900 p-6 rounded-md shadow-lg shadow-teal-500 border-2 border-teal-500">
      <h2 className="text-3xl font-semibold text-white mb-6">
        <Icon icon="mdi:book-open-variant" className="mr-2" /> Choose Your Course
      </h2>

      <div className="flex gap-2 mb-4">
        {["English", "Spanish", "French", "German"].map((language) => (
          <button
            key={language}
            className={`px-4 py-2 rounded-md text-white transition duration-300 ${selectedLanguage === language ? 'bg-yellow-600' : 'bg-gray-700 hover:bg-gray-600'}`}
            onClick={() => handleLanguageClick(language)}
          >
            {language}
          </button>

        ))}
        <button color="secondary" onClick={handleShowAllCourses} className="px-4 py-2 rounded-md text-white transition duration-300 bg-gray-700 hover:bg-gray-600">
          Show All Courses
        </button>
      </div>

      {/* Difficulty Filter (only when a language is selected) */}
      {selectedLanguage && (
        <div className="flex flex-wrap gap-2 mb-4">
          {availableDifficulties.map((difficulty: string) => (
            <button
              key={difficulty}
              className={`px-4 py-2 rounded-md text-white transition duration-300 ${selectedDifficulty === difficulty ? 'bg-yellow-600' : 'bg-gray-700 hover:bg-gray-600'}`}
              onClick={() => handleDifficultyClick(difficulty)}
            >
              {difficulty}
            </button>
          ))}
        </div>
      )}

      {/* Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course: Course) => (
            <div
              key={course._id}
              className="bg-gray-800 p-4 rounded-md text-white shadow hover:shadow-lg transition duration-300"
            >
              <CourseCard course={course} />
            </div>
          ))
        ) : (
          <p>No courses found for this selection.</p>
        )}
      </div>
    </div>
  );
};

export default CourseSelector;