"use client";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { FiActivity } from "react-icons/fi";

const getApiUrl = () =>
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://api.puppyhubusa.com"
    : "http://localhost:4000");

interface WebVital {
  id: string;
  url: string;
  lcp: number;
  cls: number;
  inp: number;
  fetchedAt: string;
}

export default function WebVitalsWidget() {
  const [data, setData] = useState<WebVital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${getApiUrl()}/api/seo/web-vitals`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to load web vitals");
        const json = await res.json();
        setData(json);
        setError(null);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const chartData = data
    .slice() // copy
    .reverse() // oldest first
    .map((d) => ({
      date: new Date(d.fetchedAt).toLocaleDateString(),
      LCP: +(d.lcp / 1000).toFixed(2),
      CLS: +d.cls.toFixed(3),
      INP: +(d.inp / 1000).toFixed(2),
    }));

  return (
    <div className="bg-white shadow-soft rounded-xl p-6">
      <div className="flex items-center mb-4">
        <FiActivity className="text-primary mr-2" />
        <h2 className="text-xl font-bold">Core Web Vitals</h2>
      </div>
      {loading ? (
        <p className="text-gray-600">Loading…</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : chartData.length === 0 ? (
        <p className="text-gray-600">No data yet. Run the collection script.</p>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={chartData} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
            <XAxis dataKey="date" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Legend verticalAlign="top" height={24} />
            <Line type="monotone" dataKey="LCP" stroke="#4f46e5" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="CLS" stroke="#16a34a" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="INP" stroke="#f59e0b" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
