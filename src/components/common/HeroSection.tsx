import React from 'react';

interface HeroSectionProps {
  title: string;
  type?: 'contain' | 'cover'; // 'cover' by default
  subtitle?: string;
  backgroundImage: string;
  children?: React.ReactNode;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  backgroundImage,
  type = 'cover',
  children,
}) => {
  const isContain = type === 'contain';

  return (
    <section
      className={`
        relative flex items-center justify-center overflow-hidden
        ${
          isContain
            ? 'w-full h-auto max-h-[55vh] sm:max-h-[65vh] md:max-h-[80vh]'
            : 'h-[55vh] sm:h-[65vh] md:h-[80vh]'
        }
      `}
      aria-label={title}
    >
      {/* Hidden image to enforce aspect ratio (only when contain) */}
      {isContain && (
        <img
          src={backgroundImage}
          alt=""
          className="invisible w-full h-auto"
          aria-hidden="true"
        />
      )}

      {/* Blurred background to fill empty borders (only when contain) */}
      {isContain && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-xl brightness-50 z-0"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          aria-hidden="true"
        />
      )}

      {/* Main Background Image */}
      <div
        className={`
          absolute inset-0 bg-center bg-no-repeat z-10
          ${isContain ? 'bg-contain' : 'bg-cover'}
        `}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Gradients for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20" />
      <div className="absolute inset-0 bg-black/20 z-20" />

      {/* Content - Compact for Mobile */}
      <div className="relative z-30 container mx-auto px-4 text-center text-white max-w-3xl mt-10">
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

        {/* Action Area */}
        <div
          className="animate-fade-in-up opacity-0"
          style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
        >
          <div className="flex gap-4 justify-center">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
