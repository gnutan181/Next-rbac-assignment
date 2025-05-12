// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import {  signOut } from 'next-auth/react';
import { useUser } from '@/context/UserContext';
// import { User } from '@prisma/client';
interface NavbarProps {
  user?: {
    name?: string | null;
    role?: string;
  } | null;
  children?: React.ReactNode; // Add children to the props
}
export default function Navbar({ user, children }: NavbarProps) {
  const { newName } = useUser();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex space-x-4">
          {/* <Link href="/" className="font-medium text-gray-700 hover:text-indigo-600">
            Home
          </Link> */}
          {user && (
            <>
              <Link
                href="/profile"
                className="font-medium text-gray-700 hover:text-indigo-600"
              >
                Profile
              </Link>
              <Link
                href="/articles"
                className="font-medium text-gray-700 hover:text-indigo-600"
              >
                Articles
              </Link>
              {/* {user.role === 'ADMIN' && (
                <Link
                  href="/admin"
                  className="font-medium text-gray-700 hover:text-indigo-600"
                >
                  Admin
                </Link>
              )} */}
               {user.role === 'ADMIN' && (
                <Link
                  href="/admin"
                  className="font-medium text-gray-700 hover:text-indigo-600"
                >
                  Users
                </Link>
              )}
            </>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm text-gray-500">
                Hello, {newName || user?.name} ({user?.role})
              </span>
              <button
                onClick={() => signOut()}
                className="px-3 py-1 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-3 py-1 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="px-3 py-1 text-sm text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
      {children && <div className="mt-4">{children}</div>} 
    </nav>
  );
}

