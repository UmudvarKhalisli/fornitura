'use client';

import { usePathname, useRouter } from 'next/navigation';
import { SUPPORTED_LOCALES, type Locale } from '@/lib/seo/constants';

const labels: Record<Locale, string> = { az: 'AZ', en: 'EN', ru: 'RU' };

export function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLanguage = (locale: string) => {
    const segments = pathname.split('/').filter(Boolean);
    if (SUPPORTED_LOCALES.includes(segments[0] as Locale)) {
      segments[0] = locale;
    } else {
      segments.unshift(locale);
    }
    router.push(`/${segments.join('/')}`);
  };

  return (
    <div className="flex items-center gap-1 border border-light-gray rounded-md overflow-hidden">
      {SUPPORTED_LOCALES.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLanguage(locale)}
          className={`px-2.5 py-1 text-xs font-medium uppercase transition-colors duration-150 ${
            currentLocale === locale
              ? 'bg-muted-gold text-white'
              : 'text-medium-gray hover:text-deep-charcoal hover:bg-off-white'
          }`}
        >
          {labels[locale]}
        </button>
      ))}
    </div>
  );
}
