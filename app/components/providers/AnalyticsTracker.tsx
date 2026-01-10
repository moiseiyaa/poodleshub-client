'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * AnalyticsTracker - Automatic page view and event tracking
 * Works with Google Tag Manager and Google Analytics 4
 * Also sends events to backend for local analytics storage
 */

const getApiUrl = () =>
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:4000'
    : 'https://api.puppyhubusa.com');

interface AnalyticsEvent {
  eventType: string;
  pathname: string;
  userId?: string;
  metadata?: Record<string, any>;
}

// Track page view to both GA4 (via dataLayer) and backend
const trackPageView = async (url: string) => {
  // Track to GA4 via dataLayer (GTM will pick this up)
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'page_view',
      page_path: url,
      page_title: document.title,
      page_location: window.location.href,
    });
  }

  // Track to gtag if available (for direct GA4 integration)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: url,
      page_title: document.title,
      page_location: window.location.href,
    });
  }

  // Also send to backend for local analytics storage
  try {
    const userId = getUserId();
    await fetch(`${getApiUrl()}/api/analytics/log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventType: 'pageView',
        pathname: url,
        userId,
        metadata: {
          title: document.title,
          referrer: document.referrer,
        },
      }),
    });
  } catch (error) {
    console.error('Failed to log page view to backend:', error);
  }
};

// Get or create a unique user ID for tracking
const getUserId = (): string => {
  if (typeof window === 'undefined') return '';
  
  let userId = localStorage.getItem('analytics_user_id');
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('analytics_user_id', userId);
  }
  return userId;
};

// Track custom events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  // Track to GA4 via dataLayer
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...parameters,
    });
  }

  // Track to gtag
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }

  // Also send to backend
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  fetch(`${getApiUrl()}/api/analytics/log`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventType: eventName,
      pathname,
      userId: getUserId(),
      metadata: parameters,
    }),
  }).catch(error => console.error('Failed to log event to backend:', error));
};

// Track conversions (applications, inquiries, etc.)
export const trackConversion = (conversionName: string, value?: number, metadata?: Record<string, any>) => {
  trackEvent('conversion', {
    conversion_name: conversionName,
    value,
    currency: 'USD',
    ...metadata,
  });

  // Also send as specific event type to backend
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  fetch(`${getApiUrl()}/api/analytics/log`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventType: conversionName === 'application_submit' ? 'inquiry' : 'purchase',
      pathname,
      userId: getUserId(),
      metadata: { ...metadata, value },
    }),
  }).catch(error => console.error('Failed to log conversion to backend:', error));
};

// Track form submissions
export const trackFormSubmit = (formName: string, formData?: Record<string, any>) => {
  trackEvent('form_submit', {
    form_name: formName,
    ...formData,
  });
};

// Track button clicks
export const trackButtonClick = (buttonName: string, metadata?: Record<string, any>) => {
  trackEvent('button_click', {
    button_name: buttonName,
    ...metadata,
  });
};

// Track puppy views
export const trackPuppyView = (puppyId: string, puppyName: string, breed: string) => {
  trackEvent('view_item', {
    item_id: puppyId,
    item_name: puppyName,
    item_category: breed,
  });
};

// Track search
export const trackSearch = (searchTerm: string, resultsCount?: number) => {
  trackEvent('search', {
    search_term: searchTerm,
    results_count: resultsCount,
  });
};

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      const url = searchParams?.toString()
        ? `${pathname}?${searchParams.toString()}`
        : pathname;
      
      trackPageView(url);
    }
  }, [pathname, searchParams]);

  // No visual component - just tracking logic
  return null;
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

