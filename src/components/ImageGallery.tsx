import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  placeName: string;
  onClose?: () => void;
  isFullscreen?: boolean;
}

export function ImageGallery({ images, placeName, onClose, isFullscreen = false }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') nextImage();
    if (e.key === 'ArrowRight') prevImage();
    if (e.key === 'Escape' && onClose) onClose();
  };

  if (isFullscreen) {
    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all duration-200"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative w-full h-full flex items-center justify-center p-4">
          <img
            src={images[currentIndex]}
            alt={`${placeName} - תמונה ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain"
          />

          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all duration-200"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <button
                onClick={nextImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all duration-200"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="absolute bottom-4 right-4 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded-full">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={images[currentIndex]}
          alt={`${placeName} - תמונה ${currentIndex + 1}`}
          className="w-full h-64 md:h-80 object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
          onClick={() => onClose && onClose()}
        />
        
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all duration-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={nextImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      
      {images.length > 1 && (
        <div className="mt-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all duration-200 ${
                  index === currentIndex ? 'ring-2 ring-teal-500 ring-offset-2' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={image}
                  alt={`תמונה ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}