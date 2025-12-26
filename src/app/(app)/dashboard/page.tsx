import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Car, DollarSign, Leaf, Route } from 'lucide-react';
import CountUp from '@/components/common/count-up';

const stats = [
    { title: "Rides Completed", value: 24, icon: Car, color: "text-blue-500", bgColor: "bg-blue-100" },
    { title: "Money Saved", value: 120.50, icon: DollarSign, prefix: "$", decimals: 2, color: "text-green-500", bgColor: "bg-green-100" },
    { title: "CO2 Reduced (kg)", value: 58, icon: Leaf, color: "text-emerald-500", bgColor: "bg-emerald-100" }
];

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Welcome Back, Jane!"
        description="Here's a snapshot of your GoAlong activity."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {stats.map(stat => (
            <Card key={stat.title} className="transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <div className={`p-2 rounded-md ${stat.bgColor}`}>
                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                       <CountUp 
                         end={stat.value} 
                         prefix={stat.prefix} 
                         decimals={stat.decimals}
                       />
                    </div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
            </Card>
        ))}
      </div>
      
      <div>
        <h2 className="font-headline text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2">
            <Card className="flex flex-col justify-between">
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2"><Route/> Plan a new commute</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">Offer seats to others on your regular trips.</p>
                    <Button asChild>
                        <Link href="/plan-route">Plan Route <ArrowRight className="ml-2"/></Link>
                    </Button>
                </CardContent>
            </Card>
            <Card className="flex flex-col justify-between">
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2"><Car/> Find a ride</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">Catch a ride with a neighbor and save.</p>
                    <Button asChild>
                        <Link href="/find-ride">Find Ride <ArrowRight className="ml-2"/></Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </>
  );
}
