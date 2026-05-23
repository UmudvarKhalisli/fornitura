'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function NewBlogPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [form, setForm] = useState({
    title_az: '', title_en: '', title_ru: '',
    slug_az: '', slug_en: '', slug_ru: '',
    content_az: '', content_en: '', content_ru: '',
    excerpt_az: '', excerpt_en: '', excerpt_ru: '',
    tags: '',
    image: '',
    is_published: false,
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'fornitura/blog');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      
      setForm((prev) => ({ ...prev, image: data.url }));
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
      const res = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
          published_at: form.is_published ? new Date().toISOString() : null,
        }),
      });
      if (!res.ok) throw new Error('Failed');
      router.push('/admin/blog');
    } catch {
      alert('Error creating post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold text-deep-charcoal mb-6">New Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">Title (AZ)</label>
            <Input required value={form.title_az} onChange={(e) => setForm({...form, title_az: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-medium">Title (EN)</label>
            <Input required value={form.title_en} onChange={(e) => setForm({...form, title_en: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-medium">Title (RU)</label>
            <Input required value={form.title_ru} onChange={(e) => setForm({...form, title_ru: e.target.value})} />
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

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({...form, is_published: e.target.checked})} />
            Publish immediately
          </label>
        </div>

        <div>
          <label className="text-sm font-medium">Tags (comma-separated)</label>
          <Input value={form.tags} onChange={(e) => setForm({...form, tags: e.target.value})} placeholder="excavator, maintenance, tips" />
        </div>

        {/* Image Upload */}
        <div className="space-y-4 border p-4 rounded-lg bg-light-gray/5">
          <label className="text-sm font-medium">Cover Image / Şəkil</label>
          {form.image && (
            <div className="mb-4">
              <img src={form.image} alt="Blog image" className="h-32 object-contain rounded-md" />
            </div>
          )}
          <div className="flex items-center gap-4">
            <Input 
              type="file" 
              accept="image/jpeg, image/png, image/webp, image/avif" 
              onChange={handleImageUpload} 
              disabled={uploadingImage}
              className="max-w-sm"
            />
            {uploadingImage && <span className="text-sm text-yellow-600">Uploading...</span>}
          </div>
          <Input 
            type="text" 
            placeholder="Or enter image URL here directly..." 
            value={form.image} 
            onChange={(e) => setForm({...form, image: e.target.value})} 
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">Excerpt (AZ)</label>
            <Textarea rows={3} value={form.excerpt_az} onChange={(e) => setForm({...form, excerpt_az: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-medium">Excerpt (EN)</label>
            <Textarea rows={3} value={form.excerpt_en} onChange={(e) => setForm({...form, excerpt_en: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-medium">Excerpt (RU)</label>
            <Textarea rows={3} value={form.excerpt_ru} onChange={(e) => setForm({...form, excerpt_ru: e.target.value})} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">Content (AZ)</label>
            <Textarea rows={10} value={form.content_az} onChange={(e) => setForm({...form, content_az: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-medium">Content (EN)</label>
            <Textarea rows={10} value={form.content_en} onChange={(e) => setForm({...form, content_en: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-medium">Content (RU)</label>
            <Textarea rows={10} value={form.content_ru} onChange={(e) => setForm({...form, content_ru: e.target.value})} />
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit" disabled={loading} className="bg-deep-charcoal hover:bg-dark-graphite">
            {loading ? 'Saving...' : 'Create Post'}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}
