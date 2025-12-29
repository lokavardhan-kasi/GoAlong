
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Calendar, MapPin, Check, ChevronsUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { rides } from '@/lib/mock-data';

const uniqueLocations = Array.from(new Set(rides.flatMap(r => [r.route.from, r.route.to, ...r.route.stops])));

const locations = uniqueLocations.map(location => ({
  value: location.toLowerCase(),
  label: location,
}));

function Combobox({ value, setValue, placeholder }: { value: string; setValue: (value: string) => void; placeholder: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-12 text-base font-normal bg-white hover:bg-gray-50 pl-10"
        >
          <span className={cn("truncate", value ? "text-foreground" : "text-muted-foreground")}>
            {value ? locations.find((location) => location.value === value)?.label : placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder="Search for a location..." />
          <CommandList>
            <CommandEmpty>No location found.</CommandEmpty>
            <CommandGroup>
              {locations.map((location) => (
                <CommandItem
                  key={location.value}
                  value={location.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === location.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {location.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function HomeSearchCard() {
  const [leavingFrom, setLeavingFrom] = useState('');
  const [goingTo, setGoingTo] = useState('');
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (leavingFrom) params.set('from', leavingFrom);
    if (goingTo) params.set('to', goingTo);
    router.push(`/search?${params.toString()}`);
  }

  if (!isClient) {
    return (
        <Card className="rounded-2xl shadow-xl p-6 bg-white/90 backdrop-blur-md border">
            <CardContent className="p-0">
                <div className="space-y-4 animate-pulse">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="h-12 bg-gray-200 rounded-md"></div>
                        <div className="h-12 bg-gray-200 rounded-md"></div>
                    </div>
                    <div className="h-12 bg-gray-200 rounded-md"></div>
                    <div className="h-12 bg-gray-200 rounded-full"></div>
                </div>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="rounded-2xl shadow-xl p-6 bg-white/90 backdrop-blur-md border">
      <CardContent className="p-0">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
              <Combobox value={leavingFrom} setValue={setLeavingFrom} placeholder="Leaving from..." />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
              <Combobox value={goingTo} setValue={setGoingTo} placeholder="Going to..." />
            </div>
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="date"
              defaultValue={new Date().toISOString().substring(0, 10)}
              className="pl-10 h-12 text-base focus:ring-4 focus:ring-primary/20 transition-shadow bg-white"
            />
          </div>
          <Button type="submit" className="w-full h-12 text-base rounded-full bg-gradient-to-r from-primary to-blue-600 text-white transition-all duration-300 hover:shadow-lg hover:brightness-110 active:scale-95">
            <Search className="mr-2" /> Find a Ride
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
