
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

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-white focus:text-primary focus:z-50">
          Skip to main content
        </a>
        <AdminAuthProvider>
          <CrispWrapper>
            <CartProvider>
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