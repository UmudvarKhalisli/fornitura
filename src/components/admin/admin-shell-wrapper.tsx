'use client';

import { usePathname } from 'next/navigation';
import { AdminShell } from './admin-shell';

export function AdminShellWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return <AdminShell>{children}</AdminShell>;
}
