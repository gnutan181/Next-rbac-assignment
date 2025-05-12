// src/app/layout.tsx
// import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// import Navbar from '@/components/Navbar';
// import { SessionProvider } from 'next-auth/react';
// import { getCurrentUser } from '@/lib/auth';
import "../styles/globals.css";
import { UserProvider } from '@/context/UserContext';
// import Navbar from '@/components/Navbar';
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
    <UserProvider>
      {/* <Navbar /> */}
          {children}
          </UserProvider>

     </main>
      </body>
    </html>
  );
}