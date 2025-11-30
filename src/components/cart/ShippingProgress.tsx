import React from 'react';
import { FaTruckFast } from 'react-icons/fa6';

interface ShippingProgressProps {
  subtotal: number;
  threshold?: number; // Amount needed for free shipping (default 500)
}

const ShippingProgress: React.FC<ShippingProgressProps> = ({
  subtotal,
  threshold = 500,
}) => {
  const progress = Math.min((subtotal / threshold) * 100, 100);
  const remaining = Math.max(threshold - subtotal, 0);
  const isFree = subtotal >= threshold;

  return (
    <div className="mb-8 bg-white dark:bg-brand-dark-secondary border border-gray-100 dark:border-gray-800 p-5 rounded-2xl shadow-sm relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative z-10">
        <div className="flex justify-between items-end mb-2">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              {isFree ? (
                <>
                  🎉 You've unlocked{' '}
                  <span className="text-green-500">Free Shipping!</span>
                </>
              ) : (
                <>
                  Add{' '}
                  <span className="text-theme-primary">
                    ₹{remaining.toFixed(0)}
                  </span>{' '}
                  for Free Shipping
                </>
              )}
            </h3>
          </div>
          <div className="text-2xl text-gray-300 dark:text-gray-600">
            <FaTruckFast />
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="h-3 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-theme-primary to-orange-400 transition-all duration-1000 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            {/* Shimmer Effect */}
            <div
              className="absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
              style={{ backgroundSize: '200% 100%' }}
            />
          </div>
        </div>

        <div className="mt-2 flex justify-between text-xs font-medium text-gray-400">
          <span>₹0</span>
          <span>₹{threshold}</span>
        </div>
      </div>
    </div>
  );
};

export default ShippingProgress;
