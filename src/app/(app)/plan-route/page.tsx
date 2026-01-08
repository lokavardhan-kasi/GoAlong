
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, ArrowLeft, Calendar, Clock, Users, Package, Minus, Plus, Wallet, Save, Repeat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { PageHeader } from '@/components/common/page-header';
import { useFirestore, useUser } from '@/firebase';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { isValid, parse, isBefore, startOfDay } from 'date-fns';

const steps = [
  { id: 'Step 1', name: 'Route', fields: ['startPoint', 'endPoint'] },
  { id: 'Step 2', name: 'Schedule', fields: ['date', 'time'] },
  { id: 'Step 3', name: 'Capacity', fields: ['passengers', 'parcels'] },
  { id: 'Step 4', name: 'Price', fields: ['price'] },
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};


export default function PlanRoutePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const { user } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  
  const [scheduleType, setScheduleType] = useState<'recurring' | 'one-time'>('recurring');
  const [timeHours, setTimeHours] = useState('09');
  const [timeMinutes, setTimeMinutes] = useState('00');
  const [timePeriod, setTimePeriod] = useState<'am' | 'pm'>('am');
  const [date, setDate] = useState('');


  const [formData, setFormData] = useState({
      startPoint: '',
      endPoint: '',
      routeDays: [] as string[],
      availableSeats: 1,
      allowParcels: false,
      parcelSizes: [] as string[],
      price: [25]
  });
  const { toast } = useToast();

  const handleNext = () => {
    setDirection(1);
    setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
  }

  const handlePublish = async () => {
      if (!user) {
        toast({ title: "You must be logged in to publish a ride.", variant: "destructive" });
        return;
      }
      try {
        let hours = parseInt(timeHours, 10);
        const minutes = parseInt(timeMinutes, 10);

        if (timePeriod === 'pm' && hours < 12) {
          hours += 12;
        }
        if (timePeriod === 'am' && hours === 12) { // Midnight case
          hours = 0;
        }

        let departureDateTime;
        if(scheduleType === 'one-time') {
            if (!date) {
                toast({ title: "Please enter a valid date.", variant: "destructive" });
                return;
            }
            
            const parsedDate = parse(date, 'yyyy-MM-dd', new Date());

            if (!isValid(parsedDate)) {
                 toast({ title: "Invalid Date", description: "Please enter a valid date in YYYY-MM-DD format.", variant: "destructive" });
                 return;
            }
            
            if (isBefore(parsedDate, startOfDay(new Date()))) {
              toast({ title: "Invalid Date", description: "You cannot publish a ride for a past date.", variant: "destructive" });
              return;
            }

            departureDateTime = new Date(parsedDate);
            departureDateTime.setHours(hours, minutes, 0, 0);

        } else {
            departureDateTime = new Date(); // Default for recurring, can be improved
            departureDateTime.setHours(hours, minutes, 0, 0);
        }

        // Estimate arrival time (e.g., 8 hours duration for this example)
        const arrivalDateTime = new Date(departureDateTime.getTime() + 8 * 60 * 60 * 1000);
        
        const formattedTime = `${timeHours}:${timeMinutes} ${timePeriod.toUpperCase()}`;

        const routeData: any = {
          driverId: user.uid,
          startPoint: formData.startPoint,
          endPoint: formData.endPoint,
          travelTime: formattedTime,
          availableSeats: formData.availableSeats,
          price: formData.price[0],
          scheduleType: scheduleType,
          departureTimestamp: Timestamp.fromDate(departureDateTime),
          arrivalTimestamp: Timestamp.fromDate(arrivalDateTime),
        };

        if (scheduleType === 'recurring') {
          routeData.routeDays = formData.routeDays;
        } else {
           // For one-time rides, the specific date is already part of the timestamp.
          routeData.date = departureDateTime.toISOString().split('T')[0];
        }

        const routeCollection = collection(firestore, `users/${user.uid}/routes`);
        await addDoc(routeCollection, routeData);

        toast({
            title: "Ride Published!",
            description: "Your route is now live for others to see.",
        });
        router.push('/dashboard');
      } catch (error: any) {
         toast({
            title: "Error Publishing Ride",
            description: error.message,
            variant: "destructive",
        });
      }
  }

  const progressValue = ((currentStep + 1) / steps.length) * 100;

  return (
    <>
      <PageHeader
        title="Publish a Ride"
        description="Share your upcoming trip with the community."
        showBackButton
      />
      <div className="max-w-2xl mx-auto">
        <Card className="overflow-hidden">
           <CardHeader>
               <Progress value={progressValue} className="mb-4" />
               <CardTitle className="font-headline text-2xl">
                   {steps[currentStep].name}
                </CardTitle>
                <CardDescription>
                    Step {currentStep + 1} of {steps.length}
                </CardDescription>
           </CardHeader>
           <CardContent className="min-h-[350px] flex flex-col justify-center">
             <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={currentStep}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: 'spring', stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                    }}
                    className="w-full"
                >
                    {currentStep === 0 && (
                        <div className="space-y-6">
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input name="startPoint" value={formData.startPoint} onChange={handleChange} placeholder="Where are you leaving from?" className="pl-10 h-12 text-base" />
                                <Button variant="ghost" className="absolute right-2 top-1/2 -translate-y-1/2 h-auto py-1 px-2 text-sm active:scale-95">Use current location</Button>
                            </div>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input name="endPoint" value={formData.endPoint} onChange={handleChange} placeholder="Where are you going?" className="pl-10 h-12 text-base"/>
                            </div>
                        </div>
                    )}
                    {currentStep === 1 && (
                         <div className="flex flex-col items-center gap-6">
                            <ToggleGroup type="single" value={scheduleType} onValueChange={(v) => v && setScheduleType(v as any)} variant="outline">
                              <ToggleGroupItem value="recurring" aria-label="Set recurring schedule"><Repeat className="mr-2"/> Recurring</ToggleGroupItem>
                              <ToggleGroupItem value="one-time" aria-label="Set one-time schedule"><Calendar className="mr-2"/> One-Time</ToggleGroupItem>
                            </ToggleGroup>
                            
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={scheduleType}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="w-full space-y-6"
                              >
                                {scheduleType === 'recurring' ? (
                                    <div className="flex flex-col items-center w-full">
                                        <h3 className="font-semibold mb-2 flex items-center gap-2"><Calendar className="h-5 w-5 text-primary" /> Days of the week</h3>
                                        <ToggleGroup type="multiple" variant="outline" className="justify-center flex-wrap" value={formData.routeDays} onValueChange={(value) => setFormData(p => ({...p, routeDays: value}))}>
                                            <ToggleGroupItem value="mon">Mon</ToggleGroupItem>
                                            <ToggleGroupItem value="tue">Tue</ToggleGroupItem>
                                            <ToggleGroupItem value="wed">Wed</ToggleGroupItem>
                                            <ToggleGroupItem value="thu">Thu</ToggleGroupItem>
                                            <ToggleGroupItem value="fri">Fri</ToggleGroupItem>
                                            <ToggleGroupItem value="sat">Sat</ToggleGroupItem>
                                            <ToggleGroupItem value="sun">Sun</ToggleGroupItem>
                                        </ToggleGroup>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center">
                                      <h3 className="font-semibold mb-2 flex items-center gap-2"><Calendar className="h-5 w-5 text-primary" /> Enter a Date</h3>
                                      <div className="flex items-center gap-2">
                                        <Input
                                            type="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            className="h-12 text-base w-48 text-center"
                                            placeholder="YYYY-MM-DD"
                                            aria-label="Date"
                                        />
                                      </div>
                                    </div>
                                )}
                              </motion.div>
                            </AnimatePresence>

                            <div className="flex flex-col items-center w-full pt-4">
                                 <h3 className="font-semibold mb-2 flex items-center gap-2"><Clock className="h-5 w-5 text-primary"/> Departure Time</h3>
                                 <div className="flex items-center gap-2">
                                    <Input
                                      type="number"
                                      min="1"
                                      max="12"
                                      value={timeHours}
                                      onChange={(e) => setTimeHours(e.target.value)}
                                      className="h-12 text-base w-20 text-center"
                                      aria-label="Hour"
                                    />
                                    <span className="font-bold text-lg">:</span>
                                    <Input
                                      type="number"
                                      min="0"
                                      max="59"
                                      value={timeMinutes}
                                      onChange={(e) => setTimeMinutes(e.target.value.padStart(2, '0'))}
                                      className="h-12 text-base w-20 text-center"
                                      aria-label="Minute"
                                    />
                                    <ToggleGroup
                                      type="single"
                                      variant="outline"
                                      value={timePeriod}
                                      onValueChange={(value) => value && setTimePeriod(value as 'am' | 'pm')}
                                    >
                                      <ToggleGroupItem value="am" aria-label="AM">AM</ToggleGroupItem>
                                      <ToggleGroupItem value="pm" aria-label="PM">PM</ToggleGroupItem>
                                    </ToggleGroup>
                                </div>
                            </div>
                        </div>
                    )}
                     {currentStep === 2 && (
                        <div className="space-y-8 text-center">
                            <div>
                                <h3 className="font-semibold mb-4 text-lg flex items-center justify-center gap-2"><Users className="h-5 w-5 text-primary"/>How many seats?</h3>
                                <div className="flex items-center justify-center gap-4">
                                    <Button variant="outline" size="icon" onClick={() => setFormData(p => ({...p, availableSeats: Math.max(1, p.availableSeats - 1)}))} className="active:scale-95"><Minus/></Button>
                                    <span className="text-2xl font-bold w-12">{formData.availableSeats}</span>
                                    <Button variant="outline" size="icon" onClick={() => setFormData(p => ({...p, availableSeats: Math.min(8, p.availableSeats + 1)}))} className="active:scale-95"><Plus/></Button>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-center space-x-2">
                                     <Package className="h-5 w-5 text-primary"/>
                                     <label htmlFor="airplane-mode" className="font-semibold text-lg">Accept parcels?</label>
                                     <Switch id="airplane-mode" checked={formData.allowParcels} onCheckedChange={(checked) => setFormData(p => ({...p, allowParcels: checked}))} />
                                </div>
                                {formData.allowParcels && (
                                     <motion.div initial={{opacity: 0, height: 0}} animate={{opacity: 1, height: 'auto'}} className="overflow-hidden">
                                        <p className="text-sm text-muted-foreground mb-2">Select available trunk space</p>
                                        <ToggleGroup type="multiple" variant="outline" className="justify-center" value={formData.parcelSizes} onValueChange={(value) => setFormData(p => ({...p, parcelSizes: value}))}>
                                            <ToggleGroupItem value="small">Small Box</ToggleGroupItem>
                                            <ToggleGroupItem value="medium">Medium Box</ToggleGroupItem>
                                            <ToggleGroupItem value="large">Large Item</ToggleGroupItem>
                                        </ToggleGroup>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    )}
                    {currentStep === 3 && (
                        <div className="space-y-6 text-center">
                             <h3 className="font-semibold text-lg flex items-center justify-center gap-2"><Wallet className="h-5 w-5 text-primary"/>Set your price per seat</h3>
                             <div className="relative">
                                <p className="text-4xl font-bold text-primary">₹{formData.price[0]}</p>
                                <p className="text-sm text-muted-foreground">Our recommendation is ₹22</p>
                             </div>
                             <Slider
                                defaultValue={[25]}
                                max={50}
                                step={1}
                                value={formData.price}
                                onValueChange={(value) => setFormData(p => ({...p, price: value}))}
                                className="w-[80%] mx-auto"
                             />
                        </div>
                    )}
                </motion.div>
             </AnimatePresence>
           </CardContent>
        </Card>
        
        <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={handlePrev} disabled={currentStep === 0} className="active:scale-95">
                <ArrowLeft className="mr-2"/> Previous
            </Button>
            {currentStep < steps.length - 1 ? (
                <Button onClick={handleNext} className="active:scale-95">
                   Next <ArrowRight className="ml-2"/>
                </Button>
            ) : (
                <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white active:scale-95" onClick={handlePublish}>
                   <Save className="mr-2"/> Publish Ride
                </Button>
            )}
        </div>
      </div>
    </>
  );
}
