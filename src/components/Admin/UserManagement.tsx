import React, { useState, useEffect } from 'react';
import { User } from '../../models/User_types';
import { getUsers, createUser, updateUser, deleteUser } from '../../services/userService';
import PaginatedTable, { Column } from './PaginatedTable';
import AddUserForm from './AddUserForm';
import Modal from './Modal';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleAddUser = async (userData: Omit<User, 'id'>) => {
    try {
      if (userData.addresses && userData.addresses.length > 0) {
        userData.addresses[0].isDefault = true;
        for (let i = 1; i < userData.addresses.length; i++) {
          userData.addresses[i].isDefault = false;
        }
      }
      await createUser(userData);
      fetchUsers();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to add user:', error);
    }
  };

  const handleUpdateUser = async (id: number, userData: Partial<User>) => {
    try {
      if (userData.addresses && userData.addresses.length > 0) {
        const defaultAddressIndex = userData.addresses.findIndex(a => a.isDefault);
        if (defaultAddressIndex === -1) {
          userData.addresses[0].isDefault = true;
        }
        for (let i = 0; i < userData.addresses.length; i++) {
          if (i !== defaultAddressIndex) {
            userData.addresses[i].isDefault = false;
          }
        }
      }
      await updateUser(id, userData);
      fetchUsers();
      setIsModalOpen(false);
      setEditingUser(null);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const columns: Column<User>[] = [
    { key: 'username', header: 'Username' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role' },
    { key: 'balance', header: 'Balance' },
    {
      key: 'addresses',
      header: 'Addresses',
      render: (user: User) => (
        <div>
          {user.addresses && user.addresses.length > 0 ? (
            <span>{user.addresses.length} address</span>
          ) : (
            <span>No address</span>
          )}
        </div>
      ),
    },
    {
      key: 'action',
      header: 'Action',
      render: (user: User) => (
        <div>
          <button
            className="mr-2 text-blue-500 hover:text-blue-700"
            onClick={() => {
              setEditingUser(user);
              setIsModalOpen(true);
            }}
          >
            Update
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => handleDeleteUser(user.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <button
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        onClick={() => {
          setEditingUser(null);
          setIsModalOpen(true);
        }}
      >
        Add User
      </button>
      <PaginatedTable data={users} columns={columns} itemsPerPage={5} />
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingUser(null);
        }}
        title={editingUser ? 'Edit User' : 'Add User'}
      >
        <AddUserForm
          user={editingUser}
          onSubmit={(userData) =>
            editingUser
              ? handleUpdateUser(editingUser.id, userData)
              : handleAddUser(userData as Omit<User, 'id'>)
          }
          onCancel={() => {
            setIsModalOpen(false);
            setEditingUser(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default UserManagement;


