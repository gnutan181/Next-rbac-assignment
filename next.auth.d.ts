// src/types/next-auth.d.ts
import { DefaultSession } from 'next-auth';
import { JWT as DefaultJWT } from 'next-auth/jwt'
export type UserRole = 'USER' | 'ADMIN'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user?: {
      id: string;
      name?: string | null;
      email?: string | null;  
      role: string
    } & DefaultSession['user']
  }
  interface User {
    id: string
    name?: string | null
    email?: string | null
    role: UserRole
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string
    role: string
    email: string
    name: string
    sub: string
    iat: number
    exp: number
    jti: string
  }
}