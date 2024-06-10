import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Course {
  _id: string;
  title: string;
  language: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description?: string;
  imageUrl?: string;
  duration?: number; 
  quizzes?: Quiz[];
  prerequisites?: Course[];
  averageRating?: number;
  totalReviews?: number;
  reviews?: Review[];
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Quiz {
  _id: string;
  title: string;
  language: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  questions: Question[];
  isCompleted?: boolean;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}
export interface Review {
  userId: string;
  rating: number;
  comment?: string;
}
export interface UserProgress {
  courseId: string;
  progress: number;
}

export interface SidebarItemProps {
  avatar: string;
  username: string;
  handle: string;
  level: number;
  xp: number;
  rank: string;
  badges: number;
  streak: number;
}

export interface User {
  _id: string;
  userId: string;
  username: string;
  handle: string;
  level: number;
  xp: number;
  challengesCompleted: number;
  rank: string;
  badges: number;
  streak: number;
  achievements: [];
  progress: [];
  joinDate: string;
  lastActive: string;
  avatarUrl: string | null;
  bannerUrl: string | null;
  ownedBanners: [];
  ownedAvatars: [];
  __v: number;
}
export interface AuthContextType {
  user: User | null; 
  isLoggedIn: boolean;
  isLoading: boolean; 
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
export interface Question {
  id: number; // Unique identifier
  text: string; // Question text
  options: string[]; // Array of answer options
  correctAnswer: number; // Index of the correct answer
}

export interface Quiz {
  title: string;
  description: string; // Optional description
  courseId: string; // If you're using course IDs
  questions: Question[];
}
export interface QuestionResult {
  questionText: string;
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
}
export interface QuizResult {
  // ... other quiz properties ...
  score: number;
  timeTaken: number;
  results: {
    questionText: string;
    correctAnswer: string;
    userAnswer: string;
    isCorrect: boolean;
  }[];
}
export interface SubmitQuizResultResponse {
  storeQuizResult: {
    success: boolean;
    message: string;
    txHash: string;
    result: QuizResult
  }
}

export interface Response {
  score: number;
  results: {
    questionText: string;
    correctAnswer: string;
    userAnswer: string;
    isCorrect: boolean;
  }[];
}