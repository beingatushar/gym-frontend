import React, { useCallback, useRef, useState } from 'react';
import { FaSearchMinus, FaSearchPlus, FaTimes } from 'react-icons/fa';

interface ProductImageProps {
  image: string;
  name: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ image, name }) => {
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      startPos.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
    },
    [position]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - startPos.current.x,
          y: e.clientY - startPos.current.y,
        });
      }
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const newScale = e.deltaY > 0 ? scale / 1.2 : scale * 1.2;
      const clampedScale = Math.min(Math.max(newScale, 1), 5);
      setScale(clampedScale);
      if (clampedScale <= 1) setPosition({ x: 0, y: 0 });
    },
    [scale]
  );

  const zoomIn = useCallback(() => setScale((s) => Math.min(s * 1.5, 5)), []);
  const zoomOut = useCallback(() => {
    const newScale = Math.max(scale / 1.5, 1);
    setScale(newScale);
    if (newScale <= 1) setPosition({ x: 0, y: 0 });
  }, [scale]);

  return (
    <>
      {/* Main Image Container */}
      <div
        className="relative group w-full bg-gray-50 dark:bg-brand-dark-secondary rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 cursor-zoom-in"
        onClick={() => setIsZoomOpen(true)}
      >
        {/* Constraint Update:
           - md:max-h-[400px]: Significantly reduced max height for laptops to prevent scrolling
           - object-contain: Ensures the full image is always visible within these tighter bounds
        */}
        <div className="aspect-[4/3] md:aspect-square max-h-[70vh] md:max-h-[500px] w-full flex items-center justify-center p-4">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-all duration-300">
          <div className="bg-white/90 dark:bg-black/80 backdrop-blur-sm p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <FaSearchPlus className="text-gray-700 dark:text-white" size={20} />
          </div>
        </div>
      </div>

      {/* Full Screen Zoom Modal */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-fade-in"
          onClick={() => setIsZoomOpen(false)}
        >
          <div
            className="relative w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={image}
              alt={name}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transition: isDragging ? 'none' : 'transform 0.2s ease-out',
              }}
              className="max-w-[90vw] max-h-[90vh] object-contain select-none"
              draggable={false}
            />
          </div>

          {/* Controls */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/10 shadow-2xl">
            <button
              onClick={zoomIn}
              className="p-3 text-white hover:bg-white/20 rounded-full transition"
              aria-label="Zoom in"
            >
              <FaSearchPlus size={20} />
            </button>
            <button
              onClick={zoomOut}
              className="p-3 text-white hover:bg-white/20 rounded-full transition"
              aria-label="Zoom out"
            >
              <FaSearchMinus size={20} />
            </button>
            <div className="w-px bg-white/20 mx-1"></div>
            <button
              onClick={() => setIsZoomOpen(false)}
              className="p-3 text-white hover:bg-red-500/80 rounded-full transition"
              aria-label="Close"
            >
              <FaTimes size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductImage;
