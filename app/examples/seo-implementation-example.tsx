"use client";
import SeoHead from "../components/SeoHead";
import { PuppySchemaData, OrganizationSchemaData } from "../lib/schema-generator";

// Example 1: Home Page with Organization Schema
export function HomePageExample() {
  const organizationData: OrganizationSchemaData = {
    name: "PuppyHub USA",
    description: "Premium Poodles, Doodles and Designer Puppies with health guarantees",
    url: "https://puppyhubusa.com",
    logo: "https://puppyhubusa.com/logo.png",
    contactPoint: {
      telephone: "+1-555-PUPPIES",
      contactType: "customer service",
      availableLanguage: ["English"]
    },
    address: {
      streetAddress: "123 Puppy Lane, Suite 100",
      addressLocality: "Puppyville",
      addressRegion: "CA",
      postalCode: "90210",
      addressCountry: "US"
    },
    sameAs: [
      "https://www.facebook.com/puppyhubusa",
      "https://www.instagram.com/puppyhubusa",
      "https://www.twitter.com/puppyhubusa"
    ]
  };

  return (
    <>
      <SeoHead
        entityType="PAGE"
        entityId="home"
        fallbackTitle="PuppyHub USA - Premium Puppies & Doodles"
        fallbackDescription="Find your perfect companion at PuppyHub USA. We specialize in healthy, well-socialized Poodles, Doodles, and designer puppies."
        fallbackImage="/images/og-home.jpg"
        additionalSchemaData={organizationData}
      />
      {/* Your page content here */}
      <main>
        <h1>Welcome to PuppyHub USA</h1>
        <p>Your perfect companion awaits...</p>
      </main>
    </>
  );
}

// Example 2: Puppy Detail Page with Product Schema
export function PuppyDetailPageExample({ puppy }: { puppy: any }) {
  const puppyData: PuppySchemaData = {
    name: puppy.name,
    breed: puppy.breed,
    description: `${puppy.name} is a beautiful ${puppy.color} ${puppy.breed} ${puppy.gender} puppy. Well-socialized and ready for a loving home.`,
    image: puppy.images?.[0],
    price: puppy.price,
    availability: puppy.status === "available" ? "In Stock" : "Out of Stock",
    gender: puppy.gender,
    color: puppy.color,
    age: puppy.age,
    location: "Puppyville, CA"
  };

  return (
    <>
      <SeoHead
        entityType="PUPPY"
        entityId={puppy.id}
        fallbackTitle={`${puppy.name} - ${puppy.breed} Puppy for Adoption | PuppyHub USA`}
        fallbackDescription={`Meet ${puppy.name}, a beautiful ${puppy.color} ${puppy.breed} ${puppy.gender} puppy available for adoption. Health guaranteed and well-socialized.`}
        fallbackImage={puppy.images?.[0]}
        additionalSchemaData={puppyData}
      />
      {/* Your puppy detail content here */}
      <main>
        <h1>{puppy.name}</h1>
        <p>{puppy.breed} • {puppy.gender} • ${puppy.color}</p>
        <p>Price: ${puppy.price}</p>
      </main>
    </>
  );
}

// Example 3: Breed Page with Article Schema
export function BreedPageExample({ breed }: { breed: any }) {
  return (
    <>
      <SeoHead
        entityType="BREED"
        entityId={breed.id}
        fallbackTitle={`${breed.name} Puppies for Sale - Information & Characteristics`}
        fallbackDescription={`Learn about ${breed.name} puppies including temperament, size, and care requirements. Browse available ${breed.name} puppies at PuppyHub USA.`}
        fallbackImage="/images/breeds/default-breed.jpg"
        additionalSchemaData={{
          headline: `${breed.name} Puppies - Complete Guide`,
          author: "PuppyHub USA",
          datePublished: new Date().toISOString(),
          dateModified: new Date().toISOString(),
          articleBody: breed.description
        }}
      />
      {/* Your breed content here */}
      <main>
        <h1>{breed.name} Puppies</h1>
        <p>{breed.description}</p>
      </main>
    </>
  );
}

