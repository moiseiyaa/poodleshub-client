import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaCalendarAlt, FaUser, FaClock, FaTag, FaArrowLeft, FaShare, FaBookmark, FaArrowRight } from 'react-icons/fa';
import Container from '../../../components/organisms/Container';
import { getBlogPostBySlug, getRelatedBlogPosts, BlogPost } from '../../../data/blog';

interface ReadMorePageProps {
  params: {
    slug: string;
  };
}

/**
 * Read More page component
 * Displays expanded blog post content with enhanced reading experience
 * Maintains consistent design with the rest of the PuppyHub USA website
 */
export default async function ReadMorePage({ params }: ReadMorePageProps) {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);
  const relatedPosts = getRelatedBlogPosts(post?.id || '', 4);

  if (!post) {
    notFound();
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-blue-50 to-indigo-50 py-16 md:py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li>
                  <Link href="/" className="hover:text-primary">Home</Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/blog" className="hover:text-primary">Blog</Link>
                </li>
                <li>/</li>
                <li>
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary">Article</Link>
                </li>
                <li>/</li>
                <li className="text-gray-900">Read More</li>
              </ol>
            </nav>

            {/* Category Badge */}
            <div className="mb-6">
              <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            {/* Extended Excerpt */}
            <div className="text-xl text-gray-700 mb-8 max-w-3xl">
              <p className="mb-4">{post.excerpt}</p>
              <p className="text-lg italic text-gray-600">
                Dive deeper into this comprehensive guide where we explore every aspect of {post.title.toLowerCase()} 
                with expert insights, practical tips, and detailed explanations to help you succeed.
              </p>
            </div>

            {/* Author and Meta Information */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{post.author.name}</p>
                  <p className="text-sm text-gray-600">{post.author.role}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <FaCalendarAlt className="text-primary" />
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-1">
                  <FaClock className="text-primary" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Image Gallery */}
      <section className="bg-white py-12">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              {/* Main Image */}
              <div className="md:col-span-2">
                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              {/* Supporting Images */}
              <div className="space-y-4">
                {post.images?.slice(0, 2).map((image: string, index: number) => (
                  <div key={index} className="relative h-[190px] rounded-xl overflow-hidden shadow-md">
                    <Image
                      src={image}
                      alt={`${post.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Enhanced Article Content */}
      <section className="bg-gray-50 py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Reading Progress Bar */}
            <div className="mb-12">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Reading Progress</span>
                <span>{post.readTime} minute read</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>

            {/* Article Body with Enhanced Typography */}
            <article className="prose prose-lg prose-xl max-w-none">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                <div 
                  className="text-gray-700 leading-relaxed space-y-8 text-lg"
                  dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }}
                />
                
                {/* Call to Action Box */}
                <div className="mt-12 p-8 bg-linear-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Ready to Apply These Insights?
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Now that you've learned about {post.title.toLowerCase()}, take the next step in your puppy journey.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                      href="/puppies" 
                      className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-full transition-colors text-center"
                    >
                      Browse Puppies
                    </Link>
                    <Link 
                      href="/application" 
                      className="bg-secondary hover:bg-secondary/90 text-white font-medium py-3 px-6 rounded-full transition-colors text-center"
                    >
                      Start Application
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            {/* Enhanced Tags Section */}
            <div className="mt-12 p-8 bg-white rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Topics Covered</h3>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="bg-linear-to-r from-primary/10 to-secondary/10 text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-primary hover:text-white transition-colors cursor-pointer border border-primary/20"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Enhanced Author Bio */}
            <div className="mt-12 p-8 bg-white rounded-xl shadow-md">
              <div className="flex items-start gap-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    About {post.author.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{post.author.role}</p>
                  <p className="text-gray-700 mb-6">
                    {post.author.name === 'Sarah Johnson' && 
                      'Sarah is the founder of PuppyHub USA and has been working with dogs for over 15 years. She specializes in puppy training and behavior modification, helping thousands of families build strong bonds with their furry companions. Her expertise in ethical breeding practices and puppy development has made her a trusted voice in the pet community.'}
                    {post.author.name === 'Dr. Emily Chen' && 
                      'Dr. Chen is a licensed veterinarian with specialized training in puppy care and nutrition. She is passionate about educating new puppy owners on preventive care and optimal health practices for growing dogs. Her evidence-based approach to puppy nutrition has helped countless families raise healthy, happy pets.'}
                    {post.author.name === 'Michael Rodriguez' && 
                      'Michael is a certified professional dog trainer with over 10 years of experience working with puppies of all breeds. He uses positive reinforcement techniques to help puppies become well-behaved, confident family members. His training methods have been featured in several pet publications and he regularly conducts workshops for new puppy owners.'}
                  </p>
                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 text-primary hover:text-secondary transition-colors">
                      <FaShare className="text-sm" />
                      <span className="text-sm font-medium">Follow Author</span>
                    </button>
                    <button className="flex items-center gap-2 text-primary hover:text-secondary transition-colors">
                      <FaBookmark className="text-sm" />
                      <span className="text-sm font-medium">Save Article</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Enhanced Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-white">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Continue Reading</h2>
                <p className="text-lg text-gray-700">
                  Explore more articles to expand your puppy knowledge
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedPosts.map((relatedPost: BlogPost) => (
                  <article
                    key={relatedPost.id}
                    className="bg-gray-50 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                  >
                    {/* Featured Image */}
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={relatedPost.featuredImage}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-primary text-white px-2 py-1 rounded-full text-xs font-medium">
                          {relatedPost.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      {/* Meta Information */}
                      <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <FaCalendarAlt className="text-primary" />
                          <time dateTime={relatedPost.publishedAt}>
                            {new Date(relatedPost.publishedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </time>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaClock className="text-primary" />
                          <span>{relatedPost.readTime} min</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        <Link href={`/blog/${relatedPost.slug}`}>
                          {relatedPost.title}
                        </Link>
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>

                      {/* Read More */}
                      <div className="flex items-center justify-between">
                        <Link
                          href={`/blog/${relatedPost.slug}`}
                          className="text-primary hover:text-secondary flex items-center gap-1 text-sm font-medium"
                        >
                          Read Article
                          <FaArrowRight className="text-xs" />
                        </Link>
                        <Link
                          href={`/blog/read-more/${relatedPost.slug}`}
                          className="text-gray-600 hover:text-primary text-xs font-medium"
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="py-16 bg-linear-to-r from-primary to-secondary">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated with Expert Puppy Tips
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Get the latest articles, training advice, and exclusive content delivered to your inbox weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-primary font-medium py-3 px-8 rounded-full transition-colors hover:bg-gray-100">
                Subscribe
              </button>
            </div>
            <p className="text-white/70 text-sm mt-4">
              Join 10,000+ puppy parents getting weekly expert advice
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = [
    'bringing-home-your-first-poodle-essential-guide',
    'maltese-care-essential-tips-for-new-owners',
    'puppy-training-basics-essential-commands-every-owner-should-teach',
    'complete-puppy-nutrition-guide-what-to-feed-your-growing-dog',
    'house-training-secrets-proven-methods-for-puppy-success'
  ];

  return posts.map((slug) => ({
    slug,
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: ReadMorePageProps) {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  return {
    title: `Read More: ${post.title}`,
    description: `Extended version of ${post.title}. Dive deeper into expert advice and detailed explanations about ${post.title.toLowerCase()}.`,
    openGraph: {
      title: `Read More: ${post.title}`,
      description: `Extended version of ${post.title}. Dive deeper into expert advice and detailed explanations.`,
      images: [post.featuredImage],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Read More: ${post.title}`,
      description: `Extended version of ${post.title}. Dive deeper into expert advice and detailed explanations.`,
      images: [post.featuredImage],
    },
  };
}
