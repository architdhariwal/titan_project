import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from '../components/Admin/Navbar';
import UserManagement from '../components/Admin/UserManagement';
import ProductManagement from '../components/Admin/ProductManagement';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'products'>('users');
  const navigate = useNavigate();

  const handleTabClick = (tab: 'users' | 'products') => {
    setActiveTab(tab);
    navigate(`/admin-dashboard/${tab}`);
  };

  // return (
  //   <div className="min-h-screen bg-gray-100">
  //     <Navbar />
  //     <div className="container mx-auto px-4 py-8">
  //       <div className="mb-6">
  //         <button
  //           className={`mr-4 px-4 py-2 rounded ${activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
  //           onClick={() => handleTabClick('users')}
  //         >
  //           Manage Users
  //         </button>
  //         <button
  //           className={`px-4 py-2 rounded ${activeTab === 'products' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
  //           onClick={() => handleTabClick('products')}
  //         >
  //           Manage Products
  //         </button>
  //       </div>
  //       <Routes>
  //         <Route path="users" element={<UserManagement />} />
  //         <Route path="products" element={<ProductManagement />} />
  //         <Route path="*" element={<Navigate to={activeTab === 'users' ? 'users' : 'products'} replace />} />
  //       </Routes>
  //     </div>
  //   </div>
  // );
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

        {/* Render content based on activeTab */}
        <div>
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'products' && <ProductManagement />}
        </div>
      </div>
    </div>
  );
};


export default AdminDashboard;
