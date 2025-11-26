import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PuppyCard from '../PuppyCard';
import { CartProvider } from '../../../context/CartContext';

// Mock puppy data for testing
const mockPuppy: Puppy = {
  id: 'p-001',
  name: 'Bella',
  breed: 'Goldendoodle',
  gender: 'female',
  birthDate: '2023-10-15',
  price: 2500,
  status: 'available',
  images: ['/images/puppies/bella-1.jpg', '/images/puppies/bella-2.jpg'],
  description: 'Bella is a sweet and playful Goldendoodle puppy.',
  color: 'Cream',
  weight: 5.5,
  generation: 'F1',
  parents: {
    mother: '/images/parents/goldendoodle-dam-1.jpg'
  },
  vaccinations: ['DHLPP', 'Rabies'],
  notes: 'Sweet and playful Goldendoodle puppy'
};

// Wrap component with necessary providers
const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <CartProvider>
      {ui}
    </CartProvider>
  );
};

describe('PuppyCard Component', () => {
  test('renders puppy information correctly', () => {
    renderWithProviders(<PuppyCard puppy={mockPuppy} />);
    
    // Check if puppy name is displayed
    expect(screen.getByText('Bella')).toBeInTheDocument();
    
    // Check if breed is displayed
    expect(screen.getByText('Goldendoodle')).toBeInTheDocument();
    
    // Check if price is displayed
    expect(screen.getByText('$2,500')).toBeInTheDocument();
    
    // Check if status is displayed
    expect(screen.getByText('Available')).toBeInTheDocument();
  });
  
  test('displays correct gender icon', () => {
    renderWithProviders(<PuppyCard puppy={mockPuppy} />);
    
    // Check if female icon is present (using aria-label)
    const genderIcon = screen.getByLabelText('Female puppy');
    expect(genderIcon).toBeInTheDocument();
  });
  
  test('clicking on card navigates to puppy detail page', () => {
    renderWithProviders(<PuppyCard puppy={mockPuppy} />);
    
    // Find the link and check if it has the correct href
    const cardLink = screen.getByRole('link');
    expect(cardLink).toHaveAttribute('href', `/puppies/${mockPuppy.id}`);
  });
  
  test('reserve button adds puppy to cart', () => {
    renderWithProviders(<PuppyCard puppy={mockPuppy} />);
    
    // Find and click the reserve button
    const reserveButton = screen.getByText('Reserve');
    fireEvent.click(reserveButton);
    
    // Check if success message appears
    expect(screen.getByText('Added to cart!')).toBeInTheDocument();
  });
});
