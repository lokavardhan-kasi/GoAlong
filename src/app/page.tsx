'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Car, Leaf, Users, Route, MapPin, Calendar, Twitter, Facebook, Instagram } from 'lucide-react';

const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center text-white">
    <p className="text-2xl font-bold">{value}</p>
    <p className="text-sm">{label}</p>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <Card className="rounded-2xl shadow-lg text-center p-8">
    <div className="mx-auto bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center mb-4">
      <Icon className="w-8 h-8 text-purple-600" />
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </Card>
);

export default function LandingPage() {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      pickup,
      dropoff,
      date,
    });
  };

  return (
    <div className="bg-white font-sans relative">
      {/* Gradient Blurs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
            <Car className="w-7 h-7 text-purple-600" />
            <span className="gradient-text">GoAlong</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#" className="text-gray-600 hover:text-purple-600">Features</Link>
            <Link href="#" className="text-gray-600 hover:text-purple-600">How it Works</Link>
            <Link href="#" className="text-gray-600 hover:text-purple-600">Community</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild className="rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white">
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-20">
        <section className="container mx-auto px-4 py-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="gradient-text">GoAlong</span>, Your Community, Your Commute.
              </h1>
              <p className="text-lg text-gray-600 mt-4 mb-8">
                Share rides, send parcels, and connect with your neighbors.
              </p>

              <Card className="rounded-2xl shadow-lg p-6">
                <CardContent className="p-0">
                  <form onSubmit={handleSearch} className="space-y-4">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Pickup location"
                        className="pl-10"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                      />
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Drop-off location"
                        className="pl-10"
                        value={dropoff}
                        onChange={(e) => setDropoff(e.target.value)}
                      />
                    </div>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="date"
                        className="pl-10"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                    <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white">
                      Find a Ride
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[500px]">
              <div className="col-span-2 row-span-1 rounded-2xl overflow-hidden shadow-lg">
                <Image src="https://picsum.photos/seed/car-main/800/400" alt="Car" width={800} height={400} className="w-full h-full object-cover" data-ai-hint="driving sunset"/>
              </div>
              <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-lg">
                <Image src="https://picsum.photos/seed/cyclist/400/400" alt="Cyclist" width={400} height={400} className="w-full h-full object-cover" data-ai-hint="city cyclist"/>
              </div>
              <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-lg">
                <Image src="https://picsum.photos/seed/delivery/400/400" alt="Delivery Bike" width={400} height={400} className="w-full h-full object-cover" data-ai-hint="delivery scooter"/>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-12">Why Choose GoAlong</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard icon={Leaf} title="Save Money & Earth" description="Reduce your carbon footprint and travel costs by sharing rides."/>
              <FeatureCard icon={Route} title="Share Your Route" description="Easily list your regular commutes and find passengers along your way."/>
              <FeatureCard icon={Users} title="Help Your Community" description="Connect with neighbors and build a stronger, more efficient local network."/>
            </div>
          </div>
        </section>
        
        {/* Impact Stats Section */}
        <section className="py-24 bg-gradient-to-r from-purple-600 to-blue-500">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <StatCard value="40%" label="Cost Reduction" />
                    <StatCard value="10K+" label="Active Users" />
                    <StatCard value="2.5M kg" label="CO2 Saved" />
                    <StatCard value="85%" label="Match Rate" />
                </div>
            </div>
        </section>

        {/* Contact & Footer */}
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
                        <p className="text-gray-400 mb-4">
                            Contact us for any inquiries or support. We're here to help!
                        </p>
                        <p className="text-gray-300">Email: support@goalong.com</p>
                        <p className="text-gray-300">Phone: +1 (555) 123-4567</p>
                    </div>
                    <form className="space-y-4">
                        <Input type="text" placeholder="Your Name" className="bg-gray-800 border-gray-700 text-white" />
                        <Input type="email" placeholder="Your Email" className="bg-gray-800 border-gray-700 text-white" />
                        <textarea placeholder="Your Message" rows={4} className="w-full bg-gray-800 border-gray-700 text-white rounded-md p-2"></textarea>
                        <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white">
                            Send Message
                        </Button>
                    </form>
                </div>
            </div>
            <div className="border-t border-gray-800">
                <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} GoAlong. All rights reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                       <Link href="#"><Twitter className="w-6 h-6 text-gray-400 hover:text-white" /></Link>
                       <Link href="#"><Facebook className="w-6 h-6 text-gray-400 hover:text-white" /></Link>
                       <Link href="#"><Instagram className="w-6 h-6 text-gray-400 hover:text-white" /></Link>
                    </div>
                </div>
            </div>
        </footer>
      </main>
    </div>
  );
}
