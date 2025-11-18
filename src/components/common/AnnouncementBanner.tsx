import React, { useEffect, useState } from 'react';
import { useBannerStore } from '../../stores/useBannerStore';

const AnnouncementBanner: React.FC = () => {
  const { bannerContent, fetchBanner } = useBannerStore();
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const DELIMITER = '|||';

  // Fetch banner on mount
  useEffect(() => {
    fetchBanner();
  }, [fetchBanner]);

  // Memoize lines to prevent unnecessary recalculations
  const lines = React.useMemo(() => {
    return bannerContent
      ? bannerContent.split(DELIMITER)
      : ['Welcome to Shelly Nutrition!'];
  }, [bannerContent]);

  // Cycle through lines every 4 seconds
  useEffect(() => {
    if (lines.length <= 1) return;

    const interval = setInterval(() => {
      setActiveLineIndex((prev) => (prev + 1) % lines.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [lines.length]);

  if (!lines.length) return null;

  return (
    <div className="bg-theme-primary text-white font-medium text-[10px] sm:text-xs tracking-wide h-8 overflow-hidden relative z-50">
      {/* Gradient masks for depth */}
      <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-theme-primary to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-theme-primary to-transparent z-10" />

      <div className="container mx-auto h-full relative">
        {lines.map((line, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out transform ${
              index === activeLineIndex
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-full pointer-events-none'
            }`}
          >
            <span className="truncate px-4">{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBanner;
