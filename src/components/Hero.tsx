import React from 'react';
import { Heart } from 'lucide-react';

interface HeroProps {
  onStartAssessment: () => void;
}

export function Hero({ onStartAssessment }: HeroProps) {
  return (
    <div className="relative bg-gradient-to-b from-blue-50 to-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Heart className="mx-auto h-12 w-12 text-blue-600 mb-4" />
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Your Mental Health</span>
            <span className="block text-blue-600">Matters</span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
            Take a moment to check in with yourself. Our assessment helps you understand your mental well-being in a safe, confidential space.
          </p>
          <div className="mt-8 flex justify-center">
            <button 
              onClick={onStartAssessment}
              className="rounded-md bg-blue-600 px-8 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors"
            >
              Start Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}