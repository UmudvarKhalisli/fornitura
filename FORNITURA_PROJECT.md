# Fornitura — Heavy Machinery Spare Parts Platform

> Multilingual B2B catalog website | Next.js 15 | Supabase | Tailwind CSS | Cloudinary | Vercel

---

## 📋 Contents

1. [Project Overview](#1-project-overview)
2. [Architecture & Tech Stack](#2-architecture--tech-stack)
3. [Design System](#3-design-system)
4. [Route Structure](#4-route-structure)
5. [Supabase SQL Schema](#5-supabase-sql-schema)
6. [Row Level Security (RLS) Policies](#6-row-level-security-rls-policies)
7. [Supabase Auth Setup](#7-supabase-auth-setup)
8. [Environment Variables](#8-environment-variables)
9. [Cloudinary Setup](#9-cloudinary-setup)
10. [SEO Strategy](#10-seo-strategy)
11. [Folder Structure](#11-folder-structure)
12. [Component Architecture](#12-component-architecture)
13. [Vercel Deployment](#13-vercel-deployment)
14. [Admin Panel Guide](#14-admin-panel-guide)
15. [Google Analytics Setup](#15-google-analytics-setup)
16. [Security Checklist](#16-security-checklist)
17. [Development Commands](#17-development-commands)
18. [First-Time Setup Steps](#18-first-time-setup-steps)

---

## 1. Project Overview

**Company:** Fornitura  
**Domain:** Heavy machinery spare parts sales + repair/service support  
**Primary Focus:** Spare parts catalog with WhatsApp-based inquiry  
**Secondary Focus:** Repair service information  
**Target Audience:** B2B — construction, mining, infrastructure companies

### Key Features

- Multilingual: Azerbaijani (`/az`), English (`/en`), Russian (`/ru`)
- Product catalog with categories, brands, filters, search
- WhatsApp pre-filled inquiry (no prices displayed)
- Admin panel (Supabase Auth protected)
- Blog for SEO purposes
- Repair service landing page
- Fully SEO-optimized with hreflang, sitemap, schema.org
- GA4 integration with custom events
- Cloudinary image hosting
- Mobile-first responsive design

---

## 2. Architecture & Tech Stack

```
┌─────────────────────────────────────────────────────────┐
│                    Vercel (Hosting)                      │
│  ┌───────────────────────────────────────────────────┐  │
│  │              Next.js 15 (App Router)              │  │
│  │  ┌──────────┐  ┌──────────┐  ┌────────────────┐  │  │
│  │  │  Public  │  │  Admin   │  │  API Routes    │  │  │
│  │  │  Pages   │  │  Pages   │  │  (Server-only) │  │  │
│  │  └──────────┘  └──────────┘  └────────────────┘  │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
         │              │              │
         ▼              ▼              ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   Supabase   │ │  Cloudinary  │ │   Google     │
│  PostgreSQL  │ │   Images     │ │  Analytics   │
│  + Auth      │ │              │ │     GA4      │
└──────────────┘ └──────────────┘ └──────────────┘
```

### Tech Stack Details

| Category | Choice | Justification |
|----------|--------|---------------|
| Framework | Next.js 15 (App Router) | SSR, SSG, ISR, API routes, server components |
| Language | TypeScript (strict) | Type safety, maintainability |
| Styling | Tailwind CSS | Utility-first, fast, consistent |
| UI Library | shadcn/ui | Accessible, customizable, modern |
| Database | Supabase PostgreSQL | Managed, scalable, real-time |
| Auth | Supabase Auth | Admin login, RLS integration |
| Images | Cloudinary | CDN, optimization, transformations |
| Deployment | Vercel | Native Next.js support, edge functions |
| Analytics | Google Analytics 4 | Industry standard, custom events |

---

## 3. Design System

### 3.1 Color Palette

```
--color-deep-charcoal: #1A1A1A      (Primary text, dark bg)
--color-dark-graphite: #2D2D2D      (Secondary dark, cards)
--color-medium-gray: #6B6B6B        (Body text, muted)
--color-light-gray: #E5E5E5         (Borders, dividers)
--color-off-white: #F5F5F5          (Section backgrounds)
--color-white: #FFFFFF              (Card backgrounds)
--color-metallic-silver: #A0A0A0    (Icons, secondary elements)
--color-muted-gold: #C5A55A         (Accent, CTAs, highlights)
--color-dark-navy: #1B2838          (Optional dark accent)
--color-success: #16A34A            (In stock badge)
--color-error: #DC2626              (Out of stock badge)
```

### 3.2 Typography

```
Font family: Inter (sans-serif) — headings + body
Fallback: system-ui, -apple-system, sans-serif

Scale:
  h1: text-5xl md:text-6xl font-bold tracking-tight
  h2: text-3xl md:text-4xl font-bold tracking-tight
  h3: text-2xl font-semibold
  h4: text-xl font-semibold
  body: text-base leading-relaxed
  small: text-sm
  caption: text-xs uppercase tracking-wider
```

### 3.3 Spacing

```
Section padding: py-16 md:py-24
Container max-width: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
Card gap: gap-6 md:gap-8
Grid columns: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
```

### 3.4 Border Radius

```
Cards: rounded-lg (8px)
Buttons: rounded-md (6px)
Badges: rounded-full
Inputs: rounded-md (6px)
Modals: rounded-xl (12px)
```

### 3.5 Shadows

```
Card: shadow-sm hover:shadow-md transition-shadow
Dropdown: shadow-lg
Modal: shadow-2xl
```

### 3.6 Animation

```
Hover transitions: transition-all duration-200
Page transitions: fade in (opacity 0 → 1, 300ms)
Loading states: Skeleton shimmer
```

### 3.7 Logo Placement

```
Header: max-h-10 md:max-h-12
Footer: max-h-8
Admin panel: max-h-8
Favicon: 32x32, apple-touch-icon: 180x180
```

---

## 4. Route Structure

### 4.1 Public Routes

```
/                                    → Redirect to /az
/[locale]                            → Home page
/[locale]/spare-parts                 → Catalog (paginated, filterable)
/[locale]/spare-parts/[categorySlug]  → Category page
/[locale]/product/[productSlug]       → Product detail
/[locale]/repair-service              → Repair service page
/[locale]/about                       → About us
/[locale]/brands                      → Brands
/[locale]/contact                     → Contact form
/[locale]/blog                        → Blog listing
/[locale]/blog/[slug]                 → Blog post detail
```

### 4.2 Admin Routes (protected)

```
/admin/login                          → Admin login
/admin/dashboard                      → Dashboard overview
/admin/products                       → Product list
/admin/products/new                   → Add product
/admin/products/[id]/edit             → Edit product
/admin/categories                     → Category management
/admin/brands                         → Brand management
/admin/services                       → Service management
/admin/pages                          → Static page content
/admin/blog                           → Blog management
/admin/blog/new                       → New blog post
/admin/blog/[id]/edit                 → Edit blog post
/admin/messages                       → Contact messages
/admin/settings                       → Site settings
/admin/media                          → Media library
```

### 4.3 API Routes

```
/api/contact                          → POST contact form
/api/upload                           → POST upload image (admin only)
/api/analytics/event                  → POST server-side analytics event
/api/products/search                  → GET product search
/api/sitemap                          → Sitemap generation support
```

### 4.4 Special Routes

```
/robots.txt                           → Dynamic robots.txt
/sitemap.xml                          → Dynamic multilingual sitemap
/not-found                            → Custom 404
```

---

## 5. Supabase SQL Schema

Run these SQL statements in the Supabase SQL Editor in order.

### 5.1 Enable Extensions

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

### 5.2 Admins Table

```sql
CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- The admin user will be created via Supabase Auth
-- This table stores additional admin metadata
```

### 5.3 Categories Table

```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_az TEXT NOT NULL,
  name_en TEXT NOT NULL,
  name_ru TEXT NOT NULL,
  slug_az TEXT UNIQUE NOT NULL,
  slug_en TEXT UNIQUE NOT NULL,
  slug_ru TEXT UNIQUE NOT NULL,
  description_az TEXT DEFAULT '',
  description_en TEXT DEFAULT '',
  description_ru TEXT DEFAULT '',
  image TEXT DEFAULT '',
  seo_title_az TEXT DEFAULT '',
  seo_title_en TEXT DEFAULT '',
  seo_title_ru TEXT DEFAULT '',
  seo_description_az TEXT DEFAULT '',
  seo_description_en TEXT DEFAULT '',
  seo_description_ru TEXT DEFAULT '',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_categories_slug_az ON categories(slug_az);
CREATE INDEX idx_categories_slug_en ON categories(slug_en);
CREATE INDEX idx_categories_slug_ru ON categories(slug_ru);
CREATE INDEX idx_categories_display_order ON categories(display_order);
```

### 5.4 Brands Table

```sql
CREATE TABLE brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT DEFAULT '',
  description_az TEXT DEFAULT '',
  description_en TEXT DEFAULT '',
  description_ru TEXT DEFAULT '',
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_brands_slug ON brands(slug);
CREATE INDEX idx_brands_display_order ON brands(display_order);
```

### 5.5 Products Table

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_az TEXT NOT NULL,
  name_en TEXT NOT NULL,
  name_ru TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description_az TEXT DEFAULT '',
  description_en TEXT DEFAULT '',
  description_ru TEXT DEFAULT '',
  short_description_az TEXT DEFAULT '',
  short_description_en TEXT DEFAULT '',
  short_description_ru TEXT DEFAULT '',
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  brand_id UUID REFERENCES brands(id) ON DELETE SET NULL,
  part_number TEXT NOT NULL,
  compatible_models TEXT[] DEFAULT '{}',
  stock_status TEXT NOT NULL DEFAULT 'in_stock' CHECK (stock_status IN ('in_stock', 'out_of_stock')),
  images TEXT[] DEFAULT '{}',
  main_image TEXT DEFAULT '',
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  seo_title_az TEXT DEFAULT '',
  seo_title_en TEXT DEFAULT '',
  seo_title_ru TEXT DEFAULT '',
  seo_description_az TEXT DEFAULT '',
  seo_description_en TEXT DEFAULT '',
  seo_description_ru TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_brand_id ON products(brand_id);
CREATE INDEX idx_products_part_number ON products(part_number);
CREATE INDEX idx_products_stock_status ON products(stock_status);
CREATE INDEX idx_products_is_featured ON products(is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_products_is_active ON products(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_products_name_az ON products(name_az);
CREATE INDEX idx_products_name_en ON products(name_en);
CREATE INDEX idx_products_name_ru ON products(name_ru);
```

### 5.6 Services Table

```sql
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_az TEXT NOT NULL,
  title_en TEXT NOT NULL,
  title_ru TEXT NOT NULL,
  description_az TEXT DEFAULT '',
  description_en TEXT DEFAULT '',
  description_ru TEXT DEFAULT '',
  icon TEXT DEFAULT '',
  image TEXT DEFAULT '',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_services_display_order ON services(display_order);
```

### 5.7 Blog Posts Table

```sql
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_az TEXT NOT NULL,
  title_en TEXT NOT NULL,
  title_ru TEXT NOT NULL,
  slug_az TEXT UNIQUE NOT NULL,
  slug_en TEXT UNIQUE NOT NULL,
  slug_ru TEXT UNIQUE NOT NULL,
  content_az TEXT DEFAULT '',
  content_en TEXT DEFAULT '',
  content_ru TEXT DEFAULT '',
  excerpt_az TEXT DEFAULT '',
  excerpt_en TEXT DEFAULT '',
  excerpt_ru TEXT DEFAULT '',
  image TEXT DEFAULT '',
  tags TEXT[] DEFAULT '{}',
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE,
  seo_title_az TEXT DEFAULT '',
  seo_title_en TEXT DEFAULT '',
  seo_title_ru TEXT DEFAULT '',
  seo_description_az TEXT DEFAULT '',
  seo_description_en TEXT DEFAULT '',
  seo_description_ru TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_blog_posts_slug_az ON blog_posts(slug_az);
CREATE INDEX idx_blog_posts_slug_en ON blog_posts(slug_en);
CREATE INDEX idx_blog_posts_slug_ru ON blog_posts(slug_ru);
CREATE INDEX idx_blog_posts_is_published ON blog_posts(is_published);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
```

### 5.8 Messages Table (Contact Form)

```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  subject TEXT DEFAULT '',
  message TEXT NOT NULL,
  product_name TEXT DEFAULT '',
  product_url TEXT DEFAULT '',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_messages_is_read ON messages(is_read);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);
```

### 5.9 Site Settings Table

```sql
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_name TEXT DEFAULT 'Fornitura',
  logo_url TEXT DEFAULT '',
  favicon_url TEXT DEFAULT '',
  whatsapp_number TEXT DEFAULT '',
  phone_number TEXT DEFAULT '',
  email TEXT DEFAULT '',
  address_az TEXT DEFAULT '',
  address_en TEXT DEFAULT '',
  address_ru TEXT DEFAULT '',
  google_maps_url TEXT DEFAULT '',
  instagram_url TEXT DEFAULT '',
  facebook_url TEXT DEFAULT '',
  linkedin_url TEXT DEFAULT '',
  youtube_url TEXT DEFAULT '',
  telegram_url TEXT DEFAULT '',
  hero_title_az TEXT DEFAULT '',
  hero_title_en TEXT DEFAULT '',
  hero_title_ru TEXT DEFAULT '',
  hero_description_az TEXT DEFAULT '',
  hero_description_en TEXT DEFAULT '',
  hero_description_ru TEXT DEFAULT '',
  hero_image TEXT DEFAULT '',
  about_content_az TEXT DEFAULT '',
  about_content_en TEXT DEFAULT '',
  about_content_ru TEXT DEFAULT '',
  about_image TEXT DEFAULT '',
  repair_service_title_az TEXT DEFAULT '',
  repair_service_title_en TEXT DEFAULT '',
  repair_service_title_ru TEXT DEFAULT '',
  repair_service_description_az TEXT DEFAULT '',
  repair_service_description_en TEXT DEFAULT '',
  repair_service_description_ru TEXT DEFAULT '',
  repair_service_image TEXT DEFAULT '',
  footer_text_az TEXT DEFAULT '',
  footer_text_en TEXT DEFAULT '',
  footer_text_ru TEXT DEFAULT '',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings row
INSERT INTO site_settings (id) VALUES (uuid_generate_v4());
```

### 5.10 Media Table

```sql
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url TEXT NOT NULL,
  public_id TEXT NOT NULL,
  alt_text TEXT DEFAULT '',
  width INTEGER DEFAULT 0,
  height INTEGER DEFAULT 0,
  file_size INTEGER DEFAULT 0,
  format TEXT DEFAULT '',
  folder TEXT DEFAULT '',
  uploaded_by UUID REFERENCES admins(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_media_folder ON media(folder);
CREATE INDEX idx_media_created_at ON media(created_at DESC);
```

### 5.11 Pages Table (Static pages content)

```sql
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title_az TEXT NOT NULL,
  title_en TEXT NOT NULL,
  title_ru TEXT NOT NULL,
  content_az TEXT DEFAULT '',
  content_en TEXT DEFAULT '',
  content_ru TEXT DEFAULT '',
  seo_title_az TEXT DEFAULT '',
  seo_title_en TEXT DEFAULT '',
  seo_title_ru TEXT DEFAULT '',
  seo_description_az TEXT DEFAULT '',
  seo_description_en TEXT DEFAULT '',
  seo_description_ru TEXT DEFAULT '',
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_pages_slug ON pages(slug);
```

---

## 6. Row Level Security (RLS) Policies

### 6.1 Enable RLS on All Tables

```sql
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
```

### 6.2 Public Read Policies

```sql
-- Public can read active products
CREATE POLICY "Public can read active products"
  ON products FOR SELECT
  USING (is_active = TRUE);

-- Public can read active categories
CREATE POLICY "Public can read active categories"
  ON categories FOR SELECT
  USING (is_active = TRUE);

-- Public can read active brands
CREATE POLICY "Public can read active brands"
  ON brands FOR SELECT
  USING (is_active = TRUE);

-- Public can read active services
CREATE POLICY "Public can read active services"
  ON services FOR SELECT
  USING (is_active = TRUE);

-- Public can read published blog posts
CREATE POLICY "Public can read published blog posts"
  ON blog_posts FOR SELECT
  USING (is_published = TRUE);

-- Public can read site settings
CREATE POLICY "Public can read site settings"
  ON site_settings FOR SELECT
  USING (TRUE);

-- Public can read published pages
CREATE POLICY "Public can read published pages"
  ON pages FOR SELECT
  USING (is_published = TRUE);

-- Public can read media
CREATE POLICY "Public can read media"
  ON media FOR SELECT
  USING (TRUE);
```

### 6.3 Public Insert Policies

```sql
-- Public can insert messages (contact form)
CREATE POLICY "Public can insert messages"
  ON messages FOR INSERT
  WITH CHECK (TRUE);
```

### 6.4 Admin Full Access Policies

```sql
-- Admin helper function
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admins WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Products: admin full access
CREATE POLICY "Admin full access products"
  ON products FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- Categories: admin full access
CREATE POLICY "Admin full access categories"
  ON categories FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- Brands: admin full access
CREATE POLICY "Admin full access brands"
  ON brands FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- Services: admin full access
CREATE POLICY "Admin full access services"
  ON services FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- Blog posts: admin full access
CREATE POLICY "Admin full access blog posts"
  ON blog_posts FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- Messages: admin full access (read, delete)
CREATE POLICY "Admin full access messages"
  ON messages FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- Site settings: admin full access
CREATE POLICY "Admin full access site settings"
  ON site_settings FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- Media: admin full access
CREATE POLICY "Admin full access media"
  ON media FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- Pages: admin full access
CREATE POLICY "Admin full access pages"
  ON pages FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- Admins: admin full access
CREATE POLICY "Admin full access admins"
  ON admins FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());
```

### 6.5 Read-Only Public Policy for Messages

```sql
-- Public cannot read messages
CREATE POLICY "Public cannot read messages"
  ON messages FOR SELECT
  USING (FALSE);
```

---

## 7. Supabase Auth Setup

### 7.1 Create Admin User

1. Go to Supabase Dashboard → **Authentication → Users**
2. Click **Add User**
3. Enter email and password for the admin
4. Copy the User ID (UUID)

### 7.2 Insert Admin Record

```sql
INSERT INTO admins (id, email)
VALUES (
  '<copied-uuid-from-auth>',  -- Replace with actual UUID from Auth
  'admin@fornitura.com'       -- Replace with actual admin email
);
```

### 7.3 Auth Configuration

In Supabase Dashboard → **Authentication → Settings**:

- **Site URL**: `https://your-domain.vercel.app`
- **Redirect URLs**: `https://your-domain.vercel.app/admin/dashboard`
- **Disable signups**: ON (only invite-based admin creation)
- **Email auth**: Enabled
- **Password length**: Minimum 8 characters

### 7.4 Create Additional Admins

```sql
-- 1. First create user in Supabase Auth (via dashboard)
-- 2. Then insert into admins table
INSERT INTO admins (id, email)
VALUES ('<auth-user-id>', 'newadmin@fornitura.com');
```

---

## 8. Environment Variables

### 8.1 `.env.example`

```bash
# === Site ===
NEXT_PUBLIC_SITE_URL=https://fornitura.vercel.app
NEXT_PUBLIC_DEFAULT_LOCALE=az

# === Supabase ===
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# === Cloudinary ===
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dxxxxxxxx
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# === Google Analytics ===
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 8.2 Where to Get Values

| Variable | Source |
|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Project Settings → API → anon public |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Project Settings → API → service_role (KEEP SECRET) |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary Dashboard → Account Details |
| `CLOUDINARY_API_KEY` | Cloudinary Dashboard → Account Details |
| `CLOUDINARY_API_SECRET` | Cloudinary Dashboard → Account Details (KEEP SECRET) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 → Admin → Data Streams → Measurement ID |

### 8.3 Security Notes

- `SUPABASE_SERVICE_ROLE_KEY` must NEVER be exposed to the client
- `CLOUDINARY_API_SECRET` must NEVER be exposed to the client
- `CLOUDINARY_API_KEY` can be used server-side only
- All `NEXT_PUBLIC_` prefixed variables are safe for client
- On Vercel, add these in Project → Settings → Environment Variables

---

## 9. Cloudinary Setup

### 9.1 Cloudinary Account Setup

1. Create account at https://cloudinary.com
2. Note your **Cloud Name**, **API Key**, **API Secret**

### 9.2 Upload Preset (Optional for Signed Uploads)

```
Setting Name: fornitura_signed
Signing Mode: Signed
Folder: fornitura
Allow Multiple: Yes
```

### 9.3 Folder Structure in Cloudinary

```
fornitura/
├── products/
├── categories/
├── brands/
├── blog/
├── pages/
├── logo/
├── homepage/
└── services/
```

### 9.4 Image Delivery URL Pattern

```
https://res.cloudinary.com/<cloud_name>/image/upload/f_auto,q_auto/v1/fornitura/products/<image_name>

Transformations:
  - f_auto       → Auto format (WebP, AVIF)
  - q_auto       → Auto quality
  - w_800        → Responsive width
  - c_fill       → Crop fill
  - g_auto       → Auto gravity
```

### 9.5 Upload API Endpoint (Server-side)

Create a secure API route at `/api/upload` that:
1. Verifies admin authentication
2. Validates file type (only images: jpg, png, webp, avif)
3. Validates file size (max 5MB)
4. Uploads to Cloudinary using server-side SDK
5. Returns the secure URL and public_id
6. Saves metadata to `media` table

### 9.6 Cloudinary SDK Setup

```bash
npm install cloudinary
```

```typescript
// src/lib/cloudinary/config.ts
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
```

---

## 10. SEO Strategy

### 10.1 Metadata Generation

Use Next.js Metadata API for dynamic SEO in each page:

```typescript
// src/lib/seo/generateMetadata.ts
import { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  locale: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedAt?: string;
  noindex?: boolean;
}

export function generateSEOMetadata({
  title,
  description,
  locale,
  path,
  image,
  type = 'website',
  publishedAt,
  noindex = false,
}: SEOProps): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;
  const url = `${siteUrl}/${locale}${path}`;
  const fullTitle = `${title} | Fornitura`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
      languages: {
        az: `${siteUrl}/az${path}`,
        en: `${siteUrl}/en${path}`,
        ru: `${siteUrl}/ru${path}`,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: 'Fornitura',
      locale: locale === 'az' ? 'az-AZ' : locale === 'ru' ? 'ru-RU' : 'en-US',
      type,
      images: image ? [{ url: image, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: image ? [image] : [],
    },
    robots: noindex ? { index: false, follow: false } : undefined,
    ...(publishedAt && type === 'article' ? { other: { 'article:published_time': publishedAt } } : {}),
  };
}
```

### 10.2 Hreflang Tags

Generate hreflang for every page:

```typescript
// src/components/seo/Hreflang.tsx
// Implement <head> hreflang tags
<link rel="alternate" href="https://fornitura.com/az/spare-parts" hreflang="az" />
<link rel="alternate" href="https://fornitura.com/en/spare-parts" hreflang="en" />
<link rel="alternate" href="https://fornitura.com/ru/spare-parts" hreflang="ru" />
<link rel="alternate" href="https://fornitura.com/en/spare-parts" hreflang="x-default" />
```

### 10.3 Structured Data (Schema.org)

Implement JSON-LD for:

```json
// Organization
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Fornitura",
  "url": "https://fornitura.com",
  "logo": "https://fornitura.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+994 XX XXX XX XX",
    "contactType": "customer service",
    "availableLanguage": ["Azerbaijani", "English", "Russian"]
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "AZ",
    "addressLocality": "Bakı"
  }
}

// WebSite
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Fornitura",
  "url": "https://fornitura.com",
  "inLanguage": ["az", "en", "ru"]
}

// BreadcrumbList — generate dynamically per page
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Ana səhifə", "item": "https://fornitura.com/az" },
    { "@type": "ListItem", "position": 2, "name": "Ehtiyat hissələri", "item": "https://fornitura.com/az/spare-parts" },
    { "@type": "ListItem", "position": 3, "name": "Product Name", "item": "https://fornitura.com/az/product/product-name" }
  ]
}

// Product — without price
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Product Name",
  "description": "Product description",
  "sku": "PART-123",
  "brand": { "@type": "Brand", "name": "Brand Name" },
  "category": "Category Name",
  "image": "https://res.cloudinary.com/.../product.jpg",
  "offers": {
    "@type": "Offer",
    "url": "https://fornitura.com/az/product/product-name",
    "availability": "https://schema.org/InStock"  // or OutOfStock
    // NOTE: No price property since prices are not displayed
  }
}
```

### 10.4 robots.txt

```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api
Disallow: /login

Sitemap: https://fornitura.com/sitemap.xml
```

### 10.5 sitemap.xml

Must include all public pages in all 3 languages:

```
https://fornitura.com/az
https://fornitura.com/en
https://fornitura.com/ru
https://fornitura.com/az/spare-parts
https://fornitura.com/en/spare-parts
https://fornitura.com/ru/spare-parts
https://fornitura.com/az/about
https://fornitura.com/en/about
https://fornitura.com/ru/about
... and all categories, products, blog posts
```

Use `generateSitemaps()` from Next.js App Router for dynamic sitemaps.

### 10.6 SEO Checklist

- [ ] Dynamic metadata on every page
- [ ] Hreflang tags on every page
- [ ] Canonical URLs on every page
- [ ] Open Graph tags on every page
- [ ] Twitter cards on every page
- [ ] robots.txt disallowing admin/api
- [ ] Multilingual sitemap.xml
- [ ] BreadcrumbList schema
- [ ] Organization schema
- [ ] WebSite schema
- [ ] Product schema (without price) on product pages
- [ ] Article schema on blog posts
- [ ] Semantic HTML (h1-h6 hierarchy)
- [ ] Alt text on all images
- [ ] SEO-friendly URL slugs
- [ ] Custom 404 page
- [ ] Admin pages set to noindex
- [ ] Google Search Console verified

---

## 11. Folder Structure

```
fornitura/
├── .env.example
├── .env.local                      # (gitignored)
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── postcss.config.js
├── components.json                 # shadcn/ui config
│
├── public/
│   ├── robots.txt
│   └── images/
│       └── placeholder.svg
│
└── src/
    ├── app/
    │   ├── [locale]/
    │   │   ├── layout.tsx          # Root locale layout (header, footer, language switcher)
    │   │   ├── page.tsx            # Home page
    │   │   ├── not-found.tsx       # Locale-aware 404
    │   │   ├── spare-parts/
    │   │   │   ├── page.tsx        # Catalog listing
    │   │   │   └── [categorySlug]/
    │   │   │       └── page.tsx    # Category detail
    │   │   ├── product/
    │   │   │   └── [productSlug]/
    │   │   │       └── page.tsx    # Product detail
    │   │   ├── repair-service/
    │   │   │   └── page.tsx
    │   │   ├── about/
    │   │   │   └── page.tsx
    │   │   ├── brands/
    │   │   │   └── page.tsx
    │   │   ├── contact/
    │   │   │   └── page.tsx
    │   │   └── blog/
    │   │       ├── page.tsx        # Blog listing
    │   │       └── [slug]/
    │   │           └── page.tsx    # Blog detail
    │   │
    │   ├── admin/
    │   │   ├── layout.tsx          # Admin layout with auth check
    │   │   ├── login/
    │   │   │   └── page.tsx
    │   │   ├── dashboard/
    │   │   │   └── page.tsx
    │   │   ├── products/
    │   │   │   ├── page.tsx
    │   │   │   ├── new/
    │   │   │   │   └── page.tsx
    │   │   │   └── [id]/
    │   │   │       └── edit/
    │   │   │           └── page.tsx
    │   │   ├── categories/
    │   │   │   ├── page.tsx
    │   │   │   ├── new/
    │   │   │   │   └── page.tsx
    │   │   │   └── [id]/
    │   │   │       └── edit/
    │   │   │           └── page.tsx
    │   │   ├── brands/
    │   │   │   └── page.tsx
    │   │   ├── services/
    │   │   │   └── page.tsx
    │   │   ├── pages/
    │   │   │   └── page.tsx
    │   │   ├── blog/
    │   │   │   ├── page.tsx
    │   │   │   ├── new/
    │   │   │   │   └── page.tsx
    │   │   │   └── [id]/
    │   │   │       └── edit/
    │   │   │           └── page.tsx
    │   │   ├── messages/
    │   │   │   └── page.tsx
    │   │   ├── settings/
    │   │   │   └── page.tsx
    │   │   └── media/
    │   │       └── page.tsx
    │   │
    │   ├── api/
    │   │   ├── contact/
    │   │   │   └── route.ts
    │   │   ├── upload/
    │   │   │   └── route.ts
    │   │   └── analytics/
    │   │       └── event/
    │   │           └── route.ts
    │   │
    │   ├── robots.ts
    │   ├── sitemap.ts
    │   └── not-found.tsx
    │
    ├── components/
    │   ├── ui/                     # shadcn/ui components
    │   │   ├── button.tsx
    │   │   ├── input.tsx
    │   │   ├── badge.tsx
    │   │   ├── card.tsx
    │   │   ├── dialog.tsx
    │   │   ├── dropdown-menu.tsx
    │   │   ├── select.tsx
    │   │   ├── textarea.tsx
    │   │   ├── skeleton.tsx
    │   │   └── toast.tsx
    │   │
    │   ├── layout/
    │   │   ├── header.tsx
    │   │   ├── footer.tsx
    │   │   ├── mobile-nav.tsx
    │   │   ├── language-switcher.tsx
    │   │   ├── whatsapp-button.tsx
    │   │   └── breadcrumbs.tsx
    │   │
    │   ├── home/
    │   │   ├── hero-section.tsx
    │   │   ├── categories-section.tsx
    │   │   ├── featured-products.tsx
    │   │   ├── why-choose-us.tsx
    │   │   ├── repair-intro.tsx
    │   │   ├── brands-section.tsx
    │   │   └── cta-section.tsx
    │   │
    │   ├── products/
    │   │   ├── product-card.tsx
    │   │   ├── product-grid.tsx
    │   │   ├── product-detail.tsx
    │   │   ├── product-filters.tsx
    │   │   ├── product-search.tsx
    │   │   ├── whatsapp-inquiry-button.tsx
    │   │   └── stock-badge.tsx
    │   │
    │   ├── admin/
    │   │   ├── admin-sidebar.tsx
    │   │   ├── admin-header.tsx
    │   │   ├── data-table.tsx
    │   │   ├── image-upload.tsx
    │   │   ├── seo-fields.tsx
    │   │   ├── multilingual-fields.tsx
    │   │   └── auth-guard.tsx
    │   │
    │   ├── forms/
    │   │   ├── contact-form.tsx
    │   │   ├── product-form.tsx
    │   │   ├── category-form.tsx
    │   │   └── blog-form.tsx
    │   │
    │   ├── seo/
    │   │   ├── json-ld.tsx
    │   │   ├── breadcrumb-schema.tsx
    │   │   └── organization-schema.tsx
    │   │
    │   └── shared/
    │       ├── loading.tsx
    │       ├── empty-state.tsx
    │       ├── error-state.tsx
    │       ├── pagination.tsx
    │       ├── section-title.tsx
    │       └── container.tsx
    │
    ├── lib/
    │   ├── supabase/
    │   │   ├── client.ts           # Browser client
    │   │   ├── server.ts           # Server client (service role)
    │   │   └── admin.ts            # Admin check utility
    │   │
    │   ├── cloudinary/
    │   │   └── config.ts
    │   │
    │   ├── seo/
    │   │   ├── generate-metadata.ts
    │   │   └── constants.ts
    │   │
    │   ├── analytics/
    │   │   └── events.ts
    │   │
    │   ├── security/
    │   │   ├── rate-limit.ts
    │   │   ├── sanitize.ts
    │   │   └── csrf.ts
    │   │
    │   ├── validation/
    │   │   ├── schemas.ts          # Zod schemas
    │   │   └── messages.ts         # Validation messages (multilingual)
    │   │
    │   ├── utils/
    │   │   ├── cn.ts               # clsx + tailwind-merge
    │   │   ├── whatsapp.ts         # WhatsApp message builder
    │   │   ├── format-date.ts
    │   │   ├── slug.ts
    │   │   └── url.ts
    │   │
    │   └── db/
    │       ├── queries/
    │       │   ├── products.ts
    │       │   ├── categories.ts
    │       │   ├── brands.ts
    │       │   ├── blog.ts
    │       │   ├── settings.ts
    │       │   └── messages.ts
    │       └── helpers.ts
    │
    ├── types/
    │   ├── database.ts
    │   ├── product.ts
    │   ├── category.ts
    │   └── settings.ts
    │
    ├── dictionaries/
    │   ├── az.json                 # Azerbaijani translations
    │   ├── en.json                 # English translations
    │   └── ru.json                 # Russian translations
    │
    ├── middleware.ts               # Locale detection, redirects
    └── i18n.ts                     # i18n config
```

---

## 12. Component Architecture

### 12.1 Key Components Reference

| Component | File | Description |
|-----------|------|-------------|
| Header | `src/components/layout/header.tsx` | Logo, nav, language switcher, WhatsApp CTA |
| Footer | `src/components/layout/footer.tsx` | 4-column footer with links, social, contact |
| LanguageSwitcher | `src/components/layout/language-switcher.tsx` | Dropdown to switch az/en/ru |
| WhatsAppButton | `src/components/layout/whatsapp-button.tsx` | Floating/sticky WhatsApp CTA |
| HeroSection | `src/components/home/hero-section.tsx` | Full-width hero with industrial imagery |
| ProductCard | `src/components/products/product-card.tsx` | Card with image, name, part number, stock, WhatsApp |
| ProductFilters | `src/components/products/product-filters.tsx` | Category + brand + search filters |
| WhatsAppInquiryButton | `src/components/products/whatsapp-inquiry-button.tsx` | Generates pre-filled message |
| StockBadge | `src/components/products/stock-badge.tsx` | In stock / Out of stock badge |
| JsonLd | `src/components/seo/json-ld.tsx` | Renders structured data script tag |
| ImageUpload | `src/components/admin/image-upload.tsx` | Cloudinary upload with preview |
| SEOFields | `src/components/admin/seo-fields.tsx` | Title/description inputs for SEO |
| MultilingualFields | `src/components/admin/multilingual-fields.tsx` | 3-language input groups |
| AuthGuard | `src/components/admin/auth-guard.tsx` | Admin auth check wrapper |
| EmptyState | `src/components/shared/empty-state.tsx` | Professional empty state with icon |
| Loading | `src/components/shared/loading.tsx` | Skeleton loading state |
| ErrorState | `src/components/shared/error-state.tsx` | Error display with retry |

### 12.2 WhatsApp Message Templates

**Azerbaijani:**
```
Salam, Fornitura saytında bu ehtiyat hissəsi ilə maraqlanıram:

Məhsul: {productName}
Kod: {partNumber}
Link: {productUrl}

Zəhmət olmasa qiymət və mövcudluq barədə məlumat verin.
```

**English:**
```
Hello, I am interested in this spare part from Fornitura website:

Product: {productName}
Part Number: {partNumber}
Link: {productUrl}

Please provide information about price and availability.
```

**Russian:**
```
Здравствуйте, меня интересует эта запчасть с сайта Fornitura:

Товар: {productName}
Код: {partNumber}
Ссылка: {productUrl}

Пожалуйста, сообщите информацию о цене и наличии.
```

---

## 13. Vercel Deployment

### 13.1 Steps

1. **Push to GitHub** (private repo recommended)
2. **Go to https://vercel.com → Add New Project**
3. **Import GitHub repository**
4. **Configure environment variables** (all from `.env.example`)
5. **Deploy**

### 13.2 Vercel Configuration

```json
// vercel.json (optional, auto-detected)
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

### 13.3 Environment Variables on Vercel

Add these in Vercel Dashboard → Project → Settings → Environment Variables:

```
NEXT_PUBLIC_SITE_URL=https://fornitura.vercel.app
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 13.4 Custom Domain (Production)

1. Buy domain (e.g., `fornitura.com`)
2. In Vercel Dashboard → Project → Domains → Add
3. Follow DNS instructions
4. Update `NEXT_PUBLIC_SITE_URL` to production domain
5. Update Supabase Auth Site URL
6. Update Google Search Console property

### 13.5 Build Settings

```
Node.js Version: 20.x
Build Command: npm run build
Output Directory: .next
Install Command: npm ci --frozen-lockfile
```

---

## 14. Admin Panel Guide

### 14.1 Login

1. Navigate to `/admin/login`
2. Enter Supabase Auth credentials
3. Redirected to `/admin/dashboard`

### 14.2 Dashboard

Shows overview statistics:
- Total products
- Total categories
- Total brands
- Total blog posts
- Unread messages count
- Recent messages
- Recent products added

### 14.3 Product Management

**Add Product:**
1. Go to `/admin/products/new`
2. Fill multilingual fields (name, description, short description, SEO)
3. Select category and brand
4. Enter part number and compatible models
5. Set stock status (In Stock / Out of Stock)
6. Upload images (main image + additional)
7. Toggle featured if needed
8. Save

**Edit Product:**
- Same form, pre-populated with existing data

**Delete Product:**
- Confirm dialog, soft delete not needed (set `is_active = FALSE` instead)

### 14.4 Category Management

- Add with name in 3 languages, slugs auto-generated
- Upload category image
- Set display order
- Edit SEO metadata per language
- Reorder via display_order field

### 14.5 Brand Management

- Add brand name and slug
- Upload logo
- Add description in 3 languages
- Set display order

### 14.6 Blog Management

- Title, content, excerpt in 3 languages
- Upload featured image
- Add tags
- Set publish status and publish date
- SEO fields per language

### 14.7 Site Settings

- Company contact info (WhatsApp, phone, email, address)
- Social media links
- Hero content (title, description, image)
- About page content and image
- Repair service section content
- Footer text
- Logo and favicon upload

### 14.8 Messages

- View contact form submissions
- Mark as read/unread
- Delete spam messages
- Click to reply via email

### 14.9 Media Library

- View all uploaded images
- Upload new images
- Copy image URLs
- Delete images
- Filter by folder

---

## 15. Google Analytics Setup

### 15.1 GA4 Property Setup

1. Go to https://analytics.google.com
2. Create new property: **Fornitura**
3. Select "Web" data stream
4. Enter website URL
5. Get Measurement ID (G-XXXXXXXXXX)

### 15.2 GA4 Implementation

```typescript
// src/lib/analytics/events.ts
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

export function trackEvent(action: string, params?: Record<string, any>) {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;

  window.gtag('event', action, {
    ...params,
    send_to: GA_MEASUREMENT_ID,
  });
}

// Custom events
export const trackWhatsAppClick = (productName?: string) => {
  trackEvent('whatsapp_click', { product_name: productName });
};

export const trackPhoneClick = () => {
  trackEvent('phone_click');
};

export const trackProductView = (productId: string, productName: string) => {
  trackEvent('product_view', { product_id: productId, product_name: productName });
};

export const trackCategoryView = (categoryName: string) => {
  trackEvent('category_view', { category_name: categoryName });
};

export const trackSearch = (searchTerm: string) => {
  trackEvent('search_used', { search_term: searchTerm });
};

export const trackContactFormSubmit = () => {
  trackEvent('contact_form_submit');
};

export const trackLanguageChange = (language: string) => {
  trackEvent('language_changed', { language });
};

export const trackRepairServiceClick = () => {
  trackEvent('repair_service_click');
};
```

### 15.3 GA4 Script Setup

Add Google Analytics script in root layout (`src/app/[locale]/layout.tsx`):

```typescript
// Using @next/third-parties/google
npm install @next/third-parties
```

```typescript
import { GoogleAnalytics } from '@next/third-parties/google';

// In layout:
<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
```

---

## 16. Security Checklist

### 16.1 Authentication & Authorization

- [x] Supabase Auth for admin login
- [x] Admin route protection via middleware/page-level checks
- [x] RLS policies on all tables
- [x] Service role key never exposed to client
- [x] Admin role verification on every API route

### 16.2 API Security

- [ ] Rate limiting on contact form API
- [ ] Rate limiting on upload API
- [ ] Zod validation on all API inputs
- [ ] Input sanitization (strip HTML, prevent XSS)
- [ ] CSRF-aware token where needed
- [ ] Request size limits

### 16.3 File Upload Security

- [x] Upload via server-side API only (no direct client upload)
- [ ] Validate file type (only images: jpg, png, webp, avif)
- [ ] Validate file size (max 5MB)
- [ ] Validate MIME type server-side
- [ ] Reject SVG files (XSS risk)
- [ ] Cloudinary virus scanning (if available)

### 16.4 Database Security

- [x] RLS enabled on all tables
- [x] Prepared statements via Supabase JS client
- [ ] No raw SQL queries in application code
- [ ] Service role key used only in server-side code

### 16.5 Frontend Security

- [x] Environment variables separation
- [ ] No secret keys in client bundle
- [ ] Content Security Policy headers
- [ ] XSS prevention in rich text rendering (use DOMPurify)
- [ ] Secure cookie handling for auth sessions

### 16.6 Infrastructure Security

- [ ] HTTPS enforced (Vercel default)
- [ ] Secure headers (CSP, X-Frame-Options, etc.)
- [ ] DDoS protection (Vercel + Cloudflare optional)
- [ ] Regular dependency updates
- [ ] No sensitive data in logs
- [ ] `.env.local` in `.gitignore`

### 16.7 Rate Limiting Implementation

```typescript
// src/lib/security/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Option 1: Upstash (Vercel-friendly)
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '60 s'), // 5 requests per minute
});

// Option 2: In-memory (simpler, for low traffic)
const rateMap = new Map<string, { count: number; resetAt: number }>();
```

---

## 17. Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# TypeScript check
npx tsc --noEmit

# Add shadcn/ui component
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add select
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add badge
npx shadcn@latest add skeleton
npx shadcn@latest add textarea
npx shadcn@latest add toast
npx shadcn@latest add separator

# Update dependencies
npm update

# Check for outdated packages
npm outdated
```

---

## 18. First-Time Setup Steps (Ordered)

### Step 1: Create Supabase Project
1. Go to https://supabase.com → New Project
2. Choose region closest to Azerbaijan (Frankfurt or Stockholm)
3. Set database password
4. Wait for provisioning (~2 minutes)

### Step 2: Run SQL Schema
1. Open Supabase Dashboard → SQL Editor
2. Run the full SQL from [Section 5](#5-supabase-sql-schema) in order
3. Verify all tables created successfully

### Step 3: Create Admin User
1. Supabase Dashboard → Authentication → Users → Add User
2. Copy the User ID
3. Run the INSERT INTO `admins` query from [Section 7.2](#72-insert-admin-record)

### Step 4: Set Up Cloudinary
1. Create Cloudinary account
2. Get API credentials
3. Create folder structure (optional, auto-created on first upload)

### Step 5: Create Google Analytics Property
1. Create GA4 property
2. Get Measurement ID
3. Note it for environment variables

### Step 6: Set Up Google Search Console
1. Add property (domain or URL prefix)
2. Verify ownership (DNS TXT record or HTML file)
3. Submit sitemap after deployment

### Step 7: Initialize Next.js Project
```bash
npx create-next-app@latest fornitura --typescript --tailwind --app --src-dir
cd fornitura
npm install @supabase/supabase-js @supabase/ssr cloudinary zod clsx tailwind-merge
npm install lucide-react @next/third-parties google
npx shadcn@latest init
# Add all required shadcn/ui components
```

### Step 8: Configure Environment
1. Copy `.env.example` to `.env.local`
2. Fill in all values
3. Never commit `.env.local`

### Step 9: Implement Core Structure
1. Set up middleware (locale detection)
2. Set up i18n configuration
3. Create Supabase client and server utilities
4. Create layout components (Header, Footer)
5. Create database types
6. Implement dictionary files

### Step 10: Build Pages in Order
1. Home page
2. Catalog page
3. Category page
4. Product detail page
5. Contact page
6. About page
7. Brands page
8. Repair service page
9. Blog pages

### Step 11: Build Admin Panel
1. Login page
2. Dashboard
3. Settings management
4. Product CRUD
5. Category CRUD
6. Brand CRUD
7. Blog CRUD
8. Messages viewer
9. Media library

### Step 12: Implement SEO
1. Generate metadata dynamically
2. Implement JSON-LD schemas
3. Create sitemap.xml
4. Create robots.txt
5. Add hreflang tags

### Step 13: Testing & QA
1. Test all 3 languages
2. Test WhatsApp message generation
3. Test admin CRUD operations
4. Test responsive design (mobile, tablet, desktop)
5. Test contact form submission
6. Test search and filters
7. Test SEO metadata (Open Graph, Twitter Cards)
8. Test page load performance (Lighthouse)

### Step 14: Deploy to Vercel
1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy
5. Test production URL
6. Set up custom domain (optional)
7. Submit sitemap to Google Search Console

---

## Quick Reference Card

```
┌────────────────────────────────────────────────────────────────┐
│                     FORNITURA — Quick Reference                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  Supabase Dashboard: https://supabase.com/dashboard/           │
│  Cloudinary Console: https://cloudinary.com/console/           │
│  Google Analytics:   https://analytics.google.com/             │
│  Search Console:     https://search.google.com/search-console  │
│  Vercel Dashboard:   https://vercel.com/dashboard              │
│  GitHub:             https://github.com                        │
│                                                                │
│  Supabase DB URL:    Project Settings → API → Project URL     │
│  Supabase Anon Key:  Project Settings → API → anon public      │
│  Supabase Svc Role:  Project Settings → API → service_role     │
│  Cloudinary Name:    Dashboard → Account Details → Cloud Name  │
│  Cloudinary API Key: Dashboard → Account Details → API Key     │
│  Cloudinary Secret:  Dashboard → Account Details → API Secret  │
│  GA4 Measurement ID: Admin → Data Streams → Web → Stream       │
│                                                                │
│  Default Admin:      Created via Supabase Auth Dashboard       │
│  Admin Panel URL:    /admin/login                              │
│  Site URL:           https://fornitura.vercel.app              │
│  GitHub Repo:        git@github.com:user/fornitura.git         │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

> **Note:** Replace all placeholder values (`+994 XX XXX XX XX`, `admin@fornitura.com`, etc.) with actual company information before going live.
