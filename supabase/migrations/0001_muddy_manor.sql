/*
  # Create assessments table

  1. New Tables
    - `assessments`
      - `id` (uuid, primary key)
      - `session_id` (text, for anonymous session tracking)
      - `answers` (jsonb, stores question responses)
      - `completed_at` (timestamp, when assessment was finished)
      - `analysis` (text, AI-generated analysis)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS
    - Add policy for inserting new assessments
    - Add policy for updating own assessment
*/

CREATE TABLE assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  answers jsonb,
  completed_at timestamptz,
  analysis text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to create new assessments
CREATE POLICY "Anyone can create an assessment"
  ON assessments
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow updating only your own assessment using session_id
CREATE POLICY "Users can update their own assessment"
  ON assessments
  FOR UPDATE
  TO anon
  USING (session_id = current_setting('app.session_id', true))
  WITH CHECK (session_id = current_setting('app.session_id', true));