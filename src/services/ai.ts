import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Answer } from '../types/assessment';
import { questions } from '../data/questions';

const GEMINI_API_KEY = 'AIzaSyCFxf4H_Ba81NojU-kySHS87gZq3jcvPNI';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const aiService = {
  async analyzeResponses(answers: Answer[]): Promise<string> {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const prompt = createAnalysisPrompt(answers);
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('AI analysis error:', error);
      return 'We apologize, but we encountered an issue analyzing your responses. ' +
             'Please try again later or contact support if the problem persists.';
    }
  }
};

function createAnalysisPrompt(answers: Answer[]): string {
  const answersWithContext = answers.map(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    return {
      question: question?.text,
      category: question?.category,
      value: answer.value,
      interpretation: interpretAnswer(answer.value, question?.type)
    };
  });

  return `
    As a compassionate mental health assessment tool, analyze these responses and provide insights:

    Assessment Data:
    ${JSON.stringify(answersWithContext, null, 2)}

    Please provide a structured analysis following these guidelines:
    1. Start with a warm, empathetic greeting
    2. Summarize key observations about mental well-being
    3. Identify potential areas of concern (if any)
    4. Provide practical, actionable self-care suggestions
    5. End with an encouraging note and reminder that this is not a clinical diagnosis

    Keep the tone supportive and focus on empowerment and growth.
    Avoid clinical terminology unless necessary.
    Include specific examples from their responses to personalize the analysis.
  `;
}

function interpretAnswer(value: string | number, type?: string): string {
  if (type === 'scale') {
    const numValue = Number(value);
    if (numValue <= 2) return 'minimal';
    if (numValue <= 3) return 'moderate';
    return 'significant';
  }
  return String(value);
}