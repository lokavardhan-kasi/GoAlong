
'use client';
import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Car, Leaf, Users, Route } from 'lucide-react';
import { motion } from 'framer-motion';
import { UserContext } from '@/context/user-context';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/common/logo';
import { useToast } from '@/hooks/use-toast';
import { HomeSearchCard } from '@/components/app/home-search-card';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedIn } = useContext(UserContext);
  const router = useRouter();
  const { toast } = useToast();

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

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: 'Successfully Subscribed!',
      description: 'You will be notified with future updates.',
    });
    const form = e.target as HTMLFormElement;
    (form.querySelector('input[type="email"]') as HTMLInputElement).value = '';
  }

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
        <section className="relative w-full overflow-hidden bg-white">
        <div className="container mx-auto px-6 py-16 flex flex-col lg:flex-row items-center justify-center gap-12 pt-32">
            
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
                className="max-w-lg mx-auto lg:mx-0"
              >
                <HomeSearchCard />
              </motion.div>
            </div>

            {/* Right Side: Image Grid (Compact) */}
            <div className="w-full lg:w-[45%] max-w-lg relative hidden lg:block">
              <div className="grid grid-cols-2 gap-3">
                <img
                  src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=80"
                  alt="Car"
                  className="w-full h-32 lg:h-40 object-cover rounded-2xl shadow-md transform hover:scale-105 transition duration-500"
                  data-ai-hint="people car"
                />
                <img
                  src="https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=600&q=80"
                  alt="Cyclists"
                  className="w-full h-32 lg:h-40 object-cover rounded-2xl shadow-md transform hover:scale-105 transition duration-500"
                  data-ai-hint="pet travel"
                />
                <img
                  src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=600&q=80"
                  alt="Bike"
                  className="w-full h-32 lg:h-40 object-cover rounded-2xl shadow-md transform hover:scale-105 transition duration-500"
                  data-ai-hint="delivery package"
                />
                <img
                  src="https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=600&q=80"
                  alt="Delivery"
                  className="w-full h-32 lg:h-40 object-cover rounded-2xl shadow-md transform hover:scale-105 transition duration-500"
                  data-ai-hint="road trip"
                />
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
                <h2 className="text-4xl font-bold mb-12">How It Works</h2>
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
                            <h3 className="text-xl font-bold">Publish or Find a Ride</h3>
                        </div>
                        <p className="text-gray-600 md:ml-16">Let us know where you're going, or search for rides along your desired route.</p>
                    </motion.div>
                     <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: 0.5 }}>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 font-bold text-xl shrink-0">3</div>
                            <h3 className="text-xl font-bold">Connect and Go</h3>
                        </div>
                        <p className="text-gray-600 md:ml-16">Accept requests or book your ride. Coordinate with your match and enjoy the shared journey!</p>
                    </motion.div>
                </div>
            </div>
        </section>

        <section className="py-24 bg-gray-50/70">
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
                            <li><Link href="/search" className="text-gray-400 hover:text-white">Find a Ride</Link></li>
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
                        <p className="text-gray-400 text-sm">Email: kasilokavardhan20@gmail.com</p>
                        <form className="mt-4 space-y-2" onSubmit={handleSubscribe}>
                            <input type="email" placeholder="Your email" className="bg-gray-800 border-gray-700 text-white h-10 w-full rounded-md px-3 text-sm"/>
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
