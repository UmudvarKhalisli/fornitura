import { redirect } from 'next/navigation';
import Link from 'next/link';
import { isAdminAuthenticated } from '@/lib/supabase/admin';
import { getAllCategories } from '@/lib/db/queries/categories';
import { Plus, Edit, Eye } from 'lucide-react';

export default async function AdminCategoriesPage() {
  const admin = await isAdminAuthenticated();
  if (!admin) redirect('/admin/login');

  const categories = await getAllCategories();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-deep-charcoal">Categories</h1>
          <p className="text-sm text-medium-gray">{categories.length} total</p>
        </div>
        <Link
          href="/admin/categories/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-deep-charcoal text-white text-sm rounded-md hover:bg-dark-graphite transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-light-gray overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-off-white border-b border-light-gray">
              <th className="text-left py-3 px-4 font-medium">Name (EN)</th>
              <th className="text-left py-3 px-4 font-medium">Slug (EN)</th>
              <th className="text-left py-3 px-4 font-medium">Order</th>
              <th className="text-left py-3 px-4 font-medium">Active</th>
              <th className="text-right py-3 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b border-light-gray hover:bg-off-white/50">
                <td className="py-3 px-4 font-medium">{cat.name_en}</td>
                <td className="py-3 px-4 text-medium-gray">{cat.slug_en}</td>
                <td className="py-3 px-4 text-medium-gray">{cat.display_order}</td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${cat.is_active ? 'bg-green-50 text-success' : 'bg-red-50 text-error'}`}>
                    {cat.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <Link href={`/admin/categories/${cat.id}/edit`} className="inline-flex p-1.5 rounded hover:bg-off-white text-medium-gray hover:text-deep-charcoal">
                    <Edit className="w-4 h-4" />
                  </Link>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr><td colSpan={5} className="py-12 text-center text-medium-gray">No categories yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
