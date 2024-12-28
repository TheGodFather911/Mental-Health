import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Question } from '../types/assessment';

const genAI = new GoogleGenerativeAI('AIzaSyCFxf4H_Ba81NojU-kySHS87gZq3jcvPNI');

export async function generateQuestions(): Promise<Question[]> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const prompt = `Generate 5 mental health assessment questions. For each question, provide:
    1. A clear, empathetic question text
    2. The type (either 'scale' or 'multiple-choice')
    3. The category (anxiety, depression, stress, or general)
    4. For multiple-choice questions, provide 4-5 relevant options

    Format the response as a JSON array of questions.
    Make questions gentle and supportive in tone.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const questions = JSON.parse(response.text()) as Question[];
    
    // Ensure each question has a unique ID
    return questions.map((q, index) => ({
      ...q,
      id: `q${index + 1}`
    }));
  } catch (error) {
    console.error('Error generating questions:', error);
    // Fallback to default questions if generation fails
    return getDefaultQuestions();
  }
}

function getDefaultQuestions(): Question[] {
  return [
    {
      id: 'q1',
      text: 'How have you been feeling emotionally over the past week?',
      type: 'scale',
      category: 'general'
    },
    {
      id: 'q2',
      text: 'What activities help you feel most at peace?',
      type: 'multiple-choice',
      category: 'general',
      options: [
        'Spending time in nature',
        'Connecting with loved ones',
        'Engaging in creative activities',
        'Physical exercise',
        'Quiet reflection or meditation'
      ]
    }
    // Add more default questions as needed
  ];
}