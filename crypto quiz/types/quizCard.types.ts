export interface CourseCardProps {
    title: string;
    courseId: string;
    progress: number;
    maxProgress: number;
    onResume: () => void;
  }