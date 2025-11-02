import React, { useState, useRef, useCallback } from 'react';
import { FaSearchPlus, FaSearchMinus, FaTimes } from 'react-icons/fa';

interface ProductImageProps {
  image: string;
  name: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ image, name }) => {
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
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
      <div className="relative group aspect-square cursor-zoom-in">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-xl shadow-lg"
          onClick={() => setIsZoomOpen(true)}
        />
        <div
          onClick={() => setIsZoomOpen(true)}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 rounded-xl"
        >
          <FaSearchPlus className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsZoomOpen(false)}
        >
          <div
            className="relative w-full h-full max-w-4xl max-h-[80vh] cursor-grab"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            onClick={(e) => e.stopPropagation()}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            <img
              ref={imageRef}
              src={image}
              alt={name}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transition: isDragging ? 'none' : 'transform 0.2s ease-out',
              }}
              className="absolute top-0 left-0 w-full h-full object-contain"
            />
          </div>
          {/* Controls */}
          <div className="absolute bottom-5 flex gap-3 bg-white/20 backdrop-blur-sm p-2 rounded-full">
            <button
              onClick={zoomIn}
              className="p-2 text-white hover:text-theme-primary transition"
              aria-label="Zoom in"
            >
              <FaSearchPlus size={20} />
            </button>
            <button
              onClick={zoomOut}
              className="p-2 text-white hover:text-theme-primary transition"
              aria-label="Zoom out"
            >
              <FaSearchMinus size={20} />
            </button>
          </div>
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-5 right-5 p-2 text-white hover:text-theme-primary transition"
            aria-label="Close zoom"
          >
            <FaTimes size={24} />
          </button>
        </div>
      )}
    </>
  );
};

export default ProductImage;
