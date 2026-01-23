# Vercel Deployment Guide

## ✅ Build Fix Applied

The build will now succeed on Vercel, but you **must** set environment variables for the app to function properly.

---

## 🔧 Required Steps

### 1. Set Environment Variables in Vercel

Go to your Vercel project settings:
1. Navigate to: **Settings** → **Environment Variables**
2. Add the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://zbqzjtbjdepgwmnbskbu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpicXpqdGJqZGVwZ3dtbmJza2J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNTk0NDcsImV4cCI6MjA3OTczNTQ0N30.Zb_HDHhgx6R-n3njltUr_lxZnGB0bg2yoN82ztJ8v4g

# Google Maps API Key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyBDx371ql7wimWZ2wsRfc2-NQ7fd9pvxpk
```

3. Set these for all environments:
   - ✅ **Production**
   - ✅ **Preview**
   - ✅ **Development**

### 2. Redeploy

After setting environment variables:
1. Go to **Deployments** tab
2. Click the **"..."** menu on the latest deployment
3. Select **"Redeploy"**
4. Check **"Use existing Build Cache"**
5. Click **"Redeploy"**

---

## 🎯 What Changed

### Build Fixes Applied:
1. ✅ Added environment variable fallbacks to all Supabase clients
2. ✅ Build will succeed even without env vars (uses placeholders)
3. ✅ At runtime, app will use actual environment variables from Vercel

### How It Works:
- **During Build:** Uses placeholder values to pass build checks
- **At Runtime:** Uses real Supabase credentials from environment variables
- **Result:** Build succeeds, app functions correctly in production

---

## ⚠️ Important Notes

### Without Environment Variables:
- ✅ Build will **succeed**
- ❌ App features will **not work** (forms, auth, database)
- ⚠️ You'll see "placeholder" values in logs

### With Environment Variables:
- ✅ Build will **succeed**
- ✅ App features will **work correctly**
- ✅ Supabase integration fully functional

---

## 🔍 Verification Steps

After redeployment with environment variables:

1. **Check Homepage:** Should load without errors
2. **Test Quote Form:** Submit a test quote
3. **Check Supabase:** Verify submission in database
4. **Test Admin Login:** Try accessing `/admin`
5. **Check Email Notifications:** Verify emails are sent

---

## 📊 Expected Deployment Output

After setting environment variables, your Vercel build should show:

```
✓ Compiled successfully in 15s
✓ Generating static pages (24/24)
✓ Finalizing page optimization

Route (app)
├ ○ / (Static)
├ ƒ /admin (Dynamic - Server-rendered)
├ ○ /auth (Static)
└ ... (other routes)

✓ Build completed successfully
```

---

## 🚨 Troubleshooting

### Build Still Failing?
1. Double-check environment variable names (exact match required)
2. Ensure no extra spaces in values
3. Clear build cache and redeploy

### App Not Working After Deployment?
1. Check Vercel deployment logs for errors
2. Verify environment variables are set correctly
3. Check browser console for client-side errors
4. Verify Supabase project is active

### Forms Not Submitting?
1. Check Supabase project status
2. Verify anon key has correct permissions
3. Check RLS policies (see `SUPABASE_RLS_POLICIES.md`)

---

## 📝 Post-Deployment Tasks

After successful deployment:

1. **Apply RLS Policies**
   - Follow instructions in `SUPABASE_RLS_POLICIES.md`
   - Secure your database tables

2. **Set Supabase Function Environment Variables**
   - `NOTIFICATION_EMAIL` - Email to receive notifications
   - `FROM_EMAIL` - Sender email address
   - `RESEND_API_KEY` - Resend API key for email sending

3. **Create Admin User**
   - Sign up through the app
   - Run SQL to add admin role:
   ```sql
   INSERT INTO user_roles (user_id, role)
   VALUES ('your-user-id', 'admin');
   ```

4. **Test All Features**
   - Quote form submission
   - Contact form submission
   - Admin dashboard access
   - Email notifications

---

## 🎉 Success Checklist

- [ ] Environment variables set in Vercel
- [ ] Redeployed with new variables
- [ ] Build completed successfully
- [ ] Homepage loads correctly
- [ ] Forms submit successfully
- [ ] Admin login works
- [ ] RLS policies applied
- [ ] Email notifications working
- [ ] Admin user created

---

**Deployment Status:** Ready ✅
**Last Updated:** 2026-01-23
**Next Step:** Set environment variables in Vercel and redeploy
