"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { toast } from "react-hot-toast";
import { FiBold, FiItalic, FiList, FiLink2, FiImage, FiFeather, FiType, FiAlignLeft } from "react-icons/fi";
import { addLocalBlogPost } from "../../data/blog";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  author?: {
    name: string;
    role: string;
    avatar: string;
  };
  tags?: string[];
  published?: boolean;
  publishedAt?: string;
  readTime?: number;
  category?: string;
  featuredImage?: string;
  images?: string[];
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
      if (!res.ok) {
        console.error('API error:', data);
        toast.error(data.error || 'Failed to fetch blogs');
        setPosts([]);
        return;
      }
      setPosts(data.data || []);
    } catch (err: unknown) {
      console.error('Fetch error:', err);
      const message = err instanceof Error ? err.message : 'Failed to fetch blogs';
      toast.error(message);
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
      // get server response and also persist a local copy so the public blog listing (which reads from localStorage/static data)
      // immediately reflects the change without waiting for any content pipeline.
      const body = await res.json().catch(() => ({}));
      const saved = body.data || body;
      try {
        const estimateReadTime = (text?: string) => {
          if (!text) return 1;
          const words = text.split(/\s+/).filter(Boolean).length;
          return Math.max(1, Math.ceil(words / 200));
        };

        const localPost: BlogPost = {
          id: saved.id || `local_${Date.now()}`,
          slug: saved.slug || (saved.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          title: saved.title || form.title,
          excerpt: saved.excerpt || form.excerpt || '',
          content: saved.content || form.content || '',
          author: { name: 'Admin', role: 'Admin', avatar: '/images/about-hero.jpg' },
          publishedAt: saved.publishedAt || new Date().toISOString(),
          readTime: estimateReadTime(saved.content || form.content),
          category: saved.category || 'Blog',
          tags: saved.tags || form.tags || [],
          featuredImage: saved.featuredImage || '/images/puppy-training.jpg',
          images: saved.images || []
        };
        addLocalBlogPost(localPost);
      } catch (e) {
        console.warn('Failed to write local blog copy', e);
      }

      toast.success('Saved');
      setEditing(null);
      await fetchPosts();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to save');
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
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete');
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
  const [preview, setPreview] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: BlogPost = { ...form, tags: form.tags || [] };
    void onSave(payload);
  };

  const insertMarkdown = (before: string, after: string = "") => {
    if (!contentRef.current) return;
    const textarea = contentRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = form.content?.substring(start, end) || "";
    const newContent = 
      (form.content?.substring(0, start) || "") + 
      before + selected + after + 
      (form.content?.substring(end) || "");
    setForm({ ...form, content: newContent });
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
    }, 0);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setImageUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const uploadRes = await fetch(`${getApiUrl()}/api/upload`, {
        method: "POST",
        body: formData
      });
      
      if (!uploadRes.ok) {
        const uploadEndpoint = `${getApiUrl()}/api/blog/upload`;
        const uploadRes2 = await fetch(uploadEndpoint, {
          method: "POST",
          body: formData
        });
        if (!uploadRes2.ok) throw new Error("Upload failed");
        const data = await uploadRes2.json();
        const imageUrl = data.url || `/uploads/${file.name}`;
        insertMarkdown(`![${file.name}](${imageUrl})`);
        toast.success("Image inserted");
        return;
      }
      
      const data = await uploadRes.json();
      const imageUrl = data.url || `/uploads/${file.name}`;
      insertMarkdown(`![${file.name}](${imageUrl})`);
      toast.success("Image inserted");
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed");
    } finally {
      setImageUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const addParagraph = () => {
    insertMarkdown("\n\n");
  };

  const addHeading = () => {
    insertMarkdown("## ");
  };

  const addBold = () => {
    insertMarkdown("**", "**");
  };

  const addItalic = () => {
    insertMarkdown("*", "*");
  };

  const addBulletList = () => {
    insertMarkdown("- ");
  };

  const addLink = () => {
    insertMarkdown("[Link text](https://example.com)");
  };

  const parseMarkdownToHtml = (content: string): string => {
    let html = content;
    // Headers
    html = html.replace(/^### (.*?)$/gm, "<h3 style='font-size: 1.25rem; font-weight: bold; margin: 1rem 0; color: #B344FF;'>$1</h3>");
    html = html.replace(/^## (.*?)$/gm, "<h2 style='font-size: 1.5rem; font-weight: bold; margin: 1rem 0; color: #B344FF;'>$1</h2>");
    html = html.replace(/^# (.*?)$/gm, "<h1 style='font-size: 1.875rem; font-weight: bold; margin: 1rem 0; color: #B344FF;'>$1</h1>");
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong style='font-weight: bold;'>$1</strong>");
    // Italic
    html = html.replace(/\*(.*?)\*/g, "<em style='font-style: italic;'>$1</em>");
    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, "<a href='$2' style='color: #B344FF; text-decoration: underline;'>$1</a>");
    // Images
    html = html.replace(/!\[(.*?)\]\((.*?)\)/g, "<img src='$2' alt='$1' style='max-width: 100%; height: auto; margin: 1rem 0; border-radius: 0.5rem;' />");
    // Bullet lists
    html = html.replace(/^- (.*?)$/gm, "<li style='margin-left: 1rem;'>$1</li>");
    html = html.replace(/<li[^>]*>.*?<\/li>/g, (match) => `<ul style='list-style: disc; padding-left: 1rem;'>${match}</ul>`);
    // Paragraphs
    html = html.replace(/\n\n/g, "</p><p style='margin: 1rem 0; line-height: 1.6;'>");
    html = `<p style='margin: 1rem 0; line-height: 1.6;'>${html}</p>`;
    return html;
  };

  return (
    <div className="rounded-xl border border-[#1A2A3F] bg-[#0F1F3A] p-6">
      <div className="mb-4 flex items-center gap-2">
        <button type="button" onClick={() => setPreview(!preview)} className="px-3 py-1.5 rounded text-sm font-medium text-white border border-[#1A2A3F] hover:bg-[#1A2A3F] transition-colors">
          {preview ? "Edit" : "Preview"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <label htmlFor="blogTitle" className="block text-sm font-medium text-white mb-2">Blog Title</label>
          <input 
            id="blogTitle"
            value={form.title || ""} 
            onChange={(e) => setForm({ ...form, title: e.target.value })} 
            placeholder="Blog Title" 
            className="p-3 bg-[#0A1628] text-white rounded border border-[#1A2A3F] focus:border-[#B344FF] outline-none text-lg font-semibold w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-white mb-2">Slug (URL)</label>
          <input 
            id="slug"
            value={form.slug || ""} 
            onChange={(e) => setForm({ ...form, slug: e.target.value })} 
            placeholder="Slug (for URL)" 
            className="p-3 bg-[#0A1628] text-white rounded border border-[#1A2A3F] focus:border-[#B344FF] outline-none text-sm w-full"
          />
        </div>

        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-white mb-2">Excerpt</label>
          <textarea 
            id="excerpt"
            value={form.excerpt || ""} 
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })} 
            placeholder="Excerpt (short summary)" 
            rows={2}
            className="p-3 bg-[#0A1628] text-white rounded border border-[#1A2A3F] focus:border-[#B344FF] outline-none w-full"
          />
        </div>

        {!preview ? (
          <div className="space-y-3">
            {/* Formatting Toolbar */}
            <div className="flex flex-wrap gap-2 p-3 bg-[#0A1628] rounded border border-[#1A2A3F]">
              <button type="button" onClick={addHeading} title="Add Heading" className="p-2 hover:bg-[#1A2A3F] rounded text-[#B344FF] transition-colors">
                <FiType className="h-5 w-5" />
              </button>
              <button type="button" onClick={addBold} title="Bold" className="p-2 hover:bg-[#1A2A3F] rounded text-[#B344FF] transition-colors">
                <FiBold className="h-5 w-5" />
              </button>
              <button type="button" onClick={addItalic} title="Italic" className="p-2 hover:bg-[#1A2A3F] rounded text-[#B344FF] transition-colors">
                <FiItalic className="h-5 w-5" />
              </button>
              <button type="button" onClick={addBulletList} title="Bullet List" className="p-2 hover:bg-[#1A2A3F] rounded text-[#B344FF] transition-colors">
                <FiList className="h-5 w-5" />
              </button>
              <button type="button" onClick={addLink} title="Insert Link" className="p-2 hover:bg-[#1A2A3F] rounded text-[#B344FF] transition-colors">
                <FiLink2 className="h-5 w-5" />
              </button>
              <button type="button" onClick={addParagraph} title="Add Paragraph" className="p-2 hover:bg-[#1A2A3F] rounded text-[#B344FF] transition-colors">
                <FiAlignLeft className="h-5 w-5" />
              </button>
              <button 
                type="button" 
                onClick={() => fileInputRef.current?.click()} 
                disabled={imageUploading}
                title="Insert Image" 
                className="p-2 hover:bg-[#1A2A3F] rounded text-[#B344FF] transition-colors disabled:opacity-50"
              >
                {imageUploading ? <FiImage className="h-5 w-5 animate-spin" /> : <FiFeather className="h-5 w-5" />}
              </button>
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                className="hidden"
                aria-label="Upload image file"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-white mb-2">Content</label>
              <textarea 
                id="content"
                ref={contentRef}
                value={form.content || ""} 
                onChange={(e) => setForm({ ...form, content: e.target.value })} 
                rows={12}
                placeholder="Write your blog content here... Use markdown formatting:&#10;# Heading 1&#10;## Heading 2&#10;**Bold text**&#10;*Italic text*&#10;- Bullet point&#10;[Link](url)&#10;![Image](url)"
                className="p-3 bg-[#0A1628] text-white rounded border border-[#1A2A3F] focus:border-[#B344FF] outline-none font-mono text-sm resize-none w-full"
              />
            </div>
          </div>
        ) : (
          <div className="p-4 bg-[#0A1628] rounded border border-[#1A2A3F] min-h-96 text-white max-h-96 overflow-y-auto" 
            dangerouslySetInnerHTML={{ __html: parseMarkdownToHtml(form.content || "") }}
          />
        )}

        <input 
          value={(form.tags || []).join(", ")} 
          onChange={(e) => setForm({ ...form, tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} 
          placeholder="Tags (comma separated)" 
          className="p-3 bg-[#0A1628] text-white rounded border border-[#1A2A3F] focus:border-[#B344FF] outline-none text-sm"
        />

        <label className="flex items-center gap-2 p-3 bg-[#0A1628] rounded border border-[#1A2A3F] cursor-pointer hover:bg-[#1A2A3F] transition-colors">
          <input 
            type="checkbox" 
            checked={!!form.published} 
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
            className="w-4 h-4 cursor-pointer"
          /> 
          <span className="text-white font-medium">Publish this post</span>
        </label>

        <div className="flex gap-2 justify-end">
          <button 
            type="button" 
            onClick={onCancel} 
            className="px-4 py-2 border border-[#1A2A3F] rounded text-white hover:bg-[#1A2A3F] transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={saving} 
            className="px-4 py-2 bg-linear-to-r from-[#B344FF] to-[#FF44EC] text-white rounded font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Blog Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
