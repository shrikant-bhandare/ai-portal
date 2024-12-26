/*
  # Create logo designs table

  1. New Tables
    - `logo_designs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `brand_name` (text)
      - `industry` (text)
      - `product` (text)
      - `benefits` (text)
      - `core_values` (text)
      - `colors` (text[])
      - `typography_notes` (text)
      - `notes` (text)
      - `status` (text)
      - `created_at` (timestamptz)
  2. Security
    - Enable RLS on `logo_designs` table
    - Add policy for authenticated users to manage their own designs
*/

CREATE TABLE IF NOT EXISTS logo_designs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  brand_name text NOT NULL,
  industry text NOT NULL,
  product text NOT NULL,
  benefits text NOT NULL,
  core_values text NOT NULL,
  colors text[] NOT NULL,
  typography_notes text,
  notes text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE logo_designs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own logo designs"
  ON logo_designs
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);