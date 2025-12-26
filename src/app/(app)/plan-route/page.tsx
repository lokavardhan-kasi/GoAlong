'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Clock, Users, Save } from 'lucide-react';

const formSchema = z.object({
  startPoint: z.string().min(3, 'Start point is required'),
  endPoint: z.string().min(3, 'End point is required'),
  travelTime: z.string().min(1, 'Travel time is required'),
  availableSeats: z.coerce.number().min(1, 'At least 1 seat must be available').max(8),
});

type FormValues = z.infer<typeof formSchema>;

export default function PlanRoutePage() {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startPoint: '',
      endPoint: '',
      travelTime: '',
      availableSeats: 1,
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
    toast({
      title: 'Route Saved!',
      description: 'Your commute has been successfully added.',
    });
    form.reset();
  }

  return (
    <>
      <PageHeader
        title="Plan Your Commute"
        description="Let others know your route to share rides."
      />
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">New Route Details</CardTitle>
          <CardDescription>Fill in the details of your regular commute.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="startPoint"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center"><MapPin className="mr-2 h-4 w-4"/>Start Point</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 123 Main St, Anytown" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endPoint"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center"><MapPin className="mr-2 h-4 w-4"/>End Point</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 456 Oak Ave, Sometown" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="travelTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center"><Clock className="mr-2 h-4 w-4"/>Time of Travel</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="availableSeats"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center"><Users className="mr-2 h-4 w-4"/>Available Seats</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" max="8" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit">
                  <Save className="mr-2"/>
                  Save Route
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
