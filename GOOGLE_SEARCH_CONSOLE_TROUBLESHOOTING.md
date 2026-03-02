# Google Search Console Troubleshooting Guide

**Date:** March 2, 2026
**Status:** Active Troubleshooting

---

## 🔴 Critical Issues to Fix

### Issue 1: Domain URL Inconsistency in Sitemap
**Problem:** Sitemap uses `https://www.sydneyremovalist.com.au` but your canonical domain should be consistent.

**Check Now:**
1. Go to your live site and check what domain appears in the browser
2. Check Google Search Console stats to see what domains Google knows about
3. Identify your PRIMARY domain (with or without www)

**Fix:** Both sitemap files need consistent URLs

---

### Issue 2: Missing Open Graph Images
**Problem:** Layout and pages reference OG images that don't exist:
- `/og-home.jpg`
- `/og-about.jpg` 
- `/og-services.jpg`
- `/og-contact.jpg`
- `/og-pricing.jpg`
- `/og-locations.jpg`
- `/og-interstate.jpg`

**Action:** Either:
- Option A: Create these image files in `/public` folder
- Option B: Use a single fallback image in metadata

**Quick Fix:** Update layout.tsx to not reference missing images

---

### Issue 3: Verify Site in Google Search Console
**Steps:**
1. Go to https://search.google.com/search-console/
2. Select your property (or add if not there)
3. Click "Sitemaps" in left menu
4. Submit your sitemap URL:
   - If no www: `https://sydneyremovalist.com.au/sitemap.xml`
   - If with www: `https://www.sydneyremovalist.com.au/sitemap.xml`

---

### Issue 4: Check Indexing Status
**Steps:**
1. In Google Search Console → Coverage tab
2. Check for:
   - Errors (red items)
   - Valid with warnings (yellow items)
   - Valid (green items)
3. Click on any errors to see details

**Common Issues:**
- `Crawled - currently not indexed`: Site might not meet quality requirements
- `Excluded by robots.txt`: Check your robots.txt
- `Duplicate, Google chose different canonical`: Multiple domain versions

---

### Issue 5: Verify Environment Variables on Vercel
**Your server needs these to function properly:**

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY  
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
```

**Verify:**
1. Go to Vercel Dashboard → your project
2. Settings → Environment Variables
3. Check all 3 are set for Production
4. If not set, add them and redeploy
5. After redeploy, test the site works

---

### Issue 6: Check robots.txt is Accessible
**Test:**
1. Visit: `https://sydneyremovalist.com.au/robots.txt`
2. Should show the robots.txt content (not 404)
3. Verify it ALLOWS Googlebot on public pages

**Current robots.txt status:** ✅ Configured to allow Google

---

### Issue 7: Verify Sitemap is Valid
**Test:**
1. Visit: `https://sydneyremovalist.com.au/sitemap.xml`
2. Should return valid XML
3. Check it has URLs from your site

**Current sitemap issues:**
- Has URLs with `https://www.sydneyremovalist.com.au` (inconsistent)
- Needs to match your actual domain

---

## 📋 Action Checklist

### Immediate Actions (Next 2 Hours)
- [ ] Verify your actual live domain (www or no-www)
- [ ] Check Vercel environment variables are set
- [ ] Test site loads: `https://sydneyremovalist.com.au/`
- [ ] Manually submit sitemap to Google Search Console

### Short-term Fixes (Today)
- [ ] Update sitemap to use consistent domain
- [ ] Create/fix missing OG images
- [ ] Verify all pages have proper titles/descriptions
- [ ] Check for any 404 errors on main pages

### Monitoring (Weekly)
- [ ] Check Google Search Console daily for 7 days
- [ ] Monitor "Coverage" tab for new errors
- [ ] Check "Performance" tab for impressions/clicks
- [ ] Review "Mobile Usability" warnings

---

## 🔍 Testing Commands

### Test Sitemap Validity
```bash
# Visit in browser
https://sydneyremovalist.com.au/sitemap.xml
```

### Test robots.txt
```bash
# Visit in browser  
https://sydneyremovalist.com.au/robots.txt
```

### Check Indexing Status
Use Google Search Console's URL Inspection tool:
1. Click "Inspect URL" at top
2. Enter your homepage URL
3. Check if "URL is on Google"

---

## 📞 When to Check Google Search Console

**What you should see:**
- Total clicks and impressions increasing
- Coverage showing mostly "Valid" URLs
- Mobile usability: No issues (or < 5%)
- Core Web Vitals: All showing good status

**Red flags:**
- Entire site showing "Excluded"
- Rapid drop in impressions
- All crawl errors appearing at once
- Manual actions listed

---

## 🔗 Important Links

- **Google Search Console:** https://search.google.com/search-console/
- **Your Sitemap:** https://sydneyremovalist.com.au/sitemap.xml
- **Your Robots.txt:** https://sydneyremovalist.com.au/robots.txt
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Schema Validation:** https://schema.org/validator

---

## 💡 Additional Investigation Needed

Before finalizing fixes, determine:

1. **What is your actual domain?**
   - Is it: `sydneyremovalist.com.au` or `www.sydneyremovalist.com.au`?
   
2. **Has Google ever indexed your site?**
   - Check Google Search Console history
   - Try: `site:sydneyremovalist.com.au` in Google
   
3. **Are there any security issues?**
   - Is the site HTTPS only? (Should be)
   - Check browser shows green lock icon
   
4. **Is the site currently deployed and live?**
   - Can you access: `https://sydneyremovalist.com.au/`
   - Does it load without errors?

---

## ⚡ Next Steps

1. **Determine your primary domain** (with/without www)
2. **Verify Vercel deployment** is working
3. **Submit sitemap** to Google Search Console
4. **Wait 24-48 hours** for Google to crawl
5. **Monitor** Google Search Console daily
6. **Check back** for any errors in Coverage tab

---

**Last Updated:** March 2, 2026
**Need Help?** Check TROUBLESHOOTING.md for general deployment issues
