/*
  # Initial CRM Schema Setup

  1. New Tables
    - `customers`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `company` (text)
      - `status` (text)
      - `created_at` (timestamp)
      - `last_contact` (timestamp)
    
    - `conversations`
      - `id` (uuid, primary key)
      - `customer_id` (uuid, references customers)
      - `user_id` (uuid, references auth.users)
      - `content` (text)
      - `type` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create customers table
CREATE TABLE customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  email text,
  phone text,
  company text,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now(),
  last_contact timestamptz DEFAULT now()
);

-- Create conversations table
CREATE TABLE conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  content text NOT NULL,
  type text DEFAULT 'note',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- Policies for customers
CREATE POLICY "Users can manage their own customers"
  ON customers
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for conversations
CREATE POLICY "Users can manage conversations for their customers"
  ON conversations
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM customers
      WHERE customers.id = conversations.customer_id
      AND customers.user_id = auth.uid()
    )
  );