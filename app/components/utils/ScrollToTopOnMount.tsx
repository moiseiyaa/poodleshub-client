'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Component that automatically scrolls to top of page on mount
 * Ensures users always start at the top when navigating to a new page
 */
export default function ScrollToTopOnMount() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null; // This component doesn't render anything
}
