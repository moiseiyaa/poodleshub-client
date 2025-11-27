import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { ApplicationFormProvider, useApplicationForm } from '../ApplicationFormContext';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Test component that uses the application form context
const TestComponent = () => {
  const { 
    formData, 
    updateFormData, 
    currentStep, 
    goToNextStep, 
    goToPreviousStep, 
    goToStep,
    isStepValid,
    resetForm,
    submitForm,
    isSubmitting
  } = useApplicationForm();
  
  return (
    <div>
      <div data-testid="current-step">{currentStep}</div>
      <div data-testid="form-data">{JSON.stringify(formData)}</div>
      <div data-testid="is-valid">{isStepValid(currentStep) ? 'valid' : 'invalid'}</div>
      <div data-testid="is-submitting">{isSubmitting ? 'submitting' : 'not-submitting'}</div>
      
      <button onClick={goToNextStep}>Next Step</button>
      <button onClick={goToPreviousStep}>Previous Step</button>
      <button onClick={() => goToStep(1)}>Go to Step 1</button>
      <button onClick={() => updateFormData({ firstName: 'John', lastName: 'Doe' })}>
        Update Name
      </button>
      <button onClick={resetForm}>Reset Form</button>
      <button onClick={() => submitForm()}>Submit Form</button>
    </div>
  );
};

describe('ApplicationFormContext', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });
  
  test('provides initial form data and step', () => {
    render(
      <ApplicationFormProvider>
        <TestComponent />
      </ApplicationFormProvider>
    );
    
    expect(screen.getByTestId('current-step')).toHaveTextContent('1');
    expect(screen.getByTestId('is-valid')).toHaveTextContent('invalid'); // Initially invalid
  });
  
  test('updates form data correctly', () => {
    render(
      <ApplicationFormProvider>
        <TestComponent />
      </ApplicationFormProvider>
    );
    
    fireEvent.click(screen.getByText('Update Name'));
    
    const formDataElement = screen.getByTestId('form-data');
    expect(formDataElement.textContent).toContain('"firstName":"John"');
    expect(formDataElement.textContent).toContain('"lastName":"Doe"');
  });
  
  test('navigates between steps', () => {
    render(
      <ApplicationFormProvider>
        <TestComponent />
      </ApplicationFormProvider>
    );
    
    // Fill required fields for step 1
    fireEvent.click(screen.getByText('Update Name'));
    
    // Add more required fields for step 1
    act(() => {
      const formData = {
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
        mobileNumber: '555-123-4567',
        email: 'john@example.com',
        confirmEmail: 'john@example.com'
      };
      
      // @ts-ignore - Accessing private method for testing
      screen.getByText('Update Name').onclick = () => {
        const { updateFormData } = useApplicationForm();
        updateFormData(formData);
      };
    });
    
    fireEvent.click(screen.getByText('Update Name'));
    expect(screen.getByTestId('is-valid')).toHaveTextContent('valid');
    
    // Go to next step
    fireEvent.click(screen.getByText('Next Step'));
    expect(screen.getByTestId('current-step')).toHaveTextContent('2');
    
    // Go back to previous step
    fireEvent.click(screen.getByText('Previous Step'));
    expect(screen.getByTestId('current-step')).toHaveTextContent('1');
    
    // Go directly to a specific step
    fireEvent.click(screen.getByText('Go to Step 1'));
    expect(screen.getByTestId('current-step')).toHaveTextContent('1');
  });
  
  test('resets form data', () => {
    render(
      <ApplicationFormProvider>
        <TestComponent />
      </ApplicationFormProvider>
    );
    
    // Update form data
    fireEvent.click(screen.getByText('Update Name'));
    expect(screen.getByTestId('form-data').textContent).toContain('"firstName":"John"');
    
    // Reset form
    fireEvent.click(screen.getByText('Reset Form'));
    expect(screen.getByTestId('form-data').textContent).not.toContain('"firstName":"John"');
  });
  
  test('persists form data to localStorage', () => {
    render(
      <ApplicationFormProvider>
        <TestComponent />
      </ApplicationFormProvider>
    );
    
    fireEvent.click(screen.getByText('Update Name'));
    
    expect(localStorageMock.setItem).toHaveBeenCalled();
    expect(localStorageMock.setItem.mock.calls[0][0]).toBe('puppyhub-application-form');
    expect(JSON.parse(localStorageMock.setItem.mock.calls[0][1])).toHaveProperty('firstName', 'John');
  });
  
  test('loads form data from localStorage', () => {
    // Setup localStorage with form data
    const savedFormData = {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com'
    };
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(savedFormData));
    
    render(
      <ApplicationFormProvider>
        <TestComponent />
      </ApplicationFormProvider>
    );
    
    expect(screen.getByTestId('form-data').textContent).toContain('"firstName":"Jane"');
    expect(screen.getByTestId('form-data').textContent).toContain('"lastName":"Smith"');
  });
  
  test('handles form submission', async () => {
    render(
      <ApplicationFormProvider>
        <TestComponent />
      </ApplicationFormProvider>
    );
    
    // Add required form data for all steps
    act(() => {
      const formData = {
        // Step 1
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
        mobileNumber: '555-123-4567',
        email: 'john@example.com',
        confirmEmail: 'john@example.com',
        
        // Step 2
        breedChoices: [{ priority: 1, breed: 'goldendoodle' }],
        preferredSizes: ['mini'],
        preferredGender: 'male',
        activityLevel: 'moderate',
        pickupLocation: 'denver',
        deliveryMethod: 'pickup',
        
        // Step 3
        otherPets: false,
        allergies: 'no-allergies',
        hasChildren: false,
        hasFence: true,
        lifestyle: 'active',
        typicalDay: 'Morning walks, afternoon play time, evening cuddles',
        whyGoodFit: 'We have a large yard and work from home',
        firstDog: false,
        previousPuppies: 0,
        interestedInTraining: true,
        
        // Step 4
        spayNeuterAgreement: true,
      };
      
      // @ts-ignore - Accessing private method for testing
      screen.getByText('Update Name').onclick = () => {
        const { updateFormData } = useApplicationForm();
        updateFormData(formData);
      };
    });
    
    fireEvent.click(screen.getByText('Update Name'));
    
    // Go to step 4
    fireEvent.click(screen.getByText('Go to Step 1'));
    fireEvent.click(screen.getByText('Next Step')); // Step 2
    fireEvent.click(screen.getByText('Next Step')); // Step 3
    fireEvent.click(screen.getByText('Next Step')); // Step 4
    
    expect(screen.getByTestId('current-step')).toHaveTextContent('4');
    expect(screen.getByTestId('is-valid')).toHaveTextContent('valid');
    
    // Submit form
    fireEvent.click(screen.getByText('Submit Form'));
    
    // Check that submission is in progress
    expect(screen.getByTestId('is-submitting')).toHaveTextContent('submitting');
    
    // Wait for submission to complete
    await waitFor(() => {
      expect(screen.getByTestId('is-submitting')).toHaveTextContent('not-submitting');
    });
    
    // Form should be reset after successful submission
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('puppyhub-application-form');
  });
});
