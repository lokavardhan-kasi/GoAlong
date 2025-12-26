
export type Ride = {
  id: string;
  driverName: string;
  driverAvatarUrl: string;
  startPoint: string;
  endPoint:string;
  travelTime: string;
  availableSeats: number;
  pricePerSeat: number;
  carModel: string;
  carImageUrl: string;
  rating: number;
};

export type PastRide = {
  id: string;
  driverName: string;
  date: string;
  startPoint: string;
  endPoint: string;
  cost: number;
  rating?: number;
};

export const rides: Ride[] = [
  {
    id: '1',
    driverName: 'Rohan',
    driverAvatarUrl: 'https://picsum.photos/seed/driver5/100/100',
    startPoint: 'Vizag',
    endPoint: 'Hyderabad',
    travelTime: '8:00 AM',
    availableSeats: 3,
    pricePerSeat: 25.50,
    carModel: 'Toyota Camry',
    carImageUrl: 'https://picsum.photos/seed/car5/600/400',
    rating: 4.9,
  },
  {
    id: '2',
    driverName: 'Priya',
    driverAvatarUrl: 'https://picsum.photos/seed/driver6/100/100',
    startPoint: 'Vizag',
    endPoint: 'Hyderabad',
    travelTime: '9:30 AM',
    availableSeats: 1,
    pricePerSeat: 22.00,
    carModel: 'Honda Civic',
    carImageUrl: 'https://picsum.photos/seed/car6/600/400',
    rating: 4.8,
  },
  {
    id: '3',
    driverName: 'Amit',
    driverAvatarUrl: 'https://picsum.photos/seed/driver7/100/100',
    startPoint: 'Vizag',
    endPoint: 'Hyderabad',
    travelTime: '5:00 PM',
    availableSeats: 2,
    pricePerSeat: 30.00,
    carModel: 'Ford Explorer',
    carImageUrl: 'https://picsum.photos/seed/car7/600/400',
    rating: 4.9,
  },
    {
    id: '4',
    driverName: 'Emily R.',
    driverAvatarUrl: 'https://picsum.photos/seed/driver8/100/100',
    startPoint: 'University Campus',
    endPoint: 'Downtown Central',
    travelTime: '6:00 PM',
    availableSeats: 4,
    pricePerSeat: 8.50,
    carModel: 'Hyundai Elantra',
    carImageUrl: 'https://picsum.photos/seed/car8/600/400',
    rating: 5.0,
  },
];

export const pastRides: PastRide[] = [
  {
    id: 'p1',
    driverName: 'John D.',
    date: '2023-10-25',
    startPoint: 'Downtown Central',
    endPoint: 'Northwood Suburbs',
    cost: 15.50,
    rating: 5,
  },
  {
    id: 'p2',
    driverName: 'Mike L.',
    date: '2023-10-22',
    startPoint: 'South Beach',
    endPoint: 'Airport Terminal B',
    cost: 25.00
  },
  {
    id: 'p3',
    driverName: 'Sarah K.',
    date: '2023-10-20',
    startPoint: 'Eastside Industrial Park',
    endPoint: 'Westwood Mall',
    cost: 12.00,
    rating: 4,
  }
];

export const userProfile = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    memberSince: '2023-01-15',
    totalRides: 24,
    totalDeliveries: 5,
    savings: 120.50,
};
