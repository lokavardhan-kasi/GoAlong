'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, ArrowLeft, Calendar, Clock, Users, Package, Minus, Plus, Wallet, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { PageHeader } from '@/components/common/page-header';

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
  const [formData, setFormData] = useState({
      startPoint: '',
      endPoint: '',
      date: new Date(),
      time: '09:00',
      passengers: 1,
      allowParcels: false,
      parcelSizes: [],
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

  const handlePublish = () => {
      console.log('Publishing ride with data:', formData);
      toast({
          title: "Ride Published!",
          description: "Your route is now live for others to see.",
      });
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
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col items-center">
                                <h3 className="font-semibold mb-2 flex items-center gap-2"><Calendar className="h-5 w-5 text-primary" /> Departure Date</h3>
                                <CalendarComponent
                                    mode="single"
                                    selected={formData.date}
                                    onSelect={(date) => setFormData(prev => ({ ...prev, date: date || new Date() }))}
                                    className="rounded-md border"
                                />
                            </div>
                            <div className="flex flex-col items-center">
                                 <h3 className="font-semibold mb-2 flex items-center gap-2"><Clock className="h-5 w-5 text-primary"/> Departure Time</h3>
                                 <Input name="time" type="time" value={formData.time} onChange={handleChange} className="h-12 text-base w-full max-w-xs" />
                            </div>
                        </div>
                    )}
                     {currentStep === 2 && (
                        <div className="space-y-8 text-center">
                            <div>
                                <h3 className="font-semibold mb-4 text-lg flex items-center justify-center gap-2"><Users className="h-5 w-5 text-primary"/>How many seats?</h3>
                                <div className="flex items-center justify-center gap-4">
                                    <Button variant="outline" size="icon" onClick={() => setFormData(p => ({...p, passengers: Math.max(1, p.passengers - 1)}))} className="active:scale-95"><Minus/></Button>
                                    <span className="text-2xl font-bold w-12">{formData.passengers}</span>
                                    <Button variant="outline" size="icon" onClick={() => setFormData(p => ({...p, passengers: Math.min(8, p.passengers + 1)}))} className="active:scale-95"><Plus/></Button>
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
