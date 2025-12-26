import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import { Poppins, PT_Sans } from 'next/font/google'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-poppins',
})

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
})

export const metadata: Metadata = {
  title: 'GoAlong Community Mobility',
  description: 'A community-driven mobility solution for rides and deliveries.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${ptSans.variable} font-sans antialiased bg-light-cyan`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
