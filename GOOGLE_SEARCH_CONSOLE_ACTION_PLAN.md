# 🚨 IMMEDIATE ACTION PLAN - Google Search Console Data Not Showing

**Generated:** March 2, 2026
**Severity:** High
**Estimated Fix Time:** 30-60 minutes

---

## 📊 Problem Summary

Your site is not showing data in Google Search Console because:
1. **Deployment may not be complete** - Vercel environment variables must be set
2. **OG images were missing** - Fixed ✅
3. **Metadata wasn't properly configured** - Fixed ✅
4. **Canonical URLs weren't set** - Fixed ✅
5. **Sitemap might not be submitted** - Action needed

---

## ⚡ CRITICAL: Do This First (5 Minutes)

### Step 1: Verify Site is Live
```bash
# Test these URLs in your browser:
https://www.sydneyremovalist.com.au/
https://www.sydneyremovalist.com.au/sitemap.xml
https://www.sydneyremovalist.com.au/robots.txt
```

**✅ What should happen:**
- Homepage loads without errors
- Sitemap shows XML content (not 404)
- robots.txt shows content

**❌ If you see errors:**
- 404 errors: Site not deployed to production
- Server errors: Deployment failed
- Blank page: Environment variables not set

### Step 2: Check Vercel Deployment
1. Go to: https://vercel.com/dashboard
2. Select project: `sydney-removalist`
3. Look for these in **Settings → Environment Variables**:
   - ✅ `NEXT_PUBLIC_SUPABASE_URL`
   - ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
   - ✅ `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

**If ANY are missing:**
1. Click **Add New** for each missing variable
2. Enter the values (ask dev team if unsure)
3. Set for: Production, Preview, Development
4. Go to **Deployments** tab
5. Click **...** on latest deploy
6. Select **Redeploy**
7. Check **"Use existing Build Cache"**
8. Click **Redeploy** and wait 2-3 minutes

### Step 3: Verify Site Works After Redeploy
1. Wait 2 minutes for deployment to complete
2. Clear browser cache (Ctrl+Shift+Delete)
3. Visit: https://www.sydneyremovalist.com.au/
4. Check it loads properly

---

## 🔍 Step 2: Verify Google Search Console Setup (10 Minutes)

### 2.1 Go to Google Search Console
https://search.google.com/search-console/

### 2.2 Select Your Property
- If not listed: Click **Add property**
- Enter domain: `https://www.sydneyremovalist.com.au`
- Follow verification steps if needed

### 2.3 Submit Sitemap
1. Left sidebar → **Sitemaps**
2. Enter: `https://www.sydneyremovalist.com.au/sitemap.xml`
3. Click **Submit**
4. Note the submission date/time

### 2.4 Check Coverage
1. Left sidebar → **Coverage**
2. Look for URL status:
   - 🟢 **Valid** - Good, these are indexed
   - 🟡 **Valid with warnings** - Check what warnings exist
   - 🔴 **Error** - Click to see issue
   - ⚪ **Excluded** - Click to see why

**If all are Excluded/Error:**
- Likely cause: Site couldn't be crawled
- Check if Vercel deployment completed
- Verify environment variables are set

### 2.5 Request Indexing
1. Top of page → Click **Inspect URL**
2. Enter: `https://www.sydneyremovalist.com.au/`
3. In results, click **Request Indexing** button
4. Wait for results (usually 1-2 minutes)

---

## 📈 Step 3: Monitor for Improvements (Next 24-48 Hours)

### What to Check Daily:
1. **Coverage Tab**
   - Should see green ✅ URLs increasing
   - Should see fewer red ❌ errors

2. **Performance Tab**  
   - Impressions: Should increase from 0
   - Clicks: Should gradually increase
   - Average position: Should improve

3. **URL Inspection**
   - Pick 5 random site URLs
   - Run inspection on each
   - Status should show: "URL is on Google"

### When You Should See Changes:
- **24 hours:** "URL is on Google" in Inspection tool
- **2-3 days:** Coverage showing URLs as Valid
- **5-7 days:** Impressions in Performance tab
- **2-4 weeks:** Clicks and ranking improvements

---

## 🔧 Recent Configuration Fixes Applied

### ✅ Fixed Issues:
1. **Metadata Configuration**
   - Fixed: metadataBase now uses production URL consistently
   - Fixed: Canonical URL properly set to production domain
   - Fixed: Google verification token in place

