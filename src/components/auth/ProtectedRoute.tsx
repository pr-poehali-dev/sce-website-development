
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Loader2 } from 'lucide-react';
import { UserRole } from '@/lib/types';

interface ProtectedRouteProps {
  requiredRole?: UserRole;
}

export const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-sce-primary" />
      </div>
    );
  }

  // Check if user is authenticated
  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has the required role
  if (requiredRole && user?.role !== requiredRole) {
    // If user doesn't have admin role, redirect to unauthorized page
    return <Navigate to="/unauthorized" replace />;
  }

  // If all checks pass, render the protected route
  return <Outlet />;
};

export default ProtectedRoute;
