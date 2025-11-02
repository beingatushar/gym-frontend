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
      className="bg-cover bg-center h-[70vh] md:h-screen flex items-center justify-center text-white relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
      aria-label={title}
    >
      {/* Base dark overlay for contrast and readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      {/* Themed color tint overlay for dynamic branding */}
      <div className="absolute inset-0 bg-theme-primary opacity-20" />

      <div className="relative text-center px-4 animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 text-shadow-lg">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-2xl font-light max-w-2xl mx-auto text-shadow">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
};

export default HeroSection;
