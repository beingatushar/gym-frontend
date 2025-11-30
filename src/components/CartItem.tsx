import React from 'react';
import { toast } from 'react-hot-toast';
import { FaHeart, FaMinus, FaPlus, FaTrash } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { CartItem as CartItemType } from '../types/product.types';

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onRemove,
  onUpdateQuantity,
}) => {
  const handleSaveForLater = () => {
    onRemove(item.id);
    toast.success(`${item.name} saved for later!`);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-b border-gray-100 dark:border-gray-800 last:border-b-0">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="relative group">
          {/* Image Link */}
          <Link to={`/product/${item.id}`} className="block">
            <img
              loading="lazy"
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex-shrink-0"
            />
          </Link>

          {/* Quick Remove Overlay on Desktop Hover */}
          {/* pointer-events-none allows clicks to pass through to the image link */}
          <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-center justify-center gap-2 pointer-events-none">
            <button
              onClick={(e) => {
                e.preventDefault(); // Prevent link navigation if bubbled
                onRemove(item.id);
              }}
              className="p-2 bg-white rounded-full text-red-500 hover:bg-red-50 transition pointer-events-auto"
              title="Remove"
            >
              <FaTrash size={12} />
            </button>
          </div>
        </div>

        <div className="flex-grow">
          {/* Title Link */}
          <Link to={`/product/${item.id}`}>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 hover:text-theme-primary transition-colors">
              {item.name}
            </h3>
          </Link>
          <p className="text-sm text-theme-primary font-medium mt-1">
            ₹{item.price.toFixed(2)}
          </p>

          <div className="flex items-center gap-3 mt-2 sm:hidden">
            <button
              onClick={() => onRemove(item.id)}
              className="text-xs text-red-500 font-medium flex items-center gap-1"
            >
              <FaTrash size={10} /> Remove
            </button>
            <button
              onClick={handleSaveForLater}
              className="text-xs text-gray-500 font-medium flex items-center gap-1"
            >
              <FaHeart size={10} /> Save
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between w-full sm:w-auto gap-6">
        <div className="flex items-center bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-700 rounded-lg">
          <button
            onClick={() =>
              onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
            }
            className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 rounded-l-lg transition-colors"
          >
            <FaMinus size={10} />
          </button>
          <span className="w-10 text-center text-sm font-bold text-gray-900 dark:text-white">
            {item.quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 rounded-r-lg transition-colors"
          >
            <FaPlus size={10} />
          </button>
        </div>

        <div className="text-right">
          <p className="font-bold text-gray-900 dark:text-white text-lg">
            ₹{(item.price * item.quantity).toFixed(2)}
          </p>

          <button
            onClick={handleSaveForLater}
            className="hidden sm:inline-flex items-center gap-1 text-xs text-gray-400 hover:text-theme-primary mt-1 transition-colors"
          >
            <FaHeart size={10} /> Save for later
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
