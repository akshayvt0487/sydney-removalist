# Troubleshooting Guide

## "Failed to Fetch" Error on Login/Admin

### Symptoms:
- Login page shows "Failed to fetch" error
- Forms submit but show network errors
- Admin dashboard won't load
- Browser console shows errors about Supabase connection

### Root Cause:
**Environment variables are not set in Vercel**

The app is using placeholder values (`https://placeholder.supabase.co`) instead of your real Supabase credentials.

---

## ✅ Solution: Set Environment Variables in Vercel

### Step 1: Go to Vercel Dashboard
1. Open your Vercel dashboard
2. Select your project: `sydney-removalist`
3. Click on **Settings** tab

### Step 2: Add Environment Variables
1. Click **Environment Variables** in the left sidebar
2. Add these **THREE** variables (get actual values from your services):

```bash
NEXT_PUBLIC_SUPABASE_URL
Value: [Get from Supabase Dashboard → Settings → API]

NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: [Get from Supabase Dashboard → Settings → API]

NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
Value: [Get from Google Cloud Console → Credentials]
```

**⚠️ Where to find these values:**
- **Supabase**: Dashboard → Project Settings → API → Project URL and anon/public key
- **Google Maps**: Google Cloud Console → APIs & Services → Credentials

### Step 3: Select Environments
For **each variable**, select ALL three environments:
- ✅ Production
- ✅ Preview
- ✅ Development

### Step 4: Redeploy
1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the **"..."** menu (three dots)
4. Click **"Redeploy"**
5. **IMPORTANT:** Check **"Use existing Build Cache"**
6. Click **"Redeploy"** button

---

## 🔍 How to Verify It's Fixed

### 1. Check Browser Console
After redeployment, open your site and check the browser console (F12):

**Before Fix:**
```
❌ Supabase environment variables not set!
Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
```

**After Fix:**
```
No error messages about Supabase
```

### 2. Test Login
1. Go to `/admin` or `/auth`
2. Try to log in
3. Should redirect to admin dashboard (or show "no account" error if you haven't signed up yet)

### 3. Test Forms
1. Go to homepage
2. Click "Get a Quote"
3. Fill out form
4. Submit
5. Should redirect to thank you page

---

## 📋 Quick Checklist

Before redeploying, verify:

- [ ] All 3 environment variables added
- [ ] Each variable set for Production, Preview, AND Development
- [ ] No extra spaces in variable names or values
- [ ] Variable names are EXACTLY as shown (case-sensitive)
- [ ] Values are copied completely (especially the long JWT token)

---

## 🐛 Still Having Issues?

### Issue: Environment variables are set but still getting errors

**Solution 1: Clear Build Cache**
1. Go to Deployments
2. Redeploy **without** "Use existing Build Cache"
3. This forces a fresh build with new environment variables

**Solution 2: Check Variable Names**
- Must be EXACTLY: `NEXT_PUBLIC_SUPABASE_URL`
- NOT: `SUPABASE_URL` (missing `NEXT_PUBLIC_`)
- NOT: `NEXT_PUBLIC_SUPABASE_URL ` (extra space)

**Solution 3: Verify in Deployment Logs**
1. Go to latest deployment
2. Click on it to see details
3. Look for "Environment Variables" section
4. Should show: "3 environment variables set"

---

## 🔐 Security Note

The `NEXT_PUBLIC_` prefix means these variables are **publicly accessible** in the browser. This is safe because:
- ✅ The anon key is designed to be public
- ✅ Row Level Security (RLS) protects your data
- ✅ This is the standard Supabase pattern

**Never expose:**
- ❌ Service role key
- ❌ Database password
- ❌ Any private API keys

---

## 📞 Common Error Messages

### "Failed to fetch"
**Cause:** Environment variables not set or placeholder values being used
**Fix:** Set environment variables and redeploy

### "Invalid API key"
**Cause:** Wrong anon key or missing `NEXT_PUBLIC_` prefix
**Fix:** Double-check the anon key value and variable name

### "Network request failed"
**Cause:** Supabase project is paused or deleted
**Fix:** Check Supabase dashboard, ensure project is active

### "CORS error"
**Cause:** Supabase project URL mismatch
**Fix:** Verify the URL matches your Supabase project exactly

---

## 🎯 Expected Behavior After Fix

### Login Page (/auth):
- Form loads without errors
- Can type email and password
- Submit attempts to authenticate with Supabase
- Success: Redirects to /admin
- Failure: Shows specific error (wrong password, no account, etc.)

### Admin Dashboard (/admin):
- Checks authentication
- Not logged in: Redirects to /auth
- Logged in: Shows dashboard with form submissions

### Forms (Quote/Contact):
- Form loads with Google Maps autocomplete
- Can fill out all fields
- Submit saves to Supabase database
- Redirects to thank you page
- Email notification sent

---

## 🚀 Next Steps After Environment Variables Are Set

1. **Test the Application**
   - Try logging in
   - Submit a quote form
   - Check if data appears in Supabase

2. **Apply RLS Policies**
   - See `SUPABASE_RLS_POLICIES.md`
   - Secure your database tables

3. **Create Admin User**
   - Sign up through the app
   - Add admin role via SQL

4. **Configure Edge Function**
   - Set `NOTIFICATION_EMAIL` in Supabase
   - Set `FROM_EMAIL` in Supabase
   - Set `RESEND_API_KEY` in Supabase

---

**Last Updated:** 2026-01-23
**Status:** Environment variables required for production
