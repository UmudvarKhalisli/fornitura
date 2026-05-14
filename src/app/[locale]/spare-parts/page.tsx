import { Suspense } from 'react';
import { getDictionary } from '@/i18n';
import { getActiveCategories } from '@/lib/db/queries/categories';
import { getActiveBrands } from '@/lib/db/queries/brands';
import { searchProducts } from '@/lib/db/queries/products';
import { getSiteSettings } from '@/lib/db/queries/settings';
import { generateSEOMetadata } from '@/lib/seo/generate-metadata';
import { Container } from '@/components/shared/container';
import { SectionTitle } from '@/components/shared/section-title';
import { ProductGrid } from '@/components/products/product-grid';
import { ProductGridSkeleton } from '@/components/shared/loading';
import { Pagination } from '@/components/shared/pagination';
import { ProductFilters } from '@/components/products/product-filters';
import { BreadcrumbSchema } from '@/components/seo';
import type { Locale } from '@/lib/seo/constants';

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

      <section className="py-12 md:py-16 bg-white">
        <Container>
          <SectionTitle title={dictionary.catalog.title} subtitle={dictionary.catalog.subtitle} />

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
