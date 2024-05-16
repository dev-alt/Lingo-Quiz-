'use client';
import React, { useState } from 'react';
import CourseSelector from '@/components/courseSelector';

const CourseSelectPage: React.FC = () => {




	return (
		<div>
			<h1>Course Select Page</h1>
			<p>Please select a course:</p>
			<CourseSelector />

		</div>
	);
};

export default CourseSelectPage;