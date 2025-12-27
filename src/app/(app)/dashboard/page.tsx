
'use client';

import { motion } from 'framer-motion';
import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Car, Leaf, MessageSquare, Route, IndianRupee } from 'lucide-react';
import CountUp from '@/components/common/count-up';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const stats = [
    { title: "Rides Completed", value: 24, icon: Car, color: "text-blue-500", bgColor: "bg-blue-100" },
    { title: "Money Saved", value: 120.50, icon: IndianRupee, prefix: "₹", decimals: 2, color: "text-green-500", bgColor: "bg-green-100" },
    { title: "CO2 Reduced (kg)", value: 58, icon: Leaf, color: "text-emerald-500", bgColor: "bg-emerald-100" }
];

const rideRequests = [
    { name: 'Ananya Sharma', action: 'wants to send a box', avatarUrl: 'https://picsum.photos/seed/ride1/100/100' },
    { name: 'Ben Carter', action: 'requested a seat', avatarUrl: 'https://picsum.photos/seed/ride2/100/100' },
]

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

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-7 space-y-8">
            <PageHeader
                title="Welcome Back!"
                description="Here's a snapshot of your GoAlong activity."
            />

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
        </div>

        {/* Right Sidebar */}
        <aside className="lg:col-span-3">
            <div className="sticky top-8 space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Your Frequent Routes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative h-56 w-full rounded-lg overflow-hidden">
                            <Image src="https://picsum.photos/seed/map/600/400" alt="Map of frequent routes" fill className="object-cover" data-ai-hint="route map" />
                            <div className="absolute top-2 left-2">
                                <Badge variant="secondary">3 Active Routes</Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Activity Feed</CardTitle>
                        <CardDescription>Recent requests and messages.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {rideRequests.map((req, index) => (
                             <div key={index} className="flex items-start gap-4">
                                <Avatar>
                                    <AvatarImage src={req.avatarUrl} data-ai-hint="person face" />
                                    <AvatarFallback>{req.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="text-sm"><span className="font-semibold">{req.name}</span> {req.action}.</p>
                                    <div className="flex gap-2 mt-2">
                                        <Button size="sm" className="h-8 active:scale-95">Accept</Button>
                                        <Button size="sm" variant="outline" className="h-8 active:scale-95">Decline</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
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
            </div>
        </aside>
    </div>
  );
}
