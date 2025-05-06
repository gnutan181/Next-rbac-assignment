// src/app/layout.tsx
// import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { SessionProvider } from 'next-auth/react';
import { getCurrentUser } from '@/lib/auth';
import "../styles/globals.css";
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
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Navbar user={user} /> */}
        <main className="container mx-auto px-4 py-8">  
          {/* <Navbar  user={user}/> */}
          {children}
     </main>
      </body>
    </html>
  );
}