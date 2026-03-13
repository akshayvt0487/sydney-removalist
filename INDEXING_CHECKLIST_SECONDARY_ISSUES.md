# SEO & Indexing Audit Checklist - Secondary Issues

**After environment variables are set and site is working, check these items:**

---

## ✅ ALREADY VERIFIED & WORKING

These items have been checked and are configured correctly:

### Robots Configuration
- ✅ robots.txt allows Googlebot on public pages
- ✅ robots.txt blocks `/admin`, `/dashboard`, `/auth`, `/api/`
- ✅ Sitemap URL referenced in robots.txt
- ✅ Host directive points to canonical domain

### Sitemap
- ✅ sitemap.ts generates all ~93 pages
- ✅ URLs use canonical domain
- ✅ Includes static pages, services, locations, blog, interstate routes
- ✅ Last modified timestamps included
- ✅ Priority/frequency set appropriately

### Metadata & Canonicals
- ✅ All pages have single canonical tag
- ✅ Duplicate canonical tag issue fixed
- ✅ metadataBase uses production URL
- ✅ og:image URLs point to correct domain

### Redirects
- ✅ HTTP → HTTPS redirect (301)
- ✅ Non-www → www redirect (301)
- ✅ No redirect chains (single 301 per variation)
- ✅ /locations/ → /[region]/[suburb] redirect

### Page Generation
- ✅ Dynamic pages pre-generate at build time
- ✅ generateStaticParams() for all [slug] routes
- ✅ Static generation includes suburb, service, blog, interstate pages
- ✅ No missing imports preventing build

---

## 🔍 SECONDARY CHECKS - Verify After Env Vars Are Set

### 1. Test Page Loading After Fix

**Commands to run once deployment is live:**

```bash
# Test homepage
curl -I https://www.sydneyremovalist.com.au/
# Expected: 200 OK

# Test a suburb page
curl -I https://www.sydneyremovalist.com.au/northern-beaches/manly
# Expected: 200 OK

# Test service page
curl -I https://www.sydneyremovalist.com.au/services/residential-moving
# Expected: 200 OK

# Test blog page
curl -I https://www.sydneyremovalist.com.au/blog/removalist-costs-sydney
# Expected: 200 OK

# Test sitemap
curl -s https://www.sydneyremovalist.com.au/sitemap.xml | head -30
# Expected: XML with proper URLs

# Test robots.txt
curl -s https://www.sydneyremovalist.com.au/robots.txt
# Expected: Proper robots.txt content
```

### 2. Verify Page Content Renders

Check that pages actually render content (not just structure):

```bash
# Download and check homepage has content
curl -s https://www.sydneyremovalist.com.au/ | grep -i "sydney removalist"
# Should find content

# Check a suburb page loads data
curl -s https://www.sydneyremovalist.com.au/northern-beaches/manly | grep -i "manly"
# Should find suburb-specific content
```

### 3. Test in Google Search Console

**After site is live (24+ hours):**

1. Go to: https://search.google.com/search-console
2. Select property: `sydneyremovalist.com.au` or `www.sydneyremovalist.com.au`
3. Use URL Inspection tool
4. Test these URLs:
   - `https://www.sydneyremovalist.com.au/`
   - `https://www.sydneyremovalist.com.au/about`
   - `https://www.sydneyremovalist.com.au/services/residential-moving`
   - `https://www.sydneyremovalist.com.au/northern-beaches/manly`

**Expected results:**
- ✅ "URL is indexable"
- ✅ "Last crawled" shows recent date
- ✅ Content preview shows correct page content
- ✅ Mobile-friendly check passes

### 4. Monitor Sitemap Status

1. In Google Search Console
2. Go to: **Sitemaps** (left sidebar)
3. Check status of `https://www.sydneyremovalist.com.au/sitemap.xml`
4. Should show: ✅ **Status: Success**
5. Should show: **Discovered URLs: ~93** (approximately)

---

## 🔴 POTENTIAL SECONDARY ISSUES TO WATCH

### Issue: Pages Still Not Rendering

**Symptoms:**
- Pages return 200 but content is missing
- Google bot sees blank pages
- Maps don't load on location pages

**Checks:**
1. Verify all imports are correct in page files
2. Check that data fetches don't fail silently
3. Ensure error boundaries are present

**Relevant Files:**
- [app/[region]/[suburb]/page.tsx](app/%5Bregion%5D/%5Bsuburb%5D/page.tsx)
- [components/LocationMap.tsx](components/LocationMap.tsx)
- [lib/supabase/server.ts](lib/supabase/server.ts)

### Issue: Middleware Blocking Crawlers

**Symptoms:**
- URLs return 301/302 unexpectedly
- Wrong domain being served

**Verification:**
```bash
# Follow redirects and check final URL
curl -i -L https://sydneyremovalist.com.au/
# Should end at: https://www.sydneyremovalist.com.au/

# Check without www
curl -i -L http://sydneyremovalist.com.au/
# Should 301 to https://www.sydneyremovalist.com.au/
```

**File:** [middleware.ts](middleware.ts)

### Issue: Rate Limiting or Bot Detection

**Symptoms:**
- Pages load fine in browser
- Google bot gets 429 (Too Many Requests) errors
- User-agent blocking

**Checks:**
1. Search for rate limiting in Next.js/Vercel config
2. Check for bot detection libraries
3. Verify no user-agent filtering

**Expected:** None found (search to confirm)

### Issue: Incomplete Static Generation

**Symptoms:**
- Some pages missing from sitemap
- Build logs show generation failures

**Checks:**
At build time, verify page generation:

