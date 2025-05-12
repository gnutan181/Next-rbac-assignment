"use client";
import { getCurrentUser } from '@/lib/auth';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface UserContextType {
    newName: string;
  setNewName: (name: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export  const  UserProvider = ({ children }: { children: ReactNode }) => {
  const user  = async()=>{
    return await getCurrentUser();
        }
  useEffect(()=>{
          user()
  },[])
  
   
  const [newName, setNewName] = useState("");

  return (
    <UserContext.Provider value={{ newName, setNewName }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};