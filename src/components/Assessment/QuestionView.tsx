import React from 'react';
import type { Question } from '../../types/assessment';
import { ScaleQuestion } from './ScaleQuestion';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';

interface QuestionViewProps {
  question: Question;
  isSubmitting: boolean;
  onAnswer: (value: string | number) => void;
}

export function QuestionView({ question, isSubmitting, onAnswer }: QuestionViewProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4 text-sm text-gray-500">
          Question {question.id} of {4 /* TODO: Get total from questions */}
        </div>
        
        <h2 className="text-xl font-semibold mb-6">{question.text}</h2>
        
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
    </div>
  );
}