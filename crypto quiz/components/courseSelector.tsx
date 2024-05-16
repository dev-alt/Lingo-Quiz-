'use client';
import React, { useState } from 'react';

interface Course {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced'; // Strict typing for levels
}

const courses: Course[] = [
  { name: 'Beginner', level: 'Beginner' },
  { name: 'Intermediate', level: 'Intermediate' },
  { name: 'Advanced', level: 'Advanced' },
  { name: 'Chainlink', level: 'Intermediate' },
  { name: 'MultiversX', level: 'Advanced' },
  // ... add more courses
];

const CourseSelector: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<Course['level'] | null>(null);

  const handleLevelClick = (level: Course['level']) => {
    setSelectedLevel(level);
    // filter the courses based on the selected level
     const filteredCourses = courses.filter((course) => course.level === level);
    console.log(filteredCourses);
    


  };

  return (
    <div className="bg-gray-900 p-4 rounded-md">
      <h2 className="text-2xl font-semibold text-white mb-4">Courses</h2>

      <div className="flex flex-wrap gap-2">
        {courses.map((course) => (
          <button
            key={course.name}
            className={`px-4 py-2 rounded-md text-white transition duration-300 ${
              selectedLevel === course.level
                ? 'bg-blue-500'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
            onClick={() => handleLevelClick(course.level)}
          >
            {course.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CourseSelector;