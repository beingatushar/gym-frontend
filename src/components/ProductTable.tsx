import clsx from 'clsx';
import React from 'react';
import { FaEdit, FaStar, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Product } from '../types/product.types';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onToggleFeatured: (product: Product) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onEdit,
  onDelete,
  onToggleFeatured,
}) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No products found in inventory.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
          <tr>
            <th className="px-4 py-3 w-16">Image</th>
            <th className="px-4 py-3">Product Name & Description</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3 text-center">Stock</th>
            <th className="px-4 py-3 text-center">Featured</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
          {products.map((product) => (
            <tr
              key={product.id}
              className="bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
            >
              <td className="px-4 py-3">
                <img
                  loading="lazy"
                  src={product.image || 'https://via.placeholder.com/40'}
                  alt={product.name}
                  className="w-10 h-10 object-cover rounded-md border border-gray-200 dark:border-gray-700"
                />
              </td>
              <td className="px-4 py-3 max-w-xs">
                <div className="font-bold text-gray-900 dark:text-white line-clamp-1">
                  {product.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-1">
                  {product.description}
                </div>
              </td>
              <td className="px-4 py-3">
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 py-1 px-2 rounded text-xs font-medium">
                  {product.category}
                </span>
              </td>
              <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                ₹{product.price}
              </td>
              <td className="px-4 py-3 text-center">
                <span
                  className={clsx(
                    'py-1 px-2 rounded text-xs font-bold',
                    (product.stock || 0) > 5
                      ? 'text-green-600 bg-green-50 dark:bg-green-900/20'
                      : 'text-red-600 bg-red-50 dark:bg-red-900/20'
                  )}
                >
                  {product.stock || 0}
                </span>
              </td>
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => onToggleFeatured(product)}
                  className={clsx(
                    'p-2 rounded-full transition-all active:scale-90',
                    product.isFeatured
                      ? 'text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                      : 'text-gray-300 hover:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  )}
                  title="Toggle Featured Status"
                >
                  <FaStar size={16} />
                </button>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    to={`/product/${product.id}`}
                    className="p-2 text-gray-400 hover:text-theme-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    title="View on Site"
                  >
                    <FaEdit size={14} className="opacity-50" />{' '}
                    {/* Using as view icon placeholder */}
                  </Link>
                  <button
                    onClick={() => onEdit(product)}
                    className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <FaEdit size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
