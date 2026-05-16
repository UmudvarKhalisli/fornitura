import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PATH_MAP, SUPPORTED_LOCALES, DEFAULT_LOCALE, type Locale } from '@/lib/seo/constants';

const LOCALE_COOKIE = 'NEXT_LOCALE';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip non-page routes and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/static') ||
    pathname.match(/\.(png|jpe?g|gif|svg|webp|ico|xml|txt)$/i)
  ) {
    return NextResponse.next();
  }

  // Check if already has a locale prefix
  const pathLocale = SUPPORTED_LOCALES.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathLocale) {
    // Check if we need to rewrite a localized path to an internal path
    const segments = pathname.split('/').filter(Boolean);
    const locale = segments[0] as Locale;
    const remainingSegments = segments.slice(1);

    if (remainingSegments.length > 0) {
      let needsRewrite = false;
      const internalSegments = remainingSegments.map(segment => {
        // Find if this segment is a localized version of an internal path
        for (const [key, mapping] of Object.entries(PATH_MAP)) {
          // Only rewrite if the segment matches the localized version AND it's different from the internal key
          if (mapping[locale] === segment && segment !== key) {
            needsRewrite = true;
            return key;
          }
        }
        return segment;
      });

      if (needsRewrite) {
        const internalPath = `/${locale}/${internalSegments.join('/')}`;
        // Preserve query parameters
        const url = new URL(internalPath, request.url);
        url.search = request.nextUrl.search;
        return NextResponse.rewrite(url);
      }
    }

    const response = NextResponse.next();
    response.cookies.set(LOCALE_COOKIE, pathLocale);
    return response;
  }

  // Redirect to default locale
  const locale = request.cookies.get(LOCALE_COOKIE)?.value || DEFAULT_LOCALE;
  const newUrl = new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ['/((?!_next|api|admin|static|.*\\..*).*)'],
};
