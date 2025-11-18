import React from 'react';
import { FaCheckCircle, FaShoppingCart, FaStar } from 'react-icons/fa';
import { Product } from '../types/product.types';

interface ProductInformationProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductInformation: React.FC<ProductInformationProps> = ({
  product,
  onAddToCart,
}) => {
  return (
    <div className="flex flex-col pb-24 md:pb-0">
      {' '}
      {/* Added padding-bottom to prevent content being hidden behind sticky bar */}
      <h1 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-gray-100 tracking-tight leading-tight">
        {product.name}
      </h1>
      <div className="flex items-center gap-3 mt-3">
        <p className="text-2xl md:text-3xl font-bold text-theme-primary">
          ₹{product.price.toFixed(0)}
        </p>
        {product.rating && (
          <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-2 py-1 rounded-lg text-xs font-bold">
            <FaStar size={10} />
            <span>{product.rating.toFixed(1)}</span>
          </div>
        )}
      </div>
      <p className="mt-4 text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
        {product.description}
      </p>
      {(product.features?.length || product.material) && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-brand-dark-secondary/50 rounded-xl border border-gray-100 dark:border-gray-800">
          <h3 className="text-sm font-bold text-gray-900 dark:text-gray-200 mb-3 uppercase tracking-wide">
            Product Details
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            {product.features?.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <FaCheckCircle
                  className="text-theme-primary mt-0.5 flex-shrink-0"
                  size={12}
                />
                <span>{feature}</span>
              </li>
            ))}
            {product.material && (
              <li className="flex items-center gap-2">
                <FaCheckCircle
                  className="text-theme-primary flex-shrink-0"
                  size={12}
                />
                <span>Material: {product.material}</span>
              </li>
            )}
          </ul>
        </div>
      )}
      {/* Desktop Button (Hidden on Mobile) */}
      <div className="hidden md:block mt-8">
        <button
          onClick={onAddToCart}
          className="w-full flex justify-center items-center gap-2 bg-theme-primary text-white px-6 py-4 rounded-xl hover:opacity-90 transition-all duration-300 font-bold shadow-lg shadow-theme-primary/20 transform hover:-translate-y-1"
        >
          <FaShoppingCart /> Add to Cart
        </button>
      </div>
      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-brand-dark-secondary border-t border-gray-100 dark:border-gray-800 p-4 md:hidden z-40 flex items-center gap-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
            Total Price
          </span>
          <span className="text-xl font-black text-gray-900 dark:text-white">
            ₹{product.price.toFixed(0)}
          </span>
        </div>
        <button
          onClick={onAddToCart}
          className="flex-1 flex justify-center items-center gap-2 bg-theme-primary text-white px-4 py-3 rounded-xl font-bold shadow-lg active:scale-95 transition-transform"
        >
          <FaShoppingCart size={16} /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductInformation;
