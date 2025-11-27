'use client';

import Link from 'next/link';
import { FaGift } from 'react-icons/fa';

/**
 * Thin promotion navbar displayed above the main navbar
 * Shows Black Friday and Christmas promotion message
 */
const PromotionNavbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-60 bg-linear-to-r from-red-600 via-red-500 to-green-600 text-white py-2 px-4">
      <div className="container mx-auto px-4 md:px-6 max-w-[1440px]">
        <div className="flex items-center justify-center gap-2 text-center">
          <FaGift className="h-4 w-4 md:h-5 md:w-5 shrink-0 animate-bounce" />
          <p className="text-xs md:text-sm font-semibold tracking-wide">
            🎄 Black Friday & Christmas Sale: Get Your Perfect Puppy Gift! Up to 20% Off Featured Puppies 🎄
          </p>
          <Link 
            href="/promotion" 
            className="ml-2 text-xs md:text-sm font-bold underline hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PromotionNavbar;
