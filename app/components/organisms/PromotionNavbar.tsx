'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaGift, FaFire } from 'react-icons/fa';

/**
 * Thin promotion navbar displayed above the main navbar
 * Shows Black Friday and Christmas promotion message
 * Independent navbar - does not affect main navbar
 * Responsive design: Different layout and text for mobile vs desktop
 */
const PromotionNavbar = () => {
  const pathname = usePathname();

  // Hide promotion bar on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-linear-to-r from-red-600 via-red-500 to-green-600 text-white shadow-lg" style={{ top: '0px' }}>
      {/* Desktop View */}
      <div className="hidden md:block py-2 px-4">
        <div className="container mx-auto px-4 md:px-6 max-w-[1440px]">
          <div className="flex items-center justify-center gap-2 text-center flex-wrap">
            <FaGift className="h-5 w-5 shrink-0 animate-bounce" />
            <p className="text-sm font-semibold tracking-wide">
              🎄 Black Friday & Christmas Sale: Get Your Perfect Puppy Gift! Up to 20% Off Featured Puppies 🎄
            </p>
            <Link 
              href="/promotion" 
              className="ml-2 text-sm font-bold underline hover:opacity-80 transition-opacity whitespace-nowrap"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden py-1 px-2">
        <div className="container mx-auto px-1 max-w-[1440px]">
          <div className="flex items-center justify-center gap-1 text-center">
            <FaFire className="h-3 w-3 shrink-0 animate-bounce" />
            <p className="text-xs font-bold whitespace-nowrap">20% OFF</p>
            <p className="text-xs font-semibold whitespace-nowrap hidden xs:inline">Poodles & Maltese</p>
            <Link 
              href="/promotion" 
              className="text-xs font-bold bg-white text-red-600 px-2 py-0.5 rounded-full hover:bg-gray-100 transition-colors whitespace-nowrap ml-1"
            >
              Shop
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionNavbar;
