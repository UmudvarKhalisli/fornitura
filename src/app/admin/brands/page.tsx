import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/supabase/admin';
import { getAllBrands } from '@/lib/db/queries/brands';
import { Tags, Plus, Search, Trash2, Edit2, Eye } from 'lucide-react';
import Image from 'next/image';

export default async function AdminBrandsPage() {
  const admin = await isAdminAuthenticated();
  if (!admin) redirect('/admin/login');

  const brands = await getAllBrands();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-deep-charcoal tracking-tight">Brendlər</h1>
          <p className="text-medium-gray mt-1">Məhsulların aid olduğu istehsalçı brendləri idarə edin.</p>
        </div>
        <button
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-deep-charcoal text-white rounded-xl font-semibold shadow-lg shadow-deep-charcoal/10 hover:bg-muted-gold hover:text-deep-charcoal transition-all"
        >
          <Plus className="w-4 h-4" />
          Yeni Brend
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-light-gray overflow-hidden shadow-sm">
        <div className="p-4 border-b border-light-gray bg-off-white/50 flex items-center justify-between">
          <div className="text-xs font-bold text-medium-gray uppercase tracking-widest ml-2">
            {brands.length} BREND
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-off-white/30 border-b border-light-gray">
                <th className="px-6 py-4 text-xs font-bold text-medium-gray uppercase tracking-wider">Brend</th>
                <th className="px-6 py-4 text-xs font-bold text-medium-gray uppercase tracking-wider">Slug</th>
                <th className="px-6 py-4 text-xs font-bold text-medium-gray uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-medium-gray uppercase tracking-wider text-right">Əməliyyat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-gray/50">
              {brands.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-medium-gray italic">
                    Hələ heç bir brend əlavə edilməyib.
                  </td>
                </tr>
              ) : (
                brands.map((brand) => (
                  <tr key={brand.id} className="hover:bg-off-white/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-light-gray bg-off-white shrink-0 shadow-sm flex items-center justify-center">
                          {brand.logo_url ? (
                            <Image src={brand.logo_url} alt={brand.name} fill className="object-contain p-1" />
                          ) : (
                            <Tags className="w-5 h-5 text-light-gray" />
                          )}
                        </div>
                        <span className="font-bold text-deep-charcoal">{brand.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-medium-gray">
                      {brand.slug}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                        brand.is_active
                          ? 'bg-green-50 text-green-600 border-green-100'
                          : 'bg-red-50 text-red-600 border-red-100'
                      }`}>
                        {brand.is_active ? 'Aktiv' : 'Passiv'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
