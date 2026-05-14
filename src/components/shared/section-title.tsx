import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  light?: boolean;
}

export function SectionTitle({ title, subtitle, className, light }: SectionTitleProps) {
  return (
    <div className={cn('text-center max-w-2xl mx-auto mb-10 md:mb-14', className)}>
      <h2
        className={cn(
          'text-3xl md:text-4xl font-bold tracking-tight',
          light ? 'text-white' : 'text-deep-charcoal'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-3 text-base md:text-lg leading-relaxed',
            light ? 'text-metallic-silver' : 'text-medium-gray'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
