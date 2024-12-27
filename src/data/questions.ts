import { Question } from '../types/assessment';

export const questions: Question[] = [
  {
    id: 'q1',
    text: 'Over the past 2 weeks, how often have you felt down, depressed, or hopeless?',
    type: 'scale',
    category: 'depression'
  },
  {
    id: 'q2',
    text: 'How often do you feel nervous, anxious, or on edge?',
    type: 'scale',
    category: 'anxiety'
  },
  {
    id: 'q3',
    text: 'How would you rate your current stress level?',
    type: 'scale',
    category: 'stress'
  },
  {
    id: 'q4',
    text: 'Which of these symptoms have you experienced recently?',
    type: 'multiple-choice',
    options: [
      'Trouble sleeping',
      'Changes in appetite',
      'Difficulty concentrating',
      'Loss of interest in activities',
      'None of the above'
    ],
    category: 'general'
  }
];