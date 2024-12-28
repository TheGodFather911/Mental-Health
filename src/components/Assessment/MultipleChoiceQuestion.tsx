import React from 'react';
import { Button } from '../ui/Button';

interface MultipleChoiceQuestionProps {
  options: string[];
  isSubmitting: boolean;
  onAnswer: (value: string) => void;
}

export function MultipleChoiceQuestion({ 
  options, 
  isSubmitting, 
  onAnswer 
}: MultipleChoiceQuestionProps) {
  return (
    <div className="space-y-4">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onAnswer(option)}
          disabled={isSubmitting}
          className="w-full p-4 text-left rounded-xl border border-rose-100 hover:border-rose-300 
                   hover:bg-rose-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                   focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
        >
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-900">{option}</span>
            <div className="h-5 w-5 rounded-full border-2 border-rose-200 flex-shrink-0" />
          </div>
        </button>
      ))}
    </div>
  );
}