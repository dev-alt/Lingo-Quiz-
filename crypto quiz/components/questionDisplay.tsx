import React from 'react';
import { Button, Spacer } from '@nextui-org/react';
import { Question } from '@/types';

interface QuestionDisplayProps {
  question: Question;
  selectedOption: number | null;
  onAnswerSelect: (optionIndex: number) => void;
  onNextQuestion: () => void;
}



const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ 
  question, 
  selectedOption, 
  onAnswerSelect,
  onNextQuestion 
}) => {

  
  return (
    <>
      <h4>{question.question}</h4>
      <ul className="list-none p-0">
        {question.options.map((option, index) => (
          <li key={index}>
            <Button
              onClick={() => onAnswerSelect(index)}
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
          onClick={onNextQuestion}
          className="text-white bg-teal-400 disabled:bg-gray-900 disabled:text-white hover:bg-teal-600 text-sm rounded-md md:text-base font-bold py-2 px-4 shadow-lg"
        >
          Next
        </Button>
      </div>
    </>
  );
};
export default QuestionDisplay;