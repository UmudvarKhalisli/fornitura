'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { SiteSetting } from '@/types';

interface SettingsFormProps {
  settings: SiteSetting | null;
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    site_name: settings?.site_name || 'Fornitura',
    whatsapp_number: settings?.whatsapp_number || '',
    phone_number: settings?.phone_number || '',
    email: settings?.email || '',
    address_az: settings?.address_az || '',
    address_en: settings?.address_en || '',
    address_ru: settings?.address_ru || '',
    instagram_url: settings?.instagram_url || '',
    facebook_url: settings?.facebook_url || '',
    linkedin_url: settings?.linkedin_url || '',
    hero_title_az: settings?.hero_title_az || '',
    hero_title_en: settings?.hero_title_en || '',
    hero_title_ru: settings?.hero_title_ru || '',
    hero_description_az: settings?.hero_description_az || '',
    hero_description_en: settings?.hero_description_en || '',
    hero_description_ru: settings?.hero_description_ru || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed');
      router.refresh();
    } catch {
      alert('Error saving settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg border border-light-gray p-6 space-y-4">
        <h2 className="font-semibold text-deep-charcoal">General</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Site Name</label>
            <Input value={form.site_name} onChange={(e) => setForm({...form, site_name: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">WhatsApp Number</label>
            <Input value={form.whatsapp_number} onChange={(e) => setForm({...form, whatsapp_number: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-medium">Phone Number</label>
            <Input value={form.phone_number} onChange={(e) => setForm({...form, phone_number: e.target.value})} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-light-gray p-6 space-y-4">
        <h2 className="font-semibold text-deep-charcoal">Address (Multilingual)</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">AZ</label>
            <Input value={form.address_az} onChange={(e) => setForm({...form, address_az: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-medium">EN</label>
            <Input value={form.address_en} onChange={(e) => setForm({...form, address_en: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-medium">RU</label>
            <Input value={form.address_ru} onChange={(e) => setForm({...form, address_ru: e.target.value})} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-light-gray p-6 space-y-4">
        <h2 className="font-semibold text-deep-charcoal">Hero Section</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">Title (AZ)</label>
            <Textarea rows={2} value={form.hero_title_az} onChange={(e) => setForm({...form, hero_title_az: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-medium">Title (EN)</label>
            <Textarea rows={2} value={form.hero_title_en} onChange={(e) => setForm({...form, hero_title_en: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-medium">Title (RU)</label>
            <Textarea rows={2} value={form.hero_title_ru} onChange={(e) => setForm({...form, hero_title_ru: e.target.value})} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-light-gray p-6 space-y-4">
        <h2 className="font-semibold text-deep-charcoal">Social Media</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">Instagram</label>
            <Input value={form.instagram_url} onChange={(e) => setForm({...form, instagram_url: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-medium">Facebook</label>
            <Input value={form.facebook_url} onChange={(e) => setForm({...form, facebook_url: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-medium">LinkedIn</label>
            <Input value={form.linkedin_url} onChange={(e) => setForm({...form, linkedin_url: e.target.value})} />
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading} className="bg-deep-charcoal hover:bg-dark-graphite">
          {loading ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </form>
  );
}
