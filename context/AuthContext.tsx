"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthService } from "@/services/AuthService";

interface AuthContextType {
  isAuthenticated: boolean | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any | null;
  login: (
    username: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const authState = AuthService.isAuthenticated();
      setIsAuthenticated(authState);

      if (authState) {
        const storedUser = AuthService.getUser();
        setUser(storedUser);
      }
    };
    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    const result = await AuthService.login(username, password);
    if (result.success) {
      setIsAuthenticated(true);
      const loggedInUser = AuthService.getUser();
      setUser(loggedInUser);
    }
    return result;
  };

  const logout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
