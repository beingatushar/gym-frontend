import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import clsx from 'clsx';
import { Product, ProductSortOption } from '../types/product.types';
import { useProductStore } from '../stores/useProductStore';
import Spinner from './common/Spinner';
import { ProductCard } from './ProductCard';
import ProductCardSkeleton from './common/ProductCardSkeleton';

const SORT_OPTIONS: { label: string; value: ProductSortOption | 'default' }[] =
  [
    { value: 'default', label: 'Sort By Default' },
    { value: 'price-low-to-high', label: 'Price: Low to High' },
    { value: 'price-high-to-low', label: 'Price: High to Low' },
    { value: 'date-added-newest', label: 'Newest Arrivals' },
    { value: 'rating-high-to-low', label: 'Top Rated' },
  ];

const PAGE_LIMIT = 12;

const ProductList: React.FC = () => {
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const { fetchAllProducts, getAllCategories } = useProductStore();

  const sortBy = (searchParams.get('sortBy') as ProductSortOption) || 'default';
  const selectedCategories = useMemo(() => {
    const value = searchParams.get('categories');
    return value ? value.split(',') : [];
  }, [searchParams]);

  const observer = useRef<IntersectionObserver | null>(null);
  const loaderRef = useCallback(
    (node: HTMLDivElement) => {
      if (initialLoading || loadingMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [initialLoading, loadingMore, hasMore]
  );

  useEffect(() => {
    getAllCategories().then(setCategories).catch(console.error);
  }, [getAllCategories]);

  const categoriesDep = selectedCategories.join(',');

  useEffect(() => {
    const fetchProducts = async () => {
      if (page === 1) {
        setInitialLoading(true);
      } else {
        setLoadingMore(true);
      }

      try {
        const newProducts = await fetchAllProducts({
          categories:
            selectedCategories.length > 0 ? selectedCategories : undefined,
          sortBy: sortBy !== 'default' ? sortBy : undefined,
          page: page,
          limit: PAGE_LIMIT,
        });

        setProducts((prev) =>
          page === 1 ? newProducts : [...prev, ...newProducts]
        );
        setHasMore(newProducts.length === PAGE_LIMIT);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setInitialLoading(false);
        setLoadingMore(false);
      }
    };

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sortBy, categoriesDep]);

  const handleFilterChange = (key: string, value: string | null) => {
    setSearchParams(
      (params) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
        return params;
      },
      { replace: true }
    );

    setProducts([]);
    setPage(1);
    setHasMore(true);
  };

  const toggleCategory = (category: string) => {
    const newSelected = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    handleFilterChange(
      'categories',
      newSelected.length > 0 ? newSelected.join(',') : null
    );
  };

  const handleSortChange = (value: string) => {
    handleFilterChange('sortBy', value === 'default' ? null : value);
  };

  if (initialLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: PAGE_LIMIT }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => handleFilterChange('categories', null)}
            className={clsx(
              'px-5 py-2 text-sm font-medium rounded-full transition duration-300',
              selectedCategories.length === 0
                ? 'bg-theme-primary text-white shadow-lg'
                : 'bg-gray-100 dark:bg-brand-dark-secondary text-gray-700 dark:text-gray-200 hover:bg-theme-secondary hover:text-black'
            )}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={clsx(
                'px-5 py-2 text-sm font-medium rounded-full transition duration-300 capitalize',
                selectedCategories.includes(category)
                  ? 'bg-theme-primary text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-brand-dark-secondary text-gray-700 dark:text-gray-200 hover:bg-theme-primary hover:dark:bg-theme-primary hover:text-black'
              )}
            >
              {category.replace(/-/g, ' ')}
            </button>
          ))}
        </div>
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="px-4 py-2 w-60 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-theme-primary bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
          aria-label="Sort products"
        >
          {SORT_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            No Products Found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Try adjusting your filters to find what you're looking for.
          </p>
        </div>
      )}

      {/* Loader for infinite scroll */}
      <div ref={loaderRef} className="h-20 flex justify-center items-center">
        {loadingMore && <Spinner size="sm" />}
        {!hasMore && products.length > 0 && (
          <p className="text-gray-500 dark:text-gray-400">
            You've reached the end!
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
