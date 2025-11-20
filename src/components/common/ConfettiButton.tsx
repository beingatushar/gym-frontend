import confetti from 'canvas-confetti';
import clsx from 'clsx';
import React from 'react';

interface ConfettiButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  colors?: string[];
}

const ConfettiButton: React.FC<ConfettiButtonProps> = ({
  onClick,
  children,
  className,
  colors = ['#f59e0b', '#ffffff', '#000000'], // Default Amber/White/Black
  ...props
}) => {
  const triggerConfetti = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 1. Fire small burst from cursor position if possible, else center
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    const defaults = {
      origin: { x, y },
      colors: colors,
      disableForReducedMotion: true,
      zIndex: 9999,
    };

    // Fire multiple bursts for a "chaotic" effect
    const fire = (particleRatio: number, opts: any) => {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(50 * particleRatio), // Base count 50
      });
    };

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

    // 2. Execute original click handler
    if (onClick) onClick(e);
  };

  return (
    <button
      onClick={triggerConfetti}
      className={clsx(
        'relative overflow-hidden active:scale-95 transition-all',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default ConfettiButton;
