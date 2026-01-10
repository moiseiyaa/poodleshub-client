'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { toast } from 'react-hot-toast';
import { FiBold, FiItalic, FiList, FiLink2, FiImage, FiFeather, FiType, FiAlignLeft } from 'react-icons/fi';
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
  
  return (
    <div className="min-h-screen bg-[#0A1628] p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Blog Management</h1>
          <button 
            onClick={() => setEditing({ id: `new_${Date.now()}`, title: '', slug: '', excerpt: '', content: '', tags: [], published: false, author: { name: 'Admin', role: 'Admin', avatar: '/images/about-hero.jpg' }, publishedAt: new Date().toISOString(), readTime: 1, category: 'Blog', featuredImage: '/images/puppy-training.jpg' } as BlogPost)} 
            className="rounded bg-linear-to-r from-[#B344FF] to-[#FF44EC] px-4 py-2 text-white"
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
                            >
                              Delete
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
