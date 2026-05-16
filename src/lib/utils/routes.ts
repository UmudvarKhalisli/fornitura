import { PATH_MAP, type Locale } from '@/lib/seo/constants';

/**
 * Converts an internal path (e.g. 'spare-parts') to its localized version.
 */
export function getLocalizedPath(path: string, locale: Locale): string {
  const segments = path.split('/').filter(Boolean);
  
  const localizedSegments = segments.map(segment => {
    // Check if this segment is in our PATH_MAP
    if (PATH_MAP[segment]) {
      return PATH_MAP[segment][locale] || segment;
    }
    return segment;
  });

  return `/${locale}/${localizedSegments.join('/')}`;
}

/**
 * Converts a localized path (e.g. 'ehtiyat-hisseleri') back to its internal version.
 */
export function getInternalPath(path: string, locale: Locale): string {
  const segments = path.split('/').filter(Boolean);
  
  // Remove locale prefix if present
  if (segments[0] === locale) {
    segments.shift();
  }

  const internalSegments = segments.map(segment => {
    // Find the internal key for this localized segment
    for (const [key, mapping] of Object.entries(PATH_MAP)) {
      if (mapping[locale] === segment) {
        return key;
      }
    }
    return segment;
  });

  return internalSegments.join('/');
}

/**
 * Helper to translate a full URL from one locale to another.
 */
export function translateUrl(pathname: string, fromLocale: Locale, toLocale: Locale): string {
  const segments = pathname.split('/').filter(Boolean);
  
  // Remove old locale
  if (segments[0] === fromLocale) {
    segments.shift();
  }

  // Convert localized segments back to internal keys
  const internalSegments = segments.map(segment => {
    for (const [key, mapping] of Object.entries(PATH_MAP)) {
      if (mapping[fromLocale] === segment) {
        return key;
      }
    }
    return segment;
  });

  // Convert internal keys to new localized segments
  const newLocalizedSegments = internalSegments.map(segment => {
    if (PATH_MAP[segment]) {
      return PATH_MAP[segment][toLocale] || segment;
    }
    return segment;
  });

  return `/${toLocale}${newLocalizedSegments.length > 0 ? '/' + newLocalizedSegments.join('/') : ''}`;
}
