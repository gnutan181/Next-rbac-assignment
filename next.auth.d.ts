// src/types/next-auth.d.ts
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user?: {
      id: string;
      name: string;
      email: string;
      role: 'USER' | 'ADMIN';
    };
  }
}