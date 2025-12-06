'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGift, FaSnowflake, FaFire, FaCheckCircle, FaArrowRight, FaUsers } from 'react-icons/fa';
import Container from '../components/organisms/Container';
import { puppiesApi, Puppy } from '../lib/api/puppies';
import { bondedPairs, BondedPair } from '../data/puppies';

/**
 * Black Friday & Christmas Promotion Page
 * Showcases featured puppies with festive design and holiday theme
 */
const PromotionPage = () => {
  const [allPuppies, setAllPuppies] = useState<Puppy[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPuppies = async () => {
      try {
        const puppies = await puppiesApi.getAll();
        setAllPuppies(puppies);
      } catch (error) {
        console.error('Failed to fetch puppies:', error);
        setAllPuppies([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPuppies();
  }, []);

  // Get featured Poodles and Maltese puppies that are available
  const poodlePuppies = allPuppies.filter(p => p.breed === 'Poodle' && p.status === 'available');
  const maltesePuppies = allPuppies.filter(p => p.breed === 'Maltese' && p.status === 'available');
  
  // Get featured bonded pairs
  const featuredBondedPairs = bondedPairs.filter(pair => pair.status === 'available');
  
  // Create featured puppies with discount (20% off)
  // Prioritize showing 2 Poodles, 2 Maltese, and bonded pairs
  const featuredPuppies = [
    ...poodlePuppies.slice(0, 2),
    ...maltesePuppies.slice(0, 2)
  ].map(puppy => ({
    ...puppy,
    originalPrice: puppy.price,
    discountPrice: Math.round(puppy.price * 0.8),
    badge: '20% OFF',
    features: [
      puppy.breed === 'Poodle' ? 'Hypoallergenic' : 'Affectionate',
      puppy.breed === 'Poodle' ? 'Highly Intelligent' : 'Gentle',
      puppy.breed === 'Poodle' ? 'Perfect Companion' : 'Apartment-Friendly'
    ]
  })).slice(0, 4);
  
  // Create featured bonded pairs with discount
  const featuredBondedPairsWithDiscount = featuredBondedPairs.map(pair => ({
    ...pair,
    originalPrice: pair.price,
    discountPrice: Math.round(pair.price * 0.8),
    badge: 'BEST DEAL',
    features: [
      'Bonded Siblings',
      'Double the Love',
      'Perfect Companions'
    ]
  }));

  // Combine individual puppies and bonded pairs
  const allFeaturedItems = [...featuredPuppies, ...featuredBondedPairsWithDiscount];

  const promotionBenefits = [
    {
      icon: '🎄',
      title: 'Holiday Special Pricing',
      description: 'Enjoy up to 20% discount on selected premium puppies'
    },
    {
      icon: '💚',
      title: '12-Year Health Guarantee',
      description: 'Complete peace of mind with our comprehensive health coverage'
    },
    {
      icon: '🎁',
      title: 'Bonus Training Package',
      description: 'Free basic training consultation with every adoption'
    },
    {
      icon: '⭐',
      title: 'Priority Support',
      description: 'Dedicated holiday support team for your questions'
    }
  ];

  return (
    <div className="bg-linear-to-b from-red-50 via-white to-green-50 min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 opacity-20 animate-pulse">
          <FaSnowflake className="h-24 w-24 text-blue-400" />
        </div>
        <div className="absolute bottom-10 left-10 opacity-20 animate-bounce">
          <FaGift className="h-32 w-32 text-red-400" />
        </div>

        <Container>
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <FaFire className="h-6 w-6 text-red-600 animate-bounce" />
              <span className="text-red-600 font-bold uppercase tracking-widest text-sm md:text-base">
                Limited Time Offer
              </span>
              <FaSnowflake className="h-6 w-6 text-blue-400 animate-pulse" />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
              <span className="block">🎄 Black Friday &</span>
              <span className="bg-linear-to-r from-red-600 to-green-600 bg-clip-text text-transparent">
                Christmas Magic
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Give the gift of unconditional love this holiday season. 
              <span className="block mt-3 font-bold text-red-600">
                Adopt your perfect puppy companion with exclusive holiday discounts!
              </span>
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
              <Link
                href="/application"
                className="bg-linear-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 text-lg flex items-center justify-center gap-2"
              >
                <FaGift className="h-5 w-5" />
                Adopt Now - Get 20% Off
              </Link>
              <Link
                href="/puppies"
                className="bg-white hover:bg-gray-50 text-red-600 font-bold py-4 px-8 rounded-full transition-all duration-300 border-2 border-red-600 text-lg flex items-center justify-center gap-2"
              >
                Browse All Puppies
                <FaArrowRight className="h-5 w-5" />
              </Link>
            </div>

            <p className="text-sm md:text-base text-gray-600 font-semibold">
              ✨ Limited puppies available • Offer valid through December 25th ✨
            </p>
          </div>
        </Container>
      </section>

      {/* Featured Puppies Section */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🐕 Featured Holiday Puppies 🐕
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Handpicked premium Poodles and Maltese puppies, specially selected for the holidays
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allFeaturedItems.map((item) => {
              const isBondedPair = 'pairName' in item;
              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 ${
                    isBondedPair ? 'border-yellow-400 ring-2 ring-yellow-200' : 'border-red-100'
                  }`}
                >
                  {/* Image Container */}
                  <div className="relative h-64 bg-gray-200 overflow-hidden">
                    <Image
                      src={item.images[0] || '/images/placeholder-puppy.jpg'}
                      alt={`${isBondedPair ? item.pairName : item.name} - ${item.breed}`}
                      fill
                      className="object-cover"
                    />
                    <div className={`absolute top-4 right-4 px-4 py-2 rounded-full font-bold text-sm shadow-lg ${
                      item.badge === 'BEST DEAL' 
                        ? 'bg-linear-to-r from-yellow-400 to-yellow-500 text-white animate-pulse' 
                        : 'bg-red-600 text-white'
                    }`}>
                      {item.badge}
                    </div>
                    {isBondedPair && (
                      <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                        <FaUsers className="inline mr-1" />
                        Bonded Pair
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {isBondedPair ? item.pairName : item.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      <span className="font-semibold">{item.breed}</span> • 
                      <span className="capitalize">
                        {isBondedPair ? item.colors?.join(' & ') : item.color}
                      </span>
                    </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {item.features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <FaCheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Pricing */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-red-600">${item.discountPrice}</span>
                      <span className="text-lg text-gray-500 line-through">${item.originalPrice}</span>
                    </div>
                    <p className="text-sm text-green-600 font-semibold mt-2">
                      Save ${item.originalPrice - item.discountPrice}!
                      {isBondedPair && <span className="block text-xs mt-1">For both puppies</span>}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href="/application"
                    className="block w-full bg-linear-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold py-3 rounded-lg transition-all duration-300 text-center"
                  >
                    Adopt {isBondedPair ? item.pairName : item.name}
                  </Link>
                </div>
              </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/puppies"
              className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-bold text-lg transition-colors"
            >
              View all available puppies
              <FaArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-linear-to-r from-red-50 to-green-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose PuppyHub USA This Holiday?
            </h2>
            <p className="text-lg text-gray-700">
              More than just a discount—a complete holiday experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {promotionBenefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-700">{benefit.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                The Perfect Holiday Gift Story
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                The holidays are about creating memories and spreading joy. What better way to celebrate than by welcoming a new furry family member into your home?
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Our carefully selected Poodles and Maltese puppies are not just pets—they're companions that will bring unconditional love, laughter, and warmth to your family for years to come.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                This Black Friday and Christmas, we're making it easier than ever to find your perfect puppy companion. With special holiday pricing and our comprehensive 12-year health guarantee, you can adopt with confidence.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <FaCheckCircle className="h-6 w-6 text-green-600 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Ethical & Healthy</h4>
                    <p className="text-gray-700">All puppies are ethically bred with comprehensive health testing</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FaCheckCircle className="h-6 w-6 text-green-600 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Family-Raised</h4>
                    <p className="text-gray-700">Puppies are raised in loving family environments for better socialization</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FaCheckCircle className="h-6 w-6 text-green-600 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Lifetime Support</h4>
                    <p className="text-gray-700">Our team is here to support you every step of the way</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/puppies-playing.jpg"
                  alt="Happy puppies playing"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg hidden md:block border-2 border-red-200">
                <p className="text-sm font-bold text-gray-900">🎄 Holiday Special</p>
                <p className="text-2xl font-bold text-red-600">Up to 20% Off</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-linear-to-r from-red-600 via-red-500 to-green-600 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 opacity-10">
          <FaSnowflake className="h-40 w-40 animate-pulse" />
        </div>
        <div className="absolute bottom-0 left-0 opacity-10">
          <FaGift className="h-48 w-48 animate-bounce" />
        </div>

        <Container>
          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Don't Miss Out on Holiday Magic! 🎉
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Limited puppies available with special holiday pricing. Apply now and bring home your perfect companion this Christmas!
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link
                href="/application"
                className="bg-white text-red-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 text-lg"
              >
                🎁 Start Your Application
              </Link>
              <Link
                href="/puppies"
                className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 text-lg"
              >
                ⭐ Browse All Puppies
              </Link>
            </div>

            <p className="text-sm mt-8 opacity-90">
              Questions? Contact our holiday support team anytime
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default PromotionPage;
