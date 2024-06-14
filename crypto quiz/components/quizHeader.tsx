import React from "react";
import { Progress, Spacer } from "@nextui-org/react";
import { Icon } from "@iconify/react";

interface QuizHeaderProps {
  quizTitle: string;
  currentQuestionIndex: number;
  totalQuestions: number;
  timeRemaining: number;
  timeUp: boolean;
}

const QuizHeader: React.FC<QuizHeaderProps> = ({
  quizTitle,
  currentQuestionIndex,
  totalQuestions,
  timeRemaining,
  timeUp,
}) => {
  return (
    <div className="relative p-4 rounded-t-md text-white">
      {/* Quiz Title and Icon */}
      <div className="flex flex-col items-center mb-4 space-y-2">
        <div className="flex items-center">
          <Icon
            icon="ic:outline-quiz"
            className="text-white text-5xl mr-2 animate-pulse"
          />
          <h1 className="text-3xl md:text-5xl font-extrabold text-white">
            {quizTitle}
          </h1>
        </div>
        <div className="text-lg md:text-xl font-semibold text-yellow-200">
          Test your language skills!
        </div>
      </div>

      {/* Progress Bar */}
      <Progress
        color="warning"
        value={((currentQuestionIndex + 1) / totalQuestions) * 100}
        className="w-full rounded-full"
        aria-label={`Quiz progress: ${((currentQuestionIndex + 1) / totalQuestions) * 100
          }%`}
      />

      {/* Time Remaining (or Times Up) */}
      <div className="mt-4 text-center">
        {timeUp ? (
          <h4 className="text-red-500 text-3xl font-semibold animate-pulse">
            Times Up!
          </h4>
        ) : (
          <h4 className="text-white text-lg font-semibold">
            Time Remaining: {timeRemaining}s
          </h4>
        )}
      </div>
    </div>
  );
};

export default QuizHeader;
