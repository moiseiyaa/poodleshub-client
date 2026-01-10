import Link from 'next/link';
import Image from 'next/image';
import Container from './components/organisms/Container';
import { FaHome, FaSearch, FaEnvelope } from 'react-icons/fa';

/**
 * Custom 404 Not Found page
 * Displayed when a user navigates to a non-existent page
 */
export default function NotFound() {
  return (
    <div className="py-16 md:py-24 bg-gray-50">
      <Container>
        <div className="flex flex-col items-center text-center">
          <div className="relative w-64 h-64 mb-8">
            <Image
              src="/images/sad-puppy.jpg"
              alt="Sad puppy"
              fill
              className="object-cover rounded-full"
              priority
            />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Oops! Page Not Found</h1>
          
          <p className="text-xl text-gray-700 mb-8 max-w-2xl">
            We couldn't fetch this page. It seems the puppy you're looking for has wandered off!
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <Link 
              href="/"
              className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-full transition-colors"
            >
              <FaHome className="h-5 w-5" />
              Return Home
            </Link>
            
            <Link 
              href="/puppies"
              className="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-900 font-medium py-3 px-8 rounded-full border border-gray-300 transition-colors"
            >
              <FaSearch className="h-5 w-5" />
              Browse Puppies
            </Link>
            
            <Link 
              href="/contact"
              className="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-900 font-medium py-3 px-8 rounded-full border border-gray-300 transition-colors"
            >
              <FaEnvelope className="h-5 w-5" />
              Contact Us
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm max-w-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Looking for something specific?</h2>
            <p className="text-gray-700 mb-6">
              You might find what you're looking for in one of these popular sections:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link 
                href="/breeds"
                className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <h3 className="font-bold text-gray-900 mb-1">Breed Information</h3>
                <p className="text-sm text-gray-700">Learn about different dog breeds</p>
              </Link>
              
              <Link 
                href="/process"
                className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <h3 className="font-bold text-gray-900 mb-1">Adoption Process</h3>
                <p className="text-sm text-gray-700">How to adopt your perfect puppy</p>
              </Link>
              
              <Link 
                href="/faq"
                className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <h3 className="font-bold text-gray-900 mb-1">FAQs</h3>
                <p className="text-sm text-gray-700">Answers to common questions</p>
              </Link>
              
              <Link 
                href="/application"
                className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <h3 className="font-bold text-gray-900 mb-1">Apply Now</h3>
                <p className="text-sm text-gray-700">Start your adoption application</p>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
