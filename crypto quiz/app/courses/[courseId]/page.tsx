"use client";
import { title } from "@/components/primitives";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import { Course, Quiz } from "@/types";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { GET_COURSE } from "@/queries/graphql";
import { Card, CardBody, Spinner } from "@nextui-org/react";
import { motion } from "framer-motion";

const CoursePage: React.FC = () => {
    const params = useParams();
    const courseId = params.courseId as string;

    const { loading, error, data } = useQuery(GET_COURSE, {
        variables: { id: courseId },
    });

    console.log("Course Data", data)

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
            </div>
            <div className="flex flex-col items-center">
                <h2 className="text-2xl font-semibold mb-4 text-center">Quizzes</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.getCourse.quizzes.map((quiz: Quiz) => (
                        <motion.div
                            key={quiz._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="w-full"
                        >
                            <Link href={`/quiz/${courseId}/${quiz._id}`}>
                                <Card className="hover:shadow-lg cursor-pointer">
                                    <CardBody className="flex flex-col items-center">
                                        <h3 className="text-lg font-semibold">{quiz.title}</h3>
                                        {/* Add more quiz details if you want */}
                                    </CardBody>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}


export default CoursePage;
