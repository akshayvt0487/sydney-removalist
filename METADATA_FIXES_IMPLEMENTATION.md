# Specific Implementation Guide - Fix Meta Descriptions & Titles

**Priority:** CRITICAL - Will fix Google indexing issues
**Files to Edit:** 3 main files
**Est. Time:** 1-2 hours
**Impact:** Pages will become indexable

---

## Overview

You have **templated metadata** on location and service pages causing Google to see duplicate content and deprioritize indexing. Here's exactly what to fix:

---

## 🎯 Fix 1: Location Page Titles - ADD BRAND NAME

**File:** [app/locations/\[region\]/\[suburb\]/page.tsx](app/locations/[region]/[suburb]/page.tsx)

**Line:** Around 52

**Current (WRONG):**
```tsx
title: `Removalist ${suburbDetails.name} | Professional Moving Services ${suburbDetails.region}`,
```

**Change to (CORRECT):**
```tsx
title: `Removalist in ${suburbDetails.name} | Sydney Removalist | Professional Moving`,
```

**Why:** 
- Adds brand name "Sydney Removalist" (better for SERP visibility)
- More natural phrasing ("in ${name}" instead of just "${name}")
- Shows professional branding

---

## 🎯 Fix 2: Location Page Descriptions - MAKE UNIQUE

**File:** [app/locations/\[region\]/\[suburb\]/page.tsx](app/locations/[region]/[suburb]/page.tsx)

**Current (WRONG - Same for all 100+ location pages):**
```tsx
description: `Professional removalist in ${suburbDetails.name}, ${suburbDetails.region}. Trusted moving services with experienced team, competitive rates, and full insurance. Get your free quote today!`,
```

**This is the BIGGEST problem.** All location pages have identical descriptions, signaling duplicate content to Google.

### Solution: Use Suburb Data

First, check [data/suburbs.ts](data/suburbs.ts) to add unique descriptions per suburb:

**Update data/suburbs.ts:**

Add `description` field to each suburb/region:

```typescript
export type RegionCategory = {
  id: string;
  name: string;
  slug: string;
  suburbs: Suburb[];
  description?: string;  // Add this
};

export type Suburb = {
  name: string;
  slug: string;
  description?: string;  // Add this
};

// Then in regionCategories, add descriptions:
export const regionCategories: RegionCategory[] = [
  {
    id: 'western-sydney',
    name: 'Western Sydney',
    slug: 'western-sydney',
    description: 'Expert removalist services across West Sydney including Parramatta, Penrith, and Campbelltown. Fast quote, insured moves, friendly service.',
    suburbs: [
      { name: 'Parramatta', slug: 'parramatta', description: 'Professional removalist in Parramatta. Family and business moves at competitive rates. Same-day quotes, free consultation.' },
      { name: 'Penrith', slug: 'penrith', description: 'Removalist services in Penrith. Expert handling of western Sydney moves. Experienced team, insured, 30-minute response.' },
      // ... more suburbs
    ]
  },
  // ... more regions
];
```

**Then update location page.tsx description:**

```tsx
description: suburbDetails.description 
  || `Professional removalist in ${suburbDetails.name}, ${suburbDetails.region}. Trusted moving services with experienced team, competitive rates, and full insurance. Get your free quote today!`,
```

**Better approach - Create custom descriptions:**

If updating data/suburbs.ts is complex, add descriptions to specific high-value suburbs in page.tsx:

```tsx
// Add this mapping after suburbDetails
const customDescriptions: Record<string, string> = {
  'rosebery': 'Professional removalist in Rosebery. Expert inner-city moves for apartments and townhouses. Fast, reliable, fully insured. Get a free quote today.',
  'north-sydney': 'Removalist in North Sydney serving the North Shore. Commercial and residential moves. Experienced team, competitive rates, same-day quotes available.',
  'parramatta': 'Removalist services in Parramatta for West Sydney. Family and business relocations with experienced movers. Free quote, fully insured, professional service.',
  'manly': 'Removalist to Manly and Northern Beaches. Expert beach suburb moving services. Careful handling, experienced team, fully insured moves.',
  'bondi': 'Removalist in Bondi, Eastern Suburbs. Professional apartment and house moving. Experienced in inner-city relocations, fully insured, same-day quotes.',
  // ... Add for all major suburbs
};

// Then use it:
const customDescription = customDescriptions[suburb];
const description = customDescription 
  || `Professional removalist in ${suburbDetails.name}, ${suburbDetails.region}. Trusted moving services with experienced team, competitive rates, and full insurance. Get your free quote today!`;

// In metadata:
description: description,
```

