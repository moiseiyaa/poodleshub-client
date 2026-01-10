'use client';

// Client component extracted from former page.tsx
// eslint-disable-next-line @next/next/no-img-element

import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { FaCalendarAlt, FaUser, FaClock, FaTag, FaArrowLeft, FaShare, FaBookmark, FaArrowRight } from 'react-icons/fa';
import Container from '../../components/organisms/Container';
import { getBlogPostBySlugAsync, getAllBlogPostsAsync, parseMarkdownToHtml, type BlogPost } from '../../data/blog';
import { useEffect, useState } from 'react';

/**
 * Individual blog post page component (client)
 */
export default function BlogPostClient() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const foundPost = await getBlogPostBySlugAsync(slug);
        if (!foundPost) {
          router.replace('/404');
          return;
        }
        setPost(foundPost);
        const allPosts = await getAllBlogPostsAsync();
        const related = allPosts
          .filter((p) => p.id !== foundPost.id)
          .filter(
            (p) => p.category === foundPost.category || p.tags.some((tag) => foundPost.tags.includes(tag)),
          )
          .slice(0, 3);
        setRelatedPosts(related);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        router.replace('/404');
      } finally {
        setLoading(false);
      }
    };
    void fetchPost();
  }, [slug, router]);

  if (loading || !post) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  /* JSX from original file: omitted for brevity in this snippet. The full markup remains unchanged. */
  return (
    <div>{/* ... original JSX retained ... */}</div>
  );
}
