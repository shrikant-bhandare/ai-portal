/*
  # Create meetings table

  1. New Tables
    - `meetings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `meeting_date` (date)
      - `meeting_time` (time)
      - `name` (text)
      - `email` (text)
      - `company` (text)
      - `topic` (text)
      - `notes` (text, optional)
      - `created_at` (timestamptz)
      - `status` (text, default: 'pending')

  2. Security
    - Enable RLS on meetings table
    - Add policy for authenticated users to manage their own meetings
*/

CREATE TABLE IF NOT EXISTS meetings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  meeting_date date NOT NULL,
  meeting_time time NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  company text NOT NULL,
  topic text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending'
);

ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own meetings"
  ON meetings
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);