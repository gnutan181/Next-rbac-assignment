// src/app/api/admin/users/[id]/route.ts
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
// import { authOptions } from '../../../../../auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function PUT(
  req: Request,
  context: { params: { id: string } }
  // { params }: { params: { id: string } }
) {
  const { params } = context; 
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || session.user.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { role } = await req.json();

    if (!role || (role !== 'USER' && role !== 'ADMIN')) {
      return NextResponse.json(
        { message: 'Invalid role provided' },
        { status: 400 }
      );
    }

    const user = await prisma.user.update({
      where: { id: params.id },
      data: { role },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json(
      { message: 'Error updating user role' },
      { status: 500 }
    );
  }
}