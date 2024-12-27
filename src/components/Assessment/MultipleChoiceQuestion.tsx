import React from 'react';

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
    <div className="flex flex-col space-y-4">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onAnswer(option)}
          className="w-full py-3 px-4 text-left rounded-md border hover:bg-blue-50 
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isSubmitting}
        >
          {option}
        </button>
      ))}
    </div>
  );
}