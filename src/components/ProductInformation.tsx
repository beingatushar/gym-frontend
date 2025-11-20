import clsx from 'clsx';
import React from 'react';
import {
  FaBoxOpen,
  FaCheck,
  FaLayerGroup,
  FaRuler,
  FaShoppingCart,
  FaStar,
  FaTag,
} from 'react-icons/fa';
import { Product } from '../types/product.types';

interface ProductInformationProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductInformation: React.FC<ProductInformationProps> = ({
  product,
  onAddToCart,
}) => {
  const isLowStock = (product.stock || 0) > 0 && (product.stock || 0) < 5;
  const isOutOfStock = (product.stock || 0) === 0;

  return (
    <div className="flex flex-col h-full pb-24 md:pb-0">
      {/* Header Section */}
      <div className="space-y-4 mb-6">
        {/* Badges Row */}
        <div className="flex flex-wrap gap-2">
          {product.isFeatured && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 text-[10px] font-bold uppercase tracking-wider rounded-md">
              Featured
            </span>
          )}
          {isOutOfStock ? (
            <span className="px-2 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-[10px] font-bold uppercase tracking-wider rounded-md">
              Out of Stock
            </span>
          ) : isLowStock ? (
            <span className="px-2 py-1 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 text-[10px] font-bold uppercase tracking-wider rounded-md">
              Low Stock: Only {product.stock} left
            </span>
          ) : (
            <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-[10px] font-bold uppercase tracking-wider rounded-md">
              In Stock
            </span>
          )}
          <span className="px-2 py-1 bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 text-[10px] font-bold uppercase tracking-wider rounded-md">
            {product.category}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight">
          {product.name}
        </h1>

        {/* Price & Rating */}
        <div className="flex items-center gap-4">
          <p className="text-3xl font-bold text-theme-primary">
            ₹{product.price.toFixed(0)}
          </p>
          {(product.rating || 0) > 0 && (
            <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-white/5 px-3 py-1.5 rounded-full border border-gray-100 dark:border-gray-700">
              <FaStar className="text-yellow-400" size={14} />
              <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                {product.rating?.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <div className="prose prose-sm dark:prose-invert text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
          <p>{product.description}</p>
        </div>
      )}

      {/* Key Attributes Grid */}
      {(product.size ||
        product.material ||
        (product.stock && product.stock > 0)) && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {product.size && (
            <div className="bg-gray-50 dark:bg-brand-dark-secondary p-3 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center gap-3">
              <div className="p-2 bg-white dark:bg-white/10 rounded-lg text-gray-500 dark:text-gray-300">
                <FaRuler size={14} />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold">
                  Size
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {product.size}
                </p>
              </div>
            </div>
          )}

          {product.material && (
            <div className="bg-gray-50 dark:bg-brand-dark-secondary p-3 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center gap-3">
              <div className="p-2 bg-white dark:bg-white/10 rounded-lg text-gray-500 dark:text-gray-300">
                <FaLayerGroup size={14} />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold">
                  Material
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {product.material}
                </p>
              </div>
            </div>
          )}

          {product.stock && product.stock > 0 && (
            <div className="bg-gray-50 dark:bg-brand-dark-secondary p-3 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center gap-3">
              <div className="p-2 bg-white dark:bg-white/10 rounded-lg text-gray-500 dark:text-gray-300">
                <FaBoxOpen size={14} />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold">
                  Stock
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {product.stock} units
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Features List */}
      {product.features && product.features.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-theme-primary rounded-full"></span>
            Highlights
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
            {product.features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-gray-600 dark:text-gray-300 text-sm"
              >
                <FaCheck
                  className="text-theme-primary mt-0.5 flex-shrink-0"
                  size={12}
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags */}
      {product.tags && product.tags.length > 0 && (
        <div className="mb-8 pt-6 border-t border-gray-100 dark:border-gray-800">
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium hover:bg-theme-secondary hover:text-theme-primary transition-colors cursor-default"
              >
                <FaTag size={10} /> {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Desktop Add to Cart */}
      <div className="hidden md:block mt-auto pt-6">
        <button
          onClick={onAddToCart}
          disabled={isOutOfStock}
          className={clsx(
            'w-full flex justify-center items-center gap-3 px-6 py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1',
            isOutOfStock
              ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-theme-primary text-white hover:opacity-90 shadow-theme-primary/25'
          )}
        >
          <FaShoppingCart />
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>

      {/* Mobile Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-brand-dark-secondary border-t border-gray-100 dark:border-gray-800 p-4 md:hidden z-50 flex items-center gap-4 shadow-2xl pb-safe">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
            Price
          </span>
          <span className="text-xl font-black text-gray-900 dark:text-white">
            ₹{product.price.toFixed(0)}
          </span>
        </div>
        <button
          onClick={onAddToCart}
          disabled={isOutOfStock}
          className={clsx(
            'flex-1 flex justify-center items-center gap-2 px-4 py-3 rounded-xl font-bold shadow-md active:scale-95 transition-transform',
            isOutOfStock
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-400'
              : 'bg-theme-primary text-white'
          )}
        >
          <FaShoppingCart size={16} />
          {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductInformation;
