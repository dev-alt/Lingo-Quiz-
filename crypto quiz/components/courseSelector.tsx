'use client';
import React, { useState, useEffect } from 'react';

interface Course {
  _id: string;
  title: string;
  language: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const CourseSelector: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const response = await fetch('http://localhost:7100/api/quizzes/');
      if (response.ok) {
        const data: Course[] = await response.json();
        setCourses(data);
        setFilteredCourses(data);
      } else {
        console.error('Failed to fetch quizzes');
      }
    };
    fetchQuizzes();
  }, []);

  const handleLanguageClick = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleDifficultyClick = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
  };

  useEffect(() => {
    const newFilteredCourses = courses.filter((course) => {
      const matchesLanguage = !selectedLanguage || course.language === selectedLanguage;
      const matchesDifficulty = !selectedDifficulty || course.difficulty === selectedDifficulty;
      return matchesLanguage && matchesDifficulty;
    });
    setFilteredCourses(newFilteredCourses);
  }, [selectedLanguage, selectedDifficulty, courses]);

  const uniqueLanguages = Array.from(new Set(courses.map(course => course.language)));
  const uniqueDifficulties = Array.from(new Set(courses.map(course => course.difficulty)));

  return (
    <div className="bg-gray-900 p-6 rounded-md shadow-lg shadow-teal-500 border-2 border-teal-500">
      <h2 className="text-3xl font-semibold text-white mb-6">Courses</h2>
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {uniqueLanguages.map((language) => (
            <button
              key={language}
              className={`px-4 py-2 rounded-md text-white transition duration-300  ${
                selectedLanguage === language ? 'bg-yellow-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
              onClick={() => handleLanguageClick(language)}
            >
              {language}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {uniqueDifficulties.map((difficulty) => (
            <button
              key={difficulty}
              className={`px-4 py-2 rounded-md text-white transition duration-300 ${
                selectedDifficulty === difficulty ? 'bg-yellow-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
              onClick={() => handleDifficultyClick(difficulty)}
            >
              {difficulty}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map((course) => (
          <div key={course._id} className="bg-gray-800 p-4 rounded-md text-white shadow hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-bold">{course.title}</h3>
            <p className="mt-2">Language: {course.language}</p>
            <p>Difficulty: {course.difficulty}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseSelector;
