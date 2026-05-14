import { redirect } from 'next/navigation';
import Image from 'next/image';
import { isAdminAuthenticated } from '@/lib/supabase/admin';
import { createAdminClient } from '@/lib/supabase/server';

export default async function AdminMediaPage() {
  const admin = await isAdminAuthenticated();
  if (!admin) redirect('/admin/login');

  const supabase = createAdminClient();
  const { data: media } = await supabase
    .from('media')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-deep-charcoal mb-6">Media Library</h1>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
        {media?.map((item: any) => (
          <div key={item.id} className="group relative aspect-square rounded-lg overflow-hidden border border-light-gray bg-off-white">
            <Image
              src={item.url}
              alt={item.alt_text || ''}
              fill
              className="object-cover"
              sizes="150px"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <button
                onClick={() => navigator.clipboard.writeText(item.url)}
                className="px-2 py-1 bg-white text-xs rounded"
              >
                Copy URL
              </button>
            </div>
          </div>
        ))}
        {(!media || media.length === 0) && (
          <div className="col-span-full text-center py-16 text-medium-gray">No media uploaded yet.</div>
        )}
      </div>
    </div>
  );
}
