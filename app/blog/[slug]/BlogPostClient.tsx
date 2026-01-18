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

  const htmlContent = parseMarkdownToHtml(post.content);

  return (
    <div className="bg-gray-50 pb-16">
      {/* Hero */}
      <section className="relative h-64 sm:h-80 md:h-96">
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <Container>
          <div className="relative z-10 h-full flex items-center">
            <div>
              <Link href="/blog" className="text-white text-sm flex items-center gap-1 mb-3 hover:underline">
                <FaArrowLeft /> Back to Blog
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold text-white max-w-3xl mb-4">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-200">
                <div className="flex items-center gap-1">
                  <FaCalendarAlt className="text-primary" />
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-1">
                  <FaClock className="text-primary" />
                  <span>{post.readTime} min read</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaTag className="text-primary" />
                  <span>{post.category}</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Content */}
      <Container>
        <article className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md -mt-20 relative z-20">
          {/* Author */}
          <div className="flex items-center gap-3 mb-6">
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
              <p className="text-xs text-gray-600">{post.author.role}</p>
            </div>
          </div>

          <div
            className="prose max-w-none prose-h1:text-3xl prose-h2:text-2xl prose-img:rounded-lg prose-img:shadow"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs hover:bg-primary hover:text-white transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </article>
      </Container>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-24">
          <Container>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((rp) => (
                <Link key={rp.id} href={`/blog/${rp.slug}`} className="group block rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-white">
                  <div className="relative h-40">
                    <Image src={rp.featuredImage} alt={rp.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary mb-2 line-clamp-2">
                      {rp.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{rp.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
