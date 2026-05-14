import Link from 'next/link';
import { Container } from '@/components/shared/container';
import { getDictionary } from '@/i18n';

export default async function LocaleNotFound({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Container className="text-center">
        <div className="text-8xl md:text-9xl font-bold text-light-gray mb-4">404</div>
        <h1 className="text-2xl md:text-3xl font-bold text-deep-charcoal mb-2">
          {dictionary.common.not_found}
        </h1>
        <p className="text-medium-gray mb-8 max-w-md mx-auto">
          {dictionary.common.not_found_desc}
        </p>
        <Link
          href={`/${locale}`}
          className="inline-flex items-center justify-center px-6 py-3 bg-deep-charcoal text-white font-medium rounded-md hover:bg-dark-graphite transition-colors"
        >
          {dictionary.common.go_home}
        </Link>
      </Container>
    </div>
  );
}
