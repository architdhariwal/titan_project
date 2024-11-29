import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, useEffect, useCallback } from 'react';

interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dwfeedbf65/images/homepage/All_Banners/BestSellers_Sept_D.jpg",
    title: "Best Sellers",
    description: "UPTO 50% OFF*"
  },
  {
    id: 2,
    image: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dwbfab0d70/images/homepage/All_Banners/Oct_NewArrivals_D.jpg",
    title: "New Arrivals",
    description: "Discover the Latest Styles"
  },
  {
    id: 3,
    image: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dw0ded7e33/images/homepage/All_Banners/Workwear_Nov_D.jpg",
    title: "Workwear",
    description: "Luxury at its Finest"
  },
  {
    id: 4,
    image: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dw64f5066e/images/homepage/All_Banners/OctBAU_IB_D.jpg",
    title: "International",
    description: "Technology Meets Style"
  },
  {
    id: 5,
    image: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dw5e3a212e/images/homepage/All_Banners/RagaMemoirs_D.jpg",
    title: "Raga",
    description: "Luxury at its Finest"
  },
  {
    id: 6,
    image: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dwc97254d6/images/homepage/All_Banners/Stellar2.0_D.jpg",
    title: "Stellar 2.0",
    description: "Technology Meets Style"
  }
];

const AUTOPLAY_INTERVAL = 5000;

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    let slideInterval: NodeJS.Timeout;

    if (!isHovered) {
      // Progress bar animation
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0;
          }
          return prev + 1;
        });
      }, AUTOPLAY_INTERVAL / 100);

      // Slide transition
      slideInterval = setInterval(nextSlide, AUTOPLAY_INTERVAL);
    }

    return () => {
      clearInterval(progressInterval);
      clearInterval(slideInterval);
    };
  }, [isHovered, nextSlide]);

  return (
    <div>
      {/* Carousel Container */}
      <div 
        className="relative w-full h-[500px] overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Slides */}
        <div className="relative w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute w-full h-full transition-opacity duration-500 ${
                currentSlide === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button 
          className={`absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full shadow-md p-2 z-10`}
            onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}
        >
          <ChevronLeft className="text-gray-700" />
        </button>
        <button 
          className={`absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full shadow-md p-2 z-10`}
            onClick={() => goToSlide((currentSlide + 1) % slides.length)}
        >
          <ChevronRight className="text-gray-700" />
        </button>


      </div>

      {/* Navigation Labels Below Carousel */}
      <div className="bg-white text-black">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className="flex-1 px-2 cursor-pointer"
                onClick={() => goToSlide(index)}
              >
                <div className="text-center mb-2">
                  <span className={`text-sm font-medium ${
                    currentSlide === index ? 'text-titan-theme-dark' : 'text-black'
                  }`}>
                    {slide.title}
                  </span>
                </div>
                <div className="h-1 bg-titan-bg-theme rounded overflow-hidden">
                  <div
                    className={`h-full bg-titan-theme-dark transition-all duration-300 ${
                      currentSlide === index ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      width: `${currentSlide === index ? progress : 0}%`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

