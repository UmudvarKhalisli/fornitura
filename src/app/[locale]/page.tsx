import { getDictionary } from '@/i18n';
import { getSiteSettings } from '@/lib/db/queries/settings';
import { getActiveCategories } from '@/lib/db/queries/categories';
import { getFeaturedProducts } from '@/lib/db/queries/products';
import { getActiveBrands } from '@/lib/db/queries/brands';
import { generateSEOMetadata } from '@/lib/seo/generate-metadata';
import { HeroSection } from '@/components/home/hero-section';
import { CategoriesSection } from '@/components/home/categories-section';
import { FeaturedProducts } from '@/components/home/featured-products';
import { WhyChooseUs } from '@/components/home/why-choose-us';
import { RepairIntro } from '@/components/home/repair-intro';
import { BrandsSection } from '@/components/home/brands-section';
import { CTASection } from '@/components/home/cta-section';
import type { Locale } from '@/lib/seo/constants';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  return generateSEOMetadata({
    title: dictionary.seo.home_title,
    description: dictionary.seo.home_desc,
    locale: locale as Locale,
    path: '',
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const settings = await getSiteSettings();
  const [categories, featuredProducts, brands] = await Promise.all([
    getActiveCategories(),
    getFeaturedProducts(locale, 8),
    getActiveBrands(),
  ]);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fornitura.com';

  return (
    <>
      <HeroSection dictionary={dictionary} locale={locale} settings={settings} />
      <CategoriesSection categories={categories} locale={locale} dictionary={dictionary} />
      <FeaturedProducts
        products={featuredProducts}
        locale={locale as Locale}
        dictionary={dictionary}
        settings={settings}
        siteUrl={siteUrl}
      />
      <WhyChooseUs dictionary={dictionary} />
      <RepairIntro dictionary={dictionary} locale={locale} settings={settings} />
      <BrandsSection brands={brands} dictionary={dictionary} />
      <CTASection dictionary={dictionary} settings={settings} />
    </>
  );
}
