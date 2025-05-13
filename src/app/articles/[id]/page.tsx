// app/articles/[id]/page.tsx
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import {  redirect } from 'next/navigation';
import Link from 'next/link';

export default async function ArticlePage( context: { params: { id: string } }) {
     
  const { id } = context.params;
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login');
  }

  const article = await prisma.article.findUnique({
    where: { id },
 
  });


console.log(article,"werf")
  // Check if user is author or admin
  const isAuthorized = user.role === 'ADMIN' || article?.authorId === user.id;
  
  if (!isAuthorized) {
    redirect('/articles');
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4">{article?.title || "title"}</h1>
        
        <div className="mb-4 text-sm text-gray-500">
          {/* <p>Author: {article?.author?.name} ({article.author.email})</p> */}
          <p>Created: {new Date(article?.createdAt || "13-05-2025").toLocaleDateString()}</p>
        </div>

        <div className="prose max-w-none">
          {article?.content || "content"}
        </div>

        <div className="mt-6">
          <Link
            href="/articles"
            className="text-indigo-600 hover:text-indigo-800"
          >
            &larr; Back to Articles
          </Link>
        </div>
      </div>
    </div>
  );
}