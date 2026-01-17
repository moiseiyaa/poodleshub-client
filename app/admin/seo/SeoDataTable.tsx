"use client";
import { useState } from "react";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Pagination {
  page: number;
  pages: number;
  total: number;
  limit: number;
}

interface Props<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  pagination: Pagination;
  onPageChange: (page: number) => void;
}

export default function SeoDataTable<T>({ data, columns, pagination, onPageChange }: Props<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto rounded-xl border border-[#1A2A3F] bg-[#0F1F3A] shadow-lg">
      <table className="min-w-full text-sm">
        <thead className="border-b border-[#1A2A3F]">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th key={header.id} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#8B9CC8]">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-[#1A2A3F]">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-[#1A2A3F]/50 transition-colors">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3 text-white">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4 text-xs text-[#8B9CC8]">
        <div>
          Page {pagination.page} of {pagination.pages} • {pagination.total} items
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="rounded p-1 disabled:opacity-40 hover:bg-[#0A1628]"
          >
            <FiChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.pages}
            className="rounded p-1 disabled:opacity-40 hover:bg-[#0A1628]"
          >
            <FiChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
