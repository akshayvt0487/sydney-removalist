# Open Graph Images Required

This document lists all the Open Graph (OG) images that need to be created for the Sydney Removalist website. All OG images should be **1200x630 pixels** (the recommended size for Facebook and most social media platforms).

## Required OG Images

### Static Pages

| Image File | Dimensions | Used On | Description |
|------------|------------|---------|-------------|
| `/public/og-home.jpg` | 1200x630 | Home page (`/`) | Main removalist service image featuring trucks and team |
| `/public/og-about.jpg` | 1200x630 | About page (`/about`) | Team photo or company branding |
| `/public/og-services.jpg` | 1200x630 | Services page (`/services`) + individual service pages (`/services/*`) | Professional moving services imagery |
| `/public/og-contact.jpg` | 1200x630 | Contact page (`/contact`) | Contact/customer service themed image |
| `/public/og-pricing.jpg` | 1200x630 | Pricing page (`/pricing`) | Pricing/quote related imagery |
| `/public/og-locations.jpg` | 1200x630 | Locations page (`/locations`) + suburb pages (`/locations/*/*`) | Sydney map or service area imagery |
| `/public/og-interstate.jpg` | 1200x630 | Interstate pages (`/interstate` + `/interstate/*`) | Interstate moving truck or map of Australia |
| `/public/og-blog.jpg` | 1200x630 | Blog listing page (`/blog`) | Blog/tips themed image |
| `/public/og-default.jpg` | 1200x630 | Privacy policy, Terms & Conditions, fallback | Generic company branding |

### Blog Post Images

Blog posts currently use their featured images as OG images. Ensure these images exist and are optimized:

| Image Path | Post |
|------------|------|
| `/public/images/blog/blog-removalist-costs.jpg` | How Much Do Removalists Cost in Sydney |
| *Other blog featured images as defined in `/data/blogs.ts`* | Various blog posts |

## Image Requirements

### Technical Specifications
- **Dimensions**: 1200px × 630px (recommended by Facebook)
- **Aspect Ratio**: 1.91:1
- **File Format**: JPG or PNG
- **File Size**: Keep under 1MB for fast loading
- **Color Space**: sRGB

### Content Guidelines
1. **Text Overlay**: Include the company name "Sydney Removalist" or "Sydney Removalist Pro"
2. **Branding**: Use brand colors (primary: #1e3a5f, secondary: #2563eb, accent: #f59e0b)
3. **Image Quality**: High-resolution, professional photography
4. **Safe Zone**: Keep important content away from edges (50px margin recommended)
5. **Consistency**: Maintain consistent branding across all OG images

### Design Recommendations
- Use high-quality photos of moving trucks, team members, or happy customers
- Include text overlays with page titles for better context
- Ensure good contrast for readability
- Consider adding your logo in a corner
- Test how the image looks when cropped to different aspect ratios (mobile preview)

## How to Add OG Images

1. Create the images according to specifications above
2. Place them in the `/public` directory (or `/public/images/blog/` for blog images)
3. The metadata configuration in each page will automatically reference these images
4. Test the images using social media preview tools:
   - Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
   - Twitter Card Validator: https://cards-dev.twitter.com/validator
   - LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

## Current Status

✅ Metadata configuration complete for all pages
✅ Blog posts configured to use featured images as OG images
⚠️ OG image files need to be created and placed in `/public` directory

## Next Steps

1. Create the 9 static OG images listed above
2. Ensure all blog featured images exist at their specified paths
3. Optimize all images for web (compress without losing quality)
4. Test social media sharing on major platforms
5. Add fallback images for dynamic pages if needed

## Tools for Creating OG Images

- **Canva**: Easy-to-use templates for social media images
- **Figma**: Professional design tool with OG image templates
- **Adobe Photoshop/Illustrator**: Advanced image editing
- **Online OG Image Generators**: Various free tools available

## Testing

After adding images, test social media sharing with these tools:
- https://www.opengraph.xyz/ - Preview how your OG images look
- https://metatags.io/ - Preview meta tags and OG images
- https://socialsharepreview.com/ - Preview across multiple platforms
