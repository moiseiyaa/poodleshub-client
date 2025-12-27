"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { toast } from "react-hot-toast";
import { 
  FiSearch, FiEdit2, FiTrash2, FiPlus, FiRefreshCw, FiEye, FiGlobe,
  FiTag, FiFileText, FiPackage, FiBook, FiGrid, FiCheck, FiX,
  FiAlertTriangle, FiCopy, FiExternalLink
} from "react-icons/fi";

const getApiUrl = () =>
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://api.puppyhubusa.com"
    : "http://localhost:4000");

type SeoMeta = {
  id: string;
  entityType: "PAGE" | "PUPPY" | "BREED" | "BLOG" | "CATEGORY";
  entityId?: string;
  metaTitle?: string;
  metaDescription?: string;
  focusKeywords: string[];
  slug?: string;
  canonicalUrl?: string;
  robots: "INDEX" | "NOINDEX";
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  schemaType: "ARTICLE" | "PRODUCT" | "FAQ" | "ORGANIZATION";
  createdAt: string;
  updatedAt: string;
  puppy?: { id: string; name: string; breed: string };
  breed?: { id: string; name: string };
};

const ENTITY_TYPES = [
  { value: "PAGE", label: "Static Page", icon: FiFileText },
  { value: "PUPPY", label: "Puppy", icon: FiPackage },
  { value: "BREED", label: "Breed", icon: FiGrid },
  { value: "BLOG", label: "Blog Post", icon: FiBook },
  { value: "CATEGORY", label: "Category", icon: FiTag },
];

const SCHEMA_TYPES = [
  { value: "ARTICLE", label: "Article" },
  { value: "PRODUCT", label: "Product" },
  { value: "FAQ", label: "FAQ" },
  { value: "ORGANIZATION", label: "Organization" },
];

const ROBOTS_OPTIONS = [
  { value: "INDEX", label: "Index" },
  { value: "NOINDEX", label: "No Index" },
];

const STATIC_PAGES = [
  { value: "home", label: "Home Page" },
  { value: "about", label: "About Us" },
  { value: "contact", label: "Contact" },
  { value: "puppies", label: "Puppies Listing" },
  { value: "breeds", label: "Breeds" },
  { value: "application", label: "Application" },
  { value: "cart", label: "Shopping Cart" },
  { value: "faq", label: "FAQ" },
  { value: "process", label: "Our Process" },
  { value: "delivery", label: "Delivery" },
  { value: "health-guarantee", label: "Health Guarantee" },
  { value: "training", label: "Training" },
  { value: "privacy", label: "Privacy Policy" },
  { value: "terms", label: "Terms of Service" },
];

