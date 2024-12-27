export interface Question {
  id: string;
  text: string;
  type: 'scale' | 'multiple-choice' | 'text';
  options?: string[];
  category: 'anxiety' | 'depression' | 'stress' | 'general';
}

export interface Answer {
  questionId: string;
  value: string | number;
  timestamp: string;
}

export interface Assessment {
  id: string;
  sessionId: string;
  answers: Answer[];
  completedAt?: string;
  analysis?: string;
}