import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/lib/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: 'teacher' | 'student';
}

export function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
  const { userRole } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (userRole !== allowedRole) {
      setLocation('/');
    }
  }, [userRole, allowedRole, setLocation]);

  if (userRole !== allowedRole) {
    return null;
  }

  return <>{children}</>;
}
