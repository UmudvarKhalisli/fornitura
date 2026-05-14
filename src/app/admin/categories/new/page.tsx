'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function NewCategoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name_az: '', name_en: '', name_ru: '',
    slug_az: '', slug_en: '', slug_ru: '',
    display_order: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed');
      router.push('/admin/categories');
    } catch {
      alert('Error creating category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-deep-charcoal mb-6">New Category</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">Name (AZ)</label>
            <Input required value={form.name_az} onChange={(e) => setForm({...form, name_az: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-medium">Name (EN)</label>
            <Input required value={form.name_en} onChange={(e) => setForm({...form, name_en: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-medium">Name (RU)</label>
            <Input required value={form.name_ru} onChange={(e) => setForm({...form, name_ru: e.target.value})} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">Slug (AZ)</label>
            <Input required value={form.slug_az} onChange={(e) => setForm({...form, slug_az: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-medium">Slug (EN)</label>
            <Input required value={form.slug_en} onChange={(e) => setForm({...form, slug_en: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-medium">Slug (RU)</label>
            <Input required value={form.slug_ru} onChange={(e) => setForm({...form, slug_ru: e.target.value})} />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Display Order</label>
          <Input type="number" value={form.display_order} onChange={(e) => setForm({...form, display_order: parseInt(e.target.value) || 0})} />
        </div>
        <div className="flex gap-3">
          <Button type="submit" disabled={loading} className="bg-deep-charcoal hover:bg-dark-graphite">
            {loading ? 'Saving...' : 'Create Category'}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}
