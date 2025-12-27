
'use client';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { UserContext } from '@/context/user-context';
import { useRouter, usePathname } from 'next/navigation';
import { useContext, useEffect } from 'react';

const publicAppRoutes = ['/find-ride', '/become-a-driver'];

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn } = useContext(UserContext);
  const router = useRouter();
  const pathname = usePathname();

  const isPublicRoute = publicAppRoutes.some(route => pathname.startsWith(route));

  useEffect(() => {
    if (!isLoggedIn && !isPublicRoute) {
      router.push('/login');
    }
  }, [isLoggedIn, router, isPublicRoute, pathname]);

  if (!isLoggedIn && !isPublicRoute) {
    return null; // Or a loading spinner
  }

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <AppSidebar />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
