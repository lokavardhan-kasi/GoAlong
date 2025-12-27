
'use client';
import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';

type PageHeaderProps = {
  title: string;
  description?: string;
  showBackButton?: boolean;
  children?: ReactNode;
};

export function PageHeader({ title, description, showBackButton = false, children }: PageHeaderProps) {
  const router = useRouter();
  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
      <div className="flex items-center gap-4">
        {showBackButton && (
          <Button variant="outline" size="icon" onClick={() => router.back()} className="shrink-0 active:scale-95">
            <ArrowLeft/>
            <span className="sr-only">Go Back</span>
          </Button>
        )}
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">{title}</h1>
          {description && <p className="mt-1 text-muted-foreground">{description}</p>}
        </div>
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
