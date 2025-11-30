import confetti from 'canvas-confetti';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaArrowRight, FaShieldAlt, FaTag } from 'react-icons/fa';

interface OrderSummaryProps {
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  onCheckout: () => void;
  disabled?: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  shippingCost,
  tax,
  total,
  onCheckout,
  disabled,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [isApplied, setIsApplied] = useState(false);

  // Mock Promo Logic
  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;
    if (promoCode.toUpperCase() === 'SHELLY10') {
      setIsApplied(true);
      toast.success('Promo code applied! (Mock)');
    } else {
      toast.error('Invalid promo code');
    }
  };

  const handleCheckoutClick = () => {
    if (disabled) return;

    // Fire Confetti!
    const end = Date.now() + 1000;
    const colors = ['#f59e0b', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    onCheckout();
  };

  // Calculate Savings (Free Shipping + Mock Promo)
  const savings =
    (shippingCost === 0 ? 50 : 0) + (isApplied ? subtotal * 0.1 : 0);

  return (
    <div className="sticky top-24 transition-all duration-300">
      {/* Glass Card */}
      <div className="bg-white/80 dark:bg-brand-dark/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-2xl">
        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
          Order Summary
        </h2>

        {/* Promo Code Input */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            Promo Code
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter code (Try SHELLY10)"
              className="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-theme-primary dark:text-white"
              disabled={isApplied}
            />
            <button
              onClick={handleApplyPromo}
              disabled={isApplied || !promoCode}
              className="bg-gray-900 dark:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 disabled:opacity-50 transition-colors"
            >
              {isApplied ? 'Applied' : 'Apply'}
            </button>
          </div>
          {isApplied && (
            <p className="text-green-500 text-xs mt-2 font-medium flex items-center gap-1">
              <FaTag /> 10% Discount Applied!
            </p>
          )}
        </div>

        {/* Calculations */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-gray-600 dark:text-gray-300">
            <span>Subtotal</span>
            <span className="font-medium">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600 dark:text-gray-300">
            <span>Shipping</span>
            <span
              className={
                shippingCost === 0 ? 'text-green-500 font-bold' : 'font-medium'
              }
            >
              {shippingCost === 0 ? 'FREE' : `₹${shippingCost.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between text-gray-600 dark:text-gray-300">
            <span>Tax (5%)</span>
            <span className="font-medium">₹{tax.toFixed(2)}</span>
          </div>

          {isApplied && (
            <div className="flex justify-between text-green-500 font-medium">
              <span>Discount</span>
              <span>-₹{(subtotal * 0.1).toFixed(2)}</span>
            </div>
          )}

          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent my-4" />

          {/* Total */}
          <div className="flex justify-between items-end">
            <span className="text-lg font-bold text-gray-800 dark:text-gray-200">
              Total
            </span>
            <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-theme-primary to-orange-600">
              ₹{(total - (isApplied ? subtotal * 0.1 : 0)).toFixed(2)}
            </span>
          </div>

          {/* Savings Callout */}
          {savings > 0 && (
            <div className="mt-2 text-right">
              <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold px-2 py-1 rounded-md">
                You saved ₹{savings.toFixed(0)} on this order!
              </span>
            </div>
          )}
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-white/5 p-3 rounded-xl text-xs text-gray-500 dark:text-gray-400 text-center">
            <FaShieldAlt className="mb-1 text-theme-primary" size={16} />
            Secure Payment
          </div>
          <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-white/5 p-3 rounded-xl text-xs text-gray-500 dark:text-gray-400 text-center">
            <FaTruckFast className="mb-1 text-theme-primary" size={16} />
            Fast Delivery
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleCheckoutClick}
          disabled={disabled}
          className="group relative w-full flex justify-center items-center gap-3 bg-theme-primary text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-theme-primary/30 hover:shadow-theme-primary/50 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            Proceed to Checkout{' '}
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </span>
          {/* Button Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-shimmer" />
        </button>
      </div>
    </div>
  );
};

// Helper icon component if not imported
const FaTruckFast = ({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 640 512"
    height={size}
    width={size}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H112C85.5 0 64 21.5 64 48v48H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h272c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H40c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H64v128c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"></path>
  </svg>
);

export default OrderSummary;
