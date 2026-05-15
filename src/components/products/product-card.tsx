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
      className="group flex flex-col bg-white rounded-xl border border-light-gray/50 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-muted-gold/5 hover:-translate-y-1 hover:border-muted-gold/30 transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-off-white overflow-hidden w-full">
        {product.main_image ? (
          <Image
            src={product.main_image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-light-gray/20">
            <span className="text-5xl font-bold text-medium-gray/30">F</span>
          </div>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-3 left-3 z-10">
          <StockBadge
            status={product.stock_status}
            inStockLabel={dictionary.product.in_stock}
            outOfStockLabel={dictionary.product.out_of_stock}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="mb-4 flex-1">
          <p className="text-xs text-metallic-silver font-medium tracking-wider uppercase mb-2 flex items-center gap-2">
            <span className="w-4 h-[1px] bg-muted-gold inline-block"></span>
            {product.part_number}
          </p>
          <h3 className="text-base font-semibold text-deep-charcoal group-hover:text-muted-gold transition-colors line-clamp-2 leading-tight mb-2">
            {name}
          </h3>
          {shortDesc && (
            <p className="text-sm text-medium-gray line-clamp-2 leading-relaxed">
              {shortDesc}
            </p>
          )}
        </div>

        <div className="mt-auto pt-4 border-t border-light-gray/30">
          <WhatsAppInquiryButton
            phone={settings?.whatsapp_number || '+994 50 210 79 20'}
            productName={name}
            partNumber={product.part_number}
            productUrl={productUrl}
            locale={locale}
            label={dictionary.product.ask_price_whatsapp}
            variant="small"
            className="w-full bg-off-white text-deep-charcoal hover:bg-muted-gold hover:text-white border-none shadow-sm transition-all duration-300"
          />
        </div>
      </div>
    </Link>
  );
}
