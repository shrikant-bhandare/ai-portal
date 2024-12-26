/*
  # Fix onboarding status initialization

  1. Changes
    - Add function to safely initialize onboarding status
    - Add trigger to automatically create onboarding status for new users
  
  2. Security
    - Maintain existing RLS policies
    - Function executes with security definer to ensure proper access
*/

-- Function to safely initialize onboarding status
CREATE OR REPLACE FUNCTION initialize_onboarding_status()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.onboarding_status (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Trigger to automatically create onboarding status for new users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION initialize_onboarding_status();

-- Ensure onboarding status exists for all current users
INSERT INTO public.onboarding_status (user_id)
SELECT id FROM auth.users
ON CONFLICT (user_id) DO NOTHING;