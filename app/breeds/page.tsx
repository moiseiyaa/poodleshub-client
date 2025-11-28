'use client';

import Image from 'next/image';
import Link from 'next/link';
import Container from '../components/organisms/Container';
import { getAllBreeds, getBreedImage } from '../data/breeds';

/**
 * Breeds index page
 * Displays all available dog breeds
 */
const BreedsPage = () => {
  const breeds = getAllBreeds();

  return (
    <div className="py-8 md:py-12">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Dog Breeds</h1>
          <p className="text-lg text-gray-700">
            Explore our selection of healthy, happy puppies from various breeds. 
            Each breed has its own unique characteristics and temperament.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {breeds.map((breed) => (
            <Link 
              key={breed.id} 
              href={`/breeds/${breed.id}`}
              className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-64">
                <Image
                  src={getBreedImage(breed)}
                  alt={breed.name}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
              </div>
              
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{breed.name}</h2>
                <p className="text-gray-700 mb-4 line-clamp-2">
                  {breed.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {breed.traits.slice(0, 3).map((trait, index) => (
                    <span 
                      key={index} 
                      className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium text-gray-800"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
                
                <div className="text-primary font-medium group-hover:text-primary/80 transition-colors">
                  View {breed.name} Puppies
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-700 mb-6">
            Don't see the breed you're looking for? Contact us to learn about upcoming litters or special requests.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-full transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default BreedsPage;
