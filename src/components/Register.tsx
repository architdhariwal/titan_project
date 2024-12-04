import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { createUser } from '../services/userService';
import { User } from '../models/User_types';
import { useAuth } from '../contexts/AuthContext';
import { showToast } from '../utils/toastUtility';
import { Eye, EyeOff } from 'lucide-react';
import backgroundImage from "../assets/watch_background.webp"

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { refreshUsers } = useAuth();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      const newUser: Omit<User, 'id'> = {
        username,
        email,
        password,
        role: 'customer',
        balance: 5000,
      };

      await createUser(newUser);
      await refreshUsers();

      showToast.success('Account created successfully!', {
        duration: 3000,
        position: 'bottom-center',
      });

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      showToast.error('An error occurred during sign up');
    }
  };

  return (
    <div 
    className="flex items-center justify-center h-screen bg-titan-bg-theme"
    style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Toaster />

      <form onSubmit={handleSignUp} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Register</h2>
        {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}
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
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full p-3 mb-4 border border-gray-300 rounded pr-10"
          />
          <button
            type="button"
            className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <Eye className="w-5 h-5 text-gray-500" /> : <EyeOff className="w-5 h-5 text-gray-500" />}
          </button>
        </div>
        <button type="submit" className="w-full bg-gray-800 text-white p-3 rounded hover:bg-gray-900">
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