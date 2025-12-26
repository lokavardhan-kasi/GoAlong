'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Calendar as CalendarIcon, MapPin, Users, Package, ArrowRight, SteeringWheel, Wallet, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Separator } from '@/components/ui/separator';
import { Logo } from '@/components/common/logo';

const FeatureCard = ({ icon: Icon, title, description, delay }: { icon: React.ElementType, title: string, description: string, delay: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay }}
      className="rounded-2xl shadow-lg text-center p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border bg-card"
    >
      <div className="mx-auto bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );

export default function BecomeDriverPage() {
  const [payloadType, setPayloadType] = useState('passengers');

  return (
    <div className="bg-white font-sans relative">
      {/* Gradient Blurs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center md:text-left"
            >
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Turn your empty space into savings.
              </h1>
              <p className="text-lg text-gray-600 mt-4 mb-8">
                Share your ride with passengers or carry parcels on your route. Save on petrol costs and connect with your community.
              </p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Card className="rounded-2xl shadow-2xl p-6 bg-white/90 backdrop-blur-md border">
                <CardContent className="p-0">
                  <form className="space-y-4">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Leaving from..."
                        className="pl-10 h-12 text-base focus:ring-4 focus:ring-purple-100 transition-shadow bg-white"
                      />
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Going to..."
                        className="pl-10 h-12 text-base focus:ring-4 focus:ring-purple-100 transition-shadow bg-white"
                      />
                    </div>
                     <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="date"
                        defaultValue={new Date().toISOString().substring(0, 10)}
                        className="pl-10 h-12 text-base focus:ring-4 focus:ring-purple-100 transition-shadow bg-white"
                      />
                    </div>

                    <Separator />

                    <ToggleGroup type="single" value={payloadType} onValueChange={(value) => value && setPayloadType(value)} className="w-full">
                      <ToggleGroupItem value="passengers" className="w-1/2 gap-2 data-[state=on]:bg-blue-100 data-[state=on]:text-blue-700 data-[state=on]:border-blue-200 border">
                        <Users className="h-5 w-5" /> Passengers
                      </ToggleGroupItem>
                      <ToggleGroupItem value="parcels" className="w-1/2 gap-2 data-[state=on]:bg-emerald-100 data-[state=on]:text-emerald-700 data-[state=on]:border-emerald-200 border">
                        <Package className="h-5 w-5" /> Parcels
                      </ToggleGroupItem>
                    </ToggleGroup>
                    
                    <Button asChild type="submit" className="w-full h-12 text-base rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white transition-all duration-300 hover:shadow-lg hover:brightness-110 active:scale-95">
                      <Link href="/plan-route">Publish a Ride <ArrowRight className="ml-2" /></Link>
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Value Prop Section */}
        <section className="py-24 bg-gray-50/70">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Drive. Share. Save.</h2>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">GoAlong makes it easy to earn on every trip, whether you're commuting to work or heading out of town.</p>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard icon={SteeringWheel} title="Keep Your Plans" description="Hit the road just as you anticipated. We match you with people or packages going your way." delay={0} />
              <FeatureCard icon={Users} title="Two Ways to Earn" description="Fill empty seats with verified neighbors OR fill your trunk with local deliveries." delay={0.2} />
              <FeatureCard icon={Wallet} title="Cut Commuting Costs" description="Offset petrol and maintenance expenses by sharing the ride. Easily divvy up costs." delay={0.4} />
            </div>
          </div>
        </section>
        
        {/* Trust & Social Proof Section */}
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 text-center">
                 <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto"
                >
                    <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-2xl">
                        <CardContent className="flex flex-col md:flex-row items-center gap-6 p-0">
                            <ShieldCheck className="w-16 h-16 shrink-0" />
                            <div className="text-left">
                                <h3 className="text-2xl font-bold">100% Secure & Verified Community</h3>
                                <p className="opacity-90 mt-2">Your safety is our priority. We check IDs and profiles so you can travel with confidence and build trust within your community.</p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>

        {/* How it works */}
        <section className="py-24 bg-gray-50/70">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-12">Getting Started is Easy</h2>
                <div className="grid md:grid-cols-3 gap-8 text-left">
                    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: 0.1 }}>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 font-bold text-xl shrink-0">1</div>
                            <h3 className="text-xl font-bold">Create Your Profile</h3>
                        </div>
                        <p className="text-gray-600 md:ml-16">Sign up in minutes. Add your vehicle details and a quick bio to let others know you.</p>
                    </motion.div>
                     <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: 0.3 }}>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 font-bold text-xl shrink-0">2</div>
                            <h3 className="text-xl font-bold">Publish Your Route</h3>
                        </div>
                        <p className="text-gray-600 md:ml-16">Let us know where you're going and whether you're offering seats for passengers or space for parcels.</p>
                    </motion.div>
                     <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: 0.5 }}>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 font-bold text-xl shrink-0">3</div>
                            <h3 className="text-xl font-bold">Accept Requests & Drive</h3>
                        </div>
                        <p className="text-gray-600 md:ml-16">Get notifications for ride or delivery requests. Accept, coordinate, and enjoy the shared journey!</p>
                    </motion.div>
                </div>
            </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} GoAlong. All rights reserved.</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
                    <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
                </div>
            </div>
        </footer>
      </main>
    </div>
  );
}
