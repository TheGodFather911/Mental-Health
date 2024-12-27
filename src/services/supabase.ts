import { createClient } from '@supabase/supabase-js';
import type { Answer } from '../types/assessment';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const assessmentService = {
  async createAssessment(sessionId: string): Promise<string> {
    const { data, error } = await supabase
      .from('assessments')
      .insert([{ 
        session_id: sessionId,
        created_at: new Date().toISOString()
      }])
      .select('id')
      .single();

    if (error) {
      console.error('Failed to create assessment:', error);
      throw new Error('Failed to create assessment');
    }
    
    return data.id;
  },

  async saveAnswers(assessmentId: string, answers: Answer[]): Promise<void> {
    const { error } = await supabase
      .from('assessments')
      .update({ 
        answers,
        completed_at: new Date().toISOString()
      })
      .eq('id', assessmentId);

    if (error) {
      console.error('Failed to save answers:', error);
      throw new Error('Failed to save answers');
    }
  },

  async saveAnalysis(assessmentId: string, analysis: string): Promise<void> {
    const { error } = await supabase
      .from('assessments')
      .update({ analysis })
      .eq('id', assessmentId);

    if (error) {
      console.error('Failed to save analysis:', error);
      throw new Error('Failed to save analysis');
    }
  }
};