2. **Open Graph Images**
   - Changed from missing `/og-home.jpg`
   - Now uses: `/logo.png` (exists in project)
   - Prevents "missing image" crawl errors

3. **Robots Configuration**
   - ✅ Already correct: Allows Googlebot
   - ✅ Sitemap referenced correctly
   - ✅ No blocking of public pages

4. **Sitemap Generator**
   - ✅ Already configured with all pages
   - ✅ Uses correct domain: `https://www.sydneyremovalist.com.au`
   - ✅ Includes: services, locations, blog posts, interstate pages

---

## ❌ Common Issues & Solutions

### Issue: "URL is not on Google"
**Causes:**
- Site just submitted (wait 24+ hours)
- Environment variables not set  
- Site returns errors when crawled

**Solution:**
1. Check Vercel has all env vars set
2. Test site: `https://www.sydneyremovalist.com.au/`
3. Check for 404 errors
4. Re-submit URL after fixing

### Issue: "Excluded by robots.txt"
**Cause:** robots.txt blocks Googlebot

**Check:**
1. Visit: `https://www.sydneyremovalist.com.au/robots.txt`
2. Should show: `User-agent: Googlebot` → `Allow: /`
3. Current robots.txt: ✅ Already correct

### Issue: "Crawled - currently not indexed"
**Cause:** Page doesn't meet quality standards

**Solutions:**
1. Add more unique content
2. Improve page titles/descriptions
3. Ensure pages aren't duplicates
4. Check for thin content warnings

### Issue: "Server error" when crawling
**Cause:** Environment variables missing

**Solution:**
1. Verify all Vercel env vars are set
2. Redeploy to Vercel
3. Test site loads: `https://www.sydneyremovalist.com.au/`

---

## 📋 Pre-Flight Checklist

Before assuming indexing is working, verify:

- [ ] Vercel deployment is complete and showing "Ready"
- [ ] All 3 environment variables are set in Vercel
- [ ] Site loads at: `https://www.sydneyremovalist.com.au/`
- [ ] No 404 errors on homepage
- [ ] Sitemap accessible: `/sitemap.xml`
- [ ] Robots.txt accessible: `/robots.txt`
- [ ] Google Search Console account is active
- [ ] Sitemap submitted to GSC
- [ ] Domain verified in GSC
- [ ] Google verification token: `FDobe8EtgVDa05nNx5_A8WfjJ-OQ7IaFYDsiAS478AM`

---

## 🚀 Next Steps (Priority Order)

1. **Verify Vercel env vars are set** (BLOCKING - must do first)
2. **Test site loads** 
3. **Submit sitemap to GSC**
4. **Request indexing for homepage**
5. **Monitor Coverage tab daily**
6. **Check for URL errors in GSC**

---

## 📞 Quick Reference

| Task | Time | Impact |
|------|------|--------|
| Set Vercel env vars | 5 min | BLOCKING |
| Redeploy to Vercel | 2-3 min | CRITICAL |
| Submit sitemap | 1 min | HIGH |
| Request indexing | <1 min | MEDIUM |
| Monitor GSC | ongoing | TRACKING |

---

## 🔗 Important Links

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Google Search Console:** https://search.google.com/search-console/
- **Your Site:** https://www.sydneyremovalist.com.au
- **Your Sitemap:** https://www.sydneyremovalist.com.au/sitemap.xml
- **robots.txt:** https://www.sydneyremovalist.com.au/robots.txt

---

## 📝 Questions to Answer

Before searching for more fixes, verify:

1. **Is the site currently accessible?**
   - Can you load: https://www.sydneyremovalist.com.au/ in your browser?
   - Does it show content or errors?

2. **Are Vercel env vars set?**
   - Check: https://vercel.com/dashboard
   - Are all 3 NEXT_PUBLIC_* variables visible?

3. **Has sitemap been submitted to GSC?**
   - Check: https://search.google.com/search-console/
   - Go to Sitemaps section
   - Does it show your sitemap URL?

4. **What do you see in GSC Coverage?**
   - Green ✅ (Valid) - URLs indexed
   - Yellow ⚠️ (Warnings) - Some indexing issues
   - Red ❌ (Errors) - Unable to index
   - Gray ⚪ (Excluded) - Blocked or duplicate

**Answer these 4 questions first, then we can diagnose further.**

---

**Last Updated:** March 2, 2026
**Status:** Ready for Implementation
**Estimated Impact:** Site data should appear in GSC within 24-72 hours
