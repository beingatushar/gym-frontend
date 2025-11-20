import React from 'react';

interface InfiniteMarqueeProps {
  items: string[]; // Array of text or image URLs
  speed?: number; // Duration in seconds
  direction?: 'left' | 'right';
}

const InfiniteMarquee: React.FC<InfiniteMarqueeProps> = ({
  items,
  speed = 20,
  direction = 'left',
}) => {
  return (
    <div className="relative flex overflow-hidden bg-white dark:bg-brand-dark py-10 border-y border-gray-100 dark:border-gray-800">
      {/* Gradient Masks to fade edges */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white dark:from-brand-dark to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white dark:from-brand-dark to-transparent z-10" />

      <div
        className={`flex gap-16 whitespace-nowrap animate-marquee ${direction === 'right' ? 'animate-marquee-reverse' : ''}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {/* Repeat items twice to ensure seamless loop */}
        {[...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="text-2xl font-black text-gray-300 dark:text-gray-700 uppercase tracking-tighter hover:text-theme-primary transition-colors cursor-default">
              {item}
            </span>
            {/* Decorative dot */}
            <span className="w-2 h-2 rounded-full bg-theme-primary/40" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteMarquee;
