import React from 'react';
import { FaFlagCheckered, FaRocket, FaStore, FaUsers } from 'react-icons/fa';

const Timeline: React.FC = () => {
  const milestones = [
    {
      year: '2010',
      title: 'The Beginning',
      description:
        'Shelly Nutrition was founded by Sonu Goyal with a single mission: Authentic supplements for everyone.',
      icon: <FaRocket />,
    },
    {
      year: '2015',
      title: 'Expanding Horizons',
      description:
        'Moved to our flagship store in Faridabad and partnered with major global brands.',
      icon: <FaStore />,
    },
    {
      year: '2020',
      title: 'Building the Community',
      description:
        'Hit the milestone of 10,000+ satisfied customers across India.',
      icon: <FaUsers />,
    },
    {
      year: '2025',
      title: 'Going Digital',
      description:
        'Launched our state-of-the-art e-commerce platform to serve athletes nationwide.',
      icon: <FaFlagCheckered />,
    },
  ];

  return (
    <div className="relative">
      {/* Central Line (Desktop Only) */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200 dark:bg-gray-800 rounded-full" />

      {/* Mobile Line (Left Side) */}
      <div className="md:hidden absolute left-6 top-0 bottom-0 w-1 bg-gray-200 dark:bg-gray-800 rounded-full" />

      {/* Adjusted spacing here: space-y-8 (mobile) and md:space-y-12 (desktop) */}
      <div className="space-y-8 md:space-y-12">
        {milestones.map((item, index) => (
          <div
            key={index}
            className={`relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Spacer for Desktop Zig-Zag */}
            <div className="hidden md:block w-5/12" />

            {/* Icon Node */}
            <div className="absolute left-6 md:left-1/2 top-0 md:top-1/2 transform -translate-x-1/2 md:-translate-y-1/2 w-12 h-12 bg-theme-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-theme-primary/50 z-10 border-4 border-white dark:border-brand-dark">
              {item.icon}
            </div>

            {/* Content Card */}
            <div className="w-full pl-16 md:pl-0 md:w-5/12 group">
              <div className="bg-white dark:bg-brand-dark-secondary p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
                {/* Hover Glow */}
                <div className="absolute top-0 left-0 w-1 h-full bg-theme-primary opacity-0 group-hover:opacity-100 transition-opacity" />

                <span className="text-5xl md:text-6xl font-black text-gray-100 dark:text-gray-800 absolute top-2 right-4 -z-0 opacity-50 select-none pointer-events-none">
                  {item.year}
                </span>

                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
