# Next.js Migration Checklist

This document outlines all files and patterns that need to be converted when migrating from React/Vite to Next.js.

## 1. Routing Changes

### Files to Convert
| Current File | Next.js Equivalent |
|--------------|-------------------|
| `src/App.tsx` (Routes) | `app/` folder structure |
| `src/pages/Home.tsx` | `app/page.tsx` |
| `src/pages/About.tsx` | `app/about/page.tsx` |
| `src/pages/Services.tsx` | `app/services/page.tsx` |
| `src/pages/ServiceDetail.tsx` | `app/services/[slug]/page.tsx` |
| `src/pages/Locations.tsx` | `app/locations/page.tsx` |
| `src/pages/SuburbPage.tsx` | `app/locations/[region]/[suburb]/page.tsx` |
| `src/pages/InterstatePage.tsx` | `app/interstate/[slug]/page.tsx` |
| `src/pages/Pricing.tsx` | `app/pricing/page.tsx` |
| `src/pages/Contact.tsx` | `app/contact/page.tsx` |
| `src/pages/Blog.tsx` | `app/blog/page.tsx` |
| `src/pages/BlogSingle.tsx` | `app/blog/[slug]/page.tsx` |
| `src/pages/Auth.tsx` | `app/auth/page.tsx` |
| `src/pages/AdminDashboard.tsx` | `app/admin/page.tsx` |
| `src/pages/ThankYou.tsx` | `app/thank-you/page.tsx` |
| `src/pages/PrivacyPolicy.tsx` | `app/privacy-policy/page.tsx` |
| `src/pages/TermsAndConditions.tsx` | `app/terms-and-conditions/page.tsx` |
| `src/pages/NotFound.tsx` | `app/not-found.tsx` |

### Code Pattern Changes
```tsx
// BEFORE (React Router)
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';

const navigate = useNavigate();
const { slug } = useParams();
const location = useLocation();

<Link to="/about">About</Link>
navigate('/contact');

// AFTER (Next.js)
import Link from 'next/link';
import { useRouter, useParams, usePathname } from 'next/navigation';

const router = useRouter();
const params = useParams();
const pathname = usePathname();

<Link href="/about">About</Link>
router.push('/contact');
```

## 2. Components Using Router Hooks

These components need router import updates:

- [ ] `src/components/Navbar.tsx` - Uses Link, useLocation
- [ ] `src/components/NavLink.tsx` - Uses Link, useLocation
- [ ] `src/components/LocationMegaMenu.tsx` - Uses Link
- [ ] `src/components/Footer.tsx` - Uses Link
- [ ] `src/components/QuoteFormOverlay.tsx` - Uses useNavigate
- [ ] `src/components/ScrollToTop.tsx` - Uses useLocation
- [ ] `src/components/ProtectedRoute.tsx` - Uses useNavigate
- [ ] `src/components/ServicesQuickAccess.tsx` - Uses Link
- [ ] `src/components/AreasWeService.tsx` - Uses Link
- [ ] `src/components/NearbyLocations.tsx` - Uses Link
- [ ] `src/components/LocationsGrid.tsx` - Uses Link
- [ ] `src/components/CTASection.tsx` - Uses Link
- [ ] `src/components/ServiceCard.tsx` - Uses Link

## 3. Environment Variables

| Current (Vite) | Next.js Equivalent |
|----------------|-------------------|
| `import.meta.env.VITE_SUPABASE_URL` | `process.env.NEXT_PUBLIC_SUPABASE_URL` |
| `import.meta.env.VITE_SUPABASE_ANON_KEY` | `process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| `import.meta.env.VITE_GOOGLE_PLACES_API_KEY` | `process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` |

### Files to Update
- [ ] `src/integrations/supabase/client.ts`
- [ ] `src/hooks/usePlacesAutocomplete.tsx`
- [ ] `.env` → `.env.local`

## 4. Image Handling

### Current Pattern (ES6 Imports)
```tsx
// BEFORE
import heroImage from '@/assets/hero-main.jpg';
<img src={heroImage} alt="Hero" />
```

### Next.js Options

**Option A: Move to public folder (recommended for this project)**
```tsx
// Move images to public/images/
<img src="/images/hero-main.jpg" alt="Hero" width={1920} height={1080} />
```

**Option B: Use next/image**
```tsx
import Image from 'next/image';
import heroImage from '@/assets/hero-main.jpg';

