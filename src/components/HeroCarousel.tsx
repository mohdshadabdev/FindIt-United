import React, { useState, useEffect } from 'react';

const images = [
  {
    url: "https://i.ytimg.com/vi/tibOZdfR_fI/maxresdefault.jpg",
    alt: "United University - Main Campus Entrance"
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4500); // 4.5 seconds per slide

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      {/* Slide Images */}
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

      {/* Optional Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10 pointer-events-none" />

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white shadow-lg scale-110'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
