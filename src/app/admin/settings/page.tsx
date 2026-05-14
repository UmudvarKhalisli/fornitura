import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/supabase/admin';
import { getSiteSettings } from '@/lib/db/queries/settings';
import { SettingsForm } from './settings-form';

export default async function AdminSettingsPage() {
  const admin = await isAdminAuthenticated();
  if (!admin) redirect('/admin/login');

  const settings = await getSiteSettings();

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold text-deep-charcoal mb-6">Site Settings</h1>
      <SettingsForm settings={settings} />
    </div>
  );
}
