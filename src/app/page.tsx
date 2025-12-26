
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
import { Logo } from '@/components/common/logo';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedIn } = useContext(UserContext);
  const router = useRouter();

  const handlePublishClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      // Since this is a demo, we can just alert. In a real app, a modal would be better.
      alert("Please sign in to publish a ride.");
      router.push('/login');
    } else {
      router.push('/plan-route');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
        ease: "easeOut",
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
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#" className="text-gray-600 hover:text-primary transition-colors">Features</Link>
            <Button asChild variant="link" className="text-gray-600 hover:text-primary transition-colors px-0">
              <Link href="/become-a-driver">Become a Driver</Link>
            </Button>
            <Link href="#" className="text-gray-600 hover:text-primary transition-colors">Community</Link>
          </nav>
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" className="active:scale-95 transition-transform" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button onClick={(e) => { e.preventDefault(); router.push('/register');}} className="rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white transition-all duration-300 hover:shadow-lg hover:brightness-110 active:scale-95">
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <main>
        <section className="relative w-full overflow-hidden bg-white pt-20">
          <div className="container mx-auto px-6 py-24 min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12">
            
            {/* Left Side: Text & Search */}
            <div className="w-full lg:w-1/2 space-y-8 z-10 text-center lg:text-left">
              <motion.h1 
                className="text-5xl md:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">GoAlong</span>, <br/>Your Community, Your Commute.
              </motion.h1>
              <motion.p 
                className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Share rides, send parcels, and connect with your neighbors.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
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
              </motion.div>
            </div>

            {/* Right Side: Image Grid */}
            <div className="w-full lg:w-1/2 relative hidden lg:block">
                <div className="grid grid-cols-2 gap-4">
                    <motion.div 
                        className="relative group rounded-2xl col-span-2 row-span-1"
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                        custom={0}
                    >
                        <div className="absolute -inset-4 bg-gradient-to-tr from-pink-500 to-purple-600 blur-3xl rounded-3xl opacity-30 scale-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-in-out -z-10"></div>
                        <Image src="https://images.unsplash.com/photo-1568605117036-5fe5e7185743?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width={800} height={400} alt="Carpooling happy people" className="rounded-2xl relative z-10 shadow-md w-full h-full object-cover" data-ai-hint="people car"/>
                    </motion.div>
                    <motion.div 
                        className="relative group rounded-2xl"
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                        custom={1}
                    >
                        <div className="absolute -inset-4 bg-gradient-to-tr from-teal-400 to-emerald-500 blur-3xl rounded-3xl opacity-30 scale-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-in-out -z-10"></div>
                        <Image src="https://images.unsplash.com/photo-1558632463-7d4e1a1c96a3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width={400} height={400} alt="A person with their happy dog" className="rounded-2xl relative z-10 shadow-md w-full h-full object-cover" data-ai-hint="pet travel" />
                    </motion.div>
                    <motion.div 
                        className="relative group rounded-2xl"
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                        custom={2}
                    >
                        <div className="absolute -inset-4 bg-gradient-to-tr from-blue-400 to-indigo-500 blur-3xl rounded-3xl opacity-30 scale-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-in-out -z-10"></div>
                        <Image src="https://images.unsplash.com/photo-1590846406792-0404b484c433?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width={400} height={400} alt="Delivery person handing a package" className="rounded-2xl relative z-10 shadow-md w-full h-full object-cover" data-ai-hint="delivery package" />
                    </motion.div>
                </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-gray-50/70">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Why Choose <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">GoAlong</span>?</h2>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">GoAlong makes it easy to earn on every trip, whether you're commuting to work or heading out of town.</p>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: 0.1 }} className="rounded-2xl shadow-lg text-center p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border bg-card">
                  <div className="mx-auto bg-green-100 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                    <Leaf className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Save Money &amp; Earth</h3>
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
                            <li><Link href="/find-ride" className="text-gray-400 hover:text-white">Find a Ride</Link></li>
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
                            <Input type="email" placeholder="Your email" className="bg-gray-800 border-gray-700 text-white h-10"/>
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
