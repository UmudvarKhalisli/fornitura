import Image from 'next/image';
import { Container } from '@/components/shared/container';
import { SectionTitle } from '@/components/shared/section-title';
import type { Brand } from '@/types';

interface BrandsSectionProps {
  brands: Brand[];
  dictionary: any;
}

export function BrandsSection({ brands, dictionary }: BrandsSectionProps) {
  if (brands.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-white border-b border-light-gray">
      <Container>
        <SectionTitle
          title={dictionary.brands.title}
          subtitle={dictionary.brands.subtitle}
        />

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="flex items-center justify-center w-28 h-16 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              {brand.logo_url ? (
                <Image
                  src={brand.logo_url}
                  alt={brand.name}
                  width={100}
                  height={40}
                  className="object-contain max-h-12"
                />
              ) : (
                <span className="text-sm font-semibold text-medium-gray">
                  {brand.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
