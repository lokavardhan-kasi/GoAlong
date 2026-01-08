
'use client';

import { motion } from 'framer-motion';
import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowRight, Car, Leaf, MessageSquare, Route, Trash2, Calendar, Check } from 'lucide-react';
import CountUp from '@/components/common/count-up';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useCollection, useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, doc, deleteDoc, getDocs, Timestamp, addDoc, serverTimestamp } from 'firebase/firestore';
import { RideRequest, WithId, Route as RideRoute } from '@/lib/mock-data';
import { CarLoader } from '@/components/ui/CarLoader';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { IndianRupee } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const stats = [
    { title: "Rides Completed", value: 24, icon: Car, color: "text-blue-500", bgColor: "bg-blue-100" },
    { title: "Money Saved", value: 120.50, icon: IndianRupee, prefix: "₹", decimals: 2, color: "text-green-500", bgColor: "bg-green-100" },
    { title: "CO2 Reduced (kg)", value: 58, icon: Leaf, color: "text-emerald-500", bgColor: "bg-emerald-100" }
];

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      },
    }),
};

function ActivityFeed() {
    const { user } = useUser();
    const firestore = useFirestore();
    const { toast } = useToast();

    const rideRequestsQuery = useMemoFirebase(() => {
        if (!user) return null;
        return query(collection(firestore, 'rideRequests'), where('driverId', '==', user.uid), where('status', '==', 'pending'));
    }, [user, firestore]);

    const { data: rideRequests, isLoading } = useCollection<RideRequest>(rideRequestsQuery);
    
    const handleDelete = async (requestId: string) => {
        await deleteDoc(doc(firestore, 'rideRequests', requestId));
        toast({ title: "Request Declined", description: "The request has been removed." });
    }

    if (isLoading) {
        return <CarLoader />;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Activity Feed</CardTitle>
                <CardDescription>Recent requests and messages.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {rideRequests && rideRequests.length > 0 ? (
                    rideRequests.map((req) => (
                        <div key={req.id} className="flex items-start gap-4">
                            <Avatar>
                                <AvatarImage src={`https://picsum.photos/seed/ride${req.id}/100/100`} data-ai-hint="person face" />
                                <AvatarFallback>{req.riderId.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="text-sm"><span className="font-semibold">{req.riderId.substring(0, 6)}...</span> wants to book a {req.bookingType}.</p>
                                <div className="flex gap-2 mt-2">
                                    <Button size="sm" className="h-8 active:scale-95">Accept</Button>
                                    <Button size="sm" variant="ghost" className="h-8 text-destructive hover:bg-destructive/10 active:scale-95" onClick={() => handleDelete(req.id)}>
                                        <Trash2 className="mr-2 h-4 w-4"/> Decline
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">No new ride requests.</p>
                )}
                <Separator />
                <div className="flex items-start gap-4">
                    <Avatar>
                        <AvatarImage src="https://picsum.photos/seed/message/100/100" data-ai-hint="person face" />
                        <AvatarFallback>M</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <p className="text-sm"><span className="font-semibold">Message from Mike L.</span></p>
                        <p className="text-sm text-muted-foreground p-3 bg-gray-100 rounded-lg mt-1">"Hey, where exactly is the pickup point?"</p>
                        <Button size="sm" variant="ghost" className="h-8 mt-1 p-0 text-primary hover:text-primary active:scale-95">
                            <MessageSquare className="mr-2"/> Reply
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

type RouteWithStatus = RideRoute & {
    id: string;
    scheduleType?: 'recurring' | 'one-time';
    date?: string;
    departureTimestamp?: Timestamp;
    arrivalTimestamp?: Timestamp;
};

function FrequentRoutes() {
    const { user } = useUser();
    const firestore = useFirestore();
    const { toast } = useToast();

    const routesQuery = useMemoFirebase(() => {
        if (!user) return null;
        return collection(firestore, `users/${user.uid}/routes`);
    }, [user, firestore]);

    const { data: routes, isLoading } = useCollection<RouteWithStatus>(routesQuery);
    
    const handleCompleteRide = async (route: RouteWithStatus) => {
        if (!user || !firestore) return;
        try {
            // 1. Create a booking confirmation
            const bookingConfirmationData = {
                driverId: user.uid,
                riderId: 'self-completed', // Indicates driver completed it manually
                rideRequestId: route.id, // Use route id for reference
                pickupLocation: route.startPoint,
                dropoffLocation: route.endPoint,
                estimatedCost: route.price,
                confirmationTime: serverTimestamp(),
            };
            await addDoc(collection(firestore, 'bookingConfirmations'), bookingConfirmationData);

            // 2. Delete the original route
            await deleteDoc(doc(firestore, `users/${user.uid}/routes`, route.id));

            toast({
                title: 'Ride Completed',
                description: 'The ride has been moved to your history.',
            });

        } catch (error) {
            console.error("Error completing ride: ", error);
            toast({
                title: "Error",
                description: "Could not complete the ride. Please try again.",
                variant: "destructive",
            });
        }
    };
    
    const handleDeleteRoute = async (routeId: string) => {
        if (!user) return;
        await deleteDoc(doc(firestore, `users/${user.uid}/routes`, routeId));
        toast({ title: "Route Deleted", description: "Your route has been successfully removed." });
    }

    const getStatus = (route: RouteWithStatus): { text: 'Upcoming' | 'Ongoing' | 'Completed' | 'Recurring'; className: string } => {
        if (route.scheduleType === 'recurring') {
            return { text: 'Recurring', className: 'bg-blue-100 text-blue-800' };
        }
        if (route.departureTimestamp) {
            const now = Timestamp.now();
            if (now < route.departureTimestamp) {
                return { text: 'Upcoming', className: 'bg-green-100 text-green-800' };
            } else if (route.arrivalTimestamp && now >= route.departureTimestamp && now <= route.arrivalTimestamp) {
                return { text: 'Ongoing', className: 'bg-yellow-100 text-yellow-800' };
            } else {
                 return { text: 'Completed', className: 'bg-gray-100 text-gray-800' };
            }
        }
        return { text: 'Completed', className: 'bg-gray-100 text-gray-800' }; // Default for old data
    };


    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Your Published Routes</CardTitle>
            </CardHeader>
            <CardContent>
                <TooltipProvider>
                    {isLoading && <CarLoader />}
                    {!isLoading && routes && routes.length > 0 ? (
                        <div className="space-y-4">
                            {routes.map(route => {
                                const status = getStatus(route);
                                return (
                                    <div key={route.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="font-semibold">{route.startPoint} to {route.endPoint}</p>
                                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                                                {route.scheduleType === 'one-time' && route.departureTimestamp ? (
                                                    <><Calendar className="h-4 w-4" /> {format(route.departureTimestamp.toDate(), 'PPP')} at {route.travelTime}</>
                                                ) : (
                                                    <>{route.travelTime} - {route.routeDays.join(', ')}</>
                                                )}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <Badge variant="secondary" className={cn(status.className)}>{status.text}</Badge>
                                          <Badge variant="secondary">{route.availableSeats} seats</Badge>
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600/70 hover:bg-green-600/10 hover:text-green-600 active:scale-95" onClick={() => handleCompleteRide(route)}>
                                                    <Check className="h-4 w-4"/>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Mark as Completed & Move to History</p>
                                            </TooltipContent>
                                          </Tooltip>
                                          <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive/70 hover:bg-destructive/10 hover:text-destructive active:scale-95" onClick={() => handleDeleteRoute(route.id)}>
                                                        <Trash2 className="h-4 w-4"/>
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Delete Route</p>
                                                </TooltipContent>
                                          </Tooltip>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        !isLoading && <p className="text-sm text-muted-foreground">You haven't published any routes yet.</p>
                    )}
                </TooltipProvider>
            </CardContent>
        </Card>
    );
}


export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-7 space-y-8">
            <PageHeader
                title="Welcome Back!"
                description="Here's a snapshot of your GoAlong activity."
            />
            
            <div>
                <h2 className="text-2xl font-bold mb-4 font-headline tracking-tight">Quick Actions</h2>
                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="flex flex-col justify-between p-6 bg-gradient-to-br from-primary to-blue-600 text-primary-foreground transition-all duration-300 hover:shadow-2xl hover:brightness-110">
                       <div>
                            <h3 className="font-headline flex items-center gap-3 text-xl font-bold"><Route/> Plan a new commute</h3>
                            <p className="mt-2 opacity-90">Offer seats to others on your regular trips and earn.</p>
                       </div>
                       <Button asChild variant="secondary" className="mt-6 w-fit active:scale-95">
                           <Link href="/plan-route">Create Route <ArrowRight className="ml-2"/></Link>
                       </Button>
                    </Card>
                    <Card className="flex flex-col justify-between p-6 border-2 border-dashed transition-all duration-300 hover:border-solid hover:border-primary hover:shadow-lg">
                         <div>
                            <h3 className="font-headline flex items-center gap-3 text-xl font-bold"><Car/> Find a ride or send a parcel</h3>
                            <p className="text-muted-foreground mt-2">Catch a ride with a neighbor or send something along.</p>
                        </div>
                        <Button asChild className="mt-6 w-fit active:scale-95">
                            <Link href="/search">Find Ride <ArrowRight className="ml-2"/></Link>
                        </Button>
                    </Card>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.title}
                        custom={i}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-lg border">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">
                                <CountUp 
                                    end={stat.value} 
                                    prefix={stat.prefix} 
                                    decimals={stat.decimals}
                                />
                                </div>
                                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* Right Sidebar */}
        <aside className="lg:col-span-3">
            <div className="sticky top-8 space-y-8">
                 <ActivityFeed />
                 <FrequentRoutes />
            </div>
        </aside>
    </div>
  );
}

    

    



    

    

    