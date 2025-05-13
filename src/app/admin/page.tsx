// src/app/admin/page.tsx
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import UsersTable from './UsersTable';
// import Navbar from '@/components/Navbar';

export default async function AdminDashboard() {
  const user = await getCurrentUser();

  if (!user || user.role !== 'ADMIN') {
    return <div>Unauthorized</div>;
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return (
    // <Navbar user={user}>
   <>
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-black">Admin Dashboard</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4  text-black">Users</h2>
        <UsersTable users={users} />
      </div>
    </div>
    </>
    
  );
}