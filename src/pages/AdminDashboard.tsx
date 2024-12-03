import React, { useState } from 'react';
import Navbar from '../components/Admin/Navbar';
import UserManagement from '../components/Admin/UserManagement';
import ProductManagement from '../components/Admin/ProductManagement';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'products'>('users');

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            className={`mr-4 px-4 py-2 rounded ${
              activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab('users')}
          >
            Manage Users
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === 'products' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab('products')}
          >
            Manage Products
          </button>
        </div>

        <div>
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'products' && <ProductManagement />}
        </div>
      </div>
    </div>
  );
};


export default AdminDashboard;
