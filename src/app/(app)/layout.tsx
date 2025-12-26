import { AppSidebar } from '@/components/layout/app-sidebar';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <AppSidebar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
