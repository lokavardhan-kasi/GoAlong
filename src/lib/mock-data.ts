

export type Ride = {
  id: string;
  driver: {
    name: string;
    avatarUrl: string;
    rating: number;
    verified: boolean;
  };
  route: {
    from: string;
    to: string;
    stops: string[];
  };
  times: {
    departure: string;
    arrival: string;
    duration: string;
  };
  price: {
    seat: number;
    parcel: number;
  };
  vehicle: {
    model: string;
    imageUrl: string;
  },
  features: {
    instantBooking: boolean;
    maxSeats: number;
    availableSeats: number;
    parcelSpace: 'Small' | 'Medium' | 'Large' | 'None';
  };
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
    driver: {
      name: 'Rohan',
      avatarUrl: 'https://picsum.photos/seed/driver5/100/100',
      rating: 4.9,
      verified: true,
    },
    route: {
      from: 'Vizag',
      to: 'Hyderabad',
      stops: ['Rajahmundry', 'Vijayawada'],
    },
    times: {
      departure: '08:00',
      arrival: '16:30',
      duration: '8h 30m'
    },
    price: {
      seat: 450,
      parcel: 150,
    },
    vehicle: {
      model: 'Toyota Camry',
      imageUrl: 'https://picsum.photos/seed/car5/600/400',
    },
    features: {
      instantBooking: true,
      maxSeats: 4,
      availableSeats: 3,
      parcelSpace: 'Medium',
    }
  },
  {
    id: '2',
    driver: {
      name: 'Priya',
      avatarUrl: 'https://picsum.photos/seed/driver6/100/100',
      rating: 4.8,
      verified: true,
    },
    route: {
      from: 'Vizag',
      to: 'Hyderabad',
      stops: [],
    },
    times: {
      departure: '09:30',
      arrival: '18:00',
      duration: '8h 30m'
    },
    price: {
      seat: 420,
      parcel: 120,
    },
    vehicle: {
      model: 'Honda Civic',
      imageUrl: 'https://picsum.photos/seed/car6/600/400',
    },
    features: {
      instantBooking: false,
      maxSeats: 3,
      availableSeats: 1,
      parcelSpace: 'Small',
    }
  },
  {
    id: '3',
    driver: {
      name: 'Amit',
      avatarUrl: 'https://picsum.photos/seed/driver7/100/100',
      rating: 4.9,
      verified: false,
    },
    route: {
      from: 'Vizag',
      to: 'Hyderabad',
      stops: ['Vijayawada'],
    },
    times: {
      departure: '17:00',
      arrival: '01:30',
      duration: '8h 30m'
    },
    price: {
      seat: 500,
      parcel: 200,
    },
    vehicle: {
      model: 'Ford Explorer',
      imageUrl: 'https://picsum.photos/seed/car7/600/400',
    },
     features: {
      instantBooking: true,
      maxSeats: 5,
      availableSeats: 2,
      parcelSpace: 'Large',
    }
  },
    {
    id: '4',
    driver: {
      name: 'Emily R.',
      avatarUrl: 'https://picsum.photos/seed/driver8/100/100',
      rating: 5.0,
      verified: true,
    },
     route: {
      from: 'University Campus',
      to: 'Downtown Central',
      stops: [],
    },
    times: {
      departure: '18:00',
      arrival: '18:45',
      duration: '45m',
    },
    price: {
      seat: 85,
      parcel: 30,
    },
    vehicle: {
      model: 'Hyundai Elantra',
      imageUrl: 'https://picsum.photos/seed/car8/600/400',
    },
     features: {
      instantBooking: true,
      maxSeats: 4,
      availableSeats: 4,
      parcelSpace: 'None',
    }
  },
   {
    id: '5',
    driver: {
      name: 'Suresh',
      avatarUrl: 'https://picsum.photos/seed/driver9/100/100',
      rating: 4.7,
      verified: true,
    },
     route: {
      from: 'Vizag',
      to: 'Vijayawada',
      stops: [],
    },
    times: {
      departure: '10:00',
      arrival: '15:00',
      duration: '5h 0m',
    },
    price: {
      seat: 300,
      parcel: 100,
    },
    vehicle: {
      model: 'Maruti Swift',
      imageUrl: 'https://picsum.photos/seed/car9/600/400',
    },
     features: {
      instantBooking: false,
      maxSeats: 4,
      availableSeats: 2,
      parcelSpace: 'Small',
    }
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
