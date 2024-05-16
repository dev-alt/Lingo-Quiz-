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
  