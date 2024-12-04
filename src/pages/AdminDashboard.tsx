import React, { useState } from 'react';
import Sidebar from '../components/Admin/Sidebar';
import UserManagement from '../components/Admin/UserManagement';
import ProductManagement from '../components/Admin/ProductManagement';

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'users' | 'products'>('users');

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 overflow-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        {activeSection === 'users' ? <UserManagement /> : <ProductManagement />}
      </div>
    </div>
  );
};

export default AdminDashboard;

