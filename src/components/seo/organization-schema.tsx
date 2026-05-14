import { SITE_NAME, SITE_URL } from '@/lib/seo/constants';
import { JsonLd } from './json-ld';

export function OrganizationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+994 XX XXX XX XX',
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
