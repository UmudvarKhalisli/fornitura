import { getLocalizedPath as getPath } from './routes';
import type { Locale } from '@/lib/seo/constants';

export function getLocalizedPath(locale: string, path: string): string {
  return getPath(path, locale as Locale);
}

export function getProductUrl(locale: string, slug: string): string {
  return getPath(`product/${slug}`, locale as Locale);
}

export function getCategoryUrl(locale: string, slug: string): string {
  return getPath(`spare-parts/${slug}`, locale as Locale);
}

export function getBlogUrl(locale: string, slug: string): string {
  return getPath(`blog/${slug}`, locale as Locale);
}
