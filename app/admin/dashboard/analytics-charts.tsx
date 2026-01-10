"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, BarChart, Bar, Legend } from "recharts";
import { useEffect, useState } from "react";

const COLORS = ["#B344FF", "#00D9FF", "#FF44EC", "#10B981", "#059669", "#FFB244", "#FFC8DD", "#FF6F61", "#F7B801", "#A459D1"];

function AnalyticsLineChart({ data, xKey, yKey, label, color }: { data: any[]; xKey: string; yKey: string; label: string; color?: string }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 16, right: 24, left: 0, bottom: 8 }}>
        <XAxis dataKey={xKey} axisLine={false} tickLine={false} tick={{ fill: "#B344FF", fontSize: 12 }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: "#8B9CC8", fontSize: 12 }} />
        <Tooltip contentStyle={{ background: "#181a2a", border: "none", color: "#fff" }} />
        <Legend />
        <Line type="monotone" dataKey={yKey} stroke={color || "#B344FF"} strokeWidth={2} dot={false} name={label} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function AnalyticsPieChart({ data, dataKey, nameKey, title }: { data: any[]; dataKey: string; nameKey: string; title: string }) {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey={nameKey}
            cx="50%"
            cy="50%"
            fill="#B344FF"
            label
          >
            {data.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ background: "#181a2a", border: "none", color: "#fff" }} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function AnalyticsBarChart({ data, xKey, yKey, label, color }: { data: any[]; xKey: string; yKey: string; label: string; color?: string }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 16, right: 24, left: 0, bottom: 8 }}>
        <XAxis dataKey={xKey} axisLine={false} tickLine={false} tick={{ fill: "#B344FF", fontSize: 12 }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: "#8B9CC8", fontSize: 12 }} />
        <Tooltip contentStyle={{ background: "#181a2a", border: "none", color: "#fff" }} />
        <Bar dataKey={yKey} fill={color || "#00D9FF"} name={label} />
        <Legend />
      </BarChart>
    </ResponsiveContainer>
  );
}

export { AnalyticsLineChart, AnalyticsPieChart, AnalyticsBarChart };

