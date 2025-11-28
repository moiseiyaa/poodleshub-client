'use client';

import { FaCreditCard, FaUniversity, FaApple, FaGoogle, FaBitcoin } from 'react-icons/fa';
import { useApplicationForm } from '../../../context/ApplicationFormContext';

/**
 * AgreementsForm component for Step 4 of the application form
 * Collects agreements and payment information for the puppy application
 */
const AgreementsForm = () => {
  const { formData, updateFormData } = useApplicationForm();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;
    
    // Handle checkbox inputs
    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      updateFormData({ [name]: target.checked });
      return;
    }
    
    // Handle radio inputs
    if (target instanceof HTMLInputElement && target.type === 'radio') {
      updateFormData({ [name]: value });
      return;
    }
    
    // Handle other inputs
    updateFormData({ [name]: value });
  };

  return (
    <div className="space-y-8">
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Spay/Neuter & Health Guarantee Agreement</h3>
        <p className="text-gray-700 mb-6">
          Our puppies are meant to be family pets and not used for breeding. We only accept applications 
          from families that agree to honor our spay/neuter agreement to have this procedure completed by 
          the time their puppy is a year old and who agree to the Health Guarantee.
        </p>
        
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="spayNeuterAgreement"
              name="spayNeuterAgreement"
              type="checkbox"
              checked={formData.spayNeuterAgreement}
              onChange={handleInputChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              required
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="spayNeuterAgreement" className="font-medium text-gray-700">
              I agree to spay/neuter any puppy I adopt and will not use it for breeding purposes and I agree to the terms and conditions of the PuppyHub USA's Health Guarantee and Cancellation Policy. <span className="text-red-500">*</span>
            </label>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Deposit Information</h3>
        <p className="text-gray-700 mb-6">
          If your application is approved, you will have the option to place a $300 deposit to secure your spot on our waiting list. 
          This deposit is refundable up to 2 years from your deposit date (minus a 9% processing fee).
        </p>
        
        <div className="mb-6">
          <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Payment Method for Deposit
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod || ''}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="">Select Payment Method</option>
            <option value="creditCard">Credit/Debit Card</option>
            <option value="bankTransfer">Bank Transfer</option>
            <option value="applePay">Apple Pay</option>
            <option value="googlePay">Google Pay</option>
            <option value="paypal">PayPal</option>
            <option value="cashapp">Cash App</option>
            <option value="binance">Binance</option>
          </select>
        </div>
        
        <div className="bg-white p-4 rounded-md border border-gray-200 mb-6">
          <h4 className="font-medium text-gray-900 mb-2">Deposit Amount: $300</h4>
          <p className="text-sm text-gray-600">
            This deposit is refundable up to 2 years from your deposit date (minus a 9% processing fee).
          </p>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
          <p className="text-sm text-gray-800">
            <strong>Important Note:</strong> Please do not place a deposit unless your application is accepted. 
            We will thoroughly evaluate your application within 4-5 days and respond with a detailed answer.
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="optInCommunications"
              name="optInCommunications"
              type="checkbox"
              checked={formData.optInCommunications}
              onChange={handleInputChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="optInCommunications" className="font-medium text-gray-700">
              Yes! Opt-in to receive communications (by Email, Phone, and SMS / Text Messages - Note: Msg & data rates may apply) related to puppy training, order updates, services, and new products/services from PuppyHub USA & their strategic partners.
            </label>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="welcomeCall"
              name="welcomeCall"
              type="checkbox"
              checked={formData.welcomeCall}
              onChange={handleInputChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="welcomeCall" className="font-medium text-gray-700">
              Yes! I would like an initial welcome phone call if I am approved.
            </label>
          </div>
        </div>
      </div>
      
      <div className="pt-4">
        <p className="text-sm text-gray-600 italic">
          You must be 18 years of age or older to apply.
        </p>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Application Review</h3>
        <p className="text-gray-700 mb-6">
          Please review your application before submitting. Once submitted, our team will evaluate your application 
          and respond within 4-5 days with a detailed answer.
        </p>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900">Contact Information</h4>
            <p className="text-gray-700">
              {formData.firstName} {formData.lastName}<br />
              {formData.address}<br />
              {formData.city}, {formData.state} {formData.zipCode}<br />
              {formData.mobileNumber}<br />
              {formData.email}
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900">Puppy Preferences</h4>
            <p className="text-gray-700">
              <strong>First Choice Breed:</strong> {formData.breedChoices[0]?.breed || 'Not specified'}<br />
              <strong>Size Preference:</strong> {formData.preferredSizes.join(', ') || 'Not specified'}<br />
              <strong>Gender Preference:</strong> {formData.preferredGender || 'Not specified'}<br />
              <strong>Delivery Method:</strong> {formData.deliveryMethod === 'pickup' ? 'Pick-up' : 'Delivery'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center pt-6">
        <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span className="ml-2 text-sm text-gray-600">Your information is secure and encrypted</span>
      </div>
    </div>
  );
};

export default AgreementsForm;
