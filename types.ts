
export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Quiz {
  title: string;
  category: string;
  questions: Question[];
}

export enum QuizState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
  ABOUT = 'ABOUT'
}

export interface QuizCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}
