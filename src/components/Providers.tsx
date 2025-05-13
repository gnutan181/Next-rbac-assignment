"use client";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/context/UserContext";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <UserProvider>

        <Navbar />
        {children}
     <Toaster position="top-center"  />
      </UserProvider>
    </SessionProvider>
  );
}