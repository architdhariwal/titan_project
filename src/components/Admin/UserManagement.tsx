import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../../services/userService';
import UserTable from './UserTable';
import UserForm from './UserForm';
import { User } from '../../models/User_types';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const fetchedUsers = await getUsers();
    setUsers(fetchedUsers);
  };

  const handleAddUser = async (userData: Omit<User, 'id'>) => {
    await createUser(userData);
    fetchUsers();
    setIsFormOpen(false);
  };

  const handleUpdateUser = async (id: number, userData: Partial<User>) => {
    await updateUser(id, userData);
    fetchUsers();
    setIsFormOpen(false);
    setEditingUser(null);
  };

  const handleDeleteUser = async (id: number) => {
    await deleteUser(id);
    fetchUsers();
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Users</h2>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={() => setIsFormOpen(true)}
        >
          Add User
        </button>
      </div>
      <UserTable
        users={currentUsers}
        onEdit={(user) => {
          setEditingUser(user);
          setIsFormOpen(true);
        }}
        onDelete={handleDeleteUser}
      />
      <div className="mt-4 flex justify-center">
        <button
          className="mx-1 px-3 py-1 bg-gray-200 rounded"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-2">
          Page {currentPage} of {Math.ceil(users.length / usersPerPage)}
        </span>
        <button
          className="mx-1 px-3 py-1 bg-gray-200 rounded"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(users.length / usersPerPage)))}
          disabled={currentPage === Math.ceil(users.length / usersPerPage)}
        >
          Next
        </button>
      </div>
      {isFormOpen && (
        <UserForm
          user={editingUser}
          onSubmit={(userData) =>
            editingUser ? handleUpdateUser(editingUser.id, userData) : handleAddUser(userData as Omit<User, 'id'>)
          }
          onCancel={() => {
            setIsFormOpen(false);
            setEditingUser(null);
          }}
        />
      )}
    </div>
  );
};

export default UserManagement;

