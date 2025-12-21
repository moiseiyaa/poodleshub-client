import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaUser, FaClock, FaTag, FaArrowRight } from 'react-icons/fa';
import Container from '../components/organisms/Container';
import { blogPosts, getBlogCategories, getLatestBlogPosts } from '../data/blog';

/**
 * Blog main page component
 * Displays all blog posts with filtering and search functionality
 * Maintains consistent design with the rest of the PuppyHub USA website
 */
export default function BlogPage() {
  const categories = getBlogCategories();
  const latestPosts = getLatestBlogPosts(6);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-50 py-16 md:py-24">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              PuppyHub USA Blog
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Expert advice, training tips, and heartwarming stories to help you 
              give your puppy the best start in life.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-primary" />
                <span>Updated Weekly</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUser className="text-primary" />
                <span>Expert Authors</span>
              </div>
              <div className="flex items-center gap-2">
                <FaTag className="text-primary" />
                <span>Practical Tips</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white border-b">
        <Container>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Browse by Category</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => {
              const categoryPosts = blogPosts.filter(post => post.category === category);
              return (
                <Link
                  key={category}
                  href={`/blog/category/${category.toLowerCase().replace(' & ', '-').replace(' ', '-')}`}
                  className="bg-gray-100 hover:bg-primary hover:text-white px-6 py-3 rounded-full transition-colors text-center"
                >
                  {category} ({categoryPosts.length})
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Featured Posts */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Articles</h2>
            <p className="text-lg text-gray-700">
              Fresh insights and expert advice for puppy parents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden group"
              >
                {/* Featured Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta Information */}
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
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

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Author and Read More */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                        <p className="text-xs text-gray-600">{post.author.role}</p>
                      </div>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-primary hover:text-secondary flex items-center gap-1 text-sm font-medium"
                    >
                      Read More
                      <FaArrowRight className="text-xs" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated with Puppy Tips
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Get the latest articles, training advice, and exclusive content delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-secondary hover:bg-secondary/90 text-white font-medium py-3 px-8 rounded-full transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-white/70 text-sm mt-4">
              Join 10,000+ puppy parents getting weekly tips
            </p>
          </div>
        </Container>
      </section>

      {/* Popular Topics */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Topics</h2>
            <p className="text-lg text-gray-700">
              Explore our most-read articles on essential puppy topics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUser className="text-white text-2xl" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Puppy Training</h3>
              <p className="text-gray-700 text-sm mb-4">
                Basic commands, house training, and behavior tips
              </p>
              <Link href="/blog/category/training" className="text-primary hover:text-secondary font-medium text-sm">
                View Articles →
              </Link>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTag className="text-white text-2xl" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Health & Nutrition</h3>
              <p className="text-gray-700 text-sm mb-4">
                Feeding guides, health advice, and veterinary tips
              </p>
              <Link href="/blog/category/health-nutrition" className="text-primary hover:text-secondary font-medium text-sm">
                View Articles →
              </Link>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaClock className="text-white text-2xl" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Puppy Care</h3>
              <p className="text-gray-700 text-sm mb-4">
                Grooming, socialization, and daily care essentials
              </p>
              <Link href="/blog/category/puppy-care" className="text-primary hover:text-secondary font-medium text-sm">
                View Articles →
              </Link>
            </div>

            <div className="text-center p-6 bg-orange-50 rounded-xl">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCalendarAlt className="text-white text-2xl" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Breed Guides</h3>
              <p className="text-gray-700 text-sm mb-4">
                Breed-specific care and characteristics
              </p>
              <Link href="/blog/category/breed-care" className="text-primary hover:text-secondary font-medium text-sm">
                View Articles →
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Start Your Puppy Journey?
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Browse our available puppies and start the application process to bring 
              home your new furry family member.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/puppies" 
                className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-full transition-colors text-center"
              >
                Browse Available Puppies
              </Link>
              <Link 
                href="/application" 
                className="bg-secondary hover:bg-secondary/90 text-white font-medium py-3 px-8 rounded-full transition-colors text-center"
              >
                Start Application
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
