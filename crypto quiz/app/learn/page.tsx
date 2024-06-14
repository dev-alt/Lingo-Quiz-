'use client';
import React, { useState } from 'react';
import CourseSelector from '@/components/courseSelector';
import { title } from '@/components/primitives';

const CourseSelectPage: React.FC = () => {
	return (
		<main>

			<CourseSelector />
			</main>
	);
};

export default CourseSelectPage;