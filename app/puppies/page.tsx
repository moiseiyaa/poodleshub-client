'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaUsers } from 'react-icons/fa';
import Container from '../components/organisms/Container';
import PuppyFilters, { FilterOptions } from '../components/molecules/PuppyFilters';
import PuppyCard from '../components/molecules/PuppyCard';
import BondedPairCard from '../components/molecules/BondedPairCard';
import { puppiesApi, Puppy } from '../lib/api/puppies';
import { BondedPair } from '../data/puppies';

/**
 * Puppies Listing page
 * Displays all available puppies with filtering and sorting options
 */
const PuppiesPage = () => {
  const searchParams = useSearchParams();
  const [filteredPuppies, setFilteredPuppies] = useState<Puppy[]>([]);
  const [filteredBondedPairs, setFilteredBondedPairs] = useState<BondedPair[]>([]);
  const [allPuppies, setAllPuppies] = useState<Puppy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasInitialized = useRef(false);
  
  // Get initial filter values from URL
  const initialFilters: FilterOptions = {
    breed: searchParams.get('breed') || '',
    gender: searchParams.get('gender') || '',
    status: searchParams.get('status') || '',
    sort: searchParams.get('sort') || 'newest'
  };
  
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);

  // Fetch puppies from API on component mount
  useEffect(() => {
    const fetchPuppies = async () => {
      try {
        const puppies = await puppiesApi.getAll();
        setAllPuppies(puppies);
        
        // Separate bonded pairs from individual puppies
        const bonded = puppies.filter(p => p.name.includes('&') || p.gender === 'pair');
        const individual = puppies.filter(p => !p.name.includes('&') && p.gender !== 'pair');
        
        setAllPuppies(individual);
        setFilteredPuppies(individual);
        
        // Convert bonded pairs to BondedPair format
        const bondedPairsFormatted: BondedPair[] = bonded.map(p => ({
          id: p.id,
          names: p.name.split(' & ').map(n => n.trim()),
          pairName: p.name,
          breed: p.breed,
          status: p.status,
          genders: ['male', 'female'], // Default assumption
          colors: p.color.split(' & ').map(c => c.trim()),
          birthDate: p.birthDate,
          images: p.images,
          generation: p.generation,
          parents: p.parents || { mother: '' },
          vaccinations: p.vaccinations,
          price: p.price,
          notes: p.notes || '',
          isBondedPair: true
        }));
        
        setFilteredBondedPairs(bondedPairsFormatted);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch puppies:', err);
        setError('Failed to load puppies. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPuppies();
  }, []);
  
  // Apply filters and sorting when filters change
  useEffect(() => {
    // Only show loading on subsequent changes, not on initial load
    if (hasInitialized.current) {
      setIsLoading(true);
    }
    
    // Filter puppies based on selected filters
    let result = [...allPuppies];
    
    if (filters.breed) {
      result = result.filter(puppy => puppy.breed.toLowerCase() === filters.breed.toLowerCase());
    }
    
    if (filters.gender) {
      result = result.filter(puppy => puppy.gender === filters.gender);
    }
    
    if (filters.status) {
      result = result.filter(puppy => puppy.status === filters.status);
    }
    
    // Apply sorting
    switch (filters.sort) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        // Assuming newer puppies have more recent birthdates
        result.sort((a, b) => new Date(b.birthDate).getTime() - new Date(a.birthDate).getTime());
        break;
    }
    
    // Update results immediately without delay
    setFilteredPuppies(result);
    setIsLoading(false);
    hasInitialized.current = true;
  }, [filters, allPuppies]);
  
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <div className="py-8 md:py-12">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Available Puppies</h1>
          <p className="text-lg text-gray-700">
            Browse our selection of adorable, healthy puppies looking for their forever homes.
          </p>
        </div>
        
        <PuppyFilters onFilterChange={handleFilterChange} />
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-gray-100 rounded-xl h-96 animate-pulse"></div>
            ))}
          </div>
        ) : filteredPuppies.length > 0 || filteredBondedPairs.length > 0 ? (
          <div>
            {/* Bonded Pairs Section */}
            {filteredBondedPairs.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FaUsers className="text-purple-600" />
                  Bonded Pairs
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredBondedPairs.map((bondedPair) => (
                    <BondedPairCard key={bondedPair.id} bondedPair={bondedPair} />
                  ))}
                </div>
              </div>
            )}
            
            {/* Individual Puppies Section */}
            {filteredPuppies.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Individual Puppies</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPuppies.map((puppy) => (
                    <PuppyCard key={puppy.id} puppy={puppy} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-red-600 mb-2">Error Loading Puppies</h3>
            <p className="text-gray-700">
              {error}
            </p>
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No puppies found</h3>
            <p className="text-gray-700">
              No puppies match your current filter criteria. Please try adjusting your filters.
            </p>
          </div>
        )}
        
        {!isLoading && filteredPuppies.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-gray-700 mb-4">
              Showing {filteredPuppies.length} {filteredPuppies.length === 1 ? 'puppy' : 'puppies'}
            </p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default PuppiesPage;
