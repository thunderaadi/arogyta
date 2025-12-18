// context/AuthContext.tsx
'use client'

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

type Role = 'asha' | 'phc' | null;

interface AuthContextType {
  role: Role;
  login: (role: 'asha' | 'phc') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>(null);
  const router = useRouter();

  useEffect(() => {
    // Check for a saved role in localStorage when the app loads
    const savedRole = localStorage.getItem('userRole') as Role;
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  const login = (newRole: 'asha' | 'phc') => {
    localStorage.setItem('userRole', newRole);
    setRole(newRole);
    if (newRole === 'asha') {
      router.push('/dashboard');
    } else {
      router.push('/phc/dashboard');
    }
  };

  const logout = () => {
    localStorage.removeItem('userRole');
    setRole(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};