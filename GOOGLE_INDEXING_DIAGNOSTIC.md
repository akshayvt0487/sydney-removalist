# Google Search Console Indexing Diagnostic Report

**Date:** 2026-03-03
**Domain:** https://www.sydneyremovalist.com.au
**Status:** ⚠️ Not Indexed / Low Indexing

---

## Executive Summary

Your website has proper SEO configuration, but there are several potential reasons why Google Search Console may not be showing indexed pages. This report identifies the issues and provides actionable solutions.

---

## ✅ What's Working Correctly

### 1. **robots.txt** ✅
- **Location:** https://www.sydneyremovalist.com.au/robots.txt
- **Status:** Accessible and properly configured
- **Sitemap Reference:** Correctly points to sitemap.xml
- **Allows:** All public pages for indexing

### 2. **Sitemap** ✅
- **Location:** https://www.sydneyremovalist.com.au/sitemap.xml
- **Status:** Accessible and valid XML
- **Total URLs:** 93 pages
- **Format:** Proper Next.js dynamic sitemap
- **Includes:**
  - Homepage (priority: 1.0)
  - Service pages (8 services)
  - Location pages (70+ suburbs)
  - Interstate pages
  - Blog posts

### 3. **Meta Tags** ✅
- **Robots:** `index, follow` (correct)
- **Canonical URLs:** Properly set
- **Google Verification:** Present (`FDobe8EtgVDa05nNx5_A8WfjJ-OQ7IaFYDsiAS478AM`)
- **Open Graph:** Complete with proper images
- **Schema Markup:** Organization and Website schemas present

### 4. **Technical SEO** ✅
- No noindex tags found
- No blocking directives
- Proper URL structure
- Valid HTML structure
- Mobile-responsive

---

## ⚠️ Potential Issues & Solutions

### Issue #1: Site May Be Too New
**Problem:** Google can take 4-8 weeks to fully index new sites.

**Check:**
- When was the domain first deployed to production?
- When was the Google Search Console verification completed?

**Solution:**
- Be patient - indexing is gradual
- Continue creating quality content
- Build backlinks from reputable sources

---

### Issue #2: Google Search Console Not Properly Connected
**Problem:** The verification tag is present, but GSC might not be actively monitoring.

**Solution - Verify GSC Setup:**

