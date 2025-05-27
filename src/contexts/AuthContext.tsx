
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService, type User, type AuthPayload } from '@/services/api';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      if (apiService.isAuthenticated()) {
        const userData = await apiService.me();
        setUser(userData);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      // Try to refresh token
      try {
        await apiService.refreshToken();
        const userData = await apiService.me();
        setUser(userData);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        apiService.logout();
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const authPayload = await apiService.login(email, password);
      // After successful login, fetch complete user profile
      const userData = await apiService.me();
      setUser(userData);
      toast.success('Welcome back!');
    } catch (error) {
      console.error('Login failed:', error);
      toast.error(error instanceof Error ? error.message : 'Login failed');
      throw error;
    }
  };

  const register = async (email: string, password: string): Promise<void> => {
    try {
      const authPayload = await apiService.register(email, password);
      // After successful registration, fetch complete user profile
      const userData = await apiService.me();
      setUser(userData);
      toast.success('Account created successfully!');
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error(error instanceof Error ? error.message : 'Registration failed');
      throw error;
    }
  };

  const logout = (): void => {
    apiService.logout();
    setUser(null);
    toast.success('Logged out successfully');
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
