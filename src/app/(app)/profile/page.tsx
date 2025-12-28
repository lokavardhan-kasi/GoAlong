
'use client';
import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Edit, IndianRupee } from 'lucide-react';
import { useDoc, useUser } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { UserProfile } from '@/lib/mock-data';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { CarLoader } from '@/components/ui/CarLoader';

const stats = [
    { label: "Total Rides", value: "24" },
    { label: "Total Deliveries", value: "5" },
    { label: "Total Savings", value: `INR 120.50` },
];

export default function ProfilePage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const userProfileRef = user ? doc(firestore, 'userProfiles', user.uid) : null;
  const { data: userProfile, isLoading } = useDoc<UserProfile>(userProfileRef);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});

  useEffect(() => {
    if (userProfile) {
      setFormData(userProfile);
    }
  }, [userProfile]);

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
          <Button onClick={handleSave}>Save Changes</Button>
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

            <Card className="mt-8">
                <CardHeader>
                    <CardTitle className="font-headline">Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <dl className="space-y-2">
                        {stats.map(stat => (
                            <div key={stat.label} className="flex justify-between">
                                <dt className="text-muted-foreground">{stat.label}</dt>
                                <dd className="font-semibold flex items-center gap-1">
                                  {stat.label === 'Total Savings' ? stat.value.split(' ')[0] : ''} {stat.label === 'Total Savings' ? <IndianRupee className="h-4 w-4" /> : ''}
                                  {stat.label !== 'Total Savings' ? stat.value : stat.value.split(' ')[1]}
                                </dd>
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
    </>
  );
}
