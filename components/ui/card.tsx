"use client";
import { ReactNode } from "react";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className ?? "rounded-lg border p-4 bg-background"}>{children}</div>;
}
export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className ?? "mb-2"}>{children}</div>;
}
export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={className ?? "text-lg font-semibold text-white"}>{children}</h3>;
}
export function CardDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={className ?? "text-sm text-muted-foreground text-slate-300"}>{children}</p>;
}
export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}
