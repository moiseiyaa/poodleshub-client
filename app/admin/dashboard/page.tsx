"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAdminAuth } from "../../context/AdminAuthContext";

const getApiUrl = () =>
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://api.puppyhubusa.com"
    : "http://localhost:4000");

type Puppy = {
  id: string;
  name: string;
  breed: string;
  gender: string;
  birthDate: string;
  price: number;
  status: string;
  color: string;
  generation: string;
  vaccinations: string[];
  notes?: string | null;
  images: string[];
  damImage?: string | null;
};

type Application = {
  id: string;
  displayId: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  createdAt: string;
};

type Testimonial = {
  id: string;
  name: string;
  location?: string;
  rating: number;
  text: string;
  puppyName?: string;
  puppyBreed?: string;
  initials?: string;
  date?: string | null;
  createdAt?: string;
};

const TAB_CONFIG = [
  { key: "overview", label: "Overview" },
  { key: "applications", label: "Applications" },
  { key: "puppies", label: "Puppies" },
  { key: "testimonials", label: "Testimonials" },
];

function useLiveCollection<T>(
  path: string,
  { intervalMs = 15000, token }: { intervalMs?: number; token?: string | null }
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setError(null);
      const res = await fetch(`${getApiUrl()}${path}`, {
        headers: token ? { admin_token: token } : undefined,
      });
      if (!res.ok) throw new Error("Failed to load data");
      setData(await res.json());
    } catch (err: any) {
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, intervalMs);
    const handleFocus = () => fetchData();
    window.addEventListener("visibilitychange", handleFocus);
    return () => {
      clearInterval(id);
      window.removeEventListener("visibilitychange", handleFocus);
    };
  }, [path, intervalMs, token]);

  return { data, loading, error, refetch: fetchData };
}

