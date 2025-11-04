import React from 'react';
import shopImage from '../assets/shop.png';
import HeroSection from '../components/common/HeroSection';
import ProductList from '../components/ProductList';

const ShopPage: React.FC = () => {
  return (
    <>
      <HeroSection
        title="Shop Premium Supplements"
        subtitle="High-quality nutritional products for your fitness goals"
        backgroundImage={shopImage}
      />
      <section className="container mx-auto px-6 py-12">
        <ProductList />
      </section>
    </>
  );
};

export default ShopPage;
