CREATE TABLE IF NOT EXISTS brand_guidelines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  brand_overview jsonb NOT NULL,
  brand_voice jsonb NOT NULL,
  visual_identity jsonb NOT NULL,
  usage_consistency jsonb NOT NULL,
  additional_requests text,
  notes text,
  reference_materials text,
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