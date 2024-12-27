import React from 'react';

interface ScaleQuestionProps {
  isSubmitting: boolean;
  onAnswer: (value: number) => void;
}

export function ScaleQuestion({ isSubmitting, onAnswer }: ScaleQuestionProps) {
  const options = [
    { value: 1, label: 'Not at all' },
    { value: 2, label: 'Several days' },
    { value: 3, label: 'More than half the days' },
    { value: 4, label: 'Nearly every day' },
    { value: 5, label: 'Every day' }
  ];

  return (
    <div className="flex flex-col space-y-4">
      {options.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onAnswer(value)}
          className="w-full py-3 px-4 text-left rounded-md border hover:bg-blue-50 
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isSubmitting}
        >
          {label}
        </button>
      ))}
    </div>
  );
}