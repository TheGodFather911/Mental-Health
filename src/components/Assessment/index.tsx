import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { generateQuestions } from '../../services/questions';
import { QuestionView } from './QuestionView';
import { ResultsView } from './ResultsView';
import { ErrorView } from './ErrorView';
import { LoadingView } from './LoadingView';
import type { Question, Answer } from '../../types/assessment';
import { assessmentService } from '../../services/supabase';
import { aiService } from '../../services/ai';

export function Assessment() {
  const [sessionId] = useState(() => uuidv4());
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadQuestions() {
      try {
        const generatedQuestions = await generateQuestions();
        setQuestions(generatedQuestions);
      } catch (err) {
        setError('Unable to load questions. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
    loadQuestions();
  }, []);

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
      try {
        const assessmentId = await assessmentService.createAssessment(sessionId);
        await assessmentService.saveAnswers(assessmentId, newAnswers);
        
        const analysisResult = await aiService.analyzeResponses(newAnswers);
        await assessmentService.saveAnalysis(assessmentId, analysisResult);
        
        setAnalysis(analysisResult);
      } catch (err) {
        setError('Unable to process your responses. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (error) {
    return <ErrorView message={error} />;
  }

  if (isLoading) {
    return <LoadingView />;
  }

  if (analysis) {
    return <ResultsView analysis={analysis} />;
  }

  return (
    <QuestionView
      question={questions[currentQuestionIndex]}
      isSubmitting={isSubmitting}
      onAnswer={handleAnswer}
      currentQuestionNumber={currentQuestionIndex + 1}
      totalQuestions={questions.length}
    />
  );
}