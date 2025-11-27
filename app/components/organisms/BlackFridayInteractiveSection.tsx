'use client';

import Link from 'next/link';
import { FaGift, FaSnowflake, FaFire } from 'react-icons/fa';
import Container from './Container';

/**
 * Interactive Black Friday section for the homepage
 * Acts as a window to the promotion page with enthusiastic tone
 */
const BlackFridayInteractiveSection = () => {
  return (
    <section className="py-16 bg-linear-to-b from-red-50 via-white to-green-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 opacity-10">
        <FaSnowflake className="h-32 w-32 text-blue-400 animate-pulse" />
      </div>
      <div className="absolute bottom-0 left-0 opacity-10">
        <FaGift className="h-40 w-40 text-red-400 animate-bounce" />
      </div>

      <Container>
        <div className="relative z-10">
          {/* Main CTA Card */}
          <div className="bg-linear-to-r from-red-600 via-red-500 to-green-600 rounded-2xl p-8 md:p-12 text-white shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FaFire className="h-6 w-6 md:h-8 md:w-8 animate-bounce" />
              <span className="text-sm md:text-base font-bold uppercase tracking-widest">Limited Time Offer</span>
              <FaSnowflake className="h-6 w-6 md:h-8 md:w-8 animate-pulse" />
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
              🎄 Black Friday & Christmas Magic 🎄
            </h2>

            <p className="text-lg md:text-xl text-center mb-6 max-w-2xl mx-auto">
              Give the gift of unconditional love this holiday season! 
              <span className="block mt-2 font-bold text-xl md:text-2xl">
                Up to 20% OFF our featured Poodles & Maltese puppies
              </span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">🐕</div>
                <p className="font-semibold">Premium Selection</p>
                <p className="text-sm opacity-90">Hand-picked puppies</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">💚</div>
                <p className="font-semibold">12-Year Guarantee</p>
                <p className="text-sm opacity-90">Your peace of mind</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">🎁</div>
                <p className="font-semibold">Special Bonuses</p>
                <p className="text-sm opacity-90">Included with purchase</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link
                href="/promotion"
                className="bg-white text-red-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 text-center text-lg"
              >
                🎉 Explore Promotion Page
              </Link>
              <Link
                href="/application"
                className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 text-center text-lg"
              >
                ⭐ Adopt Now
              </Link>
            </div>

            <p className="text-center text-sm mt-6 opacity-90">
              ✨ Limited puppies available • Offer valid through December 25th ✨
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-red-500">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <FaGift className="text-red-500" />
                Perfect Holiday Gift
              </h3>
              <p className="text-gray-700">
                Looking for the ultimate holiday gift? A puppy from PuppyHub USA brings joy, love, and companionship that lasts a lifetime. This Black Friday, make your loved ones' dreams come true!
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <FaSnowflake className="text-green-500" />
                Christmas Delivery Ready
              </h3>
              <p className="text-gray-700">
                Apply now and get your new family member ready for the holidays! Our streamlined process ensures you can welcome your puppy in time for Christmas celebrations.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BlackFridayInteractiveSection;
