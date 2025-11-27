'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { z } from 'zod';

// Define the form schema using Zod
export const applicationFormSchema = z.object({
  // Step 1: Basic Info
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  address: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(5, 'Valid zip code is required'),
  outsideUS: z.boolean().default(false),
  mobileNumber: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Valid email is required'),
  confirmEmail: z.string().email('Valid email is required'),
  textAlerts: z.boolean().default(false),
  referralSource: z.string().optional(),
  
  // Step 2: Puppy Preferences
  breedChoices: z.array(z.object({
    priority: z.number(),
    breed: z.string()
  })).min(1, 'At least one breed choice is required'),
  preferredSizes: z.array(z.string()).min(1, 'At least one size preference is required'),
  preferredGender: z.string().min(1, 'Gender preference is required'),
  activityLevel: z.string().min(1, 'Activity level is required'),
  pickupLocation: z.string().min(1, 'Pickup location is required'),
  secondPickupLocation: z.string().optional(),
  deliveryMethod: z.enum(['pickup', 'delivery']),
  
  // Step 3: Household Info
  otherPets: z.boolean(),
  petTypes: z.string().optional(),
  allergies: z.string().optional(),
  hasChildren: z.boolean(),
  childrenAges: z.string().optional(),
  hasFence: z.boolean(),
  alternativeExercise: z.string().optional(),
  lifestyle: z.string().min(1, 'Lifestyle description is required'),
  typicalDay: z.string().min(1, 'Description of typical day is required'),
  whyGoodFit: z.string().min(1, 'Description of why you are a good fit is required'),
  firstDog: z.boolean(),
  previousPuppies: z.coerce.number().default(0),
  interestedInTraining: z.boolean(),
  
  // Step 4: Agreements
  spayNeuterAgreement: z.boolean().refine(val => val === true, {
    message: 'You must agree to the spay/neuter agreement'
  }),
  optInCommunications: z.boolean().default(false),
  welcomeCall: z.boolean().default(false),
  
  // Payment Info (for deposit)
  paymentMethod: z.enum(['creditCard', 'bankTransfer', 'applePay', 'googlePay', 'binance', 'crypto']).optional(),
  depositAmount: z.coerce.number().default(300)
});

export type ApplicationFormData = z.infer<typeof applicationFormSchema>;

// Default form values
const defaultFormValues: ApplicationFormData = {
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  outsideUS: false,
  mobileNumber: '',
  email: '',
  confirmEmail: '',
  textAlerts: false,
  referralSource: '',
  
  breedChoices: [{ priority: 1, breed: '' }],
  preferredSizes: [],
  preferredGender: '',
  activityLevel: '',
  pickupLocation: '',
  secondPickupLocation: '',
  deliveryMethod: 'pickup',
  
  otherPets: false,
  petTypes: '',
  allergies: '',
  hasChildren: false,
  childrenAges: '',
  hasFence: false,
  alternativeExercise: '',
  lifestyle: '',
  typicalDay: '',
  whyGoodFit: '',
  firstDog: false,
  previousPuppies: 0,
  interestedInTraining: false,
  
  spayNeuterAgreement: false,
  optInCommunications: false,
  welcomeCall: false,
  
  paymentMethod: undefined,
  depositAmount: 300
};

interface ApplicationFormContextType {
  formData: ApplicationFormData;
  updateFormData: (data: Partial<ApplicationFormData>) => void;
  currentStep: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  goToStep: (step: number) => void;
  isStepValid: (step: number) => boolean;
  getStepValidationErrors: (step: number) => string[];
  resetForm: () => void;
  submitForm: () => Promise<boolean>;
  isSubmitting: boolean;
  submitError: string | null;
}

const ApplicationFormContext = createContext<ApplicationFormContextType | undefined>(undefined);

export const useApplicationForm = () => {
  const context = useContext(ApplicationFormContext);
  if (context === undefined) {
    throw new Error('useApplicationForm must be used within an ApplicationFormProvider');
  }
  return context;
};

interface ApplicationFormProviderProps {
  children: ReactNode;
}

