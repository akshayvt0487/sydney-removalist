const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// OG Image dimensions (1200x630 is the standard)
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

// Brand colors (matching your site theme)
const COLORS = {
  navy: '#001F3F',
  yellow: '#FFD700',
  white: '#FFFFFF',
  overlay: 'rgba(0, 31, 63, 0.85)'
};

/**
 * Generate an OG image from a base photo with text overlay
 */
async function generateOGImage(options) {
  const {
    sourceImage,
    outputName,
    title,
    subtitle,
    badge
  } = options;

  const sourcePath = path.join(__dirname, '..', 'assets', 'removalist', sourceImage);
  const outputPath = path.join(__dirname, '..', 'public', outputName);

  console.log(`Generating ${outputName}...`);

  try {
    // Create SVG overlay with text (lighter overlay to show image)
    const svg = `
      <svg width="${OG_WIDTH}" height="${OG_HEIGHT}">
        <defs>
          <!-- Gradient for overlay (lighter to show image better) -->
          <linearGradient id="overlayGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:rgba(0,31,63,0.3);stop-opacity:1" />
            <stop offset="100%" style="stop-color:rgba(0,31,63,0.75);stop-opacity:1" />
          </linearGradient>
        </defs>

        <!-- Semi-transparent overlay to show background image -->
        <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#overlayGrad)"/>

        ${badge ? `
        <!-- Badge in top right -->
        <rect x="920" y="40" width="240" height="50" rx="25" fill="${COLORS.yellow}"/>
        <text x="1040" y="72" font-family="Arial, sans-serif" font-size="24" font-weight="bold"
              fill="${COLORS.navy}" text-anchor="middle">${badge}</text>
        ` : ''}

        <!-- Main title -->
        <text x="60" y="380" font-family="Arial, sans-serif" font-size="64" font-weight="bold"
              fill="${COLORS.white}" style="text-shadow: 2px 2px 8px rgba(0,0,0,0.8);">
          ${escapeXml(title.substring(0, 30))}
        </text>

        ${title.length > 30 ? `
        <text x="60" y="450" font-family="Arial, sans-serif" font-size="64" font-weight="bold"
              fill="${COLORS.white}" style="text-shadow: 2px 2px 8px rgba(0,0,0,0.8);">
          ${escapeXml(title.substring(30, 60))}
        </text>
        ` : ''}

        <!-- Subtitle -->
        <text x="60" y="${title.length > 30 ? '510' : '450'}" font-family="Arial, sans-serif"
              font-size="32" fill="${COLORS.yellow}" style="text-shadow: 2px 2px 6px rgba(0,0,0,0.8);">
          ${escapeXml(subtitle)}
        </text>

        <!-- Bottom bar with contact info -->
        <rect y="560" width="${OG_WIDTH}" height="70" fill="${COLORS.navy}"/>
        <text x="60" y="607" font-family="Arial, sans-serif" font-size="28" font-weight="bold"
              fill="${COLORS.yellow}">
          1300 237 808
        </text>
        <text x="350" y="607" font-family="Arial, sans-serif" font-size="24"
              fill="${COLORS.white}">
          sydneyremovalist.com.au
        </text>
        <text x="900" y="607" font-family="Arial, sans-serif" font-size="22"
              fill="${COLORS.white}">
          ⭐ 4.9/5 Rating
        </text>
      </svg>
    `;

    // Load the source image, resize, and composite with SVG overlay
    await sharp(sourcePath)
      .resize(OG_WIDTH, OG_HEIGHT, {
        fit: 'cover',
        position: 'center'
      })
      .composite([{
        input: Buffer.from(svg),
        top: 0,
        left: 0
      }])
      .jpeg({ quality: 90 })
      .toFile(outputPath);

    // Get file size
    const stats = fs.statSync(outputPath);
    const fileSizeKB = Math.round(stats.size / 1024);

    console.log(`✅ Generated ${outputName} (${fileSizeKB} KB)`);
    return true;
  } catch (error) {
    console.error(`❌ Error generating ${outputName}:`, error.message);
    return false;
  }
}

/**
 * Helper to escape XML special characters
 */
function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

/**
 * Main function to generate all OG images
 */
async function generateAllOGImages() {
  console.log('🎨 Generating OG Images for Sydney Removalist...\n');

  const ogImages = [
    {
      sourceImage: '02.webp',
      outputName: 'og-home.jpg',
      title: 'Sydney Removalists',
      subtitle: 'Professional Moving Services | 15+ Years Experience',
      badge: 'Most Trusted'
    },
    {
      sourceImage: '03.webp',
      outputName: 'og-about.jpg',
      title: 'Meet Our Expert Team',
      subtitle: 'Experienced, Licensed & Fully Insured',
      badge: '15+ Years'
    },
    {
      sourceImage: '08.webp',
      outputName: 'og-services.jpg',
      title: 'Complete Moving Services',
      subtitle: 'Residential | Commercial | Interstate',
      badge: 'Full Service'
    },
    {
      sourceImage: '05.webp',
      outputName: 'og-packing.jpg',
      title: 'Professional Packing Services',
      subtitle: 'Expert Care for Your Belongings',
      badge: 'Packing Pros'
    },
    {
      sourceImage: '010.webp',
      outputName: 'og-furniture.jpg',
      title: 'Furniture Moving Specialists',
      subtitle: 'Safe Handling & Expert Assembly',
      badge: 'Specialists'
    },
    {
      sourceImage: '024.webp',
      outputName: 'og-interstate.jpg',
      title: 'Interstate Moving Services',
      subtitle: 'Sydney to All Major Australian Cities',
      badge: 'Nationwide'
    },
    {
      sourceImage: '016.webp',
      outputName: 'og-contact.jpg',
      title: 'Get Your Free Quote Today',
      subtitle: 'Fast Response | No Obligation',
      badge: 'Free Quote'
    },
    {
      sourceImage: '011.webp',
      outputName: 'og-residential.jpg',
      title: 'Residential Moving Experts',
      subtitle: 'Houses | Apartments | All Sizes',
      badge: 'Top Rated'
    },
    {
      sourceImage: '010.webp',
      outputName: 'og-office.jpg',
      title: 'Office Relocation Specialists',
      subtitle: 'Minimal Downtime | Expert Handling',
      badge: 'Business'
    },
    {
      sourceImage: '06.webp',
      outputName: 'og-pricing.jpg',
      title: 'Transparent Pricing',
      subtitle: 'No Hidden Fees | Competitive Rates',
      badge: 'Fair Pricing'
    },
    {
      sourceImage: '02.webp',
      outputName: 'og-locations.jpg',
      title: 'Serving All Sydney Suburbs',
      subtitle: '64+ Locations Across Greater Sydney',
      badge: 'Local Experts'
    }
  ];

  let successCount = 0;
  let failCount = 0;

  for (const ogImage of ogImages) {
    const success = await generateOGImage(ogImage);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }

  console.log('\n📊 Summary:');
  console.log(`✅ Successfully generated: ${successCount} images`);
  if (failCount > 0) {
    console.log(`❌ Failed: ${failCount} images`);
  }
  console.log('\n🎉 OG image generation complete!');
  console.log('\nNext steps:');
  console.log('1. Update page metadata to use specific OG images');
  console.log('2. Test images with Facebook Debugger: https://developers.facebook.com/tools/debug/');
  console.log('3. Test images with Twitter Card Validator: https://cards-dev.twitter.com/validator');
}

// Run the script
generateAllOGImages().catch(console.error);
