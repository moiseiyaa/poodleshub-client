import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "./components/organisms/Navbar";
import Navbars from "./components/organisms/Navbars";
import PromotionNavbar from "./components/organisms/PromotionNavbar";
import Footer from "./components/organisms/Footer";
import CrispProvider from "./components/providers/CrispProvider";
import { CartProvider } from "./context/CartContext";
import ScrollToTop from "./components/utils/ScrollToTop";
import ScrollToTopOnMount from "./components/utils/ScrollToTopOnMount";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import { Analytics } from "@vercel/analytics/next"

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
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
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
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://puppyhubusa.com",
    title: "PuppyHub USA - Find Your Perfect Puppy Companion",
    description: "PuppyHub USA connects loving families with healthy, ethically bred puppies. Browse available puppies, learn about our breeds, and start your adoption journey today.",
    siteName: "PuppyHub USA",
    images: [
      {
        url: "/images/favicon.png",
        width: 1200,
        height: 630,
        alt: "PuppyHub USA - Loayl Puppy Adoption",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PuppyHub USA - Find Your Perfect Puppy Companion",
    description: "PuppyHub USA connects loving families with healthy, ethically bred puppies. Browse available puppies, learn about our breeds, and start your adoption journey today.",
    images: ["/images/favicon.png"],
    creator: "@puppyhubusa",
  },
  icons: {
    icon: "/images/icons/favicon.png",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className="antialiased min-h-screen flex flex-col"
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-white focus:text-primary focus:z-50">
          Skip to main content
        </a>
        <AdminAuthProvider>
          <CrispProvider>
            <CartProvider>
              <Navbars />
              <main id="main-content" className="grow pt-20 md:pt-20">
                <ScrollToTopOnMount />
                {children}
              </main>
              <Footer />
              <ScrollToTop threshold={400} />
              <Analytics />
            </CartProvider>
          </CrispProvider>
        </AdminAuthProvider>
      </body>
    </html>
  );
}
