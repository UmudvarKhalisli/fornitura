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

export const PATH_MAP: Record<string, Record<Locale, string>> = {
  'spare-parts': {
    az: 'ehtiyat-hisseleri',
    en: 'spare-parts',
    ru: 'zapasnye-chasti',
  },
  'repair-service': {
    az: 'temir-xidmeti',
    en: 'repair-service',
    ru: 'remont-servisi',
  },
  'about': {
    az: 'haqqimizda',
    en: 'about',
    ru: 'o-nas',
  },
  'contact': {
    az: 'elaqe',
    en: 'contact',
    ru: 'kontakty',
  },
  'blog': {
    az: 'bloq',
    en: 'blog',
    ru: 'blog',
  },
  'brands': {
    az: 'brendler',
    en: 'brands',
    ru: 'brendy',
  },
  'product': {
    az: 'mehsul',
    en: 'product',
    ru: 'tovar',
  },
  'info': {
    az: 'melumat',
    en: 'info',
    ru: 'informaciya',
  },
  'privacy-policy': {
    az: 'mexfilik-siyaseti',
    en: 'privacy-policy',
    ru: 'politika-konfidencialnosti',
  },
  'terms-of-service': {
    az: 'istifade-shertleri',
    en: 'terms-of-service',
    ru: 'usloviya-ispolzovaniya',
  }
};
