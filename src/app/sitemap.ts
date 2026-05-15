import type { MetadataRoute } from 'next';

const locales = ['az', 'en', 'ru'] as const;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fornitura.vercel.app';

const staticPages = [
  { path: '', changefreq: 'weekly' as const, priority: 1.0 },
  { path: '/spare-parts', changefreq: 'daily' as const, priority: 0.9 },
  { path: '/repair-service', changefreq: 'monthly' as const, priority: 0.7 },
  { path: '/about', changefreq: 'monthly' as const, priority: 0.6 },
  { path: '/brands', changefreq: 'weekly' as const, priority: 0.7 },
  { path: '/contact', changefreq: 'monthly' as const, priority: 0.5 },
  { path: '/blog', changefreq: 'weekly' as const, priority: 0.6 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages for all locales
  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${siteUrl}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changefreq,
        priority: page.priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${siteUrl}/${l}${page.path}`])
          ),
        },
      });
    }
  }

  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Product pages
    const { data: products } = await supabase
      .from('products')
      .select('slug, updated_at')
      .eq('is_active', true);

    if (products) {
      for (const locale of locales) {
        for (const product of products) {
          entries.push({
            url: `${siteUrl}/${locale}/product/${product.slug}`,
            lastModified: new Date(product.updated_at),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
            alternates: {
              languages: Object.fromEntries(
                locales.map((l) => [l, `${siteUrl}/${l}/product/${product.slug}`])
              ),
            },
          });
        }
      }
    }

    // Category pages
    const { data: categories } = await supabase
      .from('categories')
      .select('slug_az, slug_en, slug_ru, updated_at')
      .eq('is_active', true);

    if (categories) {
      for (const l of locales) {
        for (const cat of categories) {
          const slugKey = `slug_${l}` as keyof typeof cat;
          const slug = cat[slugKey] as string;
          if (slug) {
            entries.push({
              url: `${siteUrl}/${l}/spare-parts/${slug}`,
              lastModified: new Date(cat.updated_at),
              changeFrequency: 'weekly' as const,
              priority: 0.7,
            });
          }
        }
      }
    }

    // Blog pages
    const { data: posts } = await supabase
      .from('blog_posts')
      .select('slug_az, slug_en, slug_ru, updated_at, published_at')
      .eq('is_published', true);

    if (posts) {
      for (const locale of locales) {
        const slugKey = `slug_${locale}` as keyof typeof posts[0];
        for (const post of posts) {
          const slug = post[slugKey] as string;
          if (slug) {
            entries.push({
              url: `${siteUrl}/${locale}/blog/${slug}`,
              lastModified: new Date(post.updated_at),
              changeFrequency: 'monthly' as const,
              priority: 0.5,
              alternates: {
                languages: Object.fromEntries(
                  locales.map((l) => {
                    const s = post[`slug_${l}` as keyof typeof post] as string;
                    return [l, `${siteUrl}/${l}/blog/${s}`];
                  })
                ),
              },
            });
          }
        }
      }
    }
  } catch {
    // If DB is not available, return static pages only
  }

  return entries;
}
