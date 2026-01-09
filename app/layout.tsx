
import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "./components/organisms/Navbar";
import Navbars from "./components/organisms/Navbars";
import PromotionNavbar from "./components/organisms/PromotionNavbar";
import Footer from "./components/organisms/Footer";
import { CartProvider } from "./context/CartContext";
import ScrollToTop from "./components/utils/ScrollToTop";
import ScrollToTopOnMount from "./components/utils/ScrollToTopOnMount";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import { Analytics } from "@vercel/analytics/next"
import { generateJsonLd } from './lib/schema-generator';
import CrispWrapper from './components/providers/CrispWrapper';
import GoogleTagManager from './components/providers/GoogleTagManager';
import GoogleAnalytics from './components/providers/GoogleAnalytics';
import ConsentMode from './components/providers/ConsentMode';
import AxeptioCMP from './components/providers/AxeptioCMP';

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#ffffff" }, { media: "(prefers-color-scheme: dark)", color: "#0f172a" }],
};

export const metadata: Metadata = {
  title: {
    template: "%s | PuppyHub USA",
    default: "PuppyHub USA - Find Your Perfect Puppy Companion"
  },
  description: "PuppyHub USA is a premier puppy adoption service connecting loving families with healthy, ethically bred puppies across the United States.",
  keywords: ["puppies", "puppy adoption", "dog adoption", "ethical breeders", "puppyhub usa", "doodle puppies", "labradoodle", "goldendoodle"],
  authors: [{ name: "PuppyHub USA Team" }],
  creator: "PuppyHub USA",
  publisher: "PuppyHub USA",
  metadataBase: new URL("https://puppyhubusa.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = generateJsonLd('ORGANIZATION', {
    metaTitle: 'PuppyHub USA',
    metaDescription: 'Find your perfect puppy companion at PuppyHub USA',
    canonicalUrl: 'https://puppyhubusa.com'
  }, {
    name: 'PuppyHub USA',
    description: 'Premier destination for finding healthy, happy puppies',
    url: 'https://puppyhubusa.com',
    logo: 'https://puppyhubusa.com/logo.png',
    contactPoint: {
      telephone: '+1-555-123-4567',
      contactType: 'customer service'
    },
    address: {
      streetAddress: '123 Puppy Lane',
      addressLocality: 'Puppy Town',
      addressRegion: 'CA',
      postalCode: '90210',
      addressCountry: 'US'
    }
  });

  // Get GTM and GA IDs from environment variables
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || '';
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
  
  // Get Axeptio CMP script code from environment variable
  const axeptioScriptCode = process.env.NEXT_PUBLIC_AXEPTIO_SCRIPT_CODE || '';
  
  // Get consent mode regions from environment variable (comma-separated ISO 3166-2 codes)
  // Example: "US-CA,US-NY,GB" for California, New York, and Great Britain
  const consentRegions = process.env.NEXT_PUBLIC_CONSENT_MODE_REGIONS
    ? process.env.NEXT_PUBLIC_CONSENT_MODE_REGIONS.split(',').map(r => r.trim()).filter(Boolean)
    : [];

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Consent Mode - MUST be before GTM and any tracking scripts */}
        <ConsentMode regions={consentRegions} />
        
        {/* Axeptio CMP Script - Should be after consent mode, before GTM */}
        {axeptioScriptCode && <AxeptioCMP scriptCode={axeptioScriptCode} />}
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {/* Google Tag Manager Script (in head) */}
        {gtmId && <GoogleTagManager gtmId={gtmId} />}
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        {/* GTM Noscript - must be immediately after opening body tag */}
        {gtmId && <GoogleTagManager gtmId={gtmId} renderNoscript={true} />}
        <AdminAuthProvider>
          <CrispWrapper>
            <CartProvider>
              {/* Google Analytics */}
              {(gtmId || gaMeasurementId) && (
                <GoogleAnalytics measurementId={gaMeasurementId} gtmId={gtmId} />
              )}
              <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-white focus:text-primary focus:z-50">
                Skip to main content
              </a>
              <Navbars />
              <main id="main-content" className="grow pt-20 md:pt-20">
                <ScrollToTopOnMount />
                {children}
              </main>
              <Footer />
              <ScrollToTop />
              <Analytics />
            </CartProvider>
          </CrispWrapper>
        </AdminAuthProvider>
      </body>
    </html>
  );
}