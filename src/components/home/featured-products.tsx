import Link from 'next/link';
import { Container } from '@/components/shared/container';
import { SectionTitle } from '@/components/shared/section-title';
import { ProductCard } from '@/components/products/product-card';
import type { Product } from '@/types';
import type { Locale } from '@/lib/seo/constants';

interface FeaturedProductsProps {
  products: Product[];
  locale: Locale;
  dictionary: any;
  settings: any;
  siteUrl: string;
}

export function FeaturedProducts({ products, locale, dictionary, settings, siteUrl }: FeaturedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-off-white">
      <Container>
        <SectionTitle
          title={dictionary.product.featured_title}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.slice(0, 4).map((product, index) => (
            <div key={product.id} className={index === 3 ? "hidden lg:block" : ""}>
              <ProductCard
                product={product}
                locale={locale}
                dictionary={dictionary}
                settings={settings}
                siteUrl={siteUrl}
              />
            </div>
          ))}
        </div>

        {products.length > 0 && (
          <div className="text-center mt-10">
            <Link
              href={`/${locale}/spare-parts`}
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-deep-charcoal text-deep-charcoal font-semibold rounded-md hover:bg-deep-charcoal hover:text-white transition-colors text-sm"
            >
              {dictionary.catalog.title}
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
