export const SITE_NAME = 'Fornitura';
export const SITE_DESCRIPTION = {
  az: 'Ağır texnika ehtiyat hissələri üçün etibarlı ünvan',
  en: 'Reliable source for heavy machinery spare parts',
  ru: 'Надёжный источник запчастей для тяжёлой техники',
};
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fornitura.com';
export const DEFAULT_LOCALE = 'az';
export const SUPPORTED_LOCALES = ['az', 'en', 'ru'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  az: 'Azərbaycan',
  en: 'English',
  ru: 'Русский',
};

export const LOCALE_PATHS: Record<Locale, string> = {
  az: '',
  en: '/en',
  ru: '/ru',
};
