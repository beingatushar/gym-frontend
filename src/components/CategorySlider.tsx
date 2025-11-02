import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { Product } from '../types/product.types';
import { useProductStore } from '../stores/useProductStore';
import { ProductCard } from './ProductCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface CategorySliderProps {
  category: string;
}

const CategorySlider: React.FC<CategorySliderProps> = ({ category }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const fetchAllProducts = useProductStore((state) => state.fetchAllProducts);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchAllProducts({
          categories: [category],
          sortBy: 'date-added-newest',
          limit: 8,
          page: 1,
        });
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error loading products for slider:', error);
      }
    };
    loadProducts();
  }, [category, fetchAllProducts]);

  if (products.length === 0) return null;

  const sliderId = `slider-${category}`;

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 capitalize">
          {category.replace(/-/g, ' ')}
        </h2>
        <Link
          to={`/shop?categories=${encodeURI(category)}`}
          className="text-theme-primary hover:opacity-80 font-semibold transition"
        >
          View All
        </Link>
      </div>
      <div className="relative">
        <Swiper
          spaceBetween={24}
          slidesPerView={2}
          navigation={{
            nextEl: `.next-button-${sliderId}`,
            prevEl: `.prev-button-${sliderId}`,
          }}
          modules={[Navigation]}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          className={`prev-button-${sliderId} absolute top-1/2 -left-4 z-10 p-2 bg-white dark:bg-brand-dark-secondary text-gray-800 dark:text-gray-300 rounded-full shadow-md transform -translate-y-1/2 hover:bg-theme-secondary dark:hover:bg-white/10 transition`}
        >
          <FaChevronLeft />
        </button>
        <button
          className={`next-button-${sliderId} absolute top-1/2 -right-4 z-10 p-2 bg-white dark:bg-brand-dark-secondary text-gray-800 dark:text-gray-300 rounded-full shadow-md transform -translate-y-1/2 hover:bg-theme-secondary dark:hover:bg-white/10 transition`}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default CategorySlider;
