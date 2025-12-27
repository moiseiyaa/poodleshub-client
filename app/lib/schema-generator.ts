import { SeoData } from "../hooks/useSeo";

export interface PuppySchemaData {
  name: string;
  breed: string;
  description?: string;
  image?: string;
  price?: number;
  availability?: string;
  gender?: string;
  color?: string;
  age?: string;
  location?: string;
}

export interface ArticleSchemaData {
  headline: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
  articleBody?: string;
  image?: string;
}

export interface FaqSchemaData {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

export interface OrganizationSchemaData {
  name: string;
  description?: string;
  url?: string;
  logo?: string;
  contactPoint?: {
    telephone?: string;
    contactType?: string;
    availableLanguage?: string[];
  };
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
    latitude?: number;
    longitude?: number;
  };
  sameAs?: string[];
}

export function generateProductSchema(seoData: SeoData, puppyData?: PuppySchemaData) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": puppyData?.name || seoData.ogTitle || seoData.metaTitle,
    "description": puppyData?.description || seoData.ogDescription || seoData.metaDescription,
    "image": puppyData?.image || seoData.ogImage,
    "brand": {
      "@type": "Brand",
      "name": "PuppyHub USA"
    },
    "category": puppyData?.breed || "Puppies",
    "offers": puppyData?.price ? {
      "@type": "Offer",
      "price": puppyData.price,
      "priceCurrency": "USD",
      "availability": puppyData?.availability === "available" 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "PuppyHub USA",
        "url": "https://puppyhubusa.com"
      }
    } : undefined,
    "additionalProperty": [
      ...(puppyData?.gender ? [{
        "@type": "PropertyValue",
        "name": "Gender",
        "value": puppyData.gender
      }] : []),
      ...(puppyData?.color ? [{
        "@type": "PropertyValue",
        "name": "Color",
        "value": puppyData.color
      }] : []),
      ...(puppyData?.age ? [{
        "@type": "PropertyValue",
        "name": "Age",
        "value": puppyData.age
      }] : [])
    ]
  };
}

export function generateArticleSchema(seoData: SeoData, articleData?: ArticleSchemaData) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": articleData?.headline || seoData.ogTitle || seoData.metaTitle,
    "description": seoData.ogDescription || seoData.metaDescription,
    "image": articleData?.image || seoData.ogImage,
    "author": articleData?.author ? {
      "@type": "Organization",
      "name": articleData.author
    } : {
      "@type": "Organization",
      "name": "PuppyHub USA"
    },
    "publisher": {
      "@type": "Organization",
      "name": "PuppyHub USA",
      "logo": {
        "@type": "ImageObject",
        "url": "https://puppyhubusa.com/logo.png"
      }
    },
    "datePublished": articleData?.datePublished,
    "dateModified": articleData?.dateModified || new Date().toISOString(),
    "articleBody": articleData?.articleBody,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": seoData.canonicalUrl
    }
  };
}

export function generateFaqSchema(seoData: SeoData, faqData: FaqSchemaData) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.questions.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function generateOrganizationSchema(seoData: SeoData, orgData?: OrganizationSchemaData) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": orgData?.name || "PuppyHub USA",
    "description": orgData?.description || seoData.ogDescription || seoData.metaDescription,
    "url": orgData?.url || "https://puppyhubusa.com",
    "logo": orgData?.logo || "https://puppyhubusa.com/logo.png",
    "contactPoint": orgData?.contactPoint ? {
      "@type": "ContactPoint",
      "telephone": orgData.contactPoint.telephone,
      "contactType": orgData.contactPoint.contactType || "customer service",
      "availableLanguage": orgData.contactPoint.availableLanguage || ["English"]
    } : {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["English"]
    },
    "address": orgData?.address ? {
      "@type": "PostalAddress",
      "streetAddress": orgData.address.streetAddress,
      "addressLocality": orgData.address.addressLocality,
      "addressRegion": orgData.address.addressRegion,
      "postalCode": orgData.address.postalCode,
      "addressCountry": orgData.address.addressCountry
    } : undefined,
    "sameAs": orgData?.sameAs || [
      "https://www.facebook.com/puppyhubusa",
      "https://www.instagram.com/puppyhubusa",
      "https://www.twitter.com/puppyhubusa"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "knowsAbout": [
      "Puppies",
      "Poodles",
      "Doodles",
      "Designer Dogs",
      "Pet Care",
      "Dog Training"
    ]
  };
}

export function generateLocalBusinessSchema(seoData: SeoData, businessData?: Partial<OrganizationSchemaData>) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": businessData?.name || "PuppyHub USA",
    "description": businessData?.description || seoData.ogDescription || seoData.metaDescription,
    "url": businessData?.url || "https://puppyhubusa.com",
    "logo": businessData?.logo || "https://puppyhubusa.com/logo.png",
    "telephone": businessData?.contactPoint?.telephone,
    "address": businessData?.address ? {
      "@type": "PostalAddress",
      "streetAddress": businessData.address.streetAddress,
      "addressLocality": businessData.address.addressLocality,
      "addressRegion": businessData.address.addressRegion,
      "postalCode": businessData.address.postalCode,
      "addressCountry": businessData.address.addressCountry
    } : undefined,
    "geo": businessData?.address ? {
      "@type": "GeoCoordinates",
      "latitude": businessData.address.latitude,
      "longitude": businessData.address.longitude
    } : undefined,
    "openingHours": [
      "Mo-Fr 09:00-18:00",
      "Sa 10:00-16:00",
      "Su Closed"
    ],
    "priceRange": "$$$",
    "paymentAccepted": ["Credit Card", "Cash", "Bank Transfer"],
    "currenciesAccepted": "USD"
  };
}

export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
}

export function generateWebsiteSchema(seoData: SeoData) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PuppyHub USA",
    "description": seoData.ogDescription || seoData.metaDescription,
    "url": "https://puppyhubusa.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://puppyhubusa.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "PuppyHub USA",
      "url": "https://puppyhubusa.com"
    },
    "copyrightYear": new Date().getFullYear(),
    "inLanguage": "en-US"
  };
}

// Main schema generator function
export function generateJsonLd(
  schemaType: "ARTICLE" | "PRODUCT" | "FAQ" | "ORGANIZATION" | "WEBSITE" | "LOCAL_BUSINESS" | "BREADCRUMB",
  seoData: SeoData,
  additionalData?: any
) {
  switch (schemaType) {
    case "PRODUCT":
      return generateProductSchema(seoData, additionalData);
    case "ARTICLE":
      return generateArticleSchema(seoData, additionalData);
    case "FAQ":
      return generateFaqSchema(seoData, additionalData);
    case "ORGANIZATION":
      return generateOrganizationSchema(seoData, additionalData);
    case "WEBSITE":
      return generateWebsiteSchema(seoData);
    case "LOCAL_BUSINESS":
      return generateLocalBusinessSchema(seoData, additionalData);
    case "BREADCRUMB":
      return generateBreadcrumbSchema(additionalData);
    default:
      return generateWebsiteSchema(seoData);
  }
}
