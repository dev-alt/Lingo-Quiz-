'use client'
import CourseCard from "@/components/courseCard";
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { GET_ENROLLED_COURSES } from '@/queries/graphql';
import { useAuth } from '@/context/AuthContext';
import HeroSection from '@/components/heroSection';
import NoCourseEnrolled from '@/components/noCourseEnrolled';
import CTACard from '@/components/ctaCard';
import { Course } from '@/types';
import LeaderboardCTA from '@/components/leaderboardCTA';

export default function Home() {
  const { user } = useAuth();
  const [courseOrder, setCourseOrder] = useState<number[]>([]);

  const { loading, error, data, refetch } = useQuery(GET_ENROLLED_COURSES, {
    variables: { userId: user?.userId },
    skip: !user,
    fetchPolicy: 'cache-and-network',
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4,
      },
    },
  };

  useEffect(() => {
    if (data && data.courses) {
      setCourseOrder(data.courses.map((course: { id: any; }) => course.id));
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className="border-1 border-teal-500 bg-gradient-to-br from-blue-900 to-purple-900 text-white py-8 md:py-12 mt-4 h-screen mb-2">
      <HeroSection />
      <CTACard />

      {/* Enrolled Courses or "No Courses" Message */}
      <div className="max-w-6xl mx-auto">
        <AnimatePresence>
          {data.enrolledCourses.length === 0 ? (
            <motion.div
              key="no-courses-message"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
              className="p-2"
            >
              <NoCourseEnrolled />
            </motion.div>
          ) : (
            <motion.div
             key="course-container"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-8"
            >
              {data.enrolledCourses.map((course: Course) => (
                <motion.div key={course._id} variants={containerVariants} className='p-2'>
                  <CourseCard course={course}/>                
                  </motion.div>
              ))}
            </motion.div>
          )}
          <LeaderboardCTA />
        </AnimatePresence>
      </div>

    </section>
  );
}