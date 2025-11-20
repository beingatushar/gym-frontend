import clsx from 'clsx';
import React, { useRef, useState } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // How much it rotates (default: 15)
}

const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  intensity = 15,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate percentage (-0.5 to 0.5)
    const xPct = x / rect.width - 0.5;
    const yPct = y / rect.height - 0.5;

    // Calculate rotation
    // RotateY corresponds to X movement, RotateX corresponds to Y movement (inverted)
    const rotateY = xPct * intensity * 2;
    const rotateX = yPct * intensity * -2;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      className={clsx(
        'relative transition-transform duration-200 ease-out will-change-transform',
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        transform: isHovering
          ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02, 1.02, 1.02)`
          : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      }}
    >
      {/* Glossy Reflection Effect */}
      <div
        className="absolute inset-0 pointer-events-none z-50 opacity-0 transition-opacity duration-200"
        style={{
          opacity: isHovering ? 0.4 : 0,
          background: `linear-gradient(${135 + rotation.y}deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)`,
        }}
      />
      {children}
    </div>
  );
};

export default TiltCard;