<Image src={heroImage} alt="Hero" width={1920} height={1080} />
```

### Image Files to Migrate
All files in `src/assets/`:
- [ ] booking-app-screen.jpg
- [ ] family-moving.jpg
- [ ] family-quote.jpg
- [ ] furniture-removal.jpg
- [ ] hero-main.jpg
- [ ] icon.png
- [ ] interstate-moving.jpg
- [ ] logo-dark.jpg
- [ ] logo.png
- [ ] moving-app-interface.jpg
- [ ] moving-app-screen.jpg
- [ ] moving-boxes.jpg
- [ ] moving-service-1.jpg
- [ ] moving-service-2.jpg
- [ ] moving-service-3.jpg
- [ ] moving-truck-loading.jpg
- [ ] office-moving.jpg
- [ ] packing-service.jpg
- [ ] phone-app.jpg
- [ ] removalist-hero.jpg
- [ ] residential-moving.jpg
- [ ] step-booking.jpg
- [ ] step-moving.jpg
- [ ] step-quote.jpg
- [ ] storage-solutions.jpg
- [ ] team-movers.jpg

### Images Already in public/
- [x] `public/images/blog/blog-best-time-move.jpg`
- [x] `public/images/blog/blog-moving-tips.jpg`
- [x] `public/images/blog/blog-removalist-costs.jpg`

## 5. SEO & Metadata

### Current Pattern (useMetadata hook)
```tsx
// Current implementation in src/lib/seo.ts
useMetadata({
  title: 'Page Title',
  description: 'Page description',
  path: '/page-path',
  keywords: ['keyword1', 'keyword2'],
});
```

### Next.js Pattern
```tsx
// Static metadata in each page.tsx
export const metadata = {
  title: 'Page Title',
  description: 'Page description',
  keywords: ['keyword1', 'keyword2'],
  openGraph: {
    title: 'Page Title',
    description: 'Page description',
    url: 'https://sydneyremovalist.com.au/page-path',
    siteName: 'Sydney Removalist',
    type: 'website',
  },
};

// OR dynamic metadata
export async function generateMetadata({ params }) {
  return {
    title: `${params.suburb} Removalists | Sydney Removalist`,
    description: `Professional removalist services in ${params.suburb}`,
  };
}
```

### Pages with SEO Metadata
- [x] Home - has useMetadata
- [x] About - has useMetadata
- [x] Services - has useMetadata
- [x] ServiceDetail - has dynamic useMetadata
- [x] Locations - has useMetadata
- [x] SuburbPage - has dynamic useMetadata
- [x] InterstatePage - has dynamic useMetadata
- [x] Pricing - has useMetadata
- [x] Contact - has useMetadata
- [x] Blog - has useMetadata
- [x] BlogSingle - has dynamic useMetadata with article schema
- [x] PrivacyPolicy - has useMetadata
- [x] TermsAndConditions - has useMetadata

## 6. External Scripts

### Google Maps/Places API

**Current (index.html)**
```html
<script src="https://maps.googleapis.com/maps/api/js?key=...&libraries=places"></script>
```

**Next.js (app/layout.tsx)**
```tsx
import Script from 'next/script';

<Script
  src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&libraries=places`}
  strategy="lazyOnload"
/>
```

### Trustindex Reviews Widget

**Current (loaded dynamically in TrustindexReviews.tsx)**
```tsx
// Script loaded via useEffect
```

**Next.js (same pattern works or use Script component)**
```tsx
import Script from 'next/script';

<Script
  src="https://cdn.trustindex.io/loader.js?eb23df3595a7201f18960935362"
  strategy="lazyOnload"
/>
```

## 7. Authentication Updates

### Files to Update
- [ ] `src/hooks/useAuth.tsx` - Add server/client boundary handling
- [ ] `src/components/ProtectedRoute.tsx` - Convert to Next.js middleware pattern

### Middleware Pattern (middleware.ts)
```tsx
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();
  return res;
}

export const config = {
  matcher: ['/admin/:path*'],
};
```

## 8. Layout Structure

### Create Root Layout (app/layout.tsx)
```tsx
import './globals.css';
import { Poppins } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata = {
  title: {
    default: 'Sydney Removalist | Professional Moving Services',
    template: '%s | Sydney Removalist',
  },
  description: 'Professional removalist services in Sydney...',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
        <Toaster />
        <Sonner />
      </body>
    </html>
  );
}
```

## 9. Data Files

### Static Data (no changes needed)
All data files in `src/data/` can be imported directly:
- `src/data/services.js` - Service definitions
- `src/data/pricing.js` - Pricing data
- `src/data/locations.js` - Location/suburb data
- `src/data/suburbs.js` - Additional suburb data
- `src/data/faq.js` - FAQ content
- `src/data/testimonials.js` - Testimonials
- `src/data/contact.js` - Contact information
- `src/data/blogs.ts` - Blog posts data

### Dynamic Data (form submissions)
Consider using Next.js Server Actions or Route Handlers for Supabase operations.

