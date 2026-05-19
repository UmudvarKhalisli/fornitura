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
  const [uploadingImage, setUploadingImage] = useState(false);
  const [form, setForm] = useState<any>({
    name_az: '', name_en: '', name_ru: '',
    slug: '', part_number: '',
    description_az: '', description_en: '', description_ru: '',
    short_description_az: '', short_description_en: '', short_description_ru: '',
    stock_status: 'in_stock',
    is_featured: false,
    is_active: true,
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
      
      setForm((prev: any) => ({ ...prev, main_image: data.url }));
    } catch (err: any) {
      alert(err.message || 'Error uploading image');
    } finally {
      setUploadingImage(false);
    }
  };

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
      // Clean up empty fields which might break uuid validation
      const payload = { ...form };
      if (!payload.category_id) payload.category_id = null;
      if (!payload.brand_id) payload.brand_id = null;

      const res = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: params.id, ...payload }),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        console.error('Validation Details:', errorData.details);
        throw new Error(errorData.error || 'Failed');
      }
      router.push('/admin/products');
    } catch (err: any) {
      alert(err.message || 'Error updating product');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="p-6 text-medium-gray">Yüklənir...</div>;

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold text-deep-charcoal mb-6">Məhsulu Redaktə Et</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">Ad (AZ)</label>
            <Input required value={form.name_az} onChange={(e) => setForm({...form, name_az: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-medium">Ad (EN)</label>
            <Input required value={form.name_en} onChange={(e) => setForm({...form, name_en: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-medium">Ad (RU)</label>
            <Input required value={form.name_ru} onChange={(e) => setForm({...form, name_ru: e.target.value})} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Link (Slug)</label>
            <Input required value={form.slug} onChange={(e) => setForm({...form, slug: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-medium">Model / Kod (Part Number)</label>
            <Input required value={form.part_number} onChange={(e) => setForm({...form, part_number: e.target.value})} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">Anbar Statusu</label>
            <Select value={form.stock_status} onValueChange={(v) => setForm({...form, stock_status: v})}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="in_stock">Anbarda var</SelectItem>
                <SelectItem value="out_of_stock">Anbarda yoxdur</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 pt-6">
            <input type="checkbox" id="is_featured" checked={form.is_featured} onChange={(e) => setForm({...form, is_featured: e.target.checked})} className="w-4 h-4" />
            <label htmlFor="is_featured" className="text-sm font-medium">Ön Plana Çıxar (Featured)</label>
          </div>
          <div className="flex items-center gap-2 pt-6">
            <input type="checkbox" id="is_active" checked={form.is_active} onChange={(e) => setForm({...form, is_active: e.target.checked})} className="w-4 h-4" />
            <label htmlFor="is_active" className="text-sm font-medium text-green-700">Saytda Göstərilir (Aktivdir)</label>
          </div>
        </div>

        {/* Image Upload */}
        <div className="space-y-2 border p-4 rounded-lg bg-light-gray/5">
          <label className="text-sm font-medium">Əsas Şəkil (Main Image)</label>
          <div className="flex items-center gap-4">
            <Input 
              type="file" 
              accept="image/jpeg, image/png, image/webp, image/avif" 
              onChange={handleImageUpload} 
              disabled={uploadingImage}
              className="max-w-sm"
            />
            {uploadingImage && <span className="text-sm text-muted-gold">Yüklənir...</span>}
          </div>
          {form.main_image && (
            <div className="mt-4">
              <img src={form.main_image} alt="Preview" className="w-32 h-32 object-cover rounded shadow-sm" />
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">Qısa Təsvir (AZ)</label>
            <Textarea rows={2} value={form.short_description_az} onChange={(e) => setForm({...form, short_description_az: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-medium">Qısa Təsvir (EN)</label>
            <Textarea rows={2} value={form.short_description_en} onChange={(e) => setForm({...form, short_description_en: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-medium">Qısa Təsvir (RU)</label>
            <Textarea rows={2} value={form.short_description_ru} onChange={(e) => setForm({...form, short_description_ru: e.target.value})} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">Tam Təsvir (AZ)</label>
            <Textarea rows={5} value={form.description_az} onChange={(e) => setForm({...form, description_az: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-medium">Tam Təsvir (EN)</label>
            <Textarea rows={5} value={form.description_en} onChange={(e) => setForm({...form, description_en: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-medium">Tam Təsvir (RU)</label>
            <Textarea rows={5} value={form.description_ru} onChange={(e) => setForm({...form, description_ru: e.target.value})} />
          </div>
        </div>
        <div className="flex gap-3">
          <Button type="submit" disabled={loading} className="bg-deep-charcoal hover:bg-dark-graphite">
            {loading ? 'Yadda saxlanılır...' : 'Dəyişiklikləri Yadda Saxla'}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>Ləğv Et</Button>
        </div>
      </form>
    </div>
  );
}
