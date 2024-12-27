import React from 'react';

interface ResultsViewProps {
  analysis: string;
}

export function ResultsView({ analysis }: ResultsViewProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Your Assessment Results</h2>
        <div className="prose prose-blue">
          {analysis.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-700">{paragraph}</p>
          ))}
        </div>
        <div className="mt-8 text-sm text-gray-500">
          Remember: This assessment is not a medical diagnosis. If you're experiencing 
          significant distress, please consult with a mental health professional.
        </div>
      </div>
    </div>
  );
}