1. **Check Property Type:**
   - Go to Google Search Console
   - Ensure you added the property as **Domain property** (sydneyremovalist.com.au)
   - OR as **URL prefix** (https://www.sydneyremovalist.com.au)

2. **Re-verify if needed:**
   - Go to Settings → Ownership verification
   - Ensure the HTML meta tag matches: `FDobe8EtgVDa05nNx5_A8WfjJ-OQ7IaFYDsiAS478AM`

3. **Check for verification errors:**
   - Look for any error messages in GSC dashboard

---

### Issue #3: Sitemap Not Submitted to GSC
**Problem:** Having a sitemap.xml file is not enough - you must submit it.

**Solution:**

1. Go to Google Search Console
2. Navigate to **Sitemaps** (left sidebar)
3. Enter: `sitemap.xml`
4. Click **Submit**
5. Wait 24-48 hours for Google to process

**Expected Result:**
- Status should change to "Success"
- "Discovered URLs" should show ~93 pages

---

### Issue #4: No Internal Linking
**Problem:** Google may not be discovering pages beyond the homepage.

**Current Status:** Need to verify
- Check if all pages link back to homepage
- Check if there's proper navigation menu
- Check if blog posts link to each other

**Solution:**
- Add breadcrumbs to all pages
- Ensure strong internal linking structure
- Add "Related Posts" section to blog posts
- Add sitemap HTML page for users

---

### Issue #5: Crawl Budget / Crawl Errors
**Problem:** Google may be encountering errors when crawling.

**Check in Google Search Console:**

1. Go to **Coverage** (or **Pages** in new GSC)
2. Look for:
   - Server errors (5xx)
   - Not found (404) errors
   - Redirect errors
   - Blocked by robots.txt

3. Go to **URL Inspection Tool**
   - Test homepage: https://www.sydneyremovalist.com.au
   - Check if "URL is on Google"
   - Look for any crawl errors

**Common Issues:**
- 404 errors on generated pages
- Slow server response time
- JavaScript rendering issues

---

### Issue #6: Duplicate Content (Future Date Issue)
**Problem:** Sitemap shows future dates (2026-03-03), which may confuse Google.

**Current sitemap lastModified:** 2026-03-03

**Solution:**
This is actually correct if today's date is 2026-03-03. Google handles future dates fine, but verify:
- Server timezone is correct
- Date formatting is consistent

---

### Issue #7: Missing Core Web Vitals
**Problem:** Poor performance may delay indexing.

**Check:**
1. Go to **Core Web Vitals** in GSC
2. Check for:
   - Largest Contentful Paint (LCP) - should be < 2.5s
   - First Input Delay (FID) - should be < 100ms
   - Cumulative Layout Shift (CLS) - should be < 0.1

**Solution if issues found:**
- Optimize images
- Reduce JavaScript bundle size
- Enable caching
- Use CDN

---

### Issue #8: No Backlinks
**Problem:** Brand new sites with no backlinks take longer to index.

**Check:**
- Any backlinks pointing to your site?
- Social media presence?
- Business directories (Google Business Profile, Yelp, etc.)?

**Solution:**
- Create Google Business Profile
- Submit to business directories (Yelp, Yellow Pages Australia, True Local)
- Share on social media
- Get reviews/testimonials with links

---

## 🔧 Immediate Action Items

### Priority 1: Verify Google Search Console Setup

1. **Log into Google Search Console:** https://search.google.com/search-console
2. **Select Property:** sydneyremovalist.com.au
3. **Check Dashboard:** Do you see "Property verified" status?
4. **Submit Sitemap:**
   - Go to Sitemaps section
   - Add sitemap: `sitemap.xml`
   - Click Submit

### Priority 2: Request Indexing

1. **Use URL Inspection Tool:**
   - Enter: https://www.sydneyremovalist.com.au
   - Click "Request Indexing"

2. **Request indexing for key pages:**
   - https://www.sydneyremovalist.com.au/services
   - https://www.sydneyremovalist.com.au/locations
   - https://www.sydneyremovalist.com.au/blog
   - https://www.sydneyremovalist.com.au/about

### Priority 3: Check Coverage Report

1. Go to **Coverage** (or **Pages**)
2. Check for errors:
   - Errors (red)
   - Valid with warnings (yellow)
   - Valid (green)
   - Excluded (gray)

3. If you see "Excluded" pages, check reasons:
   - "Discovered - currently not indexed" (normal for new sites)
   - "Crawled - currently not indexed" (low priority, add more content/links)
   - "Page with redirect" (fix redirect chains)
   - "Duplicate content" (set canonical URLs)

### Priority 4: Build Initial Backlinks

1. **Create Google Business Profile:**
   - https://business.google.com
   - Add your business details
   - Link to website

2. **Social Media:**
   - Create Facebook Business Page
   - Link to website in bio
   - Post regularly

3. **Business Directories:**
   - True Local: https://www.truelocal.com.au
   - Yellow Pages: https://www.yellowpages.com.au
   - HiPages (for tradies): https://hipages.com.au

---

## 📊 Monitoring & Tracking

### Daily Checks (First 2 Weeks)

1. **Google Search Console:**
   - Check for new indexed pages
   - Check for crawl errors
   - Monitor sitemap status

2. **Manual Google Search:**
   ```
   site:sydneyremovalist.com.au
   ```
   - See how many pages are indexed
   - Should gradually increase

### Weekly Checks

1. **Coverage Report:**
   - Track indexing progress
   - Fix any errors

2. **Performance Report:**
   - Check for search impressions (even if no clicks yet)
   - Monitor which pages are appearing

---

## 🎯 Expected Timeline

| Timeframe | Expected Result |
|-----------|----------------|
| 0-3 days | Homepage indexed |
| 1 week | 5-10 pages indexed (main pages) |
| 2 weeks | 20-30 pages indexed |
| 4 weeks | 50-70 pages indexed |
| 8 weeks | 80+ pages indexed |

**Note:** This assumes proper GSC setup and sitemap submission.

---

## 🔍 Diagnostic Checklist

Use this checklist to troubleshoot:

- [ ] Google Search Console property verified
- [ ] Sitemap submitted to GSC
- [ ] No errors in GSC Coverage report
- [ ] Homepage indexed (check via `site:sydneyremovalist.com.au`)
- [ ] No noindex tags on pages
- [ ] robots.txt allows Googlebot
- [ ] Proper canonical URLs set
- [ ] Google Business Profile created
- [ ] At least 3 backlinks from other sites
- [ ] Core Web Vitals passing
- [ ] Mobile-friendly test passing
- [ ] No 404 or 500 errors
- [ ] HTTPS working properly
- [ ] All key pages accessible (no login required)

---

## 📞 Next Steps

1. **Check Google Search Console immediately:**
   - Verify property is connected
   - Submit sitemap if not already done
   - Check Coverage report

2. **Request manual indexing:**
   - Use URL Inspection tool for homepage
   - Request indexing for 5-10 key pages

3. **Wait 48-72 hours:**
   - Allow Google time to crawl
   - Check for updates in GSC

4. **If still no results after 1 week:**
   - Run URL Inspection on homepage
   - Screenshot any errors
   - Check server logs for Googlebot visits
   - Consider hiring SEO specialist

---

## 🛠️ Technical Fixes (If Needed)

### If Pages Show "Crawled - currently not indexed"

**Add more content:**
- Minimum 300 words per page
- Unique content (not duplicate)
- Add more internal links

**Improve page value:**
- Add images with alt text
- Add structured data
- Improve page speed
- Add more external authority links

### If Pages Show "Discovered - currently not indexed"

**This is NORMAL for new sites.** It means:
- Google found the URL in sitemap
- Not yet crawled
- In queue for crawling
- Be patient (1-4 weeks typical)

**To speed up:**
- Request indexing via URL Inspection
- Add more internal links to these pages
- Build backlinks

---

## 📝 Common GSC Questions

**Q: Why does it say "0 pages indexed"?**
A: Either site is very new, or sitemap wasn't submitted, or GSC not properly connected.

**Q: How long does indexing take?**
A: 1-8 weeks for new sites, 1-3 days for established sites.

**Q: Should I request indexing for all 93 pages?**
A: No, only request for 5-10 key pages. Let Google discover the rest naturally.

**Q: What if I see "Page with redirect"?**
A: Normal if you redirect http → https or non-www → www. If too many redirects, fix redirect chains.

---

**Created:** 2026-03-03
**Last Updated:** 2026-03-03
**Status:** Pending GSC Verification
