import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorViewProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorView({ message, onRetry }: ErrorViewProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center text-red-500 mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-semibold text-center mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-600 text-center mb-6">{message}</p>
        {onRetry && (
          <div className="flex justify-center">
            <button
              onClick={onRetry}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}