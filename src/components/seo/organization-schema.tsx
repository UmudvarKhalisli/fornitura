import { SITE_NAME } from '@/lib/seo/constants';
import { JsonLd } from './json-ld';

export function OrganizationSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fornitura.vercel.app';
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: process.env.NEXT_PUBLIC_PHONE || '+994 50 210 79 20',
      contactType: 'customer service',
      availableLanguage: ['Azerbaijani', 'English', 'Russian'],
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AZ',
      addressLocality: 'Bakı',
    },
  };

  return <JsonLd data={data} />;
}
