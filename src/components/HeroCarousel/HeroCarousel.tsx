import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { slides } from "../../utils/HomeData";

const AUTOPLAY_INTERVAL = 5000;

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

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
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0;
          }
          return prev + 1;
        });
      }, AUTOPLAY_INTERVAL / 100);

      slideInterval = setInterval(nextSlide, AUTOPLAY_INTERVAL);
    }

    return () => {
      clearInterval(progressInterval);
      clearInterval(slideInterval);
    };
  }, [isHovered, nextSlide]);

  return (
    <div>
      <div
        className="relative w-full h-[500px] overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute w-full h-full transition-opacity duration-500 ${
                currentSlide === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => navigate("/products")}
              />
            </div>
          ))}
        </div>

        <button
          aria-label="Previous"
          className={`absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full shadow-md p-2 z-10`}
          onClick={() =>
            goToSlide((currentSlide - 1 + slides.length) % slides.length)
          }
        >
          <ChevronLeft className="text-gray-700" />
        </button>
        <button
          aria-label="Next"
          className={`absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full shadow-md p-2 z-10`}
          onClick={() => goToSlide((currentSlide + 1) % slides.length)}
        >
          <ChevronRight className="text-gray-700" />
        </button>
      </div>

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
                  <span
                    className={`text-sm font-medium ${
                      currentSlide === index
                        ? "text-titan-theme-dark"
                        : "text-black"
                    }`}
                  >
                    {slide.title}
                  </span>
                </div>
                <div className="h-1 bg-titan-bg-theme rounded overflow-hidden">
                  <div
                    data-testid="progress-bar"
                    className={`h-full bg-titan-theme-dark transition-all duration-300 ${
                      currentSlide === index ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      width: `${currentSlide === index ? progress : 0}%`,
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