---

## 🎯 Fix 3: Service Page Titles - ADD BRAND NAME

**File:** [app/services/\[slug\]/page.tsx](app/services/[slug]/page.tsx)

**Line:** Around 27

**Current (WRONG):**
```tsx
title: `${service.title} Sydney | Professional ${service.title} Services`,
```

**Change to (CORRECT):**
```tsx
title: `${service.title} Sydney | Sydney Removalist | Professional Moving Services`,
```

**Example results:**
- ✅ "Residential Moving Sydney | Sydney Removalist | Professional Moving Services"
- ✅ "Office Relocation Sydney | Sydney Removalist | Professional Moving Services"

---

## 🎯 Fix 4: Service Page Descriptions - ENHANCE WITH COMPANY INFO

**File:** [app/services/\[slug\]/page.tsx](app/services/[slug]/page.tsx)

**Current (OKAY but weak):**
```tsx
description: service.shortDescription,
```

**Enhance with company credibility:**
```tsx
description: `${service.shortDescription} Over 225+ reviews, 15+ years experience in Sydney. Fully insured, professional team, competitive rates.`,
```

**Example result:**
```
"Complete house moving services for all property sizes across Sydney and beyond. Over 225+ reviews, 15+ years experience in Sydney. Fully insured, professional team, competitive rates."
```

---

## 🎯 Fix 5: Homepage Description - FIX CLAIM MISMATCH

**File:** [lib/seo-schema.tsx](lib/seo-schema.tsx)

