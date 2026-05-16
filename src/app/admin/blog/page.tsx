import { redirect } from 'next/navigation';
import Link from 'next/link';
import { isAdminAuthenticated } from '@/lib/supabase/admin';
import { getAllPosts } from '@/lib/db/queries/blog';
import { Plus, Edit, Eye, Newspaper, Search, Calendar, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { format } from 'date-fns';
import { az } from 'date-fns/locale';

export default async function AdminBlogPage() {
  const admin = await isAdminAuthenticated();
  if (!admin) redirect('/admin/login');

  const posts = await getAllPosts();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-deep-charcoal tracking-tight">Blog Yazıları</h1>
          <p className="text-medium-gray mt-1">Saytın xəbərlər və məqalələr bölməsini buradan idarə edin.</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-deep-charcoal text-white rounded-xl font-semibold shadow-lg shadow-deep-charcoal/10 hover:bg-muted-gold hover:text-deep-charcoal transition-all"
        >
          <Plus className="w-4 h-4" />
          Yeni Yazı
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-light-gray overflow-hidden shadow-sm">
        <div className="p-4 border-b border-light-gray bg-off-white/50 flex items-center justify-between">
          <div className="text-xs font-bold text-medium-gray uppercase tracking-widest ml-2">
            {posts.length} MƏQALƏ
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-off-white/30 border-b border-light-gray">
                <th className="px-6 py-4 text-xs font-bold text-medium-gray uppercase tracking-wider">Məqalə</th>
                <th className="px-6 py-4 text-xs font-bold text-medium-gray uppercase tracking-wider">Tarix</th>
                <th className="px-6 py-4 text-xs font-bold text-medium-gray uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-medium-gray uppercase tracking-wider text-right">Əməliyyat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-gray/50">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-medium-gray italic">
                    Hələ heç bir blog yazısı yoxdur.
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-off-white/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-10 rounded-lg overflow-hidden border border-light-gray bg-off-white shrink-0 shadow-sm">
                          {post.image ? (
                            <Image src={post.image} alt={post.title_az} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Newspaper className="w-5 h-5 text-light-gray" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-bold text-deep-charcoal truncate max-w-[300px]">{post.title_az}</span>
                          <span className="text-xs text-medium-gray truncate max-w-[300px]">{post.title_en}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-xs text-medium-gray">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.published_at ? format(new Date(post.published_at), 'd MMMM yyyy', { locale: az }) : '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                        post.is_published
                          ? 'bg-green-50 text-green-600 border-green-100'
                          : 'bg-amber-50 text-amber-600 border-amber-100'
                      }`}>
                        {post.is_published ? 'Dərc olunub' : 'Qaralama'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/az/blog/${post.slug_az}`}
                          target="_blank"
                          className="p-2 hover:bg-light-gray rounded-xl transition-colors text-deep-charcoal"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/blog/${post.id}/edit`}
                          className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
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
