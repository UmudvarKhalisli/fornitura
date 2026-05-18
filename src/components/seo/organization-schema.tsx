import { SITE_NAME } from '@/lib/seo/constants';
import { JsonLd } from './json-ld';

export function OrganizationSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fornitura.az';
  const phone = process.env.NEXT_PUBLIC_PHONE || '994502107920';
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Fornitura',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: "Ekskavator, kran, buldozer və digər ağır texnikalar üçün ehtiyat hissələrinin satışı",
    address: {
      '@type': 'PostalAddress',
      addressLocality: "Bakı",
      addressCountry: "AZ"
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: `+${phone}`,
      contactType: 'customer service',
      availableLanguage: ['Azerbaijani', 'Russian'],
    },
  };

  return <JsonLd data={data} />;
}
