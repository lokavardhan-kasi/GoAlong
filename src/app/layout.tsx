
'use client';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import { Poppins, PT_Sans } from 'next/font/google'
import { UserProvider } from '@/context/user-context';
import { FirebaseClientProvider } from "@/firebase/client-provider";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${ptSans.variable} font-sans antialiased`}>
        <FirebaseClientProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}

    