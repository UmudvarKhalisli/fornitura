import { PackageSearch } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ title, description, icon, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-20 px-4 text-center', className)}>
      <div className="w-16 h-16 rounded-full bg-off-white flex items-center justify-center mb-4">
        {icon || <PackageSearch className="w-8 h-8 text-metallic-silver" />}
      </div>
      <h3 className="text-lg font-semibold text-deep-charcoal mb-1">{title}</h3>
      <p className="text-sm text-medium-gray max-w-sm">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
