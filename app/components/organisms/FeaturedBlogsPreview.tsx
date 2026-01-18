"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getAllBlogPostsAsync, type BlogPost } from '../../data/blog';
import Container from './Container';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';

/**
 * Small homepage preview showing the latest three blog posts.
 * Uses cards similar to blog grid but lighter styling.
 */
export default function FeaturedBlogsPreview() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const load = async () => {
      const all = await getAllBlogPostsAsync();
      setPosts(all.slice(0, 3));
    };
    void load();
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest From Our Blog</h2>
          <p className="text-lg text-gray-700">Training tips, nutrition guides and more expert advice</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <Image src={post.featuredImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt className="text-primary" />
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaClock className="text-primary" />
                    <span>{post.readTime} min read</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-700 mb-4 line-clamp-3">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="text-primary hover:text-secondary font-medium">
                  Read Article →
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/blog" className="bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-full font-medium transition-colors">
            View All Articles
          </Link>
        </div>
      </Container>
    </section>
  );
}
