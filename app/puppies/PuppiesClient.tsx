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
import { generateJsonLd } from '../lib/schema-generator';

interface PuppiesClientProps {
  initialPuppies: Puppy[];
  initialBondedPairs: BondedPair[];
}

export default function PuppiesClient({ initialPuppies, initialBondedPairs }: PuppiesClientProps) {
  const searchParams = useSearchParams();
  const [filteredPuppies, setFilteredPuppies] = useState<Puppy[]>(initialPuppies);
  const [filteredBondedPairs, setFilteredBondedPairs] = useState<BondedPair[]>(initialBondedPairs);
  const [allPuppies, setAllPuppies] = useState<Puppy[]>(initialPuppies);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasInitialized = useRef(false);
  
  // Get initial filter values from URL
  const initialFilters: FilterOptions = {
    breed: searchParams.get('breed') || '',
    gender: searchParams.get('gender') || '',
    status: searchParams.get('status') || '',
    sort: searchParams.get('sort') || 'newest'
  };

  // Fetch puppies data
  useEffect(() => {
    const fetchPuppies = async () => {
      try {
        const data = await puppiesApi.getAll();
        setAllPuppies(data);
        setFilteredPuppies(data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load puppies. Please try again later.');
        setIsLoading(false);
      }
    };

    if (!hasInitialized.current) {
      fetchPuppies();
      hasInitialized.current = true;
    }
  }, []);

  // Generate schema.org data
  const schemaData = generateJsonLd('WEBSITE', {
    metaTitle: 'Available Puppies',
    metaDescription: 'Browse our selection of adorable, healthy puppies available for adoption at PuppyHub USA.',
    canonicalUrl: 'https://puppyhubusa.com/puppies'
  });

  if (isLoading) {
    return (
      <Container className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-gray-100 rounded-xl h-96 animate-pulse"></div>
          ))}
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-8 text-center">
        <h3 className="text-xl font-medium text-red-600 mb-2">Error Loading Puppies</h3>
        <p className="text-gray-700">{error}</p>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Available Puppies</h1>
        <PuppyFilters 
          onFilterChange={(newFilters) => {
            // Implement filtering logic here
            console.log('Filters changed:', newFilters);
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPuppies.map((puppy) => (
          <PuppyCard key={puppy.id} puppy={puppy} />
        ))}
      </div>

      {filteredBondedPairs.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Bonded Pairs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBondedPairs.map((pair) => (
              <BondedPairCard key={pair.id} bondedPair={pair} />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}
