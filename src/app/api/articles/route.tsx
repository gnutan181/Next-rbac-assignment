
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
// import { authOptions } from '../../auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  const session = await getServerSession(authOptions);
console.log(session, 'session in articles route');
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  let articles;
  try {
    if(session.user.role !== 'ADMIN'){
     articles = await prisma.article.findMany({
      where: { authorId: session.user.id },
      orderBy: { createdAt: 'desc' },
    });
  }else{
    await prisma.article.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  console.log(articles)

    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { message: 'Error fetching articles' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { title, content } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { message: 'Title and content are required' },
        { status: 400 }
      );
    }

    const article = await prisma.article.create({
      data: {
        title,
        content,
        authorId: session.user.id,
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      { message: 'Error creating article' },
      { status: 500 }
    );
  }
}