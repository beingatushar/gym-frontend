import React from 'react';
import { FaShoppingCart, FaStar, FaCheckCircle } from 'react-icons/fa';
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
    <div className="flex flex-col">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
        {product.name}
      </h1>

      <div className="flex items-center gap-4 mt-4">
        <p className="text-3xl font-bold text-theme-primary">
          ₹{product.price.toFixed(2)}
        </p>
        {product.rating && (
          <div className="flex items-center gap-1 bg-theme-secondary text-theme-primary px-3 py-1 rounded-full text-sm font-semibold">
            <FaStar />
            <span>{product.rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      <p className="mt-6 text-gray-600 dark:text-gray-300 leading-relaxed">
        {product.description}
      </p>

      {(product.features?.length || product.material) && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Details
          </h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            {product.features?.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <FaCheckCircle className="text-theme-primary" />
                <span>{feature}</span>
              </li>
            ))}
            {product.material && (
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-theme-primary" />
                <span>Material: {product.material}</span>
              </li>
            )}
          </ul>
        </div>
      )}

      <div className="mt-auto pt-8">
        <button
          onClick={onAddToCart}
          className="w-full flex justify-center items-center gap-3 bg-theme-primary text-white px-6 py-4 rounded-lg hover:opacity-90 transition-all duration-300 font-semibold shadow-lg transform hover:scale-105"
        >
          <FaShoppingCart /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductInformation;
