import clsx from 'clsx';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FaFilter, FaSearch, FaSortAmountDown } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import { useProductStore } from '../stores/useProductStore';
import { Product, ProductSortOption } from '../types/product.types';
import Spinner from './common/Spinner';
import { ProductCard } from './ProductCard';

const SORT_OPTIONS: { label: string; value: ProductSortOption | 'default' }[] =
  [
    { value: 'default', label: 'Recommended' },
    { value: 'price-low-to-high', label: 'Price: Low to High' },
    { value: 'price-high-to-low', label: 'Price: High to Low' },
    { value: 'date-added-newest', label: 'Newest Arrivals' },
    { value: 'rating-high-to-low', label: 'Top Rated' },
  ];

const PAGE_LIMIT = 12;

const ProductList: React.FC = () => {
  // State
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isFilterSticky, setIsFilterSticky] = useState(false);

  // Hooks
  const [searchParams, setSearchParams] = useSearchParams();
  const { fetchAllProducts, getAllCategories } = useProductStore();

  // Derived State
  const sortBy = (searchParams.get('sortBy') as ProductSortOption) || 'default';
  const selectedCategories = useMemo(() => {
    const value = searchParams.get('categories');
    return value ? value.split(',') : [];
  }, [searchParams]);

  // Observers
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

  // Scroll Listener for Sticky Header Effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsFilterSticky(offset > 400); // Adjust based on Hero height
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initial Data Fetch
  useEffect(() => {
    getAllCategories().then(setCategories).catch(console.error);
  }, [getAllCategories]);

  // Product Fetching Logic
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
  }, [page, sortBy, categoriesDep, fetchAllProducts]);

  // Handlers
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
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on filter change
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

  // --- Render ---

  return (
    <div className="min-h-[600px]">
      {/* === FLOATING FILTER COMMAND CENTER === 
        This bar becomes sticky and gains a glass effect as you scroll.
      */}
      <div
        className={clsx(
          'sticky top-20 z-30 transition-all duration-500 ease-in-out mb-10',
          isFilterSticky ? 'translate-y-2 scale-95' : 'translate-y-0 scale-100'
        )}
      >
        <div
          className={clsx(
            'mx-auto max-w-6xl rounded-2xl p-3 transition-all duration-300',
            isFilterSticky
              ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50'
              : 'bg-white dark:bg-brand-dark-secondary shadow-lg border border-gray-100 dark:border-gray-800'
          )}
        >
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Categories Scroll Area */}
            <div className="flex-1 w-full overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              <div className="flex gap-2 items-center">
                <div className="text-gray-400 dark:text-gray-500 px-2">
                  <FaFilter size={14} />
                </div>

                <button
                  onClick={() => handleFilterChange('categories', null)}
                  className={clsx(
                    'whitespace-nowrap px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95',
                    selectedCategories.length === 0
                      ? 'bg-theme-primary text-white shadow-lg shadow-theme-primary/30'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  )}
                >
                  All Items
                </button>

                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={clsx(
                      'whitespace-nowrap px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95',
                      selectedCategories.includes(category)
                        ? 'bg-theme-primary text-white shadow-lg shadow-theme-primary/30'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    )}
                  >
                    {category.replace(/-/g, ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="relative flex-shrink-0 w-full md:w-auto group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <FaSortAmountDown size={12} />
              </div>
              <select
                value={sortBy}
                onChange={(e) =>
                  handleFilterChange(
                    'sortBy',
                    e.target.value === 'default' ? null : e.target.value
                  )
                }
                className="w-full md:w-56 pl-9 pr-8 py-2.5 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-theme-primary focus:border-transparent outline-none appearance-none cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              >
                {SORT_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* === PRODUCT GRID ===
       */}
      {initialLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl aspect-[4/5] mb-4" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }} // Staggered animation
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        // Empty State
        <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 text-gray-400">
            <FaSearch size={40} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            No products found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            We couldn't find any matches for your filters. Try selecting a
            different category or clearing your filters.
          </p>
          <button
            onClick={() => handleFilterChange('categories', null)}
            className="mt-6 px-6 py-2 bg-theme-primary text-white rounded-full font-bold hover:opacity-90 transition-opacity"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Infinite Scroll Loader */}
      <div
        ref={loaderRef}
        className="h-24 flex justify-center items-center mt-8"
      >
        {loadingMore && (
          <div className="flex flex-col items-center gap-2">
            <Spinner size="sm" />
            <span className="text-xs font-medium text-gray-400 animate-pulse">
              Loading more goodness...
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
