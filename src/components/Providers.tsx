"use client";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/context/UserContext";
import Navbar from "@/components/Navbar";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <UserProvider>
        <Navbar />
        {children}
      </UserProvider>
    </SessionProvider>
  );
}