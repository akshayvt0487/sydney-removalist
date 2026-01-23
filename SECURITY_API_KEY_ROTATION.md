# 🚨 CRITICAL: API Key Rotation Guide

## ⚠️ Security Alert: Exposed API Keys

**GitGuardian has detected exposed API keys in your GitHub repository.**

Your Google Maps API key and Supabase credentials were committed to the repository in the following files:
- `VERCEL_DEPLOYMENT.md` (line 23)
- `TROUBLESHOOTING.md` (line 33-36)

**These files have been sanitized**, but the keys are still visible in your Git history and need to be rotated immediately.

---

## 🔴 Immediate Actions Required

### 1. Rotate Google Maps API Key (CRITICAL)

**Step 1: Create a New API Key**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to **APIs & Services** → **Credentials**
4. Click **+ CREATE CREDENTIALS** → **API key**
5. Copy the new API key
6. Click **Edit API key** (pencil icon)
7. Under **Application restrictions**, select **HTTP referrers**
8. Add your domains:
   ```
   https://sydney-removalist.vercel.app/*
   https://sydneyremovalistpro.com.au/*
   http://localhost:3000/*
   ```
9. Under **API restrictions**, select **Restrict key**
10. Select only: **Maps JavaScript API**, **Places API**, **Geocoding API**
11. Click **Save**

**Step 2: Delete the Exposed Key**
1. In Google Cloud Console → Credentials
2. Find the old key ending in `...pvxpk`
3. Click the trash icon to delete it
4. Confirm deletion

**Step 3: Update Your Environment Variables**
- Update in Vercel (see below)
- Update in your local `.env.local` file
- **Do NOT commit to Git**

---

### 2. Rotate Supabase Anon Key (RECOMMENDED)

While Supabase anon keys are designed to be public, it's still best practice to rotate them after exposure.

**Note**: This is a more involved process. Only do this if you're concerned about the exposure.

**Step 1: Generate New JWT Secret**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Settings** → **API**
4. Click **Reset JWT Secret** (this will invalidate the old anon key)
5. ⚠️ **Warning**: This will log out all users!

**Step 2: Get New Anon Key**
1. After reset, copy the new `anon` key from the same page
2. Copy the new Service Role key (keep this secret!)

**Step 3: Update All Deployments**
- Update Vercel environment variables
- Update local `.env.local`
- Notify team members to update their local environments

**Alternative (Less Disruptive)**:
Since Supabase anon keys are meant to be public and are protected by RLS policies, you can skip this if your RLS policies are properly configured.

---

### 3. Update Environment Variables in Vercel

**Step 1: Go to Vercel Dashboard**
1. Visit https://vercel.com/dashboard
2. Select project: `sydney-removalist`
3. Click **Settings** → **Environment Variables**

**Step 2: Update Variables**

For **NEXT_PUBLIC_GOOGLE_MAPS_API_KEY**:
1. Find the existing variable
2. Click **Edit**
3. Replace with your NEW Google Maps API key
4. Select all environments: Production, Preview, Development
5. Click **Save**

For **NEXT_PUBLIC_SUPABASE_ANON_KEY** (if rotated):
1. Find the existing variable
2. Click **Edit**
3. Replace with your NEW Supabase anon key
4. Select all environments
5. Click **Save**

**Step 3: Redeploy**
1. Go to **Deployments** tab
2. Click the **...** menu on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete
5. Test your site to ensure everything works

---

### 4. Update Local Development

Update your local `.env.local` file:

```bash
# New Google Maps API Key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_new_google_maps_key_here

# New Supabase Anon Key (if rotated)
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_new_supabase_anon_key_here
```

**Remember**: Never commit `.env.local` to Git!

---

## ✅ What We've Fixed

The following files have been sanitized and now show only placeholders:
- ✅ `VERCEL_DEPLOYMENT.md` - Replaced actual keys with placeholders
- ✅ `TROUBLESHOOTING.md` - Replaced actual keys with placeholders
- ✅ `.env.example` - Already had safe placeholders

---

## 🔒 Prevent Future Leaks

### 1. Verify .gitignore

