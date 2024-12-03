import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Card, { CardProps } from './Card';
import { useNavigate } from 'react-router-dom';
import { getProductsByCategory } from '../services/productService';


const MultiCardCarousel: React.FC = () => {
  const [products, setProducts] = useState<CardProps[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const fetchedProducts = await getProductsByCategory('men', 'bestsellers');
        
        const transformedProducts: CardProps[] = fetchedProducts.map(product => ({
          id: product.id,
          images: product.images,
          title: product.title,
          category: `${product.category} ${product.subcategory}`,
          price: `₹${product.price.toFixed(2)}`,
          originalPrice: `₹${product.originalPrice.toFixed(2)}`,
          discount: product.discount,
          rating: product.rating,
          reviewsCount: product.reviewsCount
        }));

        setProducts(transformedProducts.slice(0, 8)); 
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleNext = () => {
    if (currentIndex < products.length - 3) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleCardClick = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (products.length === 0) {
    return <div className="text-center py-8">No products found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Bestselling Items</h3>
      <div className="relative">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out space-x-6"
            style={{ 
              transform: `translateX(-${currentIndex * (288 + 24)}px)` 
            }}
          >
            {products.map((item) => (
              <div 
                key={item.id} 
                className="flex-shrink-0 w-80 cursor-pointer"
                onClick={() => handleCardClick(item.id)}
              >
                <Card
                  id={item.id}
                  images={item.images}
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
            ${currentIndex >= products.length - 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleNext}
          disabled={currentIndex >= products.length - 3}
        >
          <ChevronRight className="text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default MultiCardCarousel;

