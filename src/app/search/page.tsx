
'use client';
import { PageHeader } from '@/components/common/page-header';
import { rides } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Calendar, Car, Clock, MapPin, Package, Search, ShieldCheck, User, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function RideCard({ ride }: { ride: any }) {
  return (
    <Link href={`/ride/${ride.id}`} className="block">
      <Card className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-gray-100 rounded-2xl">
        <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left: Time & Route */}
          <div className="flex gap-4 col-span-1">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <div className="flex-1 w-px bg-gray-200" />
              <div className="w-3 h-3 rounded-full border-2 border-primary" />
            </div>
            <div className="flex flex-col justify-between">
                <div>
                    <p className="font-bold">{ride.times.departure}</p>
                    <p className="text-sm text-muted-foreground">{ride.route.from}</p>
                </div>
                <p className="text-xs text-muted-foreground my-2 flex items-center gap-2"><Clock className="h-3 w-3" /> {ride.times.duration}</p>
                <div>
                    <p className="font-bold">{ride.times.arrival}</p>
                    <p className="text-sm text-muted-foreground">{ride.route.to}</p>
                </div>
            </div>
          </div>

          {/* Center: Driver & Capacity */}
          <div className="flex flex-col justify-center items-start md:items-center col-span-1 border-t md:border-t-0 md:border-x pt-4 md:pt-0">
             <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={ride.driver.avatarUrl} alt={ride.driver.name} data-ai-hint="person face" />
                    <AvatarFallback>{ride.driver.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold text-sm">{ride.driver.name}</p>
                     {ride.driver.verified && (
                        <div className="flex items-center gap-1 text-xs text-blue-600">
                            <ShieldCheck className="h-3 w-3"/>
                            <span>Verified</span>
                        </div>
                    )}
                </div>
            </div>
            <div className="text-sm text-muted-foreground mt-4 space-y-1">
                <p className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" /> {ride.features.availableSeats} seats left</p>
                {ride.features.parcelSpace !== 'None' && (
                    <p className="flex items-center gap-2"><Package className="h-4 w-4 text-primary" /> {ride.features.parcelSpace} trunk space</p>
                )}
            </div>
          </div>

          {/* Right: Price */}
          <div className="flex flex-col justify-center items-end col-span-1 border-t md:border-t-0 pt-4 md:pt-0">
            <p className="text-2xl font-bold">₹{ride.price.seat}</p>
            <p className="text-sm text-muted-foreground">per seat</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}


export default function SearchPage() {
    const router = useRouter();
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg -mx-4 -mt-8 mb-8 px-4 py-4 border-b">
         <div className="flex items-center justify-between">
            <div className="flex gap-4 items-center">
                <Button variant="outline" size="icon" onClick={() => router.back()} className="shrink-0 active:scale-95 h-8 w-8">
                    <ArrowLeft className="h-4 w-4"/>
                    <span className="sr-only">Go Back</span>
                </Button>
                <p className="font-semibold">Visakhapatnam</p>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
                <p className="font-semibold">Hyderabad</p>
             </div>
             <div className="flex gap-4 items-center text-sm text-muted-foreground">
                 <span className="flex items-center gap-2"><Calendar className="h-4 w-4" />Today</span>
                 <span className="flex items-center gap-2"><Users className="h-4 w-4" />1</span>
             </div>
             <Button variant="outline">Edit Search</Button>
         </div>
      </div>

      <div className="space-y-6">
        {rides.map(ride => (
          <RideCard key={ride.id} ride={ride} />
        ))}
      </div>
    </div>
  );
}
