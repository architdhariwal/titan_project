import React from 'react';
// import { useNavigate } from 'react-router-dom';

interface ProductBannerProps {
  imageUrl: string;
  title: string;
  linkUrl: string;
}

const ProductBanner: React.FC<ProductBannerProps> = ({ imageUrl, title, linkUrl }) => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate(linkUrl);
//   };

  return (
    <div
      className="relative w-full h-64 md:h-80 lg:h-96 cursor-pointer overflow-hidden"
    //   onClick={handleClick}
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
      />
      {/* <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <h2 className="text-white text-2xl md:text-4xl font-bold">{title}</h2>
      </div> */}
    </div>
  );
};

export default ProductBanner;