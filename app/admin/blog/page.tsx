import { Suspense } from 'react';
// BlogContent is a client component
import BlogContent from './BlogContent';


export default function AdminBlogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Loading…</div>}>
      <BlogContent />
    </Suspense>
  );
}
