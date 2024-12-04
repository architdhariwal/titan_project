import React, { useState } from 'react';
import { User } from '../../models/User_types';
import { 
  Edit2, 
  Trash2, 
  ChevronUp, 
  ChevronDown 
} from 'lucide-react';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  const [sortColumn, setSortColumn] = useState<keyof User | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const sortedUsers = [...users].sort((a, b) => {
   if (!sortColumn) return 0;
    const valueA = a[sortColumn];
    const valueB = b[sortColumn];

    if (valueA === undefined && valueB === undefined) return 0;
    if (valueA === undefined) return sortDirection === 'asc' ? 1 : -1;
    if (valueB === undefined) return sortDirection === 'asc' ? -1 : 1;

 
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortDirection === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return sortDirection === 'asc'
        ? valueA - valueB
        : valueB - valueA;
    }

    return 0;
  });

  
  const handleSort = (column: keyof User) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return (
    <div className="bg-titan-bg-theme shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            {(['username', 'email', 'role'] as (keyof User)[]).map((column) => (
              <th 
                key={column}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort(column)}
              >
                <div className="flex items-center">
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                  {sortColumn === column && (
                    <span className="ml-2">
                      {sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  )}
                </div>
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedUsers.map((user) => (
            <tr 
              key={user.id} 
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.username}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  className="text-blue-600 hover:text-blue-900 mr-4 transition-colors duration-200 flex items-center"
                  onClick={() => onEdit(user)}
                >
                  <Edit2 size={16} className="mr-1" /> Edit
                </button>
                <button
                  className="text-red-600 hover:text-red-900 transition-colors duration-200 flex items-center"
                  onClick={() => onDelete(user.id)}
                >
                  <Trash2 size={16} className="mr-1" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {users.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No users found
        </div>
      )}
    </div>
  );
};

export default UserTable;

