
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
    driverAvatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    startPoint: 'Downtown Central',
    endPoint: 'Northwood Suburbs',
    travelTime: '8:00 AM',
    availableSeats: 3,
    pricePerSeat: 15.50,
    carModel: 'Toyota Camry',
    carImageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.9,
  },
  {
    id: '2',
    driverName: 'Sarah K.',
    driverAvatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    startPoint: 'Eastside Industrial Park',
    endPoint: 'Westwood Mall',
    travelTime: '9:30 AM',
    availableSeats: 1,
    pricePerSeat: 12.00,
    carModel: 'Honda Civic',
    carImageUrl: 'https://images.unsplash.com/photo-1514316454349-7629a42da93d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.8,
  },
  {
    id: '3',
    driverName: 'Mike L.',
    driverAvatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    startPoint: 'South Beach',
    endPoint: 'Airport Terminal B',
    travelTime: '5:00 PM',
    availableSeats: 2,
    pricePerSeat: 25.00,
    carModel: 'Ford Explorer',
    carImageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.9,
  },
    {
    id: '4',
    driverName: 'Emily R.',
    driverAvatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    startPoint: 'University Campus',
    endPoint: 'Downtown Central',
    travelTime: '6:00 PM',
    availableSeats: 4,
    pricePerSeat: 8.50,
    carModel: 'Hyundai Elantra',
    carImageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
