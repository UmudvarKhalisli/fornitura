import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getDictionary } from '@/i18n';
import { getProductBySlug } from '@/lib/db/queries/products';
import { getSiteSettings } from '@/lib/db/queries/settings';
import { generateSEOMetadata } from '@/lib/seo/generate-metadata';
import { Container } from '@/components/shared/container';
import { StockBadge } from '@/components/products/stock-badge';
import { WhatsAppInquiryButton } from '@/components/products/whatsapp-inquiry-button';
import { BreadcrumbSchema, JsonLd } from '@/components/seo';
import { getLocalizedField } from '@/lib/db/helpers';
import { ArrowLeft, Share2, Package } from 'lucide-react';
import Link from 'next/link';
import type { Locale } from '@/lib/seo/constants';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; productSlug: string }>;
}) {
  const { locale, productSlug } = await params;
  const product = await getProductBySlug(productSlug);
  const dictionary = await getDictionary(locale);
  const name = product ? (getLocalizedField(product, 'name', locale as Locale) as string) : '';

  return generateSEOMetadata({
    title: product?.[`seo_title_${locale}` as keyof typeof product]
      ? (product[`seo_title_${locale}` as keyof typeof product] as string)
      : `${name} - ${dictionary.seo.catalog_title}`,
    description: product?.[`seo_description_${locale}` as keyof typeof product]
      ? (product[`seo_description_${locale}` as keyof typeof product] as string)
      : product?.[`description_${locale}` as keyof typeof product] as string,
    locale: locale as Locale,
    path: `/product/${productSlug}`,
    image: product?.main_image || undefined,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; productSlug: string }>;
}) {
  const { locale, productSlug } = await params;
  const product = await getProductBySlug(productSlug);
  if (!product) notFound();

  const dictionary = await getDictionary(locale);
  const settings = await getSiteSettings();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fornitura.com';
  const productUrl = `${siteUrl}/${locale}/product/${product.slug}`;

  const name = getLocalizedField(product, 'name', locale as Locale) as string;
  const description = getLocalizedField(product, 'description', locale as Locale) as string;
  const categoryName = product.category
    ? (getLocalizedField(product.category, 'name', locale as Locale) as string)
    : '';
  const brandName = product.brand?.name || '';

  const breadcrumbItems = [
    { name: dictionary.nav.home, path: '' },
    { name: dictionary.nav.spare_parts, path: '/spare-parts' },
    ...(product.category
      ? [
          {
            name: categoryName,
            path: `/spare-parts/${product.category[`slug_${locale}` as keyof typeof product.category] as string}`,
          },
        ]
      : []),
    { name, path: `/product/${product.slug}` },
  ];

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description: description || name,
    sku: product.part_number,
    ...(brandName ? { brand: { '@type': 'Brand', name: brandName } } : {}),
    ...(categoryName ? { category: categoryName } : {}),
    image: product.main_image || undefined,
    offers: {
      '@type': 'Offer',
      url: productUrl,
      availability:
        product.stock_status === 'in_stock'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} locale={locale} />
      <JsonLd data={productSchema} />

      <section className="py-10 md:py-16 bg-white">
        <Container>
          <Link
            href={`/${locale}/spare-parts`}
            className="inline-flex items-center gap-1.5 text-sm text-medium-gray hover:text-deep-charcoal transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {dictionary.product.back_to_catalog}
          </Link>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Image gallery */}
            <div>
              <div className="relative aspect-square rounded-lg overflow-hidden bg-off-white border border-light-gray">
                {product.main_image ? (
                  <Image
                    src={product.main_image}
                    alt={name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Package className="w-20 h-20 text-light-gray" />
                  </div>
                )}
              </div>

              {product.images && product.images.length > 1 && (
                <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                  {product.images.map((img, i) => (
                    <div
                      key={i}
                      className="relative w-20 h-20 shrink-0 rounded-md overflow-hidden border border-light-gray bg-off-white"
                    >
                      <Image
                        src={img}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product info */}
            <div>
              <div className="mb-2">
                <StockBadge
                  status={product.stock_status}
                  inStockLabel={dictionary.product.in_stock}
                  outOfStockLabel={dictionary.product.out_of_stock}
                />
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-deep-charcoal tracking-tight mb-4">
                {name}
              </h1>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider text-metallic-silver font-medium min-w-[120px]">
                    {dictionary.product.part_number}
                  </span>
                  <span className="text-sm font-semibold text-deep-charcoal">
                    {product.part_number}
                  </span>
                </div>

                {categoryName && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider text-metallic-silver font-medium min-w-[120px]">
                      {dictionary.product.category}
                    </span>
                    <Link
                      href={`/${locale}/spare-parts/${product.category?.[`slug_${locale}` as keyof typeof product.category] || ''}`}
                      className="text-sm text-muted-gold hover:underline font-medium"
                    >
                      {categoryName}
                    </Link>
                  </div>
                )}

                {brandName && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider text-metallic-silver font-medium min-w-[120px]">
                      {dictionary.product.brand}
                    </span>
                    <span className="text-sm font-medium text-deep-charcoal">
                      {brandName}
                    </span>
                  </div>
                )}

                {product.compatible_models && product.compatible_models.length > 0 && (
                  <div className="flex items-start gap-2">
                    <span className="text-xs uppercase tracking-wider text-metallic-silver font-medium min-w-[120px] pt-0.5">
                      {dictionary.product.compatible_models}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.compatible_models.map((model) => (
                        <span
                          key={model}
                          className="px-2 py-0.5 bg-off-white text-xs text-medium-gray rounded-md border border-light-gray"
                        >
                          {model}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="border-t border-light-gray pt-6 mt-6">
                <WhatsAppInquiryButton
                  phone={settings?.whatsapp_number || ''}
                  productName={name}
                  partNumber={product.part_number}
                  productUrl={productUrl}
                  locale={locale}
                  label={dictionary.product.ask_price_whatsapp}
                  className="w-full sm:w-auto"
                />
              </div>

              {/* Description */}
              {description && (
                <div className="border-t border-light-gray pt-6 mt-6">
                  <h2 className="text-lg font-semibold text-deep-charcoal mb-3">
                    {dictionary.product.description}
                  </h2>
                  <div className="text-sm text-medium-gray leading-relaxed whitespace-pre-line">
                    {description}
                  </div>
                </div>
              )}

              {/* Share */}
              <div className="border-t border-light-gray pt-4 mt-6">
                <button
                  onClick={() => navigator.clipboard.writeText(productUrl)}
                  className="inline-flex items-center gap-1.5 text-sm text-medium-gray hover:text-deep-charcoal transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  {dictionary.product.share}
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
