import { redirect } from 'next/navigation';
import Link from 'next/link';
import { isAdminAuthenticated } from '@/lib/supabase/admin';
import { getAllBrands } from '@/lib/db/queries/brands';
import { Edit } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default async function AdminBrandsPage() {
  const admin = await isAdminAuthenticated();
  if (!admin) redirect('/admin/login');

  const brands = await getAllBrands();

  const handleSubmit = async (formData: FormData) => {
    'use server';
    const { updateBrand, createBrand } = await import('@/lib/db/queries/brands');
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const id = formData.get('id') as string;

    if (id) {
      await updateBrand(id, { name, slug });
    } else {
      await createBrand({ name, slug });
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-deep-charcoal">Brands</h1>
          <p className="text-sm text-medium-gray">{brands.length} total</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-light-gray overflow-hidden mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-off-white border-b border-light-gray">
              <th className="text-left py-3 px-4 font-medium">Name</th>
              <th className="text-left py-3 px-4 font-medium">Slug</th>
              <th className="text-left py-3 px-4 font-medium">Active</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand) => (
              <tr key={brand.id} className="border-b border-light-gray hover:bg-off-white/50">
                <td className="py-3 px-4 font-medium">{brand.name}</td>
                <td className="py-3 px-4 text-medium-gray">{brand.slug}</td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${brand.is_active ? 'bg-green-50 text-success' : 'bg-red-50 text-error'}`}>
                    {brand.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            ))}
            {brands.length === 0 && (
              <tr><td colSpan={3} className="py-12 text-center text-medium-gray">No brands yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add brand form */}
      <form action={handleSubmit} className="bg-white rounded-lg border border-light-gray p-6 max-w-md">
        <h2 className="font-semibold text-deep-charcoal mb-4">Add Brand</h2>
        <div className="space-y-3">
          <Input name="name" placeholder="Brand name" required />
          <Input name="slug" placeholder="brand-slug" required />
          <button type="submit" className="px-4 py-2 bg-deep-charcoal text-white text-sm rounded-md hover:bg-dark-graphite transition-colors">
            Add Brand
          </button>
        </div>
      </form>
    </div>
  );
}
