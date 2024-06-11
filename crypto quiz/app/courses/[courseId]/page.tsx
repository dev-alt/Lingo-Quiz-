"use client";
import { title } from "@/components/primitives";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import { Course, Quiz } from "@/types";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { GET_COURSE } from "@/queries/graphql";
import { Accordion, AccordionItem, Card, CardBody, Divider, Spinner } from "@nextui-org/react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useEffect } from "react";


const CoursePage: React.FC = () => {
    const params = useParams();
    const courseId = params.courseId as string;

    useEffect(() => {
        refetch();
    }, []);

    const { loading, error, data, refetch } = useQuery(GET_COURSE, {
        variables: { id: courseId },
    });


    const languageFlags: { [key: string]: string } = {
        English: 'twemoji:flag-for-flag-united-kingdom',
        Japanese: 'twemoji:flag-for-flag-japan',
        German: 'twemoji:flag-for-flag-germany',
        Spanish: 'twemoji:flag-for-flag-spain',
        French: 'twemoji:flag-for-flag-france',
        Italian: 'twemoji:flag-for-flag-italy',
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <Spinner />
        </div>
    );
    if (error) return <p>Error loading course: {error.message}</p>;



    return (
        <section className="flex flex-col justify-center gap-4 py-8 md:py-10">
            <div className="text-center overflow-hidden p-4 md:p-6 shadow-[5px_3px_5px_5px_#14b8a6] mr-4">
                <h1 className={title({ color: "violet" })}>
                    {data.getCourse.title}&nbsp;
                </h1>
                <p className="text-lg text-white">{data.getCourse.description}</p>
            </div>
            <div className="flex flex-col items-center mt-4">
                <h2 className="text-2xl font-semibold mb-4 text-center text-white">Quizzes</h2>
                <Divider  className="my-4"/>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.getCourse.quizzes.map((quiz: Quiz) => (
                        <motion.div
                            key={quiz._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="w-full"
                        >
                            {/* Conditionally render Link only if quiz is not completed */}
                            {!quiz.isCompleted ? (
                                <Link href={`/quiz/${quiz._id}`}>
                                    <Card className="hover:shadow-lg cursor-pointer rounded-md bg-yellow-100">
                                        <CardBody className="flex flex-col items-center">
                                            <Icon icon={languageFlags[quiz.language] || "mdi:translate"} className="text-6xl" />
                                            <h3 className="text-lg font-semibold mt-4 text-center">{quiz.title}</h3>
                                            <p className="text-gray-600 text-center mt-2">Level: {quiz.difficulty}</p>
                                        </CardBody>
                                    </Card>
                                </Link>
                            ) : (
                                <Card className="cursor-not-allowed rounded-md bg-gray-300">
                                    <CardBody className="flex flex-col items-center">
                                        <Icon icon={languageFlags[quiz.language] || "mdi:translate"} className="text-6xl" />
                                        <h3 className="text-lg font-semibold mt-4 text-center">{quiz.title}</h3>
                                        <p className="text-gray-600 text-center mt-2">Level: {quiz.difficulty}</p>
                                    </CardBody>
                                </Card>
                            )}
                        </motion.div>
                    ))}
                </div>
                <div className="mt-8">
  <Accordion className="mt-8 max-w-md w-full">
    <AccordionItem
      title={
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">
            Course Syllabus
          </h3>
          <span className="text-gray-300">
            {/* Add arrow icon or any other indicator */}
          </span>
        </div>
      }
    >
      <div className="text-gray-300 text-sm py-4 px-6 bg-gray-800 rounded-lg">
        {/* Include syllabus content or link here */}
        <p>Click to view the course syllabus.</p>
      </div>
    </AccordionItem>
    <AccordionItem
      title={
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">
            Course Reviews and Ratings
          </h3>
          <span className="text-gray-300">
            {/* Add arrow icon or any other indicator */}
          </span>
        </div>
      }
    >
      <div className="text-gray-300 text-sm py-4 px-6 bg-gray-800 rounded-lg">
        {/* Include reviews and ratings content here */}
        <p>Course reviews and ratings will be displayed here.</p>
      </div>
    </AccordionItem>
  </Accordion>
</div>
            </div>

        </section>
    );
}

export default CoursePage;