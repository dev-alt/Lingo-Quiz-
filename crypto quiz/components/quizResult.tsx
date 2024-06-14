import React from "react";
import { motion } from "framer-motion";
import RewardSelection from "./rewardSelection";
import { QuestionResult } from "@/types/";
import { Spacer } from "@nextui-org/react";
import { Icon } from "@iconify/react";

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
  console.log("Results", results);
  const passMark = totalQuestions * 0.8;

  // Calculate the number of correct answers
  const correctAnswers = results.filter((r) => r.isCorrect).length;

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="text-white"
    >
      <div className="flex flex-col items-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">Quiz Finished!</h3>
        <p className="text-lg">
          You got {correctAnswers} out of {totalQuestions} questions correct.
        </p>
        <p className="text-lg">Total time taken: {totalTimeTaken} seconds</p>

        {/* Conditional Message and Button based on score */}
        {score >= passMark ? (
          <>
            <p className="text-green-500 mt-4">
              Congratulations! You passed!
            </p>
            <RewardSelection onRewardSelect={onRewardSelect} />
          </>
        ) : (
          <div className=" text-gray-800 p-4 rounded-md mt-4">
            <Icon
              icon="emojione-monotone:sad-but-relieved-face"
              className="mr-2 text-2xl text-ce"
            />
            <p className="text-3xl">
              {" "}
              Sorry, you didn&apos;t pass. Try again later.
            </p>
          </div>
        )}

        {/* Display of Answers */}
        <div className="mt-6 w-full max-w-md space-y-2">
          {results.map((result, index) => (
            <div
              key={index}
              className={`p-4 rounded-md ${result.isCorrect ? "bg-green-200" : "bg-red-200"
                } `}
            >
              <p className="font-semibold">
                Question {index + 1}: {result.questionText}
              </p>
              <p>
                Your answer:{" "}
                <span
                  className={`${result.isCorrect ? "text-green-700" : "text-red-700"
                    }`}
                >
                  {result.userAnswer}
                </span>
              </p>
              <p>
                Correct answer:{" "}
                <span
                  className={`${result.isCorrect ? "text-green-700" : "text-red-700"
                    }`}
                >
                  {result.correctAnswer}
                </span>
              </p>
            </div>
          ))}
        </div>
        <Spacer y={1} />
      </div>
    </motion.div>
  );
};

export default QuizResult;

