'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaMars, FaVenus, FaHeart } from 'react-icons/fa';
import { Puppy } from '../../lib/api/puppies';
import { useCart } from '../../context/CartContext';

interface PuppyCardProps {
  puppy: Puppy;
}

/**
 * PuppyCard component for displaying puppy information
 * Used in puppies listing and breed pages
 */
const PuppyCard = ({ puppy }: PuppyCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const { addToCart, isInCart } = useCart();
  
  // Calculate age in weeks from birthdate
  const calculateAge = (birthDate: string): string => {
    const birthDateObj = new Date(birthDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - birthDateObj.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    
    if (diffWeeks < 1) {
      return `${diffDays} days old`;
    } else if (diffWeeks === 1) {
      return '1 week old';
    } else {
      return `${diffWeeks} weeks old`;
    }
  };

  // Get status badge color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'available':
        return 'bg-accent-green/80 text-white';
      case 'reserved':
        return 'bg-secondary-500/80 text-white';
      case 'adopted':
        return 'bg-gray-500/80 text-white';
      default:
        return 'bg-primary-500/80 text-white';
    }
  };

  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-lg transition-all duration-300 hover-card group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
        <Image
          src={puppy.images[0] || '/images/placeholder-puppy.jpg'}
          alt={`${puppy.name} - ${puppy.breed}`}
          fill
          className="object-cover transition-transform duration-500 ease-in-out"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        <div className="absolute top-4 right-4 z-20">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium shadow-sm backdrop-blur-sm ${getStatusColor(puppy.status)}`}>
            {puppy.status.charAt(0).toUpperCase() + puppy.status.slice(1)}
          </span>
        </div>
        
        {/* Age badge */}
        <div className="absolute bottom-4 left-4 z-20">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/80 backdrop-blur-sm text-gray-800 shadow-sm">
            {calculateAge(puppy.birthDate)}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{puppy.name}</h3>
          <div className={`${puppy.gender === 'male' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'} p-1.5 rounded-full`}>
            {puppy.gender === 'male' ? <FaMars size={16} aria-label="Male puppy" /> : <FaVenus size={16} aria-label="Female puppy" />}
          </div>
        </div>
        
        <p className="text-gray-600 mb-3 font-medium">{puppy.breed}</p>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className="text-accent-teal font-semibold">${puppy.price.toLocaleString()}</span>
          </div>
          <div className="flex space-x-1">
            {puppy.color && (
              <span className="inline-block w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: puppy.color.toLowerCase() }} title={puppy.color}></span>
            )}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Link 
            href={`/puppies/${puppy.id}`}
            className="flex-1 bg-linear-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white text-center font-medium py-2.5 px-4 rounded-lg transition-all duration-300 shadow-sm hover:shadow transform hover:-translate-y-0.5 flex items-center justify-center"
          >
            <span>View Details</span>
          </Link>
          
          {puppy.status === 'available' ? (
            isInCart(puppy.id) ? (
              <Link
                href="/cart"
                className="bg-primary border border-primary text-white p-2.5 rounded-lg transition-all duration-300 shadow-sm hover:shadow flex items-center justify-center"
                aria-label="View in cart"
              >
                <FaHeart className="h-5 w-5" />
              </Link>
            ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
                  if (puppy.status === 'available') {
                    addToCart(puppy);
                  }
            }}
            aria-label="Reserve puppy"
            className="bg-white border border-gray-200 hover:border-primary-500 hover:bg-primary-50 text-primary-600 p-2.5 rounded-lg transition-all duration-300 shadow-sm hover:shadow flex items-center justify-center"
          >
                <FaHeart className="h-5 w-5" />
          </button>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PuppyCard;
