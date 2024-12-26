/*
  # Add Sample Conversations Data

  1. Sample Data
    - Adds sample customer with realistic data
    - Adds sample conversations with meaningful content
  
  2. Changes
    - Inserts initial data for development and testing
    - Uses proper user_id reference from auth.users
*/

-- Get the first user's ID into a variable for reuse
DO $$
DECLARE
  first_user_id UUID;
BEGIN
  -- Get the first user's ID
  SELECT id INTO first_user_id FROM auth.users LIMIT 1;

  -- Insert sample customer if they don't exist
  INSERT INTO customers (id, user_id, name, email, phone, company, status)
  SELECT 
    gen_random_uuid(),
    first_user_id,
    'Alex Thompson',
    'alex@moderntech.com',
    '+1-555-0123',
    'Modern Tech Solutions',
    'active'
  WHERE NOT EXISTS (
    SELECT 1 FROM customers WHERE email = 'alex@moderntech.com'
  );

  -- Insert conversations for the customer
  INSERT INTO conversations (customer_id, user_id, content, type)
  SELECT 
    c.id,
    first_user_id,
    'Initial project scope discussion - Client interested in full website redesign',
    'note'
  FROM customers c
  WHERE c.email = 'alex@moderntech.com'
  AND NOT EXISTS (
    SELECT 1 FROM conversations 
    WHERE customer_id = c.id 
    AND content LIKE '%Initial project scope%'
  );

  INSERT INTO conversations (customer_id, user_id, content, type)
  SELECT 
    c.id,
    first_user_id,
    'Follow-up meeting scheduled for next week to discuss design concepts',
    'note'
  FROM customers c
  WHERE c.email = 'alex@moderntech.com'
  AND NOT EXISTS (
    SELECT 1 FROM conversations 
    WHERE customer_id = c.id 
    AND content LIKE '%Follow-up meeting%'
  );
END $$;