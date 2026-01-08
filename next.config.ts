
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  allowedDevOrigins: [
    "https://6000-firebase-studio-1766761044263.cluster-73qgvk7hjjadkrjeyexca5ivva.cloudworkstations.dev",
    "https://9000-firebase-studio-1766761044263.cluster-73qgvk7hjjadkrjeyexca5ivva.cloudworkstations.dev",
    "https://*.cloudworkstations.dev"
  ],
};

export default nextConfig;
