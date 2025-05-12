// src/app/admin/articles/page.tsx
import Navbar from '@/components/Navbar';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function AdminArticlesPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== 'ADMIN') {
    return <div>Unauthorized</div>;
  }

  const articles = await prisma.article.findMany({
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
  // const formattedArticles = articles.map((article) => ({
  //   ...article,
  //   createdAt: new Date(article.createdAt).toISOString(),
  // }));
  return (
    <Navbar user={user}>
      
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">All Articles</h1>
      <div className="space-y-4">
        {articles.map((article) => (
          <div key={article.id} className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p className="text-gray-500 text-sm mt-1">
              By {article?.author?.name} ({article?.author?.email})
            </p>
            <p className="text-gray-500 text-sm">
              Created on {new Date(article?.createdAt).toLocaleDateString()}
            </p>
            <p className="mt-2">{article?.content.substring(0, 200)}...</p>
          </div>
        ))}
      </div>
    </div>
    </Navbar>
  );
}