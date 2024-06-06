'use client'
import Link from 'next/link'
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import CourseCard from "@/components/courseCard";
import { motion, Reorder } from 'framer-motion';
import { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { GET_ENROLLED_COURSES } from '@/queries/graphql';
import { useAuth } from './AuthContext';

interface Course {
  _id: string;
  title: string;
  language: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export default function Home() {
  const { user } = useAuth();
  const [courseOrder, setCourseOrder] = useState<number[]>([]);

  const { loading, error, data, refetch } = useQuery(GET_ENROLLED_COURSES, {
    variables: { userId: user?.userId },
    skip: !user,
    fetchPolicy: 'cache-and-network',
  });


  useEffect(() => {
    if (data && data.courses) {
      setCourseOrder(data.courses.map((course: { id: any; }) => course.id));
    }
  }, [data]);

  const handleReorder = (newOrder: number[]) => {
    setCourseOrder(newOrder);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className="flex flex-col justify-center gap-4 py-8 md:py-10 ">
      {/* Title */}
      <div className="text-center overflow-hidden p-4 md:p-6 shadow-[5px_3px_5px_5px_#14b8a6] mr-4">
        <h1 className={title({ color: "violet" })} >LingoQuiz&nbsp;</h1>
      </div>
      {/* Create New Quiz Link */}
      <div className="inline-block text-center justify-center py-4 gap-8 md:py-10 space-y-8 max-w-4xl md:ml-10">
        <Link href={`/quiz/create/`} className="flex items-center justify-between w-full text-white">
          Create New Quiz
        </Link>
      </div>
      {/* Course Cards */}
      <Reorder.Group
        values={courseOrder}
        onReorder={handleReorder}
        axis="y"
        className="inline-block text-center justify-center py-4 gap-8 md:py-10 space-y-8 max-w-4xl md:ml-10"
      >
        {data.enrolledCourses.map((course: Course) => (
          <Reorder.Item key={course._id} value={course._id} className="w-full">
            <CourseCard
          course={course} 
            />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </section>
  );
}