**Files to check:**
- [app/services/[slug]/page.tsx](app/services/%5Bslug%5D/page.tsx) - generateStaticParams()
- [app/blog/[slug]/page.tsx](app/blog/%5Bslug%5D/page.tsx) - generateStaticParams()
- [app/[region]/[suburb]/page.tsx](app/%5Bregion%5D/%5Bsuburb%5D/page.tsx) - generateStaticParams()
- [app/interstate/[slug]/page.tsx](app/interstate/%5Bslug%5D/page.tsx) - generateStaticParams()

Should all have `generateStaticParams()` that returns full list of params.

### Issue: OST (On-Demand ISR) Not Working

**Symptoms:**
- Old content served for suburb/service pages
- New data doesn't appear for 24+ hours

**File:** [next.config.ts](next.config.ts)
- Check ISR revalidation settings
- Verify revalidate value in dynamic route pages

---

## 📊 INDEXING MONITORING CHECKLIST

### Week 1 After Fix
- [ ] Test all page URLs in Google Search Console
- [ ] Verify no 5xx errors in GSC logs
- [ ] Check Coverage report status
- [ ] Monitor crawl stats graph

### Week 2 After Fix
- [ ] Expected: Some pages move from "Discovered" to "Indexed"
- [ ] Monitor which categories improving
- [ ] Request indexing for top pages if still not indexed

### Week 3-4 After Fix
- [ ] Should see 20+ pages indexed by now
- [ ] Monitor for any "Excluded" notices
- [ ] Check for Mobile Usability issues
- [ ] Verify Core Web Vitals

### Month 2-3 After Fix
- [ ] Target: 50+ pages indexed
- [ ] All suburb pages should be indexed
- [ ] Service pages indexed
- [ ] Blog posts indexed
- [ ] Monitor rankings for target keywords

---

## 🎯 EXPECTED BEFORE/AFTER

### BEFORE (Current State)
```
Indexed Pages: 4
Coverage Status: Mostly "Not Indexed"
Error Rate: High (missing dependencies)
Crawl Efficiency: Poor (can't load pages)
```

### AFTER (Expected After Env Vars Set)
```
Week 1: Still ~4 indexed (Google re-crawling)
Week 2-3: 10-20+ indexed (rapid growth)
Week 4: 30-50+ indexed (accelerating)
Month 2: 50-90+ indexed (most content)
```

---

## 🚨 CRITICAL PATH ERROR CHECKING

After deployment, check for these error signatures:

### Error 1: Supabase Connection Error
**Signals:**
- "Could not connect to Supabase"
- "Anon key is invalid"
- Database queries timeout

**Fix:** Verify env var values are correct (no typos, complete copy)

### Error 2: Missing Maps API Key
**Signals:**
- Maps component shows blank
- Console shows "API key not provided"
- Location pages missing visual content

**Fix:** Verify `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is set and valid

### Error 3: Build Failures
**Signals:**
- Vercel deployment fails
- Build log shows TypeScript errors
- Static generation fails

**Fix:** Check build logs in Vercel → ensure all dependencies installed

---

## 📋 FORM TO TRACK FIXES

Print this and check off as you go:

```
🔧 ENVIRONMENT VARIABLES
[ ] NEXT_PUBLIC_SUPABASE_URL set
[ ] NEXT_PUBLIC_SUPABASE_ANON_KEY set
[ ] NEXT_PUBLIC_GOOGLE_MAPS_API_KEY set
[ ] All 3 set for Production, Preview, Development

🚀 DEPLOYMENT
[ ] Vercel redeployed after setting env vars
[ ] Deployment successful (green checkmark)
[ ] Build time < 5 minutes
[ ] No build errors or warnings

✅ VERIFICATION
[ ] Homepage loads without errors
[ ] Suburb page loads (maps display)
[ ] Service page loads
[ ] Blog page loads
[ ] Contact form loads

🔍 SEARCH CONSOLE
[ ] Property added to GSC
[ ] URL Inspection shows "indexable"
[ ] Sitemap approved (Success status)
[ ] First 10-20 pages indexed within 1 week

📈 MONITORING
[ ] Coverage report improving
[ ] New pages appearing in results
[ ] No "Excluded" pages
[ ] Mobile friendly status good
```

---

## 🎯 SUCCESS CRITERIA

Your indexing is fixed when:

1. ✅ All environment variables set in Vercel
2. ✅ Site redeployed successfully
3. ✅ Pages return 200 status codes
4. ✅ Google Search Console shows pages as "indexable"
5. ✅ Coverage report shows improving numbers
6. ✅ Pages start appearing in search results

**Timeline:** 2-4 weeks to see significant indexing improvement

---

## 📞 TROUBLESHOOTING

**If pages still not indexing after 2 weeks:**

1. Check Vercel deployment logs for errors
2. Verify in Google Search Console:
   - Coverage report - any excluded pages?
   - URL Inspection - any crawl errors?
   - Mobile Usability - any issues?
3. Resubmit sitemap in Google Search Console
4. Request indexing for key pages manually

**If maps not loading on location pages:**

1. Verify Google Maps API key is valid
2. Check API key has JavaScript Maps API enabled
3. Verify API key restrictions allow your domain
4. Test: `curl` the page and check for Maps script tags

---

**Document Date:** 2026-03-13  
**Related Documents:**
- [INDEXING_CRISIS_ROOT_CAUSE_ANALYSIS.md](INDEXING_CRISIS_ROOT_CAUSE_ANALYSIS.md)
- [QUICK_FIXES_INDEXING.md](QUICK_FIXES_INDEXING.md)
- [SEO_HEALTH_CHECK.md](SEO_HEALTH_CHECK.md)
