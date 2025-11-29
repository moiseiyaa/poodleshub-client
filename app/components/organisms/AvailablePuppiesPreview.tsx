'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaArrowRight, FaChevronLeft, FaChevronRight, FaPaw, FaHeart } from 'react-icons/fa';
import Container from './Container';
import PuppyCard from '../molecules/PuppyCard';
import { getAvailablePuppies, Puppy } from '../../lib/api/puppies';

/**
 * Enhanced Available Puppies Preview section component for the homepage
 * Features a modern carousel with smooth animations and working pagination
 */
const AvailablePuppiesPreview = () => {
  const [availablePuppies, setAvailablePuppies] = useState<Puppy[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPuppies = async () => {
      try {
        const puppies = await getAvailablePuppies();
        setAvailablePuppies(puppies);
      } catch (error) {
        console.error('Failed to fetch available puppies:', error);
        setAvailablePuppies([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPuppies();
  }, []);
  
  // Responsive puppies per view
  const puppiesPerView = { mobile: 1, tablet: 2, desktop: 4 };
  
  // Calculate total slides needed
  const totalSlides = Math.ceil(availablePuppies.length / puppiesPerView.desktop);
  
  // Get current puppies to display
  const getCurrentPuppies = () => {
    const start = currentIndex * puppiesPerView.desktop;
    const end = start + puppiesPerView.desktop;
    return availablePuppies.slice(start, end);
  };
  
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };
  
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 bg-linear-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-10 left-10 text-blue-200 opacity-20">
        <FaPaw className="h-24 w-24 transform rotate-12" />
      </div>
      <div className="absolute bottom-10 right-10 text-purple-200 opacity-20">
        <FaHeart className="h-20 w-20 transform -rotate-12" />
      </div>
      
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-linear-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              🐕 Available Now
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find Your <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">Perfect Companion</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Discover our adorable puppies looking for loving homes. Each one is health-checked, vaccinated, and ready to join your family.
          </p>
        </div>
        
        {/* Carousel Container */}
        <div className="relative">
          {/* Enhanced Navigation Buttons */}
          <button 
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 group border border-gray-100"
            aria-label="Previous puppies"
          >
            <FaChevronLeft className="h-5 w-5 text-gray-700 group-hover:text-blue-600 transition-colors" />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 group border border-gray-100"
            aria-label="Next puppies"
          >
            <FaChevronRight className="h-5 w-5 text-gray-700 group-hover:text-blue-600 transition-colors" />
          </button>
          
          {/* Puppies Carousel with Smooth Sliding */}
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-out gap-6"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {/* Generate slides */}
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="min-w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {availablePuppies
                    .slice(slideIndex * puppiesPerView.desktop, (slideIndex + 1) * puppiesPerView.desktop)
                    .map((puppy) => (
                      <div key={puppy.id} className="transform transition-all duration-300 hover:scale-105">
                        <PuppyCard puppy={puppy} />
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Enhanced Pagination */}
        <div className="flex flex-col items-center mt-8 space-y-4">
          {/* Pagination Dots */}
          <div className="flex justify-center space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-linear-to-r from-blue-500 to-purple-600 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Slide Counter */}
          <div className="text-sm text-gray-600 font-medium">
            {currentIndex + 1} / {totalSlides}
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-12">
          <Link 
            href="/puppies" 
            className="inline-flex items-center bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            View All Available Puppies
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default AvailablePuppiesPreview;
