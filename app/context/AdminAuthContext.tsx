"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface AdminAuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Try reading token from localStorage
    const t = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
    if (t) setToken(t);
  }, []);

  function login(token: string) {
    setToken(token);
    if (typeof window !== "undefined") {
      localStorage.setItem("admin_token", token);
    }
  }

  function logout() {
    setToken(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_token");
    }
    router.push("/admin/login");
  }

  const value = {
    token,
    isAuthenticated: !!token,
    login,
    logout
  };

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return ctx;
}
