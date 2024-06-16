'use client';

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button, Card, CardBody, Progress, Spacer } from "@nextui-org/react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_QUIZ } from "@/queries/graphql";
import { AnimatePresence, motion } from "framer-motion";
import {
  Quiz,
  QuizResult as QuizResultType,
  Response as QuizResponse,
} from "@/types/";
import QuizHeader from "@/components/quizHeader";
import QuestionDisplay from "@/components/questionDisplay";
import QuizResult from "@/components/quizResult";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";


export default function QuizPage() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const quizId = params.quiz as string;
  const { user } = useAuth();

  // Fetch quiz data using useQuery hook
  const { loading, error, data } = useQuery(GET_QUIZ, {
    variables: { quizId },
  });

  const quiz: Quiz | undefined = data?.quiz;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [timerRunning, setTimerRunning] = useState(true);
  const startTime = useRef(Date.now());
  const [endTime, setEndTime] = useState<number | null>(null);
  const [timeUp, setTimeUp] = useState(false);
  const [quizResults, setQuizResults] = useState<QuizResponse | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  const handleAnswerSelect = useCallback((optionIndex: number) => {
    setSelectedOption(optionIndex);
  }, []);

  const token = localStorage.getItem('token');




  const handleSubmitQuiz = useCallback(async () => {
    if (!quiz) return;
    if (!user) {
      return;
    }
    try {
      const validationResponse = await fetch(
        "http://localhost:7100/api/quizzes/validate-answers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            quizId,
            userAnswers: selectedAnswers,
            quizTimeTaken: 60 - timeRemaining,
          }),
        }
      );
      const data: QuizResponse = await validationResponse.json();

      if (data.score !== null) {
        setQuizResults(data);
        const recordProgressResponse = await fetch(
          "http://localhost:7100/api/transactions/record-progress",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              quizId,
              courseId: quiz.courseId,
              quizScore: data.score,
              quizTimeTaken: 30 - timeRemaining,
            }),
          }
        );

        if (recordProgressResponse.ok) {
          const recordProgressData =
            await recordProgressResponse.json();
          setShowResult(true);
        } else {
          toast.error("Failed to record quiz results", {
            position: "top-center",
          });
        }
      } else {
        toast.error("An error occurred while validating answers", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("An error occurred while validating answers", {
        position: "top-center",
      });
      console.error("Error validating quiz answers:", error);
    }
  }, [
    quiz,
    quizId,
    selectedAnswers,
    timeRemaining,
    token,
    user,
  ]);

  const handleNextQuestion = useCallback(async () => {
    if (selectedOption !== null) {
      setSelectedAnswers(prevAnswers => [
        ...prevAnswers.slice(0, currentQuestion),
        selectedOption,
        ...prevAnswers.slice(currentQuestion + 1)
      ]);

      if (currentQuestion < (quiz?.questions.length || 0) - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        setEndTime(Date.now());
        await handleSubmitQuiz();
        setShowResult(true);
      }
    }
  }, [
    currentQuestion,
    quiz?.questions,
    selectedOption,
    setSelectedAnswers,
    handleSubmitQuiz,
  ]);

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
      <AnimatePresence>
        <motion.div
          key={pathname}
          className="w-full max-w-3xl text-center"
          variants={quizContainerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          whileHover={{ scale: 1.05 }}
        >
          <Card className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 flex flex-col mt-8">

            {/* Quiz Header */}
            <QuizHeader
              quizTitle={quiz.title}
              currentQuestionIndex={currentQuestion}
              totalQuestions={quiz.questions.length}
              timeRemaining={timeRemaining}
              timeUp={timeUp}
            />

            {/* Question or Result Display */}
            <AnimatePresence mode="wait">
              {showResult ? (
                <QuizResult
                  score={quizResults?.score || 0}
                  results={quizResults?.results || []}
                  totalQuestions={quiz.questions.length}
                  totalTimeTaken={totalTimeTaken}
                  onRewardSelect={handleRewardSelect}
                />
              ) : (
                <QuestionDisplay
                  question={quiz.questions[currentQuestion]}
                  selectedOption={selectedOption}
                  onAnswerSelect={handleAnswerSelect}
                  onNextQuestion={handleNextQuestion}
                />
              )}
            </AnimatePresence>

            {/* Exit Button */}
            <div className="mt-4">
              <Button
                onClick={() => router.back()}
                color="success"
                className="shadow-md hover:bg-red-600 text-2xl"
              >
                Exit Quiz
              </Button>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}