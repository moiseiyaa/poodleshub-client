import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Client component that handles all blog admin interactions
const BlogContent = dynamic(() => import('./BlogContent'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center text-white">Loading…</div>
  ),
});

export default function AdminBlogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Loading…</div>}>
      <BlogContent />
    </Suspense>
  );
}
