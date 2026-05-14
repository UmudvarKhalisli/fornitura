import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/shared/container';
import { SectionTitle } from '@/components/shared/section-title';
import type { Category } from '@/types';

interface CategoriesSectionProps {
  categories: Category[];
  locale: string;
  dictionary: any;
}

export function CategoriesSection({ categories, locale, dictionary }: CategoriesSectionProps) {
  if (categories.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <SectionTitle
          title={dictionary.categories.title}
          subtitle={dictionary.catalog.subtitle}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-5">
          {categories.map((category) => {
            const name = category[`name_${locale}` as keyof typeof category] as string;
            const slug = category[`slug_${locale}` as keyof typeof category] as string;
            return (
              <Link
                key={category.id}
                href={`/${locale}/spare-parts/${slug}`}
                className="group flex flex-col items-center text-center p-5 rounded-lg border border-light-gray bg-white hover:border-muted-gold/30 hover:shadow-sm transition-all duration-200"
              >
                <div className="w-14 h-14 rounded-full bg-off-white group-hover:bg-muted-gold/10 flex items-center justify-center mb-3 transition-colors duration-200">
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={name}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-xl font-bold text-medium-gray group-hover:text-muted-gold transition-colors">
                      {name.charAt(0)}
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium text-deep-charcoal group-hover:text-muted-gold transition-colors line-clamp-2">
                  {name}
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
