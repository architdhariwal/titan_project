import React from 'react';
import { Star } from 'lucide-react';

export interface CardProps {
  id: number;
  images: string[]; 
  title: string;
  category: string;
  price: string;
  originalPrice: string;
  discount: number; 
  rating: number; 
  reviewsCount: number;
}

const Card: React.FC<CardProps> = ({
  images,
  title,
  category,
  price,
  originalPrice,
  discount,
  rating,
  reviewsCount,
}) => {
  // console.log("images---->",images);
  return (
    <div className="bg-white overflow-hidden w-72 transform transition-all hover:scale-105 hover:shadow-xl rounded-lg">
      <div className="relative">
        
        <img
          src={images[0] || 'https://via.placeholder.com/360x360?text=No+Image'}
          alt={title}
          className="w-full h-64 object-cover"
        />

      
        <div className="absolute bg-white bottom-2 left-2 flex items-center space-x-1 p-1 rounded shadow">
          <Star className="text-yellow-500 fill-current" size={18} />
          <span className="text-gray-700 text-sm">
            {rating.toFixed(1)} ({reviewsCount})
          </span>
        </div>
      </div>

      <div className="p-4">
      
        <h3 className="font-bold text-lg mb-1 truncate">{title}</h3>

        <p className="text-gray-500 text-sm mb-2">{category}</p>
        <div className="flex justify-between items-center mb-2">
      
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg text-black">{price}</span>
            <span className="line-through text-gray-400 text-sm">{originalPrice}</span>
          </div>
          <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs">
            {discount}% Off
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
