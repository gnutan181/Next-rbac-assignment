// src/app/articles/page.tsx
import Navbar from '@/components/Navbar';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

import Link from 'next/link';

export default async function ArticlesPage() {

  const user = await getCurrentUser();
  if (!user) {
    return <div>Not authenticated</div>;
  }

  let articles;

  if (user.role !== 'ADMIN') {
    articles = await prisma.article.findMany({
      where: { authorId: user.id },
      orderBy: { createdAt: 'desc' },
    });
  } else {
    articles = await prisma.article.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
 
  return (
    <>
    <Navbar>


    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">Articles</h1>
        <Link
          href="/articles/new"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Create New Article
        </Link>
      </div>
      {articles?.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">You haven&apos;t created any articles yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <div key={article.id} className="bg-white shadow rounded-lg p-4">
              <Link href={`/articles/${article.id}`}>
                <h2 className="text-xl font-semibold hover:text-indigo-600  text-black">
                  {article.title}
                </h2>
              </Link>
              <p className="text-gray-500 text-sm mt-1">
                Created on {new Date(article.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
    </Navbar>
    </>
  );
}
