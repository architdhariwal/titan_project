import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Card, { CardProps } from './Card';

const MultiCardCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const data: CardProps[]  = [
    {
      id: 1,
      imageUrl: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw6c9df22a/images/Titan/Catalog/2656WM01_1.jpg?sw=360&sh=360",
      title: "Fastrack Luxe Automatic",
      category: "Women's Watch",
      price: "₹4,590",
      originalPrice: "₹5,100",
      discount: "10% off",
      rating: 3.7,
      reviewsCount: 55,
    },
    {
      id: 2,
      imageUrl: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw6eadd3c4/images/Titan/Catalog/16017PP03_1.jpg?sw=360&sh=360",
      title: "Sonata Together Quartz",
      category: "Smartwatch",
      price: "₹4,680",
      originalPrice: "₹5,200",
      discount: "10% off",
      rating: 3.9,
      reviewsCount: 60,
    },
    {
      id: 3,
      imageUrl: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw9f776127/images/Helios/Catalog/PLPEWGK0039205_1.jpg?sw=360&sh=360",
      title: "Police Sports Chronograph",
      category: "Men's Watch",
      price: "₹4,770",
      originalPrice: "₹5,300",
      discount: "10% off",
      rating: 4.1,
      reviewsCount: 65,
    },
    {
      id: 4,
      imageUrl: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw94b23fe5/images/Helios/Catalog/TH1710500_1.jpg?sw=360&sh=360",
      title: "Tommy-Hilfiger Bold Smart",
      category: "Regular Watch",
      price: "₹4,860",
      originalPrice: "₹5,400",
      discount: "10% off",
      rating: 4.3,
      reviewsCount: 70,
    },
    {
      id: 5,
      imageUrl: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwc6b615a0/images/Helios/Catalog/KC50777002MN_1.jpg?sw=360&sh=360",
      title: "Kennet Luxe Mechanical",
      category: "Gifting Watch",
      price: "₹4,950",
      originalPrice: "₹5,500",
      discount: "10% off",
      rating: 3.5,
      reviewsCount: 75,
    },
    {
      id: 6,
      imageUrl: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwcb7ae7c4/images/Fastrack/Catalog/FV30004KM01W_1.jpg?sw=360&sh=360",
      title: "Anni-Klien Together Automatic",
      category: "Sale Watch",
      price: "₹5,040",
      originalPrice: "₹5,600",
      discount: "10% off",
      rating: 3.7,
      reviewsCount: 80,
    },
    {
      id: 7,
      imageUrl: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw4d42236d/images/Titan/Catalog/26026PP06W_1.jpg?sw=360&sh=360",
      title: "Coach Sports Quartz",
      category: "Kids' Watch",
      price: "₹5,130",
      originalPrice: "₹5,700",
      discount: "10% off",
      rating: 3.9,
      reviewsCount: 85,
    },
    {
      id: 8,
      imageUrl: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwb5faa7ee/images/Sonata/Catalog/SP70034SM01W_1.jpg?sw=360&sh=360",
      title: "Titan Bold Chronograph",
      category: "Men's Watch",
      price: "₹5,220",
      originalPrice: "₹5,800",
      discount: "10% off",
      rating: 4.1,
      reviewsCount: 90,
    },
  ];

  const handleNext = () => {
    // Only allow moving right if not at the end of the carousel
    if (currentIndex < data.length - 3) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    // Only allow moving left if not at the beginning of the carousel
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out space-x-6"
            style={{ 
              transform: `translateX(-${currentIndex * (288 + 24)}px)` 
            }}
          >
            {data.map((item) => (
              <div key={item.id} className="flex-shrink-0 w-80">
                <Card
                  id={item.id}
                  imageUrl={item.imageUrl}
                  title={item.title}
                  category={item.category}
                  price={item.price}
                  originalPrice={item.originalPrice}
                  discount={item.discount}
                  rating={item.rating}
                  reviewsCount={item.reviewsCount}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button 
          className={`absolute left-0 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full shadow-md p-2 z-10 
            ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="text-gray-700" />
        </button>
        <button 
          className={`absolute right-0 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full shadow-md p-2 z-10 
            ${currentIndex >= data.length - 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleNext}
          disabled={currentIndex >= data.length - 3}
        >
          <ChevronRight className="text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default MultiCardCarousel;