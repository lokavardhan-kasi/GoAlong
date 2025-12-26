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
    driverName: 'John D.',
    driverAvatarUrl: 'https://picsum.photos/seed/user1/100/100',
    startPoint: 'Downtown Central',
    endPoint: 'Northwood Suburbs',
    travelTime: '8:00 AM',
    availableSeats: 3,
    pricePerSeat: 15.50,
    carModel: 'Toyota Camry',
    carImageUrl: 'https://picsum.photos/seed/car1/800/600',
    rating: 4.9,
  },
  {
    id: '2',
    driverName: 'Sarah K.',
    driverAvatarUrl: 'https://picsum.photos/seed/user2/100/100',
    startPoint: 'Eastside Industrial Park',
    endPoint: 'Westwood Mall',
    travelTime: '9:30 AM',
    availableSeats: 1,
    pricePerSeat: 12.00,
    carModel: 'Honda Civic',
    carImageUrl: 'https://picsum.photos/seed/car2/800/600',
    rating: 4.8,
  },
  {
    id: '3',
    driverName: 'Mike L.',
    driverAvatarUrl: 'https://picsum.photos/seed/user3/100/100',
    startPoint: 'South Beach',
    endPoint: 'Airport Terminal B',
    travelTime: '5:00 PM',
    availableSeats: 2,
    pricePerSeat: 25.00,
    carModel: 'Ford Explorer',
    carImageUrl: 'https://picsum.photos/seed/car3/800/600',
    rating: 4.9,
  },
    {
    id: '4',
    driverName: 'Emily R.',
    driverAvatarUrl: 'https://picsum.photos/seed/user4/100/100',
    startPoint: 'University Campus',
    endPoint: 'Downtown Central',
    travelTime: '6:00 PM',
    availableSeats: 4,
    pricePerSeat: 8.50,
    carModel: 'Hyundai Elantra',
    carImageUrl: 'https://picsum.photos/seed/car4/800/600',
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
