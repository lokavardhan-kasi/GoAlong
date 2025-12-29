
'use client';

import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { pastRides, BookingConfirmation, Ride } from '@/lib/mock-data';
import { StarRating } from '@/components/common/star-rating';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Car, IndianRupee, MapPin } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCollection, useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { CarLoader } from '@/components/ui/CarLoader';

function RideHistoryList({ bookings, isLoading }: { bookings: any[] | null, isLoading: boolean }) {
    const { toast } = useToast();

    if (isLoading) {
        return <CarLoader />;
    }

    const handleRating = (rideId: string, rating: number) => {
        // Here you would typically update the rating in Firestore
        toast({
            title: 'Rating Submitted',
            description: `You gave ${rating} stars. Thanks for your feedback!`,
        });
    };

    if (!bookings || bookings.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 border rounded-lg bg-gray-50">
              <p className="text-muted-foreground">You have no rides in this category yet.</p>
            </div>
        );
    }
    
    return (
        <Card>
            <CardContent className="pt-6">
                <div className="space-y-6">
                    {bookings.map((ride: any, index) => (
                        <div key={ride.id}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-2 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Car className="h-5 w-5 text-primary"/>
                                        <p className="font-semibold">{ride.pickupLocation} to {ride.dropoffLocation}</p>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1"><MapPin className="h-4 w-4"/> With {ride.driverId.substring(0, 6)}...</span>
                                        <span className="flex items-center gap-1"><Calendar className="h-4 w-4"/> {new Date(ride.confirmationTime?.toDate()).toLocaleDateString()}</span>
                                        <span className="flex items-center gap-1"><IndianRupee className="h-4 w-4"/> ₹{ride.estimatedCost}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-start md:items-end gap-2">
                                    <p className="text-sm font-medium">{ride.rating ? 'Your Rating' : 'Rate Your Experience'}</p>
                                    <StarRating
                                        initialRating={ride.rating}
                                        onRate={(rating) => handleRating(ride.id, rating)}
                                        readOnly={!!ride.rating}
                                    />
                                </div>
                            </div>
                            {index < bookings.length - 1 && <Separator className="mt-6" />}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

export default function RideHistoryPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const ridesAsRiderQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(collection(firestore, 'bookingConfirmations'), where('riderId', '==', user.uid));
  }, [user, firestore]);

  const ridesAsDriverQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(collection(firestore, 'bookingConfirmations'), where('driverId', '==', user.uid));
  }, [user, firestore]);

  const { data: ridesAsRider, isLoading: loadingRider } = useCollection<BookingConfirmation>(ridesAsRiderQuery);
  const { data: ridesAsDriver, isLoading: loadingDriver } = useCollection<BookingConfirmation>(ridesAsDriverQuery);

  return (
    <>
      <PageHeader
        title="Ride & Delivery History"
        description="Review your past trips and provide feedback."
        showBackButton
      />
      <Tabs defaultValue="rider">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-6">
          <TabsTrigger value="rider">As Rider/Sender</TabsTrigger>
          <TabsTrigger value="driver">As Driver</TabsTrigger>
        </TabsList>
        <TabsContent value="rider">
            <RideHistoryList bookings={ridesAsRider} isLoading={loadingRider} />
        </TabsContent>
        <TabsContent value="driver">
            <RideHistoryList bookings={ridesAsDriver} isLoading={loadingDriver} />
        </TabsContent>
      </Tabs>
    </>
  );
}

