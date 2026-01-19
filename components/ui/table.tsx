"use client";
import { ReactNode } from "react";

export function Table({ children }: { children: ReactNode }) {
  return <table className="w-full text-sm">{children}</table>;
}
export function TableHeader({ children }: { children: ReactNode }) {
  return <thead className="border-b">{children}</thead>;
}
export function TableBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>;
}
export function TableRow({ children }: { children: ReactNode }) {
  return <tr>{children}</tr>;
}
export function TableHead({ children, className }: { children: ReactNode; className?: string }) {
  return <th className={className}>{children}</th>;
}
export function TableCell({ children, className }: { children: ReactNode; className?: string }) {
  return <td className={className}>{children}</td>;
}
