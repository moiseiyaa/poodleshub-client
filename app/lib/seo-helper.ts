
interface SeoData {
  id: string;
  metaTitle: string;
  metaDescription: string;
  focusKeywords?: string[];
  slug: string;
  canonicalUrl: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  schemaType?: string;
  customMeta?: Record<string, string>;
}

export async function getSeoData(entityType: 'PAGE' | 'BLOG' | 'PUPPY', entityId: string): Promise<SeoData | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/seo/public/${entityType}/${entityId}`
    );
    
    if (!response.ok) {
      console.error('SEO data not found for:', { entityType, entityId });
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching SEO data:', error);
    return null;
  }
}

export function generateMetadataFromSeo(seoData: SeoData) {
  return {
    title: seoData.metaTitle,
    description: seoData.metaDescription,
    keywords: seoData.focusKeywords?.join(', '),
    robots: seoData.robots,
    openGraph: {
      title: seoData.ogTitle || seoData.metaTitle,
      description: seoData.ogDescription || seoData.metaDescription,
      images: seoData.ogImage ? [{ url: seoData.ogImage }] : undefined,
    },
    alternates: {
      canonical: seoData.canonicalUrl,
    },
  };
}