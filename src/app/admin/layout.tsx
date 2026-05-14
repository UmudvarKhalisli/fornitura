import '@/app/globals.css';

export const metadata = {
  title: 'Admin - Fornitura',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az">
      <body className="min-h-screen bg-off-white">
        {children}
      </body>
    </html>
  );
}
