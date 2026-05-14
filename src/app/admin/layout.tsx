import '@/app/globals.css';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ variable: '--font-outfit', subsets: ['latin'] });

export const metadata = {
  title: 'Admin - Fornitura',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az" className={outfit.variable}>
      <body className="min-h-screen bg-off-white">
        {children}
      </body>
    </html>
  );
}
