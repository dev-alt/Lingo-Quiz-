'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, CardBody, Progress, Spacer } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { useParams } from 'next/navigation';
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

const quizQuestions: Question[] = [
	{ id: 1, text: "What is the first cryptocurrency?", options: ["Bitcoin", "Ethereum", "Litecoin", "Dogecoin"], correctAnswer: 0 },
	{ id: 2, text: "What is the underlying technology of most cryptocurrencies?", options: ["Artificial Intelligence", "Blockchain", "Cloud Computing", "Internet of Things"], correctAnswer: 1 },
  { id: 3, text: "What is the process of verifying transactions on a blockchain called?", options: ["Mining", "Trading", "Staking", "Hacking"], correctAnswer: 0 },
  { id: 4, text: "What is the maximum supply of Bitcoin?", options: ["10 million", "21 million", "100 million", "1 billion"], correctAnswer: 1 },
  { id: 5, text: "What is the name of the creator of Bitcoin?", options: ["Satoshi Nakamoto", "Vitalik Buterin", "Charlie Lee", "Elon Musk"], correctAnswer: 0 },
  { id: 6, text: "What is the name of the first decentralized cryptocurrency exchange?", options: ["Binance", "Uniswap", "Coinbase", "EtherDelta"], correctAnswer: 3 },
  { id: 7, text: "What is the name of the Ethereum token standard used for creating new tokens?", options: ["ERC-20", "ERC-721", "ERC-1155", "ERC-777"], correctAnswer: 0 },
  { id: 8, text: "What is the name of the consensus algorithm used by Bitcoin?", options: ["Proof of Work", "Proof of Stake", "Delegated Proof of Stake", "Proof of Authority"], correctAnswer: 0 },
  { id: 9, text: "What is the name of the first stablecoin?", options: ["USDC", "Tether", "DAI", "TrueUSD"], correctAnswer: 1 },
  { id: 10, text: "What is the name of the first smart contract platform?", options: ["Ethereum", "Cardano", "Polkadot", "Solana"], correctAnswer: 0 },

  ];

export default function QuizPage() {
	const router = useRouter();
	const { courseId } = useParams() as { courseId: string };
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [selectedOption, setSelectedOption] = useState<number | null>(null);
	const [score, setScore] = useState(0);
	const [showResult, setShowResult] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [timerRunning, setTimerRunning] = useState(true);
  const startTime = useRef(Date.now());
  const [endTime, setEndTime] = useState<number | null>(null);
  const [timeUp, setTimeUp] = useState(false); 

    const handleAnswerSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    if (selectedOption === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setEndTime(Date.now());
      setShowResult(true);
    }
  };
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

  const totalTimeTaken = endTime ? Math.round((endTime - startTime.current) / 1000) : 0;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <Card className="w-96 bg-yellow-400 border-4 border-teal-500">
        <CardBody className="text-black">
          {showResult ? (
            <div>
              <h3>Quiz Finished!</h3>
              <p>Your final score: {score} out of {quizQuestions.length}</p>   
              <p>Total time taken: {totalTimeTaken} seconds</p>         
            </div>
          ) : (
            <div>
              <Progress 
                color="primary" 
                value={((currentQuestion + 1) / quizQuestions.length) * 100}
                className="mb-4"
              />
              <h4>{quizQuestions[currentQuestion].text}</h4>
              <ul className="list-none p-0">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <li key={index}>
                    <Button 
                      color={selectedOption === index ? 'success' : 'default'} 
                      onClick={() => handleAnswerSelect(index)}
                      className="text-black my-2 w-full"
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
                  className="bg-teal-500 text-white hover:bg-teal-600"
                >
                  Next
                </Button>
              </div>
              <div className="mt-4 text-center">
                {timeUp ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h4 color="error">Time's Up!</h4>
                  </motion.div>
                ) : (
                  <h4>Time Remaining: {timeRemaining} seconds</h4>
                )}
              </div>        
              </div>    
          )}
        </CardBody>
      </Card>
    </div>
  );
}