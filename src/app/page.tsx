import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Car, Package, Users } from 'lucide-react';
import { Logo } from '@/components/common/logo';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Logo />
        <nav className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Register</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        <section className="container mx-auto flex flex-col items-center justify-center gap-8 px-4 py-16 text-center md:px-6 md:py-24">
          <div className="space-y-4">
            <h1 className="font-headline text-4xl font-bold tracking-tight md:text-6xl">
              Your Community, Your Commute.
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              GoAlong connects neighbors for shared rides and local deliveries. Save money, reduce traffic, and build a stronger community, one trip at a time.
            </p>
          </div>
          <div className="flex animate-fade-in-up gap-4">
            <Button size="lg" asChild>
              <Link href="/register">Get Started <ArrowRight className="ml-2" /></Link>
            </Button>
          </div>
        </section>

        <section className="bg-muted/50 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="font-headline text-3xl font-bold">How It Works</h2>
              <p className="mt-2 text-muted-foreground">
                Simple, efficient, and community-focused.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader className="items-center text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-4 text-primary">
                    <Car className="h-8 w-8" />
                  </div>
                  <CardTitle className="font-headline">Share Your Ride</CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <CardDescription>
                    Drivers can post their regular commute routes and offer available seats to neighbors.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader className="items-center text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-4 text-primary">
                    <Users className="h-8 w-8" />
                  </div>
                  <CardTitle className="font-headline">Find a Match</CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <CardDescription>
                    Riders can easily find drivers heading in the same direction, making their travel cheaper and more social.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader className="items-center text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-4 text-primary">
                    <Package className="h-8 w-8" />
                  </div>
                  <CardTitle className="font-headline">Send Parcels</CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <CardDescription>
                    Need to send something across town? Find a neighbor already heading that way for quick, low-cost delivery.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background">
        <div className="container mx-auto flex items-center justify-between px-4 py-6 md:px-6">
          <Logo />
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} GoAlong. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
