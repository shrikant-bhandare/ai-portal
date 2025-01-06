/*
  # Add Brand Guidelines Table

  1. New Tables
    - `brand_guidelines` for storing brand guideline submissions
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `brand_overview` (jsonb)
      - `brand_voice` (jsonb)
      - `visual_identity` (jsonb)
      - `usage_consistency` (jsonb)
      - `additional_requests` (text)
      - `notes` (text)
      - `references` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `brand_guidelines` table
    - Add policy for authenticated users to manage their own guidelines
*/

CREATE TABLE IF NOT EXISTS brand_guidelines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  brand_overview jsonb NOT NULL,
  brand_voice jsonb NOT NULL,
  visual_identity jsonb NOT NULL,
  usage_consistency jsonb NOT NULL,
  additional_requests text,
  notes text,
  references text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE brand_guidelines ENABLE ROW LEVEL SECURITY;

-- Create policy for users to manage their own guidelines
CREATE POLICY "Users can manage their own brand guidelines"
  ON brand_guidelines
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS brand_guidelines_user_id_idx ON brand_guidelines(user_id);