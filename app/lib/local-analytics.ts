// src: client/app/lib/local-analytics.ts
// Utility functions for local analytics tracking via backend API (AnalyticsEvent)
// This complements the GA-based analytics.ts utilities. We avoid naming conflicts.

const isBrowser = (): boolean => typeof window !== 'undefined';

interface TrackPayload {
  event: string;
  url?: string;
  timestamp?: string;
  [key: string]: unknown;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === 'production'
  ? 'https://api.puppyhubusa.com'
  : 'http://localhost:4000');

export async function trackEvent(event: string, data: Record<string, unknown> = {}): Promise<void> {
  if (!isBrowser()) return;

  const payload: TrackPayload = {
    event,
    url: window.location.pathname,
    timestamp: new Date().toISOString(),
    ...data,
  };

  try {
    await fetch(`${API_BASE}/api/analytics/log`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Local analytics trackEvent failed', err);
    }
  }
}

export function trackPageView(pathname: string): void {
  trackEvent('pageView', { pathname });
}

export function trackClick(element: string, metadata: Record<string, unknown> = {}): void {
  trackEvent('click', { element, ...metadata });
}

export function trackFormSubmit(formId: string, fields: string[] = []): void {
  if (!isBrowser()) return;
  const form = document.getElementById(formId);
  if (!form) return;

  const handler = () => {
    const formData = new FormData(form as HTMLFormElement);
    const fieldStatus = fields.reduce<Record<string, string>>((acc, field) => {
      // filled or empty indicator
      acc[field] = formData.get(field) ? 'filled' : 'empty';
      return acc;
    }, {});
    trackEvent('form_submit', { formId, fields: fieldStatus });
  };

  form.addEventListener('submit', handler, { once: true });
}
