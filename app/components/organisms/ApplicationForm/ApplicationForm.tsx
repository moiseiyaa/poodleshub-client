'use client';

import { useState } from 'react';
import { useApplicationForm } from '../../../context/ApplicationFormContext';
import BasicInfoForm from './BasicInfoForm';
import PuppyPreferencesForm from './PuppyPreferencesForm';
import HouseholdInfoForm from './HouseholdInfoForm';
import AgreementsForm from './AgreementsForm';

/**
 * ApplicationForm component
 * Multi-step form for puppy adoption applications
 */
const ApplicationForm = () => {
  const { 
    currentStep, 
    goToNextStep, 
    goToPreviousStep, 
    goToStep,
    isStepValid,
    getStepValidationErrors,
    submitForm,
    isSubmitting,
    submitError
  } = useApplicationForm();
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  
  const handleNextStep = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const isValid = isStepValid(currentStep);
    
    if (isValid) {
      goToNextStep();
    } else {
      // Show detailed validation errors
      const errors = getStepValidationErrors(currentStep);
      const errorMessage = `Please complete the following required fields:\n\n${errors.join('\n')}`;
      alert(errorMessage);
    }
  };
  
  const handlePreviousStep = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    goToPreviousStep();
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isStepValid(currentStep)) {
      try {
        const success = await submitForm();
        if (success) {
          setFormSubmitted(true);
          setSubmissionError(null);
        } else {
          setSubmissionError('There was an error submitting your application. Please try again.');
        }
      } catch (error) {
        setSubmissionError('An unexpected error occurred. Please try again later.');
      }
    }
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoForm />;
      case 2:
        return <PuppyPreferencesForm />;
      case 3:
        return <HouseholdInfoForm />;
      case 4:
        return <AgreementsForm />;
      default:
        return <BasicInfoForm />;
    }
  };
  
  const renderStepIndicator = () => {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <button
                onClick={() => goToStep(step)}
                disabled={step > currentStep}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step === currentStep
                    ? 'bg-primary text-white'
                    : step < currentStep
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                } ${step <= currentStep ? 'cursor-pointer' : 'cursor-not-allowed'}`}
              >
                {step < currentStep ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  step
                )}
              </button>
              <span className="mt-2 text-xs text-gray-500">
                {step === 1
                  ? 'Basic Info'
                  : step === 2
                  ? 'Preferences'
                  : step === 3
                  ? 'Household'
                  : 'Review'}
              </span>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-200">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
            />
          </div>
        </div>
      </div>
    );
  };
  
  if (formSubmitted) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted Successfully!</h2>
          <p className="text-gray-700 mb-6">
            Thank you for applying to adopt a puppy from PuppyHub USA. We have received your application and will review it within 4-5 business days.
          </p>
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">What happens next?</h3>
            <ol className="list-decimal list-inside text-left space-y-2 text-gray-700">
              <li>Our team will review your application thoroughly.</li>
              <li>You'll receive an email with our decision within 4-5 business days.</li>
              <li>If approved, you'll be invited to place a deposit to secure your spot on our waiting list.</li>
              <li>You'll receive puppy announcements as they become available based on your preferences.</li>
            </ol>
          </div>
          <div className="flex justify-center">
            <a
              href="/"
              className="inline-flex items-center bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-full transition-colors"
            >
              Return to Homepage
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="application-form-container" className="bg-white p-6 md:p-8 rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        {renderStepIndicator()}
        
        {renderStepContent()}
        
        {/* Validation errors display - only for preferred colors and coat types */}
        {!isStepValid(currentStep) && currentStep === 2 && (
          (() => {
            const errors = getStepValidationErrors(currentStep);
            const filteredErrors = errors.filter(
              error => error.includes('preferred color') || error.includes('preferred coat type')
            );
            return filteredErrors.length > 0 ? (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-yellow-800 font-medium mb-2">Please complete all required fields:</p>
                <ul className="list-disc list-inside text-yellow-700 text-sm space-y-1">
                  {filteredErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            ) : null;
          })()
        )}
        
        {submitError && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600">{submitError}</p>
          </div>
        )}
        
        <div className="mt-8 flex justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePreviousStep}
              className="bg-white hover:bg-gray-100 text-gray-800 font-medium py-2 px-6 border border-gray-300 rounded-md transition-colors"
            >
              Previous
            </button>
          ) : (
            <div></div>
          )}
          
          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-6 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
              disabled={!isStepValid(currentStep) || isSubmitting}
              className={`bg-primary hover:bg-primary/90 text-white font-medium py-2 px-6 rounded-md transition-colors ${
                !isStepValid(currentStep) || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
