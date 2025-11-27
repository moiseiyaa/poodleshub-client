'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useApplicationForm } from '../../../context/ApplicationFormContext';
import { useCart } from '../../../context/CartContext';
import { getAllBreeds } from '../../../data/breeds';
import { getAvailablePuppies, Puppy } from '../../../data/puppies';
import { FaMars, FaVenus, FaEye } from 'react-icons/fa';

/**
 * PuppyPreferencesForm component for Step 2 of the application form
 * Collects preferences for puppy breed, size, gender, color, etc.
 */
const PuppyPreferencesForm = () => {
  const { formData, updateFormData } = useApplicationForm();
  const { items } = useCart();
  const breeds = getAllBreeds();
  const [showAvailablePuppies, setShowAvailablePuppies] = useState(false);
  const [selectedPuppyId, setSelectedPuppyId] = useState<string>('');
  const availablePuppyOptions = getAvailablePuppies();

  // Autofill from cart (only if preferences are empty and cart has a puppy)
  useEffect(() => {
    const puppyInCart = items[0]?.puppy;
    if (!puppyInCart) return;
    // Only do this if form is still empty
    const preferencesEmpty = !formData.breedChoices?.[0]?.breed && !formData.preferredGender;
    if (!preferencesEmpty) return;
    // Find breed id for this puppy's breed
    const breedId = breeds.find(b => b.name.toLowerCase() === puppyInCart.breed.toLowerCase())?.id;
    if (!breedId) return;
    updateFormData({
      breedChoices: [{ priority: 1, breed: breedId }],
      preferredGender: puppyInCart.gender,
    });
  }, []); // Only run on mount

  useEffect(() => {
    if (!selectedPuppyId) return;
    const selectedPuppy = availablePuppyOptions.find((p) => p.id === selectedPuppyId);
    if (!selectedPuppy) return;
    const breedId = breeds.find(b => b.name.toLowerCase() === selectedPuppy.breed.toLowerCase())?.id;
    if (!breedId) return;
    // Prefer the puppy's size if known, else leave as user set
    updateFormData({
      breedChoices: [{ priority: 1, breed: breedId }],
      preferredGender: selectedPuppy.gender,
      // You can map puppy size/generation if applicable, e.g. preferredSizes: [selectedPuppy.size]
    });
  }, [selectedPuppyId, breeds, updateFormData]);
  
  // Get available puppies and filter by preferences if selected
  const availablePuppies = useMemo(() => {
    let puppies = getAvailablePuppies();
    
    // Filter by breed if selected
    if (formData.breedChoices[0]?.breed) {
      const selectedBreed = breeds.find(b => b.id === formData.breedChoices[0].breed);
      if (selectedBreed) {
        puppies = puppies.filter(p => p.breed === selectedBreed.name);
      }
    }
    
    // Filter by gender if selected
    if (formData.preferredGender && formData.preferredGender !== 'either') {
      puppies = puppies.filter(p => p.gender === formData.preferredGender);
    }
    
    return puppies;
  }, [formData.breedChoices, formData.preferredGender, breeds]);
  
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
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    // Handle checkbox inputs
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      const checkboxName = name.split('-')[0];
      const checkboxValue = name.split('-')[1];
      
      if (checkboxName === 'preferredSizes') {
        const updatedSizes = checked 
          ? [...formData.preferredSizes, checkboxValue]
          : formData.preferredSizes.filter(size => size !== checkboxValue);
        updateFormData({ preferredSizes: updatedSizes });
      }
      return;
    }
    
    // Handle radio inputs
    if (type === 'radio') {
      updateFormData({ [name]: value });
      return;
    }
    
    // Handle breed choice selects
    if (name.startsWith('breedChoice')) {
      const index = parseInt(name.split('-')[1]);
      const updatedBreedChoices = [...formData.breedChoices];
      
      // Ensure the array has enough elements
      while (updatedBreedChoices.length <= index) {
        updatedBreedChoices.push({ priority: updatedBreedChoices.length + 1, breed: '' });
      }
      
      updatedBreedChoices[index].breed = value;
      updateFormData({ breedChoices: updatedBreedChoices });
      return;
    }
    
    // Handle other inputs
    updateFormData({ [name]: value });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Please prioritize the breed(s) for which you are applying <span className="text-red-500">*</span>
        </h3>
        
        <div>
          <label htmlFor="selectPuppy" className="block text-lg font-medium text-gray-900 mb-3">
            Select Your Puppy By Name (Recommended)
          </label>
          <select
            id="selectPuppy"
            name="selectPuppy"
            value={selectedPuppyId}
            onChange={e => setSelectedPuppyId(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 mb-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="">-- Select from available puppies --</option>
            {availablePuppyOptions.map(puppy => (
              <option key={puppy.id} value={puppy.id}>
                {puppy.name} ({puppy.breed}, {puppy.gender}, {puppy.color})
              </option>
            ))}
          </select>
          {selectedPuppyId && (
            <p className="text-green-700 text-sm mb-2">Preferences auto-matched to puppy selected above. (To edit preferences, clear or change your selection.)</p>
          )}
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="breedChoice-0" className="block text-sm font-medium text-gray-700 mb-1">
              #1 Choice <span className="text-red-500">*</span>
            </label>
            <select
              id="breedChoice-0"
              name="breedChoice-0"
              value={formData.breedChoices[0]?.breed || ''}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              required
              disabled={!!selectedPuppyId}
            >
              <option value="">Select Breed</option>
              {breeds.map((breed) => (
                <option key={breed.id} value={breed.id}>
                  {breed.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Preferred Size <span className="text-red-500">*</span>
        </h3>
        <p className="text-sm text-gray-600 mb-2">Check all that apply</p>
        
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="preferredSizes-toy"
              name="preferredSizes-toy"
              checked={formData.preferredSizes.includes('toy')}
              onChange={handleInputChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="preferredSizes-toy" className="ml-2 block text-sm text-gray-700">
              Toy / Petite / Micro Mini (5-24 lbs)
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="preferredSizes-mini"
              name="preferredSizes-mini"
              checked={formData.preferredSizes.includes('mini')}
              onChange={handleInputChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="preferredSizes-mini" className="ml-2 block text-sm text-gray-700">
              Traditional Mini (25-40 lbs)
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="preferredSizes-medium"
              name="preferredSizes-medium"
              checked={formData.preferredSizes.includes('medium')}
              onChange={handleInputChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="preferredSizes-medium" className="ml-2 block text-sm text-gray-700">
              Medium (41-55 lbs)
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="preferredSizes-standard"
              name="preferredSizes-standard"
              checked={formData.preferredSizes.includes('standard')}
              onChange={handleInputChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="preferredSizes-standard" className="ml-2 block text-sm text-gray-700">
              Standard (over 55 lbs)
            </label>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Preferred Gender <span className="text-red-500">*</span>
        </h3>
        <p className="text-sm text-gray-600 mb-2">Choose one</p>
        
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="gender-male"
              name="preferredGender"
              value="male"
              checked={formData.preferredGender === 'male'}
              onChange={handleInputChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
              disabled={!!selectedPuppyId}
            />
            <label htmlFor="gender-male" className="ml-2 block text-sm text-gray-700">
              Male
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="radio"
              id="gender-female"
              name="preferredGender"
              value="female"
              checked={formData.preferredGender === 'female'}
              onChange={handleInputChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
              disabled={!!selectedPuppyId}
            />
            <label htmlFor="gender-female" className="ml-2 block text-sm text-gray-700">
              Female
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="radio"
              id="gender-either"
              name="preferredGender"
              value="either"
              checked={formData.preferredGender === 'either'}
              onChange={handleInputChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
              disabled={!!selectedPuppyId}
            />
            <label htmlFor="gender-either" className="ml-2 block text-sm text-gray-700">
              Either Gender
            </label>
          </div>
        </div>
      </div>
      
      
      <div>
        <label htmlFor="activityLevel" className="block text-lg font-medium text-gray-900 mb-1">
          What activity level would you like in a puppy/dog? <span className="text-red-500">*</span>
        </label>
        <select
          id="activityLevel"
          name="activityLevel"
          value={formData.activityLevel}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          required
        >
          <option value="">Select One</option>
          <option value="very-low">Very Low - Couch Potato</option>
          <option value="low">Low - Short Walks Only</option>
          <option value="moderate">Moderate - Regular Exercise</option>
          <option value="high">High - Very Active</option>
          <option value="very-high">Very High - Athletic/Working Dog</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="pickupLocation" className="block text-lg font-medium text-gray-900 mb-1">
          Preferred Pick-up Location <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-600 mb-2">
          Our headquarters is in Denver, CO. Occasionally our partner families in other locations have litters available.
        </p>
        <select
          id="pickupLocation"
          name="pickupLocation"
          value={formData.pickupLocation}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          required
        >
          <option value="">Select One</option>
          <option value="denver">Denver, CO (Headquarters)</option>
          <option value="chicago">Chicago, IL</option>
          <option value="dallas">Dallas, TX</option>
          <option value="seattle">Seattle, WA</option>
          <option value="miami">Miami, FL</option>
        </select>
      </div>
      
      
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          How do you plan to receive this puppy? <span className="text-red-500">*</span>
        </h3>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <input
              type="radio"
              id="delivery-pickup"
              name="deliveryMethod"
              value="pickup"
              checked={formData.deliveryMethod === 'pickup'}
              onChange={handleInputChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
            />
            <label htmlFor="delivery-pickup" className="ml-2 block text-sm text-gray-700">
              Pick-up
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="radio"
              id="delivery-delivery"
              name="deliveryMethod"
              value="delivery"
              checked={formData.deliveryMethod === 'delivery'}
              onChange={handleInputChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
            />
            <label htmlFor="delivery-delivery" className="ml-2 block text-sm text-gray-700">
              Delivery to anywhere in the Contiguous U.S.
            </label>
          </div>
        </div>
      </div>
      
      {/* Available Puppies Section */}
      <div className="border-t border-gray-200 pt-8 mt-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Available Puppies Matching Your Preferences
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {availablePuppies.length > 0 
                ? `${availablePuppies.length} ${availablePuppies.length === 1 ? 'puppy' : 'puppies'} available`
                : 'No puppies match your current preferences. Try adjusting your selections.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowAvailablePuppies(!showAvailablePuppies)}
            className="text-primary hover:text-primary/80 font-medium text-sm flex items-center"
          >
            <FaEye className="mr-2" />
            {showAvailablePuppies ? 'Hide' : 'Show'} Puppies
          </button>
        </div>
        
        {showAvailablePuppies && (
          <div className="mt-4">
            {availablePuppies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availablePuppies.map((puppy) => (
                  <div
                    key={puppy.id}
                    className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:border-primary transition-colors"
                  >
                    <div className="relative h-48">
                      <Image
                        src={puppy.images[0] || '/images/placeholder-puppy.jpg'}
                        alt={`${puppy.name} - ${puppy.breed}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500 text-white">
                          Available
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-gray-900">{puppy.name}</h4>
                        <div className={`${puppy.gender === 'male' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'} p-1 rounded-full`}>
                          {puppy.gender === 'male' ? <FaMars size={12} /> : <FaVenus size={12} />}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{puppy.breed}</p>
                      <p className="text-xs text-gray-500 mb-2">{calculateAge(puppy.birthDate)}</p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-primary">${puppy.price.toLocaleString()}</span>
                        <span className="text-xs text-gray-600 capitalize">{puppy.color}</span>
                      </div>
                      <Link
                        href={`/puppies/${puppy.id}`}
                        target="_blank"
                        className="block w-full text-center text-sm bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-md transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                <p className="text-gray-700 mb-2">
                  No puppies currently match your selected preferences.
                </p>
                <p className="text-sm text-gray-600">
                  Try adjusting your breed, gender, or color preferences, or check back later for new litters!
                </p>
              </div>
            )}
            
            {/* Show all available puppies link */}
            <div className="mt-4 text-center">
              <Link
                href="/puppies"
                target="_blank"
                className="text-primary hover:text-primary/80 font-medium text-sm"
              >
                View All Available Puppies →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PuppyPreferencesForm;
