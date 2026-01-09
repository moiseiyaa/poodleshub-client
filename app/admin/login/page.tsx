"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "../../context/AdminAuthContext";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAdminAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL ||
        (process.env.NODE_ENV === 'production'
          ? 'https://api.puppyhubusa.com'
          : 'http://localhost:4000');
      const res = await fetch(`${apiUrl}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed.");
        setLoading(false);
        return;
      }
      
      // Save token to context + localStorage
      login(data.token);
      router.push("/admin/dashboard");
    } catch (err: unknown) {
      console.error('Admin login error:', err);
      setError("Server error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-8">
        <h2 className="mb-8 text-center text-3xl font-bold text-primary-700">Admin Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          <button
            type="submit"
            className="btn btn-primary w-full mt-4"
            disabled={loading || !email || !password}
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
