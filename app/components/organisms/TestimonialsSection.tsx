'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Container from './Container';
import { getAllTestimonials } from '../../data/testimonials';

/**
 * Testimonials section component for the homepage
 * Displays customer reviews with photos, names, and ratings
 */
const TestimonialsSection = () => {
  const testimonials = getAllTestimonials();
  const [activeIndex, setActiveIndex] = useState(0);
  
  const handlePrev = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  const handleNext = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  // Generate star rating based on number
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <FaStar 
        key={index} 
        className={`h-5 w-5 ${index < rating ? 'text-secondary-500' : 'text-gray-200'}`} 
      />
    ));
  };

  return (
    <section className="py-20 bg-linear-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary-100 mix-blend-multiply opacity-30 animate-float"></div>
        <div className="absolute -bottom-20 right-10 w-80 h-80 rounded-full bg-secondary-100 mix-blend-multiply opacity-30 animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-accent-purple/10 mix-blend-multiply opacity-60 animate-float" style={{ animationDelay: '2.5s' }}></div>
      </div>
      <Container>
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl font-bold mb-6 gradient-text inline-block">What Our Families Say</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Hear from families who have welcomed PuppyHub USA puppies into their homes and hearts.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-soft p-6 md:p-10 border border-gray-100 relative overflow-hidden">
            {/* Decorative quote marks */}
            <div className="absolute -top-6 -left-6 text-8xl text-primary-100 opacity-50 z-0">
              &ldquo;
            </div>
            <div className="absolute -bottom-6 -right-6 text-8xl text-primary-100 opacity-50 z-0 rotate-180">
              &ldquo;
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              {/* Testimonial Initials */}
              <div className="md:w-1/3 flex flex-col items-center">
                <div className="relative w-32 h-32 rounded-full bg-linear-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-4 border-4 border-white shadow-md">
                  <span className="text-3xl font-bold text-white">
                    {testimonials[activeIndex].initials}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-gray-900">{testimonials[activeIndex].name}</h4>
                <p className="text-gray-600 mb-2">{testimonials[activeIndex].location}</p>
                <div className="flex">
                  {renderStars(testimonials[activeIndex].rating)}
                </div>
              </div>
              
              {/* Testimonial Text */}
              <div className="md:w-2/3">
                <FaQuoteLeft className="h-8 w-8 text-primary-400 mb-4" />
                <p className="text-lg text-gray-700 mb-6 leading-relaxed italic">
                  &ldquo;{testimonials[activeIndex].text}&rdquo;
                </p>
                <div className="flex items-center bg-primary-50 px-4 py-2 rounded-lg">
                  <span className="text-sm font-medium text-primary-700">Puppy: </span>
                  <span className="text-sm text-primary-600 ml-1 font-medium">
                    {testimonials[activeIndex].puppyName} ({testimonials[activeIndex].puppyBreed})
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4 md:-translate-x-12">
            <button 
              onClick={handlePrev}
              className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-soft hover:bg-primary-50 transition-all duration-300 border border-gray-100 hover:scale-110"
              aria-label="Previous testimonial"
            >
              <FaChevronLeft className="h-5 w-5 text-primary-600" />
            </button>
          </div>
          
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 md:translate-x-12">
            <button 
              onClick={handleNext}
              className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-soft hover:bg-primary-50 transition-all duration-300 border border-gray-100 hover:scale-110"
              aria-label="Next testimonial"
            >
              <FaChevronRight className="h-5 w-5 text-primary-600" />
            </button>
          </div>
        </div>
        
        {/* Testimonial Indicators */}
        <div className="flex justify-center mt-8 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-3 w-12 rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-linear-to-r from-primary-500 to-primary-600 shadow-md' : 'bg-gray-200 hover:bg-gray-300'}`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TestimonialsSection;
