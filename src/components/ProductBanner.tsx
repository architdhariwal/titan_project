import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ProductBannerProps {
  imageUrl: string;
  title: string;
  linkUrl: string;
}

const ProductBanner: React.FC<ProductBannerProps> = ({ imageUrl, title, linkUrl }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(linkUrl);
  };

  return (
    <div 
      onClick={handleClick} 
      className="cursor-pointer hover:opacity-90 transition-opacity"
    >
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

export default ProductBanner;