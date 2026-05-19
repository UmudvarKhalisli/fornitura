'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [form, setForm] = useState({
    name_az: '', name_en: '', name_ru: '',
    slug: '',
    description_az: '', description_en: '', description_ru: '',
    short_description_az: '', short_description_en: '', short_description_ru: '',
    part_number: '',
    category_id: '',
    brand_id: '',
    stock_status: 'in_stock' as string,
    is_featured: false,
    main_image: '',
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'fornitura/products');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      
      setForm(prev => ({ ...prev, main_image: data.url }));
    } catch (err: any) {
      alert(err.message || 'Error uploading image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed');
      router.push('/admin/products');
    } catch (err) {
      alert('Error creating product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold text-deep-charcoal mb-6">New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Names */}
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
            <Select value={form.stock_status} onValueChange={(v) => setForm({...form, stock_status: v || 'in_stock'})}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="in_stock">In Stock</SelectItem>
                <SelectItem value="out_of_stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end pb-2">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({...form, is_featured: e.target.checked})} />
              Featured Product
            </label>
          </div>
        </div>

        {/* Image Upload */}
        <div className="space-y-2 border p-4 rounded-lg bg-light-gray/5">
          <label className="text-sm font-medium">Main Image</label>
          <div className="flex items-center gap-4">
            <Input 
              type="file" 
              accept="image/jpeg, image/png, image/webp, image/avif" 
              onChange={handleImageUpload} 
              disabled={uploadingImage}
              className="max-w-sm"
            />
            {uploadingImage && <span className="text-sm text-muted-gold">Uploading...</span>}
          </div>
          {form.main_image && (
            <div className="mt-4">
              <img src={form.main_image} alt="Preview" className="w-32 h-32 object-cover rounded shadow-sm" />
            </div>
          )}
        </div>

        {/* Descriptions */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">Short Description (AZ)</label>
            <Textarea rows={2} value={form.short_description_az} onChange={(e) => setForm({...form, short_description_az: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-medium">Short Description (EN)</label>
            <Textarea rows={2} value={form.short_description_en} onChange={(e) => setForm({...form, short_description_en: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-medium">Short Description (RU)</label>
            <Textarea rows={2} value={form.short_description_ru} onChange={(e) => setForm({...form, short_description_ru: e.target.value})} />
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
            {loading ? 'Saving...' : 'Create Product'}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
