import '@/app/globals.css';
import { Outfit } from 'next/font/google';
import { AdminShellWrapper } from '@/components/admin/admin-shell-wrapper';
import { Toaster } from 'sonner';

const outfit = Outfit({ variable: '--font-outfit', subsets: ['latin'] });

export const metadata = {
  title: 'Admin - Fornitura',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az" className={outfit.variable}>
      <body className="min-h-screen bg-off-white font-outfit antialiased text-deep-charcoal">
        <AdminShellWrapper>{children}</AdminShellWrapper>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
