import RideDetailsClient from '@/components/app/RideDetailsClient';

// This is the main page component. It's a Server Component.
export default async function RidePage({ params }: { params: { id: string } }) {
  // The client component will handle all the interactive logic and data fetching on the client-side.
  // We pass the `id` from the URL as a prop.
  return <RideDetailsClient rideId={params.id} />;
}
