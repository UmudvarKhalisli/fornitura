import Link from 'next/link';
import Image from 'next/image';
import { StockBadge } from './stock-badge';
import { WhatsAppInquiryButton } from './whatsapp-inquiry-button';
import type { Product } from '@/types';
import { getLocalizedField } from '@/lib/db/helpers';
import type { Locale } from '@/lib/seo/constants';

interface ProductCardProps {
  product: Product;
  locale: Locale;
  dictionary: any;
  settings: any;
  siteUrl: string;
}

export function ProductCard({ product, locale, dictionary, settings, siteUrl }: ProductCardProps) {
  const name = getLocalizedField(product, 'name', locale) || product.name_en;
  const shortDesc = getLocalizedField(product, 'short_description', locale);
  const productUrl = `${siteUrl}/${locale}/product/${product.slug}`;

  return (
    <Link
      href={`/${locale}/product/${product.slug}`}
      className="group block rounded-lg border border-light-gray bg-white overflow-hidden hover:shadow-md hover:border-muted-gold/30 transition-all duration-200"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-off-white overflow-hidden">
        {product.main_image ? (
          <Image
            src={product.main_image}
            alt={name}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-light-gray">F</span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <StockBadge
            status={product.stock_status}
            inStockLabel={dictionary.product.in_stock}
            outOfStockLabel={dictionary.product.out_of_stock}
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-metallic-silver uppercase tracking-wider mb-1">
          {dictionary.product.part_number}: {product.part_number}
        </p>
        <h3 className="text-sm font-semibold text-deep-charcoal group-hover:text-muted-gold transition-colors line-clamp-2 mb-1">
          {name}
        </h3>
        {shortDesc && (
          <p className="text-xs text-medium-gray line-clamp-2 mb-3">{shortDesc}</p>
        )}

        <div onClick={(e) => e.preventDefault()}>
          <WhatsAppInquiryButton
            phone={settings?.whatsapp_number || ''}
            productName={name}
            partNumber={product.part_number}
            productUrl={productUrl}
            locale={locale}
            label={dictionary.product.ask_price_whatsapp}
            variant="small"
            className="w-full mt-2"
          />
        </div>
      </div>
    </Link>
  );
}