export const ApplicationFormProvider = ({ children }: ApplicationFormProviderProps) => {
  const [formData, setFormData] = useState<ApplicationFormData>(defaultFormValues);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  // Load form data from localStorage on initial render
  useEffect(() => {
    try {
      const savedForm = localStorage.getItem('puppyhub-application-form');
      if (savedForm) {
        const parsedForm = JSON.parse(savedForm);
        setFormData(parsedForm);
      }
    } catch (error) {
      console.error('Failed to load form data from localStorage:', error);
    }
  }, []);
  
  // Save form data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('puppyhub-application-form', JSON.stringify(formData));
    } catch (error) {
      console.error('Failed to save form data to localStorage:', error);
    }
  }, [formData]);
  
  const updateFormData = (data: Partial<ApplicationFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };
  
  const goToNextStep = () => {
    if (currentStep < 4) {
      // Store current scroll position relative to form
      const formElement = document.getElementById('application-form-container');
      const scrollOffset = formElement ? window.scrollY - formElement.offsetTop : 0;
      
      setCurrentStep(prev => prev + 1);
      
      // Restore scroll position smoothly after step change
      setTimeout(() => {
        if (formElement) {
          const targetScroll = formElement.offsetTop + scrollOffset;
          window.scrollTo({ top: targetScroll, behavior: 'smooth' });
        }
      }, 50);
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      // Store current scroll position relative to form
      const formElement = document.getElementById('application-form-container');
      const scrollOffset = formElement ? window.scrollY - formElement.offsetTop : 0;
      
      setCurrentStep(prev => prev - 1);
      
      // Restore scroll position smoothly after step change
      setTimeout(() => {
        if (formElement) {
          const targetScroll = formElement.offsetTop + scrollOffset;
          window.scrollTo({ top: targetScroll, behavior: 'smooth' });
        }
      }, 50);
    }
  };
  
  const goToStep = (step: number) => {
    if (step >= 1 && step <= 4) {
      // Store current scroll position relative to form
      const formElement = document.getElementById('application-form-container');
      const scrollOffset = formElement ? window.scrollY - formElement.offsetTop : 0;
      
      setCurrentStep(step);
      
      // Restore scroll position smoothly after step change
      setTimeout(() => {
        if (formElement) {
          const targetScroll = formElement.offsetTop + scrollOffset;
          window.scrollTo({ top: targetScroll, behavior: 'smooth' });
        }
      }, 50);
    }
  };
  
  const getStepValidationErrors = (step: number): string[] => {
    const errors: string[] = [];
    
    switch (step) {
      case 1:
        if (!formData.firstName || formData.firstName.trim() === '') errors.push('First name');
        if (!formData.lastName || formData.lastName.trim() === '') errors.push('Last name');
        if (!formData.address || formData.address.trim() === '') errors.push('Street address');
        if (!formData.city || formData.city.trim() === '') errors.push('City');
        if (!formData.state || formData.state.trim() === '') errors.push('State');
        if (!formData.zipCode || formData.zipCode.trim().length < 5) errors.push('Zip code (must be at least 5 digits)');
        if (!formData.mobileNumber || formData.mobileNumber.replace(/\D/g, '').length < 10) errors.push('Mobile number (must be at least 10 digits)');
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.push('Valid email address');
        if (!formData.confirmEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.confirmEmail)) errors.push('Valid confirmation email');
        if (formData.email !== formData.confirmEmail) errors.push('Email addresses must match');
        break;
      case 2:
        const validBreedChoicesError = formData.breedChoices.filter(choice => choice.breed && choice.breed.trim() !== '');
        if (!validBreedChoicesError || validBreedChoicesError.length === 0) errors.push('At least one breed choice');
        if (!formData.preferredSizes || formData.preferredSizes.length === 0) errors.push('At least one preferred size');
        if (!formData.preferredGender || formData.preferredGender.trim() === '') errors.push('Gender preference');
        if (!formData.activityLevel || formData.activityLevel.trim() === '') errors.push('Activity level');
        if (!formData.pickupLocation || formData.pickupLocation.trim() === '') errors.push('Pickup location');
        if (!formData.deliveryMethod) errors.push('Delivery method');
        break;
      case 3:
        if (!formData.lifestyle || formData.lifestyle.trim() === '') errors.push('Lifestyle description');
        if (!formData.typicalDay || formData.typicalDay.trim() === '') errors.push('Description of typical day');
        if (!formData.whyGoodFit || formData.whyGoodFit.trim() === '') errors.push('Why you are a good fit');
        if (formData.otherPets && (!formData.petTypes || formData.petTypes.trim() === '')) errors.push('Pet types (required if you have other pets)');
        if (formData.hasChildren && (!formData.childrenAges || formData.childrenAges.trim() === '')) errors.push('Children ages (required if you have children)');
        if (!formData.hasFence && (!formData.alternativeExercise || formData.alternativeExercise.trim() === '')) errors.push('Alternative exercise plan (required if no fence)');
        break;
      case 4:
        if (!formData.spayNeuterAgreement) errors.push('Spay/neuter agreement');
        break;
    }
    
    return errors;
  };

  const isStepValid = (step: number): boolean => {
    try {
      switch (step) {
        case 1:
          // Validate Basic Info
          if (!formData.firstName || formData.firstName.trim() === '') return false;
          if (!formData.lastName || formData.lastName.trim() === '') return false;
          if (!formData.address || formData.address.trim() === '') return false;
          if (!formData.city || formData.city.trim() === '') return false;
          if (!formData.state || formData.state.trim() === '') return false;
          if (!formData.zipCode || formData.zipCode.trim().length < 5) return false;
          if (!formData.mobileNumber || formData.mobileNumber.replace(/\D/g, '').length < 10) return false;
          if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return false;
          if (!formData.confirmEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.confirmEmail)) return false;
          
          // Additional validation for email confirmation
          if (formData.email !== formData.confirmEmail) {
            return false;
          }
          return true;
          
        case 2:
          // Validate Puppy Preferences
          const validBreedChoices = formData.breedChoices.filter(choice => choice.breed && choice.breed.trim() !== '');
          if (!validBreedChoices || validBreedChoices.length === 0) return false;
          if (!formData.preferredSizes || formData.preferredSizes.length === 0) return false;
          if (!formData.preferredGender || formData.preferredGender.trim() === '') return false;
          if (!formData.activityLevel || formData.activityLevel.trim() === '') return false;
          if (!formData.pickupLocation || formData.pickupLocation.trim() === '') return false;
          if (!formData.deliveryMethod) return false;
          return true;
          
        case 3:
          // Validate Household Info
          if (!formData.lifestyle || formData.lifestyle.trim() === '') return false;
          if (!formData.typicalDay || formData.typicalDay.trim() === '') return false;
          if (!formData.whyGoodFit || formData.whyGoodFit.trim() === '') return false;
          
          // Additional validation for conditional fields
          if (formData.otherPets && (!formData.petTypes || formData.petTypes.trim() === '')) {
            return false;
          }
          if (formData.hasChildren && (!formData.childrenAges || formData.childrenAges.trim() === '')) {
            return false;
          }
          if (!formData.hasFence && (!formData.alternativeExercise || formData.alternativeExercise.trim() === '')) {
            return false;
          }
          return true;
          
        case 4:
          // Validate Agreements
          if (!formData.spayNeuterAgreement) {
            return false;
          }
          return true;
          
        default:
          return false;
      }
    } catch (error) {
      console.error('Validation error:', error);
      return false;
    }
  };
  
  const resetForm = () => {
    setFormData(defaultFormValues);
    setCurrentStep(1);
    localStorage.removeItem('puppyhub-application-form');
  };
  
  const submitForm = async (): Promise<boolean> => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Validate the entire form
      applicationFormSchema.parse(formData);
      
      // Submit to backend API
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const response = await fetch(`${apiUrl}/api/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit application');
      }

      // Clear form data after successful submission
      resetForm();
      setIsSubmitting(false);
      return true;
    } catch (error) {
      console.error('Form submission error:', error);
      const errorMessage = error instanceof Error ? error.message : 'There was an error submitting your application. Please check all fields and try again.';
      setSubmitError(errorMessage);
      setIsSubmitting(false);
      return false;
    }
  };
  
  return (
    <ApplicationFormContext.Provider
      value={{
        formData,
        updateFormData,
        currentStep,
        goToNextStep,
        goToPreviousStep,
        goToStep,
        isStepValid,
        getStepValidationErrors,
        resetForm,
        submitForm,
        isSubmitting,
        submitError
      }}
    >
      {children}
    </ApplicationFormContext.Provider>
  );
};
