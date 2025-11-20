import clsx from 'clsx';
import React, { useState } from 'react';
import { FaCartPlus, FaEye, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useCartStore from '../stores/useCartStore';
import { Product } from '../types/product.types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { handleAddToCart } = useCartStore();
  const [isHovered, setIsHovered] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleAddToCart(product);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative flex flex-col h-full w-full overflow-hidden rounded-3xl bg-white dark:bg-brand-dark-secondary border border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-theme-primary/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container - Fixed Aspect Ratio */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-50 dark:bg-brand-dark flex-shrink-0">
        <img
          loading="lazy"
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Overlay Gradient (Visible on Hover) */}
        <div
          className={clsx(
            'absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {product.isFeatured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-yellow-400/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-black shadow-lg">
              <FaStar className="text-[10px]" /> Hot
            </span>
          )}
          {(product.stock || 0) < 5 && (product.stock || 0) > 0 && (
            <span className="inline-flex rounded-full bg-red-500/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold uppercase text-white shadow-lg">
              Low Stock
            </span>
          )}
        </div>

        {/* Quick Action Buttons (Slide up on hover) */}
        <div
          className={clsx(
            'absolute bottom-4 left-0 right-0 flex justify-center gap-3 px-4 transition-transform duration-300 ease-out z-20',
            isHovered ? 'translate-y-0' : 'translate-y-20'
          )}
        >
          <button
            onClick={handleQuickAdd}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white text-black px-4 py-3 text-xs font-bold uppercase tracking-wider shadow-xl hover:bg-theme-primary hover:text-white transition-colors"
          >
            <FaCartPlus /> Add
          </button>
          <div className="flex items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white px-4 py-3 text-xs font-bold uppercase shadow-xl hover:bg-white hover:text-black transition-colors">
            <FaEye />
          </div>
        </div>
      </div>

      {/* Info Content - Flex Grow to fill height and align bottom items */}
      <div className="relative p-5 flex flex-col flex-grow">
        {/* Top Row: Category and Rating */}
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-widest text-theme-primary truncate max-w-[60%]">
            {product.category}
          </p>
          <div className="flex items-center gap-1 text-yellow-400 text-xs flex-shrink-0">
            <FaStar />
            <span className="font-bold text-gray-900 dark:text-white">
              {product.rating || 4.8}
            </span>
          </div>
        </div>

        {/* Title Container: Fixed height for 2 lines ensures alignment */}
        <div className="h-12 mb-2">
          <h3
            className="text-lg font-black leading-tight text-gray-900 dark:text-white line-clamp-2 group-hover:text-theme-primary transition-colors"
            title={product.name}
          >
            {product.name}
          </h3>
        </div>

        {/* Price Section: Pushed to bottom with mt-auto */}
        <div className="flex items-baseline gap-2 mt-auto">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            ₹{product.price.toFixed(0)}
          </span>
          <span className="text-xs text-gray-400 line-through decoration-red-500/50">
            ₹{(product.price * 1.2).toFixed(0)}
          </span>
        </div>
      </div>
    </Link>
  );
};
