import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaHome, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';


const Navbar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <FaUser className="text-2xl text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <div className="flex items-center">
            <Link to="/" className="mr-4">
              <FaHome className="text-2xl text-gray-600 hover:text-blue-500" />
            </Link>
            <button onClick={handleLogout}>
              <FaSignOutAlt className="text-2xl text-gray-600 hover:text-blue-500" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

