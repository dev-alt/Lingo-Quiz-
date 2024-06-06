'use client';
import React, { useState } from 'react';
import CourseSelector from '@/components/courseSelector';
import { title } from '@/components/primitives';

const CourseSelectPage: React.FC = () => {
	return (
		<main>
		      <div className="text-center overflow-hidden p-4 md:p-6 shadow-[5px_3px_5px_5px_#14b8a6] m-4">
        <h1 className={title({ color: "violet" })} >Learn&nbsp;</h1>
      </div>
			<CourseSelector />
			</main>
	);
};

export default CourseSelectPage;