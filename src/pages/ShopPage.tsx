import React from 'react';
import HeroSection from '../components/common/HeroSection';
import ProductList from '../components/ProductList';
import shopImage from '../assets/shop.png';

const ShopPage: React.FC = () => {
  return (
    <>
      <HeroSection
        title="Shop Our Collection"
        subtitle="Find the perfect handmade gift for every occasion"
        backgroundImage={shopImage}
      />
      <section className="container mx-auto px-6 py-12">
        <ProductList />
      </section>
    </>
  );
};

export default ShopPage;
