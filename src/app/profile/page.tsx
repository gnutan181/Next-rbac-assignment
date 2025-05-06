// src/app/profile/page.tsx
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import ProfileForm from './ProfileForm';
import Navbar from '@/components/Navbar';

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    return <div>Not authenticated</div>;
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!dbUser) {
    return <div>User not found</div>;
  }

  return (
        <Navbar user={user}>
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-black">Profile</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <ProfileForm user={dbUser} />
      </div>
    </div>
    </Navbar>
  );
}