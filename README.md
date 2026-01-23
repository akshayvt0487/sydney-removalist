# Sydney Removalist Pro

A modern, full-stack removalist company website built with Next.js 15, Supabase, and TypeScript.

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your actual API keys

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Production Deployment

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for deployment instructions.

---

## 📚 Documentation

### Essential Guides

| Document | Purpose |
|----------|---------|
| **[ADMIN_SETUP_GUIDE.md](./ADMIN_SETUP_GUIDE.md)** | How to grant admin access to users |
| **[DASHBOARD_GUIDE.md](./DASHBOARD_GUIDE.md)** | How to use the admin dashboard |
| **[VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)** | Deploy to Vercel with environment variables |
| **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** | Fix common issues |

### Security & Setup

| Document | Purpose |
|----------|---------|
| **[URGENT_ACTION_REQUIRED.md](./URGENT_ACTION_REQUIRED.md)** | 🚨 API key rotation (if keys were exposed) |
| **[SECURITY_API_KEY_ROTATION.md](./SECURITY_API_KEY_ROTATION.md)** | Detailed security guide |
| **[SUPABASE_FIXES_SUMMARY.md](./SUPABASE_FIXES_SUMMARY.md)** | Backend architecture overview |
| **[SUPABASE_RLS_POLICIES.md](./SUPABASE_RLS_POLICIES.md)** | Database security policies |

### SEO & Marketing

| Document | Purpose |
|----------|---------|
| **[SEO_IMPLEMENTATION_GUIDE.md](./SEO_IMPLEMENTATION_GUIDE.md)** | Complete SEO guide with schema markup ⭐ |
| **[COMPANY_INFO_UPDATE.md](./COMPANY_INFO_UPDATE.md)** | How to update company information |
| **[OG_IMAGES_REQUIRED.md](./OG_IMAGES_REQUIRED.md)** | Open Graph images needed for social sharing |

---

## 🎯 Key Features

### Public Website
- ✅ Modern, responsive design
- ✅ SEO optimized with meta tags and Open Graph
- ✅ Quote request form
- ✅ Contact form
- ✅ Service pages (residential, commercial, interstate, etc.)
- ✅ Location pages (64+ Sydney suburbs)
- ✅ Blog with moving tips
- ✅ Google Maps integration

### Admin Dashboard (`/dashboard`)
- ✅ Real-time form submissions with Supabase Realtime
- ✅ Analytics dashboard (total, new today, pending, confirmed)
- ✅ Filter by form type (quotes vs contacts)
- ✅ Status management (new → contacted → quoted → confirmed → completed)
- ✅ CSV export
- ✅ Mobile responsive

### Security
- 🔐 Server-side authentication with Supabase
- 🔐 Role-based access control (admin role required)
- 🔐 Row Level Security (RLS) policies
- 🔐 Protected routes via Next.js middleware
- 🔐 Secure session management

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Realtime**: Supabase Realtime
- **Deployment**: Vercel
- **Maps**: Google Maps API

---

## 📁 Project Structure

```
sydney-removalists/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── dashboard/         # Admin dashboard
│   ├── auth/              # Login/signup pages
│   ├── blog/              # Blog pages
│   ├── services/          # Service pages
│   ├── locations/         # Location pages
│   └── ...
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...
├── lib/                  # Utilities
│   └── supabase/         # Supabase clients
├── data/                 # Static data
│   ├── services.ts       # Service definitions
│   ├── suburbs.ts        # Location data
│   └── blogs.ts          # Blog posts
├── integrations/         # Third-party integrations
│   └── supabase/         # Supabase types
├── supabase/             # Supabase migrations & functions
│   ├── functions/        # Edge functions
│   └── sql/              # SQL scripts
└── public/               # Static assets
```

---

## 🔧 Setup Instructions

### 1. Clone & Install

```bash
git clone <your-repo>
cd sydney-removalists
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Add your API keys:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for where to find these values.

### 3. Supabase Setup

1. Create tables (see [SUPABASE_RLS_POLICIES.md](./SUPABASE_RLS_POLICIES.md))
2. Apply RLS policies
3. Create your first admin user (see [ADMIN_SETUP_GUIDE.md](./ADMIN_SETUP_GUIDE.md))

### 4. Run Development Server

```bash
npm run dev
```

Visit:
- Website: http://localhost:3000
- Admin: http://localhost:3000/dashboard

---

## 🔐 Admin Access

### First Time Setup

1. **Sign up** at `/auth`
2. **Grant admin access** by running this SQL in Supabase:

```sql
INSERT INTO user_roles (user_id, role)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'your-email@example.com'),
  'admin'
);
```

3. **Login** at `/auth` - you'll be redirected to `/dashboard`

See [ADMIN_SETUP_GUIDE.md](./ADMIN_SETUP_GUIDE.md) for detailed instructions.

---

## 📊 Dashboard Features

After logging in, you can:

- 📈 View analytics (total submissions, new today, pending, confirmed)
- 📋 Manage all form submissions
- 🔍 Filter by type (quotes vs contacts)
- ✏️ Update submission status
- 📥 Export data to CSV
- 🔄 Real-time updates (no refresh needed!)

See [DASHBOARD_GUIDE.md](./DASHBOARD_GUIDE.md) for full usage guide.

---

## 🚨 Security

### API Keys Exposed?

If you accidentally committed API keys to Git:

1. Read [URGENT_ACTION_REQUIRED.md](./URGENT_ACTION_REQUIRED.md) immediately
2. Follow [SECURITY_API_KEY_ROTATION.md](./SECURITY_API_KEY_ROTATION.md) to rotate keys

### Production Checklist

Before going live:

- [ ] Apply RLS policies ([SUPABASE_RLS_POLICIES.md](./SUPABASE_RLS_POLICIES.md))
- [ ] Set environment variables in Vercel
- [ ] Rotate any exposed API keys
- [ ] Create admin users
- [ ] Test all forms
- [ ] Verify admin dashboard access
- [ ] Enable email verification in Supabase
- [ ] Set up database backups

---

## 🐛 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| "Failed to fetch" errors | Check environment variables in Vercel ([TROUBLESHOOTING.md](./TROUBLESHOOTING.md)) |
| Can't access dashboard after login | Grant admin role ([ADMIN_SETUP_GUIDE.md](./ADMIN_SETUP_GUIDE.md)) |
| Forms not saving | Check Supabase connection and RLS policies |
| Realtime not working | Enable Realtime in Supabase Dashboard |

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for detailed solutions.

---

## 📦 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for step-by-step guide.

### Environment Variables Needed

```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key
```

---

## 🤝 Contributing

This is a private commercial project. Contact the development team for contribution guidelines.

---

## 📝 License

Proprietary - All rights reserved

---

## 📞 Support

For issues or questions:

1. Check the [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) guide
2. Review relevant documentation above
3. Contact your development team

---

## 🎉 What's New

### v2.0 (2026-01-23)

**Dashboard:**
- ✨ New dedicated `/dashboard` route
- ✨ Real-time updates with Supabase Realtime
- ✨ Analytics dashboard with key metrics
- ✨ Auto-redirect after login
- ✨ CSV export functionality

**Security:**
- 🔒 Enhanced API key management
- 🔒 Improved authentication flow
- 🔒 Better error handling

**SEO:**
- 📈 Complete Open Graph metadata
- 📈 Twitter Cards for all pages
- 📈 Blog posts use unique featured images

---

**Built with ❤️ for Sydney Removalist Pro**
