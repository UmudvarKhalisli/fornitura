import { SITE_URL } from '@/lib/seo/constants';
import { JsonLd } from './json-ld';

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
  locale: string;
}

export function BreadcrumbSchema({ items, locale }: BreadcrumbSchemaProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}/${locale}${item.path}`,
    })),
  };

  return <JsonLd data={data} />;
}
