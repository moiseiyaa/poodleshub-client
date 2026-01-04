"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { toast } from "react-hot-toast";

interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  tags?: string[];
  published?: boolean;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

const getApiUrl = () =>
  process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === "production" ? "https://api.puppyhubusa.com" : "http://localhost:4000");

export default function AdminBlog() {
  const { token } = useAdminAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${getApiUrl()}/api/blog`, {
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      setPosts(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token === null) return;
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchPosts();
  }, [token, router]);

  const handleSave = async (form: BlogPost) => {
    setSaving(true);
    try {
      const method = form.id ? 'PUT' : 'POST';
      const url = form.id ? `${getApiUrl()}/api/blog/${form.id}` : `${getApiUrl()}/api/blog`;
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          admin_token: token || '',
          Authorization: token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify(form)
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Save failed');
      }
      toast.success('Saved');
      setEditing(null);
      await fetchPosts();
    } catch (err: Error) {
      toast.error(err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post?')) return;
    try {
      const res = await fetch(`${getApiUrl()}/api/blog/${id}`, {
        method: 'DELETE',
        headers: { admin_token: token || '', Authorization: token ? `Bearer ${token}` : '' }
      });
      if (!res.ok) throw new Error('Delete failed');
      toast.success('Deleted');
      await fetchPosts();
    } catch (err: Error) {
      toast.error(err.message || 'Failed to delete');
    }
  };

  if (!token) return <div className="min-h-screen flex items-center justify-center text-white">Redirecting...</div>;

  return (
    <div className="min-h-screen bg-[#0A1628] p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Blog Management</h1>
          <button onClick={() => setEditing({ title: '', slug: '', excerpt: '', content: '', tags: [], published: false } as BlogPost)} className="rounded bg-linear-to-r from-[#B344FF] to-[#FF44EC] px-4 py-2 text-white">Add Post</button>
        </div>

        {editing ? (
          <BlogForm post={editing} onSave={handleSave} onCancel={() => setEditing(null)} saving={saving} />
        ) : (
          <div className="rounded-xl border border-[#1A2A3F] bg-[#0F1F3A] p-4">
            {loading ? (
              <div className="text-[#8B9CC8]">Loading...</div>
            ) : posts.length === 0 ? (
              <div className="text-[#8B9CC8]">No posts found.</div>
            ) : (
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-[#8B9CC8]">
                    <th className="px-3 py-2">Title</th>
                    <th className="px-3 py-2">Slug</th>
                    <th className="px-3 py-2">Published</th>
                    <th className="px-3 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map(p => (
                    <tr key={p.id} className="border-t border-[#1A2A3F]">
                      <td className="px-3 py-2 text-white">{p.title}</td>
                      <td className="px-3 py-2 text-[#8B9CC8]">{p.slug}</td>
                      <td className="px-3 py-2 text-[#8B9CC8]">{p.published ? 'Yes' : 'No'}</td>
                      <td className="px-3 py-2">
                        <div className="flex gap-2">
                          <button onClick={() => setEditing(p)} className="text-[#8B9CC8]">Edit</button>
                          <button onClick={() => handleDelete(p.id || '')} className="text-red-400">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function BlogForm({ post, onSave, onCancel, saving }: { post: BlogPost; onSave: (form: BlogPost) => Promise<void>; onCancel: () => void; saving: boolean }) {
  const [form, setForm] = useState<BlogPost>(post);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: BlogPost = { ...form, tags: form.tags || [] };
    void onSave(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-[#1A2A3F] bg-[#0F1F3A] p-6">
      <div className="grid gap-4">
        <input value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Title" className="p-2 bg-[#0A1628] text-white rounded" />
        <input value={form.slug || ''} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="Slug" className="p-2 bg-[#0A1628] text-white rounded" />
        <input value={form.excerpt || ''} onChange={e => setForm({ ...form, excerpt: e.target.value })} placeholder="Excerpt" className="p-2 bg-[#0A1628] text-white rounded" />
        <textarea value={form.content || ''} onChange={e => setForm({ ...form, content: e.target.value })} rows={8} placeholder="Content" className="p-2 bg-[#0A1628] text-white rounded" />
        <input value={(form.tags || []).join(', ')} onChange={e => setForm({ ...form, tags: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean) })} placeholder="tags comma separated" className="p-2 bg-[#0A1628] text-white rounded" />
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={!!form.published} onChange={e => setForm({ ...form, published: e.target.checked })} /> Published
        </label>
      </div>

      <div className="mt-4 flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-white">Cancel</button>
        <button type="submit" disabled={saving} className="px-4 py-2 bg-[#B344FF] text-white rounded">{saving ? 'Saving...' : 'Save'}</button>
      </div>
    </form>
  );
}
