import React from 'react';
import { Users, ShoppingBag, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  activeSection: 'users' | 'products';
  setActiveSection: (section: 'users' | 'products') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="w-64 bg-gray-200 shadow-lg h-screen flex flex-col">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800">Admin Panel</h2>
      </div>
      <nav className="flex-1">
        <button
          className={`flex items-center w-full px-6 py-3 text-left ${
            activeSection === 'products' ? 'bg-gray-500 text-white' : 'text-black hover:bg-gray-600'
          }`}
          onClick={() => setActiveSection('products')}
        >
          <ShoppingBag className="w-5 h-5 mr-3" />
          Manage Products
        </button>
        <button
          className={`flex items-center w-full px-6 py-3 text-left ${
            activeSection === 'users' ? 'bg-gray-500 text-white' : 'text-black hover:bg-gray-600'
          }`}
          onClick={() => setActiveSection('users')}
        >
          <Users className="w-5 h-5 mr-3" />
          Manage Users
        </button>
      </nav>
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-6 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

