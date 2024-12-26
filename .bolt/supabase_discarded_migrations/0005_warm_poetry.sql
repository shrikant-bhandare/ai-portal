/*
  # Create meetings table for scheduling

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
      - `status` (text, default: 'pending')
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on meetings table
    - Add policy for authenticated users to manage their own meetings
*/

-- Create meetings table
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
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;

-- Create policy for users to manage their own meetings
CREATE POLICY "Users can manage their own meetings"
  ON meetings
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);