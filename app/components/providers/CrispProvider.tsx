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
        // Set company info
        window.$crisp.push(['set', 'company', [
          ['name', 'PuppyHub USA'],
          ['url', 'https://poodleshubusa.com'],
          ['description', 'Professional puppy adoption platform']
        ]]);

        // Set chat colors to match your brand
        window.$crisp.push(['set', 'color:web', '#7c3aed']); // Purple theme
        window.$crisp.push(['set', 'color:chat', '#7c3aed']);
        
        // Hide WhatsApp field in chat
        window.$crisp.push(['set', 'hide:whatsapp', true]);
        
        // Set availability
        window.$crisp.push(['set', 'availability:is_available', [true, true, true, true, true, true, true]]);
      }
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
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
              window.$crisp.push(['set', 'company', [
                ['name', 'PuppyHub USA'],
                ['url', 'https://poodleshubusa.com'],
                ['description', 'Professional puppy adoption platform']
              ]]);
              window.$crisp.push(['set', 'color:web', '#7c3aed']);
              window.$crisp.push(['set', 'color:chat', '#7c3aed']);
              window.$crisp.push(['set', 'hide:whatsapp', true]);
              window.$crisp.push(['set', 'availability:is_available', [true, true, true, true, true, true, true]]);
            `
          }}
        />
      )}
    </>
  );
}
