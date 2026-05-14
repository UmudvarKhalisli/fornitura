import { redirect } from 'next/navigation';
import Link from 'next/link';
import { isAdminAuthenticated } from '@/lib/supabase/admin';
import { getAllProducts } from '@/lib/db/queries/products';
import { Plus, Edit, Eye, Trash2 } from 'lucide-react';

export default async function AdminProductsPage() {
  const admin = await isAdminAuthenticated();
  if (!admin) redirect('/admin/login');

  const products = await getAllProducts();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-deep-charcoal">Products</h1>
          <p className="text-sm text-medium-gray">{products.length} total</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-deep-charcoal text-white text-sm rounded-md hover:bg-dark-graphite transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-light-gray overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-off-white border-b border-light-gray">
                <th className="text-left py-3 px-4 font-medium text-deep-charcoal">Name (EN)</th>
                <th className="text-left py-3 px-4 font-medium text-deep-charcoal">Part Number</th>
                <th className="text-left py-3 px-4 font-medium text-deep-charcoal">Category</th>
                <th className="text-left py-3 px-4 font-medium text-deep-charcoal">Brand</th>
                <th className="text-left py-3 px-4 font-medium text-deep-charcoal">Stock</th>
                <th className="text-left py-3 px-4 font-medium text-deep-charcoal">Featured</th>
                <th className="text-right py-3 px-4 font-medium text-deep-charcoal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-light-gray hover:bg-off-white/50 transition-colors">
                  <td className="py-3 px-4 font-medium text-deep-charcoal">{product.name_en}</td>
                  <td className="py-3 px-4 text-medium-gray">{product.part_number}</td>
                  <td className="py-3 px-4 text-medium-gray">{product.category?.name_en || '-'}</td>
                  <td className="py-3 px-4 text-medium-gray">{product.brand?.name || '-'}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                      product.stock_status === 'in_stock'
                        ? 'bg-green-50 text-success'
                        : 'bg-red-50 text-error'
                    }`}>
                      {product.stock_status === 'in_stock' ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {product.is_featured ? (
                      <span className="text-xs bg-muted-gold/10 text-muted-gold px-2 py-0.5 rounded-full">Yes</span>
                    ) : (
                      <span className="text-xs text-medium-gray">No</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/en/product/${product.slug}`}
                        target="_blank"
                        className="p-1.5 rounded hover:bg-off-white text-medium-gray hover:text-deep-charcoal transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="p-1.5 rounded hover:bg-off-white text-medium-gray hover:text-deep-charcoal transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-medium-gray">
                    No products yet. Click "Add Product" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
