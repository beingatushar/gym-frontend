import React from 'react';
import AnimatedCounter from '../common/AnimatedCounter';

const StatsTicker: React.FC = () => {
  return (
    <div className="bg-white dark:bg-brand-dark-secondary border-y border-gray-100 dark:border-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100 dark:divide-gray-800/50">
          <AnimatedCounter end={15} label="Years of Trust" suffix="+" />
          <AnimatedCounter
            end={5000}
            label="Happy Customers"
            suffix="+"
            duration={2500}
          />
          <AnimatedCounter
            end={100}
            label="Genuine Products"
            suffix="%"
            duration={1500}
          />
          <div className="text-center p-6">
            <div className="text-4xl md:text-5xl font-black text-yellow-400 mb-2">
              4.9
            </div>
            <div className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
              Google Rating
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsTicker;
