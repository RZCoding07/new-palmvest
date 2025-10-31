'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.withCredentials = true; // penting untuk kirim cookie

interface User {
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Cek auth saat pertama kali load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('/me'); // token otomatis dikirim via cookie
        setUser(res.data.user);
        setIsAuthenticated(true);
      } catch {
        setUser(null);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    await axios.post('/login', { username, password });
    // Setelah login, panggil /me untuk ambil data user
    const res = await axios.get('/me');
    setUser(res.data.user);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await axios.post('/logout'); // hapus cookie di server
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
