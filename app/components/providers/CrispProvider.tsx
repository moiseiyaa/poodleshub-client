'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

interface CrispProviderProps {
  children: React.ReactNode;
  websiteId?: string;
}

declare global {
  interface Window {
    $crisp?: any;
    CRISP_WEBSITE_ID?: string;
  }
}

export default function CrispProvider({ 
  children, 
  websiteId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID || "dffd5542-eb23-4338-8bf7-33df9a51e8f1"
}: CrispProviderProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Delay loading Crisp until after page is fully loaded
    const timer = setTimeout(() => {
      if (!websiteId) return;

      // Initialize Crisp
      window.CRISP_WEBSITE_ID = websiteId;
      
      // Load Crisp script
      const script = document.createElement('script');
      script.src = 'https://client.crisp.chat/l.js';
      script.async = true;
      script.onload = () => {
        setIsLoaded(true);
        // Configure Crisp
        if (window.$crisp) {
          // Set chat colors to match your brand
          window.$crisp.push(['set', 'color:web', '#7c3aed']); // Purple theme
          window.$crisp.push(['set', 'color:chat', '#7c3aed']);
        }
      };

      document.head.appendChild(script);
    }, 3000); // Load after 3 seconds

    return () => {
      clearTimeout(timer);
    };
  }, [websiteId]);

  return (
    <>
      {children}
      {websiteId && (
        <Script
          id="crisp-chat"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.$crisp = [];
              window.CRISP_WEBSITE_ID = "${websiteId}";
              (function() {
                d = document;
                s = d.createElement("script");
                s.src = "https://client.crisp.chat/l.js";
                s.async = 1;
                d.getElementsByTagName("head")[0].appendChild(s);
              })();
              window.$crisp.push(['set', 'color:web', '#7c3aed']);
              window.$crisp.push(['set', 'color:chat', '#7c3aed']);
            `
          }}
        />
      )}
    </>
  );
}