**Current (WRONG - claims don't match page):**
```tsx
description: 'Professional removalist services in Sydney. Trusted moving company with 15+ years experience, serving all Sydney suburbs and interstate moves.',
```

**Change to (CORRECT - matching actual page claims):**
```tsx
description: 'Professional removalist services in Sydney with 225+ customer reviews. 15+ years experience moving families and businesses. Trusted by thousands across all Sydney suburbs and interstate. Get a free quote today.',
```

**Why:** The meta description currently says "10000+ happy moves" but your homepage shows "225+ reviews". Google will rewrite mismatched descriptions, so make them accurate.

---

## 🎯 Fix 6: Fix OG Images (Optional but Recommended)

**Files:**
- [app/locations/\[region\]/\[suburb\]/page.tsx](app/locations/[region]/[suburb]/page.tsx) - Line ~68
- [app/services/\[slug\]/page.tsx](app/services/[slug]/page.tsx) - Line ~40

**Current:**
```tsx
url: '/og-locations.jpg',  // doesn't exist
url: '/og-services.jpg',   // doesn't exist
```

**Change to:**
```tsx
url: `${COMPANY_INFO.url}/logo.png`,  // use real image
width: 600,
height: 60,
```

Or create actual OG images (1200x630px) and replace.

---

## 📋 QUICK CHECKLIST - Copy/Paste Ready

### Location Pages ([app/locations/\[region\]/\[suburb\]/page.tsx](app/locations/[region]/[suburb]/page.tsx))

**Replace this:**
```tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { suburb } = await params;
  const suburbDetails = getSuburbDetails(suburb);

  if (!suburbDetails) {
    return {
      title: 'Location Not Found',
    };
  }

  return {
    title: `Removalist ${suburbDetails.name} | Professional Moving Services ${suburbDetails.region}`,
    description: `Professional removalist in ${suburbDetails.name}, ${suburbDetails.region}. Trusted moving services with experienced team, competitive rates, and full insurance. Get your free quote today!`,
```

**With this:**
```tsx
// Custom descriptions for major suburbs
const customDescriptions: Record<string, string> = {
  'rosebery': 'Professional removalist in Rosebery. Expert inner-city apartment moves. Fast, reliable, fully insured. Free quote available now.',
  'north-sydney': 'Removalist in North Sydney. Expert North Shore moving services. Commercial & residential, competitive rates, same-day quotes.',
  'parramatta': 'Removalist services in Parramatta. West Sydney moves with experienced team. Residential & business relocations, fully insured.',
  'manly': 'Removalist to Manly and Northern Beaches. Expert beach suburb moves. Careful packing, experienced team, fully insured.',
  'bondi': 'Removalist in Bondi, Eastern Suburbs. Professional apartment moves. Inner-city specialist, fully insured, same-day quotes.',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { suburb } = await params;
  const suburbDetails = getSuburbDetails(suburb);

  if (!suburbDetails) {
    return {
      title: 'Location Not Found',
    };
  }

  const customDescription = customDescriptions[suburb];
  const description = customDescription 
    || `Professional removalist in ${suburbDetails.name}, ${suburbDetails.region}. Trusted moving services with experienced team, competitive rates, and full insurance. Get your free quote today!`;

  return {
    title: `Removalist in ${suburbDetails.name} | Sydney Removalist | Professional Moving`,
    description: description,
```

---

### Service Pages ([app/services/\[slug\]/page.tsx](app/services/[slug]/page.tsx))

**Replace this:**
```tsx
return {
  title: `${service.title} Sydney | Professional ${service.title} Services`,
  description: service.shortDescription,
```

**With this:**
```tsx
return {
  title: `${service.title} Sydney | Sydney Removalist | Professional Moving Services`,
  description: `${service.shortDescription} Over 225+ reviews, 15+ years experience in Sydney. Fully insured, professional team, competitive rates.`,
```

---

### Homepage ([lib/seo-schema.tsx](lib/seo-schema.tsx))

**Replace this:**
```tsx
description: 'Professional removalist services in Sydney. Trusted moving company with 15+ years experience, serving all Sydney suburbs and interstate moves.',
```

**With this:**
```tsx
description: 'Professional removalist services in Sydney with 225+ customer reviews. 15+ years experience moving families and businesses. Trusted by thousands across all Sydney suburbs and interstate. Get a free quote today.',
```

---

## ✅ After Changes

1. **Commit and push to GitHub**
   ```bash
   git add .
   git commit -m "Fix: Enhance metadata with unique descriptions and brand names

   - Added brand name to location and service page titles
   - Customized location descriptions for major suburbs
   - Enhanced service descriptions with company credibility
   - Fixed homepage description accuracy
   - Fixes Google indexing issues and improves SERP appearance"
   git push
   ```

2. **Wait 2-3 minutes for Vercel redeploy**

3. **Test in Google Search Console**
   - Go to: https://search.google.com/search-console/
   - Inspect updated URLs
   - Click "Request Indexing" for updated pages
   - Should crawl within hours

4. **Monitor**
   - Check Coverage tab daily
   - Watch indexed page count increase
   - Indexed pages should jump from 3 to 20+

---

## 📊 Expected Impact

| Metric | Before | After | Timeline |
|--------|--------|-------|----------|
| Pages Indexed | 3 | 20+ | 3-5 days |
| Crawl Errors | Duplicate content signals | Unique content | 1-2 weeks |
| Search Results | Low CTR from generic snippets | High CTR from unique snippets | 2-4 weeks |
| Impressions | 0 | 100+ | 1-2 weeks |

---

## 🆘 If You Get Stuck

The changes are straightforward find-and-replace operations. Key points:

1. **Location pages:** Title + Description need fixes
2. **Service pages:** Title + Description need fixes  
3. **Homepage:** Description needs accuracy fix
4. **All:** Use actual suburb/service name in descriptions

Test each URL in Search Console after deploying to confirm changes are live.

