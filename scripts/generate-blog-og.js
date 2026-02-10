const sharp = require('sharp');
const path = require('path');

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

const COLORS = {
  navy: '#001F3F',
  yellow: '#FFD700',
  white: '#FFFFFF'
};

async function generateBlogOG() {
  const sourcePath = path.join(__dirname, '..', 'assets', 'removalist', '05.webp');
  const outputPath = path.join(__dirname, '..', 'public', 'og-blog.jpg');

  console.log('Generating og-blog.jpg...');

  const svg = `
    <svg width="${OG_WIDTH}" height="${OG_HEIGHT}">
      <defs>
        <linearGradient id="overlayGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:rgba(0,31,63,0.3);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgba(0,31,63,0.75);stop-opacity:1" />
        </linearGradient>
      </defs>

      <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#overlayGrad)"/>

      <!-- Badge -->
      <rect x="920" y="40" width="240" height="50" rx="25" fill="${COLORS.yellow}"/>
      <text x="1040" y="72" font-family="Arial, sans-serif" font-size="24" font-weight="bold"
            fill="${COLORS.navy}" text-anchor="middle">Expert Tips</text>

      <!-- Main title -->
      <text x="60" y="380" font-family="Arial, sans-serif" font-size="64" font-weight="bold"
            fill="${COLORS.white}" style="text-shadow: 2px 2px 8px rgba(0,0,0,0.8);">
        Moving Tips and Guides
      </text>

      <!-- Subtitle -->
      <text x="60" y="450" font-family="Arial, sans-serif" font-size="32"
            fill="${COLORS.yellow}" style="text-shadow: 2px 2px 6px rgba(0,0,0,0.8);">
        Expert Advice from Professionals
      </text>

      <!-- Bottom bar -->
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

  console.log('✅ Generated og-blog.jpg');
}

generateBlogOG().catch(console.error);
