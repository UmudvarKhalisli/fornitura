import { redirect } from 'next/navigation';
import Link from 'next/link';
import { isAdminAuthenticated } from '@/lib/supabase/admin';
import { getAllPosts } from '@/lib/db/queries/blog';
import { Plus, Edit, Eye } from 'lucide-react';

export default async function AdminBlogPage() {
  const admin = await isAdminAuthenticated();
  if (!admin) redirect('/admin/login');

  const posts = await getAllPosts();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-deep-charcoal">Blog Posts</h1>
          <p className="text-sm text-medium-gray">{posts.length} total</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-deep-charcoal text-white text-sm rounded-md hover:bg-dark-graphite transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Post
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-light-gray overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-off-white border-b border-light-gray">
              <th className="text-left py-3 px-4 font-medium">Title (EN)</th>
              <th className="text-left py-3 px-4 font-medium">Status</th>
              <th className="text-left py-3 px-4 font-medium">Published</th>
              <th className="text-right py-3 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-light-gray hover:bg-off-white/50">
                <td className="py-3 px-4 font-medium">{post.title_en}</td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${post.is_published ? 'bg-green-50 text-success' : 'bg-orange-50 text-orange-600'}`}>
                    {post.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="py-3 px-4 text-medium-gray text-xs">
                  {post.published_at ? new Date(post.published_at).toLocaleDateString() : '-'}
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    {post.is_published && (
                      <Link href={`/en/blog/${post.slug_en}`} target="_blank" className="p-1.5 rounded hover:bg-off-white text-medium-gray hover:text-deep-charcoal">
                        <Eye className="w-4 h-4" />
                      </Link>
                    )}
                    <Link href={`/admin/blog/${post.id}/edit`} className="p-1.5 rounded hover:bg-off-white text-medium-gray hover:text-deep-charcoal">
                      <Edit className="w-4 h-4" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr><td colSpan={4} className="py-12 text-center text-medium-gray">No blog posts yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
