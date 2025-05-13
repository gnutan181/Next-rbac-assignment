// "use client";

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// import Navbar from '@/components/Navbar';
// import { SessionProvider } from 'next-auth/react';
// import { getCurrentUser } from '@/lib/auth';
import "../styles/globals.css";

import Providers from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });


export const metadata: Metadata = {
  title: 'Next.js RBAC App',
  description: 'Role-Based Access Control with Next.js',
};

export default  function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="container mx-auto px-4 py-8">  
          {/* <SessionProvider>

    <UserProvider  >
    <Navbar /> */}
<Providers>

          {children}
</Providers>
   
          {/* </UserProvider>
          </SessionProvider> */}

     </main>
      </body>
    </html>
  );
}