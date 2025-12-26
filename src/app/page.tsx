
'use client';
import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Car, Leaf, Users, Route, Search, Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { UserContext } from '@/context/user-context';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedIn } = useContext(UserContext);
  const router = useRouter();

  const handlePublishClick = () => {
    if (!isLoggedIn) {
      alert("Please Login to Publish");
      router.push('/login');
    } else {
      router.push('/plan-route');
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/dashboard');
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: (i:number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="bg-white font-sans relative">
      {/* Gradient Blurs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>

      {/* Navigation */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-lg bg-white/80 shadow-md' : 'bg-transparent'}`}
      >
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
            <Car className="w-7 h-7 text-purple-600" />
            <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">GoAlong</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Features</Link>
            <Button variant="ghost" asChild>
                <Link href="/become-a-driver">Become a Driver</Link>
            </Button>
            <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Community</Link>
          </nav>
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <Button asChild>
                <Link href="/dashboard">Profile</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" className="active:scale-95 transition-transform" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button onClick={handlePublishClick} className="rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white transition-all duration-300 hover:shadow-lg hover:brightness-110 active:scale-95">
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <main className="pt-20">
        <section className="container mx-auto px-4 py-24 min-h-[calc(100vh-80px)] grid md:grid-cols-2 gap-16 items-center">
            {/* Left Side */}
            <div className="text-center md:text-left">
                 <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                    <motion.span 
                        className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
                        style={{ backgroundSize: '200% 200%' }}
                        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    >
                        GoAlong
                    </motion.span>, Your Community, Your Commute.
                </h1>
                <p className="text-lg text-gray-600 mt-4 mb-8 max-w-2xl">
                    Share rides, send parcels, and connect with your neighbors.
                </p>
                <Card className="rounded-2xl shadow-xl p-6 bg-white/90 backdrop-blur-md border">
                    <CardContent className="p-0">
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            </div>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                    type="date"
                                    defaultValue={new Date().toISOString().substring(0, 10)}
                                    className="pl-10 h-12 text-base focus:ring-4 focus:ring-purple-100 transition-shadow bg-white"
                                />
                            </div>
                            <Button asChild type="submit" className="w-full h-12 text-base rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white transition-all duration-300 hover:shadow-lg hover:brightness-110 active:scale-95">
                                <Link href="/find-ride"><Search className="mr-2"/> Find a Ride</Link>
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
            {/* Right Side Image Grid */}
            <div className="grid grid-cols-2 gap-4">
                <motion.div 
                    className="relative group rounded-2xl col-span-2 row-span-1"
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    custom={0}
                >
                     <div className="absolute -inset-4 bg-gradient-to-tr from-pink-500 to-purple-600 blur-3xl rounded-3xl opacity-30 scale-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-in-out -z-10"></div>
                    <Image src="https://picsum.photos/seed/hero-car/800/400" width={800} height={400} alt="Red car" className="rounded-2xl relative z-10 shadow-md w-full h-full object-cover" data-ai-hint="red car"/>
                </motion.div>
                <motion.div 
                    className="relative group rounded-2xl"
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    custom={1}
                >
                     <div className="absolute -inset-4 bg-gradient-to-tr from-teal-400 to-emerald-500 blur-3xl rounded-3xl opacity-30 scale-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-in-out -z-10"></div>
                    <Image src="https://picsum.photos/seed/hero-bike/400/400" width={400} height={400} alt="Teal bike" className="rounded-2xl relative z-10 shadow-md w-full h-full object-cover" data-ai-hint="teal bike" />
                </motion.div>
                <motion.div 
                    className="relative group rounded-2xl"
                     variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    custom={2}
                >
                     <div className="absolute -inset-4 bg-gradient-to-tr from-blue-400 to-indigo-500 blur-3xl rounded-3xl opacity-30 scale-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-in-out -z-10"></div>
                    <Image src="https://picsum.photos/seed/hero-delivery/400/400" width={400} height={400} alt="Delivery" className="rounded-2xl relative z-10 shadow-md w-full h-full object-cover" data-ai-hint="delivery package" />
                </motion.div>
            </div>
        </section>

        <section className="py-24 bg-gray-50/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Why Choose <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">GoAlong</span>?</h2>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">GoAlong makes it easy to earn on every trip, whether you're commuting to work or heading out of town.</p>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: 0.1 }} className="rounded-2xl shadow-lg text-center p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border bg-card">
                  <div className="mx-auto bg-green-100 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                    <Leaf className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Save Money & Earth</h3>
                  <p className="text-gray-600">Reduce your carbon footprint and save on fuel costs by sharing your ride.</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: 0.2 }} className="rounded-2xl shadow-lg text-center p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border bg-card">
                  <div className="mx-auto bg-purple-100 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                    <Route className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Share Your Route</h3>
                  <p className="text-gray-600">Offer seats to passengers or carry parcels. Your journey, your choice.</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: 0.3 }} className="rounded-2xl shadow-lg text-center p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border bg-card">
                  <div className="mx-auto bg-blue-100 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Help Your Community</h3>
                  <p className="text-gray-600">Connect with neighbors and make commuting more affordable and social.</p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-12">Making Real Impact</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <p className="text-5xl font-bold text-green-500">40%</p>
                        <p className="text-gray-600 mt-2">Cost Reduction</p>
                    </div>
                    <div className="text-center">
                        <p className="text-5xl font-bold text-purple-500">10K+</p>
                        <p className="text-gray-600 mt-2">Active Users</p>
                    </div>
                     <div className="text-center">
                        <p className="text-5xl font-bold text-blue-500">2.5M kg</p>
                        <p className="text-gray-600 mt-2">CO2 Saved</p>
                    </div>
                     <div className="text-center">
                        <p className="text-5xl font-bold text-orange-500">85%</p>
                        <p className="text-gray-600 mt-2">Match Rate</p>
                    </div>
                </div>
            </div>
        </section>
        
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">GoAlong</h3>
                        <p className="text-gray-400 text-sm">Your community, your commute. Share rides, send parcels, and save money.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="text-gray-400 hover:text-white">Find a Ride</Link></li>
                            <li><Link href="/become-a-driver" className="text-gray-400 hover:text-white">Become a Driver</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white">How It Works</Link></li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-lg font-semibold mb-4">Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="text-gray-400 hover:text-white">Help Center</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white">Contact Us</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <p className="text-gray-400 text-sm">Email: support@goalong.com</p>
                        <form className="mt-4 space-y-2" onSubmit={(e) => { e.preventDefault(); console.log('Form submitted'); }}>
                            <Input type="email" placeholder="Your email" className="bg-gray-800 border-gray-700 text-white"/>
                            <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-500">Subscribe</Button>
                        </form>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
                    <p className="text-gray-500">&copy; {new Date().getFullYear()} GoAlong. All rights reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                         <Link href="#" className="text-gray-500 hover:text-white">X</Link>
                         <Link href="#" className="text-gray-500 hover:text-white">Facebook</Link>
                         <Link href="#" className="text-gray-500 hover:text-white">Instagram</Link>
                    </div>
                </div>
            </div>
        </footer>
      </main>
    </div>
  );
}

    