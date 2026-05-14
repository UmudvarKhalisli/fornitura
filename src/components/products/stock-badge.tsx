import { cn } from '@/lib/utils';

interface StockBadgeProps {
  status: 'in_stock' | 'out_of_stock';
  inStockLabel?: string;
  outOfStockLabel?: string;
  className?: string;
}

export function StockBadge({
  status,
  inStockLabel = 'In Stock',
  outOfStockLabel = 'Out of Stock',
  className,
}: StockBadgeProps) {
  const isInStock = status === 'in_stock';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium',
        isInStock
          ? 'bg-green-50 text-success border border-green-200'
          : 'bg-red-50 text-error border border-red-200',
        className
      )}
    >
      <span
        className={cn(
          'w-1.5 h-1.5 rounded-full',
          isInStock ? 'bg-success' : 'bg-error'
        )}
      />
      {isInStock ? inStockLabel : outOfStockLabel}
    </span>
  );
}
