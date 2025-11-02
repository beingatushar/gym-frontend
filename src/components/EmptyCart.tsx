import React from 'react';
import { FaShoppingBag } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const EmptyCart: React.FC = () => (
  <div className="flex flex-col items-center justify-center text-center h-screen pt-16">
    <FaShoppingBag className="text-gray-200 dark:text-gray-700 text-8xl mb-6" />
    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
      Your Cart is Empty
    </h2>
    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm">
      Looks like you haven't added anything to your cart yet. Start exploring
      our collection!
    </p>
    <Link
      to="/shop"
      className="inline-block bg-theme-primary text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition duration-300 shadow-lg"
    >
      Continue Shopping
    </Link>
  </div>
);

export default EmptyCart;
