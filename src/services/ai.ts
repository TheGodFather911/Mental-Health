import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Answer } from '../types/assessment';

const genAI = new GoogleGenerativeAI('AIzaSyCFxf4H_Ba81NojU-kySHS87gZq3jcvPNI');

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
      throw new Error('Unable to analyze responses');
    }
  }
};

function createAnalysisPrompt(answers: Answer[]): string {
  return `
    As a compassionate mental health assessment tool, analyze these responses and provide insights:

    Assessment Data:
    ${JSON.stringify(answers, null, 2)}

    Please provide a structured analysis following these guidelines:
    1. Begin with a warm, personal greeting
    2. Highlight key strengths and positive patterns observed
    3. Gently address any areas that might benefit from attention
    4. Provide 3-4 specific, actionable self-care suggestions
    5. End with an encouraging message about taking this step for self-care

    Format the response with clear sections and spacing.
    Use a warm, supportive tone throughout.
    Focus on empowerment and growth.
    Avoid clinical terminology unless necessary.
    ALL HAS TO BE SHORT AND EASY TO LEARN
  `;
}