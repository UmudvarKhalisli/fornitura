export function getLocalizedPath(locale: string, path: string): string {
  return `/${locale}${path.startsWith('/') ? '' : '/'}${path}`;
}

export function getProductUrl(locale: string, slug: string): string {
  return `/${locale}/product/${slug}`;
}

export function getCategoryUrl(locale: string, slug: string): string {
  return `/${locale}/spare-parts/${slug}`;
}

export function getBlogUrl(locale: string, slug: string): string {
  return `/${locale}/blog/${slug}`;
}
