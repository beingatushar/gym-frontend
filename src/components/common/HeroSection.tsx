import React from 'react';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  children?: React.ReactNode;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  backgroundImage,
  children,
}) => {
  return (
    <section
      className="relative h-[55vh] sm:h-[65vh] md:h-[80vh] flex items-center justify-center overflow-hidden"
      aria-label={title}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Gradients for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-black/20" />

      {/* Content - Compact for Mobile */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white max-w-3xl mt-10">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-3 sm:mb-6 drop-shadow-lg animate-fade-in-up leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p
            className="text-sm sm:text-lg md:text-xl font-medium text-gray-200 max-w-xl mx-auto leading-relaxed mb-6 sm:mb-8 drop-shadow-md animate-fade-in-up opacity-0"
            style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
          >
            {subtitle}
          </p>
        )}
        <div
          className="animate-fade-in-up opacity-0"
          style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
        >
          {children}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
