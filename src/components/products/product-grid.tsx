import type { Product } from '@/types';
import type { Locale } from '@/lib/seo/constants';
import { ProductCard } from './product-card';
import { EmptyState } from '@/components/shared/empty-state';

interface ProductGridProps {
  products: Product[];
  locale: Locale;
  dictionary: any;
  settings: any;
  siteUrl: string;
}

export function ProductGrid({ products, locale, dictionary, settings, siteUrl }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <EmptyState
        title={dictionary.catalog.no_results}
        description={dictionary.catalog.no_results_desc}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          locale={locale}
          dictionary={dictionary}
          settings={settings}
          siteUrl={siteUrl}
        />
      ))}
    </div>
  );
}
