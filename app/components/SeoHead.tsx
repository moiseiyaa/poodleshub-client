"use client";
import { useEffect, useState } from "react";
import { useSeo, generateSchemaMarkup, SeoData } from "../hooks/useSeo";

interface SeoHeadProps {
  entityType: string;
  entityId?: string;
  fallbackTitle?: string;
  fallbackDescription?: string;
  fallbackImage?: string;
  additionalSchemaData?: any;
  noIndex?: boolean;
}

export default function SeoHead({
  entityType,
  entityId,
  fallbackTitle,
  fallbackDescription,
  fallbackImage,
  additionalSchemaData,
  noIndex = false,
}: SeoHeadProps) {
  const { seoData, loading } = useSeo(entityType, entityId);
  const [jsonLd, setJsonLd] = useState<any>(null);

  useEffect(() => {
    if (!loading) {
      const schema = generateSchemaMarkup(seoData, additionalSchemaData);
      setJsonLd(schema);
    }
  }, [seoData, loading, additionalSchemaData]);

  // Use SEO data if available, otherwise fallback to provided values
  const title = seoData.metaTitle || fallbackTitle || "PuppyHub USA - Premium Puppies & Doodles";
  const description = seoData.metaDescription || fallbackDescription || "Find your perfect companion at PuppyHub USA. We specialize in healthy, well-socialized Poodles, Doodles, and designer puppies.";
  const image = seoData.ogImage || fallbackImage || "/images/og-default.jpg";
  const canonicalUrl = seoData.canonicalUrl || `https://puppyhubusa.com${typeof window !== 'undefined' ? window.location.pathname : ''}`;
  const robots = noIndex ? "noindex,nofollow" : (seoData.robots || "index,follow");

  // Update document head
  useEffect(() => {
    if (typeof document === 'undefined') return;

    // Update or create title
    if (document.title !== title) {
      document.title = title;
    }

    // Helper function to update or create meta tag
    const updateMetaTag = (name: string, content: string, property?: string) => {
      let meta: HTMLMetaElement | null = document.querySelector(
        property ? `meta[property="${property}"]` : `meta[name="${name}"]`
      );
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('robots', robots);

    // Keywords
    if (seoData.focusKeywords && seoData.focusKeywords.length > 0) {
      updateMetaTag('keywords', seoData.focusKeywords.join(", "));
    }

    // Open Graph tags
    updateMetaTag('og:title', seoData.ogTitle || title, 'og:title');
    updateMetaTag('og:description', seoData.ogDescription || description, 'og:description');
    updateMetaTag('og:image', image, 'og:image');
    updateMetaTag('og:url', canonicalUrl, 'og:url');
    updateMetaTag('og:type', seoData.schemaType === "PRODUCT" ? "product" : "website", 'og:type');
    updateMetaTag('og:site_name', 'PuppyHub USA', 'og:site_name');

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', seoData.ogTitle || title);
    updateMetaTag('twitter:description', seoData.ogDescription || description);
    updateMetaTag('twitter:image', image);

    // Additional meta tags
    updateMetaTag('author', 'PuppyHub USA');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // JSON-LD Schema
    if (jsonLd) {
      let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    }

    // Charset and compatibility
    let charset = document.querySelector('meta[charset]') as HTMLMetaElement;
    if (!charset) {
      charset = document.createElement('meta');
      charset.setAttribute('charset', 'utf-8');
      document.head.appendChild(charset);
    }

    let httpEquiv = document.querySelector('meta[http-equiv="X-UA-Compatible"]') as HTMLMetaElement;
    if (!httpEquiv) {
      httpEquiv = document.createElement('meta');
      httpEquiv.setAttribute('http-equiv', 'X-UA-Compatible');
      httpEquiv.setAttribute('content', 'IE=edge');
      document.head.appendChild(httpEquiv);
    }

  }, [title, description, image, canonicalUrl, robots, seoData, jsonLd]);

  return null; // This component doesn't render anything visible
}
