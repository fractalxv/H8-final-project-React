import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, login } = useAuth();
  
  // Check localStorage for user on component mount
  // This is now handled by redux-persist, but we'll keep this for any edge cases
  useEffect(() => {
    if (!isAuthenticated) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          login(user);
        } catch (error) {
          console.error('Failed to parse stored user:', error);
        }
      }
    }
  }, [isAuthenticated, login]);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
}