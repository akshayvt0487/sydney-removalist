-- ============================================
-- ADD ADMIN USER TO SYDNEY REMOVALIST APP
-- ============================================
--
-- This script grants admin access to a user account.
-- Replace the email address with your actual email.
--
-- Usage:
-- 1. Login to your Supabase Dashboard
-- 2. Go to SQL Editor
-- 3. Create a new query
-- 4. Replace 'your-email@example.com' with your email
-- 5. Run the query
-- ============================================

-- Step 1: Check if the user exists
-- Run this first to verify the email is correct
SELECT id, email, created_at, email_confirmed_at
FROM auth.users
WHERE email = 'your-email@example.com';

-- If the query above returns no rows, the email doesn't exist.
-- Make sure you've signed up at /auth first!

-- ============================================

-- Step 2: Add admin role to the user
-- Replace 'your-email@example.com' with your actual email
INSERT INTO user_roles (user_id, role)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'your-email@example.com'),
  'admin'
)
ON CONFLICT (user_id, role) DO NOTHING;

-- If this succeeds, you should see: "Success. No rows returned"

-- ============================================

-- Step 3: Verify the admin role was added
-- This should show your email with role = 'admin'
SELECT
  u.id,
  u.email,
  ur.role,
  ur.created_at as role_granted_at
FROM auth.users u
JOIN user_roles ur ON u.id = ur.user_id
WHERE u.email = 'your-email@example.com';

-- ============================================
-- ADDING MULTIPLE ADMINS
-- ============================================
-- If you need to add multiple admin users at once:

/*
INSERT INTO user_roles (user_id, role)
VALUES
  ((SELECT id FROM auth.users WHERE email = 'admin1@example.com'), 'admin'),
  ((SELECT id FROM auth.users WHERE email = 'admin2@example.com'), 'admin'),
  ((SELECT id FROM auth.users WHERE email = 'admin3@example.com'), 'admin')
ON CONFLICT (user_id, role) DO NOTHING;
*/

-- ============================================
-- LIST ALL ADMIN USERS
-- ============================================
-- View all users with admin role:

SELECT
  u.id,
  u.email,
  u.created_at as user_created_at,
  u.last_sign_in_at,
  ur.role,
  ur.created_at as role_granted_at
FROM auth.users u
JOIN user_roles ur ON u.id = ur.user_id
WHERE ur.role = 'admin'
ORDER BY ur.created_at DESC;

-- ============================================
-- REMOVE ADMIN ACCESS (if needed)
-- ============================================
-- To revoke admin access from a user:

/*
DELETE FROM user_roles
WHERE user_id = (SELECT id FROM auth.users WHERE email = 'user@example.com')
AND role = 'admin';
*/

-- ============================================
-- TROUBLESHOOTING
-- ============================================

-- Check if user_roles table exists:
-- SELECT EXISTS (
--   SELECT FROM information_schema.tables
--   WHERE table_schema = 'public'
--   AND table_name = 'user_roles'
-- );

-- If false, create the table first:
-- See SUPABASE_RLS_POLICIES.md for the table creation SQL

-- ============================================
