import React from "react";
import { motion } from "framer-motion";
import RewardSelection from "./rewardSelection";
import { QuestionResult } from "@/types/quiz.types";

interface QuizResultProps {
  score: number;
  results: QuestionResult[];
  totalQuestions: number;
  totalTimeTaken: number;
  onRewardSelect: (rewardNumber: number) => void;
}

const QuizResult: React.FC<QuizResultProps> = ({
  score,
  results,
  totalQuestions,
  totalTimeTaken,
  onRewardSelect,
}) => {
  // Logic to determine the pass mark, for example, 80%
  const passMark = totalQuestions * 0.8;

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="flex flex-col items-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">Quiz Finished!</h3>
        <p className="text-lg">
          You got {score} out of {totalQuestions} questions correct.
        </p>
        <p className="text-lg">Total time taken: {totalTimeTaken} seconds</p>
        <div className="mb-4">
          {results.map((result, index) => (
            <div key={index} className="mb-2">
              <p className="font-semibold">Question {index + 1}: {result.questionText}</p>
              <p>Your answer: {result.userAnswer}</p>
              <p>Correct answer: {result.correctAnswer}</p>
            </div>
          ))}
        </div>
        {/* Conditional Message and Button based on score */}
        {score >= passMark ? (
          <>
            <p className="text-green-500">Congratulations! You passed!</p>
            <RewardSelection onRewardSelect={onRewardSelect} />
          </>
        ) : (
          <p className="text-red-500">Sorry, you didn't pass. Try again later.</p>
        )}
      </div>
    </motion.div>
  );
};

export default QuizResult;