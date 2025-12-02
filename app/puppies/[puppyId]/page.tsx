'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { FaMars, FaVenus, FaCheckCircle, FaShieldAlt, FaHeart, FaArrowLeft, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';
import Container from '../../components/organisms/Container';
import { puppiesApi, Puppy } from '../../lib/api/puppies';
import { getBreedById } from '../../data/breeds';
import { useCart } from '../../context/CartContext';
import PuppyCard from '../../components/molecules/PuppyCard';

/**
 * Individual puppy detail page
 * Displays comprehensive information about a specific puppy
 */
const PuppyDetailPage = () => {
  const { puppyId } = useParams();
  const router = useRouter();
  const { addToCart, isInCart } = useCart();
  const [puppy, setPuppy] = useState<Puppy | null>(null);
  const [breed, setBreed] = useState<any>(null);
  const [relatedPuppies, setRelatedPuppies] = useState<Puppy[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isReserving, setIsReserving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPuppy = async () => {
      if (!puppyId) return;
      
      try {
        setIsLoading(true);
        const puppyData = await puppiesApi.getById(puppyId as string);
        setPuppy(puppyData);
        setError(null);
        
        if (puppyData) {
          // Temporarily comment out breed lookup to isolate SSR issue
          // const breedData = getBreedById(puppyData.breed.toLowerCase().replace(/\s+/g, '-'));
          // setBreed(breedData);
          setBreed(null); // Set to null temporarily
          
          // Temporarily comment out related puppies to isolate SSR issue
          // try {
          //   const related = await puppiesApi.getByBreed(puppyData.breed);
          //   const filteredRelated = related
          //     .filter(p => p.id !== puppyData.id && p.status === 'available')
          //     .slice(0, 3);
          //   setRelatedPuppies(filteredRelated);
          // } catch (err) {
          //   console.error('Failed to fetch related puppies:', err);
          //   setRelatedPuppies([]);
          // }
          setRelatedPuppies([]); // Set to empty array temporarily
        }
      } catch (err) {
        console.error('Failed to fetch puppy:', err);
        setError('Failed to load puppy information. Please try again later.');
        setPuppy(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPuppy();
  }, [puppyId]);

  if (isLoading) {
    return (
      <Container>
        <div className="py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Loading puppy information...</p>
        </div>
      </Container>
    );
  }

  if (error || !puppy) {
    return (
      <Container>
        <div className="py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {error ? 'Error Loading Puppy' : 'Puppy Not Found'}
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            {error || 'The puppy you are looking for does not exist or has been removed.'}
          </p>
          <Link 
            href="/puppies" 
            className="inline-flex items-center bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-full transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to All Puppies
          </Link>
        </div>
      </Container>
    );
  }

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

  const handleReserve = () => {
    if (puppy.status !== 'available') {
      alert('This puppy is no longer available for reservation.');
      return;
    }
    
    setIsReserving(true);
    addToCart(puppy);
    
    setTimeout(() => {
      setIsReserving(false);
      router.push('/cart');
    }, 500);
  };

  return (
    <div className="py-8 md:py-12">
      <Container>
        {/* Back Button */}
        <Link 
          href="/puppies" 
          className="inline-flex items-center text-gray-700 hover:text-primary mb-6 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          Back to All Puppies
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Image Gallery */}
          <div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-lg mb-4">
              <Image
                src={puppy.images[selectedImageIndex] || puppy.images[0] || '/images/placeholder-puppy.jpg'}
                alt={`${puppy.name} - ${puppy.breed}`}
                fill
                className="object-cover"
                priority
              />
              {puppy.status === 'available' && (
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-500 text-white shadow-lg">
                    Available
                  </span>
                </div>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {puppy.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {puppy.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative h-24 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index 
                        ? 'border-primary shadow-md' 
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${puppy.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Puppy Information */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{puppy.name}</h1>
                <p className="text-xl text-gray-600 mb-4">{puppy.breed}</p>
              </div>
              <div className={`${puppy.gender === 'male' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'} p-3 rounded-full`}>
                {puppy.gender === 'male' ? <FaMars size={24} /> : <FaVenus size={24} />}
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-3xl font-bold text-primary">${puppy.price.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Adoption Fee</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">{calculateAge(puppy.birthDate)}</p>
                  <p className="text-sm text-gray-600">Born {new Date(puppy.birthDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </div>
            </div>

            {/* Key Information */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white border border-gray-200 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Color</p>
                <p className="font-semibold text-gray-900 capitalize">{puppy.color}</p>
              </div>
              <div className="bg-white border border-gray-200 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Generation</p>
                <p className="font-semibold text-gray-900">{puppy.generation}</p>
              </div>
            </div>

            {/* Vaccinations */}
            <div className="bg-white border border-gray-200 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <FaShieldAlt className="mr-2 text-primary" />
                Vaccinations
              </h3>
              <div className="flex flex-wrap gap-2">
                {puppy.vaccinations.map((vaccination, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                  >
                    <FaCheckCircle className="mr-1" />
                    {vaccination}
                  </span>
                ))}
              </div>
            </div>

            {/* Notes */}
            {puppy.notes && (
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">About {puppy.name}</h3>
                <p className="text-gray-700">{puppy.notes}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              {puppy.status === 'available' ? (
                <>
                  {isInCart(puppy.id) ? (
                    <Link
                      href="/cart"
                      className="block w-full bg-primary hover:bg-primary/90 text-white font-medium py-4 px-6 rounded-lg text-center transition-colors"
                    >
                      View in Cart
                    </Link>
                  ) : (
                    <button
                      onClick={handleReserve}
                      disabled={isReserving}
                      className={`w-full bg-primary hover:bg-primary/90 text-white font-medium py-4 px-6 rounded-lg transition-colors flex items-center justify-center ${
                        isReserving ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isReserving ? (
                        <>
                          <span className="animate-spin mr-2">⏳</span>
                          Reserving...
                        </>
                      ) : (
                        <>
                          <FaHeart className="mr-2" />
                          Reserve {puppy.name}
                        </>
                      )}
                    </button>
                  )}
                  <Link
                    href="/application"
                    className="block w-full bg-white border-2 border-primary text-primary hover:bg-primary/5 font-medium py-4 px-6 rounded-lg text-center transition-colors"
                  >
                    Apply to Adopt
                  </Link>
                </>
              ) : (
                <div className="bg-gray-100 p-6 rounded-lg text-center">
                  <p className="text-gray-700 font-medium mb-2">
                    This puppy is {puppy.status === 'reserved' ? 'reserved' : 'adopted'}
                  </p>
                  <Link
                    href="/puppies"
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    View Other Available Puppies
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Parent Information */}
        {puppy.parents && puppy.parents.mother && (
          <div className="bg-gray-50 p-8 rounded-2xl mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Parent Information</h2>
            <div className="max-w-md mx-auto">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Dam (Mother)</h3>
                <div className="relative h-64 rounded-lg overflow-hidden bg-white">
                  <Image
                    src={puppy.parents.mother}
                    alt="Puppy's mother"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Health Guarantee & Process Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white border border-gray-200 p-6 rounded-xl">
            <div className="flex items-center mb-4">
              <FaShieldAlt className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-xl font-bold text-gray-900">12-Year Health Guarantee</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Every puppy comes with our comprehensive 12-year health guarantee covering genetic conditions.
            </p>
            <Link 
              href="/health-guarantee" 
              className="text-primary hover:text-primary/80 font-medium"
            >
              Learn More →
            </Link>
          </div>
          
          <div className="bg-white border border-gray-200 p-6 rounded-xl">
            <div className="flex items-center mb-4">
              <FaCalendarAlt className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-xl font-bold text-gray-900">Adoption Process</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Learn about our simple, transparent adoption process from application to bringing your puppy home.
            </p>
            <Link 
              href="/process" 
              className="text-primary hover:text-primary/80 font-medium"
            >
              View Process →
            </Link>
          </div>
        </div>

        {/* Related Puppies */}
        {relatedPuppies.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Other Available {puppy.breed} Puppies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPuppies.map((relatedPuppy) => (
                <PuppyCard key={relatedPuppy.id} puppy={relatedPuppy} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default PuppyDetailPage;

