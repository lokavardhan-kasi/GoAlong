import { Car } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 text-primary", className)}>
      <Car className="h-7 w-7" />
      <span className="font-headline text-xl font-bold">
        GoAlong
      </span>
    </Link>
  );
}
