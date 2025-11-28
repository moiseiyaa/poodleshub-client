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
                      <p className="text-sm text-gray-600">Secure your puppy with a $300 deposit</p>
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
                <div className="flex flex-wrap gap-6 items-center">
                  <div className="flex flex-col items-center gap-2">
                    <FaCreditCard className="h-8 w-8 text-blue-600" />
                    <span className="text-xs font-medium text-gray-700">Credit Card</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <FaApple className="h-8 w-8 text-gray-800" />
                    <span className="text-xs font-medium text-gray-700">Apple Pay</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <FaGoogle className="h-8 w-8 text-red-500" />
                    <span className="text-xs font-medium text-gray-700">Google Pay</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <svg className="h-8 w-8 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10z"/>
                    </svg>
                    <span className="text-xs font-medium text-gray-700">Bank Transfer</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <svg className="h-8 w-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.456 0 4.294.478 5.515 1.423 1.224.948 1.836 2.27 1.836 3.96 0 .488-.044.944-.13 1.367-.086.423-.219.822-.398 1.195-.179.374-.398.726-.656 1.055-.258.329-.542.628-.852.897-.31.269-.632.508-.965.717-.333.209-.67.388-1.01.537-.34.149-.67.268-.99.357-.32.089-.622.148-.905.177-.283.03-.537.045-.762.045h-4.28l-.534 3.12a.641.641 0 01-.633.537zM7.88 12.393h2.946c.32 0 .617-.03.89-.09.274-.06.527-.16.758-.3.231-.14.435-.33.612-.57.177-.24.312-.543.405-.91.093-.366.14-.798.14-1.295 0-.24-.03-.453-.09-.638a1.19 1.19 0 00-.277-.453 1.28 1.28 0 00-.488-.277c-.2-.06-.447-.09-.742-.09H8.317l-.437 2.523z"/>
                      <path d="M14.724 21.337h4.607c.524 0 .972-.382 1.054-.901l2.107-12.696a.641.641 0 00-.633-.74h-4.607a.641.641 0 00-.633.74l-2.107 12.696a.641.641 0 00.633.901zm1.434-8.4h2.946c.295 0 .542-.03.742-.09.2-.06.38-.16.488-.277.108-.117.215-.268.277-.453.06-.185.09-.398.09-.638 0-.497-.047-.929-.14-1.295-.093-.367-.228-.67-.405-.91a1.72 1.72 0 00-.612-.57c-.231-.14-.484-.24-.758-.3-.273-.06-.57-.09-.89-.09h-2.946l.437 2.523z"/>
                    </svg>
                    <span className="text-xs font-medium text-gray-700">PayPal</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <svg className="h-8 w-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 8.822c-.145.647-.737 1.06-1.384.915-.647-.145-1.06-.737-.915-1.384l1.97-8.822c.145-.647.737-1.06 1.384-.915.647.145 1.06.737.915 1.384z"/>
                      <path d="M8.12 7.443c-.647-.145-1.239.268-1.384.915L4.766 17.18c-.145.647.268 1.239.915 1.384.647.145 1.239-.268 1.384-.915l1.97-8.822c.145-.647-.268-1.239-.915-1.384z"/>
                      <path d="M14.5 3c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5z"/>
                    </svg>
                    <span className="text-xs font-medium text-gray-700">Cash App</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <FaBtc className="h-8 w-8 text-orange-500" />
                    <span className="text-xs font-medium text-gray-700">Crypto</span>
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
