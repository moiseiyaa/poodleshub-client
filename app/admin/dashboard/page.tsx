"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAdminAuth } from "../../context/AdminAuthContext";

const TABS = [
  { key: "applications", label: "Applications" },
  { key: "puppies", label: "Puppies" },
  { key: "reservations", label: "Reservations" },
  { key: "notifications", label: "Notifications" },
  { key: "clients", label: "Clients" },
];

const PUPPY_STATUS = ["available", "reserved", "adopted"];

const getApiUrl = () =>
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://api.puppyhubusa.com"
    : "http://localhost:4000");

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
      const res = await fetch(`${getApiUrl()}/api/puppies`);
      if (!res.ok) throw new Error("Failed to fetch puppies");
      setPuppies(await res.json());
      setLoading(false);
    } catch (err: any) {
      setError("Could not load puppies.");
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPuppies();
  }, []);

  async function handleStatusChange(id: string, status: string) {
    if (!token) return;
    setUpdateStatus((us) => ({ ...us, [id]: true }));
    setError("");
    try {
      const res = await fetch(`${getApiUrl()}/api/puppies/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          admin_token: token,
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update puppy");
      }
      // Update local state
      setPuppies((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status } : p))
      );
    } catch (err: any) {
      setError(err.message || "Could not update puppy");
    } finally {
      setUpdateStatus((us) => ({ ...us, [id]: false }));
    }
  }

  if (loading) return <div className="text-center py-8">Loading puppies…</div>;
  if (error) return <div className="text-red-500 py-4">{error}</div>;

  if (!puppies.length)
    return <div className="text-gray-500">No puppies found.</div>;

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
          {puppies.map((puppy) => (
            <tr key={puppy.id} className="border-t hover:bg-primary-50">
              <td className="py-2 px-2">{puppy.name}</td>
              <td className="py-2 px-2">{puppy.breed}</td>
              <td className="py-2 px-2">
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    puppy.status === "available"
                      ? "bg-green-100 text-green-800"
                      : puppy.status === "reserved"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {puppy.status}
                </span>
              </td>
              <td className="py-2 px-2">
                <select
                  className="border rounded px-2 py-1 focus:border-primary-500"
                  value={puppy.status}
                  onChange={(e) => handleStatusChange(puppy.id, e.target.value)}
                  disabled={updateStatus[puppy.id]}
                >
                  {PUPPY_STATUS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                {updateStatus[puppy.id] && (
                  <span className="ml-2 text-primary-500 text-xs">
                    Updating…
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ApplicationsPanel() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchApplications() {
    try {
      setError(null);
      const res = await fetch(`${getApiUrl()}/api/applications`);
      if (!res.ok) throw new Error("Failed to fetch applications");
      const data = await res.json();
      setApplications(data);
    } catch (err: any) {
      console.error("Failed to fetch applications", err);
      setError(err.message || "Could not load applications");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Initial load
    fetchApplications();

    // Simple polling for near real-time updates (every 30 seconds)
    const intervalId = setInterval(fetchApplications, 30000);
    return () => clearInterval(intervalId);
  }, []);

  if (loading) return <div className="text-center py-8">Loading applications…</div>;
  if (error)
    return <div className="text-red-500 py-4">{error}</div>;

  if (!applications.length)
    return <div className="text-gray-500">No applications found.</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg bg-white shadow">
        <thead>
          <tr className="bg-primary-100 text-primary-700">
            <th className="py-2 px-2 font-semibold text-left">ID</th>
            <th className="py-2 px-2 font-semibold text-left">Applicant</th>
            <th className="py-2 px-2 font-semibold text-left">Email</th>
            <th className="py-2 px-2 font-semibold text-left">Status</th>
            <th className="py-2 px-2 font-semibold text-left">Submitted</th>
            <th className="py-2 px-2 font-semibold text-left">View</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id} className="border-t hover:bg-primary-50">
              <td className="py-2 px-2 font-mono text-xs">
                {app.displayId || app.id}
              </td>
              <td className="py-2 px-2">
                {app.firstName} {app.lastName}
              </td>
              <td className="py-2 px-2 text-sm">{app.email}</td>
              <td className="py-2 px-2">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  app.status === "approved"
                    ? "bg-green-100 text-green-800"
                    : app.status === "rejected"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {app.status}
                </span>
              </td>
              <td className="py-2 px-2 text-xs text-gray-600">
                {new Date(app.createdAt).toLocaleString()}
              </td>
              <td className="py-2 px-2">
                <Link
                  href={`/admin/applications/${app.id}`}
                  className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                >
                  View
                </Link>
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
  const [tab, setTab] = useState("applications");

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-slate-100 py-6 px-3 md:px-6">
      <div className="max-w-6xl mx-auto h-full flex gap-6">
        {/* Sidebar */}
        <aside className="w-60 bg-slate-900 text-slate-100 rounded-2xl shadow-lg flex flex-col py-6 px-4">
          <div className="mb-8">
            <div className="text-xl font-extrabold tracking-tight">PuppyHub</div>
            <div className="text-xs text-slate-400 mt-1">Admin Workspace</div>
          </div>
          <nav className="flex-1 space-y-1">
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  tab === key
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span>{label}</span>
                {tab === key && (
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                )}
              </button>
            ))}
          </nav>
          <button
            onClick={logout}
            className="mt-6 w-full text-left text-sm text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-lg transition-colors"
          >
            Log out
          </button>
        </aside>

        {/* Main content */}
        <main className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col">
          {/* Header */}
          <header className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-slate-900">
                {tab === "applications"
                  ? "Application Management"
                  : tab === "puppies"
                  ? "Puppies Inventory"
                  : "Admin Dashboard"}
              </h1>
              <p className="text-xs md:text-sm text-slate-500 mt-1">
                Monitor submissions, manage puppies, and keep your pipeline up to date.
              </p>
            </div>
          </header>

          {/* Content area */}
          <section className="flex-1 px-4 md:px-6 py-4 overflow-auto">
            {tab === "applications" && <ApplicationsPanel />}
            {tab === "puppies" && <PuppiesPanel />}
            {tab === "reservations" && (
              <section className="text-slate-500 text-sm">
                <h2 className="text-lg font-semibold mb-2 text-slate-800">
                  Reservations
                </h2>
                <p>(Feature coming soon)</p>
              </section>
            )}
            {tab === "notifications" && (
              <section className="text-slate-500 text-sm">
                <h2 className="text-lg font-semibold mb-2 text-slate-800">
                  Notifications
                </h2>
                <p>(Feature coming soon)</p>
              </section>
            )}
            {tab === "clients" && (
              <section className="text-slate-500 text-sm">
                <h2 className="text-lg font-semibold mb-2 text-slate-800">
                  Clients
                </h2>
                <p>(Feature coming soon)</p>
              </section>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
