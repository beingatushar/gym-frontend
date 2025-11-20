import React from 'react';
import InfiniteMarquee from '../common/InfiniteMarquee';

const BrandMarquee: React.FC = () => {
  const brands = [
    'MUSCLETECH',
    'OPTIMUM NUTRITION',
    'DYMATIZE',
    'GNC',
    'LABRADA',
    'ULTIMATE NUTRITION',
    'ISOPURE',
    'BSN',
    'MUSCLEBLAZE',
    'AVVATAR',
  ];

  return (
    <section className="py-4 bg-brand-light dark:bg-brand-dark">
      <div className="container mx-auto px-4 mb-4">
        <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">
          Trusted by World Class Brands
        </p>
      </div>
      <InfiniteMarquee items={brands} speed={30} />
    </section>
  );
};

export default BrandMarquee;
