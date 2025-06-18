// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import { login as apiLogin, logout as apiLogout, getCurrentUser } from '../services/auth';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: string | null;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(getCurrentUser());
  const navigate = useNavigate();

  const login = async (credentials: { username: string; password: string }) => {
    const { token } = await apiLogin(credentials);
    localStorage.setItem('token', token);
    setUser(getCurrentUser());
    navigate('/');
  };

  const logout = () => {
    apiLogout();
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
