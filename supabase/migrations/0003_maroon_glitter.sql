/*
  # Add onboarding tables

  1. New Tables
    - `onboarding_status`
      - Tracks user's progress through onboarding
      - Fields for each step completion
    - `contact_details`
      - Stores user contact information
    - `social_profiles`
      - Stores user social media links

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create onboarding_status table
CREATE TABLE IF NOT EXISTS onboarding_status (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  company_step_completed boolean DEFAULT false,
  contact_step_completed boolean DEFAULT false,
  social_step_completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  UNIQUE(user_id)
);

-- Create contact_details table
CREATE TABLE IF NOT EXISTS contact_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  phone text,
  address text,
  city text,
  postal_code text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create social_profiles table
CREATE TABLE IF NOT EXISTS social_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  facebook text,
  twitter text,
  linkedin text,
  instagram text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE onboarding_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their own onboarding status"
  ON onboarding_status
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own contact details"
  ON contact_details
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own social profiles"
  ON social_profiles
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);