import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/supabase/admin';
import { createAdminClient } from '@/lib/supabase/server';
import { Package, FolderKanban, Tags, FileText, MessageSquare, Newspaper } from 'lucide-react';
import Link from 'next/link';

async function getStats() {
  const supabase = createAdminClient();

  const [
    { count: products },
    { count: categories },
    { count: brands },
    { count: blogPosts },
    { count: unreadMessages },
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('categories').select('*', { count: 'exact', head: true }),
    supabase.from('brands').select('*', { count: 'exact', head: true }),
    supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
    supabase.from('messages').select('*', { count: 'exact', head: true }).eq('is_read', false),
  ]);

  return { products, categories, brands, blogPosts, unreadMessages };
}

export default async function AdminDashboardPage() {
  const admin = await isAdminAuthenticated();
  if (!admin) redirect('/admin/login');

  const stats = await getStats();

  const cards = [
    { label: 'Products', count: stats.products || 0, icon: Package, href: '/admin/products', color: 'text-blue-600 bg-blue-50' },
    { label: 'Categories', count: stats.categories || 0, icon: FolderKanban, href: '/admin/categories', color: 'text-green-600 bg-green-50' },
    { label: 'Brands', count: stats.brands || 0, icon: Tags, href: '/admin/brands', color: 'text-purple-600 bg-purple-50' },
    { label: 'Blog Posts', count: stats.blogPosts || 0, icon: Newspaper, href: '/admin/blog', color: 'text-orange-600 bg-orange-50' },
    { label: 'Unread Messages', count: stats.unreadMessages || 0, icon: MessageSquare, href: '/admin/messages', color: 'text-red-600 bg-red-50' },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-deep-charcoal">Dashboard</h1>
        <p className="text-medium-gray text-sm">Welcome to Fornitura admin panel</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="p-6 rounded-lg border border-light-gray bg-white hover:shadow-sm transition-shadow"
          >
            <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center mb-3`}>
              <card.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-deep-charcoal">{card.count}</p>
            <p className="text-sm text-medium-gray">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 p-6 rounded-lg border border-light-gray bg-white">
        <h2 className="font-semibold text-deep-charcoal mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/products/new" className="px-4 py-2 bg-deep-charcoal text-white text-sm rounded-md hover:bg-dark-graphite transition-colors">
            Add Product
          </Link>
          <Link href="/admin/categories/new" className="px-4 py-2 border border-deep-charcoal text-deep-charcoal text-sm rounded-md hover:bg-deep-charcoal hover:text-white transition-colors">
            Add Category
          </Link>
          <Link href="/admin/blog/new" className="px-4 py-2 border border-deep-charcoal text-deep-charcoal text-sm rounded-md hover:bg-deep-charcoal hover:text-white transition-colors">
            New Blog Post
          </Link>
          <Link href="/admin/settings" className="px-4 py-2 border border-deep-charcoal text-deep-charcoal text-sm rounded-md hover:bg-deep-charcoal hover:text-white transition-colors">
            Site Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
