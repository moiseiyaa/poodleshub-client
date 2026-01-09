'use client';

import Script from 'next/script';
import { useEffect } from 'react';

interface GoogleTagManagerProps {
  gtmId: string;
  renderNoscript?: boolean;
}

/**
 * Google Tag Manager component for Next.js
 * Implements GTM as per Google's recommendations:
 * 1. Script in <head> (high as possible)
 * 2. Noscript fallback immediately after <body>
 * 
 * @param gtmId - Your GTM container ID (e.g., GTM-TXCV2ZLK)
 * @param renderNoscript - Whether to render only the noscript iframe (true for body, false for head script)
 */
export default function GoogleTagManager({ gtmId, renderNoscript = false }: GoogleTagManagerProps) {
  useEffect(() => {
    // Initialize dataLayer if it doesn't exist
    if (typeof window !== 'undefined' && !window.dataLayer) {
      window.dataLayer = window.dataLayer || [];
    }
  }, []);

  if (!gtmId) {
    console.warn('Google Tag Manager ID is not provided');
    return null;
  }

  // If renderNoscript is true, only render the noscript fallback (for body)
  if (renderNoscript) {
    return (
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    );
  }

  // Otherwise, render the script (for head)
  return (
    <Script
      id="gtm-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `,
      }}
    />
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
  }
}

