"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../../config/api";
import { getCookie, removeCookie } from "@/app/lib/cookie";
import { SESSION_COOKIE_NAME, SSO_BASE } from "@/app/components/SessionGuard";
import { useRouter } from "next/navigation";

interface User {
  userId: string;
  employeeId?: any;
  fullName: string;
  userName: string;
  roleCodes: number[];
  permissionCodes: number[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isLoggingOut: boolean;
  refreshUser: () => Promise<void>;
  Logout: () => void;
  login: () => void;
  logout: () => void;
  isLoggedIn: any;
  isAdmin: any;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isLoggingOut: false,
  refreshUser: async () => { },
  Logout: () => { }, login: () => { }, logout: () => { },
  isLoggedIn: false,
  isAdmin: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const sessionId = getCookie(SESSION_COOKIE_NAME);
      if (!sessionId) {
        return;
      }

      const res = await api.get(`Account/Login?sessionId=${sessionId}`);

      if (res.data) {
        setUser(res.data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const refreshUser = async () => fetchUser();

  const login = () => {
    const returnUrl = encodeURIComponent(window.location.href);
    window.location.href = `${SSO_BASE}/account/login?returnUrl=${returnUrl}`;
  };
  const router = useRouter()

  const logout = () => {
    setIsLoggingOut(true);
    removeCookie(SESSION_COOKIE_NAME);
    try {
      localStorage.removeItem(SESSION_COOKIE_NAME);
    } catch (e) { }
    setUser(null);
    router.push('/')

  };

  const isLoggedIn = !!user;
  const isAdmin = isLoggedIn;
  const Logout = () => {
    setIsLoggingOut(true);
    removeCookie(SESSION_COOKIE_NAME);
    setUser(null);
    router.push('/')
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isLoggingOut,
        login,
        logout,
        refreshUser,
        Logout,
        isLoggedIn,
        isAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
