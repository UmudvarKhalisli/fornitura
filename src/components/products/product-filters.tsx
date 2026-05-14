'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { Category, Brand } from '@/types';

interface ProductFiltersProps {
  categories: Category[];
  brands: Brand[];
  dictionary: any;
  locale: string;
  currentCategory?: string;
  currentBrand?: string;
  currentQuery?: string;
}

export function ProductFilters({
  categories,
  brands,
  dictionary,
  locale,
  currentCategory,
  currentBrand,
  currentQuery,
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(currentQuery || '');
  const [mobileOpen, setMobileOpen] = useState(false);

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilter('q', search || null);
  };

  const clearFilters = () => {
    setSearch('');
    router.push(`/${locale}/spare-parts`);
  };

  const hasFilters = currentCategory || currentBrand || currentQuery;

  return (
    <div className="mb-8">
      {/* Desktop filters */}
      <div className="hidden md:flex items-center gap-4">
        <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-medium-gray" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={dictionary.catalog.search_placeholder}
            className="pl-9 pr-4 h-10"
          />
        </form>

        <Select
          value={currentCategory || 'all'}
          onValueChange={(v) => updateFilter('category', v === 'all' ? null : v)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder={dictionary.catalog.all_categories} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{dictionary.catalog.all_categories}</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.slug_en}>
                {cat[`name_${locale}` as keyof typeof cat] as string}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={currentBrand || 'all'}
          onValueChange={(v) => updateFilter('brand', v === 'all' ? null : v)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder={dictionary.catalog.all_brands} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{dictionary.catalog.all_brands}</SelectItem>
            {brands.map((brand) => (
              <SelectItem key={brand.id} value={brand.slug}>
                {brand.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasFilters && (
          <Button variant="ghost" onClick={clearFilters} className="text-sm gap-1">
            <X className="w-4 h-4" />
            {dictionary.catalog.clear_filters}
          </Button>
        )}
      </div>

      {/* Mobile filters */}
      <div className="md:hidden space-y-3">
        <div className="flex items-center gap-2">
          <form onSubmit={handleSearch} className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-medium-gray" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={dictionary.catalog.search_placeholder}
              className="pl-9 pr-4 h-10"
            />
          </form>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(mobileOpen && 'bg-off-white')}
          >
            <SlidersHorizontal className="w-4 h-4" />
          </Button>
        </div>

        {mobileOpen && (
          <div className="space-y-3 p-4 bg-off-white rounded-lg border border-light-gray">
            <Select
              value={currentCategory || 'all'}
              onValueChange={(v) => updateFilter('category', v === 'all' ? null : v)}
            >
              <SelectTrigger>
                <SelectValue placeholder={dictionary.catalog.all_categories} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{dictionary.catalog.all_categories}</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.slug_en}>
                    {cat[`name_${locale}` as keyof typeof cat] as string}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={currentBrand || 'all'}
              onValueChange={(v) => updateFilter('brand', v === 'all' ? null : v)}
            >
              <SelectTrigger>
                <SelectValue placeholder={dictionary.catalog.all_brands} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{dictionary.catalog.all_brands}</SelectItem>
                {brands.map((brand) => (
                  <SelectItem key={brand.id} value={brand.slug}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasFilters && (
              <Button variant="ghost" onClick={clearFilters} className="w-full text-sm gap-1">
                <X className="w-4 h-4" />
                {dictionary.catalog.clear_filters}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
