'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState<any>({
    name_az: '', name_en: '', name_ru: '',
    slug: '', part_number: '',
    description_az: '', description_en: '', description_ru: '',
    short_description_az: '', short_description_en: '', short_description_ru: '',
    stock_status: 'in_stock',
    is_featured: false,
  });

  useEffect(() => {
    fetch(`/api/admin/products?id=${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data) setForm(data);
        setFetching(false);
      })
      .catch(() => setFetching(false));
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: params.id, ...form }),
      });
      if (!res.ok) throw new Error('Failed');
      router.push('/admin/products');
    } catch {
      alert('Error updating product');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="p-6 text-medium-gray">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold text-deep-charcoal mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Slug</label>
            <Input required value={form.slug} onChange={(e) => setForm({...form, slug: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-medium">Part Number</label>
            <Input required value={form.part_number} onChange={(e) => setForm({...form, part_number: e.target.value})} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Stock Status</label>
            <Select value={form.stock_status} onValueChange={(v) => setForm({...form, stock_status: v})}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="in_stock">In Stock</SelectItem>
                <SelectItem value="out_of_stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">Description (AZ)</label>
            <Textarea rows={5} value={form.description_az} onChange={(e) => setForm({...form, description_az: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-medium">Description (EN)</label>
            <Textarea rows={5} value={form.description_en} onChange={(e) => setForm({...form, description_en: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-medium">Description (RU)</label>
            <Textarea rows={5} value={form.description_ru} onChange={(e) => setForm({...form, description_ru: e.target.value})} />
          </div>
        </div>
        <div className="flex gap-3">
          <Button type="submit" disabled={loading} className="bg-deep-charcoal hover:bg-dark-graphite">
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}
