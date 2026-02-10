/**
 * Generate OG Image for Sydney Removalist
 * Creates a 1200x630 branded OG image
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateOGImage() {
  const width = 1200;
  const height = 630;

  // Create SVG with branded content
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1E3A8A;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#3B82F6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1E40AF;stop-opacity:1" />
        </linearGradient>
      </defs>

      <!-- Background gradient -->
      <rect width="${width}" height="${height}" fill="url(#grad1)"/>

      <!-- Pattern overlay for texture -->
      <rect width="${width}" height="${height}" fill="#000000" opacity="0.1"/>

      <!-- Top accent bar -->
      <rect x="0" y="0" width="${width}" height="8" fill="#FCD34D"/>

      <!-- Bottom accent bar -->
      <rect x="0" y="${height - 8}" width="${width}" height="8" fill="#FCD34D"/>

      <!-- Main content container -->
      <rect x="80" y="100" width="${width - 160}" height="${height - 200}" rx="20" fill="#FFFFFF" opacity="0.95"/>

      <!-- Company Name -->
      <text x="${width / 2}" y="200" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="#1E3A8A" text-anchor="middle">
        Sydney Removalist
      </text>

      <!-- Tagline -->
      <text x="${width / 2}" y="260" font-family="Arial, sans-serif" font-size="32" fill="#3B82F6" text-anchor="middle">
        Professional Moving Services
      </text>

      <!-- Stats Row -->
      <text x="280" y="350" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#1E3A8A" text-anchor="middle">
        ✓ 15+ Years
      </text>
      <text x="${width / 2}" y="350" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#1E3A8A" text-anchor="middle">
        ✓ 10,000+ Moves
      </text>
      <text x="${width - 280}" y="350" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#1E3A8A" text-anchor="middle">
        ✓ 98% Satisfaction
      </text>

      <!-- Divider -->
      <line x1="200" y1="380" x2="${width - 200}" y2="380" stroke="#FCD34D" stroke-width="3"/>

      <!-- Contact Info -->
      <text x="${width / 2}" y="450" font-family="Arial, sans-serif" font-size="40" font-weight="bold" fill="#1E3A8A" text-anchor="middle">
        1300 237 808
      </text>

      <!-- Website -->
      <text x="${width / 2}" y="500" font-family="Arial, sans-serif" font-size="28" fill="#3B82F6" text-anchor="middle">
        sydneyremovalist.com.au
      </text>
    </svg>
  `;

  // Generate the image
  try {
    const publicDir = path.join(__dirname, '..', 'public');

    // Ensure public directory exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 90 })
      .toFile(path.join(publicDir, 'og-default.jpg'));

    console.log('✅ Successfully generated og-default.jpg');
    console.log(`📍 Location: ${path.join(publicDir, 'og-default.jpg')}`);
    console.log('📐 Dimensions: 1200 x 630 pixels');

    // Check file size
    const stats = fs.statSync(path.join(publicDir, 'og-default.jpg'));
    const fileSizeKB = Math.round(stats.size / 1024);
    console.log(`📦 File size: ${fileSizeKB} KB`);

    if (fileSizeKB > 300) {
      console.log('⚠️  Warning: File size is larger than recommended 300KB');
    }

  } catch (error) {
    console.error('❌ Error generating OG image:', error);
    process.exit(1);
  }
}

// Run the function
generateOGImage().then(() => {
  console.log('\n🎉 OG image generation complete!');
  console.log('Next steps:');
  console.log('1. Check public/og-default.jpg');
  console.log('2. Test with: https://developers.facebook.com/tools/debug/');
  console.log('3. Deploy and verify social sharing works');
}).catch((error) => {
  console.error('Failed to generate OG image:', error);
  process.exit(1);
});