function SeoForm({ 
  seo, 
  onSave, 
  onCancel, 
  saving 
}: { 
  seo: Partial<SeoMeta>; 
  onSave: (seo: Partial<SeoMeta>) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState(seo);
  const [slugError, setSlugError] = useState<string | null>(null);
  const [checkingSlug, setCheckingSlug] = useState(false);

  const checkSlugUniqueness = async (slug: string) => {
    if (!slug || slug === seo.slug) {
      setSlugError(null);
      return;
    }

    setCheckingSlug(true);
    try {
      const res = await fetch(`${getApiUrl()}/api/seo/slug/check?slug=${encodeURIComponent(slug)}${seo.id ? `&excludeId=${seo.id}` : ''}`);
      const data = await res.json();
      setSlugError(data.isUnique ? null : data.message);
    } catch (error) {
      console.error('Error checking slug:', error);
    } finally {
      setCheckingSlug(false);
    }
  };

  const handleSlugChange = (slug: string) => {
    setForm({ ...form, slug });
    if (slug) {
      checkSlugUniqueness(slug);
    } else {
      setSlugError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (slugError) return;
    await onSave(form);
  };

  const addKeyword = () => {
    const newKeyword = prompt("Enter keyword:");
    if (newKeyword && !form.focusKeywords?.includes(newKeyword)) {
      setForm({ ...form, focusKeywords: [...(form.focusKeywords || []), newKeyword] });
    }
  };

  const removeKeyword = (keyword: string) => {
    setForm({ 
      ...form, 
      focusKeywords: form.focusKeywords?.filter(k => k !== keyword) || [] 
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Entity Type
            </label>
            <select
              value={form.entityType || ""}
              onChange={(e) => setForm({ ...form, entityType: e.target.value as any })}
              className="w-full rounded-lg border border-[#1A2A3F] bg-[#0F1F3A] px-3 py-2 text-white focus:border-[#B344FF] focus:outline-none"
              required
            >
              <option value="">Select type...</option>
              {ENTITY_TYPES.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          {form.entityType === "PAGE" && (
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Page
              </label>
              <select
                value={form.entityId || ""}
                onChange={(e) => setForm({ ...form, entityId: e.target.value })}
                className="w-full rounded-lg border border-[#1A2A3F] bg-[#0F1F3A] px-3 py-2 text-white focus:border-[#B344FF] focus:outline-none"
              >
                <option value="">Select page...</option>
                {STATIC_PAGES.map(page => (
                  <option key={page.value} value={page.value}>{page.label}</option>
                ))}
              </select>
            </div>
          )}

          {(form.entityType === "PUPPY" || form.entityType === "BREED") && (
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                {form.entityType === "PUPPY" ? "Puppy ID" : "Breed ID"}
              </label>
              <input
                type="text"
                value={form.entityId || ""}
                onChange={(e) => setForm({ ...form, entityId: e.target.value })}
                placeholder={`Enter ${form.entityType?.toLowerCase()} ID...`}
                className="w-full rounded-lg border border-[#1A2A3F] bg-[#0F1F3A] px-3 py-2 text-white placeholder-[#8B9CC8] focus:border-[#B344FF] focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              URL Slug
            </label>
            <div className="relative">
              <input
                type="text"
                value={form.slug || ""}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="url-slug"
                className="w-full rounded-lg border border-[#1A2A3F] bg-[#0F1F3A] px-3 py-2 text-white placeholder-[#8B9CC8] focus:border-[#B344FF] focus:outline-none"
              />
              {checkingSlug && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <FiRefreshCw className="h-4 w-4 animate-spin text-[#8B9CC8]" />
                </div>
              )}
            </div>
            {slugError && (
              <p className="mt-1 text-sm text-red-400">{slugError}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Robots Meta
            </label>
            <select
              value={form.robots || "INDEX"}
              onChange={(e) => setForm({ ...form, robots: e.target.value as any })}
              className="w-full rounded-lg border border-[#1A2A3F] bg-[#0F1F3A] px-3 py-2 text-white focus:border-[#B344FF] focus:outline-none"
            >
              {ROBOTS_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            {form.entityType === "PAGE" && form.entityId === "home" && form.robots === "NOINDEX" && (
              <div className="mt-2 flex items-center gap-2 text-amber-400">
                <FiAlertTriangle className="h-4 w-4" />
                <span className="text-xs">Warning: Home page should typically be indexed</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Schema Type
            </label>
            <select
              value={form.schemaType || "ARTICLE"}
              onChange={(e) => setForm({ ...form, schemaType: e.target.value as any })}
              className="w-full rounded-lg border border-[#1A2A3F] bg-[#0F1F3A] px-3 py-2 text-white focus:border-[#B344FF] focus:outline-none"
            >
              {SCHEMA_TYPES.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Meta Title (max 70 chars)
            </label>
            <input
              type="text"
              value={form.metaTitle || ""}
              onChange={(e) => setForm({ ...form, metaTitle: e.target.value.slice(0, 70) })}
              placeholder="Page title for search results"
              maxLength={70}
              className="w-full rounded-lg border border-[#1A2A3F] bg-[#0F1F3A] px-3 py-2 text-white placeholder-[#8B9CC8] focus:border-[#B344FF] focus:outline-none"
            />
            <p className="mt-1 text-xs text-[#8B9CC8]">{form.metaTitle?.length || 0}/70 characters</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Meta Description (max 160 chars)
            </label>
            <textarea
              value={form.metaDescription || ""}
              onChange={(e) => setForm({ ...form, metaDescription: e.target.value.slice(0, 160) })}
              placeholder="Description for search results"
              maxLength={160}
              rows={3}
              className="w-full rounded-lg border border-[#1A2A3F] bg-[#0F1F3A] px-3 py-2 text-white placeholder-[#8B9CC8] focus:border-[#B344FF] focus:outline-none"
            />
            <p className="mt-1 text-xs text-[#8B9CC8]">{form.metaDescription?.length || 0}/160 characters</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Focus Keywords
            </label>
            <div className="space-y-2">
              {form.focusKeywords?.map((keyword, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="flex-1 rounded-lg border border-[#1A2A3F] bg-[#0F1F3A] px-3 py-2 text-sm text-white">
                    {keyword}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeKeyword(keyword)}
                    className="rounded-lg p-2 text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <FiX className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addKeyword}
                className="w-full rounded-lg border border-dashed border-[#1A2A3F] bg-[#0F1F3A]/50 px-3 py-2 text-sm text-[#8B9CC8] hover:border-[#B344FF] hover:text-[#B344FF] transition-colors"
              >
                <FiPlus className="inline mr-2 h-4 w-4" />
                Add Keyword
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Canonical URL
            </label>
            <input
              type="url"
              value={form.canonicalUrl || ""}
              onChange={(e) => setForm({ ...form, canonicalUrl: e.target.value })}
              placeholder="https://example.com/page"
              className="w-full rounded-lg border border-[#1A2A3F] bg-[#0F1F3A] px-3 py-2 text-white placeholder-[#8B9CC8] focus:border-[#B344FF] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              OG Title
            </label>
            <input
              type="text"
              value={form.ogTitle || ""}
              onChange={(e) => setForm({ ...form, ogTitle: e.target.value })}
              placeholder="Social media title"
              className="w-full rounded-lg border border-[#1A2A3F] bg-[#0F1F3A] px-3 py-2 text-white placeholder-[#8B9CC8] focus:border-[#B344FF] focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              OG Description
            </label>
            <textarea
              value={form.ogDescription || ""}
              onChange={(e) => setForm({ ...form, ogDescription: e.target.value })}
              placeholder="Social media description"
              rows={3}
              className="w-full rounded-lg border border-[#1A2A3F] bg-[#0F1F3A] px-3 py-2 text-white placeholder-[#8B9CC8] focus:border-[#B344FF] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              OG Image
            </label>
            <input
              type="url"
              value={form.ogImage || ""}
              onChange={(e) => setForm({ ...form, ogImage: e.target.value })}
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-lg border border-[#1A2A3F] bg-[#0F1F3A] px-3 py-2 text-white placeholder-[#8B9CC8] focus:border-[#B344FF] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Google SERP Preview */}
      {(form.metaTitle || form.metaDescription) && (
        <div className="rounded-xl border border-[#1A2A3F] bg-[#0F1F3A] p-6">
          <h3 className="mb-4 text-lg font-semibold text-white">Google Search Preview</h3>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="mb-2">
              <span className="text-xs text-gray-600 uppercase">{form.canonicalUrl || 'https://puppyhubusa.com/...'}</span>
            </div>
            <div className="mb-1">
              <a href="#" className="text-xl text-blue-800 hover:underline">
                {form.metaTitle || 'Page Title'}
              </a>
            </div>
            <div className="text-sm text-gray-600">
              {form.metaDescription || 'Page description will appear here...'}
            </div>
            {form.focusKeywords && form.focusKeywords.length > 0 && (
              <div className="mt-2 text-xs text-green-700">
                Keywords: {form.focusKeywords.join(', ')}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-[#1A2A3F] bg-[#0F1F3A] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#1A2A3F] transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving || !!slugError}
          className="rounded-lg bg-linear-to-r from-[#B344FF] to-[#FF44EC] px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60 transition-opacity"
        >
          {saving ? "Saving..." : seo.id ? "Update SEO" : "Create SEO"}
        </button>
      </div>
    </form>
  );
}

export default function SeoManager() {
  const { token } = useAdminAuth();
  const router = useRouter();
  const [data, setData] = useState<SeoMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [entityFilter, setEntityFilter] = useState<string>("");
  const [editingSeo, setEditingSeo] = useState<Partial<SeoMeta> | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (entityFilter) params.append('entityType', entityFilter);
      
      const res = await fetch(`${getApiUrl()}/api/seo?${params}`, {
        headers: {
          admin_token: token || "",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      
      if (!res.ok) throw new Error("Failed to fetch SEO data");
      const result = await res.json();
      setData(result.data || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch SEO data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // avoid redirecting until token has been initialized by AdminAuthProvider
    if (token === null) return; // still loading auth state

    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchData();
  }, [token, entityFilter]);

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    const term = searchTerm.toLowerCase();
    return data.filter(
      (seo) =>
        seo.metaTitle?.toLowerCase().includes(term) ||
        seo.metaDescription?.toLowerCase().includes(term) ||
        seo.slug?.toLowerCase().includes(term) ||
        seo.focusKeywords?.some(k => k.toLowerCase().includes(term)) ||
        seo.entityType.toLowerCase().includes(term)
    );
  }, [data, searchTerm]);

  const handleSave = async (seoData: Partial<SeoMeta>) => {
    setSaving(true);
    try {
      const method = editingSeo?.id ? "PUT" : "POST";
      const url = editingSeo?.id 
        ? `${getApiUrl()}/api/seo/${editingSeo.id}`
        : `${getApiUrl()}/api/seo`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          admin_token: token || "",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(seoData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Save failed");
      }

      toast.success(editingSeo?.id ? "SEO updated successfully" : "SEO created successfully");
      setEditingSeo(null);
      await fetchData();
    } catch (err: any) {
      toast.error(err.message || "Failed to save SEO");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this SEO metadata? This cannot be undone.")) return;
    
    try {
      const res = await fetch(`${getApiUrl()}/api/seo/${id}`, {
        method: "DELETE",
        headers: {
          admin_token: token || "",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!res.ok) throw new Error("Failed to delete");
      
      toast.success("SEO deleted successfully");
      await fetchData();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete SEO");
    }
  };

  const getEntityIcon = (entityType: string) => {
    const entity = ENTITY_TYPES.find(e => e.value === entityType);
    return entity ? entity.icon : FiFileText;
  };

  const getEntityName = (seo: SeoMeta) => {
    if (seo.entityType === "PAGE") {
      const page = STATIC_PAGES.find(p => p.value === seo.entityId);
      return page ? page.label : seo.entityId;
    }
    if (seo.entityType === "PUPPY" && seo.puppy) {
      return `${seo.puppy.name} (${seo.puppy.breed})`;
    }
    if (seo.entityType === "BREED" && seo.breed) {
      return seo.breed.name;
    }
    return seo.entityId || "Unknown";
  };

  if (!token) {
    return <div className="flex min-h-screen items-center justify-center text-white">Redirecting...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0A1628] p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">SEO Management</h1>
          <p className="mt-2 text-[#8B9CC8]">Manage SEO metadata and keywords for all pages</p>
        </div>

        {editingSeo ? (
          <div className="rounded-xl border border-[#1A2A3F] bg-[#0F1F3A] p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">
                {editingSeo.id ? "Edit SEO Metadata" : "Create SEO Metadata"}
              </h2>
              <button
                onClick={() => setEditingSeo(null)}
                className="text-[#8B9CC8] hover:text-white"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            <SeoForm
              seo={editingSeo}
              onSave={handleSave}
              onCancel={() => setEditingSeo(null)}
              saving={saving}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-1 gap-3">
                <div className="relative flex-1">
                  <FiSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8B9CC8]" />
                  <input
                    type="text"
                    placeholder="Search SEO metadata..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-lg border border-[#1A2A3F] bg-[#0F1F3A] py-2.5 pl-10 pr-4 text-white placeholder-[#8B9CC8] focus:border-[#B344FF] focus:outline-none"
                  />
                </div>
                <select
                  value={entityFilter}
                  onChange={(e) => setEntityFilter(e.target.value)}
                  className="rounded-lg border border-[#1A2A3F] bg-[#0F1F3A] px-3 py-2.5 text-white focus:border-[#B344FF] focus:outline-none"
                >
                  <option value="">All Types</option>
                  {ENTITY_TYPES.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={fetchData}
                  className="flex items-center gap-2 rounded-lg border border-[#1A2A3F] bg-[#0F1F3A] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1A2A3F] transition-colors"
                >
                  <FiRefreshCw className="h-4 w-4" />
                  Refresh
                </button>
                <button
                  onClick={() => setEditingSeo({})}
                  className="flex items-center gap-2 rounded-lg bg-linear-to-r from-[#B344FF] to-[#FF44EC] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                >
                  <FiPlus className="h-4 w-4" />
                  Add SEO
                </button>
              </div>
            </div>

            {loading ? (
              <div className="rounded-xl border border-[#1A2A3F] bg-[#0F1F3A] p-8 text-center text-[#8B9CC8]">
                Loading SEO metadata…
              </div>
            ) : error ? (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">{error}</div>
            ) : filteredData.length === 0 ? (
              <div className="rounded-xl border border-[#1A2A3F] bg-[#0F1F3A] p-8 text-center">
                <FiGlobe className="mx-auto mb-4 h-12 w-12 text-[#8B9CC8]" />
                <p className="text-sm text-[#8B9CC8]">No SEO metadata found.</p>
                <button
                  onClick={() => setEditingSeo({})}
                  className="mt-4 text-sm font-medium text-[#B344FF] hover:text-[#FF44EC]"
                >
                  Create your first SEO entry
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-[#1A2A3F] bg-[#0F1F3A] shadow-lg">
                <table className="min-w-full text-sm">
                  <thead className="border-b border-[#1A2A3F]">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#8B9CC8]">Entity</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#8B9CC8]">Title</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#8B9CC8]">Description</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#8B9CC8]">Keywords</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#8B9CC8]">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#8B9CC8]">Updated</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#8B9CC8]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1A2A3F]">
                    {filteredData.map((seo) => {
                      const Icon = getEntityIcon(seo.entityType);
                      return (
                        <tr key={seo.id} className="hover:bg-[#1A2A3F]/50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4 text-[#8B9CC8]" />
                              <div>
                                <div className="font-medium text-white">{getEntityName(seo)}</div>
                                <div className="text-xs text-[#8B9CC8]">{seo.entityType}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="max-w-xs truncate font-medium text-white">
                              {seo.metaTitle || <span className="text-[#8B9CC8]">No title</span>}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="max-w-xs truncate text-[#8B9CC8]">
                              {seo.metaDescription || <span className="text-[#8B9CC8]">No description</span>}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-1">
                              {seo.focusKeywords?.slice(0, 2).map((keyword, idx) => (
                                <span key={idx} className="rounded bg-[#B344FF]/20 px-2 py-0.5 text-xs text-[#B344FF]">
                                  {keyword}
                                </span>
                              ))}
                              {seo.focusKeywords?.length > 2 && (
                                <span className="text-xs text-[#8B9CC8]">+{seo.focusKeywords.length - 2}</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                              seo.robots === "INDEX"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                            }`}>
                              {seo.robots === "INDEX" ? <FiCheck className="h-3 w-3" /> : <FiX className="h-3 w-3" />}
                              {seo.robots}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs text-[#8B9CC8]">
                            {new Date(seo.updatedAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setEditingSeo(seo)}
                                className="rounded-lg p-1.5 text-[#8B9CC8] hover:bg-[#1A2A3F] hover:text-[#B344FF] transition-colors"
                                title="Edit"
                              >
                                <FiEdit2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(seo.id)}
                                className="rounded-lg p-1.5 text-[#8B9CC8] hover:bg-[#1A2A3F] hover:text-red-400 transition-colors"
                                title="Delete"
                              >
                                <FiTrash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
