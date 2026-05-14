import type { Locale } from '@/lib/seo/constants';

const dictionaries = {
  az: () => import('@/dictionaries/az.json').then((m) => m.default),
  en: () => import('@/dictionaries/en.json').then((m) => m.default),
  ru: () => import('@/dictionaries/ru.json').then((m) => m.default),
};

export async function getDictionary(locale: string) {
  return dictionaries[locale as Locale]?.() ?? dictionaries.en();
}

export function isValidLocale(locale: string): locale is Locale {
  return ['az', 'en', 'ru'].includes(locale);
}
