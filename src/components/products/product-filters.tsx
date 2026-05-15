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
      <div className="hidden md:flex items-center gap-4 bg-off-white p-3 rounded-2xl border border-light-gray/50 shadow-sm">
        <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={dictionary.catalog.search_placeholder}
            className="pl-4 pr-12 h-11 bg-white border-none shadow-sm rounded-xl focus-visible:ring-1 focus-visible:ring-muted-gold"
          />
          <Button 
            type="submit" 
            size="icon" 
            className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 bg-muted-gold text-white hover:bg-[#e6b800] rounded-lg shadow-sm"
          >
            <Search className="w-4 h-4" />
          </Button>
        </form>

        <div className="w-px h-8 bg-light-gray mx-2" />

        <Select
          value={currentCategory || 'hamisi'}
          onValueChange={(v) => updateFilter('category', v === 'hamisi' ? null : v)}
        >
          <SelectTrigger className="w-[200px] h-11 bg-white border-none shadow-sm rounded-xl focus:ring-1 focus:ring-muted-gold">
            <SelectValue placeholder="Hamısı" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="hamisi" className="rounded-lg">Hamısı</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.slug_en} className="rounded-lg">
                {cat[`name_${locale}` as keyof typeof cat] as string}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasFilters && (
          <Button variant="ghost" onClick={clearFilters} className="text-sm gap-1 h-11 px-4 hover:bg-light-gray/20 rounded-xl text-medium-gray hover:text-deep-charcoal">
            <X className="w-4 h-4" />
            {dictionary.catalog.clear_filters}
          </Button>
        )}
      </div>

      {/* Mobile filters */}
      <div className="md:hidden space-y-3">
        <div className="flex items-center gap-2">
          <form onSubmit={handleSearch} className="relative flex-1">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={dictionary.catalog.search_placeholder}
              className="pl-4 pr-12 h-12 bg-white border-light-gray/50 shadow-sm rounded-xl focus-visible:ring-1 focus-visible:ring-muted-gold"
            />
            <Button 
              type="submit" 
              size="icon" 
              className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 bg-muted-gold text-white hover:bg-[#e6b800] rounded-lg shadow-sm"
            >
              <Search className="w-5 h-5" />
            </Button>
          </form>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              "h-12 w-12 rounded-xl border-light-gray/50 shadow-sm transition-colors",
              mobileOpen ? "bg-muted-gold text-white border-muted-gold" : "bg-white text-deep-charcoal"
            )}
          >
            <SlidersHorizontal className="w-5 h-5" />
          </Button>
        </div>

        {mobileOpen && (
          <div className="space-y-3 p-4 bg-off-white rounded-lg border border-light-gray">
            <Select
              value={currentCategory || 'hamisi'}
              onValueChange={(v) => updateFilter('category', v === 'hamisi' ? null : v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Hamısı" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hamisi">Hamısı</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.slug_en}>
                    {cat[`name_${locale}` as keyof typeof cat] as string}
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
