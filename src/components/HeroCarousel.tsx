
import React, { useState, useEffect } from 'react';

const images = [
  {
    url: "/uploads/081a76de-5b36-4c63-8bf0-9919baa0c23f.png",
    alt: "United University Campus - Main Building"
  },
  {
    url: "https://argroupofeducation.com/wp-content/uploads/elementor/thumbs/United-Institute-of-Medical-Sciences-qpw0dip3uy0lwnhoqd2ftgqlzwnlxw8pro2161ttfg.webp",
    alt: "United Institute of Medical Sciences"
  },
  {
    url: "https://images.shiksha.com/mediadata/images/1744189722phpoXhbXX.jpeg",
    alt: "United University Academic Block"
  },
  {
    url: "https://www.sikshapedia.com/public/data/colleges/united-university-allahabad-uttar-pradesh/united-university-allahabad-uttar-pradesh-banner.webp",
    alt: "United University Allahabad Campus"
  },
  {
    url: "https://preview.redd.it/united-medical-college-v0-nqaw3t9yqr0d1.jpg?width=1080&crop=smart&auto=webp&s=b4e0981247971fb652e11c5d9bce84ef608c0842",
    alt: "United Medical College"
  }
];

export const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4500); // Change image every 4.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image.url}
            alt={image.alt}
            className="w-full h-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}
      
      {/* Modern Interactive Carousel Indicators */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30 flex items-center space-x-3 bg-black/80 backdrop-blur-md rounded-full px-6 py-4 border border-white/60 shadow-2xl">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`relative overflow-hidden rounded-full transition-all duration-500 ease-out transform border-2 ${
              index === currentIndex 
                ? 'w-12 h-4 bg-gradient-to-r from-blue-400 to-purple-500 shadow-lg shadow-blue-500/70 scale-110 border-white/80' 
                : hoveredIndex === index
                ? 'w-6 h-4 bg-gradient-to-r from-white/90 to-blue-200 scale-105 border-white/70'
                : 'w-4 h-4 bg-white/90 hover:bg-white border-white/60 hover:scale-110'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            {/* Active indicator animation */}
            {index === currentIndex && (
              <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent animate-pulse rounded-full" />
            )}
            
            {/* Ripple effect on click */}
            <div className="absolute inset-0 rounded-full opacity-0 bg-white/60 transition-opacity duration-200 group-active:opacity-100" />
          </button>
        ))}
      </div>
      
      {/* Enhanced Progress Bar */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 w-32 h-2 bg-black/70 rounded-full overflow-hidden backdrop-blur-sm border border-white/60 shadow-lg">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out shadow-lg"
          style={{ 
            width: `${((currentIndex + 1) / images.length) * 100}%`,
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)'
          }}
        />
        {/* Animated glow effect */}
        <div 
          className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/70 to-transparent rounded-full animate-pulse"
          style={{ 
            left: `${((currentIndex + 1) / images.length) * 100 - 10}%`,
            transition: 'left 0.5s ease-out'
          }}
        />
      </div>

      {/* Image Counter */}
      <div className="absolute top-6 right-6 z-30 bg-black/80 backdrop-blur-md rounded-lg px-4 py-2 border border-white/60 shadow-lg">
        <span className="text-white text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </span>
      </div>
    </div>
  );
};
