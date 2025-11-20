import React from 'react';
import { FaArrowRight, FaShoppingBag } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const EmptyCart: React.FC = () => (
  <div className="flex min-h-[70vh] flex-col items-center justify-center text-center px-4">
    {/* Animated Icon Container */}
    <div className="relative mb-8">
      <div className="absolute inset-0 animate-ping rounded-full bg-theme-primary/20" />
      <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gray-50 dark:bg-brand-dark-secondary shadow-xl border border-gray-100 dark:border-gray-800">
        <FaShoppingBag className="text-4xl text-gray-300 dark:text-gray-600" />
        {/* Floating Question Mark */}
        <span className="absolute top-6 right-8 text-2xl font-bold text-theme-primary animate-bounce">
          ?
        </span>
      </div>
    </div>

    <h2 className="mb-3 text-3xl font-black text-gray-900 dark:text-white">
      Your cart is feeling light
    </h2>
    <p className="mb-8 max-w-md text-gray-500 dark:text-gray-400">
      Looks like you haven't made your choice yet. The best supplements in
      Faridabad are waiting for you.
    </p>

    <Link
      to="/shop"
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-theme-primary px-8 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
    >
      <span className="relative z-10 flex items-center gap-2">
        Start Shopping{' '}
        <FaArrowRight className="transition-transform group-hover:translate-x-1" />
      </span>
      <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform group-hover:translate-x-0" />
    </Link>
  </div>
);

export default EmptyCart;
