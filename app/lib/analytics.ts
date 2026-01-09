/**
 * Analytics utility functions
 * Provides helper functions for tracking events with Google Analytics/Tag Manager
 */

// Check if analytics is available
export const isAnalyticsAvailable = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!(window.dataLayer || window.gtag);
};

/**
 * Track a custom event
 * Works with both GTM (dataLayer) and GA4 (gtag)
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
): void => {
  if (typeof window === 'undefined') return;

  // GTM method (preferred if available)
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventParams,
    });
    return;
  }

  // GA4 method (fallback)
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

/**
 * Track page view
 */
export const trackPageView = (url: string, title?: string): void => {
  trackEvent('page_view', {
    page_path: url,
    page_title: title || document.title,
    page_location: typeof window !== 'undefined' ? window.location.href : url,
  });
};

/**
 * Track conversion events
 */
export const trackConversion = (conversionType: string, value?: number, currency: string = 'USD'): void => {
  trackEvent('conversion', {
    conversion_type: conversionType,
    value,
    currency,
  });
};

/**
 * Track e-commerce events
 */
export const trackPurchase = (
  transactionId: string,
  value: number,
  currency: string = 'USD',
  items?: Array<{
    item_id: string;
    item_name: string;
    category?: string;
    quantity?: number;
    price?: number;
  }>
): void => {
  trackEvent('purchase', {
    transaction_id: transactionId,
    value,
    currency,
    items,
  });
};

/**
 * Track form submissions
 */
export const trackFormSubmission = (formName: string, formId?: string): void => {
  trackEvent('form_submit', {
    form_name: formName,
    form_id: formId,
  });
};

/**
 * Track button clicks
 */
export const trackButtonClick = (buttonName: string, buttonLocation?: string): void => {
  trackEvent('button_click', {
    button_name: buttonName,
    button_location: buttonLocation,
  });
};

/**
 * Track application/puppy inquiry
 */
export const trackInquiry = (puppyId?: string, puppyName?: string, breed?: string): void => {
  trackEvent('inquiry', {
    puppy_id: puppyId,
    puppy_name: puppyName,
    breed,
    event_category: 'engagement',
  });
};

/**
 * Track search queries
 */
export const trackSearch = (searchTerm: string, resultsCount?: number): void => {
  trackEvent('search', {
    search_term: searchTerm,
    results_count: resultsCount,
    event_category: 'search',
  });
};

/**
 * Track video interactions
 */
export const trackVideoPlay = (videoTitle: string, videoUrl?: string): void => {
  trackEvent('video_play', {
    video_title: videoTitle,
    video_url: videoUrl,
  });
};

/**
 * Set user properties
 */
export const setUserProperties = (properties: Record<string, any>): void => {
  if (typeof window === 'undefined') return;

  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'user_properties',
      user_properties: properties,
    });
  }

  if (window.gtag) {
    window.gtag('set', 'user_properties', properties);
  }
};

// Extend Window interface
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}



