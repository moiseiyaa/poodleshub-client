'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FaCheckCircle, FaPaw, FaHeart, FaBrain, FaRuler } from 'react-icons/fa';
import Container from '../../components/organisms/Container';
import PuppyCard from '../../components/molecules/PuppyCard';
import { getBreedById, getAllBreeds } from '../../data/breeds';
import { getPuppiesByBreed, Puppy } from '../../lib/api/puppies';
import { getTestimonialsByBreed } from '../../data/testimonials';

/**
 * Breed page component
 * Displays breed-specific information and available puppies
 */
const BreedPage = () => {
  const { breedId } = useParams();
  const [breed, setBreed] = useState(getBreedById(breedId as string));
  const [puppies, setPuppies] = useState<Puppy[]>([]);
  const [availablePuppies, setAvailablePuppies] = useState<Puppy[]>([]);
  const [pastPuppies, setPastPuppies] = useState<Puppy[]>([]);
  const [testimonials, setTestimonials] = useState(getTestimonialsByBreed(breed?.name || ''));
  const [isLoadingPuppies, setIsLoadingPuppies] = useState(true);
  
  useEffect(() => {
    if (breedId) {
      const breedData = getBreedById(breedId as string);
      setBreed(breedData);
      
      if (breedData) {
        // Get testimonials for this breed
        setTestimonials(getTestimonialsByBreed(breedData.name));
        
        // Fetch puppies from API
        const fetchPuppies = async () => {
          try {
            const allPuppies = await getPuppiesByBreed(breedData.name);
            setPuppies(allPuppies);
            
            // Filter available and past puppies
            setAvailablePuppies(allPuppies.filter(puppy => puppy.status === 'available'));
            setPastPuppies(allPuppies.filter(puppy => puppy.status === 'adopted'));
          } catch (error) {
            console.error('Failed to fetch puppies by breed:', error);
            setPuppies([]);
            setAvailablePuppies([]);
            setPastPuppies([]);
          } finally {
            setIsLoadingPuppies(false);
          }
        };

        fetchPuppies();
      }
    }
  }, [breedId]);
  
  if (!breed) {
    return (
      <Container>
        <div className="py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Breed Not Found</h1>
          <p className="text-lg text-gray-700 mb-8">
            The breed you are looking for does not exist or has been removed.
          </p>
          <Link 
            href="/puppies" 
            className="inline-flex items-center bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-full transition-colors"
          >
            View All Puppies
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <div>
      {/* Breed Hero Section */}
      <section className="bg-blue-50 py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{breed.name} Puppies</h1>
              <p className="text-lg text-gray-700 mb-6">{breed.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {breed.traits.map((trait: string, index: number) => (
                  <span key={index} className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-800 border border-gray-200">{trait}</span>
                ))}
              </div>
              <Link href="#availableBreed" className="inline-flex items-center bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-full transition-colors">
                View Available {breed.name} Puppies
              </Link>
            </div>
            <div className="relative">
              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                <Image
                  src={breed.image || '/images/placeholder-breed.jpg'}
                  alt={`${breed.name} breed`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Breed Storytelling Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">About {breed.name} Puppies</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div>
                <div className="flex items-start mb-4">
                  <FaPaw className="h-6 w-6 text-primary mt-1 mr-3" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Origin</h3>
                    <p className="text-gray-700">{breed.origin}</p>
                  </div>
                </div>
                
                <div className="flex items-start mb-4">
                  <FaHeart className="h-6 w-6 text-primary mt-1 mr-3" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Temperament</h3>
                    <p className="text-gray-700">{breed.temperament}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-start mb-4">
                  <FaBrain className="h-6 w-6 text-primary mt-1 mr-3" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Trainability</h3>
                    <p className="text-gray-700">{breed.trainability}</p>
                  </div>
                </div>
                
                <div className="flex items-start mb-4">
                  <FaRuler className="h-6 w-6 text-primary mt-1 mr-3" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Size & Life Expectancy</h3>
                    <p className="text-gray-700">
                      <strong>Height:</strong> {breed.sizes.height}<br />
                      <strong>Weight:</strong> {breed.sizes.weight}<br />
                      <strong>Life Expectancy:</strong> {breed.lifeExpectancy}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-12">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Available Colors</h3>
              <div className="flex flex-wrap gap-2">
                {(() => {
                  // Get colors that are both in breed definition AND actually available in puppies
                  const availableColorsInBreed = [...new Set(puppies.map(p => p.color.toLowerCase()))];
                  const formattedColors = availableColorsInBreed.map(color => 
                    color.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-')
                  );
                  
                  return formattedColors.length > 0 ? formattedColors.map((color, index) => (
                    <span 
                      key={index} 
                      className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-800"
                    >
                      {color}
                    </span>
                  )) : (
                    <span className="text-gray-500 text-sm">No puppies currently available</span>
                  );
                })()}
              </div>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Available Puppies Section */}
      <section id="availableBreed" className="py-16 bg-gray-50">
        <Container>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Available {breed.name} Puppies
          </h2>
          
          {availablePuppies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {availablePuppies.map((puppy: Puppy) => (
                <PuppyCard key={puppy.id} puppy={puppy} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 mb-2">No Available Puppies</h3>
              <p className="text-gray-700 mb-6">
                We don't have any {breed.name} puppies available at the moment.
                Join our waiting list to be notified when new litters arrive.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-full transition-colors"
              >
                Join Waiting List
              </Link>
            </div>
          )}
        </Container>
      </section>
      
      {/* Past Puppies Gallery */}
      {pastPuppies.length > 0 && (
        <section className="py-16 bg-white">
          <Container>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Past {breed.name} Puppies
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {pastPuppies.map((puppy: Puppy) => (
                <div key={puppy.id} className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src={puppy.images[0] || '/images/placeholder-puppy.jpg'}
                    alt={`${puppy.name} - ${puppy.breed}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-white font-medium">{puppy.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}
      
      {/* Guarantee & Process Snippets */}
      <section className="py-16 bg-blue-50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Health Guarantee</h3>
              <p className="text-gray-700 mb-6">
                Every {breed.name} puppy comes with our comprehensive 12-year health guarantee, 
                ensuring they are free from genetic conditions that impact their quality of life.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <FaCheckCircle className="h-5 w-5 text-green-600 mt-1 mr-3 shrink-0" />
                  <span className="text-gray-700">Comprehensive genetic testing</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="h-5 w-5 text-green-600 mt-1 mr-3 shrink-0" />
                  <span className="text-gray-700">Regular veterinary check-ups</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="h-5 w-5 text-green-600 mt-1 mr-3 shrink-0" />
                  <span className="text-gray-700">Detailed health records provided</span>
                </li>
              </ul>
              <Link 
                href="/health-guarantee" 
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Learn More About Our Health Guarantee
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Adoption Process</h3>
              <p className="text-gray-700 mb-6">
                Our simple, transparent adoption process makes finding your perfect {breed.name} 
                companion easy and stress-free.
              </p>
              <ol className="space-y-3 mb-6 list-decimal list-inside">
                <li className="text-gray-700">Browse our available {breed.name} puppies</li>
                <li className="text-gray-700">Submit your application</li>
                <li className="text-gray-700">Complete the approval process</li>
                <li className="text-gray-700">Welcome your new puppy home</li>
              </ol>
              <Link 
                href="/process" 
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Learn More About Our Adoption Process
              </Link>
            </div>
          </div>
        </Container>
      </section>
      
      {/* CTA Banner */}
      <section className="py-16 bg-primary">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Welcome a {breed.name} Into Your Home?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Start your application today and take the first step toward bringing home 
              your new furry family member.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="#availableBreed" 
                className="bg-white hover:bg-gray-100 text-primary font-medium py-3 px-8 rounded-full transition-colors text-center"
              >
                View Available Puppies
              </Link>
              <Link 
                href="/application" 
                className="bg-secondary hover:bg-secondary/90 text-white font-medium py-3 px-8 rounded-full transition-colors text-center"
              >
                Start Application
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default BreedPage;
