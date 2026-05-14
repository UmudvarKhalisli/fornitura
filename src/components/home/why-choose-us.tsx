import { ShieldCheck, Truck, HeadphonesIcon, Award } from 'lucide-react';
import { Container } from '@/components/shared/container';
import { SectionTitle } from '@/components/shared/section-title';

interface WhyChooseUsProps {
  dictionary: any;
}

const icons = [ShieldCheck, Truck, HeadphonesIcon, Award];

export function WhyChooseUs({ dictionary }: WhyChooseUsProps) {
  const features = [
    { key: 'quality', icon: ShieldCheck },
    { key: 'delivery', icon: Truck },
    { key: 'support', icon: HeadphonesIcon },
    { key: 'experience', icon: Award },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <SectionTitle
          title={dictionary.home.why_choose_us}
          subtitle={dictionary.home.why_choose_us_desc}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="group text-center p-6 md:p-8 rounded-lg border border-light-gray hover:border-muted-gold/30 hover:shadow-sm transition-all duration-200"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-off-white group-hover:bg-muted-gold/10 flex items-center justify-center mb-4 transition-colors">
                <Icon className="w-8 h-8 text-muted-gold" />
              </div>
              <h3 className="text-base font-semibold text-deep-charcoal mb-2">
                {dictionary.home[key]}
              </h3>
              <p className="text-sm text-medium-gray leading-relaxed">
                {dictionary.home[`${key}_desc`]}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
