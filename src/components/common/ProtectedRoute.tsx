import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';

interface ProtectedRouteProps {
  allowedRoles?: ('user' | 'admin')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  // 1. Check if user is logged in
  if (!isAuthenticated || !user) {
    // Redirect to login, saving the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Check if user has the required role (if roles are specified)
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // User is logged in but doesn't have permission (e.g., user trying to access admin)
    return <Navigate to="/" replace />;
  }

  // 3. If all checks pass, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
