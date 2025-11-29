'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Puppy } from '../lib/api/puppies';

interface CartItem {
  puppy: Puppy;
  addedAt: Date;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (puppy: Puppy) => void;
  removeFromCart: (puppyId: string) => void;
  clearCart: () => void;
  isInCart: (puppyId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('puppyhub-cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        
        // Clear cached cart if it contains old test puppy IDs
        const hasTestPuppies = parsedCart.some((item: any) => 
          item.puppy.id && item.puppy.id.startsWith('p-')
        );
        
        if (hasTestPuppies) {
          console.log('🧹 Clearing cached cart with old test puppy IDs');
          localStorage.removeItem('puppyhub-cart');
          return;
        }
        
        // Convert string dates back to Date objects
        const cartWithDates = parsedCart.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        }));
        setItems(cartWithDates);
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('puppyhub-cart', JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [items]);

  const addToCart = (puppy: Puppy) => {
    if (!isInCart(puppy.id)) {
      setItems([...items, { puppy, addedAt: new Date() }]);
    }
  };

  const removeFromCart = (puppyId: string) => {
    setItems(items.filter(item => item.puppy.id !== puppyId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const isInCart = (puppyId: string) => {
    return items.some(item => item.puppy.id === puppyId);
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
};
