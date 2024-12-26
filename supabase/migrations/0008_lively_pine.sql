/*
  # Add Sample Conversations Data

  1. Sample Data
    - Adds 3 customers with realistic data
    - Adds 20 sample conversations
    - Uses proper user references
  
  2. Changes
    - Uses proper user ID selection with LIMIT
    - Maintains data consistency
    - Adds chronological conversation history
*/

WITH first_user AS (
  SELECT id FROM auth.users LIMIT 1
), new_customers AS (
  INSERT INTO customers (id, user_id, name, email, phone, company, status)
  SELECT
    gen_random_uuid(),
    first_user.id,
    name,
    email,
    phone,
    company,
    'active'
  FROM first_user,
  (VALUES
    ('Emily Chen', 'emily@innovatetech.com', '+1-555-0234', 'InnovateTech Solutions'),
    ('Michael Rodriguez', 'michael@digitalcraft.co', '+1-555-0345', 'Digital Craft Agency'),
    ('Sophie Anderson', 'sophie@futurebrands.com', '+1-555-0456', 'Future Brands')
  ) AS customer_data(name, email, phone, company)
  RETURNING id, name
)
INSERT INTO conversations (customer_id, user_id, content, type, created_at)
SELECT 
  c.id,
  (SELECT id FROM first_user),
  content,
  'note',
  NOW() - (INTERVAL '1 day' * days_ago)
FROM new_customers c
CROSS JOIN (
  VALUES
    -- InnovateTech Solutions
    ('Initial consultation - Client interested in AI-powered chatbot integration', 20),
    ('Discussed technical requirements and platform compatibility', 19),
    ('Presented chatbot workflow diagrams and user interaction models', 18),
    ('Client approved initial design concepts and feature set', 17),
    ('Started development sprint 1 - Core chatbot functionality', 15),
    ('Weekly progress update - 40% completion of core features', 10),
    ('Scheduled demo session for next week', 5),
    
    -- Digital Craft Agency
    ('Brand identity redesign kickoff meeting', 15),
    ('Collected brand assets and style preferences', 14),
    ('Presented initial mood boards and color palettes', 12),
    ('Client feedback: Prefer modern and minimalist direction', 10),
    ('Revised design concepts incorporating feedback', 8),
    ('Final presentation scheduled for next month', 6),
    ('Started work on brand guidelines document', 3),
    
    -- Future Brands
    ('E-commerce platform development consultation', 10),
    ('Discussed integration requirements with existing systems', 9),
    ('Presented technology stack recommendations', 8),
    ('Budget approval received for phase 1', 7),
    ('Started development environment setup', 5),
    ('Weekly status update - Infrastructure 60% complete', 2)
  ) AS conversation_data(content, days_ago)
WHERE 
  CASE 
    WHEN c.name = 'Emily Chen' AND days_ago > 15 THEN true
    WHEN c.name = 'Michael Rodriguez' AND days_ago BETWEEN 3 AND 15 THEN true
    WHEN c.name = 'Sophie Anderson' AND days_ago <= 10 THEN true
    ELSE false
  END;