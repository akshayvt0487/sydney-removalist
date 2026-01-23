# Admin Setup Guide

## Issue: Getting "Access Denied" After Login?

If you're successfully logging in but being redirected with an "unauthorized" error or seeing an "Access Denied" page, it means your user account exists but doesn't have admin privileges yet.

## Quick Fix: Grant Admin Access

You need to add your user to the `user_roles` table in Supabase with the `admin` role.

### Method 1: Using Supabase Dashboard (Recommended)

1. **Go to Supabase Dashboard**
   - Visit https://supabase.com/dashboard
   - Select your project

2. **Navigate to Table Editor**
   - Click on "Table Editor" in the left sidebar
   - Find and click on the `user_roles` table

3. **Insert Admin Role**
   - Click "Insert" → "Insert row"
   - Fill in the fields:
     - `user_id`: Your user ID (see how to find it below)
     - `role`: `admin`
   - Click "Save"

4. **Refresh and Login**
   - Go back to your website
   - Clear your browser cache or open in incognito
   - Login again - you should now have access!

### Method 2: Using SQL Editor (Faster)

1. **Get Your Email**
   - Note the email address you used to sign up

2. **Run SQL in Supabase**
   - Go to "SQL Editor" in Supabase Dashboard
   - Click "New query"
   - Paste the following SQL (replace the email):

```sql
-- Replace 'your-email@example.com' with your actual email
INSERT INTO user_roles (user_id, role)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'your-email@example.com'),
  'admin'
);
```

3. **Run the Query**
   - Click "Run" or press Cmd/Ctrl + Enter
   - You should see "Success. No rows returned"

4. **Test Access**
   - Go to your website
   - Login with your credentials
   - You should now see the admin dashboard!

## How to Find Your User ID

### Option 1: From Supabase Dashboard
1. Go to "Authentication" → "Users" in Supabase
2. Find your email in the list
3. Copy the `id` column value

### Option 2: From Browser Console
1. Login to your site
2. Open browser DevTools (F12)
3. Go to "Console" tab
4. Run this command:
```javascript
(async () => {
  const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
  const supabase = createClient(
    'YOUR_SUPABASE_URL',
    'YOUR_SUPABASE_ANON_KEY'
  );
  const { data: { user } } = await supabase.auth.getUser();
  console.log('Your User ID:', user?.id);
})();
```

## Verify Admin Access

After adding the admin role, verify it was successful:

```sql
-- Check if your admin role was added
SELECT u.email, ur.role, ur.created_at
FROM auth.users u
JOIN user_roles ur ON u.id = ur.user_id
WHERE u.email = 'your-email@example.com';
```

You should see a row with `role = 'admin'`.

## Troubleshooting

### Still Getting "Access Denied"?

1. **Clear Browser Cache**
   - Clear cookies and cache for your site
   - Or try in incognito/private browsing mode

2. **Check the user_roles Table**
   - Verify the `user_id` matches your actual user ID
   - Verify `role` is exactly `'admin'` (lowercase)

3. **Check for Typos**
   - Email addresses are case-sensitive in some systems
   - Make sure your email exactly matches

4. **Verify RLS Policies**
   - The `user_roles` table should be readable by authenticated users
   - Run this to check:
   ```sql
   SELECT tablename, policyname, permissive, roles, cmd, qual
   FROM pg_policies
   WHERE tablename = 'user_roles';
   ```

### Database Error?

If you get a database error when inserting:

1. **Check if user_roles table exists**
   ```sql
   SELECT EXISTS (
     SELECT FROM information_schema.tables
     WHERE table_schema = 'public'
     AND table_name = 'user_roles'
   );
   ```

2. **If it doesn't exist, create it:**
   ```sql
   CREATE TABLE user_roles (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
     role TEXT NOT NULL,
     created_at TIMESTAMPTZ DEFAULT now(),
     UNIQUE(user_id, role)
   );

   -- Create index for faster lookups
   CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);
   CREATE INDEX idx_user_roles_role ON user_roles(role);
   ```

3. **Add RLS Policies** (see [SUPABASE_RLS_POLICIES.md](./SUPABASE_RLS_POLICIES.md))

## Adding Multiple Admins

To add multiple admin users:

```sql
-- Add multiple admins at once
INSERT INTO user_roles (user_id, role)
VALUES
  ((SELECT id FROM auth.users WHERE email = 'admin1@example.com'), 'admin'),
  ((SELECT id FROM auth.users WHERE email = 'admin2@example.com'), 'admin'),
  ((SELECT id FROM auth.users WHERE email = 'admin3@example.com'), 'admin')
ON CONFLICT (user_id, role) DO NOTHING;
```

## Revoking Admin Access

To remove admin privileges:

```sql
-- Remove admin role from a user
DELETE FROM user_roles
WHERE user_id = (
  SELECT id FROM auth.users WHERE email = 'user@example.com'
)
AND role = 'admin';
```

## Security Best Practices

1. **Limit Admin Users**
   - Only grant admin access to trusted users
   - Review admin users regularly

2. **Use Strong Passwords**
   - Require at least 12 characters
   - Use a mix of letters, numbers, and symbols

3. **Enable Email Verification**
   - In Supabase Dashboard → Authentication → Settings
   - Enable "Confirm email" option

4. **Monitor Admin Activity**
   - Regularly check form submissions
   - Review any unusual deletions or changes

5. **Implement RLS Policies**
   - Follow [SUPABASE_RLS_POLICIES.md](./SUPABASE_RLS_POLICIES.md)
   - Test policies thoroughly

## Production Checklist

Before going to production:

- [ ] Apply all RLS policies from [SUPABASE_RLS_POLICIES.md](./SUPABASE_RLS_POLICIES.md)
- [ ] Enable email verification in Supabase
- [ ] Test admin login/logout flow
- [ ] Test non-admin user cannot access admin panel
- [ ] Verify form submissions work correctly
- [ ] Set up database backups
- [ ] Document admin user emails (keep secure!)
- [ ] Set up monitoring/alerting

## Need Help?

- Check [SUPABASE_FIXES_SUMMARY.md](./SUPABASE_FIXES_SUMMARY.md) for overall setup
- Review [SUPABASE_RLS_POLICIES.md](./SUPABASE_RLS_POLICIES.md) for security policies
- Supabase Docs: https://supabase.com/docs
- Contact the development team

---

**Last Updated**: 2026-01-23
