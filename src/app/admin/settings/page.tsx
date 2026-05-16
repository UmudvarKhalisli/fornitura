import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/supabase/admin';
import { getSiteSettings } from '@/lib/db/queries/settings';
import { SettingsForm } from '@/components/admin/settings-form';
import { Settings } from 'lucide-react';

export default async function AdminSettingsPage() {
  const admin = await isAdminAuthenticated();
  if (!admin) redirect('/admin/login');

  const settings = await getSiteSettings();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-deep-charcoal tracking-tight">Sayt Tənzimləmələri</h1>
        <p className="text-medium-gray mt-1">Saytın ümumi məlumatlarını və texniki vəziyyətini buradan idarə edin.</p>
      </div>

      <SettingsForm settings={settings} />
    </div>
  );
}
