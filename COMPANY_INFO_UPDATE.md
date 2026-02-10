# How to Update Company Information

## Quick Guide

All company information is centralized in one file for easy updates. When you change your business details, update them in **one place** and they'll reflect across the entire website including SEO schema, meta tags, and content.

---

## 📍 Where to Update

### File: `lib/seo-schema.ts`

Find the `COMPANY_INFO` object (around line 3) and update your details:

```typescript
export const COMPANY_INFO = {
  name: 'Sydney Removalist Pro',  // ← Update your business name
  legalName: 'Sydney Removalist Pro Pty Ltd',  // ← Legal entity name
  url: 'https://sydneyremovalistpro.com.au',  // ← Your website URL
  logo: 'https://sydneyremovalistpro.com.au/logo.png',  // ← Logo URL
  description: 'Professional removalist services...',  // ← Business description
  phone: '+61 1300 237 808',  // ← Phone number
  email: 'info@sydneyremovalistpro.com.au',  // ← Email address
  address: {
    streetAddress: '123 Main Street',  // ← Street address
    addressLocality: 'Sydney',  // ← City
    addressRegion: 'NSW',  // ← State
    postalCode: '2000',  // ← Postcode
    addressCountry: 'AU'  // ← Country code
  },
  geo: {
    latitude: -33.8688,  // ← Latitude
    longitude: 151.2093  // ← Longitude
  },
  foundingDate: '2008',  // ← Year established
  priceRange: '$$',  // ← Price range ($, $$, $$$, $$$$)
  areaServed: 'Greater Sydney Area, NSW, Australia',  // ← Service area
  serviceArea: {
    type: 'GeoCircle',
    name: 'Greater Sydney',
    geoMidpoint: {
      latitude: -33.8688,  // ← Service area center
      longitude: 151.2093
    },
    geoRadius: 100000  // ← Service radius in meters (100km)
  }
};
```

---

## 📝 What to Update

### Essential Information

1. **Business Name** (`name`)
   - Display name shown everywhere
   - Example: "Sydney Removalist Pro"

2. **Legal Name** (`legalName`)
   - Registered business name
   - Example: "Sydney Removalist Pro Pty Ltd"

3. **Website URL** (`url`)
   - Your domain (without trailing slash)
   - Example: "https://sydneyremovalistpro.com.au"

4. **Logo URL** (`logo`)
   - Full URL to your logo image
   - Should be 600x60px for best results
   - Example: "https://yoursite.com/logo.png"

5. **Description** (`description`)
   - Brief company description
   - Used in schema and meta tags
   - Keep under 160 characters

### Contact Information

6. **Phone Number** (`phone`)
   - Include country code
   - Format: "+61 1300 237 808"

7. **Email** (`email`)
   - Main contact email
   - Example: "info@yourcompany.com"

### Address

8. **Street Address** (`address.streetAddress`)
   - Your physical address
   - Example: "123 Main Street"

9. **City** (`address.addressLocality`)
   - Example: "Sydney"

10. **State** (`address.addressRegion`)
    - Example: "NSW"

11. **Postcode** (`address.postalCode`)
    - Example: "2000"

### Location Coordinates

12. **Latitude & Longitude** (`geo`)
    - Find on Google Maps: Right-click location → "What's here?"
    - Example: -33.8688, 151.2093

### Business Details

13. **Founding Year** (`foundingDate`)
    - Year business established
    - Example: "2008"

14. **Price Range** (`priceRange`)
    - Use $ symbols
    - Options: "$", "$$", "$$$", "$$$$"

15. **Service Area** (`areaServed`, `serviceArea`)
    - Geographic area you serve
    - Set radius in meters (100000 = 100km)

---

## 🏢 Business Hours

### File: `lib/seo-schema.ts`

Find `generateLocalBusinessSchema()` function and update opening hours:

```typescript
openingHoursSpecification: [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '07:00',  // ← Opening time
    closes: '18:00'  // ← Closing time
  },
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: 'Saturday',
    opens: '08:00',
    closes: '16:00'
  },
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: 'Sunday',
    opens: '09:00',
    closes: '15:00'
  }
]
```

**Format:** Use 24-hour time (e.g., "18:00" for 6 PM)

---

## ⭐ Ratings & Reviews

Update your aggregate ratings:

```typescript
aggregateRating: {
  '@type': 'AggregateRating',
  ratingValue: '4.9',  // ← Average rating (out of 5)
  reviewCount: '500',  // ← Total number of reviews
  bestRating: '5',
  worstRating: '1'
}
```

---

## 🌐 Social Media

Update social media profiles in `generateOrganizationSchema()`:

```typescript
sameAs: [
  'https://www.facebook.com/yourpage',  // ← Facebook
  'https://www.instagram.com/yourprofile',  // ← Instagram
  'https://www.linkedin.com/company/yourcompany'  // ← LinkedIn
]
```

Add/remove platforms as needed.

---

## ✅ After Updating

### 1. Verify Changes

Run the development server:
```bash
npm run dev
```

Open http://localhost:3000 and:
- Check footer shows correct phone/email
- Inspect page source (View → Developer → View Source)
- Look for JSON-LD schema with your updated info

### 2. Test Schema

Visit: https://search.google.com/test/rich-results
- Enter your page URL
- Verify no errors
- Confirm your business details appear

### 3. Deploy

```bash
git add .
git commit -m "Update company information"
git push
```

Vercel will auto-deploy your changes.

---

## 🎯 Where This Information Appears

Your company info from `COMPANY_INFO` is used in:

| Location | Usage |
|----------|-------|
| **Schema Markup** | All JSON-LD structured data |
| **Meta Tags** | Site-wide meta information |
| **Footer** | Contact information |
| **Contact Page** | Business details |
| **About Page** | Company information |
| **Sitemap** | Domain information |
| **Robots.txt** | Host specification |
| **Open Graph** | Social media sharing |

**One update = Updates everywhere!** 🎉

---

## 📞 Need Help?

Can't find something? Common questions:

**Q: Where do I change the footer contact info?**
A: Update `COMPANY_INFO` in `lib/seo-schema.ts`, then check `components/Footer.tsx` imports it.

**Q: How do I update the logo?**
A: Replace `/public/logo.png` and update `COMPANY_INFO.logo` URL.

**Q: Where's the Google verification code?**
A: In `app/layout.tsx` → `metadata.verification.google`

**Q: How to change business hours in schema?**
A: In `lib/seo-schema.ts` → `generateLocalBusinessSchema()` function

---

**Last Updated**: 2026-01-23
**Pro Tip**: Keep a backup before making changes!
