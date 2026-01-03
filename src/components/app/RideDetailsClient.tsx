'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, IndianRupee, MapPin, Star, Users, CheckCircle, Send, Package, Zap, ShieldCheck, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useState, useMemo, useEffect } from 'react';
import { useUser, useFirestore, useDoc, useMemoFirebase, useCollection } from '@/firebase';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Separator } from '@/components/ui/separator';
import { collection, addDoc, serverTimestamp, where, query, getDocs, doc, increment, collectionGroup } from 'firebase/firestore';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { motion } from 'framer-motion';
import { Route as RideRoute, UserProfile } from '@/lib/mock-data';
import { CarLoader } from '@/components/ui/CarLoader';

export default function RideDetailsClient({ rideId }: { rideId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  
  const [bookingType, setBookingType] = useState<'seat' | 'parcel'>('seat');
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const from = searchParams.get('from');
  const to = searchParams.get('to');

   const allRoutesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collectionGroup(firestore, 'routes'));
  }, [firestore]);
  
  const { data: allRoutes, isLoading: isLoadingAllRoutes } = useCollection<RideRoute>(allRoutesQuery);
  
  const ride = useMemo(() => {
    if (!allRoutes) return null;
    return allRoutes.find(r => r.id === rideId);
  }, [allRoutes, rideId]);


  const driverProfileRef = useMemoFirebase(() => {
    if (!firestore || !ride?.driverId) return null;
    return doc(firestore, 'userProfiles', ride.driverId);
  }, [firestore, ride]);

  const { data: driverProfile, isLoading: isDriverLoading } = useDoc<UserProfile>(driverProfileRef);


  const rideRoute = useMemo(() => {
    if (!ride) return { from: '', to: '' };
    return {
      from: from || ride.startPoint,
      to: to || ride.endPoint,
    }
  }, [ride, from, to]);

  if (isLoadingAllRoutes || isDriverLoading) {
      return <div className="flex h-full items-center justify-center"><CarLoader /></div>
  }

  if (!ride || !driverProfile) {
    return (
        <div className="p-4 md:p-8">
            <PageHeader title="Ride not found" description="This ride is no longer available or the link is incorrect." showBackButton />
            <Button asChild><Link href="/search">Back to all rides</Link></Button>
        </div>
    );
  }
  
  const estimatedCost = ride.price;

  const handleBooking = async () => {
    if (isBooking || isUserLoading) return;
    if (!user) {
      localStorage.setItem('redirectAfterLogin', `${window.location.pathname}?${searchParams.toString()}`);
      router.push('/login');
      return;
    }
    if (!firestore || !ride) return;

    setIsBooking(true);

    try {
        const rideRequestData = {
            riderId: user.uid,
            driverId: ride.driverId,
            routeId: ride.id,
            pickupLocation: rideRoute.from,
            dropoffLocation: rideRoute.to,
            desiredTime: ride.travelTime,
            status: 'pending',
            bookingType,
            createdAt: serverTimestamp(),
        };

        const rideRequestsCollection = collection(firestore, 'rideRequests');
        await addDoc(rideRequestsCollection, rideRequestData);

        const conversationsRef = collection(firestore, 'conversations');
        const q = query(
          conversationsRef,
          where('participantIds', 'array-contains', user.uid),
        );

        const querySnapshot = await getDocs(q);
        let convId: string | null = null;
        
        const existingConv = querySnapshot.docs.find(doc => doc.data().participantIds.includes(ride.driverId));

        if (existingConv) {
          convId = existingConv.id;
        } else {
            const newConversation = {
                participantIds: [user.uid, ride.driverId],
                participantDetails: {
                    [user.uid]: {
                        displayName: user.displayName || 'Me',
                        avatarUrl: user.photoURL || '',
                    },
                    [ride.driverId]: {
                        displayName: `${driverProfile.firstName} ${driverProfile.lastName}`,
                        avatarUrl: driverProfile.profilePictureUrl || '',
                    }
                },
                unreadCounts: {
                  [user.uid]: 0,
                  [ride.driverId]: 0,
                },
                createdAt: serverTimestamp(),
                lastMessage: null,
            };
            const conversationRef = await addDoc(conversationsRef, newConversation);
            convId = conversationRef.id;
        }

        setConversationId(convId);

        const messageText = `Hi ${driverProfile.firstName}, I'd like to request a ${bookingType} for your ride from ${rideRoute.from} to ${rideRoute.to}.`;
        const messagesCol = collection(firestore, `conversations/${convId}/messages`);
        
        await addDoc(messagesCol, {
            text: messageText,
            senderId: user.uid,
            timestamp: serverTimestamp(),
        });
        
        const conversationDocRef = doc(firestore, 'conversations', convId);
        setDocumentNonBlocking(
            conversationDocRef,
            { 
              lastMessage: { text: messageText, senderId: user.uid, timestamp: serverTimestamp() },
              [`unreadCounts.${ride.driverId}`]: increment(1),
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
                            <p className="font-bold text-lg">{ride.travelTime}</p>
                        </div>
                        
                        <div className="flex items-start justify-between mt-12">
                            <div>
                                <p className="font-bold">{rideRoute.to}</p>
                                <p className="text-sm text-muted-foreground">Drop off point</p>
                            </div>
                            {/* Arrival time needs logic */}
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
                            <AvatarImage src={driverProfile.profilePictureUrl} alt={driverProfile.firstName} data-ai-hint="person face"/>
                            <AvatarFallback>{driverProfile.firstName?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-xl font-bold">{driverProfile.firstName} {driverProfile.lastName}</p>
                             <div className="flex items-center gap-2 text-muted-foreground">
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-500" />
                                <span className="font-semibold">4.9</span>
                                {driverProfile.isDriver && (
                                   <><Separator orientation="vertical" className="h-4" /><ShieldCheck className="h-5 w-5 text-blue-500" /> <span className="text-xs font-semibold">Verified</span></>
                                )}
                            </div>
                        </div>
                    </div>
                    <Separator className="my-4"/>
                    <div>
                        <p className="font-semibold">Vehicle model</p>
                        <p className="text-sm text-muted-foreground">Vehicle details not available</p>
                        <Image src={"https://picsum.photos/seed/car-default/600/400"} alt={"Vehicle"} width={600} height={400} className="mt-4 rounded-lg object-cover w-full aspect-video" data-ai-hint="car side" />

                        <p className="mt-4 text-sm text-muted-foreground">
                            Driver's note will go here.
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
                            <ToggleGroupItem value="parcel" disabled className="w-1/2 gap-2 data-[state=on]:bg-emerald-100 data-[state=on]:text-emerald-700 data-[state=on]:border-emerald-200 border">
                                <Package className="h-5 w-5" /> Send Parcel
                            </ToggleGroupItem>
                        </ToggleGroup>

                        <div className="text-center py-4">
                            <span className="text-4xl font-bold">₹{estimatedCost}</span>
                            <span className="text-muted-foreground"> / {bookingType}</span>
                        </div>
                        
                        <Button size="lg" className="w-full h-12 text-base rounded-full bg-gradient-to-r from-primary to-blue-600 text-white transition-all duration-300 hover:shadow-lg hover:brightness-110 active:scale-95" onClick={handleBooking} disabled={isBooking || isUserLoading}>
                          {isBooking ? 'Requesting...' : 'Request to Book'}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>

       {bookingSuccess && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
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
                    We have sent a message to <span className="font-semibold text-foreground">{driverProfile.firstName}</span>. They will confirm your ride shortly.
                </p>
                <div className="flex flex-col gap-2 mt-8">
                  <Button 
                      size="lg" 
                      className="w-full"
                      onClick={() => router.push('/dashboard')}
                  >
                      Go to Dashboard
                  </Button>
                  <Button 
                      size="lg" 
                      variant="outline"
                      className="w-full"
                      onClick={() => router.push(`/inbox/${conversationId}`)}
                  >
                      <MessageSquare className="mr-2"/> Go to Conversation
                  </Button>
                </div>
            </motion.div>
        </div>
      )}
    </>
  );
}
