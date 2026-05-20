import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL, PATH_MAP, type Locale } from './constants';

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

function localizePathSegment(segment: string, loc: Locale): string {
  return PATH_MAP[segment]?.[loc] || segment;
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
  const getLocPath = (l: Locale) => {
    const segments = path.split('/').filter(Boolean);
    const locSegments = segments.map(s => localizePathSegment(s, l));
    return `/${l}/${locSegments.join('/')}`;
  };

  const url = `${SITE_URL}${path === '/' ? `/${locale}` : getLocPath(locale)}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

  const languages: Record<string, string> = {};
  const locales: Locale[] = ['az', 'en', 'ru'];
  for (const l of locales) {
    languages[l] = `${SITE_URL}${path === '/' ? `/${l}` : getLocPath(l)}`;
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
