// src/app/api/admin/users/[id]/route.ts
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
// import { authOptions } from '../../../../../auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// import type { AppRouteHandlerContext } from 'next/dist/server/web/types';

export async function PUT(
  req: Request,
  context: { params: { id: string } }

) {

  // const { id } = await params
  const { id } = context.params;

  if (!id) {
    return NextResponse.json(
      { message: 'User ID is required' },
      { status: 400 }
    );

}
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || session?.user?.role !== 'ADMIN') {
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
     const currentUser = await prisma.user.findUnique({
      where: {id},
    });

    // Prevent last admin demotion
    if (currentUser?.role === 'ADMIN' && role === 'USER') {
      const adminCount = await prisma.user.count({
        where: { role: 'ADMIN' },
      });

      if (adminCount <= 1) {
        return NextResponse.json(
          { error: 'Cannot demote last admin' },
          { status: 400 }
        );
      }
    }

    const user = await prisma.user.update({
      where: { id},
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