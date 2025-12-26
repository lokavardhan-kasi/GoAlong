
'use client';
import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Car, Leaf, Users, Route, RadioTower, Search, LogIn, UserPlus } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useToast } from '@/hooks/use-toast';
import CountUp from '@/components/common/count-up';
import { UserContext } from '@/context/user-context';
import { useRouter } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const MotionCard = motion(Card);

const FeatureCard = ({ icon: Icon, title, description, delay }: { icon: React.ElementType, title: string, description: string, delay: number }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <MotionCard
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.5, delay }}
      className="rounded-2xl shadow-lg text-center p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-purple-200 border"
    >
      <div className="mx-auto bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-purple-600" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </MotionCard>
  )
};

const StatCard = ({ end, label, delay, suffix, prefix }: { end: number; label: string; delay: number; suffix?: string; prefix?: string; }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.5, delay }}
      className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center text-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      <p className="text-2xl font-bold">
        {inView && <CountUp end={end} duration={2} suffix={suffix} prefix={prefix} />}
      </p>
      <p className="text-sm">{label}</p>
    </motion.div>
  );
};

export default function LandingPage() {
  const { toast } = useToast();
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedIn } = useContext(UserContext);
  const router = useRouter();

  const handlePublishClick = () => {
    alert("Please Login to Publish");
    router.push('/login');
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
  
  useEffect(() => {
    const timer = setTimeout(() => {
      toast({
        title: (
          <div className="flex items-center gap-2">
            <RadioTower className="text-primary"/> New ride available!
          </div>
        ),
        description: 'A driver just posted a route from Downtown to Northwood.',
      });
    }, 5000);
    return () => clearTimeout(timer);
  }, [toast]);

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
            <span className="gradient-text">GoAlong</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Features</Link>
            <Button variant="ghost" asChild>
                <Link href="/become-a-driver">Become a Driver</Link>
            </Button>
            <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Community</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="active:scale-95 transition-transform" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild className="rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white transition-all duration-300 hover:shadow-lg hover:brightness-110 active:scale-95">
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <main className="pt-20">
        {!isLoggedIn ? (
          <section className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center min-h-[calc(100vh-80px)]">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              <motion.span 
                className="gradient-text bg-gradient-to-r from-purple-600 to-blue-500"
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
              <MotionCard
                whileHover={{ scale: 1.05 }}
                className="rounded-2xl shadow-lg p-6 bg-white/50 backdrop-blur-md border cursor-pointer"
                onClick={() => router.push('/find-ride')}
              >
                <CardContent className="flex flex-col items-center justify-center gap-4">
                  <Search className="w-12 h-12 text-purple-600" />
                  <h3 className="text-2xl font-bold">Find a Ride</h3>
                </CardContent>
              </MotionCard>

              <MotionCard
                whileHover={{ scale: 1.05 }}
                className="rounded-2xl shadow-lg p-6 bg-white/50 backdrop-blur-md border cursor-pointer"
                onClick={handlePublishClick}
              >
                <CardContent className="flex flex-col items-center justify-center gap-4">
                  <Route className="w-12 h-12 text-blue-600" />
                  <h3 className="text-2xl font-bold">Publish a Ride</h3>
                </CardContent>
              </MotionCard>

              <Popover>
                <PopoverTrigger asChild>
                  <MotionCard
                    whileHover={{ scale: 1.05 }}
                    className="rounded-2xl shadow-lg p-6 bg-white/50 backdrop-blur-md border cursor-pointer"
                  >
                    <CardContent className="flex flex-col items-center justify-center gap-4">
                      <Users className="w-12 h-12 text-green-600" />
                      <h3 className="text-2xl font-bold">Profile</h3>
                    </CardContent>
                  </MotionCard>
                </PopoverTrigger>
                <PopoverContent className="w-48">
                  <div className="grid gap-4">
                    <Button variant="outline" asChild>
                      <Link href="/login"><LogIn className="mr-2"/> Sign In</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/register"><UserPlus className="mr-2"/> Sign Up</Link>
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
