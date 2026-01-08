'use client';
import { useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Users, Package } from 'lucide-react';
import Link from 'next/link';
import { useFirestore, useCollection, useMemoFirebase, useDoc } from '@/firebase';
import { collectionGroup, query, where, doc, Timestamp } from 'firebase/firestore';
import { Route as RideRoute, UserProfile } from '@/lib/mock-data';
import { CarLoader } from '@/components/ui/CarLoader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Clock, IndianRupee, MapPin, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

function RideCard({ route, searchParams }: { route: RideRoute & { id: string }, searchParams: URLSearchParams }) {
  const firestore = useFirestore();
  const link = `/ride/${route.id}?${searchParams.toString()}`;

  const driverProfileRef = useMemoFirebase(() => {
    if (!firestore || !route.driverId) return null;
    return doc(firestore, 'userProfiles', route.driverId);
  }, [firestore, route.driverId]);

  const { data: driverProfile, isLoading: isDriverLoading } = useDoc<UserProfile>(driverProfileRef);
  
  const rideStatus = useMemo(() => {
    if (!route?.arrivalTimestamp) {
        return 'Upcoming';
    }
    const now = Timestamp.now();
    if (now > route.arrivalTimestamp) {
        return 'Completed';
    }
    return 'Upcoming';
  }, [route]);

  if (isDriverLoading || !driverProfile) {
    return (
        <Card className="rounded-2xl">
            <CardContent className="p-6">
                <CarLoader />
            </CardContent>
        </Card>
    );
  }

  return (
    <Link href={link} className="block">
      <Card className="cursor-pointer transition-all duration-300 hover:shadow-md border-gray-100 rounded-2xl">
        <CardContent className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          {/* Left: Time & Route */}
          <div className="flex gap-6 items-center flex-1">
            <div className="flex flex-col items-center self-stretch">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <div className="flex-1 w-px bg-gray-200 my-2" />
              <div className="w-3 h-3 rounded-full border-2 border-primary" />
            </div>
            <div className="flex flex-col justify-between gap-2">
                <div>
                    <p className="font-bold text-lg">{route.travelTime}</p>
                    <p className="text-sm text-muted-foreground">{route.startPoint}</p>
                </div>
                {/* Duration can be added if available in route data */}
                <div className="flex-1"></div>
                <div>
                    {/* Arrival time could be calculated or stored */}
                    <p className="font-bold text-lg">{route.endPoint}</p>
                    <p className="text-sm text-muted-foreground">{route.endPoint}</p>
                </div>
            </div>
          </div>

          {/* Center: Driver & Capacity */}
          <div className="flex flex-col justify-center items-start">
             <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={driverProfile.profilePictureUrl} alt={driverProfile.firstName} data-ai-hint="person face" />
                    <AvatarFallback>{driverProfile.firstName?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold text-base">{driverProfile.firstName} {driverProfile.lastName}</p>
                     {driverProfile.isDriver && (
                        <div className="flex items-center gap-1 text-xs text-blue-600">
                            <ShieldCheck className="h-3 w-3"/>
                            <span>Verified Driver</span>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
                <Badge variant="secondary"><Users className="h-3 w-3 mr-1" /> {route.availableSeats} seats</Badge>
                {rideStatus === 'Completed' && <Badge className='bg-gray-100 text-gray-800'>{rideStatus}</Badge>}
            </div>
          </div>

          {/* Right: Price */}
          <div className="flex flex-col items-end text-right min-w-[120px]">
            <div className="mb-2">
              <span className="text-2xl font-bold text-gray-900">₹{route.price}</span>
              <p className="text-xs text-gray-500 -mt-1">per seat</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}


export function SearchClientPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const firestore = useFirestore();

  const from = searchParams.get('from') || 'anywhere';
  const to = searchParams.get('to') || 'anywhere';

  const routesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    // Query all routes across all users
    return query(collectionGroup(firestore, 'routes'));
  }, [firestore]);

  const { data: allRoutes, isLoading, error } = useCollection<RideRoute>(routesQuery);

  const filteredRides = useMemo(() => {
    if (!allRoutes) return [];
    
    const searchFrom = from.toLowerCase();
    const searchTo = to.toLowerCase();

    if (searchFrom === 'anywhere' && searchTo === 'anywhere') {
        return allRoutes;
    }

    return allRoutes.filter(route => {
      const routeFrom = route.startPoint.toLowerCase();
      const routeTo = route.endPoint.toLowerCase();
      
      let fromMatch = true;
      if (searchFrom !== 'anywhere') {
        fromMatch = routeFrom.includes(searchFrom);
      }

      let toMatch = true;
      if (searchTo !== 'anywhere') {
        toMatch = routeTo.includes(searchTo);
      }
      
      return fromMatch && toMatch;
    });
  }, [from, to, allRoutes]);

  const capitalizedFrom = from.charAt(0).toUpperCase() + from.slice(1);
  const capitalizedTo = to.charAt(0).toUpperCase() + to.slice(1);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg -mx-4 -mt-8 mb-8 px-4 py-4 border-b">
         <div className="flex items-center justify-between">
            <div className="flex gap-4 items-center">
                <PageHeader title='' showBackButton/>
                <p className="font-semibold">{capitalizedFrom}</p>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
                <p className="font-semibold">{capitalizedTo}</p>
             </div>
             <div className="flex gap-4 items-center text-sm text-muted-foreground">
                 <span className="flex items-center gap-2"><Calendar className="h-4 w-4" />Today</span>
                 <span className="flex items-center gap-2"><Users className="h-4 w-4" />1</span>
             </div>
             <Button variant="outline" onClick={() => router.push('/')}>Edit Search</Button>
         </div>
      </div>

      {isLoading && <CarLoader />}
      {!isLoading && error && (
        <Card>
            <CardContent className="p-12 text-center text-destructive">
                <p>Error fetching rides: {error.message}</p>
            </CardContent>
        </Card>
      )}

      <div className="space-y-6">
        {!isLoading && !error && (
            filteredRides.length > 0 ? filteredRides.map((route) => (
            <RideCard key={route.id} route={route} searchParams={searchParams} />
            )) : (
                <Card>
                    <CardContent className="p-12 text-center">
                        <p className="text-muted-foreground">No rides found matching your search criteria.</p>
                        <Button variant="link" asChild><Link href="/request-ride">Request a custom ride?</Link></Button>
                    </CardContent>
                </Card>
            )
        )}
      </div>
    </div>
  );
}
