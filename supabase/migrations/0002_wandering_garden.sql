/*
  # Create companies table

  1. New Tables
    - `companies`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `website` (text)
      - `country` (text)
      - `size` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `companies` table
    - Add policy for authenticated users to manage their own company data
*/

CREATE TABLE IF NOT EXISTS companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  website text,
  country text,
  size text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own company data"
  ON companies
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);