'use client';

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button, Card, CardBody, Progress, Spacer } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { title, subtitle } from "@/components/primitives";
import { useQuery } from "@apollo/client";
import { GET_QUIZ } from "@/queries/graphql";
import RewardSelection from "@/components/rewardSelection";
import { Question, Quiz } from "/types/quiz.types";
import { AnimatePresence, motion } from "framer-motion";

export default function QuizPage() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const quizId = params.quiz as string; 
  console.log("Quiz ID:", quizId);

  // Fetch quiz data using useQuery hook
  const { loading, error, data } = useQuery(GET_QUIZ, {
    variables: { quizId },
  });

  const quiz: Quiz | undefined = data?.quiz;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [timerRunning, setTimerRunning] = useState(true);
  const startTime = useRef(Date.now());
  const [endTime, setEndTime] = useState<number | null>(null);
  const [timeUp, setTimeUp] = useState(false);

  const handleAnswerSelect = useCallback((optionIndex: number) => {
    setSelectedOption(optionIndex);
  }, []);

  const handleNextQuestion = useCallback(() => {
    if (
      selectedOption ===
      (quiz?.questions[currentQuestion]?.correctAnswer || 0)
    ) {
      setScore(score + 1);
    }

    if (currentQuestion < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setEndTime(Date.now());
      setShowResult(true);
    }
  }, [currentQuestion, quiz?.questions, selectedOption, score]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (timerRunning && timeRemaining > 0) {
      intervalId = setInterval(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setTimeUp(true);
      setShowResult(true);
    }

    return () => clearInterval(intervalId);
  }, [timeRemaining, timerRunning]);

  const totalTimeTaken = endTime
    ? Math.round((endTime - startTime.current) / 1000)
    : 0;

  const quizContainerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const handleRewardSelect = (rewardNumber: number) => {
    console.log("Reward selected:", rewardNumber);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error) return <p>Error loading quiz: {error.message}</p>;
  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return <p>Quiz not found or empty.</p>;
  }

  return (
    <div className="container">
      <AnimatePresence       
      >
        <motion.div
          key={pathname}
          className="w-full max-w-3xl text-center"
          variants={quizContainerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          whileHover={{ scale: 1.05 }}
        >
          <Card className="bg-yellow-400 border-4 border-teal-500 flex flex-col mt-8">
            <CardBody className="text-black flex-grow text-center pb-8">
            <AnimatePresence mode='wait'>
              {showResult ? (
                <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <div className="flex flex-col items-center">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Quiz Finished!</h3>
                  <p className="text-lg">Your final score: {score} out of {quiz?.questions.length}</p>
                  <p className="text-lg">Total time taken: {totalTimeTaken} seconds</p>
                  {/* Show reward selection if score is greater than 80% */}
                  {score / (quiz?.questions.length || 0) > 0.8 && (
                    <RewardSelection onRewardSelect={handleRewardSelect} />
                  )}

                </div>
              </motion.div>
              ) : (
                <motion.div
                    key="quiz"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  >
                    <Progress
                      color="primary"
                      value={((currentQuestion + 1) / (quiz?.questions.length || 0)) * 100}
                      className="mb-4"
                    />
                    <h4>{quiz?.questions[currentQuestion].question}</h4>
                    <ul className="list-none p-0">
                      {quiz?.questions[currentQuestion].options.map((option, index) => (
                        <li key={index}>
                          <Button
                            onClick={() => handleAnswerSelect(index)}
                            className={`text-black my-2 w-full ${selectedOption === index ? 'bg-green-400' : 'bg-blue-200'}`}
                          >
                            {option}
                          </Button>
                        </li>
                      ))}
                    </ul>
                    <Spacer y={1} />
                    <div className="text-right">
                      <Button
                        isDisabled={selectedOption === null}
                        onClick={handleNextQuestion}
                        className="text-white bg-teal-400 disabled:bg-gray-900 disabled:text-white hover:bg-teal-600 text-sm rounded-md md:text-base font-bold py-2 px-4 shadow-lg"
                      >
                        Next
                      </Button>
                    </div>
                    <div className="mt-4 text-center">
                      {timeUp ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          <h4 color="error">Times Up!</h4>
                        </motion.div>
                      ) : (
                        <h4>Time Remaining: {timeRemaining} seconds</h4>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardBody>
            <div className="absolute bottom-0 left-0 mt-4">
              <Button
                onClick={() => router.push('/')}
                className="bg-red-500 hover:bg-blue-900 text-white text-sm rounded-md md:text-base font-bold py-2 px-4 border-2 border-black shadow-lg">
                Exit
              </Button>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}