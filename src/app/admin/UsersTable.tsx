// src/app/admin/UsersTable.tsx
'use client';

import Modal from '@/components/Modal';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
export default function UsersTable({ users }: { users: User[] }) {

const router = useRouter();
  const [isUpdating, setIsUpdating] = useState<Record<string, boolean>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingChange, setPendingChange] = useState<{
    userId: string;
    newRole: 'USER' | 'ADMIN';
    userName: string;
  } | null>(null);

  const handleRoleChange = async (userId: string, newRole: 'USER' | 'ADMIN', userName: string) => {
    setPendingChange({ userId, newRole, userName });
    setModalOpen(true);
  };

  const confirmRoleChange = async () => {
    if (!pendingChange) return;
    
    setIsUpdating((prev) => ({ ...prev, [pendingChange.userId]: true }));
    setModalOpen(false);

    try {
      const response = await fetch(`/api/admin/users/${pendingChange.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: pendingChange.newRole }),
      });

      if (!response.ok) {
        toast.error("Cannot demote last admin");
        return;
      }
      
      toast.success(`Role changed to ${pendingChange.newRole}`);
      router.refresh();
    } catch (error) {
      console.error('Error updating user role:', error);
    } finally {
      setIsUpdating((prev) => ({ ...prev, [pendingChange.userId]: false }));
      setPendingChange(null);
    }
  };
  return (
    <>
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
                      // handleRoleChange(user.id, e.target.value as 'USER' | 'ADMIN')
                                  handleRoleChange(user.id, e.target.value as 'USER' | 'ADMIN', user.name || '')

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
     <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setPendingChange(null);
        }}
        onConfirm={confirmRoleChange}
        title="Confirm Role Change"
        message={`Are you sure you want to change ${pendingChange?.userName}'s role to ${pendingChange?.newRole}? This action cannot be undone.`}
      />
      </>
  );
}