// src/app/layout.tsx
// import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import "../styles/globals.css";
import { SessionProvider } from 'next-auth/react';
import { UserProvider } from '@/context/UserContext';
const inter = Inter({ subsets: ['latin'] });


export const metadata: Metadata = {
  title: 'Next.js RBAC App',
  description: 'Role-Based Access Control with Next.js',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  

  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="container mx-auto px-4 py-8">  

        <SessionProvider>
    <UserProvider>
      
      
      {/* <Navbar /> */}
          {children}
          </UserProvider>
  </SessionProvider>
     </main>
      </body>
    </html>
  );
}