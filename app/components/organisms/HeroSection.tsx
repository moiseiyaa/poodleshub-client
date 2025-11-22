'use client';

import Link from 'next/link';
import Container from './Container';
import { FaShieldAlt, FaCheck } from 'react-icons/fa';

/**
 * Hero section component for the homepage
 * Includes headline, subheadline, CTA button, hero image, and trust cues
 */
const HeroSection = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <video autoPlay loop muted playsInline className="object-cover w-full h-full absolute inset-0" poster="/images/icons/hero-puppy.jpg">
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
          
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
              Find Your Perfect <span className="gradient-text">Puppy</span> Companion
            </h1>
            <p className="text-xl text-white mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Connecting loving families with healthy, happy puppies from trusted breeders across the USA. Start your journey to find the perfect furry friend today.
            </p>
            {/* Responsive Button Layout */}
            <div className="flex flex-col gap-3 w-full sm:max-w-xs mx-auto lg:mx-0 md:flex-row md:gap-4 md:items-center md:w-auto md:justify-start md:max-w-none mb-8">
              <Link 
                href="/puppies" 
                className="bg-linear-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 text-center shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center w-full md:w-auto"
              >
                <span>View Available Puppies</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link 
                href="/process" 
                className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-8 rounded-full border border-gray-300 hover:border-gray-400 transition-all duration-300 text-center shadow-sm hover:shadow flex items-center justify-center w-full md:w-auto"
              >
                <span>How It Works</span>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm mt-2">
              <div className="flex items-center bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full shadow-sm hover:shadow transition-all">
                <FaShieldAlt className="text-accent-green mr-2" />
                <span className="font-medium">12-Year Health Guarantee</span>
              </div>
              <div className="flex items-center bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full shadow-sm hover:shadow transition-all">
                <FaCheck className="text-accent-teal mr-2" />
                <span className="font-medium">Trusted Breeders</span>
              </div>
              <div className="flex items-center bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full shadow-sm hover:shadow transition-all">
                <FaCheck className="text-accent-purple mr-2" />
                <span className="font-medium">Nationwide Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
