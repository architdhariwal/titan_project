import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getUsers, verifyPassword } from '../services/userService';
import { User } from '../models/User_types';

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAdmin: boolean;
  isCustomer: boolean;
  isLoggedIn: boolean;
  refreshUsers: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useCallback(async () => {
    try {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);

      const storedRole = sessionStorage.getItem('USER_ROLE');
      const storedEmail = sessionStorage.getItem('USER_EMAIL');

      if (storedRole && storedEmail) {
        const foundUser = fetchedUsers.find(u => u.email === storedEmail && u.role === storedRole);
        if (foundUser) setUser(foundUser);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = users.find(u => u.email === email);

    if (foundUser && verifyPassword(password, foundUser.password)) {
      setUser(foundUser);
      sessionStorage.setItem('USER_EMAIL', email);
      sessionStorage.setItem('USER_ROLE', foundUser.role);
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('USER_EMAIL');
    sessionStorage.removeItem('USER_ROLE');
  };

  const refreshUsers = async () => {
    try {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Failed to refresh users:', error);
    }
  };

  const isAdmin = user?.role === 'admin';
  const isCustomer = user?.role === 'customer';
  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        isLoading,
        isAdmin,
        isCustomer,
        isLoggedIn,
        refreshUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export default AuthContext;