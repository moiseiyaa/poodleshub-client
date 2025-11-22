'use client';

import { useState } from 'react';
import { FaWhatsapp, FaTimes, FaCommentDots } from 'react-icons/fa';

/**
 * WhatsApp Support component
 * Floating support button with chat interface
 */
const WhatsAppSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '14107258531'; // WhatsApp number without formatting
  const message = 'Hello! I\'m interested in learning more about your puppies.';

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <>
      {/* WhatsApp Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
        aria-label="WhatsApp Support"
      >
        <FaWhatsapp className="h-6 w-6" />
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75"></span>
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Chat Card */}
          <div className="fixed bottom-24 left-6 z-50 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
            {/* Header */}
            <div className="bg-linear-to-r from-[#25D366] to-[#20BA5A] p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <FaCommentDots className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">PuppyHub Support</h3>
                  <p className="text-white/90 text-xs">We're here to help!</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-white/80 transition-colors p-1"
                aria-label="Close chat"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="mb-6">
                <p className="text-gray-800 text-base font-medium mb-2">
                  👋 Connect with our puppy specialists!
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Have questions about our puppies, adoption process, or need personalized guidance? 
                  Our expert team is ready to assist you in finding your perfect furry companion.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                >
                  <FaWhatsapp className="h-5 w-5" />
                  <span>Start Chat on WhatsApp</span>
                </button>
                
                <p className="text-xs text-gray-500 text-center">
                  Typically responds within minutes
                </p>
              </div>

              {/* Quick Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-start space-x-3 text-sm">
                  <div className="shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">✓</span>
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium">Expert Guidance</p>
                    <p className="text-gray-600 text-xs mt-1">
                      Get personalized recommendations from our certified puppy specialists
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default WhatsAppSupport;

