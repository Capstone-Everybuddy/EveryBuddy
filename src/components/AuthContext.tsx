import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  role: 'seoulmate' | 'buddy';
  idx: number;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: 'seoulmate' | 'buddy', user: Omit<User, 'role'>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: 'seoulmate' | 'buddy', user: Omit<User, 'role'>) => {
    setUser({ role, ...user });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
