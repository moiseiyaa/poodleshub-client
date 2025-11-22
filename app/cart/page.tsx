'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaTrash, FaShoppingCart, FaArrowLeft, FaCheckCircle, FaShieldAlt } from 'react-icons/fa';
import Container from '../components/organisms/Container';
import { useCart } from '../context/CartContext';

/**
 * Cart page component
 * Displays reserved puppies and checkout flow
 */
const CartPage = () => {
  const router = useRouter();
  const { items, removeFromCart } = useCart();

  const subtotal = items.reduce((sum, item) => sum + item.puppy.price, 0);
  const depositAmount = 300; // $300 deposit per puppy
  const totalDeposit = items.length * depositAmount;
  const processingFee = totalDeposit * 0.09; // 9% processing fee
  const totalDue = totalDeposit + processingFee;

  const handleRemove = (puppyId: string) => {
    if (confirm('Are you sure you want to remove this puppy from your cart?')) {
      removeFromCart(puppyId);
    }
  };

  const handleCheckout = () => {
    router.push('/application');
  };

  if (items.length === 0) {
    return (
      <Container>
        <div className="py-16 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
            <FaShoppingCart className="h-10 w-10 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-lg text-gray-700 mb-8">
            You haven't reserved any puppies yet. Browse our available puppies to get started!
          </p>
          <Link
            href="/puppies"
            className="inline-flex items-center bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-full transition-colors"
          >
            Browse Available Puppies
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <div className="py-8 md:py-12 bg-gray-50">
      <Container>
        <Link 
          href="/puppies" 
          className="inline-flex items-center text-gray-700 hover:text-primary mb-6 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          Continue Shopping
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Reservations</h1>
            
            <div className="space-y-4">
              {items.map((item) => (
                <div 
                  key={item.puppy.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
                    <div className="relative h-48 md:h-full rounded-lg overflow-hidden">
                      <Image
                        src={item.puppy.images[0] || '/images/placeholder-puppy.jpg'}
                        alt={`${item.puppy.name} - ${item.puppy.breed}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            <Link 
                              href={`/puppies/${item.puppy.id}`}
                              className="hover:text-primary transition-colors"
                            >
                              {item.puppy.name}
                            </Link>
                          </h3>
                          <p className="text-gray-600 mb-2">{item.puppy.breed}</p>
                          <p className="text-sm text-gray-500">
                            Added {new Date(item.addedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemove(item.puppy.id)}
                          className="text-red-500 hover:text-red-700 transition-colors p-2"
                          aria-label="Remove from cart"
                        >
                          <FaTrash className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Adoption Fee:</span>
                          <span className="text-xl font-bold text-gray-900">
                            ${item.puppy.price.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-gray-700">Deposit Required:</span>
                          <span className="text-lg font-semibold text-primary">
                            $300
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Important Notice */}
            <div className="mt-6 bg-blue-50 border border-blue-200 p-6 rounded-xl">
              <div className="flex items-start">
                <FaShieldAlt className="h-6 w-6 text-primary mt-1 mr-3 shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Deposit Information</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    Your $300 deposit per puppy is refundable (minus a 9% processing fee) for up to 2 years 
                    from your deposit date if you haven't selected a specific puppy yet.
                  </p>
                  <p className="text-gray-700 text-sm">
                    Once you reserve a specific puppy, your deposit becomes non-refundable and will be applied 
                    to the balance of that puppy on Adoption Day.
                  </p>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="mt-6 bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Next Steps</h3>
              <ol className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">
                    1
                  </span>
                  <span>Complete your application if you haven't already</span>
                </li>
                <li className="flex items-start">
                  <span className="shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">
                    2
                  </span>
                  <span>Wait for application approval (4-5 business days)</span>
                </li>
                <li className="flex items-start">
                  <span className="shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">
                    3
                  </span>
                  <span>Receive litter announcements and choose your puppy</span>
                </li>
              </ol>
              <Link
                href="/application"
                className="block mt-4 text-center text-primary hover:text-primary/80 font-medium"
              >
                Complete Application →
              </Link>
            </div>
          </div>

          {/* Order Summary - Sticky Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Reservation Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Puppies Reserved:</span>
                  <span className="font-semibold">{items.length}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Total Adoption Fees:</span>
                  <span className="font-semibold">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Deposit per Puppy:</span>
                  <span className="font-semibold">${depositAmount}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Total Deposit:</span>
                  <span className="font-semibold">${totalDeposit}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Processing Fee (9%):</span>
                  <span>${processingFee.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total Due Today:</span>
                    <span className="text-primary">${totalDue.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-4 px-6 rounded-lg transition-colors"
              >
                Proceed to Application
              </button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                By proceeding, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;

