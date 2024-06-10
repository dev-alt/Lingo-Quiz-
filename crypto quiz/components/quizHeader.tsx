import React from 'react';
import { CardBody, Progress } from '@nextui-org/react';
import { title } from "@/components/primitives";

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
  timeUp
}) => {
  return (
    <CardBody className="text-black flex-grow text-center pb-8">
      <Progress
        color="primary"
        value={((currentQuestionIndex + 1) / totalQuestions) * 100}
        className="mb-4"
      />
      <h4 className={title({ color: "violet" })}>
        {quizTitle}&nbsp;
      </h4>
      <div className="mt-4 text-center">
        {timeUp ? (
          <h4 color="error">Times Up!</h4>
        ) : (
          <h4>Time Remaining: {timeRemaining} seconds</h4>
        )}
      </div>
    </CardBody>
  );
};
export default QuizHeader;
