"use client";
import { useState } from 'react';
import { Button, Input, Textarea, Card, CardBody, CardFooter, Divider, Spacer } from '@nextui-org/react';
import { Question, Quiz } from '../../../types/quiz.types';
import { useRouter } from 'next/navigation';

export default function CreateQuizPage() {
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz>({
    title: "",
    description: "",
    courseId: "",
    questions: [],
  });
  const [newQuestion, setNewQuestion] = useState<Question>({
    id: 1, 
    text: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
  });

  const handleAddQuestion = () => {
    setQuiz({ 
      ...quiz, 
      questions: [...quiz.questions, newQuestion] 
    });
    setNewQuestion({
      id: newQuestion.id + 1,
      text: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
    });
  };

  const handleSubmitQuiz = async () => {
    try {
      // Send quiz data to your backend API for saving
      const response = await fetch('/api/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quiz),
      });
      if (response.ok) {
        router.push('/quizzes'); 
      } else {
        console.error('Error saving quiz:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving quiz:', error);
    }
  };

  return (
    <div className="bg-yellow-400 border-4 border-teal-500 flex flex-col items-center mt-8">
      <h2 className="text-2xl font-bold mb-4">Create a New Quiz</h2>

      <form className="w-full max-w-md" onSubmit={(e) => { e.preventDefault(); handleSubmitQuiz() }}>
      {/* ... (your form inputs for quiz title, description, etc.) ... */}

      {/* Question Input Section */}
      <div className="mb-4">
        <label htmlFor="questionText" className="block text-sm font-medium text-gray-700">
          Question {newQuestion.id}
        </label>
        <Input 
          id="questionText"
          type="text" 
          value={newQuestion.text}
          onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
          className="mt-1 p-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50" 
          required 
        />
      </div>

      {/* Answer Options */}
      {/* ... (your answer option inputs) ... */}
        <Button type="button" onClick={handleAddQuestion} className="mt-4">
          Add Question
        </Button>
        <Spacer y={1} />
        <Button type="submit" className="mt-4">
          Submit Quiz
        </Button>
      </form>

      {/* ... (your existing quiz preview) ... */}
    </div>
  );
}
