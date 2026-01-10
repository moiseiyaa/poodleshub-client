'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { toast } from 'react-hot-toast';
import { FiBold, FiItalic, FiList, FiLink2, FiImage, FiFeather, FiType, FiAlignLeft, FiAward } from 'react-icons/fi';
import { addLocalBlogPost } from '../../data/blog';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: number;
  category: string;
  tags: string[];
  featuredImage: string;
  images?: string[];
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const getApiUrl = () =>
  process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === "production" ? "https://api.puppyhubusa.com" : "http://localhost:4000");

export default function BlogContent() {
  const searchParams = useSearchParams();
  const { token } = useAdminAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Initialize search term from URL params
  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setSearchTerm(search);
    }
  }, [searchParams]);

  // Rest of your component code remains the same...
  // [Previous component implementation here]
  
  // Handler for saving blog posts
  const handleSave = async (form: BlogPost) => {
    try {
      setSaving(true);
      const method = form.id?.startsWith('new_') ? 'POST' : 'PUT';
      const url = form.id?.startsWith('new_') 
        ? `${getApiUrl()}/api/blog` 
        : `${getApiUrl()}/api/blog/${form.id}`;
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'admin_token': token || '',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error('Failed to save');
      
      // Handle local storage for development
      try {
        const saved = await res.json();
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

  // Handler for deleting blog posts
  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post?')) return;
    try {
      const res = await fetch(`${getApiUrl()}/api/blog/${id}`, {
        method: 'DELETE',
        headers: { 
          'admin_token': token || '',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      if (!res.ok) throw new Error('Delete failed');
      toast.success('Deleted');
      await fetchPosts();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete');
    }
  };

  // Fetch blog posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${getApiUrl()}/api/blog`, {
        headers: { 
          'Content-Type': 'application/json',
          'admin_token': token || '',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      const data = await res.json();
      if (!res.ok) {
        console.error('API error:', data);
        toast.error('Failed to fetch posts');
        return;
      }
      setPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch error:', err);
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    if (token) {
      fetchPosts();
    } else {
      router.push('/admin/login');
    }
  }, [token]);

  if (!token) {
    return <div className="min-h-screen flex items-center justify-center text-white">Redirecting...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0A1628] p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Blog Management</h1>
          <button 
            onClick={() => setEditing({ 
              id: `new_${Date.now()}`, 
              title: '', 
              slug: '', 
              excerpt: '', 
              content: '', 
              tags: [], 
              published: false, 
              author: { 
                name: 'Admin', 
                role: 'Admin', 
                avatar: '/images/about-hero.jpg' 
              }, 
              publishedAt: new Date().toISOString(), 
              readTime: 1, 
              category: 'Blog', 
              featuredImage: '/images/puppy-training.jpg' 
            } as BlogPost)} 
            className="rounded bg-linear-to-r from-[#B344FF] to-[#FF44EC] px-4 py-2 text-white hover:opacity-90 transition-opacity"
          >
            Add Post
          </button>
        </div>

        {/* Search input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              // Update URL with search param
              const params = new URLSearchParams(searchParams.toString());
              if (e.target.value) {
                params.set('search', e.target.value);
              } else {
                params.delete('search');
              }
              router.push(`?${params.toString()}`);
            }}
            className="w-full p-2 rounded bg-[#0F1F3A] text-white border border-[#1A2A3F] focus:border-[#B344FF] outline-none"
          />
        </div>

        {editing ? (
          <BlogForm 
            post={editing} 
            onSave={handleSave} 
            onCancel={() => setEditing(null)} 
            saving={saving} 
          />
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
                  {posts
                    .filter(post => 
                      searchTerm === '' || 
                      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      (post.content && post.content.toLowerCase().includes(searchTerm.toLowerCase()))
                    )
                    .map((post) => (
                      <tr key={post.id} className="border-t border-[#1A2A3F]">
                        <td className="px-3 py-2 text-white">{post.title}</td>
                        <td className="px-3 py-2 text-[#8B9CC8]">{post.slug}</td>
                        <td className="px-3 py-2 text-[#8B9CC8]">{post.published ? 'Yes' : 'No'}</td>
                        <td className="px-3 py-2">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => setEditing(post)} 
                              className="text-[#8B9CC8] hover:text-[#B344FF] transition-colors"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDelete(post.id || '')} 
                              className="text-red-400 hover:text-red-300 transition-colors"
                              disabled={saving}
                            >
                              {saving ? 'Deleting...' : 'Delete'}
                            </button>
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

// BlogForm component for creating and editing posts
function BlogForm({
  post,
  onSave,
  onCancel,
  saving,
}: {
  post: BlogPost;
  onSave: (form: BlogPost) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}) {
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

  const insertMarkdown = (before: string, after = "") => {
    if (!contentRef.current) return;
    const textarea = contentRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = form.content?.substring(start, end) || "";
    const newContent =
      (form.content?.substring(0, start) || "") +
      before +
      selected +
      after +
      (form.content?.substring(end) || "");
    setForm({ ...form, content: newContent });
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selected.length,
      );
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
        body: formData,
      });

      let imageUrl: string | undefined;
      if (uploadRes.ok) {
        const data = await uploadRes.json();
        imageUrl = data.url;
      } else {
        const fallback = await fetch(`${getApiUrl()}/api/blog/upload`, {
          method: "POST",
          body: formData,
        });
        if (!fallback.ok) throw new Error("Upload failed");
        const data = await fallback.json();
        imageUrl = data.url;
      }

      insertMarkdown(`![${file.name}](${imageUrl || `/uploads/${file.name}`})`);
      toast.success("Image inserted");
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed");
    } finally {
      setImageUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Markdown helpers
  const addParagraph = () => insertMarkdown("\n\n");
  const addHeading = () => insertMarkdown("## ");
  const addBold = () => insertMarkdown("**", "**");
  const addItalic = () => insertMarkdown("*", "*");
  const addBulletList = () => insertMarkdown("- ");
  const addLink = () => insertMarkdown("[Link text](https://example.com)");

  const parseMarkdownToHtml = (content: string): string => {
    if (!content) return "";
    let html = content;
    html = html.replace(/^### (.*?)$/gm, "<h3 class='text-xl font-bold my-4 text-purple-400'>$1</h3>");
    html = html.replace(/^## (.*?)$/gm, "<h2 class='text-2xl font-bold my-4 text-purple-400'>$1</h2>");
    html = html.replace(/^# (.*?)$/gm, "<h1 class='text-3xl font-bold my-6 text-purple-400'>$1</h1>");
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong class='font-bold'>$1</strong>");
    html = html.replace(/\*(.*?)\*/g, "<em class='italic'>$1</em>");
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, "<a href='$2' class='text-purple-400 underline'>$1</a>");
    html = html.replace(/!\[(.*?)\]\((.*?)\)/g, "<img src='$2' alt='$1' class='my-4 rounded-lg max-w-full h-auto' />");
    html = html.replace(/^- (.*?)$/gm, "<li class='ml-6 list-disc'>$1</li>");
    html = html.replace(/\n\n/g, "</p><p class='my-4'>");
    return `<div class='prose prose-invert max-w-none'><p>${html}</p></div>`;
  };

  return (
    <div className="rounded-xl border border-[#1A2A3F] bg-[#0F1F3A] p-6">
      <div className="mb-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setPreview(!preview)}
          className="px-3 py-1.5 rounded text-sm font-medium text-white border border-[#1A2A3F] hover:bg-[#1A2A3F] transition-colors"
        >
          {preview ? "Edit" : "Preview"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <label htmlFor="blogTitle" className="block text-sm font-medium text-white mb-2">
            Blog Title
          </label>
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
          <label htmlFor="slug" className="block text-sm font-medium text-white mb-2">
            Slug (URL)
          </label>
          <input
            id="slug"
            value={form.slug || ""}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            placeholder="blog-post-url"
            className="p-3 bg-[#0A1628] text-white rounded border border-[#1A2A3F] focus:border-[#B344FF] outline-none text-sm w-full"
          />
        </div>

        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-white mb-2">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            value={form.excerpt || ""}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            placeholder="A short description of your blog post"
            rows={2}
            className="p-3 bg-[#0A1628] text-white rounded border border-[#1A2A3F] focus:border-[#B344FF] outline-none w-full"
          />
        </div>

        {!preview ? (
          <div className="space-y-3">
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
              <button type="button" onClick={addLink} title="Add Link" className="p-2 hover:bg-[#1A2A3F] rounded text-[#B344FF] transition-colors">
                <FiLink2 className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Insert Image"
                className="p-2 hover:bg-[#1A2A3F] rounded text-[#B344FF] transition-colors disabled:opacity-50"
                disabled={imageUploading}
              >
                {imageUploading ? <FiImage className="h-5 w-5 animate-spin" /> : <FiImage className="h-5 w-5" />}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button type="button" onClick={addParagraph} title="Add Paragraph" className="p-2 hover:bg-[#1A2A3F] rounded text-[#B344FF] transition-colors">
                <FiAlignLeft className="h-5 w-5" />
              </button>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-white mb-2">
                Content
              </label>
              <textarea
                id="content"
                ref={contentRef}
                value={form.content || ""}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Write your blog post here..."
                rows={15}
                className="p-3 bg-[#0A1628] text-white rounded border border-[#1A2A3F] focus:border-[#B344FF] outline-none font-mono text-sm w-full"
              />
            </div>
          </div>
        ) : (
          <div
            className="p-4 bg-[#0A1628] rounded border border-[#1A2A3F] min-h-[400px]"
            dangerouslySetInnerHTML={{ __html: parseMarkdownToHtml(form.content || "") }}
          />
        )}

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-white mb-2">
            Tags (comma separated)
          </label>
          <input
            id="tags"
            value={(form.tags || []).join(", ")}
            onChange={(e) =>
              setForm({
                ...form,
                tags: e.target.value
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter(Boolean),
              })
            }
            placeholder="tag1, tag2, tag3"
            className="p-3 bg-[#0A1628] text-white rounded border border-[#1A2A3F] focus:border-[#B344FF] outline-none w-full"
          />
        </div>

        <div className="flex items-center">
          <input
            id="published"
            type="checkbox"
            checked={!!form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-700 rounded"
          />
          <label htmlFor="published" className="ml-2 block text-sm text-gray-300">
            Publish this post
          </label>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="px-4 py-2 border border-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Post"}
          </button>
        </div>
      </form>
    </div>
  );
}

