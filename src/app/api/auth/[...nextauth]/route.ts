// src/app/api/auth/[...nextauth]/route.ts
import NextAuth,{SessionStrategy, Session,AuthOptions} from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcryptjs';
// import type { Session, JWT } from 'inspector/promises';
import { JWT } from 'next-auth/jwt'
import type { User } from 'next-auth'

const prisma = new PrismaClient();

export const authOptions:AuthOptions = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials):Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user || !(await compare(credentials.password, user.password))) {
          throw new Error('Invalid email or password');
        }

        return {
          id: user?.id,
          name: user?.name,
          email: user?.email,
          role: user?.role as 'USER' | 'ADMIN',
        };
      },
    }),
  ],
  callbacks: {
      jwt: async ({ token, user }: { token: JWT; user: User | null }) => {
      
      if (user) {
        token.id = user?.id;
        token.role = user?.role;
      }
      return token;
    },
      session: async ({ session, token }: { token:JWT,session: Session;  }) => {
      if (session.user && token) {
        session.user.id = token?.id;
        session.user.role = token?.role;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
  session: {
    strategy:'jwt' as SessionStrategy,
    maxAge: 30 * 24 * 60 * 60, // 30 days

  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };