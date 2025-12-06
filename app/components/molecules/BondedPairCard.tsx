'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaMars, FaVenus, FaHeart, FaUsers } from 'react-icons/fa';
import { BondedPair } from '../../data/puppies';

interface BondedPairCardProps {
  bondedPair: BondedPair;
}

/**
 * BondedPairCard component for displaying bonded pairs
 * Used in puppies listing and promotion pages
 */
const BondedPairCard = ({ bondedPair }: BondedPairCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
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
      className="bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-lg transition-all duration-300 hover-card group relative border-2 border-purple-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
        <Image
          src={bondedPair.images[0] || '/images/placeholder-puppy.jpg'}
          alt={`${bondedPair.pairName} - ${bondedPair.breed}`}
          fill
          className="object-cover transition-transform duration-500 ease-in-out"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium shadow-sm backdrop-blur-sm ${getStatusColor(bondedPair.status)}`}>
            {bondedPair.status.charAt(0).toUpperCase() + bondedPair.status.slice(1)}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-600/90 text-white shadow-sm backdrop-blur-sm">
            <FaUsers className="mr-1" />
            Bonded Pair
          </span>
        </div>
        
        {/* Age badge */}
        <div className="absolute bottom-4 left-4 z-20">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/80 backdrop-blur-sm text-gray-800 shadow-sm">
            {calculateAge(bondedPair.birthDate)}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        {/* Pair Names */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
            {bondedPair.pairName}
          </h3>
          <div className="shrink-0">
            {bondedPair.genders.map((gender, index) => (
              <div 
                key={index}
                className={`${gender === 'male' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'} p-1.5 rounded-full`}
              >
                {gender === 'male' ? <FaMars size={14} aria-label="Male puppy" /> : <FaVenus size={14} aria-label="Female puppy" />}
              </div>
            ))}
          </div>
        </div>
        
        {/* Individual names */}
        <div className="flex gap-2 mb-2">
          {bondedPair.names.map((name, index) => (
            <span key={index} className="text-sm text-gray-600 font-medium">
              {name}{index < bondedPair.names.length - 1 && ' •'}
            </span>
          ))}
        </div>
        
        <p className="text-gray-600 mb-3 font-medium">{bondedPair.breed}</p>
        
        {/* Colors */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className="text-accent-teal font-semibold">${bondedPair.price.toLocaleString()}</span>
            <span className="text-xs text-gray-500 ml-1">(for both)</span>
          </div>
          <div className="flex space-x-1">
            {bondedPair.colors.map((color, index) => (
              <span 
                key={index} 
                className="inline-block w-4 h-4 rounded-full border border-gray-200" 
                style={{ backgroundColor: color.toLowerCase() }} 
                title={color}
              ></span>
            ))}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Link 
            href={`/puppies/${bondedPair.id}`}
            className="flex-1 bg-linear-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white text-center font-medium py-2.5 px-4 rounded-lg transition-all duration-300 shadow-sm hover:shadow transform hover:-translate-y-0.5 flex items-center justify-center"
          >
            <span>View Pair Details</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BondedPairCard;
