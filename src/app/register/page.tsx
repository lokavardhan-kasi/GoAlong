
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/common/logo';
import { useAuth, useFirestore, useUser } from '@/firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';

export default function RegisterPage() {
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    if (!auth || !firestore) return;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await updateProfile(user, { displayName: fullName });
      
      const userProfile = {
        id: user.uid,
        firstName: fullName.split(' ')[0] || '',
        lastName: fullName.split(' ').slice(1).join(' ') || '',
        email: user.email,
        phoneNumber: '',
        isDriver: false,
      };

      await setDoc(doc(firestore, 'userProfiles', user.uid), userProfile);

      router.push('/dashboard');

    } catch (error: any) {
       toast({
        title: 'Registration Failed',
        description: error.message,
        variant: 'destructive',
      });
    }
  };
  
  const handleGoogleLogin = async () => {
    if (!auth || !firestore) return;
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const userProfile = {
        id: user.uid,
        firstName: user.displayName?.split(' ')[0] || '',
        lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
        email: user.email,
        phoneNumber: user.phoneNumber || '',
        profilePictureUrl: user.photoURL || '',
        isDriver: false,
      };
      
      await setDoc(doc(firestore, 'userProfiles', user.uid), userProfile, { merge: true });

      router.push('/dashboard');
    } catch (error: any) {
      toast({
        title: 'Login Failed',
        description: error.message,
        variant: 'destructive',
      });
    }
  }

  if (isUserLoading || user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        Loading...
      </div>
    );
  }


  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100/50 p-4">
       <div className="mb-8">
        <Logo />
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-2xl">Sign Up</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="full-name">Full name</Label>
                <Input id="full-name" placeholder="John Doe" required value={fullName} onChange={e => setFullName(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <Button type="submit" className="w-full active:scale-95">
                  Create an account
              </Button>
              <Button variant="outline" className="w-full active:scale-95" type="button" onClick={handleGoogleLogin}>
                Sign up with Google
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

    