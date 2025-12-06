'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaMars, FaVenus, FaHeart, FaArrowLeft, FaUsers, FaCheckCircle, FaShieldAlt, FaHome, FaCalendarAlt } from 'react-icons/fa';
import Container from '../organisms/Container';
import { BondedPair } from '../../data/puppies';

interface BondedPairDetailProps {
  bondedPair: BondedPair;
}

/**
 * BondedPairDetail component for displaying detailed information about bonded pairs
 */
const BondedPairDetail = ({ bondedPair }: BondedPairDetailProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
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
    <div className="py-8 md:py-12">
      <Container>
        {/* Back Navigation */}
        <Link 
          href="/puppies" 
          className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-8 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          Back to Puppies
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images Section */}
          <div>
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-xl mb-6">
              <Image
                src={bondedPair.images[0] || '/images/placeholder-puppy.jpg'}
                alt={`${bondedPair.pairName} - ${bondedPair.breed}`}
                fill
                className="object-cover"
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
            </div>
            
            {/* Thumbnail Gallery */}
            {bondedPair.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {bondedPair.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      currentImageIndex === index ? 'border-purple-500 scale-105' : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${bondedPair.pairName} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Information Section */}
          <div>
            {/* Pair Names */}
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {bondedPair.pairName}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex gap-2">
                  {bondedPair.genders.map((gender, index) => (
                    <div 
                      key={index}
                      className={`${gender === 'male' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'} p-2 rounded-full`}
                    >
                      {gender === 'male' ? <FaMars size={20} aria-label="Male puppy" /> : <FaVenus size={20} aria-label="Female puppy" />}
                    </div>
                  ))}
                </div>
                <span className="text-lg text-gray-600 font-medium">{bondedPair.breed}</span>
              </div>
              
              {/* Individual names */}
              <div className="flex gap-3 mb-4">
                {bondedPair.names.map((name, index) => (
                  <span key={index} className="text-xl text-gray-800 font-semibold">
                    {name}{index < bondedPair.names.length - 1 && ' &'}
                  </span>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-6">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-3xl font-bold text-purple-700">${bondedPair.price.toLocaleString()}</span>
                  <span className="text-sm text-purple-600 ml-2">for both puppies</span>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-500">Individual price: ${Math.round(bondedPair.price / 2).toLocaleString()} each</span>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <FaCalendarAlt className="h-4 w-4" />
                  <span className="text-sm">Age</span>
                </div>
                <p className="font-semibold text-gray-900">{calculateAge(bondedPair.birthDate)}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <FaShieldAlt className="h-4 w-4" />
                  <span className="text-sm">Generation</span>
                </div>
                <p className="font-semibold text-gray-900">{bondedPair.generation}</p>
              </div>
            </div>

            {/* Colors */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Colors</h3>
              <div className="flex gap-3">
                {bondedPair.names.map((name, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span 
                      className="inline-block w-6 h-6 rounded-full border border-gray-300" 
                      style={{ backgroundColor: bondedPair.colors[index].toLowerCase() }} 
                      title={bondedPair.colors[index]}
                    ></span>
                    <span className="text-sm text-gray-600">{name}: {bondedPair.colors[index]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vaccinations */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Vaccinations</h3>
              <div className="space-y-2">
                {bondedPair.vaccinations.map((vaccine, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-700">
                    <FaCheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                    <span>{vaccine}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* About This Pair */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">About This Bonded Pair</h3>
              <p className="text-gray-700 leading-relaxed">{bondedPair.notes}</p>
            </div>

            {/* Important Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-3">
                <FaUsers className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-2">Important: Bonded Pair</h4>
                  <p className="text-yellow-700 text-sm">
                    These puppies are bonded siblings who must be adopted together. They have a special connection and separating them would cause emotional distress. Adopting them together ensures they remain happy and healthy in their forever home.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Link 
                href="/application"
                className="flex-1 bg-linear-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white text-center font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow transform hover:-translate-y-0.5"
              >
                Apply to Adopt This Pair
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BondedPairDetail;
