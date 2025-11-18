import clsx from 'clsx';
import {
  FaCartPlus,
  FaEye,
  FaMinus,
  FaPlus,
  FaShoppingBag,
  FaStar,
  FaTrash,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useCartStore from '../stores/useCartStore';
import { Product } from '../types/product.types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { handleAddToCart, updateQuantity, removeFromCart, cart } =
    useCartStore();

  // Check if item is already in cart to show quantity
  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    handleAddToCart(product);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };

  return (
    <div
      className={clsx(
        'group relative flex flex-col bg-white dark:bg-brand-dark-secondary rounded-xl',
        'transition-all duration-300 shadow-sm hover:shadow-md',
        'border border-gray-100 dark:border-gray-800'
      )}
    >
      {/* Image Container */}
      <Link
        to={`/product/${product.id}`}
        className="block relative overflow-hidden rounded-t-xl aspect-square"
      >
        {/* Top Left: Rating Badge */}
        {product.rating && product.rating > 4.5 && (
          <span className="absolute top-2 left-2 z-10 bg-white/90 dark:bg-black/80 backdrop-blur text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm flex items-center gap-1">
            <FaStar className="text-yellow-400" size={8} /> Top
          </span>
        )}

        {/* Top Right: Interactive Cart Control */}
        <div className="absolute top-2 right-2 z-20">
          {quantity > 0 ? (
            // Active State: Counter with +/-
            <div className="flex items-center bg-theme-primary text-white rounded-full shadow-lg animate-fade-in-up ring-2 ring-white dark:ring-brand-dark">
              {/* Minus / Remove Button */}
              <button
                onClick={handleDecrement}
                className="w-8 h-8 flex items-center justify-center hover:bg-black/10 rounded-l-full transition-colors active:bg-black/20"
                aria-label="Decrease quantity"
              >
                {quantity === 1 ? <FaTrash size={10} /> : <FaMinus size={10} />}
              </button>

              {/* Center: Number inside Cart Icon */}
              <div className="relative flex items-center justify-center w-8 h-8 bg-white/10 border-x border-white/10">
                <FaShoppingBag size={18} className="text-white" />{' '}
                {/* Explicitly White */}
                <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black pt-1 text-theme-primary">
                  {quantity}
                </span>
              </div>

              {/* Plus Button */}
              <button
                onClick={handleIncrement}
                className="w-8 h-8 flex items-center justify-center hover:bg-black/10 rounded-r-full transition-colors active:bg-black/20"
                aria-label="Increase quantity"
              >
                <FaPlus size={10} />
              </button>
            </div>
          ) : (
            // Inactive State: Simple Add Button
            <button
              onClick={handleIncrement}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/90 dark:bg-black/60 text-gray-700 dark:text-white hover:bg-theme-primary hover:text-white backdrop-blur-sm transition-all shadow-md active:scale-90"
              aria-label="Add to cart"
            >
              <FaCartPlus size={16} />
            </button>
          )}
        </div>

        <img
          loading="lazy"
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </Link>

      {/* Dense Content for Mobile */}
      <div className="p-3 flex flex-col flex-grow">
        <div className="flex-grow space-y-1">
          <p className="text-[10px] font-bold text-theme-primary uppercase tracking-wide opacity-80">
            {product.category}
          </p>
          <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug line-clamp-2">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h3>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-50 dark:border-gray-700/50 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 line-through">
              ₹{(product.price * 1.2).toFixed(0)}
            </span>
            <span className="text-base font-black text-gray-900 dark:text-white">
              ₹{product.price.toFixed(0)}
            </span>
          </div>

          {/* Bottom Right: View Button (Text) */}
          <Link
            to={`/product/${product.id}`}
            className="text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-theme-primary flex items-center gap-1 transition-colors px-2 py-1 rounded-md hover:bg-gray-50 dark:hover:bg-white/5"
          >
            <FaEye size={12} />
            View
          </Link>
        </div>
      </div>
    </div>
  );
};
