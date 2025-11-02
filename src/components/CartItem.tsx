import React from 'react';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa6';
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
}) => (
  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
    <div className="flex items-center gap-4 w-full sm:w-auto">
      <img
        loading="lazy"
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
      />
      <div className="flex-grow">
        <h3 className="text-md font-semibold text-gray-800 dark:text-gray-100 line-clamp-2">
          {item.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Price: ₹{item.price.toFixed(2)}
        </p>
        <button
          onClick={() => onRemove(item.id)}
          className="text-xs text-red-500 hover:text-red-700 transition duration-300 mt-1 flex items-center gap-1 sm:hidden"
          aria-label={`Remove ${item.name} from cart`}
        >
          <FaTrash size={12} /> Remove
        </button>
      </div>
    </div>
    <div className="flex items-center justify-between w-full sm:w-auto">
      <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-md">
        <button
          onClick={() =>
            onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
          }
          className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-theme-secondary dark:hover:bg-white/10 rounded-l-md transition-colors"
          aria-label="Decrease quantity"
        >
          <FaMinus size={12} />
        </button>
        <span className="px-3 text-center w-12 font-medium text-gray-800 dark:text-gray-100">
          {item.quantity}
        </span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-theme-secondary dark:hover:bg-white/10 rounded-r-md transition-colors"
          aria-label="Increase quantity"
        >
          <FaPlus size={12} />
        </button>
      </div>
      <p className="font-semibold text-gray-800 dark:text-gray-100 sm:min-w-[80px] sm:text-right">
        ₹{(item.price * item.quantity).toFixed(2)}
      </p>
      <button
        onClick={() => onRemove(item.id)}
        className="text-red-500 hover:text-red-700 transition duration-300 ml-4 hidden sm:block"
        aria-label={`Remove ${item.name} from cart`}
      >
        <FaTrash size={16} />
      </button>
    </div>
  </div>
);

export default CartItem;
