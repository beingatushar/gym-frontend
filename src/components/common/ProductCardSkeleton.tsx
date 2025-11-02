import React from 'react';

const ProductCardSkeleton: React.FC = () => (
  <div className="animate-pulse">
    <div className="aspect-square w-full bg-gray-200 dark:bg-gray-700 rounded-xl" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg mt-2" />
    </div>
  </div>
);

export default ProductCardSkeleton;
