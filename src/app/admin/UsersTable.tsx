// src/app/admin/UsersTable.tsx
'use client';

import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function UsersTable({ users }: { users: User[] }) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState<Record<string, boolean>>({});

  const handleRoleChange = async (userId: string, newRole: 'USER' | 'ADMIN') => {
    setIsUpdating((prev) => ({ ...prev, [userId]: true }));

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
      });
console.log(response)
      if (!response.ok) {
        toast.error("Cannot demote last admin")
        // throw new Error('Failed to update user role');
        return ;
      }
      toast.success(`Role changed to ${newRole}`)
      router.refresh();
    } catch (error) {
      console.error('Error updating user role:', error);
    } finally {
      setIsUpdating((prev) => ({ ...prev, [userId]: false }));
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200  text-black">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.role}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex space-x-2">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(user.id, e.target.value as 'USER' | 'ADMIN')
                    }
                    disabled={isUpdating[user.id]}
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}