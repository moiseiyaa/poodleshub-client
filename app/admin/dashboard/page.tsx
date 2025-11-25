"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "../../context/AdminAuthContext";

const TABS = [
  { key: "puppies", label: "Puppies" },
  { key: "reservations", label: "Reservations" },
  { key: "notifications", label: "Notifications" },
  { key: "clients", label: "Clients" },
];

const PUPPY_STATUS = ["available", "reserved", "adopted"];

function PuppiesPanel() {
  const { token } = useAdminAuth();
  const [puppies, setPuppies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updateStatus, setUpdateStatus] = useState<{ [k: string]: boolean }>({});

  async function fetchPuppies() {
    setLoading(true);
    setError("");
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/api/puppies`);
      if (!res.ok) throw new Error("Failed to fetch puppies");
      setPuppies(await res.json());
      setLoading(false);
    } catch (err: any) {
      setError("Could not load puppies.");
      setLoading(false);
    }
  }

  useEffect(() => { fetchPuppies(); }, []);

  async function handleStatusChange(id: string, status: string) {
    if (!token) return;
    setUpdateStatus((us) => ({ ...us, [id]: true }));
    setError("");
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/api/puppies/${id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "admin_token": token
        },
        body: JSON.stringify({ status })
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update puppy");
      }
      // Update local state
      setPuppies((prev) => prev.map(p => p.id === id ? { ...p, status } : p));
    } catch (err: any) {
      setError(err.message || "Could not update puppy");
    } finally {
      setUpdateStatus((us) => ({ ...us, [id]: false }));
    }
  }

  if (loading) return <div className="text-center py-8">Loading puppies…</div>;
  if (error) return <div className="text-red-500 py-4">{error}</div>;

  if (!puppies.length) return <div className="text-gray-500">No puppies found.</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg bg-white shadow">
        <thead>
          <tr className="bg-primary-100 text-primary-700">
            <th className="py-2 px-2 font-semibold text-left">Name</th>
            <th className="py-2 px-2 font-semibold text-left">Breed</th>
            <th className="py-2 px-2 font-semibold text-left">Status</th>
            <th className="py-2 px-2 font-semibold text-left">Edit</th>
          </tr>
        </thead>
        <tbody>
          {puppies.map(puppy => (
            <tr key={puppy.id} className="border-t hover:bg-primary-50">
              <td className="py-2 px-2">{puppy.name}</td>
              <td className="py-2 px-2">{puppy.breed}</td>
              <td className="py-2 px-2">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  puppy.status === "available"
                    ? "bg-green-100 text-green-800"
                    : puppy.status === "reserved"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-200 text-gray-700"
                }`}>
                  {puppy.status}
                </span>
              </td>
              <td className="py-2 px-2">
                <select
                  className="border rounded px-2 py-1 focus:border-primary-500"
                  value={puppy.status}
                  onChange={e => handleStatusChange(puppy.id, e.target.value)}
                  disabled={updateStatus[puppy.id]}
                >
                  {PUPPY_STATUS.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                {updateStatus[puppy.id] && (
                  <span className="ml-2 text-primary-500 text-xs">Updating…</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAdminAuth();
  const [tab, setTab] = useState("puppies");

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-8 px-2 md:px-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow p-4 md:p-8">
        <div className="flex flex-row justify-between items-center mb-4 gap-2">
          <h1 className="text-2xl font-bold text-primary-700">Admin Dashboard</h1>
          <button onClick={logout} className="btn btn-secondary ml-2">Log out</button>
        </div>
        {/* Tabs */}
        <nav className="flex border-b mb-6 space-x-2 overflow-x-auto" role="tablist">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              role="tab"
              aria-selected={tab === key}
              className={`px-3 py-2 whitespace-nowrap rounded-t-lg font-medium transition-colors duration-200 ${
                tab === key ? "bg-primary-100 text-primary-700 border-b-2 border-primary-500" : "text-gray-500 hover:text-primary-700"
              }`}
              onClick={() => setTab(key)}
            >
              {label}
            </button>
          ))}
        </nav>
        {/* Tab content */}
        <div className="p-2 md:p-4">
          {tab === "puppies" && <PuppiesPanel />}
          {tab === "reservations" && (
            <section>
              <h2 className="text-xl font-semibold mb-2">Reservations</h2>
              <div className="text-gray-500">(Feature coming soon)</div>
            </section>
          )}
          {tab === "notifications" && (
            <section>
              <h2 className="text-xl font-semibold mb-2">Notifications</h2>
              <div className="text-gray-500">(Feature coming soon)</div>
            </section>
          )}
          {tab === "clients" && (
            <section>
              <h2 className="text-xl font-semibold mb-2">Clients</h2>
              <div className="text-gray-500">(Feature coming soon)</div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
