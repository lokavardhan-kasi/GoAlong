
'use client';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { UserContext } from '@/context/user-context';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null; // Or a loading spinner
  }

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <AppSidebar />
      <main className="flex-1 p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}
