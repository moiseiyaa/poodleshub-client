'use client';

import Image from 'next/image';
import { FaCheckCircle, FaShieldAlt, FaHome, FaHeart, FaCreditCard, FaApple, FaGoogle, FaCoins, FaBtc } from 'react-icons/fa';
import Container from '../components/organisms/Container';
import ApplicationForm from '../components/organisms/ApplicationForm/ApplicationForm';
import { ApplicationFormProvider } from '../context/ApplicationFormContext';

/**
 * Application page component
 * Displays the puppy application form with supporting content
 */
const ApplicationPage = () => {
  return (
    <div className="py-8 md:py-12 bg-gray-50">
      <Container>
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Apply</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Apply today for one of our precious puppies
          </p>
          <div className="mt-6 flex justify-center">
            <a
              href="#application-form"
              className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-full transition-colors"
            >
              Apply Now
            </a>
          </div>
        </div>
        
        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-50 rounded-full">
                <FaShieldAlt className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">A+ Rating</h3>
            <p className="text-gray-700 text-sm">
              & more than 400 Five-Star Reviews with the Better Business Bureau
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-50 rounded-full">
                <FaCheckCircle className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No Puppy Mill Breeding Commitment</h3>
            <p className="text-gray-700 text-sm">
              Zero tolerance for unethical breeding
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-50 rounded-full">
                <FaHome className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Family-Raised Puppies</h3>
            <p className="text-gray-700 text-sm">
              Healthier & Better Socialized Puppies
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-50 rounded-full">
                <FaHeart className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Healthy, Happy Puppies</h3>
            <p className="text-gray-700 text-sm">
              Outstanding 12-Year Health Guarantee
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Apply for a PuppyHub USA Puppy</h2>
            <p className="text-gray-700 mb-4">
              Years ago, we announced puppy litters to hundreds of people who had placed their name on a list. 
              Within the first minute or two, the entire litter would be spoken for, and those who got a pup 
              felt like they had won the lottery. If a family checked their email more than 4 or 5 minutes 
              after we sent it, the pups would already be spoken for.
            </p>
            <p className="text-gray-700 mb-4">
              At PuppyHub USA we use a thorough application process to take deposits ahead of time, accepting 
              only the best qualified forever homes.
            </p>
            
            <div className="relative h-60 md:h-80 rounded-lg overflow-hidden my-8">
              <Image
                src="/images/puppies-playing.jpg"
                alt="Puppies playing on the grass"
                fill
                className="object-cover"
              />
            </div>
            
            <p className="text-gray-700 mb-4">
              Please do not place a PayPal deposit unless your puppy application is accepted. We will try to 
              thoroughly and fairly evaluate your application within four to five days. We will respond with 
              a detailed answer that will essentially be "yes," "no," or "wait." We're presently able to accept 
              deposits from almost 75% of those who want a puppy from us. Each year it seems like we have to be 
              more picky in which applications we can accept as we are continually flooded with puppy applications.
            </p>
            
            <div className="relative h-60 md:h-80 rounded-lg overflow-hidden my-8">
              <Image
                src="/images/puppies-grass.jpg"
                alt="Puppies playing on the grass"
                fill
                className="object-cover"
              />
            </div>
            
            <p className="text-gray-700 mb-4">
              Completing the application below in NO WAY obligates you to place a deposit or to get a puppy 
              from PuppyHub USA, it's merely the initial step to show interest and explore if your family 
              would be a good fit.
            </p>
            <p className="text-gray-700 mb-4">
              If we accept your application, you would have the option of placing a $300 deposit (refundable 
              up to 2 years from your deposit date minus a 9% processing fee). Once you reserve your puppy, 
              your deposit is no longer refundable and will be applied to the balance of that puppy on Adoption Day.
            </p>
            <p className="text-gray-700 mb-4">
              Once you place the deposit, you will receive litter announcements to choose which pup you want 
              from a given litter as they're available. You also have the option to pass on as many litters 
              as you want.
            </p>
            
            <div className="relative h-60 md:h-80 rounded-lg overflow-hidden my-8">
              <Image
                src="/images/chocolate-puppy.jpg"
                alt="Chocolate puppy"
                fill
                className="object-cover"
              />
            </div>
            
            <p className="text-gray-700 mb-4">
              Before you reserve your puppy, your deposit can be refunded at any time for any reason (minus a 9% 
              processing fee) up to 2 years from your deposit date.
            </p>
            <p className="text-gray-700 mb-4">
              The deposit shows us that you're serious, but we have no desire to keep your deposit if you find 
              a dog somewhere else or for some other reason decide not to get a puppy from PuppyHub USA.
            </p>
            <p className="text-gray-700 mb-8">
              Still considering the different breed options or wondering which puppy is right for you? Check out 
              our Breed Comparison page to learn more about how to choose the right puppy.
            </p>
            
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <div className="flex items-center mb-4">
                <FaShieldAlt className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-xl font-bold text-gray-900">12-Year Health Guarantee</h3>
              </div>
              <p className="text-gray-700">
                "After you fill out an application, we highly recommend reading through our entire step-by-step 
                process to understand the typical timetable from start to finish."
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Application Process</h3>
                <ol className="space-y-4">
                  <li className="flex">
                    <div className="shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Submit Application</h4>
                      <p className="text-sm text-gray-600">Fill out our comprehensive form</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Application Review</h4>
                      <p className="text-sm text-gray-600">4-5 business days</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Place Deposit</h4>
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <FaCreditCard className="h-4 w-4 text-gray-600" />
                          </div>
                          <span className="text-sm font-medium">Credit Cards</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <FaApple className="h-4 w-4 text-gray-600" />
                          </div>
                          <span className="text-sm font-medium">Apple Pay</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <FaGoogle className="h-4 w-4 text-gray-600" />
                          </div>
                          <span className="text-sm font-medium">Google Pay</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <FaCoins className="h-4 w-4 text-gray-600" />
                          </div>
                          <span className="text-sm font-medium">Bank Transfer</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <FaBtc className="h-4 w-4 text-gray-600" />
                          </div>
                          <span className="text-sm font-medium">Binance</span>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Receive Announcements</h4>
                      <p className="text-sm text-gray-600">Choose your perfect puppy</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3">
                      5
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Welcome Home</h4>
                      <p className="text-sm text-gray-600">Bring your new puppy home</p>
                    </div>
                  </li>
                </ol>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">We Accept</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-gray-100 p-2 rounded">
                    <span className="text-sm font-medium">Credit Cards</span>
                  </div>
                  <div className="bg-gray-100 p-2 rounded">
                    <span className="text-sm font-medium">Bank Transfer</span>
                  </div>
                  <div className="bg-gray-100 p-2 rounded">
                    <span className="text-sm font-medium">Cryptocurrency</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Application Form */}
        <div id="application-form" className="pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Application Form</h2>
          <ApplicationFormProvider>
            <ApplicationForm />
          </ApplicationFormProvider>
        </div>
      </Container>
    </div>
  );
};

export default ApplicationPage;
