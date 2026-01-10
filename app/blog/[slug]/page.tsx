import BlogPostClient from './BlogPostClient';

export default function Page() {
  return <BlogPostClient />;
}
                </li>
                <li>/</li>
                <li className="text-gray-900">{post.title}</li>
              </ol>
            </nav>

            {/* Category Badge */}
            <div className="mb-6">
              <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-700 mb-8 max-w-3xl">
              {post.excerpt}
            </p>

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

      {/* Featured Image */}
      <section className="bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg mb-12">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Article Content */}
      <section className="bg-white py-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Social Sharing Bar */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors">
                  <FaShare className="text-sm" />
                  <span className="text-sm">Share</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors">
                  <FaBookmark className="text-sm" />
                  <span className="text-sm">Save</span>
                </button>
              </div>
              <Link 
                href="/blog" 
                className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
              >
                <FaArrowLeft className="text-sm" />
                <span className="text-sm">Back to Blog</span>
              </Link>
            </div>

            {/* Article Body */}
            <article className="prose prose-lg max-w-none">
              <div 
                className="text-gray-700 leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: parseMarkdownToHtml(post.content) }}
              />
            </article>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-primary hover:text-white transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-12 p-8 bg-gray-50 rounded-xl">
              <div className="flex items-start gap-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    About {post.author.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{post.author.role}</p>
                  <p className="text-gray-700">
                    {post.author.name === 'Sarah Johnson' && 
                      'Sarah is the founder of PuppyHub USA and has been working with dogs for over 15 years. She specializes in puppy training and behavior modification, helping thousands of families build strong bonds with their furry companions.'}
                    {post.author.name === 'Dr. Emily Chen' && 
                      'Dr. Chen is a licensed veterinarian with specialized training in puppy care and nutrition. She is passionate about educating new puppy owners on preventive care and optimal health practices for growing dogs.'}
                    {post.author.name === 'Michael Rodriguez' && 
                      'Michael is a certified professional dog trainer with over 10 years of experience working with puppies of all breeds. He uses positive reinforcement techniques to help puppies become well-behaved, confident family members.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Articles</h2>
                <p className="text-lg text-gray-700">
                  Continue reading with these similar articles
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <article
                    key={relatedPost.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden group"
                  >
                    {/* Featured Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relatedPost.featuredImage}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                          {relatedPost.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Meta Information */}
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <FaCalendarAlt className="text-primary" />
                          <time dateTime={relatedPost.publishedAt}>
                            {new Date(relatedPost.publishedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </time>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaClock className="text-primary" />
                          <span>{relatedPost.readTime} min</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                        <Link href={`/blog/${relatedPost.slug}`}>
                          {relatedPost.title}
                        </Link>
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-700 mb-4 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>

                      {/* Read More */}
                      <Link
                        href={`/blog/${relatedPost.slug}`}
                        className="text-primary hover:text-secondary flex items-center gap-1 text-sm font-medium"
                      >
                        Read More
                        <FaArrowRight className="text-xs" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Apply These Tips?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Now that you've learned more about puppy care, it's time to find your perfect companion.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/puppies" 
                className="bg-white hover:bg-gray-100 text-primary font-medium py-3 px-8 rounded-full transition-colors text-center"
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
