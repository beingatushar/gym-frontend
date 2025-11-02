import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { FaShoppingCart } from 'react-icons/fa';
import { Product } from '../types/product.types';
import useCartStore from '../stores/useCartStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { handleAddToCart } = useCartStore();

  return (
    <div
      className={clsx(
        'group relative flex flex-col justify-between bg-white dark:bg-brand-dark-secondary rounded-xl shadow-md overflow-hidden',
        'transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2'
      )}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square w-full overflow-hidden">
          <img
            loading="lazy"
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-md font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 flex-grow">
          <Link
            to={`/product/${product.id}`}
            className="hover:text-theme-primary transition-colors"
          >
            {product.name}
          </Link>
        </h3>
        <p className="text-lg text-theme-primary font-bold mt-2">
          ₹{product.price.toFixed(2)}
        </p>

        <div className="mt-4">
          <button
            onClick={() => handleAddToCart(product)}
            aria-label={`Add ${product.name} to cart`}
            className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-theme-primary text-white py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-all duration-300 transform active:scale-95 dark:bg-gray-700 dark:hover:bg-theme-primary"
          >
            <FaShoppingCart />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
