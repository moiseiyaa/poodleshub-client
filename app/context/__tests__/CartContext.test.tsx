import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { CartProvider, useCart } from '../CartContext';

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

// Mock puppy data for testing
const mockPuppy: Puppy = {
  id: 'p-001',
  name: 'Bella',
  breed: 'Goldendoodle',
  gender: 'female',
  birthDate: '2023-10-15',
  price: 2500,
  status: 'available',
  images: ['/images/puppies/bella-1.jpg'],
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

// Test component that uses the cart context
const TestComponent = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  
  return (
    <div>
      <div data-testid="cart-count">{cart.length}</div>
      <button onClick={() => addToCart(mockPuppy)}>Add to Cart</button>
      <button onClick={() => removeFromCart(mockPuppy.id)}>Remove from Cart</button>
      <button onClick={clearCart}>Clear Cart</button>
      {cart.map(item => (
        <div key={item.id} data-testid="cart-item">
          {item.name}
        </div>
      ))}
    </div>
  );
};

describe('CartContext', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });
  
  test('provides empty cart by default', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
  });
  
  test('adds item to cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    fireEvent.click(screen.getByText('Add to Cart'));
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    expect(screen.getByTestId('cart-item')).toHaveTextContent('Bella');
  });
  
  test('removes item from cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    fireEvent.click(screen.getByText('Add to Cart'));
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    
    fireEvent.click(screen.getByText('Remove from Cart'));
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
  });
  
  test('clears cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    fireEvent.click(screen.getByText('Add to Cart'));
    fireEvent.click(screen.getByText('Add to Cart')); // Try to add the same puppy twice
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1'); // Should still be 1 (no duplicates)
    
    fireEvent.click(screen.getByText('Clear Cart'));
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
  });
  
  test('persists cart to localStorage', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    fireEvent.click(screen.getByText('Add to Cart'));
    
    expect(localStorageMock.setItem).toHaveBeenCalled();
    expect(JSON.parse(localStorageMock.setItem.mock.calls[0][1])).toEqual([mockPuppy]);
  });
  
  test('loads cart from localStorage', () => {
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify([mockPuppy]));
    
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    expect(screen.getByTestId('cart-item')).toHaveTextContent('Bella');
  });
});
