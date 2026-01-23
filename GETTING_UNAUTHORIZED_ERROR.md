# Getting "Unauthorized" or "Access Denied" Error?

## The Issue

You successfully logged in at `/auth` but are being redirected to an "Access Denied" page or seeing `?error=unauthorized` in the URL.

## Why This Happens

Your user account exists in Supabase, but it **doesn't have admin privileges** yet. The admin panel requires the `admin` role to be assigned to your user.

## Quick Fix (2 minutes)

### Option 1: Using Supabase SQL Editor (Fastest)

1. Open your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **SQL Editor**
4. Click **New query**
5. Copy and paste this SQL (replace with your email):

```sql
INSERT INTO user_roles (user_id, role)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'your-email@example.com'),
  'admin'
);
```

6. Click **Run**
7. Go back to your site and login again

### Option 2: Using Table Editor

1. Open your [Supabase Dashboard](https://supabase.com/dashboard)
2. Go to **Table Editor** → **user_roles**
3. Click **Insert row**
4. Fill in:
   - `user_id`: Find your user ID in the `auth.users` table
   - `role`: Enter `admin`
5. Click **Save**
6. Login again

## Detailed Instructions

For complete step-by-step instructions with troubleshooting, see:

📖 **[ADMIN_SETUP_GUIDE.md](./ADMIN_SETUP_GUIDE.md)**

## SQL Script

We've provided a ready-to-use SQL script at:

📄 **[supabase/sql/add_admin_user.sql](./supabase/sql/add_admin_user.sql)**

Just replace the email address and run it in Supabase SQL Editor.

## Verify It Worked

After adding the admin role, run this SQL to verify:

```sql
SELECT u.email, ur.role
FROM auth.users u
JOIN user_roles ur ON u.id = ur.user_id
WHERE u.email = 'your-email@example.com';
```

You should see a row with `role = 'admin'`.

## Still Having Issues?

1. Clear your browser cache or try incognito mode
2. Make sure you're using the exact email address
3. Check that the `user_roles` table exists
4. See [ADMIN_SETUP_GUIDE.md](./ADMIN_SETUP_GUIDE.md) for troubleshooting

## For Developers

- The admin check happens in [app/admin/page.tsx](./app/admin/page.tsx)
- It queries the `user_roles` table for a matching admin role
- If not found, it redirects to `/auth/access-denied`
- See [SUPABASE_FIXES_SUMMARY.md](./SUPABASE_FIXES_SUMMARY.md) for the full architecture

---

**Need more help?** Check the [ADMIN_SETUP_GUIDE.md](./ADMIN_SETUP_GUIDE.md) for detailed instructions.
