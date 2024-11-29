import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { createUser } from '../services/userService';
import { User } from '../models/User_types';
import { useAuth } from '../contexts/AuthContext';
import { showToast } from '../utils/toastUtility';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { refreshUsers } = useAuth();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const newUser: Omit<User, 'id'> = {
        username,
        email,
        password,
        role: 'customer',
        balance: 500,
      };

      await createUser(newUser);
      await refreshUsers();
      
      // Use the new toast utility
      showToast.success('Account created successfully!', {
        duration: 3000,
        position: 'bottom-center'
      });

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      showToast.error('An error occurred during sign up');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Toaster />
      
      <form onSubmit={handleSignUp} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full p-3 mb-4 border border-gray-300 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full p-3 mb-4 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-3 mb-4 border border-gray-300 rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700">
          Register
        </button>
        <p className="text-center mt-4 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;