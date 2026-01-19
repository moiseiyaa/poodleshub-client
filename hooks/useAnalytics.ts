// src: client/hooks/useAnalytics.ts
'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/app/lib/local-analytics';

// Hook to automatically track page views on route change
export function usePageView(): void {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname) {
      trackPageView(pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
}
