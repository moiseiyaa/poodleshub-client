'use client';

/**
 * Loading component
 * Displayed during page transitions and data fetching
 */
export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/80 backdrop-blur-sm">
      <div className="loader" style={{ width: '200px' }}></div>
    </div>
  );
}
