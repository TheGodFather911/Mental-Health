import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAssessment } from './useAssessment';
import { QuestionView } from './QuestionView';
import { ResultsView } from './ResultsView';
import { ErrorView } from './ErrorView';

export function Assessment() {
  const [sessionId] = useState(() => uuidv4());
  const { 
    currentQuestion,
    answers,
    isSubmitting,
    analysis,
    error,
    handleAnswer,
    retrySubmission
  } = useAssessment(sessionId);

  if (error) {
    return <ErrorView message={error} onRetry={retrySubmission} />;
  }

  if (analysis) {
    return <ResultsView analysis={analysis} />;
  }

  return (
    <QuestionView
      question={currentQuestion}
      isSubmitting={isSubmitting}
      onAnswer={handleAnswer}
    />
  );
}