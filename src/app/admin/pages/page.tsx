import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/supabase/admin';
import { createAdminClient } from '@/lib/supabase/server';

export default async function AdminPagesPage() {
  const admin = await isAdminAuthenticated();
  if (!admin) redirect('/admin/login');

  const supabase = createAdminClient();
  const { data: pages } = await supabase.from('pages').select('*').order('slug');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-deep-charcoal mb-6">Static Pages</h1>
      <div className="bg-white rounded-lg border border-light-gray overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-off-white border-b border-light-gray">
              <th className="text-left py-3 px-4 font-medium">Slug</th>
              <th className="text-left py-3 px-4 font-medium">Title (EN)</th>
              <th className="text-left py-3 px-4 font-medium">Published</th>
            </tr>
          </thead>
          <tbody>
            {pages?.map((page: any) => (
              <tr key={page.id} className="border-b border-light-gray hover:bg-off-white/50">
                <td className="py-3 px-4 font-mono text-xs">{page.slug}</td>
                <td className="py-3 px-4">{page.title_en}</td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${page.is_published ? 'bg-green-50 text-success' : 'bg-red-50 text-error'}`}>
                    {page.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
