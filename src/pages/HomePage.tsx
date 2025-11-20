import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaArrowRight, FaGift, FaShippingFast, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Components
import CategorySlider from '../components/CategorySlider';
import HeroSection from '../components/common/HeroSection';
import MagneticButton from '../components/common/MagneticButton';
import PageMeta from '../components/common/PageMeta'; // Import PageMeta
import ProductCardSkeleton from '../components/common/ProductCardSkeleton';
import Spinner from '../components/common/Spinner';
import SpotlightCard from '../components/common/SpotlightCard';
import Testimonials from '../components/common/Testimonials';
import TiltCard from '../components/common/TiltCard';
import { ProductCard } from '../components/ProductCard';

// New Engagement Components
import BrandMarquee from '../components/home/BrandMarquee';
import Newsletter from '../components/home/Newsletter';
import StatsTicker from '../components/home/StatsTicker';

// Store & Types
import { useProductStore } from '../stores/useProductStore';
import { Product } from '../types/product.types';

// Assets
import homepageImage from '../assets/home.png';

// ... (FeaturedProducts and OurPromise components remain the same as your current revolutionised version) ...
// For brevity in this response, assume the sub-components are here or imported.
// I will re-include them to ensure the file is complete and copy-paste ready.

const FeaturedProducts: React.FC = () => {
  const { fetchFeaturedProducts } = useProductStore();
  const [featured, setFeatured] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      setIsLoading(true);
      try {
        const products = await fetchFeaturedProducts();
        setFeatured(products);
      } catch (error) {
        console.error('Failed to fetch featured products', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadFeatured();
  }, [fetchFeaturedProducts]);

  return (
    <section className="bg-white dark:bg-brand-dark py-20 relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h4 className="text-theme-primary font-bold uppercase tracking-widest text-sm mb-2">
              Hand-picked for you
            </h4>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-gray-100 tracking-tighter">
              Featured Drops
            </h2>
          </div>
          <Link
            to="/shop"
            className="group flex items-center gap-2 text-gray-500 hover:text-theme-primary transition-colors font-medium"
          >
            View All Products
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : featured.map((product) => (
                <TiltCard key={product.id} className="h-full" intensity={10}>
                  <ProductCard product={product} />
                </TiltCard>
              ))}
        </div>
      </div>
    </section>
  );
};

const OurPromise: React.FC = () => {
  const promises = [
    {
      icon: <FaGift size={40} className="text-theme-primary" />,
      title: '100% Genuine',
      description:
        'Direct sourcing from authorized importers. No middle-men, no fakes.',
    },
    {
      icon: <FaStar size={40} className="text-theme-primary" />,
      title: 'Top Rated',
      description:
        'Rated 4.9/5 on Google. We build relationships, not just customer lists.',
    },
    {
      icon: <FaShippingFast size={40} className="text-theme-primary" />,
      title: 'Fast Delivery',
      description:
        'Premium packaging and express shipping across every pincode in India.',
    },
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-brand-dark-secondary/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-gray-100 mb-6 tracking-tight">
            Why Shelly Nutrition?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            We don't just sell supplements; we fuel your obsession with
            excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promises.map((promise, idx) => (
            <SpotlightCard key={idx} className="h-full text-center group">
              <div className="mb-6 inline-flex p-4 rounded-2xl bg-theme-secondary/50 dark:bg-white/5 group-hover:scale-110 transition-transform duration-300">
                {promise.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {promise.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {promise.description}
              </p>
            </SpotlightCard>
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
    <div className="animate-fade-in overflow-x-hidden">
      {/* DYNAMIC TITLE */}
      <PageMeta title="Best Supplement Store in Faridabad" />

      {/* 1. Hero Section with Magnetic Button */}
      <HeroSection
        title="Best Supplement Store in Faridabad"
        subtitle="15 years of trusted experience | All India delivery | 100% genuine products at lowest rates"
        backgroundImage={homepageImage}
      >
        <div className="flex flex-col items-center gap-6">
          <MagneticButton>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-theme-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:brightness-110 transition-all shadow-xl shadow-theme-primary/40"
            >
              Shop Now <FaArrowRight />
            </Link>
          </MagneticButton>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <FaStar key={i} size={12} className="text-yellow-400" />
              ))}
            </div>
            <span className="text-white text-xs font-bold tracking-wide">
              TRUSTED BY 500+ ATHLETES
            </span>
          </div>
        </div>
      </HeroSection>

      {/* 2. Live Stats Ticker */}
      <StatsTicker />

      {/* 3. Infinite Brand Marquee */}
      <BrandMarquee />

      {/* 4. Featured Products (3D Tilt) */}
      <FeaturedProducts />

      {/* 5. Our Promise (Spotlight) */}
      <OurPromise />

      {/* 6. Category Sliders */}
      <section className="container mx-auto px-6 py-16">
        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="space-y-16">
            {allCategories.map((category) => (
              <CategorySlider key={category} category={category} />
            ))}
          </div>
        )}
      </section>

      {/* 7. Testimonials */}
      <Testimonials />

      {/* 8. Newsletter CTA */}
      <Newsletter />
    </div>
  );
};

export default HomePage;
