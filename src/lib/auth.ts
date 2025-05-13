// src/lib/auth.ts
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { prisma } from './prisma';

export const getSession = async () => {
  return await getServerSession(authOptions);
};

export const getCurrentUser = async () => {
  const session = await getSession();
  return session?.user;
};
export const checkArticleAuthorization = async (articleId: string, userId: string) => {
  const article = await prisma.article.findUnique({
    where: { id: articleId },
    // select: { authorId: true }
  });

  return article?.authorId === userId;
};