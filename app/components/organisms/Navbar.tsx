'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes, FaChevronDown, FaBox } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { getAllBreeds } from '../../data/breeds';

/**
 * Navbar component for PuppyHub USA website
 * Includes logo, navigation links, and mobile drawer
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBreedDropdownOpen, setIsBreedDropdownOpen] = useState(false);
  const [isMobileBreedOpen, setIsMobileBreedOpen] = useState(false);
  const pathname = usePathname();
  const { items } = useCart();
  const breeds = getAllBreeds();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Hide navbar entirely on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  // Handle scroll event to make navbar sticky
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setIsMobileBreedOpen(false);
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsBreedDropdownOpen(false);
      }
    };

    if (isBreedDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isBreedDropdownOpen]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
    <header 
      className="fixed left-0 w-full z-40 bg-white/90 backdrop-blur-md shadow-soft py-3 transition-all duration-300 top-[24px] md:top-[40px]"
          >
      <div className="container mx-auto px-4 md:px-6 max-w-[1440px]">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50">
            <div className="flex items-center">
              <Image
                src="/images/icons/logo.png"
                alt="PuppyHub USA Logo"
                width={180}
                height={50}
                className="h-10 w-auto"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/puppies" 
              className={`text-base font-medium transition-colors relative group ${
                pathname === '/puppies' ? 'text-primary-600' : 'text-gray-800 hover:text-primary-500'
              }`}
            >
              <span>All Puppies</span>
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 ${pathname === '/puppies' ? 'w-full' : 'group-hover:w-full'}`}></span>
            </Link>
            
            {/* Breeds Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                className={`flex items-center text-base font-medium transition-colors relative group ${
                  pathname?.startsWith('/breeds') ? 'text-primary-600' : 'text-gray-800 hover:text-primary-500'
                }`}
                onClick={() => setIsBreedDropdownOpen(!isBreedDropdownOpen)}
              >
                <span>Breeds</span> <FaChevronDown className={`ml-1 h-3 w-3 ${isBreedDropdownOpen ? 'rotate-180' : ''}`} />
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 ${pathname?.startsWith('/breeds') ? 'w-full' : 'group-hover:w-full'}`}></span>
              </button>
              
              {isBreedDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 rounded-lg shadow-soft bg-white/95 backdrop-blur-md border border-gray-100 z-50 overflow-hidden">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    {breeds.map((breed) => (
                      <Link
                        key={breed.id}
                        href={`/breeds/${breed.id}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        role="menuitem"
                        onClick={() => setIsBreedDropdownOpen(false)}
                      >
                        {breed.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <Link 
              href="/about" 
              className={`text-base font-medium hover:text-primary transition-colors ${
                pathname === '/about' ? 'text-primary' : 'text-gray-800'
              }`}
            >
              About
            </Link>
            
            <Link 
              href="/blog" 
              className={`text-base font-medium hover:text-primary transition-colors ${
                pathname?.startsWith('/blog') ? 'text-primary' : 'text-gray-800'
              }`}
            >
              Blog
            </Link>
            
            <Link 
              href="/faq" 
              className={`text-base font-medium hover:text-primary transition-colors ${
                pathname === '/faq' ? 'text-primary' : 'text-gray-800'
              }`}
            >
              FAQ
            </Link>
            
            <Link 
              href="/contact" 
              className={`text-base font-medium hover:text-primary transition-colors ${
                pathname === '/contact' ? 'text-primary' : 'text-gray-800'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart */}
            <Link 
              href="/cart" 
              className="relative p-2 text-gray-800 hover:text-primary-500 transition-colors group"
            >
              <div className="relative">
                <FaBox className="h-5 w-5 transition-transform group-hover:scale-110" />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-linear-to-r from-secondary-500 to-accent-pink text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md transform transition-all group-hover:scale-110">
                    {items.length}
                  </span>
                )}
              </div>
            </Link>
            
            <Link 
              href="/application" 
              className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-6 rounded-full transition-colors"
            >
              Apply Now
            </Link>
          </div>

          {/* Cart icon left of burger in mobile view */}
          <div className="flex items-center space-x-2 md:hidden">
            <Link href="/cart" className="p-2 text-gray-800 hover:text-primary-500 transition-colors" aria-label="Cart">
              <FaBox className="h-5 w-5" />
            </Link>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="p-2 rounded-md text-gray-800 hover:text-primary-500 hover:bg-primary-50 focus:outline-none transition-colors relative z-50"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <div className="relative w-6 h-6">
                <span 
                  className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 top-3' : 'top-1.5'}`}
                />
                <span 
                  className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'} top-3`}
                />
                <span 
                  className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 top-3' : 'top-4.5'}`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

    </header>
    {/* Mobile Menu */}
    {isOpen && (
      <>
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden" 
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
        {/* Sidebar Drawer */}
        <div
          id="mobile-menu"
          className={
            `fixed top-0 right-0 h-full w-4/5 max-w-[20rem] bg-white shadow-xl z-50 md:hidden rounded-l-2xl
            ${isOpen ? 'translate-x-0' : 'translate-x-full'}
            flex flex-col pt-16 px-6 pb-10 overflow-y-auto`
          }
        >
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 text-gray-800 hover:text-primary-500 hover:bg-primary-50 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <FaTimes className="h-6 w-6" />
          </button>
          
          <nav className="flex flex-col space-y-6">
            <Link 
              href="/puppies" 
              className={`text-xl font-medium ${
                pathname === '/puppies' ? 'text-primary' : 'text-gray-800'
              }`}
              onClick={() => setIsOpen(false)}
            >
              All Puppies
            </Link>
            <div>
              <button 
                className={`flex items-center text-xl font-medium mb-4 ${
                  pathname?.startsWith('/breeds') ? 'text-primary' : 'text-gray-800'
                }`}
                onClick={() => setIsMobileBreedOpen((prev) => !prev)}
                aria-expanded={isMobileBreedOpen}
              >
                Breeds <FaChevronDown className={`ml-1 h-3 w-3 ${isMobileBreedOpen ? 'rotate-180' : ''}`} />
              </button>
              {isMobileBreedOpen && (
                <div className="ml-4 space-y-3">
                  {breeds.map((breed) => (
                    <Link
                      key={breed.id}
                      href={`/breeds/${breed.id}`}
                      className="block text-lg text-gray-700"
                      onClick={() => {
                        setIsMobileBreedOpen(false);
                        setIsOpen(false);
                      }}
                    >
                      {breed.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link 
              href="/about" 
              className={`text-xl font-medium ${
                pathname === '/about' ? 'text-primary' : 'text-gray-800'
              }`}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/blog" 
              className={`text-xl font-medium ${
                pathname?.startsWith('/blog') ? 'text-primary' : 'text-gray-800'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <Link 
              href="/faq" 
              className={`text-xl font-medium ${
                pathname === '/faq' ? 'text-primary' : 'text-gray-800'
              }`}
              onClick={() => setIsOpen(false)}
            >
              FAQ
            </Link>
            <Link 
              href="/contact" 
              className={`text-xl font-medium ${
                pathname === '/contact' ? 'text-primary' : 'text-gray-800'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <div className="flex flex-col space-y-4 pt-6 border-t border-gray-200">
              <Link href="/cart" className="flex items-center" onClick={() => setIsOpen(false)}>
                <FaBox className="h-5 w-5 mr-2 text-gray-800" />
                <span className="text-xl font-medium text-gray-800">
                  Cart {items.length > 0 && `(${items.length})`}
                </span>
              </Link>
              <Link 
                href="/application" 
                className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-full text-center transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Apply Now
              </Link>
            </div>
          </nav>
        </div>
      </>
    )}
    </>
  );
};

export default Navbar;
