'use client';
import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Edit, IndianRupee, Car, Package } from 'lucide-react';
import { useDoc, useUser, useCollection, useMemoFirebase } from '@/firebase';
import { doc, setDoc, collection, query, where } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { UserProfile, BookingConfirmation } from '@/lib/mock-data';
import { useEffect, useMemo, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { CarLoader } from '@/components/ui/CarLoader';
import CountUp from '@/components/common/count-up';

export default function ProfilePage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const userProfileRef = user ? doc(firestore, 'userProfiles', user.uid) : null;
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userProfileRef);

  const bookingsAsRiderQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(collection(firestore, 'bookingConfirmations'), where('riderId', '==', user.uid));
  }, [user, firestore]);

  const bookingsAsDriverQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(collection(firestore, 'bookingConfirmations'), where('driverId', '==', user.uid));
  }, [user, firestore]);

  const { data: ridesAsRider, isLoading: loadingRiderBookings } = useCollection<BookingConfirmation>(bookingsAsRiderQuery);
  const { data: ridesAsDriver, isLoading: loadingDriverBookings } = useCollection<BookingConfirmation>(bookingsAsDriverQuery);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});

  useEffect(() => {
    if (userProfile) {
      setFormData(userProfile);
    }
  }, [userProfile]);

  const stats = useMemo(() => {
    const riderBookings = ridesAsRider || [];
    const driverBookings = ridesAsDriver || [];

    const totalRides = riderBookings.filter(b => !b.deliveryRequestId).length + driverBookings.filter(b => b.riderId !== 'self-completed').length;
    const totalDeliveries = riderBookings.filter(b => !!b.deliveryRequestId).length;
    
    const totalSavings = riderBookings.reduce((acc, booking) => acc + (booking.estimatedCost || 0), 0);
    const totalEarnings = driverBookings.reduce((acc, booking) => acc + (booking.estimatedCost || 0), 0);
    
    return [
      { label: "Total Trips", value: totalRides, icon: Car, color: "text-blue-500", bgColor: "bg-blue-100" },
      { label: "Total Deliveries", value: totalDeliveries, icon: Package, color: "text-purple-500", bgColor: "bg-purple-100" },
      { label: "Total Savings/Earnings", value: totalSavings + totalEarnings, icon: IndianRupee, prefix: '₹', color: "text-green-500", bgColor: "bg-green-100"},
    ];
  }, [ridesAsRider, ridesAsDriver]);


  const handleSave = async () => {
    if (userProfileRef) {
      await setDoc(userProfileRef, formData, { merge: true });
      toast({ title: "Profile updated successfully!" });
      setIsEditing(false);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({...prev, [id]: value}));
  }

  const isLoading = isProfileLoading || loadingRiderBookings || loadingDriverBookings;

  if (isLoading || !userProfile) {
    return (
      <div className="flex h-full items-center justify-center">
        <CarLoader />
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title="Your Profile"
        description="Manage your personal information and see your stats."
        showBackButton
      >
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}><Edit className="mr-2"/> Edit Profile</Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        )}
      </PageHeader>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
            <Card className="text-center">
                <CardHeader>
                     <Avatar className="h-24 w-24 mx-auto border-4 border-primary/50">
                        <AvatarImage src={userProfile.profilePictureUrl || "https://picsum.photos/seed/user-profile/100/100"} alt={userProfile.firstName} data-ai-hint="person face"/>
                        <AvatarFallback>{userProfile.firstName?.charAt(0)}</AvatarFallback>
                    </Avatar>
                </CardHeader>
                <CardContent>
                    <h2 className="text-2xl font-bold font-headline">{userProfile.firstName} {userProfile.lastName}</h2>
                    <p className="text-muted-foreground">{userProfile.email}</p>
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
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" value={formData.firstName || ''} readOnly={!isEditing} onChange={handleInputChange} />
                      </div>
                       <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" value={formData.lastName || ''} readOnly={!isEditing} onChange={handleInputChange} />
                      </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" value={userProfile.email} readOnly />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number (Optional)</Label>
                        <Input id="phoneNumber" value={formData.phoneNumber || ''} readOnly={!isEditing} onChange={handleInputChange} />
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 font-headline tracking-tight">Your Dashboard</h2>
         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => (
                <Card key={stat.label}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                        <div className={`p-2 rounded-full ${stat.bgColor}`}>
                            <stat.icon className={`h-5 w-5 ${stat.color}`} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">
                        <CountUp 
                            end={stat.value} 
                            prefix={stat.prefix} 
                        />
                        </div>
                        <p className="text-xs text-muted-foreground">Across all time</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </>
  );
}
