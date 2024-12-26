/*
  # Add Sample Conversations Data

  1. Sample Data
    - Adds sample customers
    - Adds sample conversations linked to customers
  
  2. Changes
    - Inserts initial data for testing and development
*/

-- Insert sample customers
INSERT INTO customers (id, user_id, name, email, phone, company, status)
VALUES
  ('d8f3b9e0-1234-4567-8901-abcdef123456', (SELECT id FROM auth.users LIMIT 1), 'John Smith', 'john@techcorp.com', '+1234567890', 'Tech Corp', 'active'),
  ('e9f4c0a1-2345-5678-9012-bcdef1234567', (SELECT id FROM auth.users LIMIT 1), 'Sarah Johnson', 'sarah@designco.com', '+2345678901', 'Design Co', 'active')
ON CONFLICT (id) DO NOTHING;

-- Insert sample conversations
INSERT INTO conversations (customer_id, user_id, content, type)
VALUES
  ('d8f3b9e0-1234-4567-8901-abcdef123456', (SELECT id FROM auth.users LIMIT 1), 'Initial consultation about website redesign project', 'note'),
  ('d8f3b9e0-1234-4567-8901-abcdef123456', (SELECT id FROM auth.users LIMIT 1), 'Client requested additional features for mobile version', 'note'),
  ('e9f4c0a1-2345-5678-9012-bcdef1234567', (SELECT id FROM auth.users LIMIT 1), 'Discussed branding strategy and logo design options', 'note'),
  ('e9f4c0a1-2345-5678-9012-bcdef1234567', (SELECT id FROM auth.users LIMIT 1), 'Scheduled follow-up meeting for next week', 'note')
ON CONFLICT (id) DO NOTHING;