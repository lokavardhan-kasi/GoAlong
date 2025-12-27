
'use client';
import { PageHeader } from '@/components/common/page-header';
import { rides, Ride } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Clock, MapPin, Package, ShieldCheck, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

function RideCard({ ride }: { ride: Ride }) {
  return (
    <Link href={`/ride/${ride.id}`} className="block">
      <Card className="cursor-pointer transition-all duration-300 hover:shadow-md border-gray-100 rounded-2xl">
        <CardContent className="p-6 flex flex-row justify-between items-center">
          {/* Left: Time & Route */}
          <div className="flex gap-6 items-center">
            <div className="flex flex-col items-center self-stretch">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <div className="flex-1 w-px bg-gray-200" />
              <div className="w-3 h-3 rounded-full border-2 border-primary" />
            </div>
            <div className="flex flex-col justify-between">
                <div>
                    <p className="font-bold text-lg">{ride.times.departure}</p>
                    <p className="text-sm text-muted-foreground">{ride.route.from}</p>
                </div>
                <p className="text-xs text-muted-foreground my-2 flex items-center gap-2"><Clock className="h-3 w-3" /> {ride.times.duration}</p>
                <div>
                    <p className="font-bold text-lg">{ride.times.arrival}</p>
                    <p className="text-sm text-muted-foreground">{ride.route.to}</p>
                </div>
            </div>
          </div>

          {/* Center: Driver & Capacity */}
          <div className="flex flex-col justify-center items-start">
             <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={ride.driver.avatarUrl} alt={ride.driver.name} data-ai-hint="person face" />
                    <AvatarFallback>{ride.driver.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold text-base">{ride.driver.name}</p>
                     {ride.driver.verified && (
                        <div className="flex items-center gap-1 text-xs text-blue-600">
                            <ShieldCheck className="h-3 w-3"/>
                            <span>Verified</span>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
                <Badge variant="secondary"><Users className="h-3 w-3 mr-1" /> {ride.features.availableSeats} seats</Badge>
                {ride.features.parcelSpace !== 'None' && (
                    <Badge className="bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-100"><Package className="h-3 w-3 mr-1" /> {ride.features.parcelSpace} Space</Badge>
                )}
            </div>
          </div>

          {/* Right: Price */}
          <div className="flex flex-col items-end text-right min-w-[120px]">
            {/* Seat Price */}
            <div className="mb-2">
              <span className="text-2xl font-bold text-gray-900">₹{ride.price.seat}</span>
              <p className="text-xs text-gray-500 -mt-1">per seat</p>
            </div>

            {/* Parcel Price - Conditional */}
            {ride.features.parcelSpace !== 'None' && (
              <div className="flex items-center gap-1 bg-purple-50 px-2 py-1 rounded-lg">
                <Package className="w-3 h-3 text-purple-600" />
                <span className="text-sm font-semibold text-purple-700">₹{ride.price.parcel}</span>
                <span className="text-[10px] text-purple-600">/box</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}


export default function SearchPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg -mx-4 -mt-8 mb-8 px-4 py-4 border-b">
         <div className="flex items-center justify-between">
            <div className="flex gap-4 items-center">
                <PageHeader title='' showBackButton/>
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
