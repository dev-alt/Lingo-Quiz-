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
}

export interface Question {
  id: number;
  text: string;
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