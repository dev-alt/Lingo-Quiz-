'use client'
import Link from 'next/link'
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import CourseCard from "@/components/quizCard";
import { motion, Reorder } from 'framer-motion'; //
import { useState } from 'react';

export default function Home() {
	const handleResume = (courseId: number) => {
		console.log('Resuming course:', courseId);
	};
	const [courseOrder, setCourseOrder] = useState([1, 2, 3, 4, 5]); 
	
	const handleReorder = (newOrder: number[]) => {
	  setCourseOrder(newOrder);
	};
	return (
		<section className="flex flex-col justify-center gap-4 py-8 md:py-10 ">
			<div className="text-center overflow-hidden p-4 md:p-6 shadow-[5px_3px_5px_5px_#14b8a6] mr-4">
				<h1 className={title({ color: "violet" })} >CryptoQuiz&nbsp;</h1>
			</div>
			<div className="inline-block text-center justify-center py-4 gap-8 md:py-10 space-y-8 max-w-4xl md:ml-10">
				<Link href={`/quiz/create/`} className="flex items-center justify-between w-full text-white">	
					Create New Quiz
				</Link>
				</div>
				<Reorder.Group 
        values={courseOrder}
        onReorder={handleReorder}
        axis="y"
        className="inline-block text-center justify-center py-4 gap-8 md:py-10 space-y-8 max-w-4xl md:ml-10"
      >
        {courseOrder.map(courseId => (
          <Reorder.Item 
            key={courseId} 
            value={courseId} 
            className="w-full"
          >
            <CourseCard
              title="Introduction to Cryptography" 
              courseId={courseId.toString()} 
              progress={30}
              maxProgress={100}
            />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </section>
  );
}