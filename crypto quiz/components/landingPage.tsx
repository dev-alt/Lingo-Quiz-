import React from 'react';
import { Navbar } from '@/components/navbar';
import { title } from './primitives';
import { Footer } from './footer';
import LoginDialog from './loginDialog';
import SignUpDialog from '@/components/signUpDialog';
import { useDisclosure } from "@nextui-org/modal";
import { motion } from "framer-motion";
import Image from 'next/image';
import Testimonials from './Testimonials';

export default function LandingPage() {
    const { isOpen: isSignUpOpen, onOpen: onSignUpOpen, onClose: onSignUpClose } = useDisclosure();
    const { isOpen: isLogInOpen, onOpen: onLogInOpen, onClose: onLogInClose } = useDisclosure();

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    }; const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="relative flex flex-col min-h-screen bg-gray-800 text-white">
            <Navbar isLoggedIn={false} />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                <motion.section
                    initial="hidden"
                    animate="visible"
                    variants={sectionVariants}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col justify-center items-center gap-4 py-8 md:py-10"
                >
                    <div className="text-center overflow-hidden p-4 md:p-6 shadow-[5px_3px_5px_5px_#14b8a6]">
                        <h1 className={title({ color: 'violet' })}>LingoQuiz</h1>
                        <p className="mt-4 text-lg md:text-xl">The ultimate platform to test and improve your language skills through fun and interactive quizzes.</p>
                    </div>
                </motion.section>


                <motion.section
                    initial="hidden"
                    animate="visible"
                    transition={{ staggerChildren: 0.3 }}
                    className="py-8 md:py-10 "
                >
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold">How It Works</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            variants={cardVariants}
                            className="flex flex-col items-center bg-gray-700 p-6 rounded-lg shadow-[5px_3px_0px_0px_#14b8a6]"
                        >
                            <Image src="/images/learn.jpg" alt="Community Challenge" width={200} height={200} className="rounded-lg mb-4" />
                            <h3 className="text-xl font-semibold">Interactive Quizzes</h3>
                            <p className="mt-2 text-center">Journey through the exciting world of language learning. Earn experience points (XP) to unlock new levels and collect badges.</p>
                        </motion.div>
                        <motion.div
                            variants={cardVariants}
                            className="flex flex-col items-center bg-gray-700 p-6 rounded-lg shadow-[5px_3px_0px_0px_#14b8a6]"
                        >
                            <Image src="/images/practice.jpg" alt="Community Challenge" width={200} height={200} className="rounded-lg mb-4" />
                            <h3 className="text-xl font-semibold">Personalized Learning</h3>
                            <p className="mt-2 text-center">Improve your language skills by participating in community challenges and receiving live help from language mentors.</p>
                        </motion.div>
                        <motion.div
                            variants={cardVariants}
                            className="flex flex-col items-center bg-gray-700 p-6 rounded-lg shadow-[5px_3px_0px_0px_#14b8a6]"
                        >
                            <Image src="/images/build.jpg" alt="Community Challenge" width={200} height={200} className="rounded-lg mb-4" />
                            <h3 className="text-xl font-semibold">Community Challenges</h3>
                            <p className="mt-2 text-center">Apply your newly learned skills to create engaging content and interactive language activities.</p>
                        </motion.div>
                    </div>
                </motion.section>

                <motion.section
                    initial="hidden"
                    animate="visible"
                    variants={sectionVariants}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="py-8 md:py-10 bg-gray-900 text-center"
                >
                    <h2 className="text-2xl md:text-3xl font-bold">Get Started Today</h2>
                    <p className="mt-4 mb-8 text-lg">Join us now and take your language skills to the next level!</p>
                    <div className="flex justify-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-teal-500 hover:bg-teal-700 text-white text-sm md:text-base 
                            font-bold py-2 px-4 rounded-md shadow-lg transition-colors duration-300"
                            onClick={onSignUpOpen}
                        >
                            Sign Up
                        </motion.button>
                        <SignUpDialog isOpen={isSignUpOpen} onClose={onSignUpClose} />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-blue-500 hover:bg-blue-700 text-white text-sm md:text-base font-bold py-2 px-4 rounded-md shadow-lg transition-colors duration-300"
                            onClick={onLogInOpen}
                        >
                            Log In
                        </motion.button>
                        <LoginDialog isOpen={isLogInOpen} onClose={onLogInClose} />
                    </div>
                </motion.section>

                    <Testimonials />
       

                <motion.section
                    initial="hidden"
                    animate="visible"
                    variants={sectionVariants}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="py-8 md:py-10"
                >
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold">FAQ</h2>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold">How do I sign up?</h3>
                            <p className="mt-2">Click the Sign Up button and fill in your details to create an account.</p>
                        </div>
                        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold">Is LingoQuiz free?</h3>
                            <p className="mt-2">Yes, LingoQuiz is free to use.</p>
                        </div>
                    </div>
                </motion.section>
            </main>
            <Footer />
        </div>
    );
}