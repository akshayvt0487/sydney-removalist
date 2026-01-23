# Supabase Row-Level Security (RLS) Policies

This document outlines the recommended Row-Level Security (RLS) policies that should be implemented in your Supabase database to secure your data.

## ⚠️ Important Security Notice

Currently, **RLS policies are NOT implemented** on the database tables. This means:
- Any authenticated user can read, insert, update, or delete data from all tables
- This is a **security vulnerability** that should be addressed before deploying to production

## Recommended RLS Policies

### Table: `form_submissions`

#### Policy 1: Public Insert Access
**Purpose:** Allow anyone to submit forms (quote requests and contact forms)

```sql
CREATE POLICY "Anyone can insert form submissions"
ON public.form_submissions
FOR INSERT
TO public
WITH CHECK (true);
```

#### Policy 2: Admin Read Access
**Purpose:** Only admins can read form submissions

```sql
CREATE POLICY "Admins can read all form submissions"
ON public.form_submissions
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  )
);
```

#### Policy 3: Admin Update Access
**Purpose:** Only admins can update form submissions (e.g., change status)

```sql
CREATE POLICY "Admins can update form submissions"
ON public.form_submissions
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  )
);
```

#### Policy 4: Admin Delete Access
**Purpose:** Only admins can delete form submissions

```sql
CREATE POLICY "Admins can delete form submissions"
ON public.form_submissions
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  )
);
```

---

### Table: `user_roles`

#### Policy 1: Admin Read Access
**Purpose:** Only admins can view user roles

```sql
CREATE POLICY "Admins can read user roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid()
    AND ur.role = 'admin'
  )
);
```

#### Policy 2: Users Can Read Their Own Role
**Purpose:** Users can check their own role (needed for frontend auth checks)

```sql
CREATE POLICY "Users can read their own role"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());
```

#### Policy 3: No Public Insert/Update/Delete
**Purpose:** Only database admins should manage roles (via SQL or Supabase Dashboard)

```sql
-- No INSERT, UPDATE, or DELETE policies for regular users
-- Roles should only be managed by superadmins via direct database access
```

---

### Table: `profiles`

#### Policy 1: Users Can Read Own Profile
**Purpose:** Users can read their own profile data

```sql
CREATE POLICY "Users can read own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (id = auth.uid());
```

#### Policy 2: Users Can Update Own Profile
**Purpose:** Users can update their own profile data

```sql
CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());
```

#### Policy 3: Auto-create Profile on Signup
**Purpose:** Allow automatic profile creation when a user signs up

```sql
CREATE POLICY "Users can insert own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (id = auth.uid());
```

#### Policy 4: Admins Can Read All Profiles
**Purpose:** Admins can view all user profiles

```sql
CREATE POLICY "Admins can read all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  )
);
```

---

## How to Apply These Policies

### Option 1: Via Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** > **Policies**
3. Select each table and click **"New Policy"**
4. Choose **"Create a policy from scratch"** or use templates
5. Paste the SQL for each policy

### Option 2: Via SQL Editor

1. Go to **SQL Editor** in your Supabase dashboard
2. Create a new query
3. Paste all the policies at once
4. Run the query

### Option 3: Via Migration File

Create a migration file in your Supabase project:

```bash
# In your supabase directory
supabase migration new add_rls_policies
```

Then add all the policies to the generated migration file.

---

## Enable RLS on Tables

Before applying policies, ensure RLS is enabled on all tables:

```sql
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
```

---

## Testing RLS Policies

After implementing RLS policies, test them by:

1. **Testing as Anonymous User:**
   - Try submitting a form (should work)
   - Try reading form submissions (should fail)

2. **Testing as Regular User:**
   - Try reading form submissions (should fail)
   - Try reading own profile (should work)
   - Try reading own role (should work)

3. **Testing as Admin User:**
   - Try reading all form submissions (should work)
   - Try updating form submissions (should work)
   - Try deleting form submissions (should work)
   - Try reading all profiles (should work)

---

## Environment Variables for Supabase Function

Add these environment variables to your Supabase Edge Function settings:

```bash
NOTIFICATION_EMAIL=akshay@dsigns.com.au
FROM_EMAIL=Sydney Removalist <onboarding@resend.dev>
RESEND_API_KEY=your_resend_api_key_here
```

### How to Set Environment Variables:

1. Go to **Edge Functions** in Supabase Dashboard
2. Click on `send-quote-notification`
3. Go to **Settings** tab
4. Add the environment variables under **Secrets**

---

## Additional Security Recommendations

### 1. Rate Limiting
Consider implementing rate limiting on form submissions to prevent spam:
- Use Supabase's built-in rate limiting
- Or implement application-level rate limiting

### 2. Email Verification
Ensure email verification is enabled for user signups:
- Go to **Authentication** > **Settings**
- Enable **"Confirm email"**

### 3. Password Requirements
Set strong password requirements:
- Minimum 8 characters
- Mix of uppercase, lowercase, numbers

### 4. API Key Rotation
Regularly rotate your Supabase anon key and service role key:
- Especially if they've been exposed in version control
- Update `.env.local` after rotation

### 5. Database Backups
Enable automatic daily backups:
- Go to **Database** > **Backups**
- Enable **Automatic Backups**

---

## Troubleshooting

### Issue: "Row-level security policy violation"
**Solution:** Check that the user has the correct role in the `user_roles` table

### Issue: Forms not submitting
**Solution:** Ensure the public insert policy is enabled on `form_submissions`

### Issue: Admin can't view submissions
**Solution:** Verify the admin user has an entry in `user_roles` with `role = 'admin'`

### Issue: Function not receiving environment variables
**Solution:**
1. Check that variables are set in Edge Function settings
2. Redeploy the function after adding variables

---

## Creating Your First Admin User

After applying RLS policies, create an admin user:

```sql
-- First, sign up a user through the application
-- Then, add them as admin using this SQL:

INSERT INTO public.user_roles (user_id, role)
VALUES ('USER_UUID_HERE', 'admin');

-- Replace USER_UUID_HERE with the actual user ID from auth.users table
```

---

## Monitoring and Logging

Enable query logging to monitor RLS policy effectiveness:
1. Go to **Database** > **Query Performance**
2. Monitor slow queries and policy violations
3. Review logs regularly for unauthorized access attempts

---

## Next Steps

1. ✅ Apply RLS policies using one of the methods above
2. ✅ Enable RLS on all tables
3. ✅ Create your first admin user
4. ✅ Test all policies thoroughly
5. ✅ Set up environment variables for Edge Function
6. ✅ Enable database backups
7. ✅ Set up monitoring and alerts

---

**Last Updated:** 2026-01-23
**Status:** Pending Implementation
**Priority:** HIGH (Security Critical)
