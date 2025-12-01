import { useEffect } from 'react';

/**
 * Custom hook to scroll to top of page on component mount
 * Ensures users always start at the top when navigating to a new page
 */
export const useScrollToTop = (): void => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
};
