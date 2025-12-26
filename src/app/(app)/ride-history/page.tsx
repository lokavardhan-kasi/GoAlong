'use client';

import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { pastRides } from '@/lib/mock-data';
import { StarRating } from '@/components/common/star-rating';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Car, DollarSign, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function RideHistoryPage() {
  const { toast } = useToast();
  const [rides, setRides] = useState(pastRides);

  const handleRating = (rideId: string, rating: number) => {
    setRides(prevRides => prevRides.map(ride => ride.id === rideId ? {...ride, rating} : ride));
    toast({
      title: 'Rating Submitted',
      description: `You gave ${rating} stars. Thanks for your feedback!`,
    });
  };

  return (
    <>
      <PageHeader
        title="Ride & Delivery History"
        description="Review your past trips and provide feedback."
      />
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Your Past Trips</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-6">
                {rides.map((ride, index) => (
                    <div key={ride.id}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-2 space-y-2">
                                <div className="flex items-center gap-2">
                                    <Car className="h-5 w-5 text-primary"/>
                                    <p className="font-semibold">{ride.startPoint} to {ride.endPoint}</p>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4"/> With {ride.driverName}</span>
                                    <span className="flex items-center gap-1"><Calendar className="h-4 w-4"/> {ride.date}</span>
                                    <span className="flex items-center gap-1"><DollarSign className="h-4 w-4"/> ${ride.cost.toFixed(2)}</span>
                                </div>
                            </div>
                             <div className="flex flex-col items-start md:items-end gap-2">
                                <p className="text-sm font-medium">{ride.rating ? 'Your Rating' : 'Rate Your Driver'}</p>
                                <StarRating 
                                    initialRating={ride.rating} 
                                    onRate={(rating) => handleRating(ride.id, rating)}
                                    readOnly={!!ride.rating}
                                />
                            </div>
                        </div>
                        {index < rides.length - 1 && <Separator className="mt-6" />}
                    </div>
                ))}
            </div>
        </CardContent>
      </Card>
    </>
  );
}
