'use client';

import { useTransition } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Clock, Send, Sparkles, Loader2 } from 'lucide-react';
import { getAccurateAddressAction } from './actions';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  pickupLocation: z.string().min(3, 'Pickup location is required'),
  dropoffLocation: z.string().min(3, 'Drop-off location is required'),
  pickupTime: z.string().min(1, 'Pickup time is required'),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function RequestRidePage() {
  const { toast } = useToast();
  const [isAiLoading, startAiTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickupLocation: '',
      dropoffLocation: '',
      pickupTime: '',
      notes: '',
    },
  });

  const handleAiAssist = (field: 'pickupLocation' | 'dropoffLocation') => {
    const value = form.getValues(field);
    if (!value) return;
    startAiTransition(async () => {
      const result = await getAccurateAddressAction({ locationDescription: value });
      if (result.success && result.data) {
        form.setValue(field, result.data.accurateAddress, { shouldValidate: true });
        toast({
          title: 'AI Assistant',
          description: `We've updated the ${field === 'pickupLocation' ? 'pickup' : 'drop-off'} location for you.`,
        });
      } else {
        toast({
          title: 'AI Assistant Error',
          description: result.message,
          variant: 'destructive',
        });
      }
    });
  };
  
  function onSubmit(values: FormValues) {
    console.log(values);
    toast({
      title: 'Request Sent!',
      description: "We're matching you with available drivers now.",
    });
    form.reset();
  }

  return (
    <>
      <PageHeader
        title="Request a Ride"
        description="Tell us where you need to go and we'll find you a match."
      />
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline">Request Details</CardTitle>
          <CardDescription>Drivers will be notified based on your request.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="pickupLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><MapPin className="mr-2 h-4 w-4"/>Pickup Location</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input placeholder="e.g., Near the big fountain at Central Park" {...field} />
                        <Button type="button" size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 active:scale-95" onClick={() => handleAiAssist('pickupLocation')} disabled={isAiLoading || !field.value}>
                          {isAiLoading ? <Loader2 className="h-4 w-4 animate-spin"/> : <Sparkles className="h-4 w-4 text-primary"/>}
                          <span className="sr-only">Get Accurate Address with AI</span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dropoffLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><MapPin className="mr-2 h-4 w-4"/>Drop-off Location</FormLabel>
                    <FormControl>
                       <div className="relative">
                        <Input placeholder="e.g., The coffee shop next to the library" {...field} />
                        <Button type="button" size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 active:scale-95" onClick={() => handleAiAssist('dropoffLocation')} disabled={isAiLoading || !field.value}>
                          {isAiLoading ? <Loader2 className="h-4 w-4 animate-spin"/> : <Sparkles className="h-4 w-4 text-primary"/>}
                          <span className="sr-only">Get Accurate Address with AI</span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pickupTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><Clock className="mr-2 h-4 w-4"/>Desired Pickup Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Notes for Driver (Optional)</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="e.g., I have a small package to send, or I am traveling with a pet."
                                className="resize-none"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
              <div className="flex justify-end pt-2">
                <Button type="submit" className="active:scale-95">
                  <Send className="mr-2"/>
                  Send Request
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
