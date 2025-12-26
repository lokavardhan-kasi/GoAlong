import { PageHeader } from '@/components/common/page-header';
import { RouteCard } from '@/components/app/route-card';
import { rides } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export default function FindRidePage() {
  return (
    <>
      <PageHeader
        title="Find a Ride"
        description="Browse available rides shared by community members."
      />

      <Card className="mb-8 p-4">
        <div className="flex flex-col gap-4 md:flex-row">
            <Input placeholder="Start location (e.g., Downtown)" className="bg-background"/>
            <Input placeholder="End location (e.g., Northwood)" className="bg-background"/>
            <Button className="w-full md:w-auto">
                <Search className="mr-2"/>
                Search
            </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {rides.map(ride => (
          <RouteCard key={ride.id} ride={ride} />
        ))}
      </div>
    </>
  );
}
