import { notFound } from 'next/navigation';
import { getDictionary } from '@/i18n';
import { getActiveCategories, getCategoryBySlug } from '@/lib/db/queries/categories';
import { getActiveBrands } from '@/lib/db/queries/brands';
import { searchProducts } from '@/lib/db/queries/products';
import { getSiteSettings } from '@/lib/db/queries/settings';
import { generateSEOMetadata } from '@/lib/seo/generate-metadata';
import { Container } from '@/components/shared/container';
import { ProductGrid } from '@/components/products/product-grid';
import { ProductFilters } from '@/components/products/product-filters';
import { BreadcrumbSchema } from '@/components/seo';
import type { Locale } from '@/lib/seo/constants';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; categorySlug: string }>;
}) {
  const { locale, categorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);
  const dictionary = await getDictionary(locale);
  const name = category?.[`name_${locale}` as keyof typeof category] as string || category?.name_en || '';

  return generateSEOMetadata({
    title: category?.[`seo_title_${locale}` as keyof typeof category]
      ? (category[`seo_title_${locale}` as keyof typeof category] as string)
      : `${name} - ${dictionary.seo.catalog_title}`,
    description: category?.[`seo_description_${locale}` as keyof typeof category]
      ? (category[`seo_description_${locale}` as keyof typeof category] as string)
      : `${name} - ${dictionary.seo.catalog_desc}`,
    locale: locale as Locale,
    path: `/spare-parts/${categorySlug}`,
  });
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; categorySlug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale, categorySlug } = await params;
  const sp = await searchParams;
  const page = parseInt(sp.page as string) || 1;
  const brandSlug = (sp.brand as string) || '';

  const category = await getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const dictionary = await getDictionary(locale);
  const [categories, brands, settings] = await Promise.all([
    getActiveCategories(),
    getActiveBrands(),
    getSiteSettings(),
  ]);

  const brand = brands.find((b) => b.slug === brandSlug);
  const { products, count } = await searchProducts('', locale, category.id, brand?.id, page, 12);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fornitura.com';
  const categoryName = category[`name_${locale}` as keyof typeof category] as string || category.name_en;

  const breadcrumbItems = [
    { name: dictionary.nav.home, path: '' },
    { name: dictionary.nav.spare_parts, path: '/spare-parts' },
    { name: categoryName, path: `/spare-parts/${categorySlug}` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} locale={locale} />

      <section className="py-12 md:py-16 bg-white">
        <Container>
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-deep-charcoal tracking-tight mb-2">
              {categoryName}
            </h1>
            {category[`description_${locale}` as keyof typeof category] && (
              <p className="text-medium-gray leading-relaxed max-w-2xl">
                {category[`description_${locale}` as keyof typeof category] as string}
              </p>
            )}
          </div>

          <ProductFilters
            categories={categories}
            brands={brands}
            dictionary={dictionary}
            locale={locale}
            currentCategory={categorySlug}
            currentBrand={brandSlug}
          />

          <ProductGrid
            products={products}
            locale={locale as Locale}
            dictionary={dictionary}
            settings={settings}
            siteUrl={siteUrl}
          />
        </Container>
      </section>
    </>
  );
}
