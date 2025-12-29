
'use client';
import { Suspense } from 'react';
import { SearchClientPage } from './SearchClientPage';
import { CarLoader } from '@/components/ui/CarLoader';


export default function SearchPage() {
  
  return (
    <Suspense fallback={<div className="flex h-full items-center justify-center"><CarLoader /></div>}>
      <SearchClientPage />
    </Suspense>
  );
}
