"use client";

import { AdminAuthProvider } from "../context/AdminAuthContext";
import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminAuthProvider>{children}</AdminAuthProvider>;
}
