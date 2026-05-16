import { Suspense } from 'react';
import Image from 'next/image';
import { getDictionary } from '@/i18n';
import { getActiveCategories } from '@/lib/db/queries/categories';
import { getActiveBrands } from '@/lib/db/queries/brands';
import { searchProducts } from '@/lib/db/queries/products';
import { getSiteSettings } from '@/lib/db/queries/settings';
import { generateSEOMetadata } from '@/lib/seo/generate-metadata';
import { Container } from '@/components/shared/container';
import { ProductGrid } from '@/components/products/product-grid';
import { ProductGridSkeleton } from '@/components/shared/loading';
import { Pagination } from '@/components/shared/pagination';
import { ProductFilters } from '@/components/products/product-filters';
import { BreadcrumbSchema } from '@/components/seo';
import type { Locale } from '@/lib/seo/constants';
import Link from 'next/link';
import { getLocalizedPath } from '@/lib/utils/routes';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  return generateSEOMetadata({
    title: dictionary.seo.catalog_title,
    description: dictionary.seo.catalog_desc,
    locale: locale as Locale,
    path: '/spare-parts',
  });
}

export default async function SparePartsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  const page = parseInt(sp.page as string) || 1;
  const query = (sp.q as string) || '';
  const categorySlug = (sp.category as string) || '';
  const brandSlug = (sp.brand as string) || '';

  const dictionary = await getDictionary(locale);
  const [categories, brands, settings] = await Promise.all([
    getActiveCategories(),
    getActiveBrands(),
    getSiteSettings(),
  ]);

  // Look up category id and brand id by slug
  const category = categories.find(
    (c) => c.slug_en === categorySlug || c.slug_az === categorySlug || c.slug_ru === categorySlug
  );
  const brand = brands.find((b) => b.slug === brandSlug);

  const { products, count } = await searchProducts(query, locale, category?.id, brand?.id, page, 12);

  const totalPages = Math.ceil(count / 12);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fornitura.com';

  const breadcrumbItems = [
    { name: dictionary.nav.home, path: '' },
    { name: dictionary.nav.spare_parts, path: '/spare-parts' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} locale={locale} />

      {/* Premium Page Header */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 flex items-center bg-deep-charcoal overflow-hidden">
        <Image
          src="/catalog-bg.png"
          alt="Spare Parts Catalog"
          fill
          className="object-cover opacity-70"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-charcoal/95 via-deep-charcoal/50 to-transparent z-10" />
        <div className="absolute inset-0 opacity-[0.03] z-10" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, white 1px, transparent 0)`,
          backgroundSize: '50px 50px',
        }} />
        <div className="absolute top-0 left-0 w-24 h-1 bg-muted-gold z-20" />
        
        <Container className="relative z-20">
          <div className="max-w-3xl">
            <span className="inline-block text-muted-gold text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              {dictionary.nav.spare_parts}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {dictionary.catalog.title}
            </h1>
            <p className="text-base md:text-lg text-metallic-silver leading-relaxed max-w-xl mb-8">
              {dictionary.catalog.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={getLocalizedPath('spare-parts/info', locale as Locale)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-muted-gold text-deep-charcoal font-semibold rounded-lg hover:bg-[#e6b800] transition-all duration-300 shadow-lg hover:shadow-muted-gold/20"
              >
                {dictionary.repair_service.learn_more}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-16 bg-off-white">
        <Container>
          <Suspense fallback={<ProductGridSkeleton count={12} />}>
            <ProductFilters
              categories={categories}
              brands={brands}
              dictionary={dictionary}
              locale={locale}
              currentCategory={categorySlug}
              currentBrand={brandSlug}
              currentQuery={query}
            />

            <ProductGrid
              products={products}
              locale={locale as Locale}
              dictionary={dictionary}
              settings={settings}
              siteUrl={siteUrl}
            />

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              dictionary={dictionary}
            />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
