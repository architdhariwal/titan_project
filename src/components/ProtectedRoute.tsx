import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


type ProtectedRouteProps = {
  allowedRoles: ('admin' | 'customer')[];
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { isLoggedIn,user, isLoading } = useAuth();
  if (isLoading) {
    return <div>Loading...</div>; // replace this with a loading spinner if needed
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (user && allowedRoles.includes(user.role)) {
    return <Outlet />;
  }

  return <Navigate to="/unauthorized" replace />;
};