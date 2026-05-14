import Image from 'next/image';
import { getDictionary } from '@/i18n';
import { getActiveBrands } from '@/lib/db/queries/brands';
import { generateSEOMetadata } from '@/lib/seo/generate-metadata';
import { Container } from '@/components/shared/container';
import { SectionTitle } from '@/components/shared/section-title';
import { BreadcrumbSchema } from '@/components/seo';
import { getLocalizedField } from '@/lib/db/helpers';
import type { Locale } from '@/lib/seo/constants';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  return generateSEOMetadata({
    title: dictionary.seo.brands_title,
    description: dictionary.seo.brands_desc,
    locale: locale as Locale,
    path: '/brands',
  });
}

export default async function BrandsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const brands = await getActiveBrands();

  const breadcrumbItems = [
    { name: dictionary.nav.home, path: '' },
    { name: dictionary.nav.brands, path: '/brands' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} locale={locale} />

      <section className="py-12 md:py-20 bg-white">
        <Container>
          <SectionTitle title={dictionary.brands.title} subtitle={dictionary.brands.subtitle} />

          {brands.length === 0 ? (
            <div className="text-center py-16 text-medium-gray">
              <p>No brands available</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {brands.map((brand) => {
                const desc = getLocalizedField(brand, 'description', locale as Locale) as string;
                return (
                  <div
                    key={brand.id}
                    className="flex flex-col items-center text-center p-6 rounded-lg border border-light-gray hover:border-muted-gold/30 hover:shadow-sm transition-all duration-200"
                  >
                    <div className="w-20 h-20 rounded-full bg-off-white flex items-center justify-center mb-4">
                      {brand.logo_url ? (
                        <Image
                          src={brand.logo_url}
                          alt={brand.name}
                          width={60}
                          height={60}
                          className="object-contain"
                        />
                      ) : (
                        <span className="text-2xl font-bold text-medium-gray">
                          {brand.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-deep-charcoal mb-1">{brand.name}</h3>
                    {desc && (
                      <p className="text-xs text-medium-gray line-clamp-2">{desc}</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
