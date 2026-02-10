# Quick Image Mapping Reference

## Page → Image Mapping

| Page/Component | Image File | Description |
|----------------|------------|-------------|
| **Homepage Hero** | `02.webp` | Team of 3 with National Removalist truck |
| **About Hero** | `03.webp` | Team of 3 posed professionally with truck |
| **Services Hero** | `08.webp` | Team loading truck with kitchen box |
| **Pricing Hero** | `010.webp` | Team moving furniture (couch) |
| **Contact Hero** | `05.webp` | Professional packing boxes in home |
| **Locations Hero** | `024.webp` | Team holding boxes with truck in background |
| **Interstate Hero** | `024.webp` | Team holding boxes with truck in background |
| **Blog Hero** | `05.webp` | Professional packing boxes in home |
| **Suburb Pages Hero** | `02.webp` | Team of 3 with National Removalist truck |
| **Suburb Pages Image 1** | `05.webp` | Professional packing boxes in home |
| **Suburb Pages Image 2** | `08.webp` | Team loading truck with kitchen box |
| **Interstate Slug Hero** | `024.webp` | Team holding boxes with truck in background |
| **Interstate Slug Feature** | `08.webp` | Team loading truck with kitchen box |

## Component → Image Mapping

| Component | Image File | Description |
|-----------|------------|-------------|
| **Service Card: Residential** | `015 copy.webp` | Team moving furniture up/down stairs |
| **Service Card: Office** | `010.webp` | Team moving furniture (couch) |
| **Service Card: Packing** | `05.webp` | Professional packing boxes in home |
| **Service Card: Furniture** | `010.webp` | Team moving furniture (couch) |
| **Service Card: Interstate** | `024.webp` | Team holding boxes with truck |
| **How It Works: Step 1** | `01.webp` | Removalist consulting with customers |
| **How It Works: Step 2** | `05.webp` | Professional packing boxes in home |
| **How It Works: Step 3** | `08.webp` | Team loading truck with kitchen box |
| **Why Pick Us** | `020.webp` | Happy team taking coffee break |
| **Stats Section** | `06.webp` | Professional in safety vest with truck |

## OG Image → Source Photo Mapping

| OG Image | Source Photo | Used For |
|----------|--------------|----------|
| `og-home.jpg` | `02.webp` | Homepage social shares |
| `og-about.jpg` | `03.webp` | About page social shares |
| `og-services.jpg` | `08.webp` | Services page social shares |
| `og-packing.jpg` | `05.webp` | Packing service pages |
| `og-furniture.jpg` | `010.webp` | Furniture service pages |
| `og-interstate.jpg` | `024.webp` | Interstate pages |
| `og-contact.jpg` | `016.webp` | Contact page shares |
| `og-residential.jpg` | `011.webp` | Residential service pages |
| `og-office.jpg` | `010.webp` | Office relocation pages |
| `og-pricing.jpg` | `06.webp` | Pricing page shares |
| `og-locations.jpg` | `02.webp` | Location pages shares |
| `og-default.jpg` | N/A (generated SVG) | Fallback for all other pages |

## Image Description Quick Reference

| File | Scene Description | Best Use |
|------|-------------------|----------|
| `01.webp` | Removalist consulting with couple in home | Quote/consultation scenarios |
| `02.webp` | Team of 3 women with truck (hero shot) | Main hero images, team shots |
| `03.webp` | Team of 3 men with truck (posed) | About page, team profiles |
| `05.webp` | Packing boxes in home interior | Packing services, preparation |
| `06.webp` | Professional in safety vest with truck | Safety, professionalism focus |
| `08.webp` | Loading truck with fragile kitchen box | Loading, transport, service in action |
| `010.webp` | Team moving blue couch | Furniture moving, heavy lifting |
| `011.webp` | Team moving dresser/furniture | Furniture assembly, residential |
| `015 copy.webp` | Team moving furniture on stairs | Difficult access, stairs, apartments |
| `016.webp` | Consultation with couple on couch | Customer service, quotes, planning |
| `018.webp` | Outdoor moving scene with furniture | Interstate, outdoor loading |
| `019.webp` | Loading boxes outdoors | General moving, outdoor work |
| `020.webp` | Team taking coffee break, smiling | Company culture, breaks, team happiness |
| `022.webp` | Team having lunch break | Team culture, humanizing |
| `024.webp` | Team of 3 holding boxes with truck | General moving, teamwork, boxes |

## Color Scheme Reference

All OG images use consistent branding:
- **Primary Color**: Navy Blue (`#001F3F`)
- **Accent Color**: Gold/Yellow (`#FFD700`)
- **Text**: White (`#FFFFFF`)
- **Overlay**: Dark navy gradient (0.5-0.95 opacity)

## Quick Update Guide

To replace any image:
1. Locate the file in table above
2. Update the import statement in the corresponding file
3. Use same WebP format for consistency
4. Verify image loads correctly
5. Check responsive behavior on mobile

Example:
```typescript
// Before
import heroImage from '@/assets/hero-main.jpg';

// After
import heroImage from '@/assets/removalist/02.webp';
```