## 10. Static Files

### Current public/ folder structure
```
public/
├── favicon.ico
├── placeholder.svg
├── robots.txt (includes sitemap reference)
├── sitemap.xml
└── images/
    └── blog/
        ├── blog-best-time-move.jpg
        ├── blog-moving-tips.jpg
        └── blog-removalist-costs.jpg
```

### robots.txt Content
```
User-agent: *
Allow: /

Sitemap: https://sydneyremovalist.com.au/sitemap.xml
```

### sitemap.xml
Contains all routes including:
- Main pages (/, /about, /services, /pricing, /contact, /locations)
- Service detail pages (/services/[slug])
- Blog pages (/blog, /blog/[slug])
- Legal pages (/privacy-policy, /terms-and-conditions)

## 11. Files to Delete After Migration

- [ ] `index.html` - Replaced by app/layout.tsx
- [ ] `src/main.tsx` - Not needed
- [ ] `src/App.tsx` - Routes moved to app/ folder
- [ ] `src/App.css` - Merge into globals.css
- [ ] `vite.config.ts` - Replaced by next.config.js
- [ ] `src/lib/seo.ts` - Replace with Next.js metadata exports
- [ ] `src/components/ScrollToTop.tsx` - Next.js handles this automatically

## 12. New Files to Create

- [ ] `next.config.js` - Next.js configuration
- [ ] `middleware.ts` - Auth middleware
- [ ] `app/layout.tsx` - Root layout
- [ ] `app/globals.css` - Global styles (copy from index.css)

## 13. Package Changes

### Remove
- vite
- @vitejs/plugin-react-swc
- react-router-dom
- lovable-tagger

### Add
- next
- @supabase/auth-helpers-nextjs
- @supabase/ssr

### Keep (compatible with Next.js)
- All @radix-ui packages
- @tanstack/react-query
- tailwindcss
- shadcn/ui components
- lucide-react
- All form/validation packages

## 14. Configuration Files

### next.config.js
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [], // Add external image domains if needed
  },
};

module.exports = nextConfig;
```

### tsconfig.json updates
```json
{
  "compilerOptions": {
    "plugins": [{ "name": "next" }]
  }
}
```

## 15. Supabase Edge Functions

No changes needed - edge functions remain in `supabase/functions/`:
- `send-quote-notification/index.ts` - Email notification function

## Migration Order (Recommended)

1. **Setup** - Create Next.js project structure
2. **Config** - Copy tailwind.config.ts, postcss.config.js
3. **Styles** - Copy index.css to globals.css
4. **Static Assets** - Move images from src/assets to public/images
5. **Components** - Copy UI components, update router imports
6. **Data** - Copy data files (unchanged)
7. **Hooks** - Update hooks with new imports
8. **Pages** - Convert pages to app/ structure with metadata exports
9. **Auth** - Update authentication flow with middleware
10. **SEO** - Convert useMetadata to metadata exports
11. **Testing** - Test all routes and functionality
12. **Cleanup** - Remove old files

## Site Structure Summary

### Main Pages
- `/` - Home
- `/about` - About Us
- `/services` - Services overview
- `/services/[slug]` - Individual service pages
- `/locations` - Locations overview
- `/locations/[region]/[suburb]` - Suburb pages
- `/interstate/[slug]` - Interstate moving pages
- `/pricing` - Pricing
- `/contact` - Contact
- `/blog` - Blog listing
- `/blog/[slug]` - Individual blog posts
- `/auth` - Authentication
- `/admin` - Admin dashboard (protected)
- `/thank-you` - Thank you page
- `/privacy-policy` - Privacy Policy
- `/terms-and-conditions` - Terms and Conditions

### Services Available
1. Residential Moving (`/services/residential-moving`)
2. Office Relocation (`/services/office-relocation`)
3. Packing Services (`/services/packing-services`)
4. Furniture Assembly/Disassembly (`/services/furniture-assembly-disassembly`)
5. Storage Solutions (`/services/storage-solutions`)
6. Interstate Moves (`/services/interstate-moves`)

### Blog Posts
1. How Much Do Removalists Cost in Sydney 2024
2. Top 10 Moving Tips for a Stress-Free Relocation
3. Best Time to Move House in Sydney

## Notes

- The project uses Poppins font which can be loaded via `next/font/google`
- Tailwind config is already Next.js compatible
- Shadcn/ui components work identically in Next.js
- Supabase edge functions remain unchanged
- Data files (services.js, pricing.js, etc.) require no changes
- All images should use standard `<img>` tags with width/height/alt attributes
- All internal links use React Router `<Link>` component (convert to Next.js Link)
