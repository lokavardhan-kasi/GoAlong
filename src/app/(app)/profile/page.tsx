import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { userProfile } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Edit } from 'lucide-react';

const stats = [
    { label: "Total Rides", value: userProfile.totalRides },
    { label: "Total Deliveries", value: userProfile.totalDeliveries },
    { label: "Total Savings", value: `$${userProfile.savings.toFixed(2)}` },
];

export default function ProfilePage() {
  return (
    <>
      <PageHeader
        title="Your Profile"
        description="Manage your personal information and see your stats."
      >
        <Button><Edit className="mr-2"/> Edit Profile</Button>
      </PageHeader>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
            <Card className="text-center">
                <CardHeader>
                     <Avatar className="h-24 w-24 mx-auto border-4 border-primary/50">
                        <AvatarImage src="https://picsum.photos/seed/user-profile/100/100" alt={userProfile.name} data-ai-hint="person face"/>
                        <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                </CardHeader>
                <CardContent>
                    <h2 className="text-2xl font-bold font-headline">{userProfile.name}</h2>
                    <p className="text-muted-foreground">{userProfile.email}</p>
                    <p className="text-sm text-muted-foreground mt-2">Member since {userProfile.memberSince}</p>
                </CardContent>
            </Card>

            <Card className="mt-8">
                <CardHeader>
                    <CardTitle className="font-headline">Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <dl className="space-y-2">
                        {stats.map(stat => (
                            <div key={stat.label} className="flex justify-between">
                                <dt className="text-muted-foreground">{stat.label}</dt>
                                <dd className="font-semibold">{stat.value}</dd>
                            </div>
                        ))}
                    </dl>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Personal Information</CardTitle>
                    <CardDescription>This information is private and will not be shared.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={userProfile.name} readOnly />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" defaultValue={userProfile.email} readOnly />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number (Optional)</Label>
                        <Input id="phone" defaultValue="+1 (555) 123-4567" readOnly />
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </>
  );
}
