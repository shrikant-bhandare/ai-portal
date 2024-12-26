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

-- Create an enum type for meeting status
DO $$ BEGIN
  CREATE TYPE meeting_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create meetings table with IF NOT EXISTS to prevent errors
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
  status meeting_status DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  CONSTRAINT future_meeting_date CHECK (meeting_date >= CURRENT_DATE)
);

-- Enable Row Level Security
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;

-- Create policy for users to manage their own meetings
CREATE POLICY "Users can manage their own meetings"
  ON meetings
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS meetings_user_id_idx ON meetings(user_id);
CREATE INDEX IF NOT EXISTS meetings_date_time_idx ON meetings(meeting_date, meeting_time);

-- Add a function to prevent overlapping meetings
CREATE OR REPLACE FUNCTION check_meeting_overlap()
RETURNS trigger AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM meetings
    WHERE user_id = NEW.user_id
    AND meeting_date = NEW.meeting_date
    AND meeting_time = NEW.meeting_time
    AND id != NEW.id
    AND status != 'cancelled'
  ) THEN
    RAISE EXCEPTION 'Meeting time slot is already taken';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to check for overlapping meetings
DROP TRIGGER IF EXISTS prevent_meeting_overlap ON meetings;
CREATE TRIGGER prevent_meeting_overlap
  BEFORE INSERT OR UPDATE ON meetings
  FOR EACH ROW
  EXECUTE FUNCTION check_meeting_overlap();