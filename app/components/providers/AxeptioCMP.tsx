'use client';

import Script from 'next/script';

interface AxeptioCMPProps {
  /**
   * Your Axeptio CMP script code
   * Get this from Axeptio dashboard: Cookies configuration > "Integration on your website"
   * 
   * Example format:
   * "window.axeptioSettings = {...}; (function(d,s){...})(document,'script');"
   */
  scriptCode?: string;
}

/**
 * Axeptio CMP (Consent Management Platform) component
 * 
 * This component loads the Axeptio consent banner script.
 * The script should be placed in the <head> tag, AFTER the consent mode initialization.
 * 
 * To get your script code:
 * 1. Log in to Axeptio dashboard
 * 2. Go to Cookies configuration
 * 3. Click "Integration on your website"
 * 4. Copy the provided script code
 * 5. Add it to your .env.local file as NEXT_PUBLIC_AXEPTIO_SCRIPT_CODE
 * 
 * @param scriptCode - The Axeptio CMP script code from your dashboard
 */
export default function AxeptioCMP({ scriptCode }: AxeptioCMPProps) {
  if (!scriptCode) {
    // In development, show a helpful message
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        'Axeptio CMP script not provided. ' +
        'Add NEXT_PUBLIC_AXEPTIO_SCRIPT_CODE to your .env.local file. ' +
        'Get the script from: Axeptio Dashboard > Cookies configuration > Integration on your website'
      );
    }
    return null;
  }

  return (
    <Script
      id="axeptio-cmp"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: scriptCode,
      }}
    />
  );
}

