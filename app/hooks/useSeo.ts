import { useEffect, useState } from "react";
import { generateJsonLd } from "../lib/schema-generator";

const getApiUrl = () =>
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://api.puppyhubusa.com"
    : "http://localhost:4000");

export interface SeoData {
  metaTitle?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  robots?: string;
  schemaType?: "ARTICLE" | "PRODUCT" | "FAQ" | "ORGANIZATION" | "WEBSITE" | "LOCAL_BUSINESS" | "BREADCRUMB";
  focusKeywords?: string[];
}

export function useSeo(entityType: string, entityId?: string) {
  const [seoData, setSeoData] = useState<SeoData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeoData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${getApiUrl()}/api/seo/public/${entityType}${entityId ? `/${entityId}` : ''}`
        );
        
        if (response.ok) {
          const data = await response.json();
          setSeoData(data);
        }
      } catch (error) {
        console.error('Error fetching SEO data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeoData();
  }, [entityType, entityId]);

  return { seoData, loading };
}

export function generateSchemaMarkup(seoData: SeoData, additionalData?: any) {
  const schemaType = seoData.schemaType || "WEBSITE";
  return generateJsonLd(schemaType, seoData, additionalData);
}
