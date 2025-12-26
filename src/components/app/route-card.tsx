import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Ride } from '@/lib/mock-data';
import { ArrowRight, Clock, DollarSign, MapPin, Star, Users } from 'lucide-react';

type RouteCardProps = {
  ride: Ride;
};

export function RouteCard({ ride }: RouteCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
            <Image
                src={ride.carImageUrl}
                alt={ride.carModel}
                fill
                className="object-cover"
                data-ai-hint="car side"
            />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4 flex items-center gap-3">
          <Avatar>
            <AvatarImage src={ride.driverAvatarUrl} alt={ride.driverName} data-ai-hint="person face" />
            <AvatarFallback>{ride.driverName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{ride.driverName}</p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-500" />
              <span>{ride.rating.toFixed(1)}</span>
              <span className="mx-1">•</span>
              <span>{ride.carModel}</span>
            </div>
          </div>
        </div>
        <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="font-medium">From:</span>
                <span>{ride.startPoint}</span>
            </div>
            <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent-foreground" />
                <span className="font-medium">To:</span>
                <span>{ride.endPoint}</span>
            </div>
            <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Departs:</span>
                <span>{ride.travelTime}</span>
            </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between bg-muted/50 p-4">
        <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold">${ride.pricePerSeat.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground">/ seat</span>
            </div>
            <Badge variant="outline" className="w-fit">
                <Users className="mr-1 h-3 w-3" /> {ride.availableSeats} seats left
            </Badge>
        </div>
        <Button asChild className="active:scale-95">
          <Link href={`/find-ride/${ride.id}`}>
            View & Book <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
