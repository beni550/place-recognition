import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  signup: (username: string, password: string, fullName: string, email: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string): Promise<boolean> => {
    // סימולציה של התחברות
    const foundUser = mockUsers.find(u => u.username === username);
    if (foundUser && password === 'demo123') {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const signup = async (username: string, password: string, fullName: string, email: string): Promise<boolean> => {
    // סימולציה של הרשמה
    const newUser: User = {
      id: String(mockUsers.length + 1),
      username,
      fullName,
      email,
      profileImage: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    };
    
    mockUsers.push(newUser);
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout, 
      isAuthenticated: !!user 
    }}>
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