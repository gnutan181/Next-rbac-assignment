"use client";

import React, { createContext, useContext, useState, ReactNode,  } from 'react';

interface UserContextType {
    newName: string;
  setNewName: (name: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export  const  UserProvider = ({user, children }: {  user?: {
  id?: string;
    name?: string | null;
    role?: string;
    email?: string | null;
    // role?: string;
  } | null; children: ReactNode }) => {
  
  const [newName, setNewName] = useState(user?.name || '');
 
  
   
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