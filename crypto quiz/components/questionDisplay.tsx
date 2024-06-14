import React from "react";
import { motion } from "framer-motion";
import { Button, Spacer } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { Question } from "@/types";

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
  onNextQuestion,
}) => {
  // Framer Motion Variants for animation (with more refined properties)
  const buttonVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    hover: { scale: 1.05 }, // Subtle hover effect
    tap: { scale: 0.9 }, // Tap/click effect
  };

  return (
    <div className="mt-4 space-y-6"> 
      {/* Question Text */}
      <h4 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
        {question.question}
      </h4>

      {/* Answer Choices */}
      <motion.ul
        className="list-none p-0 grid grid-cols-1 md:grid-cols-2 gap-4"
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {question.options.map((option, index) => (
          <motion.li
            key={index}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              onClick={() => onAnswerSelect(index)}
              className={`w-full p-4 text-left rounded-lg text-gray-800 shadow-sm
                ${selectedOption === index ? "bg-teal-500 text-white" : "bg-white hover:bg-gray-100"}
              `}
            >
              <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span> {option}
            </Button>
          </motion.li>
        ))}
      </motion.ul>

      {/* Next Button */}
      <div className="flex justify-end mt-4">
        <Button
          onClick={onNextQuestion}
          className="bg-blue-500 hover:bg-blue-700 text-white rounded-md shadow-md disabled:opacity-50"
          isDisabled={selectedOption === null}
        >
          <Icon icon="mdi:arrow-right" className="ml-2" /> Next
        </Button>
      </div>
    </div>
  );
};

export default QuestionDisplay;