Check that `.gitignore` includes:
```
.env
.env.local
.env*.local
*.env
```

### 2. Use Git Secrets Scanner

Install and run locally:
```bash
# Install git-secrets
brew install git-secrets  # macOS
# or apt-get install git-secrets  # Linux

# Set up hooks
git secrets --install
git secrets --register-aws
```

### 3. Pre-commit Hooks

Add this to `.git/hooks/pre-commit`:
```bash
#!/bin/sh
if git diff --cached | grep -E "AIzaSy|eyJhbGci"; then
  echo "⚠️  WARNING: Potential API key detected!"
  echo "Please remove sensitive data before committing."
  exit 1
fi
```

### 4. Use Environment Variable Validation

The app already has validation in `lib/supabase/server.ts` that warns about missing variables.

---

## 📋 Security Checklist

After rotating keys, verify:

- [ ] Old Google Maps API key is **deleted** from Google Cloud Console
- [ ] New Google Maps API key has **domain restrictions** enabled
- [ ] New Google Maps API key has **API restrictions** (only Maps/Places/Geocoding)
- [ ] New key is added to **Vercel** for all environments
- [ ] Site is **redeployed** and working
- [ ] Local `.env.local` is **updated**
- [ ] Old keys are **removed from Git history** (see below)
- [ ] Team members are **notified** (if applicable)
- [ ] `.gitignore` includes all env files
- [ ] Documentation files contain **only placeholders**

---

## 🗑️ Remove Keys from Git History (Optional but Recommended)

**Warning**: This rewrites Git history. Only do this if the repository is private or you're the only developer.

### Option 1: Using BFG Repo-Cleaner (Recommended)

```bash
# Download BFG
# https://rtyley.github.io/bfg-repo-cleaner/

# Create a backup
git clone --mirror your-repo.git backup.git

# Remove the exposed keys
bfg --replace-text <(echo 'AIzaSyBDx371ql7wimWZ2wsRfc2-NQ7fd9pvxpk==>REMOVED')
bfg --replace-text <(echo 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpicXpqdGJqZGVwZ3dtbmJza2J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNTk0NDcsImV4cCI6MjA3OTczNTQ0N30.Zb_HDHhgx6R-n3njltUr_lxZnGB0bg2yoN82ztJ8v4g==>REMOVED')

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push (⚠️ Destructive!)
git push --force
```

### Option 2: Filter-Branch (Manual)

```bash
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch VERCEL_DEPLOYMENT.md TROUBLESHOOTING.md" \
  --prune-empty --tag-name-filter cat -- --all

git push --force --all
```

### Option 3: Start Fresh (Nuclear Option)

If the repository is new and has no important history:
1. Delete the GitHub repository
2. Create a new repository
3. Make an initial commit with sanitized files
4. Push to new repository

---

## 📞 Support & Resources

- **GitGuardian Guide**: https://docs.gitguardian.com/secrets-detection/detectors
- **Google Maps API Security**: https://developers.google.com/maps/api-security-best-practices
- **Supabase Security**: https://supabase.com/docs/guides/auth/auth-helpers
- **Git Secrets**: https://github.com/awslabs/git-secrets

---

## 🎯 Summary

**What was exposed:**
- ❌ Google Maps API Key: `AIzaSyBDx371ql7wimWZ2wsRfc2-NQ7fd9pvxpk`
- ⚠️ Supabase Anon Key (public by design, but still exposed)

**What you must do:**
1. ✅ **Rotate Google Maps API key** (CRITICAL - Do this first!)
2. ✅ **Delete old Google Maps API key**
3. ✅ **Restrict new key by domain and API**
4. ✅ **Update Vercel environment variables**
5. ✅ **Redeploy application**
6. ⚠️ **Consider rotating Supabase keys** (optional)
7. ⚠️ **Remove from Git history** (recommended)

**Status:**
- ✅ Documentation files sanitized
- ⏳ Waiting for API key rotation
- ⏳ Waiting for Vercel update
- ⏳ Waiting for redeployment

---

**Last Updated**: 2026-01-23
**Priority**: 🔴 CRITICAL - Action Required Immediately
