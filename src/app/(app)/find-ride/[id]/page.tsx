
'use client';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { rides } from '@/lib/mock-data';
import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, DollarSign, MapPin, Star, Users, CheckCircle, Send } from 'lucide-react';
import Link from 'next/link';
import CountUp from '@/components/common/count-up';
import { useToast } from '@/hooks/use-toast';
import { useContext } from 'react';
import { UserContext } from '@/context/user-context';

export default function RideDetailPage() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const { isLoggedIn } = useContext(UserContext);
  const ride = rides.find(r => r.id === params.id);

  if (!ride) {
    return (
        <div className="p-4 md:p-8">
            <PageHeader title="Ride not found" description="This ride is no longer available or the link is incorrect."/>
            <Button asChild><Link href="/find-ride">Back to all rides</Link></Button>
        </div>
    );
  }

  const handleBooking = () => {
    if (!isLoggedIn) {
      localStorage.setItem('redirectAfterLogin', pathname);
      router.push('/login');
    } else {
      toast({
          title: "Booking Confirmed!",
          description: `Your seat for the ride with ${ride.driverName} has been booked.`,
      })
    }
  }
  
  const handleMessage = () => {
    if (!isLoggedIn) {
      localStorage.setItem('redirectAfterLogin', pathname);
      router.push('/login');
    } else {
       toast({
          title: "Message Sent!",
          description: `Your message to ${ride.driverName} has been sent.`,
      })
    }
  }

  const seatsToBook = 1;
  const estimatedCost = ride.pricePerSeat * seatsToBook;

  return (
    <>
      <PageHeader title="Ride Details" description={`Confirm your ride with ${ride.driverName}.`} />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
                <div className="relative h-64 w-full overflow-hidden rounded-lg">
                    <Image src={ride.carImageUrl} alt={ride.carModel} fill className="object-cover" data-ai-hint="car side" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="mb-6 flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-primary">
                        <AvatarImage src={ride.driverAvatarUrl} alt={ride.driverName} data-ai-hint="person face"/>
                        <AvatarFallback>{ride.driverName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-xl font-bold font-headline">{ride.driverName}</p>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-500" />
                            <span className="font-semibold">{ride.rating.toFixed(1)}</span>
                             <span className="mx-1">•</span>
                            <span>{ride.carModel}</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="font-headline text-lg font-semibold">Trip Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 flex-shrink-0 text-primary mt-1" />
                            <div><p className="font-medium">From</p><p className="text-muted-foreground">{ride.startPoint}</p></div>
                        </div>
                        <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 flex-shrink-0 text-accent-foreground mt-1" />
                            <div><p className="font-medium">To</p><p className="text-muted-foreground">{ride.endPoint}</p></div>
                        </div>
                         <div className="flex items-start gap-3">
                            <Clock className="h-5 w-5 flex-shrink-0 text-primary mt-1" />
                            <div><p className="font-medium">Departure Time</p><p className="text-muted-foreground">{ride.travelTime}</p></div>
                        </div>
                         <div className="flex items-start gap-3">
                            <Users className="h-5 w-5 flex-shrink-0 text-primary mt-1" />
                            <div><p className="font-medium">Available Seats</p><p className="text-muted-foreground">{ride.availableSeats}</p></div>
                        </div>
                    </div>
                </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
            <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle className="font-headline">Booking Confirmation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Seats to book</span>
                          <Badge>{seatsToBook}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Price per seat</span>
                          <span>${ride.pricePerSeat.toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-4 flex items-center justify-between">
                          <span className="text-lg font-semibold">Estimated Cost</span>
                          <div className="text-2xl font-bold text-primary">
                              <CountUp end={estimatedCost} prefix="$" decimals={2} />
                          </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Button size="lg" className="w-full active:scale-95" onClick={handleBooking}>
                          <CheckCircle className="mr-2"/> Confirm Booking
                      </Button>
                      <Button size="lg" variant="outline" className="w-full active:scale-95" onClick={handleMessage}>
                          <Send className="mr-2"/> Message Driver
                      </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </>
  );
}
