
'use client';
import { useParams, useRouter, usePathname, useSearchParams } from 'next/navigation';
import { rides } from '@/lib/mock-data';
import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, IndianRupee, MapPin, Star, Users, CheckCircle, Send, Package, Zap, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import CountUp from '@/components/common/count-up';
import { useToast } from '@/hooks/use-toast';
import { useState, useMemo, useEffect } from 'react';
import { useUser, useFirestore } from '@/firebase';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Separator } from '@/components/ui/separator';
import { collection, addDoc, serverTimestamp, where, query, getDocs, doc, increment } from 'firebase/firestore';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { motion } from 'framer-motion';

export default function RideDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const ride = rides.find(r => r.id === params.id);
  const [bookingType, setBookingType] = useState<'seat' | 'parcel'>('seat');
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const from = searchParams.get('from');
  const to = searchParams.get('to');

  const rideRoute = useMemo(() => {
    if (!ride) return { from: '', to: '' };
    return {
      from: from || ride.route.from,
      to: to || ride.route.to,
    }
  }, [ride, from, to]);

  if (!ride) {
    return (
        <div className="p-4 md:p-8">
            <PageHeader title="Ride not found" description="This ride is no longer available or the link is incorrect." showBackButton />
            <Button asChild><Link href="/search">Back to all rides</Link></Button>
        </div>
    );
  }
  
  const estimatedCost = bookingType === 'seat' ? ride.price.seat : ride.price.parcel;

  const handleBooking = async () => {
    if (isBooking || isUserLoading) return;
    if (!user) {
      localStorage.setItem('redirectAfterLogin', pathname);
      router.push('/login');
      return;
    }
    if (!firestore || !ride) return;

    setIsBooking(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log(`Message sent to driver ${ride.driver.name}: New booking request from ${user.displayName}`);

    try {
        const rideRequestData = {
            riderId: user.uid,
            driverId: ride.driver.id,
            routeId: ride.id,
            pickupLocation: rideRoute.from,
            dropoffLocation: rideRoute.to,
            desiredTime: ride.times.departure,
            status: 'pending',
            bookingType,
            createdAt: serverTimestamp(),
        };

        const rideRequestsCollection = collection(firestore, 'rideRequests');
        await addDoc(rideRequestsCollection, rideRequestData);

        const conversationsRef = collection(firestore, 'conversations');
        const q = query(
          conversationsRef,
          where('participantIds', 'array-contains-all', [user.uid, ride.driver.id])
        );

        const querySnapshot = await getDocs(q);
        let conversationId: string | null = null;
        if (!querySnapshot.empty) {
          conversationId = querySnapshot.docs[0].id;
        } else {
            const newConversation = {
                participantIds: [user.uid, ride.driver.id],
                participantDetails: {
                    [user.uid]: {
                        displayName: user.displayName || 'Me',
                        avatarUrl: user.photoURL || '',
                    },
                    [ride.driver.id]: {
                        displayName: ride.driver.name,
                        avatarUrl: ride.driver.avatarUrl,
                    }
                },
                unreadCounts: {
                  [user.uid]: 0,
                  [ride.driver.id]: 0,
                },
                createdAt: serverTimestamp(),
                lastMessage: null,
            };
            const conversationRef = await addDoc(conversationsRef, newConversation);
            conversationId = conversationRef.id;
        }

        const messageText = `Hi ${ride.driver.name}, I'd like to request a ${bookingType} for your ride from ${rideRoute.from} to ${rideRoute.to}.`;
        const messagesCol = collection(firestore, `conversations/${conversationId}/messages`);
        
        await addDoc(messagesCol, {
            text: messageText,
            senderId: user.uid,
            timestamp: serverTimestamp(),
        });
        
        const conversationDocRef = doc(firestore, 'conversations', conversationId);
        setDocumentNonBlocking(
            conversationDocRef,
            { 
              lastMessage: { text: messageText, senderId: user.uid, timestamp: serverTimestamp() },
              [`unreadCounts.${ride.driver.id}`]: increment(1),
            },
            { merge: true }
        );

        setBookingSuccess(true);

    } catch (error: any) {
        toast({
            title: "Booking Failed",
            description: "Could not send booking request. " + error.message,
            variant: "destructive",
        });
    } finally {
        setIsBooking(false);
    }
  }
  
  return (
    <>
      <PageHeader title="Ride Details" showBackButton />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
                <p className="font-semibold text-xl">Saturday, 27 December</p>
            </CardHeader>
            <CardContent>
                <div className="flex gap-6">
                    {/* Timeline */}
                    <div className="flex flex-col items-center">
                        <div className="w-4 h-4 rounded-full bg-primary" />
                        <div className="flex-1 w-px bg-gray-300" />
                        <div className="w-4 h-4 rounded-full border-2 border-primary" />
                    </div>
                    {/* Route Info */}
                    <div className="flex-1">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="font-bold">{rideRoute.from}</p>
                                <p className="text-sm text-muted-foreground">Pick up point</p>
                            </div>
                            <p className="font-bold text-lg">{ride.times.departure}</p>
                        </div>

                         <div className="my-6 border-l-2 border-dashed pl-8 ml-[-1.6rem] space-y-6">
                             {ride.route.stops.map(stop => (
                                 <div key={stop}>
                                     <p className="font-semibold">{stop}</p>
                                     <p className="text-sm text-muted-foreground">Stopover</p>
                                 </div>
                             ))}
                         </div>
                        
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="font-bold">{rideRoute.to}</p>
                                <p className="text-sm text-muted-foreground">Drop off point</p>
                            </div>
                            <p className="font-bold text-lg">{ride.times.arrival}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
          </Card>

           <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Driver & Vehicle</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4 mb-6">
                        <Avatar className="h-16 w-16 border-2 border-primary">
                            <AvatarImage src={ride.driver.avatarUrl} alt={ride.driver.name} data-ai-hint="person face"/>
                            <AvatarFallback>{ride.driver.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-xl font-bold">{ride.driver.name}</p>
                             <div className="flex items-center gap-2 text-muted-foreground">
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-500" />
                                <span className="font-semibold">{ride.driver.rating.toFixed(1)}</span>
                                {ride.driver.verified && (
                                     <>
                                        <span className="mx-1">•</span>
                                        <Badge variant="secondary" className="border-blue-200 bg-blue-50 text-blue-700">
                                            <ShieldCheck className="mr-1 h-3 w-3"/>
                                            Verified Profile
                                        </Badge>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <Separator className="my-4"/>
                    <div>
                        <p className="font-semibold">{ride.vehicle.model}</p>
                        <p className="text-sm text-muted-foreground">Vehicle</p>
                        <p className="mt-4 text-sm text-muted-foreground">
                            Ladies and gents also come next any one want to direct book...
                        </p>
                    </div>
                </CardContent>
           </Card>

        </div>
        <div className="lg:col-span-1">
            <div className="sticky top-24">
                <Card className="shadow-xl rounded-2xl">
                    <CardContent className="p-6 space-y-4">
                        <ToggleGroup type="single" defaultValue="seat" className="w-full" value={bookingType} onValueChange={(value) => value && setBookingType(value as any)}>
                            <ToggleGroupItem value="seat" className="w-1/2 gap-2 data-[state=on]:bg-blue-100 data-[state=on]:text-blue-700 data-[state=on]:border-blue-200 border">
                                <Users className="h-5 w-5" /> Book Seat
                            </ToggleGroupItem>
                            <ToggleGroupItem value="parcel" disabled={ride.features.parcelSpace === 'None'} className="w-1/2 gap-2 data-[state=on]:bg-emerald-100 data-[state=on]:text-emerald-700 data-[state=on]:border-emerald-200 border">
                                <Package className="h-5 w-5" /> Send Parcel
                            </ToggleGroupItem>
                        </ToggleGroup>

                        <div className="text-center py-4">
                            <span className="text-4xl font-bold">₹{estimatedCost}</span>
                            <span className="text-muted-foreground"> / {bookingType}</span>
                        </div>
                        
                        <Button size="lg" className="w-full h-12 text-base rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white transition-all duration-300 hover:shadow-lg hover:brightness-110 active:scale-95" onClick={handleBooking} disabled={isBooking || isUserLoading}>
                          {isBooking ? 'Requesting...' : 'Request to Book'}
                        </Button>

                         {ride.features.instantBooking && (
                             <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                                <Zap className="h-4 w-4 text-green-500" />
                                <span>Your booking will be confirmed instantly.</span>
                            </div>
                         )}

                    </CardContent>
                </Card>
            </div>
        </div>
      </div>

       {bookingSuccess && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl p-8 text-center max-w-sm w-full mx-4 shadow-2xl"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
                >
                    <CheckCircle className="h-20 w-20 text-green-500 mx-auto" />
                </motion.div>
                <h2 className="text-2xl font-bold mt-6">Booking Request Sent!</h2>
                <p className="text-muted-foreground mt-2">
                    We have sent a message to <span className="font-semibold text-foreground">{ride.driver.name}</span>. They will confirm your ride shortly.
                </p>
                <Button 
                    size="lg" 
                    className="w-full mt-8"
                    onClick={() => router.push('/dashboard')}
                >
                    Go to Dashboard
                </Button>
            </motion.div>
        </div>
      )}
    </>
  );
}

    