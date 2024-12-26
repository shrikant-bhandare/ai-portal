/*
  # Meetings Management System

  1. New Tables
    - `meetings`
      - `id` (uuid, primary key) - Unique identifier for each meeting
      - `user_id` (uuid) - References auth.users for ownership
      - `meeting_date` (date) - Date of the meeting
      - `meeting_time` (time) - Time of the meeting
      - `name` (text) - Name of the attendee
      - `email` (text) - Email of the attendee
      - `company` (text) - Company name
      - `topic` (text) - Meeting topic/agenda
      - `notes` (text, optional) - Additional notes
      - `created_at` (timestamptz) - Record creation timestamp
      - `status` (text) - Meeting status (default: 'pending')

  2. Security
    - Enables Row Level Security (RLS)
    - Creates policy for authenticated users to manage their meetings
*/

-- Create meetings table with proper constraints
CREATE TABLE IF NOT EXISTS meetings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  meeting_date date NOT NULL,
  meeting_time time NOT NULL,
  name text NOT NULL,
  email text NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  company text NOT NULL,
  topic text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed'))
);

-- Enable Row Level Security
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users
CREATE POLICY "Users can manage their own meetings"
  ON meetings
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);