function OverviewPanel({
  applications,
  puppies,
  testimonials,
}: {
  applications: Application[];
  puppies: Puppy[];
  testimonials: Testimonial[];
}) {
  const metrics = useMemo(() => {
    const available = puppies.filter((p) => p.status === "available").length;
    const reserved = puppies.filter((p) => p.status === "reserved").length;
    const adopted = puppies.filter((p) => p.status === "adopted").length;
    return [
      { label: "Applications", value: applications.length, tone: "blue" },
      { label: "Available puppies", value: available, tone: "green" },
      { label: "Reserved", value: reserved, tone: "amber" },
      { label: "Adopted", value: adopted, tone: "slate" },
      { label: "Testimonials", value: testimonials.length, tone: "purple" },
    ];
  }, [applications, puppies, testimonials]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4 shadow-sm"
          >
            <p className="text-xs uppercase tracking-wide text-slate-500">{m.label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{m.value}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-sm text-slate-600">
          Bold management workspace: live-refreshing lists, inline editing, and safeguarded
          actions with confirmations. Data auto-refreshes every ~15s and on focus.
        </p>
      </div>
    </div>
  );
}

function ApplicationsPanel({ token }: { token: string | null }) {
  const { data, loading, error, refetch } = useLiveCollection<Application>(
    "/api/applications",
    { token }
  );

  if (loading) return <div className="py-6 text-center text-slate-500">Loading applications…</div>;
  if (error) return <div className="py-4 text-red-600">{error}</div>;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Applications</h2>
        <button
          onClick={refetch}
          className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Refresh
        </button>
      </div>
      {!data.length ? (
        <div className="text-sm text-slate-500">No applications yet.</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="px-3 py-2 text-left">ID</th>
                <th className="px-3 py-2 text-left">Applicant</th>
                <th className="px-3 py-2 text-left">Email</th>
                <th className="px-3 py-2 text-left">Status</th>
                <th className="px-3 py-2 text-left">Submitted</th>
                <th className="px-3 py-2 text-left">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50">
                  <td className="px-3 py-2 font-mono text-xs">{app.displayId || app.id}</td>
                  <td className="px-3 py-2">{app.firstName} {app.lastName}</td>
                  <td className="px-3 py-2 text-slate-600">{app.email}</td>
                  <td className="px-3 py-2">
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      app.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : app.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-xs text-slate-500">
                    {new Date(app.createdAt).toLocaleString()}
                  </td>
                  <td className="px-3 py-2">
                    <Link href={`/admin/applications/${app.id}`} className="text-sm font-medium text-slate-900 hover:underline">
                      Open
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function PuppiesManager({ token }: { token: string | null }) {
  const { data: puppies, loading, error, refetch } = useLiveCollection<Puppy>("/api/puppies", {
    token,
    intervalMs: 12000,
  });
  const [form, setForm] = useState<Puppy & { imagesText: string; vaccinationsText: string }>({
    id: "",
    name: "",
    breed: "",
    gender: "",
    birthDate: "",
    price: 0,
    status: "available",
    color: "",
    generation: "",
    vaccinations: [],
    notes: "",
    images: [],
    damImage: "",
    imagesText: "",
    vaccinationsText: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const resetForm = () => {
    setEditingId(null);
    setForm({
      id: "",
      name: "",
      breed: "",
      gender: "",
      birthDate: "",
      price: 0,
      status: "available",
      color: "",
      generation: "",
      vaccinations: [],
      notes: "",
      images: [],
      damImage: "",
      imagesText: "",
      vaccinationsText: "",
    });
  };

  const handleEdit = (puppy: Puppy) => {
    setEditingId(puppy.id);
    setForm({
      ...puppy,
      imagesText: puppy.images?.join(", ") || "",
      vaccinationsText: puppy.vaccinations?.join(", ") || "",
    });
  };

  const submit = async () => {
    if (!token) {
      setActionError("Admin token missing. Please log in again.");
      return;
    }
    setSaving(true);
    setActionError(null);
    try {
      const payload = {
        name: form.name,
        breed: form.breed,
        gender: form.gender,
        birthDate: form.birthDate,
        price: Number(form.price),
        status: form.status,
        color: form.color,
        generation: form.generation,
        vaccinations: form.vaccinationsText
          ? form.vaccinationsText.split(",").map((v) => v.trim()).filter(Boolean)
          : [],
        notes: form.notes,
        images: form.imagesText
          ? form.imagesText.split(",").map((v) => v.trim()).filter(Boolean)
          : [],
        damImage: form.damImage,
      };

      const method = editingId ? "PATCH" : "POST";
      const url = editingId
        ? `${getApiUrl()}/api/puppies/${editingId}`
        : `${getApiUrl()}/api/puppies`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          admin_token: token,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Save failed");
      }
      resetForm();
      await refetch();
    } catch (err: any) {
      setActionError(err.message || "Unable to save puppy");
    } finally {
      setSaving(false);
    }
  };

  const destroy = async (id: string) => {
    if (!token) return;
    if (!confirm("Delete this puppy? This cannot be undone.")) return;
    try {
      const res = await fetch(`${getApiUrl()}/api/puppies/${id}`, {
        method: "DELETE",
        headers: { admin_token: token },
      });
      if (!res.ok) throw new Error("Failed to delete");
      await refetch();
    } catch (err: any) {
      setActionError(err.message || "Unable to delete puppy");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Puppies</h2>
        <div className="flex gap-2">
          <button
            onClick={resetForm}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            New
          </button>
          <button
            onClick={refetch}
            className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-2">
          {loading ? (
            <div className="py-4 text-slate-500">Loading puppies…</div>
          ) : error ? (
            <div className="py-4 text-red-600">{error}</div>
          ) : puppies.length === 0 ? (
            <div className="text-sm text-slate-500">No puppies yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-3 py-2 text-left">Name</th>
                    <th className="px-3 py-2 text-left">Breed</th>
                    <th className="px-3 py-2 text-left">Status</th>
                    <th className="px-3 py-2 text-left">Price</th>
                    <th className="px-3 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {puppies.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="px-3 py-2 font-medium text-slate-900">{p.name}</td>
                      <td className="px-3 py-2 text-slate-700">{p.breed}</td>
                      <td className="px-3 py-2">
                        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${
                          p.status === "available"
                            ? "bg-green-100 text-green-700"
                            : p.status === "reserved"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-slate-200 text-slate-700"
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-3 py-2">${p.price}</td>
                      <td className="px-3 py-2 space-x-2">
                        <button
                          onClick={() => handleEdit(p)}
                          className="text-sm font-medium text-slate-900 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => destroy(p.id)}
                          className="text-sm font-medium text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-md font-semibold text-slate-900">
              {editingId ? "Edit puppy" : "Add puppy"}
            </h3>
          </div>
          {actionError && <p className="mt-2 text-sm text-red-600">{actionError}</p>}
          <div className="mt-3 space-y-3">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Name"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
            <input
              value={form.breed}
              onChange={(e) => setForm({ ...form, breed: e.target.value })}
              placeholder="Breed"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
            <div className="flex gap-2">
              <input
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                placeholder="Gender"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
              <input
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                placeholder="Status"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
            </div>
            <div className="flex gap-2">
              <input
                type="date"
                value={form.birthDate}
                onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                placeholder="Price"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
            </div>
            <div className="flex gap-2">
              <input
                value={form.color}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
                placeholder="Color"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
              <input
                value={form.generation}
                onChange={(e) => setForm({ ...form, generation: e.target.value })}
                placeholder="Generation"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
            </div>
            <textarea
              value={form.vaccinationsText}
              onChange={(e) => setForm({ ...form, vaccinationsText: e.target.value })}
              placeholder="Vaccinations (comma separated)"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
            <textarea
              value={form.imagesText}
              onChange={(e) => setForm({ ...form, imagesText: e.target.value })}
              placeholder="Image URLs (comma separated)"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
            <input
              value={form.damImage ?? ""}
              onChange={(e) => setForm({ ...form, damImage: e.target.value })}
              placeholder="Dam image URL (optional)"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
            <textarea
              value={form.notes ?? ""}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Notes"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
            <button
              onClick={submit}
              disabled={saving}
              className="w-full rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
            >
              {saving ? "Saving..." : editingId ? "Update puppy" : "Add puppy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TestimonialsManager({ token }: { token: string | null }) {
  const { data, loading, error, refetch } = useLiveCollection<Testimonial>("/api/testimonials", {
    token,
    intervalMs: 20000,
  });
  const [form, setForm] = useState<Testimonial>({
    id: "",
    name: "",
    location: "",
    rating: 5,
    text: "",
    puppyName: "",
    puppyBreed: "",
    initials: "",
    date: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const reset = () => {
    setEditingId(null);
    setForm({
      id: "",
      name: "",
      location: "",
      rating: 5,
      text: "",
      puppyName: "",
      puppyBreed: "",
      initials: "",
      date: "",
    });
  };

  const handleEdit = (t: Testimonial) => {
    setEditingId(t.id);
    setForm({
      ...t,
      date: t.date ? t.date.substring(0, 10) : "",
    });
  };

  const submit = async () => {
    if (!token) {
      setActionError("Admin token missing. Please log in again.");
      return;
    }
    setSaving(true);
    setActionError(null);
    try {
      const payload = {
        name: form.name,
        location: form.location,
        rating: Number(form.rating),
        text: form.text,
        puppyName: form.puppyName,
        puppyBreed: form.puppyBreed,
        initials: form.initials,
        date: form.date || null,
      };
      const method = editingId ? "PATCH" : "POST";
      const url = editingId
        ? `${getApiUrl()}/api/testimonials/${editingId}`
        : `${getApiUrl()}/api/testimonials`;
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          admin_token: token,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Save failed");
      }
      reset();
      await refetch();
    } catch (err: any) {
      setActionError(err.message || "Unable to save testimonial");
    } finally {
      setSaving(false);
    }
  };

  const destroy = async (id: string) => {
    if (!token) return;
    if (!confirm("Delete this testimonial?")) return;
    try {
      const res = await fetch(`${getApiUrl()}/api/testimonials/${id}`, {
        method: "DELETE",
        headers: { admin_token: token },
      });
      if (!res.ok) throw new Error("Failed to delete");
      await refetch();
    } catch (err: any) {
      setActionError(err.message || "Unable to delete testimonial");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Testimonials</h2>
        <div className="flex gap-2">
          <button
            onClick={reset}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            New
          </button>
          <button
            onClick={refetch}
            className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Refresh
          </button>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-2">
          {loading ? (
            <div className="py-4 text-slate-500">Loading testimonials…</div>
          ) : error ? (
            <div className="py-4 text-red-600">{error}</div>
          ) : data.length === 0 ? (
            <div className="text-sm text-slate-500">No testimonials yet.</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {data.map((t) => (
                <div key={t.id} className="py-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                      <p className="text-xs text-slate-500">
                        {t.location || "No location"} • {t.puppyBreed || "Breed N/A"}
                      </p>
                    </div>
                    <div className="space-x-2">
                      <button
                        onClick={() => handleEdit(t)}
                        className="text-sm font-medium text-slate-900 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => destroy(t.id)}
                        className="text-sm font-medium text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-slate-700">{t.text}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Rating: {t.rating} • {t.date ? new Date(t.date).toLocaleDateString() : "No date"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-md font-semibold text-slate-900">
            {editingId ? "Edit testimonial" : "Add testimonial"}
          </h3>
          {actionError && <p className="mt-2 text-sm text-red-600">{actionError}</p>}
          <div className="mt-3 space-y-3">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Name"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
            <div className="flex gap-2">
              <input
                value={form.location || ""}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Location"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
              <input
                value={form.initials || ""}
                onChange={(e) => setForm({ ...form, initials: e.target.value })}
                placeholder="Initials"
                className="w-28 rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
            </div>
            <input
              type="number"
              value={form.rating}
              min={1}
              max={5}
              onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
              placeholder="Rating (1-5)"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
            <textarea
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              placeholder="Testimonial text"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
            <div className="flex gap-2">
              <input
                value={form.puppyName || ""}
                onChange={(e) => setForm({ ...form, puppyName: e.target.value })}
                placeholder="Puppy name"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
              <input
                value={form.puppyBreed || ""}
                onChange={(e) => setForm({ ...form, puppyBreed: e.target.value })}
                placeholder="Puppy breed"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
            </div>
            <input
              type="date"
              value={form.date || ""}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
            <button
              onClick={submit}
              disabled={saving}
              className="w-full rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
            >
              {saving ? "Saving..." : editingId ? "Update testimonial" : "Add testimonial"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const { isAuthenticated, logout, token } = useAdminAuth();
  const [tab, setTab] = useState<string>("overview");

  const {
    data: apps,
    loading: appsLoading,
    error: appsError,
    refetch: refetchApps,
  } = useLiveCollection<Application>("/api/applications", { token, intervalMs: 15000 });
  const {
    data: puppies,
    loading: puppiesLoading,
    error: puppiesError,
    refetch: refetchPuppies,
  } = useLiveCollection<Puppy>("/api/puppies", { token, intervalMs: 12000 });
  const {
    data: testimonials,
    loading: testimonialsLoading,
    error: testimonialsError,
    refetch: refetchTestimonials,
  } = useLiveCollection<Testimonial>("/api/testimonials", { token, intervalMs: 20000 });

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-slate-100 py-6 px-3 md:px-6">
      <div className="mx-auto flex max-w-7xl gap-6">
        <aside className="w-64 rounded-2xl bg-slate-900 px-4 py-6 text-slate-100 shadow-xl">
          <div className="mb-8">
            <div className="text-xl font-extrabold tracking-tight">PuppyHub</div>
            <div className="mt-1 text-xs text-slate-400">Admin Workspace</div>
          </div>
          <nav className="space-y-1">
            {TAB_CONFIG.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  tab === key
                    ? "bg-white text-slate-900"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span>{label}</span>
                {tab === key && <span className="h-2 w-2 rounded-full bg-blue-500" />}
              </button>
            ))}
          </nav>
          <div className="mt-8 space-y-2 text-xs text-slate-400">
            <p>Live sync every 12-20s + on focus.</p>
            <p>Use admin token for mutating actions.</p>
          </div>
          <button
            onClick={logout}
            className="mt-6 w-full rounded-lg px-3 py-2 text-left text-sm text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
          >
            Log out
          </button>
        </aside>

        <main className="flex-1 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <header className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Admin Dashboard</h1>
              <p className="text-sm text-slate-500">
                Bold management experience: applications, puppies, testimonials in one place.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  refetchApps();
                  refetchPuppies();
                  refetchTestimonials();
                }}
                className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Sync now
              </button>
            </div>
          </header>

          <section className="max-h-[80vh] overflow-auto px-4 py-4">
            {tab === "overview" && (
              <OverviewPanel
                applications={apps}
                puppies={puppies}
                testimonials={testimonials}
              />
            )}
            {tab === "applications" && <ApplicationsPanel token={token} />}
            {tab === "puppies" && <PuppiesManager token={token} />}
            {tab === "testimonials" && <TestimonialsManager token={token} />}
          </section>
        </main>
      </div>
    </div>
  );
}
