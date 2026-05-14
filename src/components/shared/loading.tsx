import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingProps {
  className?: string;
  text?: string;
}

export function Loading({ className, text }: LoadingProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-20 gap-4', className)}>
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-light-gray rounded-full" />
        <div className="absolute inset-0 border-4 border-muted-gold rounded-full border-t-transparent animate-spin" />
      </div>
      {text && <p className="text-sm text-medium-gray">{text}</p>}
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-lg border border-light-gray overflow-hidden">
      <Skeleton className="aspect-[4/3] w-full" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-8 w-full mt-3" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
