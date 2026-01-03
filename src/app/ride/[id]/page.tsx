import { collectionGroup, query, getDocs } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import { Route as RideRoute } from '@/lib/mock-data';
import RideDetailsClient from '@/components/app/RideDetailsClient';

// This function runs at build time to determine which dynamic paths to pre-render.
export async function generateStaticParams() {
  // We can't use hooks here, so we initialize a temporary connection to Firestore.
  // Note: This assumes your production environment is configured for Firebase.
  const { firestore } = initializeFirebase();
  const routesQuery = query(collectionGroup(firestore, 'routes'));
  const querySnapshot = await getDocs(routesQuery);
  const routes: RideRoute[] = [];
  querySnapshot.forEach(doc => {
    routes.push({ id: doc.id, ...doc.data() } as RideRoute & { id: string });
  });

  // Map the routes to the format Next.js expects for params.
  return routes.map(route => ({
    id: route.id,
  }));
}

// This is the main page component. It's a Server Component.
export default function RidePage({ params }: { params: { id: string } }) {
  // The client component will handle all the interactive logic and data fetching on the client-side.
  // We pass the `id` from the URL as a prop.
  return <RideDetailsClient rideId={params.id} />;
}
