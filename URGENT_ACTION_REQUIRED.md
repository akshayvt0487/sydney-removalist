# 🚨 URGENT ACTION REQUIRED - API Keys Exposed

## Critical Security Issue

**GitGuardian detected exposed API keys in your GitHub repository.**

Your Google Maps API key was found in committed files and is now visible in your public/private Git history.

---

## ⚡ Quick Fix (5 Minutes)

### Step 1: Rotate Google Maps API Key (NOW!)

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. Navigate to: **APIs & Services** → **Credentials**
3. Click: **+ CREATE CREDENTIALS** → **API key**
4. **Copy the new key** immediately
5. Click **Edit API key** (pencil icon next to new key)
6. Set restrictions:
   - **Application restrictions**: HTTP referrers
   - Add: `https://sydney-removalist.vercel.app/*`
   - Add: `http://localhost:3000/*`
   - **API restrictions**: Restrict key
   - Select only: Maps JavaScript API, Places API, Geocoding API
7. Click **SAVE**

### Step 2: Delete Old Key

1. Still in Google Cloud Console → Credentials
2. Find the old key ending in `...pvxpk`
3. Click **Delete** (trash icon)
4. Confirm deletion

### Step 3: Update Vercel

1. **Go to Vercel**: https://vercel.com/dashboard
2. Select your project: `sydney-removalist`
3. **Settings** → **Environment Variables**
4. Find: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
5. Click **Edit**
6. Paste your NEW key
7. Select: Production, Preview, Development
8. Click **Save**

### Step 4: Redeploy

1. Go to **Deployments** tab in Vercel
2. Click **...** on latest deployment
3. Click **Redeploy**
4. ✅ Done!

---

## ✅ What We've Already Fixed

- ✅ Sanitized `VERCEL_DEPLOYMENT.md` - removed actual API keys
- ✅ Sanitized `TROUBLESHOOTING.md` - removed actual API keys
- ✅ Enhanced `.gitignore` - prevents future leaks
- ✅ Created `.env.example` - safe template for developers
- ✅ Created security documentation

---

## 📋 Exposed Keys (Now Sanitized in Code)

These keys were found and removed from documentation:

| Key Type | Exposed Value (First/Last 10 chars) | Status |
|----------|-------------------------------------|--------|
| Google Maps | `AIzaSyBDx3...fd9pvxpk` | ⚠️ **ROTATE NOW** |
| Supabase Anon | `eyJhbGciOi...J8v4g` | ⚠️ Consider rotating |

---

## 📖 Detailed Instructions

For complete step-by-step instructions, see:
- **[SECURITY_API_KEY_ROTATION.md](./SECURITY_API_KEY_ROTATION.md)** - Full rotation guide

---

## ⏰ Timeline

**Immediate (Next 5 minutes)**:
1. Rotate Google Maps API key
2. Delete old key
3. Update Vercel
4. Redeploy

**Within 24 hours**:
1. Verify new key works on production
2. Update local `.env.local`
3. (Optional) Rotate Supabase keys
4. (Optional) Clean Git history

**Within 1 week**:
1. Set up git-secrets or similar scanner
2. Implement pre-commit hooks
3. Review all environment variables
4. Document key rotation schedule

---

## ❓ FAQ

**Q: Is my site broken right now?**
A: No, the exposed keys still work. But they could be abused by anyone who has access to your Git history.

**Q: Can I skip rotating the Supabase key?**
A: Yes. Supabase anon keys are designed to be public and are protected by Row Level Security (RLS) policies. However, it's still best practice to rotate them.

**Q: Will rotating keys break my site?**
A: Not if you follow the steps above. Update Vercel first, then redeploy, and everything will work seamlessly.

**Q: Do I need to tell my users?**
A: No. This is an internal security issue and doesn't affect user data or functionality.

**Q: What if I don't rotate the keys?**
A: Your Google Maps API could be abused by malicious actors, leading to unexpected charges on your Google Cloud account.

---

## 🆘 Need Help?

If you encounter any issues:
1. Check [SECURITY_API_KEY_ROTATION.md](./SECURITY_API_KEY_ROTATION.md) for detailed troubleshooting
2. Check [ADMIN_SETUP_GUIDE.md](./ADMIN_SETUP_GUIDE.md) for admin access issues
3. Contact your development team

---

## ✅ Completion Checklist

Mark these as you complete them:

- [ ] Created new Google Maps API key
- [ ] Restricted new key by domain
- [ ] Restricted new key by API
- [ ] Deleted old Google Maps API key
- [ ] Updated key in Vercel (all environments)
- [ ] Redeployed application
- [ ] Verified site works on production
- [ ] Updated local `.env.local`
- [ ] (Optional) Rotated Supabase keys
- [ ] (Optional) Cleaned Git history

---

**Priority**: 🔴 **CRITICAL**
**Time Required**: ⏱️ 5-10 minutes
**Impact if Ignored**: 💰 Potential unauthorized API usage and charges

---

**Last Updated**: 2026-01-23
