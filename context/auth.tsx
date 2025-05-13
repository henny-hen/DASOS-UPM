'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface User {
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check if user is already logged in on initial load
  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      try {
        const userData = JSON.parse(userCookie);
        setUser(userData);
      } catch (e) {
        console.error('Failed to parse user cookie:', e);
        // Invalid cookie, clear it
        Cookies.remove('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // For demo purposes, accept any credentials
      // In a real app, you would make an API call to your backend
      // const response = await fetch('/api/login', { method: 'POST', body: JSON.stringify({ email, password }) });
      // const data = await response.json();
      
      // Demo logic - accept any email that looks valid
      if (!email.includes('@')) {
        throw new Error('Email inválido');
      }
      
      // Create a user object
      const userData: User = {
        email,
        name: email.split('@')[0] // Just use the part before @ as name for demo
      };
      
      // IMPORTANT: Set the user cookie that middleware will check
      // Set cookie expiration to 7 days
      Cookies.set('user', JSON.stringify(userData), { expires: 7, path: '/' });
      
      // Update state
      setUser(userData);
      
      // Redirect to dashboard (the middleware will handle this as well)
      router.push('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Error during login');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      
      // Clear the user cookie
      Cookies.remove('user', { path: '/' });
      
      // Update state
      setUser(null);
      
      // Redirect to login
      router.push('/login');
    } catch (err) {
      console.error('Logout error:', err);
      setError(err instanceof Error ? err.message : 'Error during logout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
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