import { createContext, useContext, useState, useEffect } from 'react';
import { getUserRole } from '@/config/authorizedEmails';

interface AuthContextType {
  userEmail: string | null;
  userRole: 'teacher' | 'student' | null;
  login: (email: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<'teacher' | 'student' | null>(null);

  useEffect(() => {
    const savedEmail = sessionStorage.getItem('userEmail');
    if (savedEmail) {
      const role = getUserRole(savedEmail);
      if (role) {
        setUserEmail(savedEmail);
        setUserRole(role);
      } else {
        sessionStorage.removeItem('userEmail');
      }
    }
  }, []);

  const login = (email: string): boolean => {
    const role = getUserRole(email.trim());
    if (role) {
      setUserEmail(email.trim());
      setUserRole(role);
      sessionStorage.setItem('userEmail', email.trim());
      return true;
    }
    return false;
  };

  const logout = () => {
    setUserEmail(null);
    setUserRole(null);
    sessionStorage.removeItem('userEmail');
  };

  return (
    <AuthContext.Provider value={{ userEmail, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
