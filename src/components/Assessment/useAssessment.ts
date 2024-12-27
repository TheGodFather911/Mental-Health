import { useState } from 'react';
import type { Answer } from '../../types/assessment';
import { questions } from '../../data/questions';
import { assessmentService } from '../../services/supabase';
import { aiService } from '../../services/ai';

export function useAssessment(sessionId: string) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnswer = async (value: string | number) => {
    const answer: Answer = {
      questionId: questions[currentQuestionIndex].id,
      value,
      timestamp: new Date().toISOString()
    };

    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsSubmitting(true);
      setError(null);
      
      try {
        const assessmentId = await assessmentService.createAssessment(sessionId);
        await assessmentService.saveAnswers(assessmentId, newAnswers);
        
        const analysisResult = await aiService.analyzeResponses(newAnswers);
        await assessmentService.saveAnalysis(assessmentId, analysisResult);
        
        setAnalysis(analysisResult);
      } catch (error) {
        console.error('Error submitting assessment:', error);
        setError('We encountered an issue processing your assessment. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const retrySubmission = () => {
    if (answers.length === questions.length) {
      handleAnswer(answers[answers.length - 1].value);
    }
  };

  return {
    currentQuestion: questions[currentQuestionIndex],
    answers,
    isSubmitting,
    analysis,
    error,
    handleAnswer,
    retrySubmission
  };
}