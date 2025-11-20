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
      className="relative mt-10 h-[60vh] sm:h-[75vh] md:h-[85vh] flex items-center justify-center overflow-hidden bg-mesh-gradient"
      aria-label={title}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat mix-blend-overlay transition-transform duration-[20s] hover:scale-110"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-light dark:from-brand-dark via-transparent to-transparent" />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 text-center max-w-5xl mt-10 flex flex-col items-center">
        {/* Staggered Reveal Title */}
        <div className="mb-6 flex flex-col items-center gap-0 sm:gap-2">
          {title.split('\n').map((word, i) => (
            <div key={i} className="reveal-text-container">
              <h1
                className="reveal-text text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gray-800 to-gray-900 dark:from-white dark:to-gray-400 drop-shadow-sm uppercase"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {word}
              </h1>
            </div>
          ))}
        </div>

        {/* Subtitle Reveal */}
        {subtitle && (
          <div className="reveal-text-container mb-8">
            <p
              className="reveal-text text-base sm:text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
              style={{ animationDelay: '0.4s' }}
            >
              {subtitle}
            </p>
          </div>
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
