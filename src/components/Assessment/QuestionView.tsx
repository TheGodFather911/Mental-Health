import React from 'react';
import type { Question } from '../../types/assessment';
import { Card } from '../ui/Card';
import { Container } from '../layout/Container';
import { ScaleQuestion } from './ScaleQuestion';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';

interface QuestionViewProps {
  question: Question;
  isSubmitting: boolean;
  onAnswer: (value: string | number) => void;
  currentQuestionNumber: number;
  totalQuestions: number;
}

export function QuestionView({ 
  question, 
  isSubmitting, 
  onAnswer,
  currentQuestionNumber,
  totalQuestions
}: QuestionViewProps) {
  return (
    <Container className="py-12">
      <Card className="max-w-2xl mx-auto">
        <div className="space-y-6">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Question {currentQuestionNumber} of {totalQuestions}</span>
            <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-rose-500 transition-all duration-300"
                style={{ width: `${(currentQuestionNumber / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-900">{question.text}</h2>
          
          {question.type === 'scale' && (
            <ScaleQuestion 
              isSubmitting={isSubmitting} 
              onAnswer={onAnswer} 
            />
          )}

          {question.type === 'multiple-choice' && question.options && (
            <MultipleChoiceQuestion 
              options={question.options}
              isSubmitting={isSubmitting}
              onAnswer={onAnswer}
            />
          )}
        </div>
      </Card>
    </Container>
  );
}