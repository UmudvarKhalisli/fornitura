import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/supabase/admin';
import { createAdminClient } from '@/lib/supabase/server';

export default async function AdminServicesPage() {
  const admin = await isAdminAuthenticated();
  if (!admin) redirect('/admin/login');

  const supabase = createAdminClient();
  const { data: services } = await supabase.from('services').select('*').order('display_order');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-deep-charcoal mb-6">Services</h1>

      <div className="bg-white rounded-lg border border-light-gray overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-off-white border-b border-light-gray">
              <th className="text-left py-3 px-4 font-medium">Title (EN)</th>
              <th className="text-left py-3 px-4 font-medium">Order</th>
              <th className="text-left py-3 px-4 font-medium">Active</th>
            </tr>
          </thead>
          <tbody>
            {services?.map((svc: any) => (
              <tr key={svc.id} className="border-b border-light-gray hover:bg-off-white/50">
                <td className="py-3 px-4 font-medium">{svc.title_en}</td>
                <td className="py-3 px-4 text-medium-gray">{svc.display_order}</td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${svc.is_active ? 'bg-green-50 text-success' : 'bg-red-50 text-error'}`}>
                    {svc.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            ))}
            {(!services || services.length === 0) && (
              <tr><td colSpan={3} className="py-12 text-center text-medium-gray">No services yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
