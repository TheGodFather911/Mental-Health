import React from 'react';
import { Button } from '../ui/Button';

interface ScaleQuestionProps {
  isSubmitting: boolean;
  onAnswer: (value: number) => void;
}

export function ScaleQuestion({ isSubmitting, onAnswer }: ScaleQuestionProps) {
  const options = [
    { value: 1, label: 'Not at all', description: 'This doesn\'t apply to me' },
    { value: 2, label: 'Several days', description: 'Happens occasionally' },
    { value: 3, label: 'More than half the days', description: 'Happens frequently' },
    { value: 4, label: 'Nearly every day', description: 'Happens almost daily' },
    { value: 5, label: 'Every day', description: 'Happens daily' }
  ];

  return (
    <div className="space-y-4">
      {options.map(({ value, label, description }) => (
        <button
          key={value}
          onClick={() => onAnswer(value)}
          disabled={isSubmitting}
          className="w-full p-4 text-left rounded-xl border border-rose-100 hover:border-rose-300 
                   hover:bg-rose-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                   focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">{label}</div>
              <div className="text-sm text-gray-500">{description}</div>
            </div>
            <div className="h-5 w-5 rounded-full border-2 border-rose-200 flex-shrink-0" />
          </div>
        </button>
      ))}
    </div>
  );
}