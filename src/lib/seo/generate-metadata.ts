import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL, type Locale } from './constants';

interface SEOProps {
  title: string;
  description: string;
  locale: Locale;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedAt?: string;
  noindex?: boolean;
}

export function generateSEOMetadata({
  title,
  description,
  locale,
  path,
  image,
  type = 'website',
  publishedAt,
  noindex = false,
}: SEOProps): Metadata {
  const url = `${SITE_URL}/${locale}${path}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

  const languages: Record<string, string> = {};
  const locales: Locale[] = ['az', 'en', 'ru'];
  for (const l of locales) {
    languages[l] = `${SITE_URL}/${l}${path}`;
  }

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: locale === 'az' ? 'az-AZ' : locale === 'ru' ? 'ru-RU' : 'en-US',
      type,
      images: image
        ? [{ url: image, width: 1200, height: 630 }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: image ? [image] : [],
    },
    robots: noindex
      ? { index: false, follow: false }
      : undefined,
    ...(publishedAt && type === 'article'
      ? { other: { 'article:published_time': publishedAt } }
      : {}),
  };
}