// Example 4: FAQ Page with FAQ Schema
export function FaqPageExample() {
  const faqData = {
    questions: [
      {
        question: "What health guarantees do you offer?",
        answer: "All our puppies come with a comprehensive health guarantee covering genetic conditions for up to 2 years."
      },
      {
        question: "How do I reserve a puppy?",
        answer: "You can reserve a puppy through our website by paying a $300 deposit, which holds the puppy for 30 days."
      },
      {
        question: "Do you ship puppies?",
        answer: "Yes, we offer safe puppy delivery services throughout the United States with specialized pet transport."
      },
      {
        question: "What vaccinations do puppies receive?",
        answer: "All puppies receive age-appropriate vaccinations and deworming before going to their new homes."
      }
    ]
  };

  return (
    <>
      <SeoHead
        entityType="PAGE"
        entityId="faq"
        fallbackTitle="Frequently Asked Questions - PuppyHub USA"
        fallbackDescription="Find answers to common questions about puppy adoption, health guarantees, delivery, and more at PuppyHub USA."
        fallbackImage="/images/og-faq.jpg"
        additionalSchemaData={faqData}
      />
      {/* Your FAQ content here */}
      <main>
        <h1>Frequently Asked Questions</h1>
        {faqData.questions.map((faq, index) => (
          <div key={index}>
            <h2>{faq.question}</h2>
            <p>{faq.answer}</p>
          </div>
        ))}
      </main>
    </>
  );
}

// Example 5: Blog Post with Article Schema
export function BlogPostExample({ post }: { post: any }) {
  return (
    <>
      <SeoHead
        entityType="BLOG"
        entityId={post.id}
        fallbackTitle={`${post.title} | PuppyHub USA Blog`}
        fallbackDescription={post.excerpt}
        fallbackImage={post.featuredImage}
        additionalSchemaData={{
          headline: post.title,
          author: "PuppyHub USA Team",
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
          articleBody: post.content,
          image: post.featuredImage
        }}
      />
      {/* Your blog post content here */}
      <main>
        <article>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </main>
    </>
  );
}

// Example 6: Breadcrumbs with Breadcrumb Schema
export function CategoryPageExample({ category }: { category: string }) {
  const breadcrumbs = [
    { name: "Home", url: "https://puppyhubusa.com" },
    { name: "Puppies", url: "https://puppyhubusa.com/puppies" },
    { name: category, url: `https://puppyhubusa.com/puppies/${category.toLowerCase()}` }
  ];

  return (
    <>
      <SeoHead
        entityType="CATEGORY"
        entityId={category.toLowerCase()}
        fallbackTitle={`${category} Puppies for Sale | PuppyHub USA`}
        fallbackDescription={`Browse our available ${category} puppies. All puppies are health-guaranteed and well-socialized. Find your perfect ${category} companion today.`}
        fallbackImage={`/images/categories/${category.toLowerCase()}.jpg`}
        additionalSchemaData={breadcrumbs}
      />
      
      {/* Breadcrumb navigation */}
      <nav aria-label="Breadcrumb">
        <ol>
          {breadcrumbs.map((crumb, index) => (
            <li key={index}>
              {index < breadcrumbs.length - 1 ? (
                <a href={crumb.url}>{crumb.name}</a>
              ) : (
                <span>{crumb.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Your category content here */}
      <main>
        <h1>{category} Puppies</h1>
        <p>Browse our selection of {category.toLowerCase()} puppies...</p>
      </main>
    </>
  );
}

// Example 7: No-Index Page (Admin, Login, etc.)
export function AdminPageExample() {
  return (
    <>
      <SeoHead
        entityType="PAGE"
        entityId="admin"
        fallbackTitle="Admin Dashboard - PuppyHub USA"
        noIndex={true} // This tells search engines not to index this page
      />
      {/* Your admin content here */}
      <main>
        <h1>Admin Dashboard</h1>
        <p>Welcome to the admin panel...</p>
      </main>
    </>
  );
}

// Usage Instructions:
/*
1. Import SeoHead component
2. Determine your entity type (PAGE, PUPPY, BREED, BLOG, CATEGORY)
3. Provide entityId if applicable (for specific entities)
4. Add fallback values for SEO
5. Include additional schema data when needed
6. Set noIndex for pages that shouldn't be crawled

The SEO system will:
- Fetch SEO data from the database
- Apply database values if they exist
- Fall back to provided values if no database entry
- Generate appropriate JSON-LD schema
- Inject all meta tags into the document head
- Handle Open Graph and Twitter Card tags
- Set canonical URLs and robots directives

Admins can manage all SEO values through:
/admin/seo

The system includes validation and safeguards:
- Title length validation (30-70 chars recommended)
- Description length validation (120-160 chars recommended)
- Keyword stuffing detection
- Critical page protection (home, about, contact)
- Slug uniqueness checking
- Placeholder content detection
- SEO scoring and recommendations
*/
