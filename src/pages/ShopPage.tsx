import React from 'react';
import shopImage from '../assets/shop.png';
import HeroSection from '../components/common/HeroSection';
import PageMeta from '../components/common/PageMeta'; // Import PageMeta
import ProductList from '../components/ProductList';

const ShopPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-brand-dark transition-colors duration-300">
      {/* DYNAMIC TITLE */}
      <PageMeta title="Shop Premium Supplements" />

      {/* Background Noise Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilterShop">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilterShop)" />
        </svg>
      </div>

      {/* Hero Section */}
      <HeroSection
        title="Shop Premium Supplements"
        subtitle="Fuel your ambition with our scientifically formulated, 100% authentic nutrition."
        backgroundImage={shopImage}
      />

      {/* Main Content Area */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-10">
        <ProductList />
      </section>
    </div>
  );
};

export default ShopPage;
