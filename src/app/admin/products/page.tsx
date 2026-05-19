import { redirect } from 'next/navigation';
import Link from 'next/link';
import { isAdminAuthenticated } from '@/lib/supabase/admin';
import { getAllProducts } from '@/lib/db/queries/products';
import { Plus, Edit, Eye, Package, Search, Filter } from 'lucide-react';
import Image from 'next/image';
import { DeleteProductButton } from './delete-button';

export default async function AdminProductsPage() {
  const admin = await isAdminAuthenticated();
  if (!admin) redirect('/admin/login');

  const products = await getAllProducts();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-deep-charcoal tracking-tight">Məhsullar</h1>
          <p className="text-medium-gray mt-1">Kataloqdakı bütün ehtiyat hissələri və məhsullar.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-deep-charcoal text-white rounded-xl font-semibold shadow-lg shadow-deep-charcoal/10 hover:bg-muted-gold hover:text-deep-charcoal transition-all"
        >
          <Plus className="w-4 h-4" />
          Yeni Məhsul
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-light-gray overflow-hidden shadow-sm">
        <div className="p-4 border-b border-light-gray bg-off-white/50 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-medium-gray" />
            <input 
              type="text" 
              placeholder="Axtarış..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl border-light-gray bg-white text-sm focus:ring-muted-gold"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-light-gray rounded-xl text-sm font-medium hover:bg-off-white transition-colors">
              <Filter className="w-4 h-4" />
              Filtrlə
            </button>
            <div className="text-xs font-bold text-medium-gray uppercase tracking-widest ml-2">
              {products.length} MƏHSUL
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-off-white/30 border-b border-light-gray">
                <th className="px-6 py-4 text-xs font-bold text-medium-gray uppercase tracking-wider">Məhsul</th>
                <th className="px-6 py-4 text-xs font-bold text-medium-gray uppercase tracking-wider">Kod</th>
                <th className="px-6 py-4 text-xs font-bold text-medium-gray uppercase tracking-wider">Kateqoriya / Brend</th>
                <th className="px-6 py-4 text-xs font-bold text-medium-gray uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-medium-gray uppercase tracking-wider text-right">Əməliyyat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-gray/50">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-medium-gray italic">
                    Hələ heç bir məhsul əlavə edilməyib.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-off-white/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-light-gray bg-off-white shrink-0 shadow-sm">
                          {product.main_image ? (
                            <Image src={product.main_image} alt={product.name_az} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="w-6 h-6 text-light-gray" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-bold text-deep-charcoal truncate max-w-[200px]">{product.name_az}</span>
                          <span className="text-xs text-medium-gray truncate max-w-[200px]">{product.name_en}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-medium-gray">
                      {product.part_number}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-deep-charcoal">{product.category?.name_az || '-'}</span>
                        <span className="text-xs text-muted-gold font-medium">{product.brand?.name || '-'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1.5">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                          product.stock_status === 'in_stock'
                            ? 'bg-green-50 text-green-600 border-green-100'
                            : 'bg-red-50 text-red-600 border-red-100'
                        }`}>
                          {product.stock_status === 'in_stock' ? 'Anbarda' : 'Yoxdur'}
                        </span>
                        {product.is_featured && (
                          <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-50 text-amber-600 border border-amber-100">
                            Ön Plan
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/az/mehsul/${product.slug}`}
                          target="_blank"
                          className="p-2 hover:bg-light-gray rounded-xl transition-colors text-deep-charcoal"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
                          title="Redaktə et"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <DeleteProductButton productId={product.id} />
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
