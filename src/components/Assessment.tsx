import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { questions } from '../data/questions';
import type { Answer } from '../types/assessment';
import { assessmentService } from '../services/supabase';
import { aiService } from '../services/ai';

export function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [sessionId] = useState(() => uuidv4());
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);

  const handleAnswer = async (value: string | number) => {
    const answer: Answer = {
      questionId: questions[currentQuestion].id,
      value,
      timestamp: new Date().toISOString()
    };

    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsSubmitting(true);
      try {
        // Create assessment and save answers
        const assessmentId = await assessmentService.createAssessment(sessionId);
        await assessmentService.saveAnswers(assessmentId, newAnswers);
        
        // Get AI analysis
        const analysisResult = await aiService.analyzeResponses(newAnswers);
        await assessmentService.saveAnalysis(assessmentId, analysisResult);
        
        setAnalysis(analysisResult);
      } catch (error) {
        console.error('Error submitting assessment:', error);
        // Show error message to user
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (analysis) {
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

  const question = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4 text-sm text-gray-500">
          Question {currentQuestion + 1} of {questions.length}
        </div>
        
        <h2 className="text-xl font-semibold mb-6">{question.text}</h2>
        
        {question.type === 'scale' && (
          <div className="flex flex-col space-y-4">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onClick={() => handleAnswer(value)}
                className="w-full py-3 px-4 text-left rounded-md border hover:bg-blue-50 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
              >
                {value === 1 && 'Not at all'}
                {value === 2 && 'Several days'}
                {value === 3 && 'More than half the days'}
                {value === 4 && 'Nearly every day'}
                {value === 5 && 'Every day'}
              </button>
            ))}
          </div>
        )}

        {question.type === 'multiple-choice' && question.options && (
          <div className="flex flex-col space-y-4">
            {question.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className="w-full py-3 px-4 text-left rounded-md border hover:bg-blue-50 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}