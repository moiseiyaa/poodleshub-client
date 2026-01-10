import { Suspense } from 'react';
// BlogContent is a client component
import BlogContent from './BlogContent';

export default function AdminBlogPage() {
  return (
    <Suspense fallback={<div>Loading blog admin...</div>}>
      <BlogContent />
    </Suspense>
  );
}
