// src/app/api/auth/[...nextauth]/route.ts
import NextAuth,{SessionStrategy} from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcryptjs';
// import type { Session, JWT } from 'inspector/promises';
const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
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
          role: user?.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      console.log(typeof token, 'token')

      
      if (user) {
        token.id = user?.id;
        token.role = user?.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token?.id;
        session.user.role = token?.role;
      }
      return session;
    },
  },
  session: {
    strategy:'jwt' as SessionStrategy,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };