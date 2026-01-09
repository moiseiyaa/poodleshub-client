'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface GoogleAnalyticsProps {
  measurementId?: string;
  gtmId?: string;
}

/**
 * Google Analytics 4 component
 * Can be used standalone with measurementId or via GTM
 * Tracks page views automatically on route changes
 */
export default function GoogleAnalytics({ measurementId, gtmId }: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // If using GTM, GA4 should be configured in GTM, so we just track page views
  // If using standalone GA4, we need to load the gtag script
  const useStandaloneGA = measurementId && !gtmId;

  useEffect(() => {
    // Track page views on route changes
    if (typeof window === 'undefined') return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    // If using GTM, push page view event to dataLayer
    if (gtmId && window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_path: url,
        page_title: document.title,
        page_location: window.location.href,
      });
    }

    // If using standalone GA4
    if (useStandaloneGA && window.gtag) {
      window.gtag('config', measurementId, {
        page_path: url,
        page_title: document.title,
      });
    }
  }, [pathname, searchParams, gtmId, measurementId, useStandaloneGA]);

  if (useStandaloneGA) {
    return (
      <>
        {/* Google Analytics 4 Global Site Tag */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        />
        <Script
          id="ga4-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${measurementId}', {
                page_path: window.location.pathname,
                send_page_view: true
              });
            `,
          }}
        />
      </>
    );
  }

  // If using GTM, GA4 will be configured in GTM dashboard
  // This component just handles page view tracking
  return null;
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}



