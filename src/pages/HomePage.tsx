import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaGift, FaShippingFast, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Testimonials from '../components/common/Testimonials';

import CategorySlider from '../components/CategorySlider';
import HeroSection from '../components/common/HeroSection';
import Spinner from '../components/common/Spinner';
import { ProductCard } from '../components/ProductCard';
import { useProductStore } from '../stores/useProductStore';
import { Product } from '../types/product.types';

import homepageImage from '../assets/home.png';
import ProductCardSkeleton from '../components/common/ProductCardSkeleton';

const FeaturedProducts: React.FC = () => {
  const { fetchAllProducts } = useProductStore();
  const [featured, setFeatured] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      setIsLoading(true);
      try {
        const products = await fetchAllProducts({
          sortBy: 'rating-high-to-low',
        });
        setFeatured(products.slice(0, 4));
      } catch (error) {
        console.error('Failed to fetch featured products', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadFeatured();
  }, [fetchAllProducts]);

  return (
    <section className="bg-white dark:bg-brand-dark py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
          Featured Products
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </div>
    </section>
  );
};

const OurPromise: React.FC = () => {
  const promises = [
    {
      icon: <FaGift size={32} className="text-theme-primary" />,
      title: '100% Genuine Products',
      description:
        '15 years of trusted experience in providing authentic supplements at the lowest rates in India.',
    },
    {
      icon: <FaStar size={32} className="text-theme-primary" />,
      title: 'Highly Rated Service',
      description:
        '4.9/5 rating on Google with 60+ positive reviews from satisfied customers.',
    },
    {
      icon: <FaShippingFast size={32} className="text-theme-primary" />,
      title: 'All India Delivery',
      description:
        'Fast and reliable shipping across India with best-in-class rates.',
    },
  ];

  return (
    <section className="bg-theme-secondary dark:bg-brand-dark-secondary py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
          Our Promise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {promises.map((promise) => (
            <div key={promise.title} className="p-6">
              <div className="flex justify-center mb-4">{promise.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {promise.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {promise.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HomePage: React.FC = () => {
  const getAllCategories = useProductStore((state) => state.getAllCategories);
  const [loading, setLoading] = useState<boolean>(true);
  const [allCategories, setAllCategories] = useState<string[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      try {
        const categories = await getAllCategories();
        setAllCategories(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to load product categories.');
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, [getAllCategories]);

  return (
    <div className="animate-fade-in">
      <HeroSection
        title="Best Supplement Store in Faridabad"
        subtitle="15 years of trusted experience | All India delivery | 100% genuine products at lowest rates"
        backgroundImage={homepageImage}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 bg-white/90 dark:bg-black/90 px-4 py-2 rounded-full">
            <span className="text-yellow-500">★★★★★</span>
            <span className="text-gray-800 dark:text-gray-200 font-medium">
              4.9/5 - Trusted by 60+ Happy Customers
            </span>
          </div>
          <Link
            to="/shop"
            className="inline-block bg-theme-primary text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition duration-300 shadow-lg transform hover:scale-105"
          >
            Shop Now
          </Link>
        </div>
      </HeroSection>

      <OurPromise />

      <FeaturedProducts />

      <Testimonials />

      <section className="container mx-auto px-6 py-12">
        {loading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="space-y-12">
            {allCategories.map((category) => (
              <CategorySlider key={category} category={category} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
