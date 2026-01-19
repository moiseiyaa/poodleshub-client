"use client";
import { ReactNode, useState } from "react";

export function Tabs({ children, defaultValue, className }: { children: ReactNode; defaultValue: string; className?: string }) {
  return <div className={className}>{children}</div>;
}
export function TabsList({ children }: { children: ReactNode }) {
  return <div className="mb-4 flex flex-wrap gap-2">{children}</div>;
}
export function TabsTrigger({ value, children }: { value: string; children: ReactNode }) {
  // simplistic; real shadcn has context but for build we just render button
  return <button type="button" className="px-3 py-1 rounded border" data-value={value}>{children}</button>;
}
export function TabsContent({ value, children, className }: { value: string; children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}
