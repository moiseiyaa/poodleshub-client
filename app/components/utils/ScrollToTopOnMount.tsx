'use client';

import { useEffect } from 'react';

/**
 * Component that automatically scrolls to top of page on mount
 * Ensures users always start at the top when navigating to a new page
 */
export default function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null; // This component doesn't render anything
}
