import type { Locale } from '@/lib/seo/constants';

export function getLocalizedField<T extends Record<string, any>>(
  item: T | null | undefined,
  field: string,
  locale: Locale
): string {
  if (!item) return '';
  const val = item[`${field}_${locale}`] ?? item[`${field}_en`] ?? '';
  return String(val);
}

export function getSlugField(item: Record<string, string> | null | undefined, locale: Locale): string {
  if (!item) return '';
  return item[`slug_${locale}`] ?? item['slug'] ?? '';
}
