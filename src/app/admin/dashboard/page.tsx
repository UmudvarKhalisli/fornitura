import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/supabase/admin';
import { createAdminClient } from '@/lib/supabase/server';
import { Package, FolderKanban, Tags, MessageSquare, Newspaper, Plus, ArrowUpRight, Clock, Settings } from 'lucide-react';
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
    { label: 'Cəmi Məhsul', count: stats.products || 0, icon: Package, href: '/admin/products', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
    { label: 'Kateqoriyalar', count: stats.categories || 0, icon: FolderKanban, href: '/admin/categories', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
    { label: 'Brendlər', count: stats.brands || 0, icon: Tags, href: '/admin/brands', color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
    { label: 'Bloq Yazıları', count: stats.blogPosts || 0, icon: Newspaper, href: '/admin/blog', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    { label: 'Oxunmamış Mesajlar', count: stats.unreadMessages || 0, icon: MessageSquare, href: '/admin/messages', color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-deep-charcoal tracking-tight">Dashboard</h1>
          <p className="text-medium-gray mt-1">Xoş gəldiniz, saytın cari vəziyyətinə buradan nəzarət edə bilərsiniz.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            href="/admin/products/new" 
            className="flex items-center gap-2 px-5 py-2.5 bg-deep-charcoal text-white rounded-xl font-semibold shadow-lg shadow-deep-charcoal/10 hover:bg-muted-gold hover:text-deep-charcoal transition-all"
          >
            <Plus className="w-4 h-4" />
            Yeni Məhsul
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className={`group relative p-6 rounded-2xl bg-white border ${card.border} hover:shadow-xl hover:shadow-deep-charcoal/5 transition-all duration-300 overflow-hidden`}
          >
            <div className={`absolute -right-2 -top-2 w-24 h-24 rounded-full ${card.bg} opacity-20 group-hover:scale-125 transition-transform duration-500`} />
            <div className="relative z-10">
              <div className={`w-12 h-12 rounded-xl ${card.bg} ${card.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <card.icon className="w-6 h-6" />
              </div>
              <p className="text-3xl font-extrabold text-deep-charcoal mb-1 tracking-tight">{card.count}</p>
              <p className="text-sm font-semibold text-medium-gray uppercase tracking-wider">{card.label}</p>
              <div className="mt-4 flex items-center text-xs font-bold text-muted-gold opacity-0 group-hover:opacity-100 transition-opacity">
                İdarə et <ArrowUpRight className="w-3 h-3 ml-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-8 rounded-3xl bg-white border border-light-gray shadow-sm">
            <h2 className="text-xl font-bold text-deep-charcoal mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-muted-gold" />
              Sürətli Əməliyyatlar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Yeni Kateqoriya', href: '/admin/categories/new', desc: 'Məhsul növlərini idarə edin', icon: FolderKanban },
                { label: 'Yeni Bloq Yazısı', href: '/admin/blog/new', desc: 'Xəbərlər və məqalələr əlavə edin', icon: Newspaper },
                { label: 'Sayt Tənzimləmələri', href: '/admin/settings', desc: 'Texniki qulluq və ümumi ayarlar', icon: Settings },
                { label: 'Brend Əlavə Et', href: '/admin/brands/new', desc: 'Yeni partnyor brendlər', icon: Tags },
              ].map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-start gap-4 p-4 rounded-2xl border border-light-gray/50 hover:border-muted-gold/30 hover:bg-off-white transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-off-white flex items-center justify-center group-hover:bg-muted-gold/10 group-hover:text-muted-gold transition-colors">
                    <action.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-deep-charcoal group-hover:text-muted-gold transition-colors">{action.label}</h3>
                    <p className="text-xs text-medium-gray mt-1 leading-tight">{action.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* System Status / Maintenance */}
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-deep-charcoal text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
              <Settings className="w-32 h-32" />
            </div>
            <h2 className="text-xl font-bold mb-6 relative z-10">Sistem Vəziyyəti</h2>
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium">Sayt Aktivdir</span>
                </div>
                <Link href="/admin/settings" className="text-xs font-bold text-muted-gold hover:underline">Dəyiş</Link>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-white/40" />
                  <span className="text-sm font-medium text-white/60">Son yenilənmə</span>
                </div>
                <span className="text-xs font-mono text-white/40">Bu gün, 14:30</span>
              </div>
            </div>
            <Link 
              href="/admin/settings"
              className="mt-8 block w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-center text-sm font-bold transition-all backdrop-blur-sm border border-white/10"
            >
              Bütün Ayarlar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
